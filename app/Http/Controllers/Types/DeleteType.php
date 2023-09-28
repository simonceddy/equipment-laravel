<?php

namespace App\Http\Controllers\Types;

use App\Http\Controllers\Controller;
use App\Models\ItemType;
use Illuminate\Http\Request;

class DeleteType extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(ItemType $type)
    {
        $result = $type->delete();

        return redirect('/types');
    }
}
