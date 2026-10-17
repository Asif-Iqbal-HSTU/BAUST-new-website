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
        Schema::create('counseling_sessions', function (Blueprint $table) {
            $table->id();
            $table->string('tracking_code', 32)->unique();

            // Sized as TEXT / LONGTEXT to hold AES-256 base64 encrypted payloads
            $table->text('student_name');
            $table->text('student_id');
            $table->text('department');
            $table->text('email');
            $table->text('phone');
            $table->text('session_mode');
            $table->text('concern_category');
            $table->text('preferred_date');
            $table->text('preferred_time');
            $table->longText('confidential_message')->nullable();

            // Status is plain string to permit quick indexed triage while keeping all student details encrypted
            $table->string('status', 32)->default('pending')->index();

            // Confidential clinical notes added by the psychologist
            $table->longText('psychologist_notes')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('counseling_sessions');
    }
};
