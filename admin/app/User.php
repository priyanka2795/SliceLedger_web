<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable, SoftDeletes;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $table = 'users';

    protected $fillable = [
        'id', 'country_id', 'first_name', 'last_name', 'username', 'profilePic', 'countryCode', 'phoneNumber',
        'dob', 'gender', 'pincode', 'deviceToken', 'deviceType', 'email', 'email_verified_at',
         'password', 'status', 'address', 'remember_token', 'qrCode', 'created_at', 'updated_at', 'deleted_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

     /**
     * Get all of the company's ncfs.
     */
    public function country()
    {
        return $this->belongsTo('App\Country');
    }

     /**
     * Get all of the company's ncfs.
     */
    public function loginActivity()
    {
        return $this->hasMany('App\oauthAccesstokens', 'user_id', 'id');
    }

     /**
     * Get all of the company's ncfs.
     */
    public function bankAcount()
    {
        return $this->hasOne('App\BankAcount', 'user_id', 'id');
    }

     /**
     * Get all of the user metamask Wallet.
     */
    public function wallet()
    {
        return $this->hasOne('App\MetamaskWallet', 'user_id', 'id');
    }

    public function tokenTransaction()
    {
        return $this->hasMany('App\TokenTransaction', 'user_id', 'id');
    }

    public function tokentransfer()
    {
        return $this->hasMany('App\TransferToken', 'user_id', 'id');
    }

    public function transaction()
    {
        return $this->hasMany('App\Transaction', 'user_id', 'id');
    }

    /**
     * Get all of the company's ncfs.
    */
    public function kyc()
    {
        return $this->hasOne('App\Userkyc', 'user_id', 'id');
    }

    public function feedback()
    {
        return $this->hasMany('App\Feedback', 'user_id', 'id');
    }

}
