<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TransferTokenResource extends JsonResource
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
            "from_address" =>  $this->from,
            "to_address" =>  $this->to,
            "time" => date('h:i A', strtotime($this->time)),
            "quantity" => $this->quantity,
            "status" => $this->status,
        ];
    }
}
