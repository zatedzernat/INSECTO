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
            'floor' => '1',
            'room_name' => 'TRAIN1',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('rooms')->insert([
            'floor' => '1',
            'room_name' => 'TRAIN2',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('rooms')->insert([
            'floor' => '1',
            'room_name' => 'TRAIN3',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('rooms')->insert([
            'floor' => '1',
            'room_name' => 'TRAIN4',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('rooms')->insert([
            'floor' => '1',
            'room_name' => 'TRAIN5',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('rooms')->insert([
            'floor' => '1',
            'room_name' => 'ห้องน้ำหญิง',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('rooms')->insert([
            'floor' => '1',
            'room_name' => 'ห้องน้ำชาย',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('rooms')->insert([
            'floor' => '1',
            'room_name' => 'Lab-L',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('rooms')->insert([
            'floor' => '1',
            'room_name' => 'Lab-ข้างลิฟต์',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('rooms')->insert([
            'floor' => '1',
            'room_name' => 'Lab-ป.โท',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
