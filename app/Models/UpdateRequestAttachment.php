<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UpdateRequestAttachment extends Model
{
    protected $fillable = ['update_request_id', 'update_request_comment_id', 'path', 'original_name', 'mime', 'size'];

    protected $appends = ['url', 'is_image', 'is_video'];

    /** Served through an authorized route: attachments are private. */
    public function getUrlAttribute(): string
    {
        return '/admin/update-requests/attachments/'.$this->id;
    }

    public function getIsImageAttribute(): bool
    {
        return str_starts_with((string) $this->mime, 'image/');
    }

    public function getIsVideoAttribute(): bool
    {
        return str_starts_with((string) $this->mime, 'video/');
    }
}
