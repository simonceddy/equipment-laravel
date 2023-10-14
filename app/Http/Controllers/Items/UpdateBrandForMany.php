<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Item;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class UpdateBrandForMany extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $data = $request->request->all();

        if (!isset($data['brandId'])
            || !isset($data['selectedItems'])
            || empty($data['selectedItems'])
        ) {
            // TODO
        }
        $brand = Brand::where('id', $data['brandId'])->first();
        if (!$brand) {
            // TODO
        }
        /** @var Builder */
        $q = Item::whereIn('id', $data['selectedItems']);
        $q->update([
            'brand_id' => $brand['id']
        ]);

        return redirect('/brand/' . $brand['id']);
    }
}
