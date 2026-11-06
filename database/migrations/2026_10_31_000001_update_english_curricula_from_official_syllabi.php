<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * Replaces the placeholder English curricula (which linked to BBA syllabus PDFs
 * and listed inaccurate credits and courses) with the details and files of the
 * department's official BA (Hons) and MA in English (ELT) syllabi.
 */
return new class extends Migration
{
    public function up(): void
    {
        $now = now();

        $ba = [
            'title' => 'BA (Honours) in English Curriculum',
            'year' => '2023',
            'degree' => 'BA (Hons) in English',
            'duration' => '4 Years (8 Semesters)',
            'credits' => '140 Credits',
            'description' => 'Outcome-based curriculum effective for students admitted in Winter Semester 2023 and onwards, combining literature with language, linguistics, ELT, translation and critical theory.',
            'highlights' => json_encode([
                'British, American, European, South Asian, African and Caribbean Literature',
                'Introductory Linguistics, Phonetics and Phonology, Sociolinguistics and Psycholinguistics',
                'English Language Teaching, Translation Studies, Media Studies and Communication',
                'Research Methodology and Thesis',
            ]),
            'file' => '/files/departments/eng/curriculum/BA-Hons-English-OBE-Syllabus-2023.pdf',
        ];

        $ma = [
            'title' => 'MA in English (ELT) Curriculum',
            'year' => '2022',
            'degree' => 'MA in English (ELT)',
            'duration' => '1 Year (2 Terms)',
            'credits' => '36 Credits',
            'description' => 'Outcome-based postgraduate curriculum with Thesis and Non-Thesis groups. Students securing at least CGPA 3.50 in BA (Hons) are eligible for the thesis.',
            'highlights' => json_encode([
                'Phonetics, Phonology, Morphology, Syntax and Semantics',
                'Language Teaching Methods, Teaching Language Skills and Second Language Acquisition',
                'Syllabus Design, Materials Development, Language Testing and Assessment',
                'Teaching Practicum, Research Methodology, and Thesis and Defense',
            ]),
            'file' => '/files/departments/eng/curriculum/MA-English-ELT-OBE-Syllabus-2022.pdf',
        ];

        $this->upsert('eng', 'BA%', $ba, 1, $now);
        $this->upsert('eng', 'MA%', $ma, 2, $now);
        $this->upsert('ma-elt', 'MA%', $ma, 1, $now);
    }

    public function down(): void
    {
        // Not reversed: the previous rows linked to the wrong department's syllabi.
    }

    private function upsert(string $slug, string $degreeLike, array $values, int $order, $now): void
    {
        $departmentId = DB::table('departments')->where('slug', $slug)->value('id');
        if (! $departmentId) {
            return;
        }

        $updated = DB::table('department_curricula')
            ->where('department_id', $departmentId)
            ->where('degree', 'like', $degreeLike)
            ->update($values + ['updated_at' => $now]);

        if ($updated === 0 && ! DB::table('department_curricula')->where('department_id', $departmentId)->where('degree', 'like', $degreeLike)->exists()) {
            DB::table('department_curricula')->insert($values + [
                'department_id' => $departmentId,
                'order' => $order,
                'is_active' => true,
                'created_at' => $now,
                'updated_at' => $now,
            ]);
        }
    }
};
