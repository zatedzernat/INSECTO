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
            'email' => 'seeder@mail.com',
            'password' => Hash::make(config('app.test_password')),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('users')->insert([
            'name' => 'wait for log-in',
            'email' => 'wait@mail.com',
            'password' => Hash::make(config('app.test_password')),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('users')->insert([
            'name' => 'BILL',
            'email' => '60130500055@st.sit.kmutt.ac.th',
            'password' => Hash::make(config('app.test_password')),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('users')->insert([
            'name' => 'Hong',
            'email' => '60130500060@st.sit.kmutt.ac.th',
            'password' => Hash::make(config('app.test_password')),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('users')->insert([
            'name' => 'TINY',
            'email' => '60130500059@st.sit.kmutt.ac.th',
            'password' => Hash::make(config('app.test_password')),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('users')->insert([
            'name' => 'problem sender',
            'email' => 'problem_sender@mail.com',
            'password' => Hash::make(config('app.test_password')),
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now(),
        ]);
    }
}
