<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        $this->call([
            RoomsTableSeeder::class,
            ItemsTableSeeder::class,
            Problem_DescriptionsTableSeeder::class,
            Problem_DetailsTableSeeder::class,
            BrandsTableSeeder::class,
            StatusesTableSeeder::class,
            // ProblemsTableSeeder::class
        ]);
    }
}
