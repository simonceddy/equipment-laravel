<?php

namespace App\Http\Controllers\Brands;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class StoreBrand extends Controller
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
        // TODO validate
        $data = $request->request->all();
        $brand = new Brand([
            'name' => $data['name'],
            'url' => $data['url'] ?? null,
        ]);
        $brand->save();

        return redirect('/brand/' . $brand->getAttribute('id'));
    }
}
