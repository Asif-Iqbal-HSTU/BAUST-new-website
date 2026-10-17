<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Artisan;

/**
 * Adds the MBA program (baust.edu.bd/mba) as a DB-driven "department"
 * (slug: mba) from the snapshots in database/data/mba/ and
 * database/data/faculty_profiles/mba.json.
 *
 * Refresh the snapshots with:
 *   php artisan programs:import-mba --fetch
 *   php artisan departments:sync-faculty-profiles mba --fetch --create-missing
 */
return new class extends Migration
{
    public function up(): void
    {
        Artisan::call('programs:import-mba');
        Artisan::call('departments:sync-faculty-profiles', ['departments' => ['mba'], '--create-missing' => true]);
        // Re-run so MBA members are linked to their DBA/AIS records once they exist.
        Artisan::call('programs:import-mba');
    }

    public function down(): void
    {
        // Imported content; nothing to roll back.
    }
};
