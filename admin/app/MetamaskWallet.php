<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class MetamaskWallet extends Model
{

    use SoftDeletes;

    protected $table = "metamask_wallet";

    protected $fillable = [
        'user_id', 'xpub', 'mnemonic', 'address', 'private_skey', 'fait_wallet_amount'
    ];



}
