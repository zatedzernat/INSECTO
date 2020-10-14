<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

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
            $table->unsignedBigInteger('item_id');
            $table->unsignedBigInteger('status_id');
            $table->unsignedBigInteger('problem_des_id')->nullable();
            $table->string('problem_description', 100);
            // $table->ipAddress('sender_ip');
            $table->string('service_desk_code', 15)->nullable();
            $table->string('note', 100)->nullable();
            $table->string('cancel_flag', 1);
            $table->timestamps();
            $table->unsignedBigInteger('user_id')->nullable();

            $table->foreign('user_id')
                ->references('id')
                ->on('users')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('item_id')
                ->references('item_id')
                ->on('items')
                ->onUpdate('cascade')
                ->onDelete('cascade');

            $table->foreign('status_id')
                ->references('status_id')
                ->on('statuses')
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
        Schema::dropIfExists('notification__problems');
    }
}
