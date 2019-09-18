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
            //if pk is string, it shoukld has primary() function
            $table->bigIncrements('room_id');
            $table->string('room_code',45);
            $table->string('room_name',45);
            $table->unsignedBigInteger('building_id');
            $table->string('cancel_flag',1);
            $table->timestamps();
            $table->string('update_by',45)->nullable();

            $table->foreign('building_id')
            ->references('building_id')
            ->on('buildings')
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
