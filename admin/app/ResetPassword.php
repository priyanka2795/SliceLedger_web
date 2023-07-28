<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ResetPassword extends Model
{

    protected $table = "resets_password";

    protected $fillable = [
        'email', 'password', 'otp'
    ];


}
