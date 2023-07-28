<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('role_id');
            $table->unsignedBigInteger('country_id');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('username')->nullable();
            $table->text('profilePic')->nullable();
            $table->string('countryCode')->nullable();
            $table->string('phoneNumber')->nullable();
            $table->string('dob')->nullable();
            $table->enum('gender',['male','female','other'])->nullable();
            $table->integer('pincode')->nullable();
            $table->string('deviceToken')->nullable();
            $table->string('deviceType')->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->integer('otp')->nullable();
            $table->integer('withdraw_otp')->nullable();
            $table->integer('transfer_otp')->nullable();
            $table->string('password');
            $table->tinyInteger('status')->default(0);
            $table->text('address')->nullable();
            $table->tinyInteger('first_login')->default(0);
            $table->enum('currency',['INR','USD'])->nullable();
            $table->rememberToken();
            $table->text('qrCode')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('country_id')->references('id')->on('countries')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('roles')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
