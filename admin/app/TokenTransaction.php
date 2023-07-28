<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TokenTransaction extends Model
{
    protected $table = "token_transaction";

    protected $fillable = [
        'user_id', 'token_name', 'date', 'time', 'price', 'quantity', 'status', 'type', 'currency'
    ];


    public function user()
    {
        return $this->hasOne('App\User', 'id','user_id');
    }
}
