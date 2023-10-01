<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\ItemType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CreateItem extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $brands = Brand::select(['name', 'id'])->orderBy('name')->get();
        $types = ItemType::select(['name', 'id'])->orderBy('name')->get();
        return Inertia::render('Items/CreateItem', [
            'brands' => $brands,
            'types' => $types,
        ]);
    }
}
