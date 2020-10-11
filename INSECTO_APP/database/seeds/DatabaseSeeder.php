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
            ItemsTableSeeder::class,  //comment when deployed
            StatusesTableSeeder::class,
            // Notification_ProblemsTableSeeder::class, //comment when deployed
            History_LogsTableSeeder::class
        ]);
    }
}
