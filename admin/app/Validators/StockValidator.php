<?php

namespace App\Validators;

use App\Validators\Validator;
use Illuminate\Validation\Rule;
use Auth;

class StockValidator extends Validator
{
    /**
     * Rules for client creation and updation.
     *
     * @var array
     */
    protected $rules;

    /**
     * Messages for Client registration
     *
     * @var array
     */
    protected $messages = [];

    public function __construct($action = 'add')
    {
        $this->messages = [
            'quantity.required' => 'Please enter Quantity.',
            'date.required' => 'Please enter Date.',
        ];
        $this->rules = [
            'quantity' => 'required',
            'date' => 'required',
        ];
        if ($action == 'update') {
            $additionalRules = [];
            $this->rules =  $this->rules = [
            'quantity' => 'required',
            'date' => 'required',
            ];
        }
    }

    public function getRules() {
        return $this->rules;
    }
}
