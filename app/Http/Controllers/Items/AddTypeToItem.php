<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\Item;
use App\Models\ItemType;
use Illuminate\Http\Request;

class AddTypeToItem extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Item $item, ItemType $type)
    {
        if ($type) {
            $item->types()->attach($type);
        }

        return redirect('/item/' . $item->getAttribute('id'));
    }
}
