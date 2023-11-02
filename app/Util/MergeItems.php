<?php
namespace App\Util;

use App\Models\Item;
use Symfony\Component\Console\Output\OutputInterface;

class MergeItems
{
    public function __construct(private OutputInterface $output)
    {}

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
        $similar = Item::with('brand')
            ->join('brands', 'items.brand_id', '=', 'brands.id')
            ->select('items.*')
            ->where('items.name', 'like', '%' . $itemName . '%')
            ->where('brands.name', 'like', '%' . $brandName . '%')
            ->get();
        $t = $similar->count();
        if ($t <= 1) {
            $this->output->writeln('No duplicates located.');
            exit(1);
        }


        $this->output->writeln('Located ' . $t . ' items');
        foreach ($similar as $i) {
            $this->output->writeln(
                $i->brand()->first()['name'] . ' ' . $i['name']
            );
        }

    }
}
