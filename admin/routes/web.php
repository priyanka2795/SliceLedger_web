<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();


Route::group(['namespace' => 'Admin'], function () {

    Route::get('/', 'LoginController@index');
    Route::get('/login', 'LoginController@index')->name('login');
    Route::post('/login-data', 'LoginController@login')->name('loginData');

    Route::group(['middleware'=>'is_admin'], function () {

        Route::get('/dashboard', 'DashboardController@dashboard')->name('dashboard');
        Route::get('/adminProfile', 'LoginAuthController@adminProfile')->name('adminProfile');
        Route::post('/profileUpdate', 'LoginAuthController@profileUpdate')->name('profileUpdate');
        Route::post('/changePassword', 'LoginAuthController@changePassword')->name('changePassword');
        Route::post('/updateBankDetails', 'LoginAuthController@updateBankDetails')->name('updateBankDetails');
        Route::get('/logout', 'LoginAuthController@logout')->name('logout');
        Route::get('users/orders/{id}', 'UserController@orders')->name('users.orders');
        Route::get('users/restore/{id}', 'UserController@restore')->name('users.restore');
        Route::get('users/delete/{id}', 'UserController@delete')->name('users.delete');
        Route::get('kyc-request/kycDetail/{id}', 'UserController@kycDetail')->name('kycDetail');
        Route::get('kycApprove/{id}', 'UserController@kycApprove')->name('kycApprove');
        Route::get('kyc-request', 'RequestController@index')->name('kyc-request');
        Route::post('kycApproveReject', 'RequestController@kycApproveReject')->name('kycApproveReject'); 
        Route::resource('/users','UserController');
        Route::get('users/status_change/{id}', 'UserController@status_change')->name('status_change');
        Route::get('/transactions/buy', 'TransactionController@buy_token')->name('buy_token');
        Route::get('/transactions/sell', 'TransactionController@sale_token')->name('sale_token');
        Route::get('/transactions/transfer', 'TransactionController@transferTokenList')->name('transfer_toke');
         Route::get('/orders', 'OrderController@index')->name('orders');
        Route::get('/token_price', 'TransactionController@token_price')->name('token_price');
         Route::post('/update_token_price', 'TransactionController@update_token_price')->name('update_token_price');
        Route::get('/about_us','CMSController@about_us')->name('about_us');
        Route::get('/privacy_policy','CMSController@privacy_policy')->name('privacy_policy');
        Route::get('/terms_condition','CMSController@terms_condition')->name('terms_condition');
        Route::post('/updatecms','CMSController@updatecms')->name('updatecms');
        Route::get('/contact_as','CMSController@contact_as')->name('contact_as');
        Route::get('/contact_information','CMSController@contact_information')->name('contact_information');
        Route::post('/update_contact_info','CMSController@update_contact_info')->name('update_contact_info');
        Route::get('/faqs','CMSController@faqs')->name('faqs');
        Route::get('faqs/add_question','CMSController@add_question')->name('add_question');
        Route::get('faqs/edit_question/{id}','CMSController@edit_question')->name('edit_question');
        Route::get('faqs/question_status/{id}','CMSController@question_status')->name('question_status');
        Route::post('faqs/delete_question/{id}','CMSController@delete_question')->name('delete_question');
        Route::post('faqs/insert_question','CMSController@insert_question')->name('insert_question');
        Route::post('faqs/update_question','CMSController@update_question')->name('update_question');

        Route::prefix('user')->group(function () {
            Route::get('reports/buy-token', 'UserReportController@userBuyToken')->name('accounting.buyToken');
            Route::get('reports/sale-token', 'UserReportController@userSellToken')->name('accounting.saleToken');
            Route::get('reports/add-money', 'UserReportController@addMoney')->name('accounting.addMoney');
            Route::get('reports/withdrawal-money', 'UserReportController@withdrawalMoney')->name('accounting.withdrawalMoney');
        });

        Route::prefix('wallet-transaction')->group(function () {
            Route::get('withdrawal', 'WalletController@withdrawalIndex')->name('withdrawal');
            Route::get('withdrawal/show/{id}', 'WalletController@withdrawalShow')->name('show-withdraw');
            Route::get('add-fund', 'WalletController@AddIndex')->name('add-fund');
            Route::get('add-fund/show/{id}', 'WalletController@addShow')->name('show-add');
            Route::post('approved-fund', 'WalletController@approved')->name('approved-fund');
            Route::post('cancel-fund', 'WalletController@cancel')->name('cancel-add');
            Route::post('approved-withdraw', 'WalletController@approvedWithdraw')->name('approved-withdraw');
            Route::post('cancel-withdraw', 'WalletController@cancelWithdraw')->name('cancel-withdraw');
        });
        Route::resource('feedback', 'FeedbackController');
        Route::get('contact-list', 'RequestController@contactUser')->name('contact-list');
        Route::post('contact-reply', 'RequestController@contactreply')->name('contact-reply');
    });


});

Route::get('/clear-cache', function() {
    Artisan::call('cache:clear');
    Artisan::call('config:cache');
   return '<h1>Cache facade value cleared</h1>';
});
