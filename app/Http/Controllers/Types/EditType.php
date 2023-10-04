<?php

namespace App\Http\Controllers\Types;

use App\Http\Controllers\Controller;
use App\Models\ItemType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditType extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ItemType $type)
    {
        return Inertia::render('Types/EditType', [
            'type' => $type,
        ]);
    }
}
