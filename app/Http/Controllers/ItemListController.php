<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemListController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $q = Item::with('brand')->orderBy('name');
        return Inertia::render('Items/ListItems', [
            'items' => $q->get(),
            'total' => $q->count()
        ]);
    }
}
