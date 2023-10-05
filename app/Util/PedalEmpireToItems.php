<?php
namespace App\Util;

use App\Models\Brand;
use App\Models\Item;
use App\Models\ItemType;
use Eddy\Crawlers\PE;
use Illuminate\Support\Str;

class PedalEmpireToItems
{
    private static $brandMappings = [
        'JHS Pedals' => 387,
        'other' => 33,
    ];

    private ?string $forceType = null;

    private int $stored = 0;

    private int $ignored = 0;

    private array $errors = [];

    public function __construct(private ?PE $pe = null)
    {
        if (!$pe) $this->pe = new PE();
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
            $t1 = ItemType::where('name', 'like', $this->forceType)
                ->first();
            array_push($t, $t1);
        }

        foreach ($types as $type) {
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
        $n = $item['product']['title'];

        $t = Item::where('name', 'like', $n)->count();

        if ($t === 0) {
            return false;
        }

        // TODO determine if item is the same or just has the same name

        return true;
    }

    public function transform(array $item)
    {
        $exists = $this->searchForItem($item);

        if ($exists) {
            echo 'Item found in database!';
            $this->ignored++;
            return null;
        }

        $product = $item['product'] ?? false;
        $name = ($product && isset($product['title']))
            ? $product['title']
            : 'Unknown Product';
        $brandName = $item['vendor'] ?? false;
        if (Str::startsWith($name, $brandName)) {
            $name = trim(Str::remove($brandName, $name, false));
        }
        $brandId = $brandName ? $this->locateVendor($brandName) : null;

        $d = [
            'price' => [
                'aud' => (isset($item['price']) && isset($item['price']['amount']))
                    ? $item['price']['amount']
                    : null,
            ],
            'pedalempire_url' => ($product && isset($product['url']))
                ? $product['url']
                : null,

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
        $types = $this->getTypes($tA);
        // dd($types);
        $newItem = new Item($i);
        $saved = $newItem->save();

        if (!$saved) {
            echo 'Item ' . $name . ' was not saved!' . PHP_EOL;
            array_push($this->errors, [
                $name,
            ]);
            return null;
        }

        $newItem->brand()->associate(
            $brandId ?? $this->otherBrandId()
        );
        $newItem->types()->attach(array_map(fn($t) => $t->getAttribute('id'), $types));
        $saved = $newItem->save();
        $this->stored++;
        echo 'Item ' . $name . ' was saved successfully!' . PHP_EOL;
        return $newItem;
    }

    public function process(array $data, ?string $type = null)
    {
        $this->forceType = $type ?? null;
        $result = [];
        try {
            foreach ($data as $item) {
                $i = $this->transform($item);
                if ($i) array_push($result, $i);
            }
        } catch (\Throwable $e) {
            array_push($this->errors, $e);
        }
        return [
            'items' => $result,
            'errors' => $this->errors,
            'stored' => $this->stored,
            'ignored' => $this->ignored,
        ];
    }
}
