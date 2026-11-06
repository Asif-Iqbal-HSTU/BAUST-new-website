<?php

namespace App\Mail;

use App\Models\CounselingSession;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

/**
 * Notifies the University Psychologist of a new counseling request.
 * The confidential message is deliberately left out of the email; it stays
 * encrypted in the database and is read from the admin panel.
 */
class CounselingRequestReceived extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(public CounselingSession $session)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            replyTo: [new Address($this->session->email, $this->session->student_name)],
            subject: "New Counseling Request [{$this->session->tracking_code}]",
        );
    }

    public function content(): Content
    {
        return new Content(
            markdown: 'mail.counseling.received',
            with: ['adminUrl' => route('admin.counseling.index')],
        );
    }
}
