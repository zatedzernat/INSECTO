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
            BuildingsTableSeeder::class, //comment when deployed
            RoomsTableSeeder::class, //comment when deployed
            BrandsTableSeeder::class, //comment when deployed
            Item_TypesTableSeeder::class, //comment when deployed
            Problem_DescriptionsTableSeeder::class, //comment when deployed
            ItemsTableSeeder::class,  //comment when deployed
            StatusesTableSeeder::class,
            // Notification_ProblemsTableSeeder::class, //comment when deployed
            History_LogsTableSeeder::class //comment when deployed
        ]);
    }
}
