<?php

namespace App\Http\Controllers\Brands;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;

class DeleteBrand extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Brand $brand)
    {
        $result = $brand->delete();
        return redirect('/brands');
    }
}
