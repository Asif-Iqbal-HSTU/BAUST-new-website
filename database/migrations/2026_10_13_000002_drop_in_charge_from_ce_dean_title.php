<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Prof. Dr. Md. Mahmudul Hasan is the Dean of the Faculty of Civil Engineering,
 * not Dean (In-Charge): drop the "(In-Charge)" wording wherever his title appears.
 */
return new class extends Migration
{
    public function up(): void
    {
        DB::table('office_members')
            ->where('name', 'like', '%Mahmudul Hasan%')
            ->where('designation', 'like', 'Dean (In-Charge)%')
            ->update(['designation' => DB::raw("REPLACE(designation, 'Dean (In-Charge)', 'Dean')")]);

        DB::table('departments')
            ->where('slug', 'ce')
            ->where('hod_designation', 'like', 'Dean (In-Charge)%')
            ->update(['hod_designation' => DB::raw("REPLACE(hod_designation, 'Dean (In-Charge)', 'Dean')")]);
    }

    public function down(): void
    {
        // Wording correction; nothing to restore.
    }
};
