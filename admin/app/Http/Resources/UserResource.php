<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UserKYCResource;

class UserResource extends JsonResource
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
            "first_name" => $this->first_name,
            "last_name" => $this->last_name,
            "countryCode" => $this->countryCode,
            "phoneNumber" => $this->phoneNumber,
            "email" => $this->email ?? null,
            "profilePic" => (!empty($this->profilePic)) ? asset('public/storage/'.$this->profilePic) : asset('public/dist/img/user-logo.jpg'),
            // "walletAdress" => (!empty($this->wallet->address)) ? $this->wallet->address : '',
            // "xpub" => (!empty($this->wallet->xpub)) ? $this->wallet->xpub : '',
            // "mnemonic" => (!empty($this->wallet->mnemonic)) ? $this->wallet->mnemonic : '',
            // "private_key" => (!empty($this->wallet->private_skey)) ? $this->wallet->private_skey : '',
            "deviceToken" => (!empty($this->deviceToken)) ? $this->deviceToken : '',
            "deviceType" => (!empty($this->deviceType)) ? $this->deviceType : '',
            "country" => $this->country->name,
            "status" => $this->status,
            "currency" => $this->currency,
            "accessToken" => (!empty($this->accessToken)) ? $this->accessToken : '',
            "tokenType" => (!empty($this->tokenType)) ? $this->tokenType : '',
            "bankAcount" => (!empty($this->bankAcount)) ? $this->bankAcount : '',
            "loginActivity" => (!empty($this->loginActivity)) ? $this->loginActivity : '',
            "kyc" => (!empty($this->kyc)) ? new UserKYCResource($this->kyc) : '',
            "wallet" => (!empty($this->wallet)) ? $this->wallet : '',
        ];
    }
}
