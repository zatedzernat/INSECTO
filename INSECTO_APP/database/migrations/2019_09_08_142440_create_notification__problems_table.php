<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotificationProblemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notification__problems', function (Blueprint $table) {
            $table->bigIncrements('noti_id');
            $table->string('item_code',45);
            $table->unsignedBigInteger('status_id');
            $table->unsignedBigInteger('problem_des_id');
            $table->string('problem_description',100);
            $table->string('cancel_flag',1);
            $table->timestamps();
            $table->string('update_by',45)->nullable();

            $table->foreign('item_code')
            ->references('item_code')
            ->on('items')
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreign('status_id')
            ->references('status_id')
            ->on('status')
            ->onUpdate('cascade')
            ->onDelete('cascade');

            $table->foreign('problem_des_id')
            ->references('problem_des_id')
            ->on('problem_descriptions')
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
        Schema::dropIfExists('notification__problems');
    }
}
