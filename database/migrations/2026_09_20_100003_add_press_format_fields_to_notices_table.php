<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('notices', function (Blueprint $table) {
            $table->string('location')->nullable()->after('department');
            $table->string('chief_guest')->nullable()->after('location');
            $table->string('special_guests')->nullable()->after('chief_guest');
            $table->string('chairperson')->nullable()->after('special_guests');
            $table->string('press_release_no')->nullable()->unique()->after('chairperson');
        });
    }

    public function down(): void
    {
        Schema::table('notices', function (Blueprint $table) {
            $table->dropColumn(['location', 'chief_guest', 'special_guests', 'chairperson', 'press_release_no']);
        });
    }
};
