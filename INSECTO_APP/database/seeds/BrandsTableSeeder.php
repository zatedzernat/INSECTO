<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class BrandsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('brands')->insert([
            'brand_id' => 1,
            'brand_name' => 'HP',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'update_by' => 'seeder'
        ]);
        DB::table('brands')->insert([
            'brand_id' => 2,
            'brand_name' => 'Lenovo',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'update_by' => 'seeder'
        ]);
        DB::table('brands')->insert([
            'brand_id' => 3,
            'brand_name' => 'Saijo-Denki',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'update_by' => 'seeder'
        ]);
        DB::table('brands')->insert([
            'brand_id' => 4,
            'brand_name' => 'TRANE',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'update_by' => 'seeder'
        ]);
        DB::table('brands')->insert([
            'brand_id' => 5,
            'brand_name' => 'YORK',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'update_by' => 'seeder'
        ]);
        DB::table('brands')->insert([
            'brand_id' => 6,
            'brand_name' => 'StarAir',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'update_by' => 'seeder'
        ]);
    }
}
