<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\{
    Brand,
    Item,
    ItemType
};
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditItem extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Item $item)
    {
        $brands = Brand::all(['name', 'id']);
        $types = ItemType::all(['name', 'id']);
        $item->load(['brand', 'types']);
        return Inertia::render('Items/EditItem', [
            'brands' => $brands,
            'item' => $item,
            'types' => $types,
        ]);
    }
}
