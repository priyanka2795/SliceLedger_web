<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SellTokenMail extends Mailable
{
    use Queueable, SerializesModels;
    public  $tokeQuantity;
    public  $user;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($tokeQuantity,$user)
    {
        $this->tokeQuantity = $tokeQuantity;
        $this->user = $user;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {

        return $this->subject('Slice Order Report!')
                    ->view('email.saleToken');
    }
}
