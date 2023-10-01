<?php
namespace App\Util;

use App\Models\Brand;
use App\Models\Item;
use App\Models\ItemType;
use Eddy\Crawlers\ModularGrid\Wrapper;

class ModularGridToItems
{
    public static array $categoryTypes = [
        'e' => 'Eurorack',
        'a' => '500 Series',
        'p' => 'Pedal',
        't' => 'AE Modular',
        'u' => 'Buchla',
        'f' => 'Frac',
        'c' => 'Modcan A',
        'm' => 'MOTM',
        'd' => 'MU',
        's' => 'Serge',
    ];

    private array $ids = [];

    private ?string $currentType = null;

    private ?string $forceType = null;

    private string $categorySegment = 'e';

    private ?ItemType $forceTypeInstance = null;

    public function __construct(private ?Wrapper $mg)
    {
        if (!$mg) $this->mg = new Wrapper();
    }

    private function forcedType()
    {
        if ($this->forceType && !isset($this->forceTypeInstance)) {
            $this->forceTypeInstance = $this->getType($this->forceType);
        }
        return $this->forceTypeInstance;
    }

    private function getBrand(string $refId)
    {
        $b = Brand::query()->where('refId', 'like', trim($refId))->first();
        return $b ?: false;
    }

    private function getType(string $type)
    {
        $t = ItemType::query()->where('name', 'like', trim($type))->first();
        return $t ?: false;
    }

    private function resolveModules(array $data)
    {
        if (isset($data['rack']) && isset($data['rack']['Module'])) {
            return $data['rack']['Module'];
        }
        if (isset($data['Module'])) return $data['Module'];
        if (is_array($data)) return $data;
        return false;
    }

    private function filterModules(array $modules)
    {
        return array_filter($modules, function ($m) {
            if (!isset($m['id'])) {
                echo 'No id found on module!' . PHP_EOL;
                return false;
            }
            if (isset($this->ids[$m['id']])) {
                return false;
            }
            if (Item::query()->where('refId', $m['id'])->count() > 0) {
                echo 'Item ' . ($m['name'] ?? $m['id']) . ' already exists. Skipping...' . PHP_EOL;
                return false;
            }
            $this->ids[$m['id']] = true;
            return true;
        });
    }

    private function extractData(string $data)
    {
        $crawler = $this->mg->crawl($data);
        return [
            $crawler->itemTags(),
            $crawler->itemLink(),
        ];
    }

    private function scanModularGrid(string $slug)
    {
        $res = false;
        foreach ($this->mg->url::$shorthand as $c => $s) {
            $url = call_user_func([$this->mg->url, 'for' . ucfirst($c)], $slug);
            if ($url) {
                // dd($url);
                try {
                    $res = $this->mg->ping($url);
                    if ($res !== false) {
                        $this->currentType = static::$categoryTypes[$s];
                        echo 'Located Item in category: ' . $c . PHP_EOL;
                        break;
                    }
                } catch (\Throwable $e) {
                    dd($url, $e->getMessage());
                }
            }
        }

        return $res ?: [];
    }

    private function updateItemFromRes(Item $item, $res)
    {
        $name = $item->getAttribute('name');
        if ($this->forceType) {
            // TODO tidy duplicate code
            $t1 = $this->forcedType();
            $item->types()->attach($t1);
            echo 'Type: ' . $t1->getAttribute('name') . ' attached to ' . $item->getAttribute('name') . PHP_EOL;
        } else if ($this->currentType) {
            $t1 = $this->getType($this->currentType);
            $item->types()->attach($t1);
            echo 'Type: ' . $t1->getAttribute('name') . ' attached to ' . $item->getAttribute('name') . PHP_EOL;

            $this->currentType = null;
        }
        [$types, $link] = $this->extractData($res);
        if (!empty($types)) {
            foreach ($types as $type) {
                $t = $this->getType($type);
                if ($t) {
                    $item->types()->attach($t);
                    echo 'Type: ' . $type . ' attached to ' . $name . PHP_EOL;
                }
            }
        }
        if ($link) {
            $item->setAttribute('url', $link);
            $item->save();
            echo 'Set link: ' . $link . ' to item: ' . $name . PHP_EOL;
        }

        echo 'Saved item ' . $name . PHP_EOL . PHP_EOL;
    }

