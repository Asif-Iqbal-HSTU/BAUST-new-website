<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DepartmentMember extends Model
{
    use HasFactory;

    protected $fillable = [
        'wp_id',
        'wp_type',
        'wp_profile_url',
        'name',
        'designation',
        'photo',
        'phone',
        'email',
        'personal_email',
        'education',
        'biography',
        'experience',
        'research',
        'publications',
        'specialization',
        'achievements',
        'seminars',
        'training',
        'others',
        'areas_of_interest',
        'department',
        'type',
        'employment_type',
        'status',
        'category',
        'is_head',
        'order',
    ];

    protected $casts = [
        'order' => 'integer',
        'is_head' => 'boolean',
        'education' => 'array',
        'areas_of_interest' => 'array',
    ];

    /** Rank/category values considered teaching (faculty) ranks, used to route Ex-Members. */
    public const TEACHING_RANKS = [
        'professor',
        'associate_professor',
        'assistant_professor',
        'lecturer',
        'teaching_assistant',
    ];

    public static function isTeachingRank(?string $category): bool
    {
        return in_array($category, self::TEACHING_RANKS, true);
    }

    /**
     * Faculty, plus Teaching Assistants (listed with the faculty members, not the
     * academic staff), plus ex-members whose rank is a teaching rank (Faculty page).
     */
    public function scopeFacultyVisible($query)
    {
        return $query->where(function ($q) {
            $q->where('employment_type', 'faculty')
                ->orWhere('category', 'teaching_assistant')
                ->orWhere(function ($q2) {
                    $q2->where('status', 'ex_faculty')->whereIn('category', self::TEACHING_RANKS);
                });
        });
    }

    /** Staff (never Teaching Assistants), plus ex-members whose rank is not a teaching rank (Academic Staff/Officer page). */
    public function scopeStaffVisible($query)
    {
        return $query->where(function ($q) {
            $q->where('employment_type', 'staff')
                ->orWhere(function ($q2) {
                    $q2->where('status', 'ex_faculty')->whereNotIn('category', self::TEACHING_RANKS);
                });
        })->where(fn ($q) => $q->whereNull('category')->orWhere('category', '!=', 'teaching_assistant'));
    }
}
