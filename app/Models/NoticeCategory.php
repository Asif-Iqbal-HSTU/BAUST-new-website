<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class NoticeCategory extends Model
{
    use HasFactory;

    protected $fillable = [
        'wp_id',
        'name',
        'slug',
        'description',
        'color',
        'icon',
        'post_count',
        'order',
    ];

    public function notices(): BelongsToMany
    {
        return $this->belongsToMany(Notice::class);
    }
}
