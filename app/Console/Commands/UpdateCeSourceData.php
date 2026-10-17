<?php

namespace App\Console\Commands;

use App\Models\Department;
use App\Models\DepartmentAlumnus;
use App\Models\DepartmentGallery;
use App\Models\DepartmentResearch;
use App\Models\DepartmentStudentVoice;
use App\Models\Notice;
use App\Models\NoticeCategory;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class UpdateCeSourceData extends Command
{
    protected $signature = 'ce:update-source-data';
    protected $description = 'Ingest and update authentic Civil Engineering data from source';

    public function handle(): int
    {
        $this->info('Starting CE source data update...');

        $dept = Department::where('slug', 'ce')->first();
        if (!$dept) {
            $this->error('CE department not found in database!');
            return 1;
        }

        $deptId = $dept->id;

        // 1. Update Curriculum PDFs
        $this->info('1. Updating Curriculum PDFs...');
        $dept->curricula()->where('year', '2022')->update([
            'file' => '/files/departments/ce/curriculum/Syllabus-2022.pdf'
        ]);
        $dept->curricula()->where('year', '2019')->update([
            'file' => '/files/departments/ce/curriculum/Syllabus-2019.pdf'
        ]);

        // 2. Update Laboratories
        $this->info('2. Updating Laboratories with exact text and tests...');
        $labsFile = base_path('scratch/ce_labs_structured.json');
        if (file_exists($labsFile)) {
            $labs = json_decode(file_get_contents($labsFile), true);
            foreach ($labs as $slug => $data) {
                $lab = $dept->laboratories()->where('slug', $slug)->first();
                if ($lab) {
                    $lab->update([
                        'description' => $data['description'] ?? $lab->description,
                        'equipment' => $data['equipment'] ?? $lab->equipment,
                        'objectives' => $data['objectives'] ?? $lab->objectives,
                    ]);
                }
            }
        }

        // 3. Update Clubs logos & Alumni Association
        $this->info('3. Updating Clubs logos and Alumni Association...');
        $dept->societies()->where('slug', 'ceic')->update([
            'committee_pdf' => '/images/departments/ce/clubs/ceic-logo.jpg'
        ]);
        $dept->societies()->where('slug', 'esc')->update([
            'committee_pdf' => '/images/departments/ce/clubs/esc-logo.jpg'
        ]);

        $parsedFile = base_path('scratch/ce_all_parsed.json');
        if (file_exists($parsedFile)) {
            $parsed = json_decode(file_get_contents($parsedFile), true);

            // Update Alumni Association committee in department_societies
            if (!empty($parsed['assoc_committee'])) {
                $alumniSoc = $dept->societies()->where('slug', 'alumni-association')->first();
                if ($alumniSoc) {
                    $committeeMembers = [];
                    foreach ($parsed['assoc_committee'] as $m) {
                        $committeeMembers[] = [
                            'designation' => html_entity_decode($m['designation'], ENT_QUOTES, 'UTF-8'),
                            'name' => html_entity_decode($m['name'], ENT_QUOTES, 'UTF-8'),
                            'contact' => $m['contact'] ?? '',
                        ];
                    }
                    $alumniSoc->update([
                        'committee' => $committeeMembers
                    ]);
                }
            }

            // 4. Research (Publications & Thesis Projects)
            $this->info('4. Populating Research Publications & Thesis Projects...');
            $dept->researches()->delete();

            if (!empty($parsed['publications'])) {
                foreach ($parsed['publications'] as $idx => $p) {
                    DepartmentResearch::create([
                        'department_id' => $deptId,
                        'type' => 'publication',
                        'category' => $p['type'] ?? 'Journal Paper',
                        'title' => html_entity_decode($p['citation'], ENT_QUOTES, 'UTF-8'),
                        'link' => $p['link'] ?? null,
                        'order' => $idx + 1,
                        'is_active' => true,
                    ]);
                }
            }

            if (!empty($parsed['theses'])) {
                foreach ($parsed['theses'] as $idx => $t) {
                    if ($t['title'] === '&#8211;' || empty($t['title'])) continue;
                    DepartmentResearch::create([
                        'department_id' => $deptId,
                        'type' => 'thesis',
                        'category' => 'Undergraduate Thesis',
                        'title' => html_entity_decode($t['title'], ENT_QUOTES, 'UTF-8'),
                        'supervisor' => html_entity_decode($t['supervisor'] ?? '', ENT_QUOTES, 'UTF-8'),
                        'students_info' => html_entity_decode(($t['students'] ?? '') . ' (' . ($t['student_ids'] ?? '') . ')', ENT_QUOTES, 'UTF-8'),
                        'pdf_file' => $t['pdf_link'] ?? null,
                        'order' => $idx + 1,
                        'is_active' => true,
                    ]);
                }
            }

            // 5. Student Voice
            $this->info('5. Populating Student Voice...');
            $dept->studentVoices()->delete();
            if (!empty($parsed['voice'])) {
                $v = $parsed['voice'];
                DepartmentStudentVoice::create([
                    'department_id' => $deptId,
                    'student_name' => $v['author'] ?? 'Abu Helal',
                    'student_id' => $v['student_id'] ?? '200105023',
                    'batch' => $v['batch'] ?? 'Student of 1st Batch, CE, BAUST',
                    'title' => $v['title'] ?? 'The Civil Engineering Journey — Student Perspective',
                    'image' => $v['image'] ?? null,
                    'profile_link' => $v['profile_link'] ?? null,
                    'quote' => $v['reflection'] ?? 'A vibrant reflection on academic growth and engineering ethics.',
                    'order' => 1,
                    'is_active' => true,
                ]);
            }

            // 6. Alumni Information (Job Holders & Higher Studies)
            $this->info('6. Populating Alumni Information (Job Holders & Higher Studies)...');
            
            // Ensure table schema has needed columns
            if (!\Illuminate\Support\Facades\Schema::hasColumn('department_alumni', 'type')) {
                \Illuminate\Support\Facades\Schema::table('department_alumni', function($table) {
                    $table->string('type', 50)->default('job_holder')->after('department_id');
                });
            }
            if (!\Illuminate\Support\Facades\Schema::hasColumn('department_alumni', 'passing_year')) {
                \Illuminate\Support\Facades\Schema::table('department_alumni', function($table) {
                    $table->string('passing_year', 50)->nullable()->after('batch');
                });
            }
            if (!\Illuminate\Support\Facades\Schema::hasColumn('department_alumni', 'organization')) {
                \Illuminate\Support\Facades\Schema::table('department_alumni', function($table) {
                    $table->string('organization', 255)->nullable()->after('designation');
                });
            }
            if (!\Illuminate\Support\Facades\Schema::hasColumn('department_alumni', 'is_active')) {
                \Illuminate\Support\Facades\Schema::table('department_alumni', function($table) {
                    $table->boolean('is_active')->default(true)->after('order');
                });
            }

            $dept->alumni()->delete();

            if (!empty($parsed['job_holders'])) {
                foreach ($parsed['job_holders'] as $idx => $jh) {
                    DepartmentAlumnus::create([
                        'department_id' => $deptId,
                        'type' => 'job_holder',
                        'name' => html_entity_decode($jh['name'], ENT_QUOTES, 'UTF-8'),
                        'batch' => $jh['batch'] ?? '',
                        'passing_year' => $jh['year'] ?? '',
                        'designation' => html_entity_decode($jh['position'] ?? '', ENT_QUOTES, 'UTF-8'),
                        'organization' => '',
                        'order' => $idx + 1,
                        'is_active' => true,
                    ]);
                }
            }

            if (!empty($parsed['higher_studies'])) {
                foreach ($parsed['higher_studies'] as $idx => $hs) {
                    DepartmentAlumnus::create([
                        'department_id' => $deptId,
                        'type' => 'higher_study',
                        'name' => html_entity_decode($hs['name'], ENT_QUOTES, 'UTF-8'),
                        'batch' => $hs['batch'] ?? '',
                        'passing_year' => $hs['year'] ?? '',
                        'designation' => html_entity_decode($hs['institution'] ?? '', ENT_QUOTES, 'UTF-8'),
                        'organization' => '',
                        'order' => $idx + 1,
                        'is_active' => true,
                    ]);
                }
            }
        }

        // 7. Galleries (Photos & Videos)
        $this->info('7. Populating Galleries...');
        $dept->galleries()->delete();

        DepartmentGallery::create([
            'department_id' => $deptId,
            'type' => 'photo',
            'title' => 'Civil Engineering Survey Camp & Field Practices',
            'category' => 'Field Survey & Practical Training',
            'description' => 'Hands-on topographic mapping, leveling, theodolite operations, and field problem solving by Civil Engineering students.',
            'images' => [
                '/images/departments/ce/gallery/ce_photo_1.jpg',
                '/images/departments/ce/gallery/ce_photo_2.jpg',
                '/images/departments/ce/gallery/ce_photo_3.jpg',
                '/images/departments/ce/gallery/ce_photo_4.jpg',
            ],
            'order' => 1,
            'is_active' => true,
        ]);

        DepartmentGallery::create([
            'department_id' => $deptId,
            'type' => 'photo',
            'title' => 'Laboratory Facilities & Departmental Events',
            'category' => 'Lab & Academic Facilities',
            'description' => 'Modern laboratories, student experiments, technical competitions, and departmental ceremonies.',
            'images' => [
                '/images/departments/ce/gallery/ce_photo_5.jpg',
                '/images/departments/ce/gallery/ce_photo_6.jpg',
                '/images/departments/ce/gallery/ce_photo_7.jpg',
                '/images/departments/ce/gallery/ce_photo_8.jpg',
            ],
            'order' => 2,
            'is_active' => true,
        ]);

        DepartmentGallery::create([
            'department_id' => $deptId,
            'type' => 'video',
            'title' => 'Civil Engineering Department Documentary - Part 1',
            'category' => 'Department Overview',
            'description' => 'State-of-the-art laboratory infrastructure, OBE curriculum, faculty facilities, and hands-on learning environment.',
            'video_url' => '/videos/ce/BAUST_CE.mp4',
            'order' => 1,
            'is_active' => true,
        ]);

        DepartmentGallery::create([
            'department_id' => $deptId,
            'type' => 'video',
            'title' => 'Civil Engineering Department Documentary - Part 2',
            'category' => 'Student Life & Field Activities',
            'description' => 'Survey camp activities, student projects, extracurricular achievements, and campus life.',
            'video_url' => '/videos/ce/BAUST_CE 2.mp4',
            'order' => 2,
            'is_active' => true,
        ]);

        // 8. Notices / News & Events
        $this->info('8. Ingesting full News & Events...');
        \Illuminate\Support\Facades\DB::statement('ALTER TABLE notices MODIFY attachment TEXT NULL');
        
        $noticesFile = base_path('scratch/prepared_ce_notices.json');
        if (file_exists($noticesFile)) {
            $notices = json_decode(file_get_contents($noticesFile), true);
            $cat = NoticeCategory::firstOrCreate(
                ['slug' => 'news-events'],
                ['name' => 'News & Events']
            );

            foreach ($notices as $n) {
                $notice = Notice::where('slug', $n['slug'])
                    ->orWhere(function($q) use ($n) {
                        $q->where('title', $n['title'])->where('department', 'ce');
                    })
                    ->first();

                if ($notice) {
                    $notice->update([
                        'content' => $n['content'],
                        'excerpt' => $n['excerpt'],
                        'attachment' => $n['attachment'] ?: $notice->attachment,
                        'attachment_type' => $n['attachment_type'] ?: $notice->attachment_type,
                        'department' => 'ce',
                        'is_active' => true,
                        'published_at' => $n['published_at'],
                    ]);
                } else {
                    $notice = Notice::create([
                        'title' => $n['title'],
                        'slug' => $n['slug'],
                        'content' => $n['content'],
                        'excerpt' => $n['excerpt'],
                        'attachment' => $n['attachment'],
                        'attachment_type' => $n['attachment_type'],
                        'department' => 'ce',
                        'is_active' => true,
                        'published_at' => $n['published_at'],
                    ]);
                }

                if ($cat && !$notice->categories()->where('notice_categories.id', $cat->id)->exists()) {
                    $notice->categories()->attach($cat->id);
                }
            }
            $this->info('Processed ' . count($notices) . ' notices for CE.');
        }

        $this->info('All Civil Engineering data successfully updated!');
        return 0;
    }
}
