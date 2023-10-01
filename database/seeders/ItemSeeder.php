<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Item;
use App\Models\ItemType;
use App\Util\ModularGridToItems;
use Eddy\Crawlers\ModularGrid\Wrapper;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\DomCrawler\Crawler;

class ItemSeeder extends Seeder
{
    private ?string $currentType = null;

    public function __construct(private ?Wrapper $mg)
    {
        if (!$mg) $this->mg = new Wrapper();
    }

    // private function mgUrl(string $c, string $slug)
    // {
    //     return static::$mg . '/' . $c . '/' . $slug;
    // }

    // private function pingMg(string $url)
    // {
    //     $ch = curl_init($url);
    //     curl_setopt($ch, CURLOPT_TIMEOUT, 5);
    //     curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //     $data = curl_exec($ch);
    //     $httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    //     curl_close($ch);
    //     return $httpcode >= 200 && $httpcode < 300 ? $data : false;
    // }

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
                        $this->currentType = ModularGridToItems::$categoryTypes[$s];
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

    private function getType(string $type)
    {
        $t = ItemType::query()->where('name', 'like', trim($type))->first();
        return $t ?: false;
    }

    private function updateItemFromRes(Item $item, $res)
    {
        if ($this->currentType) {
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
                    echo 'Type: ' . $type . ' attached to ' . $item->getAttribute('name') . PHP_EOL;
                }
            }
        }
        if ($link) {
            $item->setAttribute('url', $link);
            $item->save();
            echo 'Attached link to ' . $item->getAttribute('name') . PHP_EOL;
        }
    }

    private function seedTestData()
    {
        $disk = Storage::disk('dev');
        $data = json_decode($disk->get('data.json'), true);
        // dd($data);
        $totalData = count($data);
        foreach ($data as $key => $item) {
            echo PHP_EOL . 'Processing ' . ($key + 1) . '/' . $totalData . PHP_EOL;
            $brandId = null;
            if (isset($item['vendor']) && isset($item['vendor']['id'])) {
                $brand = Brand::query()->where('refId', $item['vendor']['id'])->first();
                if ($brand) $brandId = $brand->getAttribute('id');
                // dd($brand);
            }

            $i = [
                'brand_id' => $brandId,
                'name' => $item['name'] ?? '',
                'refId' => $item['id'] ?? null,
                'data' => [
                    'size' => $item['size'] ?? null,
                    'description' => $item['description'] ?? null,
                    'modulargrid_slug' => $item['slug'] ?? null,
                    'power' => $item['power'] ?? null,
                    'price' => $item['price'] ?? null,
                ],
            ];

            $newItem = new Item($i);
            $newItem->save();
            if ($item['slug']) {
                $res = $this->scanModularGrid($item['slug']);
                if ($res) $this->updateItemFromRes($newItem, $res);
            }
            echo 'Item: ' . $newItem->getAttribute('name') . ' saved!' . PHP_EOL . PHP_EOL;
        }
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Item::factory(500)->create();
        // $this->seedTestData();
    }
}
