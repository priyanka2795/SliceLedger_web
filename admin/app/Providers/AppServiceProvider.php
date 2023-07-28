<?php

namespace App\Providers;

use App\Userkyc;
use App\Transaction;
use App\Feedback;
use App\UserContact;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        $this->kyc = Userkyc::where('status', 'pending')->get();
        $this->addFound = Transaction::where('status', 'pending')->where('type', 'add')->get();
        $this->withdraw = Transaction::where('status', 'pending')->where('type', 'withdrawal')->get();
        $this->feedback = Feedback::where('status', "!=", 'completed')->orwhereNull('status')->get();
        $this->userContact = UserContact::where('status', 0)->get();

        view()->composer('admin.includes.header', function($view) {
            $view->with(['kyc' => $this->kyc, 'addFound' => $this->addFound, 'withdraw' => $this->withdraw, 'feedback' => $this->feedback, 'userContact' => $this->userContact]);
        });
    }
}
