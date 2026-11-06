<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

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

    /** Every laboratory page shows the lab's team. */
    protected $with = ['people'];

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

    /** The lab's published team, in display order. */
    public function people(): HasMany
    {
        return $this->hasMany(DepartmentLabPerson::class, 'laboratory_id')->where('is_active', true)->orderBy('order');
    }
}
