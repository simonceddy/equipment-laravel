<?php

namespace App\Http\Controllers\Types;

use App\Http\Controllers\Controller;
use App\Models\ItemType;
use Illuminate\Http\Request;

class UpdateType extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, ItemType $type)
    {
        $name = $request->request->get('name');
        $type->setAttribute('name', $name);
        $type->save();
        return redirect('/type/' . $type->getAttribute('id'));
    }
}
