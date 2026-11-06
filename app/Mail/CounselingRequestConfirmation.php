<?php

namespace App\Mail;

use App\Models\CounselingSession;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

/**
 * Acknowledgement sent to the student after submitting a counseling request.
 */
class CounselingRequestConfirmation extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public CounselingSession $session)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            replyTo: [config('mail.recipients.counseling')],
            subject: "Your Counseling Request Has Been Received [{$this->session->tracking_code}]",
        );
    }

    public function content(): Content
    {
        return new Content(markdown: 'mail.counseling.confirmation');
    }
}
