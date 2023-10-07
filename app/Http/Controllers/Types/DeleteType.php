<?php

namespace App\Http\Controllers\Types;

use App\Http\Controllers\Controller;
use App\Models\ItemType;
use Illuminate\Http\Request;

class DeleteType extends Controller
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
        $result = $type->delete();

        return redirect('/types');
    }
}
