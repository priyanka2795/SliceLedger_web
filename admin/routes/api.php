<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::group(['namespace' => 'Api', 'prefix' => 'auth'], function () {

    Route::post('login', 'UserAuthController@login');
    Route::post('demoLogin', 'UserAuthController@demoLogin');
    Route::post('signUp', 'UserAuthController@signUp');
    Route::post('forgetPassword', 'UserAuthController@forgetPassword');
    Route::post('resetpassword', 'UserAuthController@resetpassword');
    Route::post('verifyOtp', 'UserAuthController@verifyOtp');
    Route::post('reSendLoginOtp', 'UserAuthController@reSendLoginOtp');
    Route::post('reSendOtp', 'UserAuthController@reSendOtp'); //resete password
    Route::get('country', 'ComanController@index');
    Route::get('about_us', 'AdminController@about_us');
    Route::get('privacy_policy', 'AdminController@privacy_policy');
    Route::get('terms_condition', 'AdminController@terms_condition');
    Route::get('faqs', 'AdminController@faqs');
    Route::get('contact_information', 'AdminController@contactInformation');
    Route::get('aboutUs', 'AdminController@aboutUs');
    Route::get('privacyPolicy', 'AdminController@privacyPolicy');
    Route::get('termsCondition', 'AdminController@termsCondition');

    Route::group(['middleware' => 'auth:api'], function() {

        Route::get('logout', 'UserAuthController@logout');

        Route::get('allLogout', 'UserAuthController@allLogout');
        Route::post('deviceLogout', 'UserAuthController@deviceLogout');
        Route::get('loginActivity', 'UserAuthController@loginActivity');
        Route::post('changePassword', 'UserAuthController@changePassword');
        Route::get('getBuyToken', 'UserAcountController@getBuyToken');
        Route::get('transaction', 'UserAcountController@transaction');
        Route::get('getKYCDetail', 'UserAcountController@getKYCDetail');
        Route::get('getBankDetail', 'UserAcountController@getBankDetail');
        Route::get('getSaleToken', 'UserAcountController@getSaleToken');
        Route::get('userOrder', 'UserAcountController@userOrder');
        Route::get('walletDetail', 'UserAcountController@index');
        Route::post('send-withdraw-otp', 'UserAcountController@sendWithDrawOTP');
        Route::post('resend-withdraw-otp', 'UserAcountController@resendWithDrawOTP');
        Route::post('withdraw', 'UserAcountController@withdraw');
        Route::post('addFunds', 'UserAcountController@addFunds');
        Route::post('kyc', 'UserAcountController@kycUser');
        Route::get('getQR', 'UserAcountController@getQR');
        Route::resource('addBank', 'UserAcountController');
        Route::get('disable', 'UserController@disableAccount');
        Route::post('updateProfile', 'UserController@updateProfile');
        Route::post('buyTokenUser', 'UserController@buyTokenUser');
        Route::post('saleTokenUser', 'UserController@saleTokenUser');
        Route::post('send-transfer-otp', 'UserController@transferSilceOTP');
        Route::post('resend-transfer-otp', 'UserController@resendtransferSilceOTP');
        Route::post('transfer-token', 'UserController@transferSilceToken');
        Route::get('get-transfer-token', 'UserAcountController@getTransferToken');
        Route::post('feedback', 'UserController@userFeedback');
        Route::resource('user', 'UserController');


        Route::get('adminBank', 'AdminController@getAcount');

    });

    Route::post('contact-form', 'ComanController@contactInformation');

});