    private function getModuleMGLink(string $slug)
    {
        $url = $this->mg->url::BASE . '/' . $this->categorySegment . '/' . $slug;
        return $url;
    }

    public function processModule(array $module)
    {
        // dd($this->forcedType());
        try {

            $brand = isset($module['vendor_id']) ? $this->getBrand($module['vendor_id']) : null;

            $i = [
                'name' => $module['name'] ?? '',
                'refId' => $module['id'] ?? null,
                'data' => [
                    'size' => [
                        'hp' => $module['te'] ?? null,
                        'depth' => $module['depth'] ?? null,
                        'width' => $module['width'] ?? null,
                        'height' => $module['height'] ?? null,
                        '1u' => $module['is_1u'] ?? null
                    ],
                    'description' => $module['description'] ?? null,
                    'modulargrid_slug' => $module['slug'] ?? null,
                    'modulargrid_url' => $module['slug']
                        ? $this->getModuleMGLink($module['slug'])
                        : null,
                    'power' => [
                        'currentNeg' => $module['current_min'] ?? null,
                        'currentPos' => $module['current_plus'] ?? null,
                        'current5v' => $module['current5v'] ?? null,
                    ],
                    'price' => [
                        'eur' => $module['price_eur'] ?? null,
                        'usd' => $module['price_usd'] ?? null,
                    ],
                ],
            ];

            $newItem = new Item($i);
            echo 'Created item ' . $i['name'] . PHP_EOL;
            if ($brand) $newItem->brand()->associate($brand);
            $newItem->save();
            if ($module['slug']) {
                $res = $this->scanModularGrid($module['slug']);
                if ($res) $this->updateItemFromRes($newItem, $res);
            }
            return $newItem;
        } catch (\Throwable $e) {
            echo 'Encountered an error!' . PHP_EOL;
            throw $e;
        }
    }

    public function processModules(array $modules)
    {
        $totalModules = count($modules);
        echo PHP_EOL . 'Located ' . $totalModules . ' new modules' . PHP_EOL;
        $i = 1;
        foreach ($modules as $m) {
            echo PHP_EOL . 'Processing ' . ($i) . '/' . $totalModules . PHP_EOL;
            $this->processModule($m);
            $i += 1;
        }
    }

    public function process(string $json)
    {
        $data = json_decode($json, true);

        $modules = $this->resolveModules($data);
        if (!$modules) {
            throw new \RuntimeException('Could not find module data.');
        }
        $filtered = $this->filterModules($modules);
        if (empty($filtered)) {
            echo PHP_EOL . 'No new modules to add.' . PHP_EOL . PHP_EOL;
        } else $this->processModules($filtered);
    }

    public function processURL(string $url)
    {
        $res = $this->mg->client->request('GET', $url);

        $status = $res->getStatusCode();

        if ($status === 404) {
            echo 'Unable to resolve url: ' . $url . PHP_EOL;
            return false;
        }
        else if ($status !== 200) {
            echo 'Bad status for url: ' . $url . PHP_EOL;
            return false;
        }

        $a = $this->mg->url::extractCategory($url);
        if ($a && static::$categoryTypes[$a]) {
            $this->forceType = static::$categoryTypes[$a];
            $this->categorySegment = $a;
        } else {
            $this->categorySegment = 'e';
        }
        echo 'Response received...' . PHP_EOL;
        $body = $res->getBody()->getContents();
        echo 'Crawling for json...' . PHP_EOL;
        $json = $this->mg->crawl($body)->rackJson();
        return $this->process($json);
    }
}
