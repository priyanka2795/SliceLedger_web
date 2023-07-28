<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class FaqsResource extends JsonResource
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
            "questions" => strip_tags(html_entity_decode($this->questions)),
            "answers" =>strip_tags(html_entity_decode($this->answers)) ,
            
        ];
    }
}
