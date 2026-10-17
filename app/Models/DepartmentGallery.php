<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentGallery extends Model
{
    protected $table = 'department_galleries';

    protected $fillable = [
        'department_id',
        'type',
        'title',
        'description',
        'images',
        'video_url',
        'category',
        'order',
        'is_active',
    ];

    protected $casts = [
        'images' => 'array',
        'is_active' => 'boolean',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
