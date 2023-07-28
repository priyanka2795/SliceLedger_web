<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ContactInfo extends Model
{
    use SoftDeletes;
    protected $table = 'contact_information';
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id', 'email', 'contact_no', 'address', 'android_link', 'ios_link', 'facebook_link',
         'twitter_link', 'instagram_link', 'discord_link', 'created_at', 'updated_at'
    ];

}
