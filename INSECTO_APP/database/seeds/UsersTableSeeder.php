<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'test_admin',
            'email' => 'test@gmail.com',
            'password' => Hash::make(config('app.test_password')),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }

}
