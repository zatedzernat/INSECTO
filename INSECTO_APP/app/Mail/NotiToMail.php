<?php

namespace App\Mail;

use App\Http\Models\Notification_Problem;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class NotiToMail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Notification_Problem $noti, $url)
    {
        $this->noti = $noti;
        $this->url = $url;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $noti = $this->noti;
        $url = $this->url;
        return $this->subject('INSECTO - Notification Problem ID: ' . $this->noti->noti_id)
            ->view('mail.tomail', compact('noti', 'url'));
    }
}
