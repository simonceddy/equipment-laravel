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
        $brands = Brand::select(['name', 'id'])->orderBy('name')->get();
        $types = ItemType::select(['name', 'id'])->orderBy('name')->get();
        $item->load(['brand', 'types']);
        return Inertia::render('Items/EditItem', [
            'brands' => $brands,
            'item' => $item,
            'types' => $types,
        ]);
    }
}
