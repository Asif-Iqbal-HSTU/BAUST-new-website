<?php

/*
|--------------------------------------------------------------------------
| Search metadata overrides (read by App\Support\Seo)
|--------------------------------------------------------------------------
|
| 'pages'      Hand-written <title> (keep under ~60 characters) and meta
|              description (under ~155) for key pages, by path. They replace
|              the generated ones in the server HTML and in the browser tab.
|
| 'canonical'  Pages reachable at two paths: path => the canonical path. The
|              alias gets rel=canonical to the main path and is left out of
|              the sitemap.
|
*/

return [

    'pages' => [
        '/' => [
            'title' => 'BAUST | Bangladesh Army University of Science & Technology',
            'description' => 'Bangladesh Army University of Science and Technology (BAUST), Saidpur Cantonment: engineering, business and English degrees, admission and notices.',
        ],
        '/admission/tuition-fees' => [
            'title' => 'BAUST Tuition Fees 2026 | Program-wise Semester Costs',
            'description' => 'Program-wise tuition and semester fees at BAUST Saidpur: cost at admission, per-semester totals, other fees, payment mode, waivers and scholarships.',
        ],
        '/admission/admission-requirements' => [
            'title' => 'BAUST Admission Requirements | Eligibility & Documents',
            'description' => 'Who can apply to BAUST: minimum GPA and subject requirements for each program, documents and ID papers to bring, and medical tests needed at admission.',
        ],
        '/admission/program-offering' => [
            'title' => 'Programs Offered at BAUST | Undergraduate & Graduate',
            'description' => 'Degrees at BAUST Saidpur: B.Sc. Engineering in CSE, EEE, ME, IPE, CE and ICT, BBA, BBA in AIS, B.A. (Hons) in English, MBA, EMBA and MA in English (ELT).',
        ],
        '/eng' => [
            'title' => 'Department of English, BAUST | B.A. (Hons) & MA in ELT',
            'description' => 'BAUST Department of English, Saidpur: B.A. (Hons) in English and MA in English (ELT), covering literature, linguistics and English language teaching.',
        ],
        '/cse/faculty' => [
            'title' => 'CSE Faculty Members | Computer Science & Engineering, BAUST',
            'description' => 'Meet the faculty of the Department of Computer Science and Engineering at BAUST, Saidpur: names, designations and the profile of every teacher.',
        ],
    ],

    'canonical' => [
        '/about/academic-calendar' => '/admission/academic-calendar',
    ],

];
