<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Item;
use Illuminate\Http\Request;

class UpdateItem extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Item $item)
    {
        $data = $request->request->all();
        $item->setAttribute('name', $data['name']);
        $item->setAttribute('url', $data['url']);
        if (isset($data['brandId']) && $data['brandId'] !== $item->getAttribute('brand_id')) {
            $newBrand = Brand::query()->where('id', $data['brandId'])->first();
            if ($newBrand) {
                $item->brand()->disassociate();
                $item->brand()->associate($newBrand);
            }
        }
        $item->save();
        return redirect('/item/' . $item->getAttribute('id'));
    }
}
