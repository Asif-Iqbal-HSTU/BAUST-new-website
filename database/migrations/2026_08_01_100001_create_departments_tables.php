<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Per-department profile / singleton content
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();          // cse, ict, eee, me, ipe, ce, dba, ais, eng, as
            $table->string('name');                     // Computer Science & Engineering
            $table->string('short_name');               // CSE
            $table->string('faculty')->nullable();      // FECE, FME, FCE, FBS, FSH
            $table->string('tagline')->nullable();
            $table->string('established')->nullable();
            $table->longText('about')->nullable();
            $table->text('vision')->nullable();
            $table->longText('mission')->nullable();
            $table->string('hod_name')->nullable();
            $table->string('hod_designation')->nullable();
            $table->string('hod_photo')->nullable();
            $table->longText('hod_message')->nullable();
            $table->boolean('is_active')->default(true);
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('department_slides', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained()->cascadeOnDelete();
            $table->string('image');
            $table->string('title')->nullable();
            $table->string('caption')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('department_stats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained()->cascadeOnDelete();
            $table->string('value');
            $table->string('label');
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });

        Schema::create('department_highlights', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained()->cascadeOnDelete();
            $table->string('icon')->default('Sparkles');
            $table->string('title');
            $table->string('text')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('department_highlights');
        Schema::dropIfExists('department_stats');
        Schema::dropIfExists('department_slides');
        Schema::dropIfExists('departments');
    }
};
