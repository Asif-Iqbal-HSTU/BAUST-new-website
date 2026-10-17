<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/** Same correction as 2026_10_13_000002, inside Prof. Dr. Md. Mahmudul Hasan's profile Experience tab. */
return new class extends Migration
{
    public function up(): void
    {
        DB::table('department_members')
            ->where('name', 'like', '%Mahmudul Hasan%')
            ->where('experience', 'like', '%Dean (In-Charge)%')
            ->update(['experience' => DB::raw("REPLACE(experience, 'Dean (In-Charge)', 'Dean')")]);
    }

    public function down(): void
    {
        // Wording correction; nothing to restore.
    }
};
