<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CmsResource extends JsonResource
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
            "type" => $this->type,
            "title" => $this->title,
            "description" =>strip_tags(html_entity_decode($this->description)) ,
            
        ];
    }
}
