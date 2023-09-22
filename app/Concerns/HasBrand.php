<?php
namespace App\Concerns;

use App\Models\Brand;

trait HasBrand
{
    abstract public function belongsTo(
        $related,
        $foreignKey = null,
        $ownerKey = null,
        $relation = null
    );

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }
}
