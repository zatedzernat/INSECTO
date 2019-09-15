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
            'status_id' => 0,
            'status_name' => 'waiting',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('statuses')->insert([
            'status_id' => 1,
            'status_name' => 'success',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('statuses')->insert([
            'status_id' => 2,
            'status_name' => 'fixing',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('statuses')->insert([
            'status_id' => 99,
            'status_name' => 'unknown',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
