<?php

namespace App\Services;
use App\Services\Service;
use Illuminate\Http\Request;
use App\User;
use App\Country;

class UserAuthServices extends Service
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $user = new User();
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->phoneNumber = $request->phoneNumber;
        $user->password = bcrypt($request->password);
        $user->country_id = $request->country_id;

        $contry_code = Country::find($request->country_id);
        $user->countryCode = ($contry_code->slug == 'india') ? '91' : '1';
        $user->currency = ($contry_code->slug == 'india') ? 'INR' : 'USD';
        $user->save();

	    return $user;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Invoice  $invoice
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {

    }
}
