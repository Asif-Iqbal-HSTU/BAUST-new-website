<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;

/**
 * Brings the non-engineering departments (DBA, AIS, English, Arts & Sciences)
 * in line with CSE:
 *
 *  1. Staff/rank categories use the same values as CSE so the shared Faculty
 *     and Academic Staff pages group everyone correctly.
 *  2. Imports the full profile tabs (experience, publications, research
 *     interests, achievements, seminars, training, others) from the snapshot
 *     in database/data/faculty_profiles/, and adds members listed on
 *     baust.edu.bd that were missing here.
 *
 * Refresh the snapshot with:
 *   php artisan departments:sync-faculty-profiles dba ais eng as --fetch --create-missing
 */
return new class extends Migration
{
    private const DEPARTMENTS = ['dba', 'ais', 'eng', 'as'];

    public function up(): void
    {
        $members = DB::table('department_members')->whereIn('department', self::DEPARTMENTS);

        // Support staff filed as faculty (e.g. MLSS, cleaner).
        (clone $members)->where('employment_type', 'faculty')
            ->where(fn ($q) => $q->where('designation', 'MLSS')->orWhere('designation', 'like', '%Cleaner%'))
            ->update(['employment_type' => 'staff', 'category' => 'staff']);

        // CSE convention: officers/operators vs. technical & support staff.
        (clone $members)->where('employment_type', 'staff')->where('category', 'staff')
            ->where(fn ($q) => $q->where('designation', 'like', '%Officer%')->orWhere('designation', 'like', '%Operator%'))
            ->update(['category' => 'academic_officer']);
        (clone $members)->where('employment_type', 'staff')->where('category', 'staff')
            ->update(['category' => 'academic_staff']);

        (clone $members)->where('employment_type', 'faculty')->whereNull('category')
            ->where('designation', 'like', '%Teaching Assistant%')
            ->update(['category' => 'teaching_assistant']);

        Artisan::call('departments:sync-faculty-profiles', [
            'departments' => self::DEPARTMENTS,
            '--create-missing' => true,
        ]);
    }

    public function down(): void
    {
        // Profile content is additive; nothing to roll back.
    }
};
