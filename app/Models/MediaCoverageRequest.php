<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MediaCoverageRequest extends Model
{
    public const STATUSES = ['pending', 'received', 'in_progress', 'completed', 'declined'];

    protected $fillable = [
        'event_name',
        'organizing_unit',
        'purpose',
        'event_date',
        'event_time',
        'location',
        'chief_guest',
        'chairperson',
        'expected_participants',
        'contact_name',
        'contact_designation',
        'contact_mobile',
        'coverage_press_release',
        'coverage_facebook_post',
        'coverage_media_send',
        'coverage_other',
        'special_instructions',
        'submitted_by',
        'status',
        'receive_no',
        'received_at',
        'handled_by',
        'pr_remarks',
        'notice_id',
    ];

    protected $casts = [
        'event_date' => 'date',
        'coverage_press_release' => 'boolean',
        'coverage_facebook_post' => 'boolean',
        'coverage_media_send' => 'boolean',
        'received_at' => 'datetime',
    ];

    public function submittedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'submitted_by');
    }

    public function handledBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'handled_by');
    }

    public function notice(): BelongsTo
    {
        return $this->belongsTo(Notice::class);
    }

    public function scopePending($query)
    {
        return $query->where('status', 'pending');
    }
}
