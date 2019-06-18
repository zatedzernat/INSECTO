<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ProblemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('problems')->insert([
            'problem_date' => Carbon::now()->toDateTime(),
            'problem_detail_id' => 1,
            'problem_status' => 'success',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problems')->insert([
            'problem_date' => Carbon::now()->toDateTime(),
            'problem_detail_id' => 2,
            'problem_status' => 'success',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problems')->insert([
            'problem_date' => Carbon::now()->toDateTime(),
            'problem_detail_id' => 3,
            'problem_status' => 'success',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problems')->insert([
            'problem_date' => Carbon::now()->toDateTime(),
            'problem_detail_id' => 4,
            'problem_status' => 'success',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problems')->insert([
            'problem_date' => Carbon::now()->toDateTime(),
            'problem_detail_id' => 5,
            'problem_status' => 'success',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problems')->insert([
            'problem_date' => Carbon::now()->toDateTime(),
            'problem_detail_id' => 6,
            'problem_status' => 'success',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problems')->insert([
            'problem_date' => Carbon::now()->toDateTime(),
            'problem_detail_id' => 7,
            'problem_status' => 'success',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problems')->insert([
            'problem_date' => Carbon::now()->toDateTime(),
            'problem_detail_id' => 8,
            'problem_status' => 'success',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problems')->insert([
            'problem_date' => Carbon::now()->toDateTime(),
            'problem_detail_id' => 9,
            'problem_status' => 'success',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problems')->insert([
            'problem_date' => Carbon::now()->toDateTime(),
            'problem_detail_id' => 10,
            'problem_status' => 'success',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problems')->insert([
            'problem_date' => Carbon::now()->toDateTime(),
            'problem_detail_id' => 11,
            'problem_status' => 'success',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
        DB::table('problems')->insert([
            'problem_date' => Carbon::now()->toDateTime(),
            'problem_detail_id' => 12,
            'problem_status' => 'success',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
