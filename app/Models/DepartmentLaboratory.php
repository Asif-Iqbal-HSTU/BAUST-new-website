<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class DepartmentLaboratory extends Model
{
    protected $fillable = [
        'department_id',
        'name',
        'slug',
        'description',
        'equipment',
        'objectives',
        'images',
        'order',
        'is_active',
    ];

    protected $casts = [
        'equipment' => 'array',
        'objectives' => 'array',
        'images' => 'array',
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }
}
