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
            'problem_des_id' => 4,
            'problem_description' => 'เครื่องปรับอากาศมีกลิ่น',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        DB::table('notification__problems')->insert([
            'item_id' => 1,
            'status_id' => 1,
            'problem_des_id' => 5,
            'problem_description' => 'เครื่องปรับอากาศไม่เย็น',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
    }
}
