<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class BankAcount extends Model
{
    use SoftDeletes;

    protected $table = "bank_acounts";

    protected $fillable = [
        'user_id', 'name', 'acountNumber', 'ifsc', 'kyc', 'acountType', 'acountAdress', 'bankName', 'currency'
    ];


}
