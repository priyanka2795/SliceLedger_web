<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class oauthAccesstokens extends Model
{

    protected $table = "oauth_access_tokens";

    protected $fillable = [
        'id', 'user_id', 'client_id', 'name', 'deviceName', 'scopes', 'IpAdderss',
        'deviceType', 'deviceToken', 'revoked', 'longitude', 'latitude', 'access_id'
    ];


}
