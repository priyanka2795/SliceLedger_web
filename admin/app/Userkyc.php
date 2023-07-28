<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Userkyc extends Model
{
    use SoftDeletes;

    protected $table = "userkyc";

    protected $fillable = [
        'user_id', 'doc_type', 'selfie', 'front_doc', 'back_doc', 'status'
    ];


    /**
     * Get all of the company's ncfs.
    */
    public function user()
    {
        return $this->belongsTo('App\User', 'user_id', 'id');
    }

     /**
     * Get all of the company's ncfs.
    */
    public function KYC_Doc()
    {
        return $this->hasMany('App\Document', 'kyc_id', 'id');
    }


}
