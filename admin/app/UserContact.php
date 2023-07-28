<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserContact extends Model
{
    protected $table = "user_contactus";

    protected $fillable = [
        'name', 'email', 'subject', 'message'
    ];

}
