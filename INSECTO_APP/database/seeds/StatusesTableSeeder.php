<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class StatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('statuses')->insert([
            'status_name' => 'waiting',
            'status_description' => 'Request Pending',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('statuses')->insert([
            'status_name' => 'open',
            'status_description' => 'Request Pending',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('statuses')->insert([
            'status_name' => 'on hold',
            'status_description' => 'Request On Hold',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('statuses')->insert([
            'status_name' => 'queue',
            'status_description' => 'รับงานแล้วแต่รอคิว',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('statuses')->insert([
            'status_name' => 'in progress',
            'status_description' => 'กำลังดำเนินงาน',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('statuses')->insert([
            'status_name' => 'closed',
            'status_description' => 'Request Completed',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
