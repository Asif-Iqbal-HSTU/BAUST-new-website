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
            $table->longText('biography')->nullable()->change();
            $table->longText('experience')->nullable()->change();
            $table->longText('research')->nullable()->change();
            $table->longText('publications')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('department_members', function (Blueprint $table) {
            $table->text('biography')->nullable()->change();
            $table->text('experience')->nullable()->change();
            $table->text('research')->nullable()->change();
            $table->text('publications')->nullable()->change();
        });
    }
};
