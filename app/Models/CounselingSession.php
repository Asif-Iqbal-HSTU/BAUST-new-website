<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CounselingSession extends Model
{
    use HasFactory;

    protected $table = 'counseling_sessions';

    protected $fillable = [
        'tracking_code',
        'student_name',
        'student_id',
        'department',
        'email',
        'phone',
        'session_mode',
        'concern_category',
        'preferred_date',
        'preferred_time',
        'confidential_message',
        'status',
        'psychologist_notes',
    ];

    /**
     * Get the attributes that should be cast.
     * All sensitive student details and messages are encrypted with AES-256 at rest.
     */
    protected function casts(): array
    {
        return [
            'student_name'         => 'encrypted',
            'student_id'           => 'encrypted',
            'department'           => 'encrypted',
            'email'                => 'encrypted',
            'phone'                => 'encrypted',
            'session_mode'         => 'encrypted',
            'concern_category'     => 'encrypted',
            'preferred_date'       => 'encrypted',
            'preferred_time'       => 'encrypted',
            'confidential_message' => 'encrypted',
            'psychologist_notes'   => 'encrypted',
        ];
    }
}
