<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UpdateRequestComment extends Model
{
    protected $fillable = ['update_request_id', 'user_id', 'body', 'status_change'];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function attachments(): HasMany
    {
        return $this->hasMany(UpdateRequestAttachment::class);
    }
}
