<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    /**
     * Degree programs run as their own site but staffed by other departments'
     * faculty. The focal points of the program's faculty (faculties.department_slugs)
     * manage it.
     */
    public const PROGRAM_SLUGS = ['mba', 'ma-elt'];

    protected $fillable = [
        'slug', 'name', 'short_name', 'faculty', 'tagline', 'established',
        'accreditation_badge', 'accreditation_title', 'accreditation_text',
        'about', 'vision', 'mission', 'hod_name', 'hod_designation',
        'hod_photo', 'hod_message', 'page_texts', 'is_active', 'order',
    ];

    /**
     * Free-text blocks on department pages (intros, subtitles) that a focal
     * point can override from the admin; pages fall back to their defaults.
     */
    public const PAGE_TEXT_KEYS = [
        'home_hero_subtitle',
        'staff_intro',
        'curriculum_intro',
        'curriculum_obe_note',
        'labs_intro',
        'research_intro',
        'achievements_intro',
        'alumni_intro',
        'society_intro',
        'online_resources_intro',
        'events_intro',
        'curriculum_subtitle',
        'labs_subtitle',
        'achievements_subtitle',
        'alumni_subtitle',
        'research_subtitle',
        'thesis_subtitle',
        'thesis_intro',
        'alumni_association_intro',
        'gallery_subtitle',
        'video_gallery_subtitle',
    ];

    protected $casts = ['is_active' => 'boolean', 'page_texts' => 'array'];

    /**
     * The text each page shows when the focal point hasn't overridden it, for
     * the keys this department's pages use (database/data/page_text_defaults.json,
     * extracted from the pages' pageText() defaults).
     *
     * @return array<string, string>
     */
    public function pageTextDefaults(): array
    {
        static $all = null;
        $all ??= json_decode(file_get_contents(database_path('data/page_text_defaults.json')), true);
        $templates = $all[$this->slug] ?? $all['_generic'] ?? [];

        $vars = [
            '{name}' => $this->name,
            '{short_name}' => $this->short_name,
            '{tagline}' => (string) $this->tagline,
            '{lab_count}' => (string) $this->laboratories()->where('is_active', true)->count(),
        ];

        $defaults = [];
        foreach (self::PAGE_TEXT_KEYS as $key) {
            if (array_key_exists($key, $templates)) {
                $defaults[$key] = strtr($templates[$key], $vars);
            }
        }

        return $defaults;
    }

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

    /** Everyone managing this department's laboratories (admin list, all of them). */
    public function labPeople(): HasMany
    {
        return $this->hasMany(DepartmentLabPerson::class)->orderBy('order');
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
