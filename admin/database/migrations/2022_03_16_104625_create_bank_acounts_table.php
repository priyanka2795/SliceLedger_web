<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBankAcountsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bank_acounts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('name')->nullable();
            $table->text('acountNumber')->nullable();
            $table->string('ifsc')->nullable();
            $table->tinyInteger('kyc')->default(0);
            $table->string('acountType')->nullable();
            $table->text('acountAdress')->nullable();
            $table->string('bankName')->nullable();
            $table->enum('currency',['INR','USD'])->default('USD');
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
        Schema::dropIfExists('bank_acounts');
    }
}
