<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('department_curricula', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
            $table->string('title');
            $table->string('year', 20)->nullable();
            $table->text('description')->nullable();
            $table->json('highlights')->nullable();
            $table->string('file')->nullable();
            $table->string('duration', 100)->nullable();
            $table->string('credits', 100)->nullable();
            $table->string('degree', 150)->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('department_laboratories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->text('description')->nullable();
            $table->json('equipment')->nullable();
            $table->json('objectives')->nullable();
            $table->json('images')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('department_achievements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
            $table->string('title');
            $table->string('type', 100)->nullable();
            $table->string('icon', 50)->nullable();
            $table->string('color', 50)->nullable();
            $table->text('description')->nullable();
            $table->text('details')->nullable();
            $table->string('team_title', 150)->nullable();
            $table->json('team_members')->nullable();
            $table->string('link')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('department_societies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
            $table->string('name');
            $table->string('slug');
            $table->string('type', 50)->default('society'); // 'society' | 'alumni'
            $table->text('description')->nullable();
            $table->string('member_count', 100)->nullable();
            $table->string('established', 50)->nullable();
            $table->string('committee_pdf')->nullable();
            $table->json('activities')->nullable();
            $table->json('committee')->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        Schema::create('department_obes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
            $table->string('type', 20); // 'peo' | 'plo'
            $table->string('code', 50); // e.g. 'PEO-1', 'PLO1'
            $table->string('title', 255)->nullable();
            $table->text('description');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('department_obes');
        Schema::dropIfExists('department_societies');
        Schema::dropIfExists('department_achievements');
        Schema::dropIfExists('department_laboratories');
        Schema::dropIfExists('department_curricula');
    }
};
