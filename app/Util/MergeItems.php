<?php
namespace App\Util;

use App\Models\Item;

class MergeItems
{
    public function __construct()
    {
    }

    public function findSimilar(int $id)
    {
        /** @var Item */
        $item = Item::where('id', $id)->first();
        if (!$item) {
            // Invalid ID
            throw new \RuntimeException('Unknown id: ' . $id);
        }
        $item->load('brand');
        $itemName = $item->getAttribute('name');
        $brandName = $item->brand()->first()->getAttribute('name');
        // dd($brandName);
        $similar = Item::with('brand')
            ->join('brands', 'items.brand_id', '=', 'brands.id')
            ->select('items.*')
            ->where('items.name', 'like', '%' . $itemName . '%')
            ->where('brands.name', 'like', '%' . $brandName . '%')
            ->get();
        $t = $similar->count();
        if ($t <= 1) {
            echo 'No duplicates located.' . PHP_EOL;
        } else {
            echo 'Located ' . $t . ' items' . PHP_EOL;
            foreach ($similar as $i) {
                echo $i->brand()->first()->getAttribute('name') . ' ' . $i->getAttribute('name') . PHP_EOL;
            }
        }
        // dd($similar);
    }
}
