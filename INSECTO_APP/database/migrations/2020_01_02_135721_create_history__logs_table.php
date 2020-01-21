<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHistoryLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('history__logs', function (Blueprint $table) {
            $table->bigIncrements('log_id');
            $table->bigInteger('transaction_id');
            $table->unsignedBigInteger('action_id');
            $table->string('table_name', 30)->nullable();
            $table->string('column_name', 50)->nullable();
            $table->string('old_data', 50)->nullable();
            $table->string('new_data', 50)->nullable();
            $table->string('note', 120)->nullable();
            $table->dateTime('created_at');
            $table->string('user', 45);

            $table->foreign('action_id')
                ->references('action_id')
                ->on('actions')
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
        Schema::dropIfExists('history__logs');
    }
}
