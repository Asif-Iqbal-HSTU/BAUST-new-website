<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    /** Degree programs run as their own site but staffed by other departments' faculty. */
    public const PROGRAM_SLUGS = ['mba'];

    protected $fillable = [
        'slug', 'name', 'short_name', 'faculty', 'tagline', 'established',
        'accreditation_badge', 'accreditation_title', 'accreditation_text',
        'about', 'vision', 'mission', 'hod_name', 'hod_designation',
        'hod_photo', 'hod_message', 'is_active', 'order',
    ];

    protected $casts = ['is_active' => 'boolean'];

    public function slides(): HasMany
    {
        return $this->hasMany(DepartmentSlide::class)->orderBy('order');
    }

    public function stats(): HasMany
    {
        return $this->hasMany(DepartmentStat::class)->orderBy('order');
    }

    public function highlights(): HasMany
    {
        return $this->hasMany(DepartmentHighlight::class)->orderBy('order');
    }

    public function curricula(): HasMany
    {
        return $this->hasMany(DepartmentCurriculum::class)->orderBy('order');
    }

    public function laboratories(): HasMany
    {
        return $this->hasMany(DepartmentLaboratory::class)->orderBy('order');
    }

    public function achievements(): HasMany
    {
        return $this->hasMany(DepartmentAchievement::class)->orderBy('order');
    }

    public function societies(): HasMany
    {
        return $this->hasMany(DepartmentSociety::class)->orderBy('order');
    }

    public function obes(): HasMany
    {
        return $this->hasMany(DepartmentObe::class)->orderBy('order');
    }

    public function onlineResources(): HasMany
    {
        return $this->hasMany(DepartmentOnlineResource::class)->orderBy('order');
    }

    public function researches(): HasMany
    {
        return $this->hasMany(DepartmentResearch::class)->orderBy('order');
    }

    public function studentVoices(): HasMany
    {
        return $this->hasMany(DepartmentStudentVoice::class)->orderBy('order');
    }

    public function galleries(): HasMany
    {
        return $this->hasMany(DepartmentGallery::class)->orderBy('order');
    }

    public function alumni(): HasMany
    {
        return $this->hasMany(DepartmentAlumnus::class)->orderBy('order');
    }

    /** Faculty/staff are keyed by the department slug on DepartmentMember. */
    public function members()
    {
        return DepartmentMember::where('department', $this->slug);
    }
}
