<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProblemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('problems', function (Blueprint $table) {
            $table->bigIncrements('problem_id');
            $table->dateTime('problem_date');
            $table->unsignedBigInteger('problem_detail_id');
            $table->string('problem_status',10);
            $table->string('cancel_flag',1);
            $table->timestamps();

            $table->foreign('problem_detail_id')
            ->references('problem_detail_id')
            ->on('problem__details')
            ->onUpdate('cascade')
            ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('problems');
    }
}
