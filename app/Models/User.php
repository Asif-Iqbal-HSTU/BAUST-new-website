<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'department',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin';
    }

    public function isDeptAdmin(): bool
    {
        return $this->role === 'dept_admin';
    }

    public function isIqacAdmin(): bool
    {
        return $this->role === 'iqac_admin';
    }

    public function isPro(): bool
    {
        return $this->role === 'pro';
    }

    public function isPsychologist(): bool
    {
        return $this->role === 'psychologist' || $this->email === 'psychologist@baust.edu.bd';
    }

    /**
     * Departments/offices/IQAC content owners who can submit a Media Coverage
     * Requisition to the PR Office ahead of an event (policy §3.5.1).
     */
    public function canSubmitMediaRequest(): bool
    {
        return $this->isSuperAdmin() || $this->isDeptAdmin() || $this->isIqacAdmin();
    }

    public function canManageMediaRequests(): bool
    {
        return $this->isSuperAdmin() || $this->isPro();
    }

    public function canManageIqac(): bool
    {
        return $this->isSuperAdmin() || $this->isIqacAdmin();
    }

    public function canManageDepartment(?string $dept): bool
    {
        if ($this->isSuperAdmin()) {
            return true;
        }

        return $this->isDeptAdmin() && $this->department === $dept;
    }

    /**
     * Whether this user may create/edit/delete the given notice.
     *
     * - super_admin: any notice.
     * - pro (Public Relations Officer): university-wide notices (no department)
     *   plus News/Events/Achievements/Conferences items for any department.
     * - dept_admin: only notices scoped to their own department.
     */
    public function canManageNotice(\App\Models\Notice $notice): bool
    {
        if ($this->isSuperAdmin()) {
            return true;
        }

        if ($this->isPro()) {
            return $notice->department === null || $notice->isPrCategory();
        }

        return $this->isDeptAdmin() && $this->department === $notice->department;
    }
}
