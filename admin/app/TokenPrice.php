<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
class TokenPrice extends Model
{
    
    protected $table = 'token_price';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id','token_quantity','bnb_amount','contract_owner_address'
    ];
}