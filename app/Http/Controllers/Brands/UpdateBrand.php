<?php

namespace App\Http\Controllers\Brands;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class UpdateBrand extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, Brand $brand)
    {
        $data = $request->request->all();
        $brand->setAttribute('name', $data['name']);
        $brand->setAttribute('url', $data['url']);
        $brand->save();

        return redirect('/brand/' . $brand->getAttribute('id'));
    }
}
