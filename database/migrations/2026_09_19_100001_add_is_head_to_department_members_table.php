<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('department_members', function (Blueprint $table) {
            $table->boolean('is_head')->default(false)->after('designation');
        });

        // Backfill from the old "designation contains Head" heuristic that department
        // controllers/pages used to rely on before is_head existed.
        DB::table('department_members')->where('designation', 'like', '%Head%')->update(['is_head' => true]);

        // DBA previously had a name-based fallback ("Anowar") when no designation matched "Head".
        $dbaHasHead = DB::table('department_members')->where('department', 'dba')->where('is_head', true)->exists();
        if (! $dbaHasHead) {
            DB::table('department_members')->where('department', 'dba')->where('name', 'like', '%Anowar%')->update(['is_head' => true]);
        }
    }

    public function down(): void
    {
        Schema::table('department_members', function (Blueprint $table) {
            $table->dropColumn('is_head');
        });
    }
};
