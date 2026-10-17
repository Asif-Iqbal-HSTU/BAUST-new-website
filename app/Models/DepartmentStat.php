<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentStat extends Model
{
    protected $fillable = ['department_id', 'value', 'label', 'order'];
}
