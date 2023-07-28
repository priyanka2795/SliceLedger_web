<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
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
            "email" => $this->email,
            "contact_no" => $this->contact_no,
            "address" => $this->address,
            "android_link" => $this->android_link,
            "ios_link" => $this->ios_link,
            "facebook_link" => $this->facebook_link,
            "twitter_link" => $this->twitter_link,
            "instagram_link" => $this->instagram_link,
            "discord_link" => $this->discord_link,
         ];
    }
}
