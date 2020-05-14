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
            'status_description' => 'Request Waiting',
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
            'status_description' => 'Request In Queue',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('statuses')->insert([
            'status_name' => 'in progress',
            'status_description' => 'Request In Progress',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('statuses')->insert([
            'status_name' => 'closed',
            'status_description' => 'will close in 7 days, INSECTO aren\'t relevant',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('statuses')->insert([
            'status_name' => 'reopen',
            'status_description' => 'Re Open Request',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('statuses')->insert([
            'status_name' => 'resolved',
            'status_description' => 'Resolved',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
