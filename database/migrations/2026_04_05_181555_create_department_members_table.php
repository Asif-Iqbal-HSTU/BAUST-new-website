<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('department_members', function (Blueprint $blueprint) {
            $blueprint->id();
            $blueprint->string('name');
            $blueprint->string('designation');
            $blueprint->string('photo')->nullable();
            $blueprint->string('phone')->nullable();
            $blueprint->string('email')->nullable();
            $blueprint->string('personal_email')->nullable();
            $blueprint->json('education');
            $blueprint->string('department'); // 'cse', 'eee', etc.
            $blueprint->string('type'); // 'permanent', 'adjunct', 'staff'
            $blueprint->string('status')->default('active'); // 'active', 'study_leave'
            $blueprint->string('category')->nullable(); // 'professor', 'associate_professor', 'assistant_professor', 'lecturer'
            $blueprint->integer('order')->default(0);
            $blueprint->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('department_members');
    }
};
