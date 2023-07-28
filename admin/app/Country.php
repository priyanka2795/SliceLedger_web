<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Country extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'id', 'name', 'abv', 'abv3', 'abv3_alt', 'code', 'slug'
    ];


}
