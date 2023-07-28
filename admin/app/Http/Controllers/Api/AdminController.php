<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Http\Resources\CmsResource;
use App\Http\Resources\FaqsResource;
use App\Http\Resources\ContactResource;
use App\Admin;
use App\CMS;
use App\Faqs;
use App\ContactInfo;
use Carbon\Carbon;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getAcount(Request $request)
    {
        $admin = Admin::select('*')->latest()->first();
        $result = [];
        $result['acountHolderName'] = $admin->acountHolderName;
        $result['acountNumber'] = $admin->acountNumber;
        $result['ifsc'] = $admin->ifsc;
        $result['acountType'] = $admin->acountType;
        $result['acountAdress'] = $admin->acountAdress;
        $result['bankName'] = $admin->bankName;

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Admin Acount Detail Get Successfully!",
            'result' =>  $result
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }


    public function about_us()
    {
        $about_us = CMS::where('type','about_us')->get();

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "About Us Detail Get Successfully!",
            'result' =>   CmsResource::collection($about_us)
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }

    public function privacy_policy()
    {
        $about_us = CMS::where('type','privacy_policy')->get();

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Privacy and Policy Detail Get Successfully!",
            'result' =>   CmsResource::collection($about_us)
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }

    public function terms_condition()
    {
        $about_us = CMS::where('type','terms_and_condition')->get();

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Terms & Conditions Detail Get Successfully!",
            'result' =>   CmsResource::collection($about_us)
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }

    public function faqs()
    {
        $faqs = Faqs::where('status',0)->get();

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Faqs Detail Get Successfully!",
            'result' =>   FaqsResource::collection($faqs)
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }

    public function contactInformation()
    {
        $contactInfo = ContactInfo::get();

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Contact Information Detail Get Successfully!",
            'result' =>   ContactResource::collection($contactInfo)
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }

    public function aboutUs()
    {
        $cmsData = CMS::where('type','about_us')->first();
        //dd($cmsData);
        return view('cms/page',compact('cmsData'));


    }

    public function privacyPolicy()
    {
        $cmsData = CMS::where('type','privacy_policy')->first();

        return view('cms/page',compact('cmsData'));
    }

    public function termsCondition()
    {
        $cmsData = CMS::where('type','terms_and_condition')->first();

        return view('cms/page',compact('cmsData'));
    }

}
