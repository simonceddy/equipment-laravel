<?php

namespace App\Http\Controllers\Types;

use App\Http\Controllers\Controller;
use App\Models\ItemType;
use Illuminate\Http\Request;

class StoreType extends Controller
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
        $name = $request->request->get('name');
        $type = new ItemType([
            'name' => $name
        ]);
        $type->save();
        return redirect('/type/' . $type->getAttribute('id'));
    }
}
