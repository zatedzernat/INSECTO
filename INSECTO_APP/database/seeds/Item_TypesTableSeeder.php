<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class Item_TypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('item__types')->insert([
            'type_name' => 'Light',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('item__types')->insert([
            'type_name' => 'Computer',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('item__types')->insert([
            'type_name' => 'Toilet',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('item__types')->insert([
            'type_name' => 'Air-Condition',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('item__types')->insert([
            'type_name' => 'Printer',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('item__types')->insert([
            'type_name' => 'Room',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
    }
}
