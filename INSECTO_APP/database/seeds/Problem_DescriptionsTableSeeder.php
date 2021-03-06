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
            'problem_description' => 'เปิดไม่ติด',
            'type_id' => 2,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'จอฟ้า',
            'type_id' => 2,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'เมาส์เสีย',
            'type_id' => 2,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'คียบอร์ดเสีย',
            'type_id' => 2,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'จอเสีย',
            'type_id' => 2,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'สีเพี้ยน',
            'type_id' => 2,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'เน็ตเวิร์คใช้ไม่ได้',
            'type_id' => 2,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'พอร์ตเน็ตเวิร์คเสีย',
            'type_id' => 2,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'เครื่องปรับอากาศมีกลิ่น',
            'type_id' => 4,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'เครื่องปรับอากาศไม่ติด',
            'type_id' => 4,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'เครื่องปรับอากาศไม่เย็น',
            'type_id' => 4,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'เครื่องปรับอากาศน้ำรั่ว/หยด',
            'type_id' => 4,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'Filter เครื่องปรับอากาศสกปรก',
            'type_id' => 4,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'หลอดไฟดับ',
            'type_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'หลอดไฟกระพริบ',
            'type_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'โถปัสสาวะชำรุด',
            'type_id' => 3,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'โถ่ชักโครกชำรุด',
            'type_id' => 3,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'อ่างล้างมือชำรุด',
            'type_id' => 3,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'ประตูห้องน้ำชำรุด',
            'type_id' => 3,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'ปริ้นเตอร์ชำรุด',
            'type_id' => 5,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'ประตูชำรุด',
            'type_id' => 6,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'เก้าอี้ชำรุด',
            'type_id' => 6,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'โต๊ะชำรุด',
            'type_id' => 6,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
        DB::table('problem__descriptions')->insert([
            'problem_description' => 'หน้าต่างชำรุด',
            'type_id' => 6,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1,
        ]);
    }
}
