<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IqacMember extends Model
{
    protected $fillable = ['name', 'role', 'affiliation', 'credentials', 'photo', 'is_lead', 'order'];

    protected $casts = ['is_lead' => 'boolean'];
}
