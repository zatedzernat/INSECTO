<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateRoomsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('rooms', function (Blueprint $table) {
            $table->string('room_code',45);
            $table->string('room_name',45);
            $table->string('building_code',45)->unsigned();
            $table->string('cancel_flag',1);
            $table->timestamps();

            $table->foreign('building_code')
            ->references('building_code')
            ->on('buildings_table')
            ->onUpdate('cascade')
            ->onDelete('cascade');
        });

        Schema::enableForeignKeyConstraints();

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('rooms');
    }
}
