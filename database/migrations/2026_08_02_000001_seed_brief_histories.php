<?php

use App\Models\BriefHistory;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $rows = [
            [
                'title' => 'Inauguration of BAUST',
                'content' => 'Bangladesh Army University of Science & Technology (BAUST), the pioneer technical institute of the Armed Forces, started its journey on 15th February 2015. BAUST is a private university sponsored by the Bangladesh Army Welfare Trust. The Bangladesh Army established BAUST at Saidpur Cantonment, and it was inaugurated by the Hon’ble Minister of Cultural Affairs of Bangladesh on the same date.',
                'image_path' => '/images/Brief history/Inugaration-7.jpg',
                'order' => 1,
            ],
            [
                'title' => 'Academic Departments',
                'content' => 'The intention behind establishing BAUST was to spread technical education to the remote areas of the country. BAUST received approval to start its academic activities from the Ministry of Education and the UGC on 17 February 2015, and launched its academic session with four departments (CSE, EEE, ME, and A&S) under three faculties. At present, BAUST functions with 10 departments (CSE, EEE, ME, IPE, CE, ICT, Business Administration, English, AIS and A&S) under five faculties.',
                'image_path' => '/images/Brief history/DSC02932-800x533.jpg',
                'order' => 2,
            ],
            [
                'title' => 'Compliance & Commitment',
                'content' => 'BAUST is in full compliance with the Private University Act 2010 and the instructions issued by the Army Welfare Trust, the Ministry of Education, and the University Grants Commission of Bangladesh. The university strives to maintain the highest quality of education while serving the nation.',
                'image_path' => '/images/Brief history/Inugaration-8-650x332.jpg',
                'order' => 3,
            ],
        ];

        foreach ($rows as $r) {
            BriefHistory::updateOrCreate(['title' => $r['title']], $r);
        }
    }

    public function down(): void
    {
        BriefHistory::whereIn('title', ['Inauguration of BAUST', 'Academic Departments', 'Compliance & Commitment'])->delete();
    }
};
