<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IqacSlide extends Model
{
    protected $fillable = ['image', 'title', 'date_label', 'order'];
}
