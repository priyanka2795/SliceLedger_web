<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use App\TokenTransaction;
use App\User;
use App\TokenPrice;
use App\BankAcount;
use Carbon\Carbon;
use App\TransferToken;
use App\Feedback;
use Mail;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $string = [
            'status' => 200,
            'success' => true,
            'message' => "User Detail Get Successfully!",
            'result' =>  new UserResource($user)
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function disableAccount(Request $request)
    {
        $user = $request->user();
        $user->status = 1;
        $user->save();

        $logout =  DB::table('oauth_access_tokens')->where('user_id', $user->id)
                                                ->update(['revoked' => 1]);
        $string = [
            'status' => 200,
            'success' => true,
            'message' => "User Account Has Been Disable Successfully!",
            'result' =>  new \stdClass()
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function updateProfile(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'first_name' => 'required',
            'last_name' => 'required',
            'phoneNumber' => 'required',
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
        if ($request->hasFile('profilePic')) {
            $profilePic = $request->file('profilePic')->store('public/profilePic');
            $profilePic =  'profilePic/'.pathinfo($profilePic)['basename'];
            $user->profilePic = $profilePic;
        }
        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->phoneNumber = $request->phoneNumber;
        $user->save();

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "User Profile Update Successfully!",
            'result' =>  new UserResource($user)
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

    public function buyTokenUser(Request $request)
    {
        $user = $request->user();
        $tokenPrice = TokenPrice::select('*')->latest()->first();
        $validator = Validator::make($request->all(), [
            'amount' => 'required',
            'slice_price' => 'required',
            'token_Quantity' => 'required',
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

        try {
            DB::beginTransaction();
            $wallet = $user->wallet;
            $bnb_amount = $tokenPrice->bnb_amount;
            $walletBalance = $wallet->fait_wallet_amount;
            $userPrivateKey = $wallet->private_skey;
            $tokeQuantity = $request->token_Quantity;
            $amount = $request->amount;

            if ($walletBalance < $amount) {
                $string = [
                        'status' => 422,
                        'success' => false,
                        'message' => "Your wallet contains insufficient units to buy!",
                        'result' => new \stdClass()
                    ];
                $res = $this->encryptData($string);
                return response()->json($string, 422);
            }

           return $transferToken = $this->buyToken($userPrivateKey, $tokeQuantity);


            $transaction = new TokenTransaction();
            $transaction->user_id = $user->id;
            $transaction->token_name = "Slice";
            $transaction->date = date('Y-m-d');
            $transaction->time = Carbon::now()->format('H:i:m');;
            $transaction->type = 'buy';
            $transaction->price = $amount;
            $transaction->slice_price = $request->slice_price;
            $transaction->quantity = $tokeQuantity;
            $transaction->currency = $user->currency;

            if (array_key_exists("txId",$transferToken)) {
                $transaction->status = 'completed';
                $transaction->txId = $transferToken['txId'];
                $message = "Slice Token Buy Successfully!";

                \Mail::to($user->email)->send(new \App\Mail\BuyTokenMail($tokeQuantity, $user));
            }else{
                $transaction->status = 'failed';
                $message = "Failed to buy Slice Token!";
            }
            $transaction->save();

            if (array_key_exists("txId",$transferToken)) {
                $walletBalance = $walletBalance - $amount;
                $wallet->fait_wallet_amount = $walletBalance;
                $wallet->save();
            }

            $result = [];
            $result['faitWalletBalance'] = $user->wallet->fait_wallet_amount;
            $sliceBalance = $this->getBalance($user->wallet->address);
            $result['sliceWalletBalance'] = $sliceBalance['data'];
            $result['slicePrice'] = (float)$bnb_amount;

        DB::commit();
            $string = [
                'status' => 200,
                'success' => true,
                'message' => $message,
                'result' =>  $result
                ];
            $res = $this->encryptData($string);

            return response()->json($string, 200);

        } catch (\Exception $e) {
            DB::rollback();
            $string = [
                    "message" => $e->getMessage(),
                    "messages" => [$e->getMessage()],
            ];
            $res = $this->encryptData($string);
            return response()->json($string, 422);
        }

    }


    public function saleTokenUser(Request $request)
    {
        $user = $request->user();
        $tokenPrice = TokenPrice::select('*')->latest()->first();
        $validator = Validator::make($request->all(), [
            'amount' => 'required',
            'slice_price' => 'required',
            'token_Quantity' => 'required',
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

            $sliceBalance = $this->getBalance($user->wallet->address);

            if ($sliceBalance['data'] <  $request->token_Quantity) {
                $string = [
                    'status' => 422,
                    'success' => true,
                    'message' => "Your wallet contains insufficient units to sell!",
                    'result' =>  new \stdClass()
                    ];
                $res = $this->encryptData($string);

                return response()->json($res, 422);
            }

            $wallet = $user->wallet;
            $bnb_amount = $tokenPrice->bnb_amount;
            $walletBalance = $wallet->fait_wallet_amount;
            $userPrivateKey = $wallet->private_skey;
            $tokeQuantity = $request->token_Quantity;
            $amount = $request->amount;

            $transferToken = $this->saleToken($userPrivateKey, $tokeQuantity);

                $transaction = new TokenTransaction();
                $transaction->user_id = $user->id;
                $transaction->token_name = "Slice";
                $transaction->date = date('Y-m-d');
                $transaction->time = Carbon::now()->format('H:i:m');;
                $transaction->type = 'sale';
                $transaction->price = $amount;
                $transaction->slice_price = $request->slice_price;
                $transaction->quantity = $tokeQuantity;
                $transaction->currency = $user->currency;
                if (array_key_exists("txId",$transferToken)) {
                    $transaction->status = 'completed';
                    $transaction->txId = $transferToken['txId'];
                    $message = "Slice Token Sell Successfully!";
                    \Mail::to($user->email)->send(new \App\Mail\SellTokenMail($tokeQuantity, $user));
                }else{
                    $transaction->status = 'failed';
                    $message = "Failed to Sell Slice Token!";
                }
                $transaction->save();

                if (array_key_exists("txId",$transferToken)) {
                    $walletBalance = $walletBalance + $amount;
                    $wallet->fait_wallet_amount = $walletBalance;
                    $wallet->save();
                }

                $result = [];
                $result['faitWalletBalance'] = $user->wallet->fait_wallet_amount;
                $result['sliceWalletBalance'] = $sliceBalance['data'];
                $result['slicePrice'] = (float)$bnb_amount;

            DB::commit();
                $string = [
                    'status' => 200,
                    'success' => true,
                    'message' => $message,
                    'result' =>  $result
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
     * Send Withdraw creating a new Api.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function transferSilceOTP(Request  $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'address' => 'required',
            'token_Quantity' => 'required',
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

            $sliceBalance = $this->getBalance($user->wallet->address);
            $result['sliceWalletBalance'] = $sliceBalance['data'];
            if ($result['sliceWalletBalance'] < $request->token_Quantity ) {
                $string = [
                    'status' => 422,
                    'success' => true,
                    'message' => "The transfer token quantity cannot be more than your slice wallet Balance. Please try again!",
                    'result' =>  new \stdClass()
                    ];
                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            if ($request->address == $user->wallet->address) {
                $string = [
                    'status' => 422,
                    'success' => true,
                    'message' => "Something Went Wrong!",
                    'result' =>  new \stdClass()
                    ];
                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            $otp =  rand(1000, 9999);
            $user->transfer_otp = $otp;
            $user->save();
            \Mail::to($user->email)->send(new \App\Mail\sendOtpMail($otp, $user)); // send mail for OTP.

            DB::commit();

            $string = [
                'status' => 200,
                'success' => true,
                'message' => 'Successfully send otp!',
                'result' => new \stdClass()
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
     * Creating a new Resend Withdraw Api.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function resendtransferSilceOTP(Request $request)
    {
        $user = $request->user();
        $otp =  rand(1000, 9999);
        $user->transfer_otp = $otp;
        $user->save();

        \Mail::to($user->email)->send(new \App\Mail\sendOtpMail($otp, $user));

        $string = [
            'status' => 200,
            'success' => true,
            'message' => 'Successfully send otp!',
            'result' => new \stdClass()
        ];

        $res = $this->encryptData($string);
        return response()->json($res, 200);

    }


    public function transferSilceToken(Request $request)
    {
        $user = $request->user();
        $tokenPrice = TokenPrice::select('*')->latest()->first();
        $validator = Validator::make($request->all(), [
            'address' => 'required',
            'otp' => 'required',
            'token_Quantity' => 'required',
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

        if ($request->otp != $user->transfer_otp) {
            $string = [
                'status' => 422,
                'success' => false,
                'message' => 'Wrong OTP Please Check OTP!',
                'result' => new \stdClass()
            ];

            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }

        $wallet = $user->wallet;
        $senderPrivateKey = $wallet->private_skey;
        $receiverAddress = $request->address;
        $tokeQuantity = $request->token_Quantity;
        $bnb_amount = $tokenPrice->bnb_amount;

        $transferToken = $this->transferToken($receiverAddress, $senderPrivateKey,$tokeQuantity);

           $transaction = new TransferToken();
           $transaction->user_id = $user->id;
           $transaction->token_name = "Slice";
           $transaction->date = date('Y-m-d');
           $transaction->time = Carbon::now()->format('H:i:m');;
           $transaction->type = 'transfer';
           $transaction->from = $wallet->address;
           $transaction->to = $receiverAddress;
           $transaction->quantity = $tokeQuantity;
           if (array_key_exists("txId",$transferToken)) {
                $transaction->txId = $transferToken['txId'];
                $transaction->status = 'completed';
                $message = "Slice Token Transfer Successfully!";
           }else{
                $transaction->status = 'failed';
                $message = "Slice Token Transfer Failed!";
           }
           $transaction->save();

            $result = [];
            $result['faitWalletBalance'] = $user->wallet->fait_wallet_amount;
            $sliceBalance = $this->getBalance($user->wallet->address);
            $result['sliceWalletBalance'] = $sliceBalance['data'];
            $result['slicePrice'] = (float)$bnb_amount;

            $string = [
                'status' => 200,
                'success' => true,
                'message' => $message,
                'result' =>  $result
                ];
            $res = $this->encryptData($string);

            return response()->json($res, 200);

    }


    public function userFeedback(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'description' => 'required',
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

        $feedback = new Feedback();
        $feedback->user_id = $user->id;
        $feedback->description = $request->description;
        $feedback->save();

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Thank you to give your feedback",
            'result' =>  new \stdClass()
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);


    }


}
