<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('departments', function (Blueprint $table) {
            $table->string('accreditation_badge')->nullable()->after('established');
            $table->string('accreditation_title')->nullable()->after('accreditation_badge');
            $table->text('accreditation_text')->nullable()->after('accreditation_title');
        });
    }

    public function down(): void
    {
        Schema::table('departments', function (Blueprint $table) {
            $table->dropColumn(['accreditation_badge', 'accreditation_title', 'accreditation_text']);
        });
    }
};
