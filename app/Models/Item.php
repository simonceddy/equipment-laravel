<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    protected $casts = [
        'data' => 'array'
    ];

    protected $fillable = [
        'name',
        'refId',
        'data'
    ];

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function types()
    {
        return $this->belongsToMany(ItemType::class);
    }
}
