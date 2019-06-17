<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProblemDetailsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('problem__details', function (Blueprint $table) {
            $table->bigIncrements('problem_detail_id');
            $table->unsignedBigInteger('item_id');
            $table->unsignedBigInteger('problem_des_id');
            $table->string('cancel_flag',1);
            $table->timestamps();

            $table->foreign('item_id')
            ->references('item_id')
            ->on('items')
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreign('problem_des_id')
            ->references('problem_des_id')
            ->on('problem__descriptions')
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
        Schema::dropIfExists('problem__details');
    }
}
