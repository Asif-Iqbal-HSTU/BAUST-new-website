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
            $table->unsignedBigInteger('wp_id')->nullable()->index()->after('id');
            $table->string('wp_type')->nullable()->after('wp_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('department_members', function (Blueprint $table) {
            $table->dropColumn(['wp_id', 'wp_type']);
        });
    }
};
