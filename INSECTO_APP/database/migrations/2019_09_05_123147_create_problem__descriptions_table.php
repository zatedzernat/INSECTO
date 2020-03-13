<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProblemDescriptionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('problem__descriptions', function (Blueprint $table) {
            $table->bigIncrements('problem_des_id');
            $table->string('problem_description', 100);
            $table->unsignedBigInteger('type_id');
            $table->string('cancel_flag', 1);
            $table->timestamps();
            $table->string('update_by', 45);

            $table->foreign('type_id')
                ->references('type_id')
                ->on('item__types')
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
        Schema::disableForeignKeyConstraints();
        Schema::dropIfExists('problem__descriptions');
    }
}
