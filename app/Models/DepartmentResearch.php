<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentResearch extends Model
{
    protected $table = 'department_researches';

    protected $fillable = [
        'department_id',
        'type',
        'category',
        'title',
        'authors',
        'journal_conference',
        'year',
        'link',
        'pdf_file',
        'supervisor',
        'students_info',
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
