<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\{Brand, Item, ItemType};
use Illuminate\Http\Request;

class StoreItem extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        // TODO validate and confirm no errors
        $data = $request->request->all();
        // dd($data);
        $brand = isset($data['brandId'])
            ? Brand::where('id', $data['brandId'])->first()
            : null;
        // dd($brand, $data['brandId']);
        $item = new Item([
            'name' => $data['name'],
            'url' => $data['url'] ?? null,
        ]);

        $item->save();

        if ($brand) $item->brand()->associate($brand);

        if (isset($data['itemTypes']) && !empty($data['itemTypes'])) {
            foreach ($data['itemTypes'] as $t) {
                $type = ItemType::where('id', $t['id'])->first();
                if ($type) $item->types()->attach($type);
            }
        }
        $item->save();

        return redirect('/item/' . $item->getAttribute('id'));
    }
}
