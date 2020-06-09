<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class RoomsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('rooms')->insert([
            'room_code' => 'IT-101',
            'room_name' => 'Training_Room1',
            'building_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        DB::table('rooms')->insert([
            'room_code' => 'IT-102',
            'room_name' => 'Training_Room2',
            'building_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        DB::table('rooms')->insert([
            'room_code' => 'IT-103',
            'room_name' => 'Training_Room3',
            'building_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        DB::table('rooms')->insert([
            'room_code' => 'IT-104',
            'room_name' => 'Training_Room4',
            'building_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        DB::table('rooms')->insert([
            'room_code' => 'IT-105',
            'room_name' => 'Training_Room5',
            'building_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        DB::table('rooms')->insert([
            'room_code' => 'IT-108',
            'room_name' => 'Computer_Lab2',
            'building_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        DB::table('rooms')->insert([
            'room_code' => 'IT-109',
            'room_name' => 'Computer_Lab1',
            'building_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
    }
}
