<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class Problem_DetailsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('problem__details')->insert([
            'item_id' => 1,
            'problem_des_id' => 4,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__details')->insert([
            'item_id' => 1,
            'problem_des_id' => 6,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__details')->insert([
            'item_id' => 1,
            'problem_des_id' => 7,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__details')->insert([
            'item_id' => 2,
            'problem_des_id' => 4,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__details')->insert([
            'item_id' => 2,
            'problem_des_id' => 5,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__details')->insert([
            'item_id' => 3,
            'problem_des_id' => 6,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__details')->insert([
            'item_id' => 4,
            'problem_des_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__details')->insert([
            'item_id' => 4,
            'problem_des_id' => 2,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__details')->insert([
            'item_id' => 4,
            'problem_des_id' => 3,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__details')->insert([
            'item_id' => 4,
            'problem_des_id' => 9,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__details')->insert([
            'item_id' => 4,
            'problem_des_id' => 10,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__details')->insert([
            'item_id' => 5,
            'problem_des_id' => 1,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__details')->insert([
            'item_id' => 5,
            'problem_des_id' => 2,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problem__details')->insert([
            'item_id' => 5,
            'problem_des_id' => 8,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
