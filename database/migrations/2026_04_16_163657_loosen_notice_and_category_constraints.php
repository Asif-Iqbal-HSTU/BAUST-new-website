<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('notices', function (Blueprint $table) {
            $table->dropUnique(['wp_id']);
            $table->index(['wp_id', 'department']);
        });

        Schema::table('notice_categories', function (Blueprint $table) {
            $table->dropUnique(['wp_id']);
            $table->index('wp_id');
        });
    }

    public function down(): void
    {
        Schema::table('notices', function (Blueprint $table) {
            $table->dropIndex(['wp_id', 'department']);
            $table->unique('wp_id');
        });

        Schema::table('notice_categories', function (Blueprint $table) {
            $table->dropIndex(['wp_id']);
            $table->unique('wp_id');
        });
    }
};
