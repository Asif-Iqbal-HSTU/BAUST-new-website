<?php

namespace App\Support;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

/**
 * Collects the model changes an authenticated admin makes during one request,
 * so NotifyAdminActivity can email a single summary once the request is done.
 */
class AdminActivity
{
    /** Never shown in emails, whatever the model. */
    private const HIDDEN = ['password', 'remember_token', 'two_factor_secret', 'two_factor_recovery_codes', 'two_factor_confirmed_at'];

    /** Bookkeeping columns that alone don't make a change worth reporting. */
    private const IGNORED = ['created_at', 'updated_at', 'remember_token', 'email_verified_at', 'two_factor_secret', 'two_factor_recovery_codes', 'two_factor_confirmed_at'];

    private const MAX_VALUE_LENGTH = 300;

    /** @var list<array{action: string, model: string, id: mixed, label: ?string, fields: list<array{field: string, old: ?string, new: ?string}>}> */
    private array $changes = [];

    public function record(string $action, Model $model): void
    {
        $fields = match ($action) {
            'updated' => $this->updatedFields($model),
            'created' => $this->createdFields($model),
            default => [],
        };

        if ($action === 'updated' && $fields === []) {
            return;
        }

        $this->changes[] = [
            'action' => $action,
            'model' => Str::headline(class_basename($model)),
            'id' => $model->getKey(),
            'label' => $this->label($model),
            'fields' => $fields,
        ];
    }

    public function changes(): array
    {
        return $this->changes;
    }

    private function updatedFields(Model $model): array
    {
        $fields = [];
        foreach (array_keys($model->getChanges()) as $key) {
            if (in_array($key, self::IGNORED, true)) {
                continue;
            }
            $fields[] = [
                'field' => $key,
                'old' => $this->display($model, $key, $model->getRawOriginal($key)),
                'new' => $this->display($model, $key, $model->getAttributes()[$key] ?? null),
            ];
        }

        return $fields;
    }

    private function createdFields(Model $model): array
    {
        $fields = [];
        foreach ($model->getAttributes() as $key => $value) {
            if ($value === null || $value === '' || $key === $model->getKeyName() || in_array($key, self::IGNORED, true)) {
                continue;
            }
            $fields[] = ['field' => $key, 'old' => null, 'new' => $this->display($model, $key, $value)];
        }

        return $fields;
    }

    /** Formats a raw column value; secret and encrypted (confidential) columns are masked. */
    private function display(Model $model, string $key, mixed $raw): ?string
    {
        if (in_array($key, self::HIDDEN, true)) {
            return '[hidden]';
        }
        if ($model->hasCast($key, ['encrypted', 'encrypted:array', 'encrypted:collection', 'encrypted:json', 'encrypted:object'])) {
            return '[confidential]';
        }
        if ($raw === null) {
            return null;
        }

        $text = trim(preg_replace('/\s+/', ' ', strip_tags(html_entity_decode((string) $raw))));

        return Str::limit($text, self::MAX_VALUE_LENGTH);
    }

    private function label(Model $model): ?string
    {
        foreach (['title', 'name', 'label', 'key', 'slug', 'email', 'tracking_code'] as $attr) {
            $value = $model->getAttributes()[$attr] ?? null;
            if (is_string($value) && $value !== '' && ! $model->hasCast($attr, ['encrypted'])) {
                return Str::limit(strip_tags($value), 120);
            }
        }

        return null;
    }
}
