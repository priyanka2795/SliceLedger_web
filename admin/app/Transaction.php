<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $table = "transaction";

    protected $fillable = [
        'user_id', 'date', 'time', 'amount', 'payment_type', 'status', 'type', 'currency'
    ];


    public function user()
    {
        return $this->hasOne('App\User', 'id','user_id');
    }
}
