<?php

use App\Models\Department;
use App\Models\DepartmentHighlight;
use App\Models\DepartmentSlide;
use App\Models\DepartmentStat;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $cse = Department::firstOrNew(['slug' => 'cse']);
        $cse->fill([
            'name' => 'Department of Computer Science and Engineering',
            'short_name' => 'CSE',
            'faculty' => 'Faculty of Electrical and Computer Engineering (FECE)',
            'tagline' => 'Learn. Innovate. Lead.',
            'established' => '2015',
            'accreditation_badge' => 'BAETE Accredited',
            'accreditation_title' => 'Accredited by the Board of Accreditation for Engineering and Technical Education (BAETE)',
            'accreditation_text' => 'The B.Sc. in Computer Science and Engineering program has been accredited for three years, effective from February 12, 2023, by the Institution of Engineers, Bangladesh (IEB).',
            'about' => "Computer plays vital and in fact indispensable role in all fields of modern human activities. Consequently, Computer Science and Engineering has established itself as one of the most important branches of engineering. Recent development in computer has a considerable impact on society. It has already expanded to all fields of study starting from genetic engineering to space technology. Recent development in Artificial Intelligence has taken the human history a long way. That day is not very far when man can make machine like him.\n\nThe Department of Computer Science and Engineering is one of the pioneer Departments of this Institute providing top-quality education in Computer Science and Engineering (CSE) at its undergraduate program. ICT is the leading booming sector in present day. It is already declared as a thrust sector in Bangladesh. Keeping this in mind the department offers CSE course to produce computer specialist.\n\nA combination of highly qualified faculty member and state of art facilities has established the CSE department as one of the leading and prestigious of the Country.",
            'vision' => 'To be a center of excellence recognized nationally and internationally for quality education, research and innovation.',
            'mission' => "To provide quality, outcome-based education in computing; to advance knowledge through research; and to produce ethical, skilled graduates who contribute to society and the technology industry.",
            'hod_name' => 'Dr. Md Nakib Hayat Chowdhury',
            'hod_designation' => 'Head of the Department',
            'hod_photo' => '/storage/members/dr-md-nakib-hayat-chowdhury.jpg',
            'hod_message' => "Welcome to the Department of Computer Science and Engineering (CSE). In this department we create future computer scientists, engineers and responsible citizens.\n\nThe best students from all over Bangladesh join this prestigious department. In this department, you will find world-class facilities who are very young, hard working; as well teachers who got the opportunity to attain age and maturity. A very friendly and competitive environment exists for fostering a friendly and healthy teacher-student relationship.\n\nHere, a student gets the opportunity to excel in his academic activities. This is one of the very few departments where undergraduate students publish papers in international journals. At the same time, a student wishing to achieve some recognition in extra-curricular or co-curricular activities will also find the atmosphere helpful.\n\nGraduates of CSE are now one of strongest forces in the job market of Bangladesh. Software development, IT-based services, universities, telecom operators and vendors – name any of the job sectors and you will find a stronghold of CSE graduates in each of them. Graduates of this department have proved their ability to deliver the best in corporate environment and also take the performance standard to a higher level. Graduates of CSE are also working as faculty members in various reputed public and private Universities of Bangladesh.\n\nHowever the department is young, CSE has printed its footmarks at all possible corner. With the continued effort, Computer Science and Engineering department of BAUST is committed to convey the best education and prepare students to fight with the global challenges to steps forward into a better future.\n\nI welcome you to be a part of this journey and please accomplish the best.",
            'is_active' => true,
            'order' => 1,
        ]);
        $cse->save();

        // Seed Slides if empty
        if ($cse->slides()->count() === 0) {
            $slides = [
                ['image' => '/images/departments/cse/slider/ieb-accreditation.jpg', 'title' => 'IEB Accreditation Certificate', 'order' => 1],
                ['image' => '/images/departments/cse/slider/with-vc.jpeg', 'title' => 'With the Honorable Vice Chancellor', 'order' => 2],
                ['image' => '/images/departments/cse/slider/robotics-runners-up.png', 'title' => 'Robotics Competition — Runners Up', 'order' => 3],
                ['image' => '/images/departments/cse/slider/girls-programming-contest.png', 'title' => 'Participants — National Girls Programming Contest', 'order' => 4],
            ];
            foreach ($slides as $s) {
                DepartmentSlide::create(array_merge($s, ['department_id' => $cse->id]));
            }
        }

        // Seed Highlights if empty
        if ($cse->highlights()->count() === 0) {
            $highlights = [
                ['icon' => 'Building2', 'title' => 'Modern Laboratories', 'text' => 'State-of-the-art computer labs equipped with the latest hardware and software for hands-on learning.', 'order' => 1],
                ['icon' => 'GraduationCap', 'title' => 'Qualified Faculty', 'text' => 'Learn from highly qualified professors and researchers with diverse academic and industry backgrounds.', 'order' => 2],
                ['icon' => 'Sparkles', 'title' => 'Research Focused', 'text' => 'Strong emphasis on cutting-edge research in AI, Machine Learning, IoT, and Data Science.', 'order' => 3],
                ['icon' => 'Target', 'title' => 'Industry Ready', 'text' => 'Outcome-based curriculum designed to produce graduates ready for the global tech industry.', 'order' => 4],
            ];
            foreach ($highlights as $h) {
                DepartmentHighlight::create(array_merge($h, ['department_id' => $cse->id]));
            }
        }

        // Seed Stats if empty
        if ($cse->stats()->count() === 0) {
            $stats = [
                ['value' => '20+', 'label' => 'Faculty Members', 'order' => 1],
                ['value' => '2015', 'label' => 'Established', 'order' => 2],
                ['value' => 'BAETE', 'label' => 'Accredited', 'order' => 3],
                ['value' => '500+', 'label' => 'Students', 'order' => 4],
            ];
            foreach ($stats as $st) {
                DepartmentStat::create(array_merge($st, ['department_id' => $cse->id]));
            }
        }
    }

    public function down(): void
    {
        // Safe no-op
    }
};
