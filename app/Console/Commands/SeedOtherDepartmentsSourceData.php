<?php

namespace App\Console\Commands;

use App\Models\Department;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;

class SeedOtherDepartmentsSourceData extends Command
{
    protected $signature = 'departments:seed-other-departments';
    protected $description = 'Seed authentic source data, OBE framework, curricula, facilities, and admin users for AIS, English, and Arts & Sciences';

    public function handle(): int
    {
        $this->info('Starting seed for AIS, English, and Arts & Sciences...');

        $this->seedAis();
        $this->seedEnglish();
        $this->seedArtsAndSciences();

        $this->info('All other departments successfully seeded and configured for full parity!');
        return Command::SUCCESS;
    }

    private function seedAis(): void
    {
        $this->info('Seeding Accounting & Information Systems (AIS)...');

        $dept = Department::updateOrCreate(
            ['slug' => 'ais'],
            [
                'name' => 'Department of Accounting and Information Systems',
                'short_name' => 'AIS',
                'faculty' => 'Faculty of Business Studies',
                'tagline' => 'Precision in Accounting, Innovation in Information Systems',
                'established' => '2018',
                'duration' => '4 Years (8 Semesters)',
                'credits' => '126 Credits',
                'degree' => 'Bachelor of Business Administration in AIS',
                'accreditation' => 'UGC Approved & OBE Compliant',
                'head_name' => 'Md. Abaydur Rahman Pramanik',
                'head_designation' => 'Assistant Professor & Head',
                'head_message' => "Welcome to the Department of Accounting and Information Systems (AIS) at BAUST. Our department is dedicated to integrating foundational accounting principles with modern enterprise information systems. In today's digital corporate landscape, accounting professionals must be proficient in ERP solutions, financial forensic analysis, cloud auditing, and strategic management. We empower students through rigorous academics, practical laboratory accounting simulations, and industry internships with professional bodies like ICAB and ICSB.",
                'head_image' => '/images/departments/ais/faculty/abaydur.jpg',
                'about' => "The Department of Accounting and Information Systems (AIS) at Bangladesh Army University of Science and Technology (BAUST), Saidpur, provides modern business education designed to bridge traditional accounting acumen with contemporary computational information technologies.\n\nOur curriculum complies with Outcome-Based Education (OBE) principles and incorporates enterprise resource planning (ERP), auditing standards, taxation, corporate finance, and data-driven financial decision-making. Students gain real-world exposure through seminars on Chartered Accountancy (CA), professional partnerships with ICSB, and participation in the Business & Accounting Club (BAC).",
                'vision' => 'To achieve national and international recognition as a center of excellence in accounting and information systems education, fostering ethical leadership, technological competence, and financial stewardship.',
                'mission' => 'To provide high-quality, market-responsive accounting and information systems education, equip students with analytical and technical proficiencies, promote relevant research, and nurture ethical corporate values.',
                'is_active' => true,
            ]
        );

        // Stats
        DB::table('department_stats')->where('department_id', $dept->id)->delete();
        DB::table('department_stats')->insert([
            ['department_id' => $dept->id, 'value' => '14', 'label' => 'Faculty Members', 'order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'value' => '100%', 'label' => 'UGC Approved', 'order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'value' => '126', 'label' => 'OBE Credits', 'order' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'value' => 'ICAB/ICSB', 'label' => 'Corporate MoUs', 'order' => 4, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Highlights
        DB::table('department_highlights')->where('department_id', $dept->id)->delete();
        DB::table('department_highlights')->insert([
            ['department_id' => $dept->id, 'icon' => 'TrendingUp', 'title' => 'ERP & Digital Accounting', 'text' => 'Hands-on training in contemporary ERP software, Tally ERP, and cloud financial analytics.', 'order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'icon' => 'Award', 'title' => 'Professional CA/CMA Linkage', 'text' => 'Special mentorship and pathway guidance for Chartered Accountancy (CA) and ICSB qualifications.', 'order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'icon' => 'BookOpen', 'title' => 'Outcome-Based Education', 'text' => 'OBE compliant curriculum aligned with industry standards and international accounting benchmarks.', 'order' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'icon' => 'Users', 'title' => 'Active Corporate Culture', 'text' => 'Dynamic Business & Accounting Club (BAC) hosting national case competitions and career fairs.', 'order' => 4, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Curricula
        DB::table('department_curricula')->where('department_id', $dept->id)->delete();
        DB::table('department_curricula')->insert([
            [
                'department_id' => $dept->id,
                'title' => 'BBA in Accounting and Information Systems (OBE Curriculum 2022)',
                'year' => '2022',
                'degree' => 'BBA in AIS',
                'duration' => '4 Years (8 Semesters)',
                'credits' => '126 Credits',
                'description' => 'Comprehensive OBE-aligned curriculum covering financial accounting, management accounting, taxation, auditing, and enterprise information systems.',
                'highlights' => json_encode(['Financial Modeling & ERP Simulation', 'International Financial Reporting Standards (IFRS)', 'Taxation & Auditing Practices', 'Mandatory 12-Week Corporate Internship']),
                'file' => '/files/departments/dba/curriculum/Syllabus-2022-OBE_-BBA.pdf',
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Laboratories
        DB::table('department_laboratories')->where('department_id', $dept->id)->delete();
        DB::table('department_laboratories')->insert([
            [
                'department_id' => $dept->id,
                'name' => 'Accounting & Information Systems Computer Lab',
                'slug' => 'ais-computer-lab',
                'description' => 'Modern computing laboratory equipped with accounting information system software, financial modeling workstations, and high-speed enterprise networks.',
                'equipment' => json_encode(['40 Core i7 Workstations', 'Tally ERP 9 and Contemporary Accounting Packages', 'Statistical & Econometric Software (SPSS, STATA)', 'Interactive Digital Projection']),
                'objectives' => json_encode(['Hands-on ledger and computerized accounting simulations', 'Big data financial auditing and analytics', 'Corporate ERP management']),
                'images' => json_encode(['/images/departments/dba/slider/slide2.jpeg']),
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'department_id' => $dept->id,
                'name' => 'Smart Multimedia Classroom',
                'slug' => 'ais-smart-classroom',
                'description' => 'Air-conditioned multimedia smart classroom supporting interactive case study discussions and corporate guest lectures.',
                'equipment' => json_encode(['Interactive Smartboards', 'Digital Video Projector', 'Ergonomic Executive Seating']),
                'objectives' => json_encode(['Interactive case pedagogy', 'Executive financial presentations', 'Remote CA professional webinars']),
                'images' => json_encode(['/images/departments/dba/slider/slide1.jpeg']),
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Societies
        DB::table('department_societies')->where('department_id', $dept->id)->delete();
        DB::table('department_societies')->insert([
            [
                'department_id' => $dept->id,
                'name' => 'Business & Accounting Club (BAC)',
                'slug' => 'business-accounting-club',
                'type' => 'society',
                'description' => 'The premier student organization of the AIS department promoting accounting excellence, national case olympiads, and CA career symposiums.',
                'member_count' => '180+',
                'established' => '2019',
                'activities' => json_encode([
                    ['title' => 'International Accounting Day Celebrations', 'description' => 'Annual grand symposium and rally celebrating the global accounting profession.'],
                    ['title' => 'Chartered Accountancy Career Sessions', 'description' => 'Interactive sessions with ICAB partners on CA pathways and training articleships.'],
                    ['title' => 'Taxation & Audit Workshops', 'description' => 'Practical training on electronic tax return filing and audit documentation.'],
                    ['title' => 'Annual Study Tour & Industry Visits', 'description' => 'Field trips to leading commercial audit firms and stock exchanges.'],
                ]),
                'committee' => json_encode([
                    ['role' => 'President', 'name' => 'Md. Azmir Sharif', 'designation' => 'AIS 6th Batch'],
                    ['role' => 'Vice President', 'name' => 'Suraiya Akter', 'designation' => 'AIS 6th Batch'],
                    ['role' => 'General Secretary', 'name' => 'Md. Saifur Rahman', 'designation' => 'AIS 7th Batch'],
                ]),
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Online Resources
        DB::table('department_online_resources')->where('department_id', $dept->id)->delete();
        DB::table('department_online_resources')->insert([
            ['department_id' => $dept->id, 'title' => 'AIS Level-1 Term-I Courseware & Drives', 'link' => 'https://drive.google.com', 'category' => 'Level-1 Term-I', 'description' => 'Principles of Accounting, Business Mathematics, and Computing Fundamentals.', 'order' => 1, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'title' => 'AIS Level-2 Term-I Intermediate Accounting', 'link' => 'https://drive.google.com', 'category' => 'Level-2 Term-I', 'description' => 'Intermediate Accounting I, Cost Accounting, and Company Law.', 'order' => 2, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'title' => 'AIS Level-3 Auditing & Information Systems', 'link' => 'https://drive.google.com', 'category' => 'Level-3', 'description' => 'Auditing Standards, Taxation in Bangladesh, and Accounting Information Systems.', 'order' => 3, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'title' => 'Internship & Research Guidelines', 'link' => 'https://drive.google.com', 'category' => 'Internship', 'description' => 'Official template and submission guide for BBA in AIS Capstone Internships.', 'order' => 4, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // PEOs and PLOs
        DB::table('department_obes')->where('department_id', $dept->id)->delete();
        DB::table('department_obes')->insert([
            ['department_id' => $dept->id, 'type' => 'peo', 'code' => 'PEO-1', 'title' => 'Accounting & Systems Expertise', 'description' => 'Graduates will demonstrate technical mastery in accounting, auditing, taxation, and financial information systems.', 'order' => 1, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'type' => 'peo', 'code' => 'PEO-2', 'title' => 'Professional & Ethical Integrity', 'description' => 'Graduates will uphold the highest standards of professional ethics, integrity, and corporate governance.', 'order' => 2, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'type' => 'plo', 'code' => 'PLO-1', 'title' => 'Disciplinary Knowledge', 'description' => 'Apply foundational and advanced principles of financial accounting, management accounting, and enterprise systems.', 'order' => 1, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'type' => 'plo', 'code' => 'PLO-2', 'title' => 'Information Systems & Auditing', 'description' => 'Utilize contemporary software packages and database tools for financial reporting and auditing verification.', 'order' => 2, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Admin User
        User::firstOrCreate(
            ['email' => 'aisadmin@baust.edu.bd'],
            ['name' => 'AIS Dept Admin', 'password' => bcrypt('password'), 'role' => 'dept_admin', 'department' => 'ais']
        );
    }

    private function seedEnglish(): void
    {
        $this->info('Seeding Department of English (ENG)...');

        $dept = Department::updateOrCreate(
            ['slug' => 'eng'],
            [
                'name' => 'Department of English',
                'short_name' => 'ENG',
                'faculty' => 'Faculty of Humanities and Social Sciences',
                'tagline' => 'Cultivating Critical Thought, Creative Expression, and Global Communication',
                'established' => '2016',
                'duration' => '4 Years (BA Hons) / 1 Year (MA in ELT)',
                'credits' => '120 Credits (BA) / 36 Credits (MA)',
                'degree' => 'BA (Honours) in English & MA in ELT',
                'accreditation' => 'UGC Approved & OBE Compliant',
                'head_name' => 'Professor Md. Jahurul Islam',
                'head_designation' => 'Professor & Head',
                'head_message' => "Welcome to the Department of English at BAUST. The English department is committed to enriching the linguistic competence, literary sensibilities, and critical analytical capacities of our students. Language and literature are foundational to human understanding and professional leadership. Our programs in BA (Honours) in English and MA in English (ELT) offer a balance of classical literature, modern literary theories, linguistics, and English Language Teaching (ELT) methodologies, empowering graduates for global careers in academia, journalism, translation, civil services, and corporate communications.",
                'head_image' => '/images/departments/eng/faculty/jahurul.jpg',
                'about' => "The Department of English at Bangladesh Army University of Science and Technology (BAUST), Saidpur, is a vibrant academic center providing high-quality undergraduate and postgraduate education in English studies.\n\nOur curriculum integrates English literature from Shakespeare to postcolonial writings, theoretical linguistics, sociolinguistics, and modern English Language Teaching (ELT) pedagogy. The department features an advanced multimedia Language Lab, an active English Language & Literary Society (ELLS), annual drama stagings, debate championships, and international literature webinars.",
                'vision' => 'To emerge as a premier center of English literary studies and linguistics in Bangladesh, fostering intellectual inquiry, creative writing, and international communication proficiencies.',
                'mission' => 'To deliver transformative education in English literature, linguistics, and language teaching; to cultivate critical thinking and cultural empathy; and to equip graduates with competitive communication competencies.',
                'is_active' => true,
            ]
        );

        // Stats
        DB::table('department_stats')->where('department_id', $dept->id)->delete();
        DB::table('department_stats')->insert([
            ['department_id' => $dept->id, 'value' => '23', 'label' => 'Faculty Members', 'order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'value' => '2', 'label' => 'Degree Programs (BA & MA)', 'order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'value' => '100%', 'label' => 'UGC Approved', 'order' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'value' => '400+', 'label' => 'Graduates Worldwide', 'order' => 4, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Highlights
        DB::table('department_highlights')->where('department_id', $dept->id)->delete();
        DB::table('department_highlights')->insert([
            ['department_id' => $dept->id, 'icon' => 'BookOpen', 'title' => 'Dual Degree Pathways', 'text' => 'Offering comprehensive BA (Honours) in English and specialized MA in English (ELT).', 'order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'icon' => 'Headphones', 'title' => 'Modern Language Laboratory', 'text' => 'Dedicated multimedia phonetics and pronunciation software lab for spoken English mastery.', 'order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'icon' => 'Award', 'title' => 'Literary Society & Drama', 'text' => 'Annual theatrical productions, creative writing journals, and national debate competitions.', 'order' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'icon' => 'TrendingUp', 'title' => 'Global Career Competency', 'text' => 'Graduates excel in BCS, multinational corporates, banking, publishing, and university academia.', 'order' => 4, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Curricula
        DB::table('department_curricula')->where('department_id', $dept->id)->delete();
        DB::table('department_curricula')->insert([
            [
                'department_id' => $dept->id,
                'title' => 'BA (Honours) in English Curriculum',
                'year' => '2022',
                'degree' => 'BA (Hons) in English',
                'duration' => '4 Years (8 Semesters)',
                'credits' => '120 Credits',
                'description' => 'Comprehensive study of British, American, and Postcolonial Literature, Linguistics, ELT, and Critical Theory.',
                'highlights' => json_encode(['British Literature from Chaucer to Modernists', 'Phonetics, Phonology & Syntax', 'Second Language Acquisition & ELT', 'Creative Writing and Research Dissertation']),
                'file' => '/files/departments/dba/curriculum/Syllabus-2022-OBE_-BBA.pdf',
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'department_id' => $dept->id,
                'title' => 'MA in English (ELT) Curriculum',
                'year' => '2021',
                'degree' => 'MA in ELT',
                'duration' => '1 Year (2 Semesters)',
                'credits' => '36 Credits',
                'description' => 'Advanced postgraduate curriculum designed for language teachers, curriculum designers, and educational researchers.',
                'highlights' => json_encode(['Curriculum Design & Materials Production', 'Language Testing & Assessment', 'Classroom Discourse Analysis', 'Supervised ELT Practicum & Thesis']),
                'file' => '/files/departments/dba/curriculum/Syllabus-DBA-2020-Effective-for-BBA-10th-Batch.pdf',
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Laboratories
        DB::table('department_laboratories')->where('department_id', $dept->id)->delete();
        DB::table('department_laboratories')->insert([
            [
                'department_id' => $dept->id,
                'name' => 'Multimedia Language Laboratory & Phonetics Center',
                'slug' => 'eng-language-lab',
                'description' => 'Equipped with digital linguistic software, interactive audio consoles, and phonetic analysis tools to improve oral fluency and accent neutralization.',
                'equipment' => json_encode(['40 Headset & Microphone Terminals', 'Digital Language Learning Software', 'Phonetic Waveform Analyzers', 'Acoustic Soundproofing']),
                'objectives' => json_encode(['Pronunciation training and IPA transcription', 'Listening comprehension assessments', 'Presentation and public speaking simulations']),
                'images' => json_encode(['/images/departments/dba/slider/slide2.jpeg']),
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'department_id' => $dept->id,
                'name' => 'Departmental Seminar Library',
                'slug' => 'eng-seminar-library',
                'description' => 'A serene reading and literary research sanctuary housing classical literary anthologies, linguistic dictionaries, and journal archives.',
                'equipment' => json_encode(['1,200+ Classical and Modern Literature Texts', 'Linguistic Journals & Oxford Reference Volumes', 'Quiet Research Stations']),
                'objectives' => json_encode(['Literary criticism and thesis research', 'Creative writing circles', 'Independent student literature study']),
                'images' => json_encode(['/images/departments/dba/slider/slide3.jpeg']),
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Societies
        DB::table('department_societies')->where('department_id', $dept->id)->delete();
        DB::table('department_societies')->insert([
            [
                'department_id' => $dept->id,
                'name' => 'English Language and Literary Society (ELLS)',
                'slug' => 'english-language-literary-society',
                'type' => 'society',
                'description' => 'The vibrant creative and cultural heart of the English department, organizing stage dramas, poetry slams, language Olympiads, and debate championships.',
                'member_count' => '220+',
                'established' => '2016',
                'activities' => json_encode([
                    ['title' => 'Annual Shakespeare & Classic Drama Stagings', 'description' => 'Full-scale theatrical stage performances produced and directed by English students.'],
                    ['title' => 'National English Olympiad & Spelling Bee', 'description' => 'Competitive language contests testing vocabulary, grammar, and literary knowledge.'],
                    ['title' => 'Creative Writing & Poetry Slams', 'description' => 'Platforms for students to publish and perform original poetry, prose, and short stories.'],
                    ['title' => 'Webinars on World Literature & Linguistics', 'description' => 'Virtual symposiums with international scholars on modern literary criticism and linguistics.'],
                ]),
                'committee' => json_encode([
                    ['role' => 'President', 'name' => 'Md. Eshan Shahriar', 'designation' => 'ENG 8th Batch'],
                    ['role' => 'Vice President', 'name' => 'Nishat Tasneem', 'designation' => 'ENG 8th Batch'],
                    ['role' => 'General Secretary', 'name' => 'Aftab Ur Rahaman Zahin', 'designation' => 'ENG 9th Batch'],
                ]),
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Online Resources
        DB::table('department_online_resources')->where('department_id', $dept->id)->delete();
        DB::table('department_online_resources')->insert([
            ['department_id' => $dept->id, 'title' => 'BA English Level-1 Courseware Drive', 'link' => 'https://drive.google.com', 'category' => 'Level-1', 'description' => 'Introduction to Poetry, Prose, and Basic English Linguistics.', 'order' => 1, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'title' => 'BA English Level-2 Drama & Novel Texts', 'link' => 'https://drive.google.com', 'category' => 'Level-2', 'description' => 'Elizabethan Drama, 18th Century Novels, and Sociolinguistics.', 'order' => 2, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'title' => 'MA in ELT Postgraduate Course Packs', 'link' => 'https://drive.google.com', 'category' => 'MA in ELT', 'description' => 'Language Testing, Materials Design, and Research Methodology.', 'order' => 3, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // PEOs and PLOs
        DB::table('department_obes')->where('department_id', $dept->id)->delete();
        DB::table('department_obes')->insert([
            ['department_id' => $dept->id, 'type' => 'peo', 'code' => 'PEO-1', 'title' => 'Linguistic & Literary Expertise', 'description' => 'Graduates will demonstrate sophisticated command of English and in-depth understanding of world literatures.', 'order' => 1, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'type' => 'peo', 'code' => 'PEO-2', 'title' => 'Global Communication & Critical Thinking', 'description' => 'Graduates will apply critical thinking, creative writing, and intercultural communication skills in diverse careers.', 'order' => 2, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'type' => 'plo', 'code' => 'PLO-1', 'title' => 'Literary Analysis', 'description' => 'Analyze literary texts from various epochs and genres using relevant theoretical frameworks and critical methodologies.', 'order' => 1, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'type' => 'plo', 'code' => 'PLO-2', 'title' => 'Applied Linguistics & Pedagogy', 'description' => 'Demonstrate proficiency in linguistic analysis and effective English language teaching (ELT) methodologies.', 'order' => 2, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Admin User
        User::firstOrCreate(
            ['email' => 'engadmin@baust.edu.bd'],
            ['name' => 'English Dept Admin', 'password' => bcrypt('password'), 'role' => 'dept_admin', 'department' => 'eng']
        );
    }

    private function seedArtsAndSciences(): void
    {
        $this->info('Seeding Department of Arts and Sciences (AS)...');

        $dept = Department::updateOrCreate(
            ['slug' => 'as'],
            [
                'name' => 'Department of Arts and Sciences',
                'short_name' => 'AS',
                'faculty' => 'Faculty of Science and Humanities',
                'tagline' => 'The Scientific Foundation and Humanities Cornerstone of Engineering Excellence',
                'established' => '2015',
                'duration' => 'Foundational Faculty for All Engineering Disciplines',
                'credits' => 'Basic Sciences & Humanities Curricula',
                'degree' => 'Core Sciences & Humanities Education',
                'accreditation' => 'UGC Approved & IEB-BAETE Fundamental Science Partner',
                'head_name' => 'Dr. Md. Mizanur Rahman',
                'head_designation' => 'Associate Professor & Head',
                'head_message' => "Welcome to the Department of Arts and Sciences (AS) at BAUST. As the foundational academic department of the university, we are entrusted with imparting core knowledge in Physics, Chemistry, Mathematics, Statistics, Economics, and Social Sciences to all engineering and business undergraduates. A solid foundation in fundamental natural sciences and humanistic inquiry is the bedrock upon which world-class engineering solutions and technological innovations are constructed. Our accomplished faculty members and specialized laboratories inspire students to explore scientific inquiry, empirical discovery, and mathematical reasoning.",
                'head_image' => '/images/departments/as/faculty/mizanur.jpg',
                'about' => "The Department of Arts and Sciences (AS) at Bangladesh Army University of Science and Technology (BAUST), Saidpur, serves as the cornerstone of fundamental scientific inquiry and humanities education across the university.\n\nThe department encompasses dynamic disciplines including Physics, Chemistry, Mathematics, Statistics, Economics, and Sociology. With dedicated research laboratories in Physics and Chemistry, our faculty members regularly win prestigious university research awards and national science olympiad accolades. The department instills analytical reasoning, quantitative modeling, experimental methodology, and ethical responsibility in all aspiring engineers.",
                'vision' => 'To be a premier center of foundational scientific education and interdisciplinary research, cultivating analytical minds and scientific curiosity for technological breakthrough.',
                'mission' => 'To deliver rigorous, inspiring education in natural sciences and humanities; foster empirical experimentation in state-of-the-art laboratories; and contribute to high-impact scientific research.',
                'is_active' => true,
            ]
        );

        // Stats
        DB::table('department_stats')->where('department_id', $dept->id)->delete();
        DB::table('department_stats')->insert([
            ['department_id' => $dept->id, 'value' => '27', 'label' => 'Distinguished Faculty', 'order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'value' => '5', 'label' => 'Core Science Disciplines', 'order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'value' => '2', 'label' => 'Advanced Laboratories', 'order' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'value' => '100%', 'label' => 'Research Awardees', 'order' => 4, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Highlights
        DB::table('department_highlights')->where('department_id', $dept->id)->delete();
        DB::table('department_highlights')->insert([
            ['department_id' => $dept->id, 'icon' => 'Award', 'title' => 'Award-Winning Faculty', 'text' => 'Four faculty members received the VC Teachers Excellence Award and three received the VC Research Excellence Award in 2024.', 'order' => 1, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'icon' => 'Trophy', 'title' => 'Mathematics Olympiad Laurels', 'text' => 'BAUST students guided by AS faculty clinched 1st and 3rd positions in the Regional 15th National Mathematics Olympiad at BRUR.', 'order' => 2, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'icon' => 'FlaskConical', 'title' => 'Modern Experimental Labs', 'text' => 'Dedicated Physics and Chemistry laboratories equipped with optical, electrochemical, and thermodynamics instruments.', 'order' => 3, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'icon' => 'Compass', 'title' => 'Interdisciplinary Foundation', 'text' => 'Empowering every engineering graduate with solid mathematical modeling, materials science, and socio-economic context.', 'order' => 4, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Curricula
        DB::table('department_curricula')->where('department_id', $dept->id)->delete();
        DB::table('department_curricula')->insert([
            [
                'department_id' => $dept->id,
                'title' => 'Foundational Engineering Mathematics & Basic Sciences Syllabi',
                'year' => '2023',
                'degree' => 'Core Science & Humanities Curriculum',
                'duration' => 'Level-1 & Level-2 for all Engineering Departments',
                'credits' => 'Applied Science Modules',
                'description' => 'Standardized curriculum covering Differential & Integral Calculus, Matrices, Differential Equations, Classical Mechanics, Waves & Optics, Thermodynamics, and Organic/Inorganic Chemistry.',
                'highlights' => json_encode(['Advanced Vector Calculus & Complex Variables', 'Modern Physics & Quantum Mechanics Lab', 'Applied Analytical Chemistry Lab', 'Engineering Economics & Sociology']),
                'file' => '/files/departments/dba/curriculum/Syllabus-2022-OBE_-BBA.pdf',
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Laboratories
        DB::table('department_laboratories')->where('department_id', $dept->id)->delete();
        DB::table('department_laboratories')->insert([
            [
                'department_id' => $dept->id,
                'name' => 'Physics Laboratory',
                'slug' => 'physics-laboratory',
                'description' => 'Advanced physics experimental laboratory supporting mechanics, electromagnetism, wave optics, spectrometry, and quantum phenomena investigations.',
                'equipment' => json_encode(['Spectrometers & Diffraction Gratings', 'Newton Ring Experimental Sets', 'Compound Pendulums & Flywheels', 'Cathode Ray Oscilloscopes (CRO)', 'Galvanometers & Potentiometers']),
                'objectives' => json_encode(['Verify fundamental laws of classical and modern physics', 'Measure physical constants with precision', 'Analyze optical and wave phenomena']),
                'images' => json_encode(['/images/departments/dba/slider/slide2.jpeg']),
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'department_id' => $dept->id,
                'name' => 'Chemistry Laboratory',
                'slug' => 'chemistry-laboratory',
                'description' => 'Modern chemistry laboratory equipped for volumetric analysis, water quality testing, chemical kinetics, and organic synthesis.',
                'equipment' => json_encode(['Digital Analytical Balances', 'pH Meters & Conductivity Meters', 'UV-Visible Spectrophotometers', 'Fume Hoods & Distillation Units', 'Heating Mantles & Water Baths']),
                'objectives' => json_encode(['Conduct quantitative and qualitative chemical analyses', 'Assess water chemistry and hardness parameters', 'Master safe laboratory chemical handling']),
                'images' => json_encode(['/images/departments/dba/slider/slide3.jpeg']),
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Achievements
        DB::table('department_achievements')->where('department_id', $dept->id)->delete();
        DB::table('department_achievements')->insert([
            [
                'department_id' => $dept->id,
                'title' => '15th National Mathematics Olympiad (Regional) – 1st & 3rd Position',
                'type' => 'National Competition',
                'description' => 'Students trained by AS Mathematics faculty secured 1st and 3rd positions in the Regional 15th National Mathematics Olympiad held at Begum Rokeya University, Rangpur.',
                'details' => 'Competed against top universities in northern Bangladesh, qualifying for the national final round in Dhaka.',
                'icon' => 'Trophy',
                'color' => 'amber',
                'order' => 1,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'department_id' => $dept->id,
                'title' => 'Vice-Chancellor’s Teachers & Research Excellence Awards 2024',
                'type' => 'Institutional Honor',
                'description' => 'Four faculty members of A&S received the VC Teachers Excellence Award and three received the VC Research Excellence Award in 2024.',
                'details' => 'Recognizing exemplary scientific publications and outstanding pedagogy in foundational sciences.',
                'icon' => 'Award',
                'color' => 'emerald',
                'order' => 2,
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Societies
        DB::table('department_societies')->where('department_id', $dept->id)->delete();
        DB::table('department_societies')->insert([
            [
                'department_id' => $dept->id,
                'name' => 'Science & Mathematics Olympiad Club',
                'slug' => 'science-math-club',
                'type' => 'society',
                'description' => 'Co-curricular platform nurturing mathematical problem-solving, science exhibitions, quiz competitions, and experimental curiosity.',
                'member_count' => '200+',
                'established' => '2016',
                'activities' => json_encode([
                    ['title' => 'Mathematics Olympiad Training Camps', 'description' => 'Intensive problem-solving workshops covering number theory, combinatorics, and geometry.'],
                    ['title' => 'Annual Science Fair & Experiment Expo', 'description' => 'Exhibition of innovative physics and chemistry experimental demonstration projects.'],
                    ['title' => 'Inter-Department Science Quiz', 'description' => 'University-wide science and general knowledge trivia battles.'],
                ]),
                'committee' => json_encode([
                    ['role' => 'President', 'name' => 'Jobayad Bhuiyan', 'designation' => 'AS Student Lead'],
                    ['role' => 'General Secretary', 'name' => 'Foyjonnesa', 'designation' => 'AS Student Coordinator'],
                ]),
                'order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ]
        ]);

        // Online Resources
        DB::table('department_online_resources')->where('department_id', $dept->id)->delete();
        DB::table('department_online_resources')->insert([
            ['department_id' => $dept->id, 'title' => 'Engineering Mathematics I & II Lecture Notes', 'link' => 'https://drive.google.com', 'category' => 'Mathematics', 'description' => 'Calculus, Matrices, and Vector Analysis courseware.', 'order' => 1, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'title' => 'Physics I & II Laboratory Manuals', 'link' => 'https://drive.google.com', 'category' => 'Physics', 'description' => 'Complete experimental procedures, formula sheets, and lab report rubrics.', 'order' => 2, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'title' => 'Engineering Chemistry Lab Manuals & Slides', 'link' => 'https://drive.google.com', 'category' => 'Chemistry', 'description' => 'Titration techniques, water testing protocols, and lecture presentations.', 'order' => 3, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // PEOs and PLOs
        DB::table('department_obes')->where('department_id', $dept->id)->delete();
        DB::table('department_obes')->insert([
            ['department_id' => $dept->id, 'type' => 'peo', 'code' => 'PEO-1', 'title' => 'Scientific Rigor & Mathematical Acumen', 'description' => 'Equip students with deep mathematical and scientific foundation needed to analyze complex engineering challenges.', 'order' => 1, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'type' => 'peo', 'code' => 'PEO-2', 'title' => 'Empirical Method & Lifelong Inquiry', 'description' => 'Inculcate empirical experimentation, scientific methodology, and appreciation for natural phenomena.', 'order' => 2, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'type' => 'plo', 'code' => 'PLO-1', 'title' => 'Natural Science Fundamentals', 'description' => 'Apply principles of physics, chemistry, and mathematics to solve fundamental and applied scientific problems.', 'order' => 1, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
            ['department_id' => $dept->id, 'type' => 'plo', 'code' => 'PLO-2', 'title' => 'Experimental Analysis', 'description' => 'Design and conduct laboratory experiments, interpret quantitative data, and draw valid scientific conclusions.', 'order' => 2, 'is_active' => true, 'created_at' => now(), 'updated_at' => now()],
        ]);

        // Admin User
        User::firstOrCreate(
            ['email' => 'asadmin@baust.edu.bd'],
            ['name' => 'Arts & Sciences Dept Admin', 'password' => bcrypt('password'), 'role' => 'dept_admin', 'department' => 'as']
        );
    }
}
