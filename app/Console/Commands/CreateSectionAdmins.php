<?php

namespace App\Console\Commands;

use App\Models\SitePage;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Str;

/**
 * Creates the admin accounts for the Administration, Library, Research and
 * Admission menus and the Treasurer Office, and prints their passwords once.
 */
class CreateSectionAdmins extends Command
{
    protected $signature = 'admins:create-section-admins {--reset : Give existing section admin accounts new passwords too}';

    protected $description = 'Create the Administration, Library, Research, Admission and Treasurer Office admin accounts';

    private const ACCOUNTS = [
        'administration' => ['email' => 'administration.admin@baust.edu.bd', 'name' => 'Administration Admin'],
        'library' => ['email' => 'library.admin@baust.edu.bd', 'name' => 'Library Admin'],
        'research' => ['email' => 'research.admin@baust.edu.bd', 'name' => 'Research Admin'],
        'admission' => ['email' => 'admission.admin@baust.edu.bd', 'name' => 'Admission Admin'],
        'treasurer_admin' => ['email' => 'treasurer.admin@baust.edu.bd', 'name' => 'Treasurer Office Admin'],
    ];

    public function handle(): int
    {
        $rows = [];
        foreach (self::ACCOUNTS as $section => $account) {
            $user = User::where('email', $account['email'])->first();
            if ($user && ! $this->option('reset')) {
                $rows[] = [$this->label($section), $account['email'], '(exists — unchanged)'];
                continue;
            }

            $password = Str::password(16, symbols: false);
            $user ??= new User(['email' => $account['email'], 'name' => $account['name']]);
            $user->forceFill([
                'password' => $password,
                'role' => SitePage::SECTIONS[$section]['role'] ?? $section,
                'department' => null,
                'email_verified_at' => $user->email_verified_at ?? now(),
            ])->save();

            $rows[] = [$this->label($section), $account['email'], $password];
        }

        $this->table(['Menu', 'Login email', 'Password'], $rows);
        $this->warn('Passwords are shown only now. Share them securely and ask each admin to change it under Settings → Password.');

        return self::SUCCESS;
    }

    /** ACCOUNTS keys are sections, or a page admin role (see SitePage::PAGE_ADMINS). */
    private function label(string $key): string
    {
        return SitePage::SECTIONS[$key]['label'] ?? SitePage::PAGE_ADMINS[$key]['label'];
    }
}
