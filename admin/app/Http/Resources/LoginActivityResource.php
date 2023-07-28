<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class LoginActivityResource extends JsonResource
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
            "access_id" => $this->access_id,
            "user_id" => $this->user_id,
            "name" => $this->name,
            "deviceName" => $this->deviceName,
            "IpAdderss" => $this->IpAdderss,
            "deviceType" => $this->deviceType ?? '',
            "deviceToken" => $this->deviceToken ?? '',
            "deviceType" => $this->deviceType ?? '',
            "latitude" => $this->latitude ?? '',
            "longitude" => $this->longitude ?? '',
            "is_active" => $this->revoked,
            "loginTime" => Carbon::parse($this->created_at)->diffForHumans(),
        ];
    }
}
