<?php

namespace App\Http\Controllers\Admin;


use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Http\Request;
use Auth;

use Session;
use App\Admin;
use App\Country;
use Carbon\Carbon;
use Str;
use Hash;
use Yajra\DataTables\DataTables;
use App\Rules\MatchOldPassword;
class LoginController extends Controller
{

    use AuthenticatesUsers;
    protected $guardName = 'admin';
    // protected $redirectTo = '/admin/dashboard';

     /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
        $this->middleware('guest:admin')->except('logout');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return view('admin.auth.login');
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {

       $input = $request->all();

        $this->validate($request, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $data = array(
            'email' => $input['email'],
            'password' => $input['password']
        );

       // dd(auth()->guard($this->guardName));
        if(auth()->guard($this->guardName)->attempt($data))
        {
            return redirect()->route('dashboard')->with('success',"Login Successfully.");

        }else{
            return back()->with('error','Invalid Email/Password.');

        }
    }





}
