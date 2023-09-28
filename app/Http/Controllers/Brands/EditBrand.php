<?php

namespace App\Http\Controllers\Brands;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EditBrand extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Brand $brand)
    {
        return Inertia::render('Brands/EditBrand', [
            'brand'=> $brand,
        ]);
    }
}
