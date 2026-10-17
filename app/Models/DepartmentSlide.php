<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentSlide extends Model
{
    protected $fillable = ['department_id', 'image', 'title', 'caption', 'order'];
}
