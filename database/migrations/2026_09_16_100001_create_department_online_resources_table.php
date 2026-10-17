<?php

use App\Models\Department;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('department_online_resources', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained()->cascadeOnDelete();
            $table->string('title');
            $table->text('link');
            $table->string('category')->nullable();
            $table->text('description')->nullable();
            $table->unsignedInteger('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Seed ME Department Online Resources from baust.edu.bd
        $me = Department::where('slug', 'me')->first();
        if ($me) {
            $resources = [
                [
                    'title' => 'Level-1 Term-1 Course Material',
                    'link' => 'https://drive.google.com/drive/folders/1UXf8OjPuUuuwnN6xuHWeBrzBl2yrIk8F',
                    'category' => 'Level 1',
                    'description' => 'Course materials, lecture notes, and lab manuals for ME Level-1 Term-1.',
                    'order' => 1,
                ],
                [
                    'title' => 'Level-1 Term-2 Course Material',
                    'link' => 'https://drive.google.com/drive/folders/1txeWlFxM120TWC9xQXp8A8sUtI6D2kiR',
                    'category' => 'Level 1',
                    'description' => 'Course materials, lecture notes, and lab manuals for ME Level-1 Term-2.',
                    'order' => 2,
                ],
                [
                    'title' => 'Level-2 Term-1 Course Material',
                    'link' => 'https://drive.google.com/drive/folders/1VrPOneViu6F2B5qajSMXtkySNJUgEYK0',
                    'category' => 'Level 2',
                    'description' => 'Course materials, lecture notes, and lab manuals for ME Level-2 Term-1.',
                    'order' => 3,
                ],
                [
                    'title' => 'Level-2 Term-2 Course Material',
                    'link' => 'https://drive.google.com/drive/folders/16sxtP9CIWV92uRbzHMI7-r_t6bQgiobp',
                    'category' => 'Level 2',
                    'description' => 'Course materials, lecture notes, and lab manuals for ME Level-2 Term-2.',
                    'order' => 4,
                ],
                [
                    'title' => 'Level-3 Term-1 Course Material',
                    'link' => 'https://drive.google.com/drive/folders/1yhXhNaL47ib0UPHsNgRS5HE1eUXZPwPC',
                    'category' => 'Level 3',
                    'description' => 'Course materials, lecture notes, and lab manuals for ME Level-3 Term-1.',
                    'order' => 5,
                ],
                [
                    'title' => 'Level-3 Term-2 Course Material',
                    'link' => 'https://drive.google.com/drive/folders/1Hw2gLWbIGbpIfIcjvtk9kw4U4-npvM3f',
                    'category' => 'Level 3',
                    'description' => 'Course materials, lecture notes, and lab manuals for ME Level-3 Term-2.',
                    'order' => 6,
                ],
                [
                    'title' => 'Level-4 Term-1 Course Material',
                    'link' => 'https://drive.google.com/drive/folders/1nQa3qCYAjeC9VuJLw8KMYwH8EpKT9K9V',
                    'category' => 'Level 4',
                    'description' => 'Course materials, lecture notes, and lab manuals for ME Level-4 Term-1.',
                    'order' => 7,
                ],
                [
                    'title' => 'Level-4 Term-2 Course Material',
                    'link' => 'https://drive.google.com/drive/folders/1jBNHYS9IXJxzP9SCqwvL8hE3oMwnfQq6',
                    'category' => 'Level 4',
                    'description' => 'Course materials, lecture notes, and lab manuals for ME Level-4 Term-2.',
                    'order' => 8,
                ],
                [
                    'title' => 'View All Level-Term Course Material Repository',
                    'link' => 'https://drive.google.com/drive/folders/1O4pskTy2Yznk2j1CyN-XfsGJBz06-ZIs',
                    'category' => 'General Repository',
                    'description' => 'Complete cloud repository of all undergraduate course materials for Mechanical Engineering.',
                    'order' => 9,
                ],
                [
                    'title' => 'Online Class Routine for All Level-Terms',
                    'link' => 'https://drive.google.com/open?id=1OLw4fYQOVfNtnAxxHeEwkwwxyDbqXxYF',
                    'category' => 'Routine & Schedules',
                    'description' => 'Comprehensive online class routines and schedules across all level terms.',
                    'order' => 10,
                ],
            ];

            $now = now();
            foreach ($resources as $res) {
                DB::table('department_online_resources')->insert(array_merge($res, [
                    'department_id' => $me->id,
                    'is_active' => true,
                    'created_at' => $now,
                    'updated_at' => $now,
                ]));
            }
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('department_online_resources');
    }
};
