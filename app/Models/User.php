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
    /** Per-request cache for managedFaculty(). */
    private array $managedFacultyCache = [];

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
        // A dept_admin without an assigned department (e.g. a self-registered
        // account, since the column defaults to dept_admin) has no privileges.
        return $this->role === 'dept_admin' && ! empty($this->department);
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
    /**
     * Sections (Administration, Library, Research, Admission menus) whose pages
     * this user edits: a section admin has one; the super admin has all.
     *
     * @return list<string>
     */
    public function managedSections(): array
    {
        if ($this->isSuperAdmin()) {
            return array_keys(SitePage::SECTIONS);
        }

        return array_keys(array_filter(SitePage::SECTIONS, fn ($s) => $s['role'] === $this->role));
    }

    public function isSectionAdmin(): bool
    {
        return ! $this->isSuperAdmin() && $this->managedSections() !== [];
    }

    public function canManageSection(?string $section): bool
    {
        return $section !== null && in_array($section, $this->managedSections(), true);
    }

    /** An office admin (e.g. Treasurer) who maintains a few named pages, not a whole menu. */
    public function isPageAdmin(): bool
    {
        return isset(SitePage::PAGE_ADMINS[$this->role]);
    }

    /**
     * Individual site pages assigned to a page admin.
     *
     * @return list<string>
     */
    public function managedPageKeys(): array
    {
        return SitePage::PAGE_ADMINS[$this->role]['pages'] ?? [];
    }

    public function canManageSitePage(SitePage $page): bool
    {
        return $this->canManageSection($page->section) || in_array($page->key, $this->managedPageKeys(), true);
    }

    public function isAdmissionAdmin(): bool
    {
        return $this->role === SitePage::SECTIONS['admission']['role'];
    }

    /**
     * Office staff lists: super admin all; the Administration admin the
     * university offices (not faculty Dean's offices); Library/Admission admins
     * and page admins (Treasurer) their own office; faculty focal points their
     * faculty's Dean's office.
     */
    public function canManageOffice(?string $office): bool
    {
        if ($office === null) {
            return false;
        }
        if ($this->isSuperAdmin()) {
            return true;
        }
        if (in_array($office, SitePage::PAGE_ADMINS[$this->role]['offices'] ?? [], true)) {
            return true;
        }

        $isFaculty = Faculty::where('slug', $office)->exists();
        if ($isFaculty) {
            return $this->canManageFaculty($office);
        }
        if ($this->role === SitePage::SECTIONS['administration']['role']) {
            return true;
        }
        foreach (SitePage::SECTION_OFFICES as $section => $offices) {
            if ($this->canManageSection($section) && in_array($office, $offices, true)) {
                return true;
            }
        }

        return false;
    }

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

        return $dept !== null && in_array($dept, $this->manageableDepartmentSlugs(), true);
    }

    /**
     * The faculty (Dean's office) a focal point helps run: the one whose
     * department list includes their department.
     */
    public function managedFaculty(): ?Faculty
    {
        if (! $this->isDeptAdmin()) {
            return null;
        }

        if (! array_key_exists('faculty', $this->managedFacultyCache)) {
            $this->managedFacultyCache['faculty'] = Faculty::whereJsonContains('department_slugs', $this->department)->orderBy('order')->first();
        }

        return $this->managedFacultyCache['faculty'];
    }

    /**
     * Department pages a focal point may edit: their own department plus the
     * degree programs (e.g. MBA, MA in English (ELT)) run by their faculty.
     *
     * @return list<string>
     */
    public function manageableDepartmentSlugs(): array
    {
        if (! $this->isDeptAdmin()) {
            return [];
        }

        $programs = array_values(array_intersect(Department::PROGRAM_SLUGS, $this->managedFaculty()?->department_slugs ?? []));

        return array_values(array_unique([$this->department, ...$programs]));
    }

    public function canManageFaculty(?string $facultySlug): bool
    {
        if ($this->isSuperAdmin()) {
            return true;
        }

        return $facultySlug !== null && $this->managedFaculty()?->slug === $facultySlug;
    }

    /**
     * Whether this user may create/edit/delete the given notice.
     *
     * - super_admin: any notice.
     * - pro (Public Relations Officer): university-wide notices (no department)
     *   plus News/Events/Achievements/Conferences items for any department.
     * - admission_admin: university-wide Admission Notices.
     * - dept_admin: only notices scoped to a department they manage (their own
     *   or a program of their faculty).
     */
    public function canManageNotice(\App\Models\Notice $notice): bool
    {
        if ($this->isSuperAdmin()) {
            return true;
        }

        if ($this->isPro()) {
            return $notice->department === null || $notice->isPrCategory();
        }

        if ($this->isAdmissionAdmin()) {
            return $notice->department === null && $notice->categories()->where('slug', 'admission-notice')->exists();
        }

        return $this->isDeptAdmin() && $notice->department !== null && $this->canManageDepartment($notice->department);
    }
}
