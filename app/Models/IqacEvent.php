<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IqacEvent extends Model
{
    protected $fillable = ['date_label', 'title', 'order'];
}
