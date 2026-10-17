<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class IqacSetting extends Model
{
    protected $fillable = ['key', 'value'];

    /** Decode a single stored setting (JSON) or return $default. */
    public static function getValue(string $key, mixed $default = null): mixed
    {
        $row = static::query()->where('key', $key)->first();
        if (! $row) {
            return $default;
        }
        $decoded = json_decode($row->value ?? 'null', true);

        return $decoded ?? $default;
    }

    /** Store a value (scalar or array) as JSON. */
    public static function setValue(string $key, mixed $value): void
    {
        static::updateOrCreate(['key' => $key], ['value' => json_encode($value)]);
    }

    /** Return all settings decoded as an associative array. */
    public static function allDecoded(): array
    {
        return static::all()
            ->mapWithKeys(fn ($r) => [$r->key => json_decode($r->value ?? 'null', true)])
            ->toArray();
    }
}
