<?php

use Illuminate\Database\Seeder;

class BuildingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('buildings')->insert([
            'building_code' => 'SIT',
            'building_name' => 'ตึกเทคโนโลยีสารสนเทศ',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'update_by' => 'seeder'
        ]);
        DB::table('buildings')->insert([
            'building_code' => 'CB2',
            'building_name' => 'ตึกCB2',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'update_by' => 'seeder'
        ]);
        DB::table('buildings')->insert([
            'building_code' => 'CB4',
            'building_name' => 'ตึกCB4',
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'update_by' => 'seeder'
        ]);
    }
}
