<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class addFundCancelled extends Mailable
{
    use Queueable, SerializesModels;
    public  $transaction;
    public  $user;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($transaction,$user)
    {
        $this->transaction = $transaction;
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
       
        return $this->subject('Your Add Fund Cancelled !')
                    ->view('email.depositeCancelled');
    }
}
