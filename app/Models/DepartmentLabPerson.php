<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/** Someone who runs a department laboratory (in-charge, assistant, technician, ...). */
class DepartmentLabPerson extends Model
{
    protected $table = 'department_lab_people';

    protected $fillable = [
        'department_id', 'laboratory_id', 'member_id', 'role', 'name',
        'designation', 'phone', 'email', 'photo', 'order', 'is_active',
    ];

    protected $casts = ['is_active' => 'boolean', 'order' => 'integer'];

    public function laboratory(): BelongsTo
    {
        return $this->belongsTo(DepartmentLaboratory::class, 'laboratory_id');
    }

    public function member(): BelongsTo
    {
        return $this->belongsTo(DepartmentMember::class, 'member_id');
    }
}
