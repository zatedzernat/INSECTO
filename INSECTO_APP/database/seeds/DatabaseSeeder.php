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
            UsersTableSeeder::class,
            BuildingsTableSeeder::class,
            RoomsTableSeeder::class,
            BrandsTableSeeder::class,
            Item_TypesTableSeeder::class,
            Problem_DescriptionsTableSeeder::class,
            // ItemsTableSeeder::class,
            StatusesTableSeeder::class,
            // Notification_ProblemsTableSeeder::class,
        ]);
    }
}
