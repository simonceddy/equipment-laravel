<?php

namespace App\Http\Controllers;

use App\Models\ItemType;
use Inertia\Inertia;

class ShowTypeController extends Controller
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
        $type->load('items');
        return Inertia::render('Types/ShowType', [
            'type' => $type
        ]);
    }
}
