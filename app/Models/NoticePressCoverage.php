<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class NoticePressCoverage extends Model
{
    protected $fillable = [
        'notice_id',
        'newspaper_name',
        'url',
        'clipping_file',
        'published_date',
        'hardcopy_archive_page',
        'remarks',
        'order',
    ];

    protected $casts = [
        'published_date' => 'date',
    ];

    public function notice(): BelongsTo
    {
        return $this->belongsTo(Notice::class);
    }
}
