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
            'status_name' => 'Open',
            'status_description' => 'Request Pending',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('statuses')->insert([
            'status_name' => 'On Hold',
            'status_description' => 'Request On Hold',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('statuses')->insert([
            'status_name' => 'Queue',
            'status_description' => 'รับงานแล้วแต่รอคิว',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('statuses')->insert([
            'status_name' => 'In Progress',
            'status_description' => 'กำลังดำเนินงาน',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('statuses')->insert([
            'status_name' => 'Closed',
            'status_description' => 'Request Completed',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
