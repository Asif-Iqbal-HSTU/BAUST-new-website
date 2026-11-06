<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Teaching Assistants belong on the Faculty Members page, not Academic Staff.
 * Give everyone designated "Teaching Assistant…" the Teaching Assistant rank and
 * the faculty employment type (some were filed as staff or as Lecturer).
 */
return new class extends Migration
{
    public function up(): void
    {
        DB::table('department_members')
            ->where(fn ($q) => $q->where('designation', 'like', 'Teaching Assistant%')->orWhere('category', 'teaching_assistant'))
            ->update(['category' => 'teaching_assistant', 'employment_type' => 'faculty', 'updated_at' => now()]);
    }

    public function down(): void
    {
        // Data correction; nothing to undo.
    }
};
