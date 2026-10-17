<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('notice_press_coverages', function (Blueprint $table) {
            $table->string('clipping_file')->nullable()->after('url');
            $table->string('hardcopy_archive_page')->nullable()->after('published_date');
            $table->text('remarks')->nullable()->after('hardcopy_archive_page');
        });
    }

    public function down(): void
    {
        Schema::table('notice_press_coverages', function (Blueprint $table) {
            $table->dropColumn(['clipping_file', 'hardcopy_archive_page', 'remarks']);
        });
    }
};
