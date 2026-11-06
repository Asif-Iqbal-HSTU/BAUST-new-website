<?php

namespace App\Mail;

use App\Models\UpdateRequest;
use App\Models\UpdateRequestAttachment;
use App\Models\UpdateRequestComment;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Attachment;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Storage;

/**
 * Emails a new update request (or the requester's reply on one) to the
 * website mailbox. Files are attached while they fit within Gmail's limit;
 * the rest are listed with a link to the request.
 */
class UpdateRequestNotification extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    /** Gmail rejects messages over 25 MB; leave room for encoding overhead. */
    private const MAX_ATTACHMENT_BYTES = 18 * 1024 * 1024;

    public function __construct(public UpdateRequest $updateRequest, public ?UpdateRequestComment $comment = null)
    {
    }

    public function envelope(): Envelope
    {
        $user = $this->updateRequest->user;
        $subject = $this->comment
            ? "Reply on {$this->updateRequest->reference}: {$this->updateRequest->title}"
            : "New Update Request {$this->updateRequest->reference} [".ucfirst($this->updateRequest->priority)."]: {$this->updateRequest->title}";

        return new Envelope(
            from: new Address(config('mail.from.address'), "{$user->name} via BAUST Website"),
            replyTo: [new Address($user->email, $user->name)],
            subject: $subject,
        );
    }

    public function content(): Content
    {
        [$attached, $notAttached] = $this->splitFiles();

        return new Content(
            markdown: 'mail.admin.update-request',
            with: [
                'r' => $this->updateRequest,
                'user' => $this->updateRequest->user,
                'type' => UpdateRequest::TYPES[$this->updateRequest->type] ?? $this->updateRequest->type,
                'priority' => UpdateRequest::PRIORITIES[$this->updateRequest->priority] ?? $this->updateRequest->priority,
                'status' => UpdateRequest::STATUSES[$this->updateRequest->status] ?? $this->updateRequest->status,
                'attached' => $attached,
                'notAttached' => $notAttached,
                'url' => route('admin.update-requests.show', $this->updateRequest),
            ],
        );
    }

    public function attachments(): array
    {
        return array_map(
            fn (UpdateRequestAttachment $f) => Attachment::fromStorageDisk('local', $f->path)->as($f->original_name)->withMime($f->mime ?: 'application/octet-stream'),
            $this->splitFiles()[0],
        );
    }

    /** @return array{0: list<UpdateRequestAttachment>, 1: list<UpdateRequestAttachment>} */
    private function splitFiles(): array
    {
        $files = $this->comment ? $this->comment->attachments : $this->updateRequest->attachments;
        $attached = $notAttached = [];
        $total = 0;

        foreach ($files as $file) {
            if ($total + $file->size <= self::MAX_ATTACHMENT_BYTES && Storage::disk('local')->exists($file->path)) {
                $attached[] = $file;
                $total += $file->size;
            } else {
                $notAttached[] = $file;
            }
        }

        return [$attached, $notAttached];
    }
}
