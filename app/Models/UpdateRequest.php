<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/** A request from an admin to the developer (super admin) to change something on the website. */
class UpdateRequest extends Model
{
    public const TYPES = [
        'content' => 'Content change (text, photo, document)',
        'bug' => 'Something is broken / not working',
        'feature' => 'New feature or new page',
        'design' => 'Design / layout change',
        'access' => 'Account or access',
        'other' => 'Other',
    ];

    public const PRIORITIES = [
        'low' => 'Low — whenever possible',
        'normal' => 'Normal',
        'high' => 'High — needed soon',
        'urgent' => 'Urgent — wrong or broken on the live site',
    ];

    public const STATUSES = [
        'submitted' => 'Submitted',
        'in_review' => 'In review',
        'in_progress' => 'In progress',
        'needs_info' => 'Needs more information',
        'done' => 'Done',
        'declined' => 'Declined',
    ];

    public const OPEN_STATUSES = ['submitted', 'in_review', 'in_progress', 'needs_info'];

    protected $fillable = [
        'reference', 'user_id', 'type', 'priority', 'title', 'page_url', 'location_detail',
        'current_state', 'requested_change', 'reason', 'needed_by', 'status', 'developer_note', 'resolved_at',
    ];

    protected $casts = ['needed_by' => 'date', 'resolved_at' => 'datetime'];

    protected static function booted(): void
    {
        static::creating(function (UpdateRequest $request) {
            $year = now()->year;
            $next = (int) static::where('reference', 'like', "UR-{$year}-%")->count() + 1;
            do {
                $request->reference = sprintf('UR-%d-%04d', $year, $next++);
            } while (static::where('reference', $request->reference)->exists());
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /** Files attached to the request itself (not to a comment). */
    public function attachments(): HasMany
    {
        return $this->hasMany(UpdateRequestAttachment::class)->whereNull('update_request_comment_id');
    }

    public function comments(): HasMany
    {
        return $this->hasMany(UpdateRequestComment::class)->oldest();
    }

    public function scopeOpen($query)
    {
        return $query->whereIn('status', self::OPEN_STATUSES);
    }

    public function isOpen(): bool
    {
        return in_array($this->status, self::OPEN_STATUSES, true);
    }
}
