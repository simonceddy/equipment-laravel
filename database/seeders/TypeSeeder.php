<?php

namespace Database\Seeders;

use App\Models\ItemType;
use Eddy\ModularGrid\Util\URL;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class TypeSeeder extends Seeder
{
    private static $categoryTypes = [
        'Eurorack',
        'Pedal',
        '500 Series',
        'AE Modular',
        'Frac',
        'Buchla',
        'Serge',
        'MU',
        'MOTM',
        'Modcan A',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (static::$categoryTypes as $c) {
            $itemType = new ItemType([
                'name' => $c
            ]);

            $itemType->save();
        }
        $disk = Storage::disk('dev');

        $data = json_decode($disk->get('categories.json'), true);
        $ids = [];
        $filtered = array_filter($data, function ($d) use ($ids) {
            if (isset($d['refId'])) {
                if (isset($ids[$d['refId']])) {
                    return false;
                }
                $ids[$d['refId']] = true;
            }
            return true;
        });
        foreach ($filtered as $c) {
            $itemType = new ItemType([
                'refId' => $c['refId'],
                'name' => $c['name']
            ]);

            $itemType->save();
        }
    }
}
