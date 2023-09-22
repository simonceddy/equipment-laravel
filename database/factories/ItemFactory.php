<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Amplifiers>
 */
class ItemFactory extends Factory
{
    use RandomBrand;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word,
            'brand_id' => $this->brandId(),
            'type' => mt_rand(0, 6),
            'url' => fake()->url,
        ];
    }
}
