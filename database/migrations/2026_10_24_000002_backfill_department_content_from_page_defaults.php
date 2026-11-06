<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Department pages used to fill empty lab and society fields with content
 * hard-coded in the React pages. The pages now render only what focal points
 * edit in the admin, so copy that content into the empty database fields once.
 * Existing (non-empty) values are never overwritten.
 */
return new class extends Migration
{
    public function up(): void
    {
        $this->backfillLabs(json_decode(file_get_contents(database_path('data/lab_defaults.json')), true));
        $this->backfillSocieties(json_decode(file_get_contents(database_path('data/society_defaults.json')), true));
    }

    public function down(): void
    {
        // Content migration; nothing to undo.
    }

    private function backfillLabs(array $defaults): void
    {
        foreach ($defaults as $deptSlug => $labs) {
            $deptId = DB::table('departments')->where('slug', $deptSlug)->value('id');
            if (! $deptId) {
                continue;
            }
            // The old pages listed the hard-coded labs only when the department had none.
            $createMissing = ! DB::table('department_laboratories')->where('department_id', $deptId)->exists();

            foreach (array_values($labs) as $order => $lab) {
                $row = DB::table('department_laboratories')
                    ->where('department_id', $deptId)->where('slug', $lab['slug'])->first();

                if (! $row) {
                    if ($createMissing) {
                        DB::table('department_laboratories')->insert([
                            'department_id' => $deptId,
                            'name' => $lab['name'],
                            'slug' => $lab['slug'],
                            'description' => $lab['description'] ?? null,
                            'equipment' => json_encode($lab['equipment'] ?? []),
                            'objectives' => json_encode($lab['objectives'] ?? []),
                            'images' => json_encode($lab['images'] ?? []),
                            'order' => $order + 1,
                            'is_active' => true,
                            'created_at' => now(),
                            'updated_at' => now(),
                        ]);
                    }
                    continue;
                }

                $updates = [];
                if ($this->isEmpty($row->description) && ! empty($lab['description'])) {
                    $updates['description'] = $lab['description'];
                }
                foreach (['equipment', 'objectives', 'images'] as $field) {
                    if ($this->isEmpty($row->{$field}) && ! empty($lab[$field])) {
                        $updates[$field] = json_encode($lab[$field]);
                    }
                }
                if ($updates) {
                    DB::table('department_laboratories')->where('id', $row->id)->update($updates + ['updated_at' => now()]);
                }
            }
        }
    }

    private function backfillSocieties(array $defaults): void
    {
        foreach ($defaults as $deptSlug => $societies) {
            $deptId = DB::table('departments')->where('slug', $deptSlug)->value('id');
            if (! $deptId) {
                continue;
            }
            foreach ($societies as $slug => $fields) {
                $row = DB::table('department_societies')->where('department_id', $deptId)->where('slug', $slug)->first();
                if (! $row) {
                    continue;
                }
                $updates = [];
                foreach ($fields as $field => $value) {
                    if ($this->isEmpty($row->{$field})) {
                        $updates[$field] = is_array($value) ? json_encode($value) : $value;
                    }
                }
                if ($updates) {
                    DB::table('department_societies')->where('id', $row->id)->update($updates + ['updated_at' => now()]);
                }
            }
        }
    }

    private function isEmpty(mixed $value): bool
    {
        if ($value === null || trim((string) $value) === '') {
            return true;
        }
        $decoded = json_decode((string) $value, true);

        return is_array($decoded) && $decoded === [];
    }
};
