<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\CountryResource;
use Illuminate\Http\Request;
use App\Country;
use App\UserContact;

class ComanController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $country = Country::orderBy('id', 'DESC')->get();
        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Country Detail Get Successfully!",
            'result' =>   CountryResource::collection($country)
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }

    /**
     * Contact Form a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function contactInformation(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email',
            'subject' => 'required',
            'message' => 'required',
        ]);
        if ($validator->fails()) {
            $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => implode(",",$validator->messages()->all()),
                    'result' => new \stdClass()
                ];

            $res = $this->encryptData($string);

            return response()->json($string, 422);
        }

        $userContact = new UserContact();
        $userContact->name = $request->name;
        $userContact->email = $request->email;
        $userContact->subject = $request->subject;
        $userContact->message = $request->message;
        $userContact->save();

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Submited Successfully!",
            'result' =>  new \stdClass()
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

}
