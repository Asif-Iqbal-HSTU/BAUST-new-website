<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('department_members', function (Blueprint $table) {
            $table->text('biography')->nullable()->after('education');
            $table->text('experience')->nullable()->after('biography');
            $table->text('research')->nullable()->after('experience');
            $table->text('publications')->nullable()->after('research');
            $table->string('specialization')->nullable()->after('publications');
            $table->string('wp_profile_url')->nullable()->after('wp_type');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('department_members', function (Blueprint $table) {
            $table->dropColumn(['biography', 'experience', 'research', 'publications', 'specialization', 'wp_profile_url']);
        });
    }
};
