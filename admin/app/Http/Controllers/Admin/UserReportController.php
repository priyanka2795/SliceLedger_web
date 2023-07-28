<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\User;
use App\BankAcount;
use App\TokenTransaction;
use App\Transaction;

class UserReportController extends Controller
{
    /**
     * Display a listing of the User Token.
     *
     * @return \Illuminate\Http\Response
     * @return \Illuminate\Http\Request
     */
   public function userBuyToken(Request $request)
   {
        $userId = $request->userId;
        $userToken = TokenTransaction::where('user_id', $userId)->where('type', 'buy')->orderBy('id', 'DESC' )->get();
        return view('admin.report.buy-report', compact('userToken'));
   }


   /**
     * Display a listing of the User Token.
     *
     * @return \Illuminate\Http\Response
     * @return \Illuminate\Http\Request
    */
    public function userSellToken(Request $request)
    {
         $userId = $request->userId;
         $userToken = TokenTransaction::where('user_id', $userId)->where('type', 'sale')->orderBy('id', 'DESC' )->get();
         return view('admin.report.sale-report', compact('userToken'));
    }


    /**
     * Display a listing of the User Token.
     *
     * @return \Illuminate\Http\Response
     * @return \Illuminate\Http\Request
    */
    public function addMoney(Request $request)
    {
         $userId = $request->userId;
         $userAdd = Transaction::where('user_id', $userId)->where('type', 'add')->orderBy('id', 'DESC' )->get();
         return view('admin.report.add-money-report', compact('userAdd'));
    }


    /**
     * Display a listing of the User Token.
     *
     * @return \Illuminate\Http\Response
     * @return \Illuminate\Http\Request
    */
    public function withdrawalMoney(Request $request)
    {
         $userId = $request->userId;
         $userWithdraw = Transaction::where('user_id', $userId)->where('type', 'withdrawal')->orderBy('id', 'DESC' )->get();
         return view('admin.report.withdrawal-report', compact('userWithdraw'));
    }
}
