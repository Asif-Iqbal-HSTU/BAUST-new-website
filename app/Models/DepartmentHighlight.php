<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentHighlight extends Model
{
    protected $fillable = ['department_id', 'icon', 'title', 'text', 'order'];
}
