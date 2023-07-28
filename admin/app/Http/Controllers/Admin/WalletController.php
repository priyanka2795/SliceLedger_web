<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use DataTables;
use Illuminate\Http\Request;
use App\User;
use App\MetamaskWallet;
use Mail;
use App\Transaction;
class WalletController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function withdrawalIndex(Request $request)
    {
        $withdrawalFounds = Transaction::where('type', 'withdrawal')->latest()->get();
        return view('admin.wallet-transaction.withdraw-found.index',compact('withdrawalFounds'));
    }


     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function withdrawalShow($id)
    {
        $withdrawal = Transaction::find($id);
        return view('admin.wallet-transaction.withdraw-found.show',compact('withdrawal'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function AddIndex()
    {
        $addFounds = Transaction::where('type', 'add')->latest()->get();
        return view('admin.wallet-transaction.add-found.index',compact('addFounds'));
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function addShow($id)
    {
        $add = Transaction::find($id);
        return view('admin.wallet-transaction.add-found.show',compact('add'));
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function approved(Request $request)
    {   
        $input = $request->all();
        $id = $input['trasaction_id'];
        try {
            $transaction = Transaction::find($id);
            $transaction->status = "completed";
            $transaction->save();

            $user = User::find($transaction->user_id);
            $wallet_id = $user->wallet->id;
            
            $total_wallet_amount = $user->wallet->fait_wallet_amount + $transaction->amount;
            $MetamaskWallet = MetamaskWallet::find($wallet_id);
            $MetamaskWallet->fait_wallet_amount=$total_wallet_amount;
            $MetamaskWallet->save();

            \Mail::to($user->email)->send(new \App\Mail\addFundApproved($transaction,$user));
            return back()->with('success','User Transaction Approved successfully!');
        } catch (\Exception $e) {
            return back()->with('error',$e->getMessage());
        }
       
    }


     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function cancel(Request $request)
    {   
        
        $input = $request->all();
        $id = $input['trasaction_id'];

        $transaction = Transaction::find($id);
        $transaction->status = "cancelled";
        $transaction->save();
        $user = User::find($transaction->user_id);
       // dd( $user);
        \Mail::to($user->email)->send(new \App\Mail\addFundCancelled($transaction,$user));
        return back()->with('success','User Transaction Cancelled successfully!');
    }

    public function cancelWithdraw(Request $request){
        $input = $request->all();
        $id = $input['trasaction_id'];
        $transaction = Transaction::find($id);
        $transaction->status = "cancelled";
        $transaction->save();
        $user = User::find($transaction->user_id);
        $wallet_id = $user->wallet->id;
        $total_wallet_amount = $user->wallet->fait_wallet_amount + $transaction->amount;
        $MetamaskWallet = MetamaskWallet::find($wallet_id);
        $MetamaskWallet->fait_wallet_amount=$total_wallet_amount;
        $MetamaskWallet->save();
        
       // dd( $user);
        \Mail::to($user->email)->send(new \App\Mail\withdrawFundCancelled($transaction,$user));
        return back()->with('success','User Transaction Cancelled successfully!');
    }


    public function approvedWithdraw(Request $request){
        $input = $request->all();
        $id = $input['trasaction_id'];
       
        try {
            $transaction = Transaction::find($id);
            $transaction->status = "completed";
            $transaction->save();
            $user = User::find($transaction->user_id);
             \Mail::to($user->email)->send(new \App\Mail\withdrawFundApproved($transaction,$user));
            return back()->with('success','User Transaction Approved successfully!');
        } catch (\Exception $e) {
            return back()->with('error',$e->getMessage());
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
