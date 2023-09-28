<?php

namespace App\Http\Controllers\Types;

use App\Http\Controllers\Controller;
use App\Models\ItemType;
use Inertia\Inertia;

class ShowType extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(ItemType $type)
    {
        $type->load(['items', 'items.brand']);
        $totalItems = $type->items()->count();
        // dd($totalItems);
        return Inertia::render('Types/ShowType', [
            'type' => $type,
            'totalItems' => $totalItems,
        ]);
    }
}
