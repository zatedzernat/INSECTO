<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateItemTypesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('item__types', function (Blueprint $table) {
            $table->bigIncrements('type_id');
            $table->string('type_name',45);
            $table->string('cancel_flag',1);
            $table->timestamps();
            $table->string('update_by',45);
 
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
        Schema::dropIfExists('item__types');
    }
}
