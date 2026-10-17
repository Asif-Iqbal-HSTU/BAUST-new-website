<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentStudentVoice extends Model
{
    protected $table = 'department_student_voices';

    protected $fillable = [
        'department_id',
        'student_name',
        'student_id',
        'batch',
        'title',
        'image',
        'profile_link',
        'quote',
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
