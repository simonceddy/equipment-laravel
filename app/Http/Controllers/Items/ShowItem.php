<?php

namespace App\Http\Controllers\Items;

use App\Http\Controllers\Controller;
use App\Models\Item;
use Inertia\Inertia;

class ShowItem extends Controller
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
        $item->load(['brand', 'types']);
        return Inertia::render('Items/ShowItem', [
            'item' => $item
        ]);
    }
}
