<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Dr. Fowzia Jahan (Medical Officer) and Halima Khatun Shuravi (Nurse, Medical
 * Centre) have resigned: take them off the Office of the Registrar page.
 */
return new class extends Migration
{
    public function up(): void
    {
        DB::table('office_members')
            ->where('office', 'registrar')
            ->whereIn('name', ['Fowzia Jahan', 'Halima Khatun Shuravi'])
            ->delete();
    }

    public function down(): void
    {
        // Not restored: they no longer work here.
    }
};
