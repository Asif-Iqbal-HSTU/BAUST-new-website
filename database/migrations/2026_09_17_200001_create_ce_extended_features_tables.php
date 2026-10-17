<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // 1. Research Publications & Thesis Projects
        if (!Schema::hasTable('department_researches')) {
            Schema::create('department_researches', function (Blueprint $table) {
                $table->id();
                $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
                $table->string('type', 50)->default('publication'); // 'publication' | 'thesis'
                $table->string('category', 100)->nullable(); // e.g. 'Journal Paper', 'Conference Paper', 'Thesis 2024'
                $table->string('title', 500);
                $table->text('authors')->nullable();
                $table->string('journal_conference', 500)->nullable();
                $table->string('year', 20)->nullable();
                $table->string('link', 1000)->nullable();
                $table->string('pdf_file', 500)->nullable();
                $table->string('supervisor', 255)->nullable();
                $table->text('students_info')->nullable();
                $table->integer('order')->default(0);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // 2. Student Voice
        if (!Schema::hasTable('department_student_voices')) {
            Schema::create('department_student_voices', function (Blueprint $table) {
                $table->id();
                $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
                $table->string('student_name');
                $table->string('student_id', 50)->nullable();
                $table->string('batch', 100)->nullable();
                $table->string('title', 255)->nullable();
                $table->string('image', 500)->nullable();
                $table->string('profile_link', 500)->nullable();
                $table->text('quote')->nullable();
                $table->integer('order')->default(0);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // 3. Photo and Video Gallery
        if (!Schema::hasTable('department_galleries')) {
            Schema::create('department_galleries', function (Blueprint $table) {
                $table->id();
                $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
                $table->string('type', 20)->default('photo'); // 'photo' | 'video'
                $table->string('title', 255);
                $table->text('description')->nullable();
                $table->json('images')->nullable(); // json array of photo URLs
                $table->string('video_url', 500)->nullable(); // local mp4 or youtube link
                $table->string('category', 100)->nullable(); // e.g. 'Field Survey', 'Lab Facilities', 'Events'
                $table->integer('order')->default(0);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }

        // 4. Department Alumni (Job Holders & Higher Studies)
        if (!Schema::hasTable('department_alumni')) {
            Schema::create('department_alumni', function (Blueprint $table) {
                $table->id();
                $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
                $table->string('type', 50)->default('job_holder'); // 'job_holder' | 'higher_study'
                $table->string('name', 255);
                $table->string('batch', 100)->nullable(); // e.g. '10th', '11th'
                $table->string('passing_year', 50)->nullable(); // e.g. '2024'
                $table->string('designation', 255)->nullable(); // e.g. 'BOQ Coordinator' or 'MSc in Civil Engineering'
                $table->string('organization', 255)->nullable(); // e.g. 'Maam International' or 'KUET'
                $table->string('image', 500)->nullable();
                $table->integer('order')->default(0);
                $table->boolean('is_active')->default(true);
                $table->timestamps();
            });
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('department_alumni');
        Schema::dropIfExists('department_galleries');
        Schema::dropIfExists('department_student_voices');
        Schema::dropIfExists('department_researches');
    }
};
