<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Notice extends Model
{
    use HasFactory;

    /**
     * Category slugs that make a notice eligible for the Public Relations
     * page and manageable by the PRO regardless of department.
     */
    public const PR_CATEGORY_SLUGS = ['news-events', 'upcoming-events', 'achievements', 'conference-workshops'];

    protected $fillable = [
        'wp_id',
        'title',
        'slug',
        'content',
        'excerpt',
        'attachment',
        'attachment_type',
        'original_url',
        'author',
        'department',
        'location',
        'chief_guest',
        'special_guests',
        'chairperson',
        'press_release_no',
        'is_pinned',
        'is_active',
        'published_at',
    ];

    protected $casts = [
        'is_pinned' => 'boolean',
        'is_active' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(NoticeCategory::class);
    }

    public function pressCoverages(): HasMany
    {
        return $this->hasMany(NoticePressCoverage::class)->orderBy('order');
    }

    /**
     * Whether this notice belongs to a "PR-worthy" category (news, events,
     * achievements, conferences) as opposed to routine administrative notices.
     */
    public function isPrCategory(): bool
    {
        $slugs = $this->relationLoaded('categories')
            ? $this->categories->pluck('slug')
            : $this->categories()->pluck('slug');

        return $slugs->intersect(self::PR_CATEGORY_SLUGS)->isNotEmpty();
    }

    /**
     * Scope: notices eligible for the Public Relations page.
     */
    public function scopePrWorthy($query)
    {
        return $query->whereHas('categories', function ($q) {
            $q->whereIn('slug', self::PR_CATEGORY_SLUGS);
        });
    }

    /**
     * Scope: only active notices
     */
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    /**
     * Scope: pinned notices (top scroll)
     */
    public function scopePinned($query)
    {
        return $query->where('is_pinned', true);
    }

    /**
     * Scope: filter by category slug
     */
    public function scopeInCategory($query, string $slug)
    {
        return $query->whereHas('categories', function ($q) use ($slug) {
            $q->where('slug', $slug);
        });
    }

    /**
     * Scope: filter by department
     */
    public function scopeForDepartment($query, string $department)
    {
        return $query->where('department', $department);
    }
}
