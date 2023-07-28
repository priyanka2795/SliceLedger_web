<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransferTokenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transfer_token', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('token_name')->nullable();
            $table->date('date')->nullable();
            $table->time('time', $precision = 0)->nullable();
            $table->string('txId')->nullable();
            $table->text('from')->nullable();
            $table->text('to')->nullable();
            $table->enum('type',['transfer'])->nullable();
            $table->double('quantity', 20, 8)->nullable();
            $table->enum('status',['pending','cancelled','completed','failed'])->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('transfer_token');
    }
}
