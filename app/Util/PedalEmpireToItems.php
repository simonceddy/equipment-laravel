<?php
namespace App\Util;

use App\Models\Brand;
use App\Models\Item;
use App\Models\ItemType;
use Eddy\Crawlers\PE;
use HTMLPurifier;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Str;

class PedalEmpireToItems
{
    private static $brandMappings = [
        'JHS Pedals' => 387,
        'other' => 33,
        'Keeley Electronics' => 361,
        'ROSS Pedals' => 560,
    ];

    private static $replaceBrandMappings = [
        'Keeley Electronics' => 'Keeley',
        'ROSS Pedals' => 'ROSS Pedals -',
        'Reverend Guitars' => 'Reverend'
    ];

    private static $dontForce = [
        'amps' => true,
        'guitars' => true,
    ];

    private static $typeMappings = [

    ];

    private ?string $forceType = null;

    private int $stored = 0;

    private int $ignored = 0;

    private array $errors = [];

    public function __construct(
        private ?PE $pe = null,
        private ?HTMLPurifier $purifier = null
    ) {
        if (!$pe) $this->pe = new PE();
        if (!$purifier) $this->purifier = new HTMLPurifier();
    }

    private function otherBrandId()
    {
        return static::$brandMappings['other'];
    }

    private function locateVendor(string $name)
    {
        if (isset(static::$brandMappings[$name])) {
            return static::$brandMappings[$name];
        }
        $brand = Brand::select('id')->where('name', 'like', $name)->first();
        if (!$brand) {
            $brand = new Brand([
                'name' => $name
            ]);
            $brand->save();
        }
        return $brand->getAttribute('id');
    }

    private function getTypes(array $types)
    {
        $t = [];
        if (isset($this->forceType)) {
            if (isset(static::$typeMappings[$this->forceType])) {
                $this->forceType = static::$typeMappings[$this->forceType];
            }
            $t1 = ItemType::where('name', 'like', $this->forceType)
                ->first();
            if (!$t1) {
                $t1 = new ItemType([
                    'name' => $this->forceType,
                ]);
                $t1->save();
            }
            array_push($t, $t1);
        }

        foreach ($types as $type) {
            if (isset(static::$typeMappings[$type])) {
                $type = static::$typeMappings[$type];
            }
            $tN = ItemType::where('name', 'like', $type)
                ->first();
            if ($tN) array_push($t, $tN);
        }

        return $t;
    }

    private function searchForItem(array $item)
    {
        if (!isset($item['product']) || !isset($item['product']['title'])) {
            return false;
        }
        if (isset($item['product']['id'])) {
            $refId = $item['product']['id'];
            $r = Item::where('refId', 'like', $refId)->count();
            if ($r > 0) return true;
        }
        $n = $item['product']['title'];

        /** @var Builder */
        $itemQuery = Item::select("items.*")
            ->where('items.name', 'like', '%' . $n . '%')
            ->join('brands', 'items.brand_id', '=', 'brands.id');
        $t = $itemQuery->count();

        if ($t === 0) {
            return false;
        }

        $vendorId = $this->locateVendor($item['product']['vendor']);
        $t = $itemQuery->where('brands.id', $vendorId)->count();

        return $t > 0;

        // TODO determine if item is the same or just has the same name
        // TODO update if applicable
        // return true;
    }

    public function getProductJson(string $path)
    {
        $url = $this->pe->url->forItem($path);
        echo 'Sending request to ' . $url . PHP_EOL;
        $res = $this->pe->client->request('GET', $url);
        if ($res->getStatusCode() === 404) {
            echo 'Request to ' . $url . ' could not be found!' . PHP_EOL;
            array_push($this->errors, [
                'type' => 404,
                'url' => $url,
            ]);
            return null;
        }
        echo 'Response received!' . PHP_EOL;
        $body = $res->getBody()->getContents();
        $json = $this->pe->crawler->getProductJson($body);
        echo 'JSON extracted!' . PHP_EOL;

        return $json;
    }

    public function transform(array $item)
    {
        $exists = $this->searchForItem($item);

        if ($exists) {
            echo 'Item found in database!' . PHP_EOL;
            echo 'Ignoring...' . PHP_EOL . PHP_EOL;
            $this->ignored++;
            return null;
        }

        $product = $item['product'] ?? false;
        $name = ($product && isset($product['title']))
            ? $product['title']
            : 'Unknown Product';

        echo 'Attempting to transform data for ' . $name . PHP_EOL;

        $brandName = $item['vendor'] ?? false;
        $bReplace = static::$replaceBrandMappings[$brandName] ?? $brandName;
        if (Str::startsWith($name, $bReplace)) {
            $name = trim(Str::remove($bReplace, $name, false));
        }

        $brandId = $brandName ? $this->locateVendor($brandName) : null;

        echo ($brandId ? 'Brand located...' : 'No brand located!') . PHP_EOL;

        $peUrl = ($product && isset($product['url']))
            ? $product['url']
            : null;

        $description = null;

        if ($peUrl) {
            echo 'Product URL located for ' . $name . PHP_EOL;
            $productJson = $this->getProductJson($peUrl);
            if ($productJson['product'] && $productJson['product']['description']) {
                $description = $this->purifier->purify(
                    $productJson['product']['description']
                );
            }
        }

        $d = [
            'price' => [
                'aud' => (isset($item['price']) && isset($item['price']['amount']))
                    ? $item['price']['amount']
                    : null,
            ],
            'pedalempire_url' => $peUrl,
            'description' => $description,
        ];

        $tA = [];

        if ($item['type']) array_push($tA, $item['type']);

        $i = [
            'name' => $name,
            'data' => $d,
            'refId' => ($product && isset($product['id']))
                ? $product['id']
                : null,
        ];
        echo 'Retrieving item types...' . PHP_EOL;
        $types = $this->getTypes($tA);
        // dd($types);
        $newItem = new Item($i);
        $saved = $newItem->save();

        if (!$saved) {
            echo 'Item ' . $name . ' was not saved!' . PHP_EOL . PHP_EOL;
            array_push($this->errors, [
                $name,
            ]);
            return null;
        }

        $newItem->brand()->associate(
            $brandId ?? $this->otherBrandId()
        );
        echo 'Attached brand!' . PHP_EOL;
        $newItem->types()->attach(array_map(fn($t) => $t->getAttribute('id'), $types));
        echo 'Attached types!' . PHP_EOL;
        $saved = $newItem->save();
        $this->stored++;
        echo 'Item ' . $name . ' was saved successfully!' . PHP_EOL . PHP_EOL;
        return $newItem;
    }

    public function process(array $data, ?string $type = null)
    {
        $t = count($data);
        echo 'Found ' . $t . ' total items in JSON' . PHP_EOL;
        echo 'Attempting to transform items data...' . PHP_EOL;
        $this->forceType = ($type && !isset(static::$dontForce[$type])) ? $type : null;
        $result = [];
        try {
            foreach ($data as $id => $item) {
                echo PHP_EOL . 'Processing item #' . ($id + 1) . PHP_EOL;
                $i = $this->transform($item);
                if ($i) array_push($result, $i);
            }
        } catch (\Throwable $e) {
            array_push($this->errors, $e);
        }
        return [
            'totalItems' => $t,
            'errors' => count($this->errors),
            'stored' => $this->stored,
            'ignored' => $this->ignored,
        ];
    }
}
