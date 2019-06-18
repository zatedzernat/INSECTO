<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class Problem_DescriptionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('problem__descriptions')->insert([
            'problem_des' => 'น้ำรั่ว',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_des' => 'น้ำไม่ไหล',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_des' => 'ตัน',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_des' => 'เปิดไม่ติด',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_des' => 'สีเพี้ยน',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_des' => 'พัง',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_des' => 'ปุ่มเสีย',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_des' => 'เซ็นเซอร์พัง',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_des' => 'มีกลิ่นไม่พึงประสงค์',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_des' => 'สกปรก',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
