<?php

namespace App\Services;

use App\Interfaces\CommonConstants;
use App\Traits\ApiResponse;

class Service implements CommonConstants
{
	use ApiResponse;

	protected $isApiCall = false;

    public function __construct()
    {
    	if (request()->is('api/*')) {
			$this->isApiCall = true;
		}
    }
}
