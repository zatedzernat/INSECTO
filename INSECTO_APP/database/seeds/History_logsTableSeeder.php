<?php

use Illuminate\Database\Seeder;

class History_logsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('history__logs')->insert([
            'transaction_id' => 5,
            'action_id' => 3,
            'table_name' => 'Items',
            'note' => 'delete PC01',
            'user' => 'System',
            'created_at' => '2020-01-18 16:30',
        ]);
        DB::table('history__logs')->insert([
            'transaction_id' => 4,
            'action_id' => 2,
            'table_name' => 'Buildings',
            'column_name' => 'test',
            'old_data' => '1',
            'new_data' => '2',
            'user' => 'System',
            'created_at' => '2020-01-18 12:50',
        ]);

        DB::table('history__logs')->insert([
            'transaction_id' => 3,
            'action_id' => 2,
            'table_name' => 'Items',
            'column_name' => 'room',
            'old_data' => 'training 1',
            'new_data' => 'training 5',
            'user' => 'System',
            'created_at' => '2020-01-17 08:12',
        ]);
        DB::table('history__logs')->insert([
            'transaction_id' => 3,
            'action_id' => 2,
            'table_name' => 'Items',
            'column_name' => 'note',
            'old_data' => 'null',
            'new_data' => 'test',
            'user' => 'System',
            'created_at' => '2020-01-17 08:12',
        ]);
        DB::table('history__logs')->insert([
            'transaction_id' => 2,
            'action_id' => 1,
            'table_name' => 'Rooms',
            'note' => 'add CB2306',
            'user' => 'System',
            'created_at' => '2020-01-17 02:10',
        ]);

        DB::table('history__logs')->insert([
            'transaction_id' => 1,
            'action_id' => 1,
            'table_name' => 'Statuses',
            'note' => 'add test',
            'user' => 'System',
            'created_at' => '2020-01-16 13:07',
        ]);
    }
}
