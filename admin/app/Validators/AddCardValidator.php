<?php

namespace App\Validators;

use App\Validators\Validator;
use Illuminate\Validation\Rule;
use Auth;

class AddCardValidator extends Validator
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
            'type_product_id.required' => 'Please select Type of product.',
            'type_grinding_id.required' => 'Please select Type of Grinding.',
        ];
        $this->rules = [
            'quantity' => 'required',
            'type_product_id' => 'required|integer',
            'type_grinding_id' => 'required|integer',
        ];
        if ($action == 'update') {
            $additionalRules = [];
            $this->rules =  $this->rules = [
            'quantity' => 'required',
            'type_product_id' => 'required|integer',
            'type_grinding_id' => 'required|integer',
            ];
        }
    }

    public function getRules() {
        return $this->rules;
    }
}
