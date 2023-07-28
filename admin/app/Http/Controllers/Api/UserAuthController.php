<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\LoginActivityResource;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Services\UserAuthServices;
use App\Rules\MatchOldPassword;
use Illuminate\Http\Request;
use App\Traits\ApiResponse;
use App\oauthAccesstokens;
use App\MetamaskWallet;
use App\ResetPassword;
use Carbon\Carbon;
use App\User;
use LDAP\Result;
use SimpleSoftwareIO\QrCode\Facades\QrCode;

class UserAuthController extends Controller
{

    use ApiResponse;

    protected $userAuthServices;

    public function __construct(UserAuthServices $userAuthServices)
    {
        $this->authorizeResource(User::class, 'user');
        $this->userAuthServices = $userAuthServices;
    }

    /**
     * Sinup user and create token
     *
     * @param  [int] phoneNumber
     * @param  [int] password
     * @param  [string] countryCode
     */
    public function signUp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|min:2|max:250',
            'last_name' => 'required|min:2|max:250',
            'email' => 'required|email|unique:users,email,NULL,id',
            'phoneNumber' => 'required|integer',
            'password' => 'required',
            'country_id' => 'required',
        ]);
        if ($validator->fails()) {

            $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => implode(",",$validator->messages()->all()),
                    'result' => new \stdClass()
                ];
            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }

        try {
            DB::beginTransaction();
            $user = $this->userAuthServices->store($request);

            DB::commit();
            $string = [
                'status' => 200,
                'success' => true,
                'message' => "Signup Successfully",
                'result' => new UserResource($user)
            ];
            $res = $this->encryptData($string);
            return response()->json($res, 200);
        } catch (\Exception $e) {
            DB::rollback();
            $string = [
                    "message" => $e->getMessage(),
                    "messages" => [$e->getMessage()],
            ];
            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }

    }

     /**
     * Login user and create token
     *
     * @param  [int] phoneNumber
     * @param  [int] password
     * @param  [string] countryCode
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);
        if ($validator->fails()) {
            $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => implode(",",$validator->messages()->all()),
                    'result' => new \stdClass()
                ];

            $res = $this->encryptData($string);

            return response()->json($res, 422);
        }

        $trashedUser = User::withTrashed()->where('email', $request->email)
                                        ->whereNotNull('deleted_at')->first();
        if ($trashedUser) {
            $string = [
                'status' => 422,
                'success' => false,
                'message' => 'Your Account has been suspended contact to support team!',
                'result' => new \stdClass()
            ];

            $res = $this->encryptData($string);

            return response()->json($res, 422);
        }

        if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $string = [
                'status' => 422,
                'success' => false,
                'message' => 'Invalid Email or Password',
                'result' => new \stdClass()
            ];

            $res = $this->encryptData($string);

            return response()->json($res, 422);
        }

        $user = $request->user();

        if ($user->status == 1) {
            $string = [
                'status' => 422,
                'success' => false,
                'message' => 'Your Account Has Been Disable Please Contact to support team!',
                'result' => new \stdClass()
            ];

            $res = $this->encryptData($string);

            return response()->json($res, 422);
        }

        if ($user->first_login == 0) {

            $getxpub = $this->createWallet();
            $metamaskAddress = $this->createAddress($getxpub);
            $privetkey = $this->createPrivetkey($getxpub);

            $metamask = new MetamaskWallet();
            $metamask->user_id = $user->id;
            $metamask->xpub = $getxpub['xpub'];
            $metamask->mnemonic = $getxpub['mnemonic'];
            $metamask->address = $metamaskAddress['address'];
            $metamask->private_skey = $privetkey['key'];
            $metamask->save();

            $user->first_login = 1;
            $qr = md5(time(). mt_rand(1,100000));

            $qrCode = QrCode::size(300)
            ->generate($metamaskAddress['address'], public_path('userQRcode/'.$qr.'.svg'));

            $user->qrCode = $qr.'.svg';
        }
        $otp = rand(1000, 9999);
        $user->otp = $otp;
        $user->save();

        \Mail::to($request->email)->send(new \App\Mail\sendOtpMail($otp, $user));
        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Login OTP Send Successfully",
            'result' => new UserResource($user)
            ];

        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }

    /**
     * verifyOtp user and create token
     *
     * @param  [int] phoneNumber
     * @param  [int] password
     * @param  [string] countryCode
     */

    public function verifyOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required',
            'deviceName' => 'required',
            'IpAdderss' => 'required',
            'latitude' => 'required',
            'longitude' => 'required',
        ]);
        if ($validator->fails()) {
            $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => implode(",",$validator->messages()->all()),
                    'result' => new \stdClass()
                ];

            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }
        try {
            DB::beginTransaction();

            $user = User::where('email', $request->email)
                        ->where('otp', $request->otp)
                        ->first();

            if(!$user){
                $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => 'Wrong OTP Please Check OTP!',
                    'result' => new \stdClass()
                ];

                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            $tokenResult = $user->createToken('Personal Access Token');
            $token = $tokenResult->token;
            $token->deviceName = $request->deviceName;
            $token->IpAdderss = $request->IpAdderss ?? null;
            $token->expires_at = null;
            $token->deviceToken = $request->deviceToken ?? null;
            $token->deviceType = $request->deviceType ?? null ;
            $token->latitude = $request->latitude ?? "00.00000";
            $token->longitude = $request->longitude ?? "00.00000" ;
            $token->access_id = ($request->IpAdderss.$request->deviceName.rand(10000, 99999)) ?? null ;
            $token->save();

            $user->accessToken = $tokenResult->accessToken;

        DB::commit();
            $string = [
                'status' => 200,
                'success' => true,
                'message' => "Login Successfully!",
                'result' =>  new UserResource($user)
            ];
            $res = $this->encryptData($string);
            return response()->json($res, 200);

        } catch (\Exception $e) {
            DB::rollback();
            $string = [
                    "message" => $e->getMessage(),
                    "messages" => [$e->getMessage()],
            ];
            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }
    }

    /**
     * Forget Password user and create token
     *
     * @param  [int] phoneNumber
     * @param  [int] password
     * @param  [string] countryCode
     */
    public function forgetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => implode(",",$validator->messages()->all()),
                    'result' => new \stdClass()
                ];

            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }
        try {
            DB::beginTransaction();

            $user = User::where('email', $request->email)->first();
            if(!$user){
                $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => 'User with given email does not exists.',
                    'result' => new \stdClass()
                ];

                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            $otp = rand(1000, 9999);

            $resetPassword = new ResetPassword();
            $resetPassword->email = $request->email;
            $resetPassword->password = bcrypt($request->password);;
            $resetPassword->otp = $otp;
            $resetPassword->save();

            $result = [
                'email' => $resetPassword->email,
                'user_id' => $user->id
            ];

            \Mail::to($request->email)->send(new \App\Mail\sendOtpMail($otp, $user));

        DB::commit();
            $string = [
                'status' => 200,
                'success' => true,
                'message' => "Successfully send otp!",
                'result' => $result
            ];
            $res = $this->encryptData($string);
            return response()->json($res, 200);

        } catch (\Exception $e) {
            DB::rollback();
            $string = [
                    "message" => $e->getMessage(),
                    "messages" => [$e->getMessage()],
            ];
            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }
    }

    /**
     * Reset Password user and create token
     *
     * @param  [int] phoneNumber
     * @param  [int] password
     * @param  [string] countryCode
     */
    public function resetpassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'otp' => 'required'
        ]);
        if ($validator->fails()) {
            $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => implode(",",$validator->messages()->all()),
                    'result' => new \stdClass()
                ];

            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }
        try {
            DB::beginTransaction();

            $resetOtp = ResetPassword::where('email', $request->email)->where('otp', $request->otp)->first();

            if(!$resetOtp){
                $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => 'Wrong OTP Please Check OTP!',
                    'result' => new \stdClass()
                ];

                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            $user = User::where('email', $request->email)->first();
            $user->password = $resetOtp->password;
            $user->save();

            $resetOtp->delete();
            $logout =  DB::table('oauth_access_tokens')->where('user_id',$user->id)
                                                    ->update(['revoked' => 1]);

        DB::commit();
            $string = [
                'status' => 200,
                'success' => true,
                'message' => "Password Reset Successfully!",
                'result' =>  new \stdClass()
            ];
            $res = $this->encryptData($string);
            return response()->json($res, 200);

        } catch (\Exception $e) {
            DB::rollback();
            $string = [
                    "message" => $e->getMessage(),
                    "messages" => [$e->getMessage()],
            ];
            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }
    }


     /**
     * Change Password user and create token
     *
     * @param  [int] password
     * @param  [int] password
     */
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'oldPassword' => ['required', new MatchOldPassword],
            'newPassword' => 'required'
        ]);
        if ($validator->fails()) {
            $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => implode(",",$validator->messages()->all()),
                    'result' => new \stdClass()
                ];

            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }
        try {
            DB::beginTransaction();

            $user = $request->user();
            $user->password = bcrypt($request->newPassword);
            $user->save();

            $logout =  DB::table('oauth_access_tokens')
                                ->where('user_id', $user->id)
                                ->where('id', '!=', $request->user()->token()->id)
                                ->update(['revoked' => 1]);

            DB::commit();
            $string = [
                'status' => 200,
                'success' => true,
                'message' => "Password Change Successfully!",
                'result' =>  new UserResource($user)
            ];
            $res = $this->encryptData($string);
            return response()->json($res, 200);

        } catch (\Exception $e) {
            DB::rollback();
            $string = [
                    "message" => $e->getMessage(),
                    "messages" => [$e->getMessage()],
            ];
            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }
    }


    /**
     * Login user and create token
     *
     * @param  [int] phoneNumber
     * @param  [int] password
     * @param  [string] countryCode
     */
    public function demoLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
            'deviceName' => 'required',
            'IpAdderss' => 'required',
        ]);
        if ($validator->fails()) {
            $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => implode(",",$validator->messages()->all()),
                    'result' => new \stdClass()
                ];

            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }
        if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            $string = [
                'status' => 422,
                'success' => false,
                'message' => 'Invalid Email or Password',
                'result' => new \stdClass()
            ];

            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }

        $user = $request->user();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $token->deviceName = $request->deviceName;
        $token->IpAdderss = $request->IpAdderss ?? null;
        $token->expires_at = null;
        $token->deviceToken = $request->deviceToken ?? null;
        $token->deviceType = $request->deviceType ?? null ;
        $token->save();
        $user->accessToken = $tokenResult->accessToken;
        $user->tokenType = 'Bearer';

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Login Successfully",
            'result' => new UserResource($user)
            ];

        $res = $this->encryptData($string);
        return response()->json($string, 200);
    }


    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function allLogout(Request $request)
    {
        $user_id = $request->user()->id;

        $logout =  DB::table('oauth_access_tokens')->where('user_id', $user_id)
                                                ->update(['revoked' => 1]);

        $string = [
            'status' => 200,
            'success' => true,
            'message' => 'Successfully logged out',
            'result' => new \stdClass()
            ];

        $res = $this->encryptData($string);
        return response()->json($res, 200);
    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();

        $string = [
            'status' => 200,
            'success' => true,
            'message' => 'Successfully logged out',
            'result' => new \stdClass()
            ];

        $res = $this->encryptData($string);
        return response()->json($res, 200);
    }


    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function deviceLogout(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'access_id' => 'required',
        ]);
        if ($validator->fails()) {
            $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => implode(",",$validator->messages()->all()),
                    'result' => new \stdClass()
                ];

            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }
        $user = $request->user();
        $logout =  DB::table('oauth_access_tokens')
                        ->where('user_id',  $user->id)
                        ->where('access_id',  $request->access_id)
                        ->update(['revoked' => 1]);
        $string = [
            'status' => 200,
            'success' => true,
            'message' => 'Successfully logged out',
            'result' => new \stdClass()
            ];

        $res = $this->encryptData($string);
        return response()->json($res, 200);
    }


    /**
     * Login Activity user (Revoke the token)
     *
     * @return [string] message
     */
    public function loginActivity(Request $request)
    {
        $user = $request->user();
        $loginActivity = oauthAccesstokens::where('revoked', '0')
                                            ->where('user_id',$user->id)
                                            ->get();

        $string = [
            'status' => 200,
            'success' => true,
            'message' => 'Successfully Get Login Activity !',
            'result' => LoginActivityResource::collection($loginActivity)
            ];

        $res = $this->encryptData($string);
        return response()->json($string, 200);
    }

    /**
     * Create user
     *
     * @param  [string] countryCode
     * @param  [int] phoneNumber
     */

    public function reSendLoginOtp(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);
        if ($validator->fails()) {
            $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => implode(",",$validator->messages()->all()),
                    'result' => new \stdClass()
                ];

            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }
        $oldUser =  User::where(['email' => $request->email])->first();

        if(empty($oldUser)){

            return response()->json([
                'status' => 422,
                'success' => true,
                'message' => 'Somthing went wrong.',
                'result' => new \stdClass()
            ], 422);

        }

        $otp =  rand(1000, 9999);
        $user = User::find($oldUser->id);
        $user->otp = $otp;
        $user->save();
        \Mail::to($request->email)->send(new \App\Mail\sendOtpMail($otp, $user));
        $string = [
            'status' => 200,
            'success' => true,
            'message' => 'Successfully send otp!',
            'result' => new UserResource($user)
        ];

        $res = $this->encryptData($string);
        return response()->json($res, 200);

    }


     /**
     * Create user
     *
     * @param  [string] countryCode
     * @param  [int] phoneNumber
     */

    public function reSendOtp(Request $request)
    {
        $user = User::where('email', $request->email)->first();
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
        ]);
        if ($validator->fails()) {
            $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => implode(",",$validator->messages()->all()),
                    'result' => new \stdClass()
                ];

            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }
        $otp = rand(1000, 9999);
        $resetPassword = ResetPassword::where('email', $request->email)->first();

        $resetPassword->email = $request->email;
        $resetPassword->password = bcrypt($request->password);;
        $resetPassword->otp = $otp;
        $resetPassword->save();

        \Mail::to($request->email)->send(new \App\Mail\sendOtpMail($otp, $user));

        $string = [
            'status' => 200,
            'success' => true,
            'message' => 'Successfully send otp!',
            'result' => new UserResource($user)
        ];

        $res = $this->encryptData($string);
        return response()->json($res, 200);

    }


}
