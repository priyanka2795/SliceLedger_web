<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

use App\Admin;
use App\Country;
use Carbon\Carbon;
use Str;
use Hash;
use Yajra\DataTables\DataTables;
use App\Rules\MatchOldPassword;
class DashboardController extends Controller
{
    public function dashboard(Request $request)
    {
        return view('admin/dashboard');
    }

    public function adminProfile()
    {
        $admin = Admin::select('*')->where('id', Auth::guard('admin')->user()->id)->first();
         $countries= Country::select('*')->get();
        return view('admin/auth/adminprofile',compact('admin','countries'));
    }

    public function profileUpdate(Request $request)
    {
        $input = $request->all();
            $admin = Auth::guard('admin')->user();

        if ($request->hasFile('image')) {
            $profilePic = $request->file('image')->store('public/images');
            $profilePic = 'images/'.pathinfo($profilePic)['basename'];
            $admin->profilePic = $profilePic;
            }

            $countries= Country::find($input['country_id']);

            $admin->first_name = $input['first_name'];
            $admin->last_name = $input['last_name'];
            $admin->phoneNumber = $input['phoneNumber'];
            $admin->country_id = $input['country_id'];
                $admin->countryCode =  $countries->code;
            if($admin->save()){
                return back()->with('success',"Profile update successfully.");
            }else{
                return back()->with('error',"Somthing wrong.");
            }

    }

    public function changePassword(Request $request)
    {
        $input = $request->all();

        $request->validate([
            'currentpassword' => ['required', new MatchOldPassword],
            'newpassword' => ['required'],
            'confirmpassword' => ['required','same:newpassword'],
        ],
        [
        'currentpassword.required' => 'The current password field is required.',
        'newpassword.required' => 'The new password field is required.',
        'confirmpassword.required' => 'The confirm password field is required.',
        'confirmpassword.same' => 'The confirm password and new password must match.'
        ]);

        if(Admin::where('id', Auth::guard('admin')->user()->id)->update(['password' => Hash::make($input['newpassword'])])){
            return back()->with('success',"Password Chanage Successfully.");
        }else{
            return back()->with('error',"Somthing wrong.");
        }

    }

    public function updateBankDetails(Request $request)
    {
        $input = $request->all();
        //dd($input);
        $admin = Auth::guard('admin')->user();
        $admin->acountHolderName = $input['acountHolderName'];
        $admin->acountNumber = $input['acountNumber'];
        $admin->ifsc = $input['ifsc'];
        $admin->acountAdress = $input['acountAdress'];
        $admin->bankName = $input['bankName'];
        if($admin->save()){
            return back()->with('success',"Bank Details Update Successfully.");
            }else{
            return back()->with('error',"Somthing went wrong, Please try again.");
            }
    }



}
