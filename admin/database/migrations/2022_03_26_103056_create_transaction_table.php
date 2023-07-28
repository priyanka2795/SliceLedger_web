<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTransactionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('transaction', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->date('date')->nullable();
            $table->time('time', $precision = 0)->nullable();
            $table->enum('type',['withdrawal','add'])->nullable();
            $table->double('amount', 8, 2)->nullable();
            $table->enum('status',['pending','cancelled','completed','failed'])->nullable();
            $table->enum('payment_type',['bank','rezorpay'])->nullable();
            $table->string('payment_id')->nullable();
            $table->enum('currency',['INR','USD'])->nullable();
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
        Schema::dropIfExists('transaction');
    }
}
