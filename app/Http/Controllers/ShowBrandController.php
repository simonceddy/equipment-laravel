<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Inertia\Inertia;

class ShowBrandController extends Controller
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
