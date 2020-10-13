<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

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
            'name' => 'seeder',
            'email' => 'test@gmail.com',
            'password' => Hash::make(config('app.test_password')),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('users')->insert([
            'name' => 'wait for log-in',
            'email' => 'wait@gmail.com',
            'password' => Hash::make(config('app.test_password')),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('users')->insert([
            'name' => 'BILL',
            'email' => 'bill@gmail.com',
            'password' => Hash::make(config('app.test_password')),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('users')->insert([
            'name' => 'Hong',
            'email' => 'hong@gmail.com',
            'password' => Hash::make(config('app.test_password')),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('users')->insert([
            'name' => 'TINY',
            'email' => 'tiny@gmail.com',
            'password' => Hash::make(config('app.test_password')),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('users')->insert([
            'name' => 'problem sender',
            'email' => 'sender@gmail.com',
            'password' => Hash::make(config('app.test_password')),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
