<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class ItemsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('items')->insert([
            'item_code' => 'FCU1-23',
            'item_name' => 'เครื่องปรับอากาศ',
            'room_id' => 3,
            'type_id' => 4,
            'group' => 'N',
            'brand_id' => 4,
            'serial_number' =>null,
            'model' => null,
            'note' => null,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        DB::table('items')->insert([
            'item_code' => 'FCU1-24',
            'item_name' => 'เครื่องปรับอากาศ',
            'room_id' => 3,
            'type_id' => 4,
            'group' => 'N',
            'brand_id' => 5,
            'serial_number' =>null,
            'model' => null,
            'note' => null,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        DB::table('items')->insert([
            'item_code' => 'ROOM-103',
            'item_name' => 'อื่น ๆ',
            'room_id' => 3,
            'type_id' => 6,
            'group' => 'Y',
            'brand_id' => null,
            'serial_number' => null,
            'model' => null,
            'note' => null,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        // DB::table('items')->insert([
        //     'item_code' => 'ROOM-DOOR-3',
        //     'item_name' => 'ประตู',
        //     'room_id' => 3,
        //     'type_id' => 6,
        //     'group' => 'Y',
        //     'brand_id' => null,
        //     'serial_number' => null,
        //     'model' => null,
        //     'note' => null,
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now(),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
        // DB::table('items')->insert([
        //     'item_code' => 'Train1-PC-00',
        //     'item_name' => 'PC',
        //     'room_id' => 1,
        //     'type_id' => 2,
        //     'group' => 'N',
        //     'brand_id' => 1,
        //     'serial_number' =>'8CC9090LDQ',
        //     'model' => 'Prodesk-400G4',
        //     'note' => null,
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now(),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
        // DB::table('items')->insert([
        //     'item_code' => 'Train1-PC-11',
        //     'item_name' => 'PC',
        //     'room_id' => 1,
        //     'type_id' => 2,
        //     'group' => 'N',
        //     'brand_id' => 2,
        //     'serial_number' =>'8CC9090LCZ',
        //     'model' => 'Prodesk-400G4',
        //     'note' => null,
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now(),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
        // DB::table('items')->insert([
        //     'item_code' => 'LIB-LIGHT',
        //     'item_name' => 'หลอดไฟกลม',
        //     'room_id' => 2,
        //     'type_id' => 1,
        //     'group' => 'Y',
        //     'brand_id' => null,
        //     'serial_number' => null,
        //     'model' => null,
        //     'note' => null,
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now(),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
        DB::table('items')->insert([
            'item_code' => 'LIGHT-103',
            'item_name' => 'หลอดไฟแบน',
            'room_id' => 3,
            'type_id' => 1,
            'group' => 'Y',
            'brand_id' => null,
            'serial_number' => null,
            'model' => null,
            'note' => null,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        DB::table('items')->insert([
            'item_code' => 'TOL-101',
            'item_name' => 'อื่น ๆ',
            'room_id' => 8,
            'type_id' => 3,
            'group' => 'Y',
            'brand_id' => null,
            'serial_number' => null,
            'model' => null,
            'note' => null,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        DB::table('items')->insert([
            'item_code' => 'TOL-102',
            'item_name' => 'อื่น ๆ',
            'room_id' => 9,
            'type_id' => 3,
            'group' => 'Y',
            'brand_id' => null,
            'serial_number' => null,
            'model' => null,
            'note' => null,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        // DB::table('items')->insert([
        //     'item_code' => 'TOL-FLUSH-01',
        //     'item_name' => 'ชักโครก1',
        //     'room_id' => 8,
        //     'type_id' => 3,
        //     'group' => 'Y',
        //     'brand_id' => null,
        //     'serial_number' => null,
        //     'model' => null,
        //     'note' => null,
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now(),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
        // DB::table('items')->insert([
        //     'item_code' => 'TOL-FLUSH-02',
        //     'item_name' => 'ชักโครก2',
        //     'room_id' => 8,
        //     'type_id' => 3,
        //     'group' => 'Y',
        //     'brand_id' => null,
        //     'serial_number' => null,
        //     'model' => null,
        //     'note' => null,
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now(),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
        // DB::table('items')->insert([
        //     'item_code' => 'TOL-FLUSH-03',
        //     'item_name' => 'ชักโครก3',
        //     'room_id' => 9,
        //     'type_id' => 3,
        //     'group' => 'Y',
        //     'brand_id' => null,
        //     'serial_number' => null,
        //     'model' => null,
        //     'note' => null,
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now(),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
        // DB::table('items')->insert([
        //     'item_code' => 'TOL-FLUSH-04',
        //     'item_name' => 'ชักโครก4',
        //     'room_id' => 9,
        //     'type_id' => 3,
        //     'group' => 'Y',
        //     'brand_id' => null,
        //     'serial_number' => null,
        //     'model' => null,
        //     'note' => null,
        //     'cancel_flag' => 'N',
        //     'created_at' => Carbon::now(),
        //     'updated_at' => Carbon::now(),
        //     'user_id' => 1
        // ]);
        DB::table('items')->insert([
            'item_code' => 'TOL1-LIGHT',
            'item_name' => 'หลอดไฟกลม',
            'room_id' => 8,
            'type_id' => 1,
            'group' => 'Y',
            'brand_id' => null,
            'serial_number' => null,
            'model' => null,
            'note' => null,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
        DB::table('items')->insert([
            'item_code' => 'TOL2-LIGHT',
            'item_name' => 'หลอดไฟกลม',
            'room_id' => 9,
            'type_id' => 1,
            'group' => 'Y',
            'brand_id' => null,
            'serial_number' => null,
            'model' => null,
            'note' => null,
            'cancel_flag' => 'N',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
            'user_id' => 1
        ]);
    }
}
