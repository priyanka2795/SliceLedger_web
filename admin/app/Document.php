<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Document extends Model
{
    use SoftDeletes;

    protected $table = "documents";

    protected $fillable = [
        'kyc_id', 'document', 'status', 'comment', 'doc_type'
    ];

}
