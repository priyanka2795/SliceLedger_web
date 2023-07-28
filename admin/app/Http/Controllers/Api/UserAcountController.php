<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\TransferTokenResource;
use App\Http\Resources\UserOrderResource;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use App\BankAcount;
use App\Transaction;
use App\Userkyc;
use App\Document;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\UserKYCResource;
use App\TokenPrice;
use App\TokenTransaction;
use App\TransferToken;
use Carbon\Carbon;
use LDAP\Result;
use File;

class UserAcountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $user = $request->user();
        try {
            DB::beginTransaction();
            $result = [];
            $result['faitWalletBalance'] = $user->wallet->fait_wallet_amount;
            $sliceBalance = $this->getBalance($user->wallet->address);
            $result['sliceWalletBalance'] = $sliceBalance['data'];
            $tokenPrice = TokenPrice::select('*')->latest()->first();
            $bnb_amount = $tokenPrice->bnb_amount;
            $result['slicePrice'] = (float)$bnb_amount;
            $result['transaction'] = Transaction::where('user_id', $user->id)->orderBy("id","DESC")->get();

            DB::commit();
            $string = [
                'status' => 200,
                'success' => true,
                'message' => "Wallet Detail Get Successfully!",
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function addFunds(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'amount' => 'required',
            'payment_type' => 'required',
            'payment_id' => 'required',
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

            $transaction = new Transaction();
            $transaction->user_id = $user->id;
            $transaction->date = date('Y-m-d');
            $transaction->time = Carbon::now()->format('H:i:m');
            $transaction->type = 'add';
            $transaction->amount = $request->amount;
            $transaction->payment_id = $request->payment_id;
            $transaction->payment_type = $request->payment_type;
            if ($request->payment_type == 'rezorpay') {

                $transaction->status = 'completed';
                $wallet = $user->wallet;  // user wallet detail................
                $walletBalance = ($user->wallet->fait_wallet_amount + $transaction->amount);
                $wallet->fait_wallet_amount =  $walletBalance;
                $wallet->save();
            }else{
                $transaction->status = 'pending';
            }
            $transaction->save();

            DB::commit();

            $string = [
                'status' => 200,
                'success' => true,
                'message' => "Successfully Add Funde To Your Wallet!",
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
     * Send Withdraw creating a new Api.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function sendWithDrawOTP(Request  $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'amount' => 'required',
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

            $bankAcount =  $user->bankAcount;
            if (!$bankAcount) {
                $string = [
                    'status' => 422,
                    'success' => true,
                    'message' => "Please Add Your Bank Account!",
                    'result' =>  new \stdClass()
                    ];
                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            $kycDetail = $user->kyc;
            if (!$kycDetail) {
                $string = [
                    'status' => 422,
                    'success' => true,
                    'message' => "Please Upload Your KYC Document!",
                    'result' =>  new \stdClass()
                    ];
                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            if ($kycDetail->status != 'approved') {
                $string = [
                    'status' => 422,
                    'success' => true,
                    'message' => "Sorry, Your KYC could not be completed. Please try again after sometime!",
                    'result' =>  new \stdClass()
                    ];
                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            if ($user->wallet->fait_wallet_amount < $request->amount ) {
                $string = [
                    'status' => 422,
                    'success' => true,
                    'message' => "The Withdrawal amount cannot be more than your wallet Balance. Please try again!",
                    'result' =>  new \stdClass()
                    ];
                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            $otp =  rand(1000, 9999);
            $user->withdraw_otp = $otp;
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
    public function resendWithDrawOTP(Request $request)
    {
        $user = $request->user();
        $otp =  rand(1000, 9999);
        $user->withdraw_otp = $otp;
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

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function withdraw(Request $request)
    {
        $user = $request->user();
        $validator = Validator::make($request->all(), [
            'amount' => 'required',
            'otp' => 'required|integer',
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

            $bankAcount = $user->bankAcount;
            if (!$bankAcount) {
                $string = [
                    'status' => 422,
                    'success' => true,
                    'message' => "Please Add Your Bank Account!",
                    'result' =>  new \stdClass()
                    ];
                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            $kycDetail = $user->kyc;
            if (!$kycDetail) {
                $string = [
                    'status' => 422,
                    'success' => true,
                    'message' => "Please Upload Your KYC Document!",
                    'result' =>  new \stdClass()
                    ];
                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            if ($kycDetail->status != 'approved') {
                $string = [
                    'status' => 422,
                    'success' => true,
                    'message' => "Sorry, Your KYC could not be completed. Please try again after sometime!",
                    'result' =>  new \stdClass()
                    ];
                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            if ($user->wallet->fait_wallet_amount < $request->amount ) {
                $string = [
                    'status' => 422,
                    'success' => true,
                    'message' => "The Withdrawal amount cannot be more than your wallet Balance. Please try again!",
                    'result' =>  new \stdClass()
                    ];
                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            if ($request->otp != $user->withdraw_otp) {
                $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => 'Wrong OTP Please Check OTP!',
                    'result' => new \stdClass()
                ];

                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            $transaction = new Transaction();
            $transaction->user_id = $user->id;
            $transaction->date = date('Y-m-d');
            $transaction->time = Carbon::now()->format('H:i:m');
            $transaction->type = 'withdrawal';
            $transaction->amount = $request->amount;
            $transaction->status = 'pending';
            $transaction->save();

            $wallet = $user->wallet;  // user wallet detail................
            $walletBalance = ($user->wallet->fait_wallet_amount - $transaction->amount);
            $wallet->fait_wallet_amount =  $walletBalance;
            $wallet->save();

            DB::commit();

            $string = [
                'status' => 200,
                'success' => true,
                'message' => "A successfully processed withdrawal request via Sliceledger should get credited almost instantly or within 3 working days.",
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
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = $request->user();
        //dd($request->all());
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:2|max:250',
            'acountNumber' => 'required|min:2|max:250|unique:bank_acounts,acountNumber,NULL,id,deleted_at,NULL',
            'ifsc' => 'required|min:2|max:250',
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

        $bankAcount = $request->user()->bankAcount;
        if ($bankAcount) {
            $string = [
                'status' => 422,
                'success' => true,
                'message' => "You Have Already Add Bank Account!",
                'result' =>  new \stdClass()
                ];
            $res = $this->encryptData($string);
            return response()->json($res, 422);
        }


        $bankAcount = new BankAcount();
        $bankAcount->user_id = $user->id;
        $bankAcount->name = $request->name;
        $bankAcount->acountType = $request->acountType ?? null;
        $bankAcount->currency = $user->currency;
        $bankAcount->bankName = $request->bankName ?? null;
        $bankAcount->acountNumber = $request->acountNumber;
        $bankAcount->ifsc = $request->ifsc;
        $bankAcount->save();

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Bank Acount Add Successfully!",
            'result' => new \stdClass()
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }


     /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getBuyToken(Request $request)
    {
        $user = $request->user();
        $buyToken = TokenTransaction::where('user_id', $user->id)->where('type', 'buy')->orderBy("id","DESC")->get();

        if ($buyToken->isEmpty()) {
            $string = [
                'status' => 200,
                'success' => true,
                'message' => "Data not found!",
                'result' =>  UserOrderResource::collection($buyToken)
                ];
            $res = $this->encryptData($string);

            return response()->json($res, 200);
        }

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Buy Token Get Successfully!",
            'result' =>  $buyToken
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }


     /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getSaleToken(Request $request)
    {
        $user = $request->user();
        $saleToken = TokenTransaction::where('user_id', $user->id)->where('type', 'sale')->orderBy("id","DESC")->get();

        if ($saleToken->isEmpty()) {
            $string = [
                'status' => 200,
                'success' => true,
                'message' => "Data not found!",
                'result' =>  UserOrderResource::collection($saleToken)
                ];
            $res = $this->encryptData($string);

            return response()->json($res, 200);
        }

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Sale Token Get Successfully!",
            'result' =>  $saleToken
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getTransferToken(Request $request)
    {
        $user = $request->user();
        $transferToken = TransferToken::where('user_id', $user->id)->where('type', 'transfer')->orderBy("id","DESC")->get();

        if ($transferToken->isEmpty()) {
            $string = [
                'status' => 200,
                'success' => true,
                'message' => "Data not found!",
                'result' =>  TransferTokenResource::collection($transferToken)
                ];
            $res = $this->encryptData($string);

            return response()->json($res, 200);
        }

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Sale Token Get Successfully!",
            'result' =>  TransferTokenResource::collection($transferToken)
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }

     /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function userOrder(Request $request)
    {
        $user = $request->user();
        $saleToken = TokenTransaction::where('user_id', $user->id)->where('type', 'sale')->orderBy("id","DESC")->get();
        $buyToken = TokenTransaction::where('user_id', $user->id)->where('type', 'buy')->orderBy("id","DESC")->get();
        $data = [
            'buy' => UserOrderResource::collection($buyToken),
            'sale' => UserOrderResource::collection($saleToken)
        ];

        $string = [
            'status' => 200,
            'success' => true,
            'message' => "User Order Get Successfully!",
            'result' =>  $data
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }


     /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getQR(Request $request)
    {
        try {
            DB::beginTransaction();
            $user = $request->user();
            $result = [];
            $result['rqOrder'] = asset('public/userQRcode/'.$user->qrCode);
            $sliceBalance = $this->getBalance($user->wallet->address);
            $result['sliceWalletBalance'] = (int)$sliceBalance['data'];
            $result['slicePrice'] = (float)00;
            $result['walletAddress'] = $user->wallet->address;

            DB::commit();
            $string = [
                'status' => 200,
                'success' => true,
                'message' => "QR Code Get Successfully!",
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
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function kycUser(Request $request)
    {
        $user = $request->user();
        try {
            DB::beginTransaction();

            if ($user->kyc && !$request->kyc_id) {
                $string = [
                    'status' => 422,
                    'success' => false,
                    'message' => "You have already submit document!",
                    'result' => new \stdClass()
                ];
                $res = $this->encryptData($string);
                return response()->json($res, 422);
            }

            if (!$user->kyc) {

                $validator = Validator::make($request->all(), [
                    'doc_type' => 'required',
                    'selfie' => 'required',
                    'front_doc' => 'required',
                ]);

                if ($request->doc_type == 'adhar') {
                    $validator = Validator::make($request->all(), [
                        'doc_type' => 'required',
                        'selfie' => 'required',
                        'front_doc' => 'required',
                        'back_doc' => 'required',
                    ]);
                }

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

                $userkyc = new Userkyc();
                $userkyc->user_id = $user->id;
                $userkyc->doc_type = $request->doc_type;
                $userkyc->status = 'pending';
                $userkyc->save();

                if ($request->hasFile('selfie')) {
                    $selfieSave =  new Document();
                    $selfie = $request->file('selfie')->store('public/document');
                    $selfie =  'document/'.pathinfo($selfie)['basename'];
                    $selfieSave->document = $selfie;
                    $selfieSave->kyc_id = $userkyc->id;
                    $selfieSave->status = 'pending';
                    $selfieSave->doc_type = 'selfie';
                    $selfieSave->save();
                }
                if ($request->hasFile('front_doc')) {
                    $frontDocSave =  new Document();
                    $front_doc = $request->file('front_doc')->store('public/document');
                    $front_doc =  'document/'.pathinfo($front_doc)['basename'];
                    $frontDocSave->document = $front_doc;
                    $frontDocSave->kyc_id = $userkyc->id;
                    $frontDocSave->status = 'pending';
                    $frontDocSave->doc_type = 'front_doc';
                    $frontDocSave->save();
                }
                if ($request->hasFile('back_doc')) {
                    $backDocSave =  new Document();
                    $back_doc = $request->file('back_doc')->store('public/document');
                    $back_doc =  'document/'.pathinfo($back_doc)['basename'];
                    $backDocSave->document = $back_doc;
                    $backDocSave->kyc_id = $userkyc->id;
                    $backDocSave->status = 'pending';
                    $backDocSave->doc_type = 'back_doc';
                    $backDocSave->save();
                }
            } else {

                $userkyc = $user->kyc;
                $userkyc->user_id = $user->id;
                $userkyc->doc_type = $request->doc_type;
                $userkyc->status = 'pending';
                $userkyc->save();

                if ($request->hasFile('selfie')) {

                    $selfieSave = $user->kyc->KYC_Doc->where('doc_type', 'selfie')->first();

                    if(\File::exists(public_path().'/storage/'.$selfieSave->document)) {
                        \File::delete(public_path().'/storage/'.$selfieSave->document);
                    }

                    $selfie = $request->file('selfie')->store('public/document');
                    $selfie =  'document/'.pathinfo($selfie)['basename'];
                    $selfieSave->document = $selfie;
                    $selfieSave->status = 'pending';
                    $selfieSave->comment = null;
                    $selfieSave->save();
                }
                if ($request->hasFile('front_doc')) {

                    $frontDocSave = $user->kyc->KYC_Doc->where('doc_type', 'front_doc')->first();

                    if(\File::exists(public_path().'/storage/'.$frontDocSave->document)) {
                        \File::delete(public_path().'/storage/'.$frontDocSave->document);
                    }

                    $front_doc = $request->file('front_doc')->store('public/document');
                    $front_doc =  'document/'.pathinfo($front_doc)['basename'];
                    $frontDocSave->document = $front_doc;
                    $frontDocSave->status = 'pending';
                    $frontDocSave->comment = null;
                    $frontDocSave->save();
                }
                if ($request->hasFile('back_doc')) {

                    $backDocSave = $user->kyc->KYC_Doc->where('doc_type', 'back_doc')->first();

                    if(\File::exists(public_path().'/storage/'.$backDocSave->document)) {
                        \File::delete(public_path().'/storage/'.$backDocSave->document);
                    }

                    $back_doc = $request->file('back_doc')->store('public/document');
                    $back_doc =  'document/'.pathinfo($back_doc)['basename'];
                    $backDocSave->document = $back_doc;
                    $backDocSave->status = 'pending';
                    $backDocSave->comment = null;
                    $backDocSave->save();
                }
            }


            DB::commit();
            $string = [
                'status' => 200,
                'success' => true,
                'message' => "The verification to be carried out.",
                'result' =>  new UserKYCResource($userkyc)
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
     * Get user KYC Detail with status................
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getKYCDetail(Request $request) {

        $kycDetail = $request->user()->kyc;
        if (!$kycDetail) {
            $string = [
                'status' => 200,
                'success' => true,
                'message' => "Detail not Available!",
                'result' =>  null
            ];
            $res = $this->encryptData($string);

            return response()->json($res, 200);
        }
        $string = [
            'status' => 200,
            'success' => true,
            'message' => "KYC Detail Get Successfully!",
            'result' =>  new UserKYCResource($kycDetail)
        ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }

     /**
     * Get user KYC Detail with status................
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getBankDetail(Request $request) {

        $bankAcount = $request->user()->bankAcount;
        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Bank Acount Detail Get Successfully!",
            'result' =>  $bankAcount
            ];
        $res = $this->encryptData($string);

        return response()->json($res, 200);
    }

    /**
     * Get user KYC Detail with status................
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function transaction(Request $request) {

        $user = $request->user();
        $transaction = Transaction::where('user_id', $user->id)->orderBy("id","DESC")->get();
        $string = [
            'status' => 200,
            'success' => true,
            'message' => "Transation detail get successfully!",
            'result' =>  $transaction
            ];
        $res = $this->encryptData($string);

        return response()->json($string, 200);
    }

}
