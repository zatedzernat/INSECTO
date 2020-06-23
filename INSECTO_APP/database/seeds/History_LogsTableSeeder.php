<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class History_LogsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(2),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(4),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(6),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(8),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(10),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(12),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(14),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(16),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(18),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(20),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(22),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(24),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(26),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(28),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(30),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(32),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(34),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(36),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(38),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(40),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(42),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subMinutes(44),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(1),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(2),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(3),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(4),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(5),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(6),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(7),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(8),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(9),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(10),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(11),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(12),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(13),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(14),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(15),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(16),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(17),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(18),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(19),
            'updated_at' => Carbon::now(),
        ]);
        DB::table('audits')->insert([
            'event' => 'updated',
            'auditable_type' => 'App\Http\Models\Room',
            'auditable_id' => '1',
            'old_values' => '{"room_name":"Training Room1","user_id":1}',
            'new_values' => '{"room_name":"Training Room12","user_id":2}',
            'created_at' => Carbon::now()->subDays(20),
            'updated_at' => Carbon::now(),
        ]);
    }
}
