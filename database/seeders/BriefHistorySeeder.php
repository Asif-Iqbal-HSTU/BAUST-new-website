<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\BriefHistory;

class BriefHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        BriefHistory::truncate();

        BriefHistory::create([
            'title' => 'Inauguration of BAUST',
            'content' => 'Bangladesh Army University of Science & Technology (BAUST), the pioneer technical institute of Armed Forces, started its journey on 15th February 2015. BAUST is a private university sponsored by Bangladesh Army Welfare Trust. Bangladesh Army established BAUST on 15 Feb 2015 at Saidpur Cantonment and it was inaugurated by Hon’ble Minister of Cultural Affairs of Bangladesh on the same date.',
            'image_path' => '/images/Brief history/Inugaration-7.jpg',
            'order' => 1
        ]);

        BriefHistory::create([
            'title' => 'Academic Departments',
            'content' => 'The intention to establish BAUST is to spread technical education to the remote places of the country. BAUST got approval to start its academic activities from Ministry of Education and UGC on 17 February 2015 and launched its academic session with four departments (CSE, EEE, ME, and A & S) on 15 Feb 2015 under 03 faculties. At present BAUST is functioning with 10 departments (CSE, EEE, ME, IPE, CE, ICT, Business Administration, English, AIS and A&S) under 05 faculties.',
            'image_path' => '/images/Brief history/DSC02932-800x533.jpg',
            'order' => 2
        ]);
        
        BriefHistory::create([
            'title' => 'Compliance',
            'content' => 'BAUST is in full compliance with the Private University Act 2010 and instructions issued by Army Welfare Trust, Ministry of Education and University Grants Commission of Bangladesh. We strive to maintain the highest quality of education while serving our nation.',
            'image_path' => '/images/Brief history/Inugaration-8-650x332.jpg',
            'order' => 3
        ]);
    }
}
