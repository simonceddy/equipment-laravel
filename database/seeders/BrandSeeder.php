<?php

namespace Database\Seeders;

use App\Models\Brand;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class BrandSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $disk = Storage::disk('dev');
        // dd($disk);
        $data = json_decode($disk->get('vendors.json'), true);
        // dd($data);
        foreach ($data as $vendor) {
            $brand = new Brand([
                'refId' => $vendor['id'],
                'name' => $vendor['name']
            ]);

            $brand->save();
        }
    }
}
