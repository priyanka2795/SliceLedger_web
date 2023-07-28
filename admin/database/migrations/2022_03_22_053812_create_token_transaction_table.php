<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTokenTransactionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('token_transaction', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('token_name')->nullable();
            $table->string('txId')->nullable();
            $table->date('date')->nullable();
            $table->time('time', $precision = 0)->nullable();
            $table->enum('type',['buy','sale'])->nullable();
            $table->double('price', 8, 2)->nullable();
            $table->double('slice_price', 20, 20)->nullable();
            $table->double('quantity', 20, 8)->nullable();
            $table->enum('currency',['INR','USD'])->nullable();
            $table->enum('status',['pending','cancelled','completed', 'failed'])->nullable();
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
        Schema::dropIfExists('token_transaction');
    }
}
