<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class Notification_ProblemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('notification__problems')->insert([
            'item_id' => 1,
            'status_id' => 1,
            'problem_des_id' => 1,
            'problem_description' => 'จอไม่ติด',
            'sender_ip' => '127.0.0.1',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'update_by' => 'test'
        ]);
    }
}
