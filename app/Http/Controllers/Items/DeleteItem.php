<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Illuminate\Http\Request;

class DeleteItem extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Item $item)
    {
        $brand = $item->brand()->first();
        $item->types()->detach();
        $item->delete();
        return redirect($brand ? '/brand/' . $brand->getAttribute('id') : '/items');
    }
}
