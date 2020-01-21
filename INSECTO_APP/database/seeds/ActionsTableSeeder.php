<?php

use Illuminate\Database\Seeder;

class ActionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('actions')->insert([
            'action_code' => 'ADD',
            'action_description' => 'Add new data to table',
        ]);
        DB::table('actions')->insert([
            'action_code' => 'EDIT',
            'action_description' => 'Edit data in table',
        ]);
        DB::table('actions')->insert([
            'action_code' => 'DEL',
            'action_description' => 'Delete data in table',
        ]);
    }
}
