<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->string('item_code',45);
            $table->string('item_name',45);
            $table->string('room_code',45)->unsigned();
            $table->unsignedBigInteger('brand_id'); // form ของ fk ที่เป็นตัวเลข
            $table->string('serial_number',45)->nullable();
            $table->string('model',45)->nullable();
            $table->unsignedBigInteger('type_id');
            $table->string('cancel_flag',1);
            $table->timestamps();
            $table->string('update_by',45)->nullable();

            $table->foreign('room_code')
            ->references('room_code')
            ->on('rooms')
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreign('brand_id')
            ->references('brand_id')
            ->on('brands')
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreign('type_id')
            ->references('type_id')
            ->on('item__TypesTable')
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
        Schema::dropIfExists('items');
    }
}
