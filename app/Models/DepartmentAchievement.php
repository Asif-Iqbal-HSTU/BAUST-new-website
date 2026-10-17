<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DepartmentAchievement extends Model
{
    protected $fillable = [
        'department_id',
        'title',
        'type',
        'icon',
        'color',
        'description',
        'details',
        'team_title',
        'team_members',
        'link',
        'order',
        'is_active',
    ];

    protected $casts = [
        'team_members' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}
