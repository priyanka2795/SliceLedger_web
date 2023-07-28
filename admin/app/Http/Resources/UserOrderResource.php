<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class UserOrderResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            "id" => $this->id,
            "token_name" => $this->token_name,
            "txId" =>  $this->txId,
            "date" => $this->date,
            "time" => date('h:i A', strtotime($this->time)),
            "type" => $this->type,
            "price" => $this->price,
            "slice_price" => $this->slice_price,
            "quantity" => $this->quantity,
            "currency" => $this->currency,
            "status" => $this->status,
        ];
    }
}
