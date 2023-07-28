<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\KYCDocumentResource;

class UserKYCResource extends JsonResource
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
            "doc_type" => $this->doc_type,
            "document" =>  KYCDocumentResource::collection($this->KYC_Doc),
            "status" => $this->status,
        ];
    }
}
