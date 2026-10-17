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
            $table->string('employment_type')->default('faculty')->after('type'); // 'faculty', 'staff'
        });

        // Backfill from the old 'type' column, which used to conflate tenure and faculty/staff.
        DB::table('department_members')->where('type', 'staff')->update(['employment_type' => 'staff']);
        DB::table('department_members')->whereIn('type', ['permanent', 'adjunct'])->update(['employment_type' => 'faculty']);

        // 'type' now represents appointment/tenure only (permanent, contractual, adjunct).
        // Old 'staff' rows never recorded a tenure, so default them to 'permanent'.
        DB::table('department_members')->where('type', 'staff')->update(['type' => 'permanent']);

        // Collapse every legacy "ex" status variant into a single 'ex_faculty' value.
        // Faculty-vs-staff archive routing for ex-members is now decided by rank (category),
        // not by a dedicated status value.
        DB::table('department_members')
            ->whereIn('status', ['ex', 'ex_member', 'ex_officer', 'ex-member', 'ex-faculty', 'former', 'inactive'])
            ->update(['status' => 'ex_faculty']);
    }

    public function down(): void
    {
        DB::table('department_members')->where('employment_type', 'staff')->update(['type' => 'staff']);

        Schema::table('department_members', function (Blueprint $table) {
            $table->dropColumn('employment_type');
        });
    }
};
