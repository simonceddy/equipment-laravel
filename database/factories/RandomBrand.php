<?php

namespace Database\Factories;

use App\Models\Brand;

trait RandomBrand
{
    public function brandId()
    {
        return Brand::all()->random()->getAttribute('id');
    }
}
