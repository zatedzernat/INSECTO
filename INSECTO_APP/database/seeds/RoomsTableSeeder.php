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
            'updated_by' => 'seeder'
        ]);
        DB::table('rooms')->insert([
            'room_code' => 'IT-201',
            'room_name' => 'Library',
            'building_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'updated_by' => 'seeder'
        ]);
        DB::table('rooms')->insert([
            'room_code' => 'IT/101',
            'room_name' => "Men's Toilet",
            'building_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'updated_by' => 'seeder'
        ]);
        DB::table('rooms')->insert([
            'room_code' => 'CB-2308',
            'room_name' => 'CB_2308',
            'building_id' => 2,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'updated_by' => 'seeder'
        ]);
        DB::table('rooms')->insert([
            'room_code' => 'CB-2307',
            'room_name' => 'Common_CB2',
            'building_id' => 2,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'updated_by' => 'seeder'
        ]);
    }
}
