<?php

use App\Http\Models\Notification_Problem;
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
        $amount = $this->command->ask("Enter amount of seeder: ", 200);
        factory(Notification_Problem::class, (int)$amount)->create();

        // DB::table('notification__problems')->insert([
        //     'item_id' => 1,
        //     'status_id' => 1,
        //     'problem_des_id' => 9,
        //     'problem_description' => 'เครื่องปรับอากาศมีกลิ่น',
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now()->subMinutes(60),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
        // DB::table('notification__problems')->insert([
        //     'item_id' => 1,
        //     'status_id' => 1,
        //     'problem_des_id' => 11,
        //     'problem_description' => 'เครื่องปรับอากาศไม่เย็น',
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now()->subMinutes(50),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
        // DB::table('notification__problems')->insert([
        //     'item_id' => 3,
        //     'status_id' => 1,
        //     'problem_des_id' => 21,
        //     'problem_description' => 'ประตูชำรุด',
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now()->subMinutes(40),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
        // DB::table('notification__problems')->insert([
        //     'item_id' => 4,
        //     'status_id' => 1,
        //     'problem_des_id' => 15,
        //     'problem_description' => 'หลอดไฟกระพริบ',
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now()->subMinutes(30),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
        // DB::table('notification__problems')->insert([
        //     'item_id' => 5,
        //     'status_id' => 1,
        //     'problem_des_id' => 16,
        //     'problem_description' => 'โถปัสสาวะชำรุด',
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now()->subMinutes(20),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
        // DB::table('notification__problems')->insert([
        //     'item_id' => 5,
        //     'status_id' => 1,
        //     'problem_des_id' => 17,
        //     'problem_description' => 'โถชักโครกชำรุด',
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now()->subMinutes(10),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
    }
}
