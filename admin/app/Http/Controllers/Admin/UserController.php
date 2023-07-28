<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use App\User;
use App\BankAcount;
use App\Userkyc;
use App\Document;
use App\TokenTransaction;

use Carbon\Carbon;
use Str;
use Hash;
use Yajra\DataTables\DataTables;
use App\Rules\MatchOldPassword;
class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $users = User::select('*')->withTrashed()->where('role_id', 1)->orderBy("id","DESC")->get();
        return view('admin.users.index',compact('users'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function kycDetail($id)
    {
       $user = User::select('*')->where('id',$id)->withTrashed()->first();
       $kycDetail = Userkyc::where('user_id',$id)->get();
       $kyc_id = $kycDetail[0]->id;
       $kycDocumnet = Document::where('kyc_id',$kyc_id)->get();


       return view('admin.users.kycDetail',compact('user','kycDocumnet'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function kycApprove($id)
    {
      $user = User::select('*')->where('id',$id)->withTrashed()->first();
      $kyc  = $user->kyc;
      $kyc->status = 'approved';
      $kyc->save();

      foreach ($kyc->KYC_Doc as $key => $KYC_Doc) {

        $kyc_Documet = Document::find($KYC_Doc->id);
        $kyc_Documet->status =  "approved";
        $kyc_Documet->save();
      }

      return back()->with('success',"KYC Approve Change Successfully.");
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
        $user = User::where('id',$id)->first();
        $buyTokens = TokenTransaction::where('user_id',$id)->where('type','buy')->get();
        $saleTokens = TokenTransaction::where('user_id',$id)->where('type','sale')->get();
       //dd($user->tokenTransaction);
        return view('admin/users/show', compact('user','buyTokens','saleTokens') );
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

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
            $user = User::where('id',$id)->delete();
            return back()->with('success','User deleted successfully');

    }


    /**
     * Write code on Method
     *
     * @return response()
     */
    public function delete($id)
    {
        User::withTrashed()->find($id)->forceDelete();
        return back()->with('success','User permanently delete successfully');
    }


    /**
     * Write code on Method
     *
     * @return response()
     */
    public function restore($id)
    {
        User::withTrashed()->find($id)->restore();
        return back()->with('success','User restore successfully');
    }


    /**
     * Write code on Method
     *
     * @return response()
     */
    public function status_change($id)
    {
        $user = User::select('*')->where('id',$id)->withTrashed()->first();
        if ($user->status == 1) {
           $user->status = 0;
        }else{
            $user->status = 1;
        }
        $user->save();
        return back()->with('success','User Status successfully');
    }
}
