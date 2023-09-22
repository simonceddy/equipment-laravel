<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            BrandSeeder::class,
            TypeSeeder::class,
            ItemSeeder::class,
        ]);
        // \App\Models\User::factory(10)->create();

        // Creating ultra secure test user with very hard to crack publicly visible credentials
        \App\Models\User::factory()->create([
            'name' => 'Special Delivery',
            'email' => 'simon@simoneddy.com.au',
            'password' => Hash::make('password')
        ]);
    }
}
