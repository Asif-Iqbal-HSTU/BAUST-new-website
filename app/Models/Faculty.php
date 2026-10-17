<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Faculty extends Model
{
    protected $fillable = [
        'slug',
        'office_name',
        'office_subtitle',
        'code',
        'name',
        'title',
        'tagline',
        'about',
        'location',
        'phone',
        'email',
        'department_slugs',
        'order',
    ];

    protected $casts = [
        'department_slugs' => 'array',
    ];

    public function departments()
    {
        return Department::whereIn('slug', $this->department_slugs ?? []);
    }

    public function members(): HasMany
    {
        return $this->hasMany(OfficeMember::class, 'office', 'slug');
    }
}
