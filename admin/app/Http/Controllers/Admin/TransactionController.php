<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\TokenPrice;
use App\TransferToken;
use App\TokenTransaction;
class TransactionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function buy_token()
    {
        $buyTokens = TokenTransaction::select('*')->where('type','buy')->latest()->get();
       // dd($buyTokens[0]->user->first_name);
        return view('admin.transaction.buy_token',compact('buyTokens'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function sale_token()
    {
        $saleTokens = TokenTransaction::select('*')->where('type','sale')->latest()->get();

        return view('admin.transaction.sale_token',compact('saleTokens'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function transferTokenList(){
        $transferTokens = TransferToken::select('*')->where('type','transfer')->latest()->get();

        return view('admin.transaction.transfer_token',compact('transferTokens'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function token_price()
    {
         $token_price = TokenPrice::select('*')->where('id',1)->first();
        return view('admin.token_price.index',compact('token_price'));
    }

    public function update_token_price(Request $request)
     {

         $input = $request->all();
         $id = $input['id'];
         $data = array(
             'token_quantity' => $input['token_quantity'],
             'bnb_amount' => $input['bnb_amount'],

           );
         if(TokenPrice::where('id', $id )->update($data)){
           return back()->with('success',"Token price has been updated successfully.");
         }else{
           return back()->with('error',"Somthing went wrong.");
         }

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
        //
    }
}
