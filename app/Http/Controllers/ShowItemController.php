<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Inertia\Inertia;

class ShowItemController extends Controller
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
