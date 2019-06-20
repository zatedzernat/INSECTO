<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('items')->insert([
            'item_name' => 'keyboard',
            'picture' => 'Keyboard.jpg',
            'room_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('items')->insert([
            'item_name' => 'Monitor',
            'picture' => 'Monitor.jpg',
            'room_id' => 2,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('items')->insert([
            'item_name' => 'Microphone',
            'picture' => 'Microphone.jpg',
            'room_id' => 3,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('items')->insert([
            'item_name' => 'ชักโครก',
            'picture' => 'Flush.jpg',
            'room_id' => 6,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('items')->insert([
            'item_name' => 'ก๊อกน้ำ',
            'picture' => 'Tap.jpg',
            'room_id' => 7,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
