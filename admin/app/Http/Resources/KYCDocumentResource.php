<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class KYCDocumentResource extends JsonResource
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
            "document" => (!empty($this->document)) ? asset('public/storage/'.$this->document) : '',
            "status" => $this->status,
            "doc_type" => $this->doc_type,
            "comment" => (!empty($this->comment)) ? $this->comment : '',
        ];
    }
}
