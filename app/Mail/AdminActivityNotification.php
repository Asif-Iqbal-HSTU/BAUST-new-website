<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Str;

/**
 * Summary of a change an admin made from the admin panel. Sent through the
 * website mailbox (Gmail only lets it send as itself) but shown under the
 * admin's name, with replies going to the admin.
 */
class AdminActivityNotification extends Mailable implements ShouldQueue
{
    use Queueable, SerializesModels;

    public function __construct(
        public string $adminName,
        public string $adminEmail,
        public ?string $adminRole,
        public string $method,
        public string $url,
        public ?string $route,
        public ?string $ip,
        public string $occurredAt,
        public array $changes,
    ) {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address(config('mail.from.address'), "{$this->adminName} via BAUST Website"),
            replyTo: [new Address($this->adminEmail, $this->adminName)],
            subject: "Admin update by {$this->adminName}: {$this->summary()}",
        );
    }

    public function content(): Content
    {
        return new Content(markdown: 'mail.admin.activity');
    }

    private function summary(): string
    {
        if ($this->changes === []) {
            return Str::headline(str_replace('.', ' ', $this->route ?? 'update'));
        }

        $first = $this->changes[0];
        $text = ucfirst($first['action']).' '.$first['model'].($first['label'] ? " \"{$first['label']}\"" : '');

        return Str::limit($text, 80).(count($this->changes) > 1 ? ' (+'.(count($this->changes) - 1).' more)' : '');
    }
}
