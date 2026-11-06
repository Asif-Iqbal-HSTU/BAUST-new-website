<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/** The people who run each department laboratory (in-charge, assistant, technician, ...). */
return new class extends Migration
{
    public function up(): void
    {
        Schema::create('department_lab_people', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
            $table->foreignId('laboratory_id')->constrained('department_laboratories')->cascadeOnDelete();
            $table->foreignId('member_id')->nullable()->constrained('department_members')->nullOnDelete();
            $table->string('role', 150);                // e.g. Lab In-charge, Lab Assistant
            $table->string('name');
            $table->string('designation')->nullable();
            $table->string('phone', 100)->nullable();
            $table->string('email')->nullable();
            $table->string('photo', 500)->nullable();
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('department_lab_people');
    }
};
