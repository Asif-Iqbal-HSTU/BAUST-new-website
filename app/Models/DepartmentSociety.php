<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DepartmentSociety extends Model
{
    protected $fillable = [
        'department_id',
        'name',
        'slug',
        'type',
        'description',
        'member_count',
        'established',
        'committee_pdf',
        'activities',
        'committee',
        'order',
        'is_active',
    ];

    protected $casts = [
        'activities' => 'array',
        'committee' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}
