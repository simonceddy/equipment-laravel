<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SetBrandForMany extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $data = $request->request->all();
        $q = $request->query->get('items');
        $brands = Brand::select(['name', 'id'])->orderBy('name')->get();
        if (!$q) {
            // TODO return no items

        }
        // TODO validate ids
        $ids = explode(',', $q);
        $r = Item::with('brand')->whereIn('id', $ids)->get();
        return Inertia::render('Items/SetItemsBrand', [
            'items' => $r,
            'brands' => $brands,
        ]);
    }
}
