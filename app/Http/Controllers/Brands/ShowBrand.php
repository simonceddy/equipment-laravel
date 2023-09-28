<?php

namespace App\Http\Controllers\Brands;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Inertia\Inertia;

class ShowBrand extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'verified']);
    }

    /**
     * Handle the incoming request.
     */
    public function __invoke(Brand $brand)
    {
        $brand->load(['items']);
        return Inertia::render('Brands/ShowBrand', [
            'brand' => $brand
        ]);
    }
}
