<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * MA in English (ELT) gets its own program site (like MBA), run by the Faculty
 * of Science and Humanities. It starts from the English department's MA ELT
 * curriculum and course packs; FSH focal points maintain it from the admin.
 */
return new class extends Migration
{
    public function up(): void
    {
        $eng = DB::table('departments')->where('slug', 'eng')->first();
        if (! $eng || DB::table('departments')->where('slug', 'ma-elt')->exists()) {
            return;
        }

        $now = now();
        $id = DB::table('departments')->insertGetId([
            'slug' => 'ma-elt',
            'name' => 'MA in English (ELT) Program',
            'short_name' => 'MA ELT',
            'faculty' => 'Faculty of Science and Humanities (FSH)',
            'tagline' => 'Postgraduate Program in English Language Teaching',
            'about' => 'The MA in English (ELT) is a one-year (two-semester) postgraduate program offered by the Department of English at BAUST.',
            'hod_name' => $eng->hod_name,
            'hod_designation' => str_contains((string) $eng->hod_designation, 'Head of the Department')
                ? str_replace('Head of the Department', 'Head, Department of English', $eng->hod_designation)
                : trim(($eng->hod_designation ?? '').', Department of English', ', '),
            'hod_photo' => $eng->hod_photo,
            'is_active' => true,
            'order' => (int) DB::table('departments')->max('order') + 1,
            'created_at' => $now,
            'updated_at' => $now,
        ]);

        // Start from the English department's MA ELT rows (without the curriculum
        // file: the English rows currently point at a BBA syllabus PDF).
        $curriculum = DB::table('department_curricula')->where('department_id', $eng->id)->where('degree', 'like', 'MA%')->first();
        if ($curriculum) {
            DB::table('department_curricula')->insert([
                'department_id' => $id, 'title' => $curriculum->title, 'year' => $curriculum->year,
                'description' => $curriculum->description, 'highlights' => $curriculum->highlights, 'file' => null,
                'duration' => $curriculum->duration, 'credits' => $curriculum->credits, 'degree' => $curriculum->degree,
                'order' => 1, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now,
            ]);
        }
        $resource = DB::table('department_online_resources')->where('department_id', $eng->id)->where('category', 'like', 'MA%')->first();
        if ($resource) {
            DB::table('department_online_resources')->insert([
                'department_id' => $id, 'title' => $resource->title, 'link' => $resource->link,
                'category' => $resource->category, 'description' => $resource->description,
                'order' => 1, 'is_active' => true, 'created_at' => $now, 'updated_at' => $now,
            ]);
        }

        // Run by FSH: listed on the FSH Dean's page and managed by its focal points.
        $fsh = DB::table('faculties')->where('slug', 'fsh')->first();
        if ($fsh) {
            $slugs = json_decode($fsh->department_slugs ?? '[]', true) ?: [];
            if (! in_array('ma-elt', $slugs, true)) {
                $slugs[] = 'ma-elt';
                DB::table('faculties')->where('id', $fsh->id)->update(['department_slugs' => json_encode($slugs), 'updated_at' => $now]);
            }
        }
    }

    public function down(): void
    {
        DB::table('departments')->where('slug', 'ma-elt')->delete();
    }
};
