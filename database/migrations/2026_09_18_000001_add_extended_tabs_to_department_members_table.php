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
            $table->longText('achievements')->nullable()->after('publications');
            $table->longText('seminars')->nullable()->after('achievements');
            $table->longText('training')->nullable()->after('seminars');
            $table->longText('others')->nullable()->after('training');
            $table->json('areas_of_interest')->nullable()->after('others');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('department_members', function (Blueprint $table) {
            $table->dropColumn(['achievements', 'seminars', 'training', 'others', 'areas_of_interest']);
        });
    }
};
