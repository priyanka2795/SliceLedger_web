<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TransferToken extends Model
{
    protected $table = "transfer_token";

    protected $fillable = [
        'user_id', 'date', 'time', 'txId', 'from', 'to', 'type', 'quantity', 'status'
    ];


    public function user()
    {
        return $this->hasOne('App\User', 'id','user_id');
    }
}
