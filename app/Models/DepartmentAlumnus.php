<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentAlumnus extends Model
{
    protected $table = 'department_alumni';

    protected $fillable = [
        'department_id',
        'type',
        'name',
        'batch',
        'passing_year',
        'designation',
        'organization',
        'image',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function department()
    {
        return $this->belongsTo(Department::class);
    }
}
