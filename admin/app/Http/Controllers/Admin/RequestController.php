<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Userkyc;
use App\Document;
use App\UserContact;

use Str;
use Hash;
use Yajra\DataTables\DataTables;
class RequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $kyc = Userkyc::select('*')->orderBy('id', 'DESC')->get();
        //dd($kyc[3]->user->first_name);
        return view('admin.requests.kyc',compact('kyc'));
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function contactUser(Request $request)
    {
        $contactinfos = UserContact::select('*')->orderBy('id', 'DESC')->get();
        return view('admin.requests.contactInfo',compact('contactinfos'));
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */


    public function kycApproveReject(Request $request)
    {
        $input =  $request->all();
        $kyc_id = $input['kyc_id'];
        $kyc_status = $input['kyc_status'];


        if($kyc_status == "1"){
            $kyc_Documet = Document::find($kyc_id);
            $kyc_Documet->status =  "approved";
            $kyc_Documet->comment =  null;
            $kyc_Documet->save();

            $kycDocumet = Userkyc::find($kyc_Documet->kyc_id);
            $status = false;
            foreach ($kycDocumet->KYC_Doc as $key => $KYC_Doc) {
                if ($KYC_Doc->status == "rejected") {
                    $kycDocumet->status =  "rejected";
                    $status = true;
                    break;
                }
                if ($KYC_Doc->status == "pending") {
                    $kycDocumet->status =  "pending";
                    $status = true;
                }
            }
            if ($status != true) {
                $kycDocumet->status =  "approved";
            }

            $kycDocumet->save();
            return back()->with('success',"You approved KYC successfully.");
        }else{

            $kycDocumet = Document::find($kyc_id);
            $kycDocumet->status =  "rejected";
            $kycDocumet->comment = $input['comment'];
            $kycDocumet->save();

            $kyc_Documet = Userkyc::find($kycDocumet->kyc_id);
            $kyc_Documet->status =  "rejected";
            $kyc_Documet->save();

            return back()->with('success',"You rejected KYC successfully.");
        }

    }


    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function contactreply(Request $request)
    {
        $this->validate($request, [
            'comment' => 'required'
        ]);

        $userContact = UserContact::find($request->id);
        $userContact->status = 1;
        $userContact->save();

        \Mail::to($userContact->email)->send(new \App\Mail\ContactReplyMail($request->comment, $userContact));
        return back()->with('success','User Status successfully');
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
