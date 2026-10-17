<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\BriefHistoryController;
use App\Models\Department;
use App\Models\DepartmentMember;
use App\Models\Notice;

Route::get('/', function () {
    $notices = Notice::active()
        ->whereHas('categories', function ($q) {
            $q->whereIn('slug', ['notice', 'admission-notice', 'exam-notice', 'job-notice', 'tender-notice', 'academic-council-meeting', 'syndicate-meeting']);
        })
        ->latest('published_at')
        ->take(10)
        ->get(['id', 'title', 'slug', 'excerpt', 'published_at', 'department'])
        ->map(function ($notice) {
            return [
                'id' => $notice->id,
                'title' => html_entity_decode(strip_tags($notice->title), ENT_QUOTES | ENT_HTML5, 'UTF-8'),
                'slug' => $notice->slug,
                'excerpt' => $notice->excerpt ? html_entity_decode(strip_tags($notice->excerpt), ENT_QUOTES | ENT_HTML5, 'UTF-8') : null,
                'department' => $notice->department,
                'published_at' => $notice->published_at ? $notice->published_at->toISOString() : null,
                'date_formatted' => $notice->published_at ? $notice->published_at->format('d/m/Y') : '',
            ];
        });

    $newsEvents = Notice::active()
        ->whereHas('categories', function ($q) {
            $q->whereIn('slug', ['news-events', 'upcoming-events', 'achievements', 'conference-workshops']);
        })
        ->whereIn('attachment_type', ['image', 'jpg', 'png'])
        ->whereNotNull('attachment')
        ->where('attachment', '!=', '')
        ->latest('published_at')
        ->take(4)
        ->get(['id', 'title', 'slug', 'excerpt', 'attachment', 'attachment_type', 'published_at', 'department'])
        ->map(function ($item) {
            return [
                'id' => $item->id,
                'title' => html_entity_decode(strip_tags($item->title), ENT_QUOTES | ENT_HTML5, 'UTF-8'),
                'slug' => $item->slug,
                'excerpt' => $item->excerpt ? html_entity_decode(strip_tags($item->excerpt), ENT_QUOTES | ENT_HTML5, 'UTF-8') : null,
                'attachment' => $item->attachment,
                'department' => $item->department,
                'published_at' => $item->published_at ? $item->published_at->toISOString() : null,
                'date_formatted' => $item->published_at ? $item->published_at->format('d M Y') : '',
            ];
        });

    // Hero stats: current faculty (active + on study leave, excluding ex-faculty) and departments.
    // Programs (MBA) are taught by department faculty, so they count as neither.
    $stats = [
        'faculty' => DepartmentMember::where('employment_type', 'faculty')
            ->where('status', '!=', 'ex_faculty')
            ->whereNotIn('department', Department::PROGRAM_SLUGS)
            ->count(),
        'departments' => Department::whereNotIn('slug', Department::PROGRAM_SLUGS)->count(),
    ];

    return Inertia::render('Home', [
        'notices' => $notices,
        'newsEvents' => $newsEvents,
        'stats' => $stats,
    ]);
})->name('home');

Route::get('/about/brief-history', [BriefHistoryController::class, 'index'])->name('about.brief-history');
Route::get('/about/message-from-vc', function () {
    return Inertia::render('About/MessageFromVc');
})->name('about.message-from-vc');

Route::get('/about/vision-mission-objectives', function () {
    return Inertia::render('About/VisionMissionObjectives');
})->name('about.vision-mission-objectives');

Route::get('/about/accreditation', function () {
    return Inertia::render('About/Accreditation');
})->name('about.accreditation');

Route::get('/about/message-from-chief-of-army-staff', function () {
    return Inertia::render('About/MessageFromArmyChief');
})->name('about.message-from-chief-of-army-staff');

Route::get('/administration/regulatory-bodies/board-of-trustees', function () {
    return Inertia::render('Administration/RegulatoryBodies/BoardOfTrustees');
})->name('administration.bot');

Route::get('/administration/regulatory-bodies/syndicate-members', function () {
    return Inertia::render('Administration/RegulatoryBodies/SyndicateMembers');
})->name('administration.syndicate');

Route::get('/administration/regulatory-bodies/academic-council', function () {
    return Inertia::render('Administration/RegulatoryBodies/AcademicCouncil');
})->name('administration.academic-council');

Route::get('/administration/regulatory-bodies/finance-committee', function () {
    return Inertia::render('Administration/RegulatoryBodies/FinanceCommittee');
})->name('administration.finance-committee');

Route::get('/administration/regulatory-bodies/discipline-committee', function () {
    return Inertia::render('Administration/RegulatoryBodies/DisciplineCommittee');
})->name('administration.discipline-committee');

foreach (array_keys(App\Models\OfficeMember::offices()) as $officeSlug) {
    Route::get('/administration/offices/'.$officeSlug, [App\Http\Controllers\OfficeController::class, 'show'])
        ->defaults('office', $officeSlug)
        ->name('administration.offices.'.$officeSlug);
}

// baust.edu.bd office URLs -> ours, so old links keep working after the switch-over.
foreach ([
    'vcs-office' => 'vc',
    'pro-vcs-office' => 'pro-vc',
    'office-of-the-treasurer' => 'treasurer',
    'office-of-the-registrar' => 'registrar',
    'dean-of-faculties' => 'deans-of-faculties',
    'asw-committee' => 'asw',
    'library-office' => 'librarian',
] as $legacy => $officeSlug) {
    Route::redirect('/administration/offices/'.$legacy, '/administration/offices/'.$officeSlug, 301);
}

// Faculty Dean's Offices (Direct routes matching Navbar and legacy academic aliases)
$facultySlugs = array_keys(array_filter(
    App\Models\OfficeMember::offices(),
    fn ($cfg) => isset($cfg['faculty_code'])
));
foreach ($facultySlugs as $facultySlug) {
    Route::get('/'.$facultySlug, [App\Http\Controllers\OfficeController::class, 'show'])
        ->defaults('office', $facultySlug)
        ->name('academic.'.$facultySlug);

    Route::redirect('/academic/'.$facultySlug.'-deans-office', '/'.$facultySlug);
    Route::redirect('/academic/'.$facultySlug.'-deans-office/', '/'.$facultySlug);
}

use App\Http\Controllers\CseDepartmentController;
use App\Http\Controllers\IctDepartmentController;
use App\Http\Controllers\EeeDepartmentController;
use App\Http\Controllers\MeDepartmentController;
use App\Http\Controllers\IpeDepartmentController;
use App\Http\Controllers\CeDepartmentController;

// CSE Department Pages
Route::prefix('cse')->group(function() {
    Route::get('/', [CseDepartmentController::class, 'index'])->name('academic.cse.index');
    Route::get('/about', [CseDepartmentController::class, 'about'])->name('academic.cse.about');
    Route::get('/vision-mission', [CseDepartmentController::class, 'visionMission'])->name('academic.cse.vision-mission');
    Route::get('/faculty', [CseDepartmentController::class, 'faculty'])->name('academic.cse.faculty');
    Route::get('/academic-staff', [CseDepartmentController::class, 'academicStaff'])->name('academic.cse.academic-staff');
    Route::get('/curriculum', [CseDepartmentController::class, 'curriculum'])->name('academic.cse.curriculum');
    Route::get('/alumni', [CseDepartmentController::class, 'alumni'])->name('academic.cse.alumni');
    Route::get('/events', [CseDepartmentController::class, 'events'])->name('academic.cse.events');
    Route::get('/events/{slug}', [CseDepartmentController::class, 'eventDetail'])->name('academic.cse.events.show');
    Route::get('/achievements', [CseDepartmentController::class, 'achievements'])->name('academic.cse.achievements');
    Route::get('/laboratories/{slug}', [CseDepartmentController::class, 'laboratory'])->name('academic.cse.laboratory');
    Route::redirect('/laboratories', '/cse/laboratories/programming-os');
    Route::redirect('/research/publications', '/research#publications');
    Route::redirect('/research/areas', '/research#projects');
    Route::get('/cse-society', [CseDepartmentController::class, 'society'])->name('academic.cse.society');
});

// ICT Department Pages
Route::prefix('ict')->group(function() {
    Route::get('/', [IctDepartmentController::class, 'index'])->name('academic.ict.index');
    Route::get('/about', [IctDepartmentController::class, 'about'])->name('academic.ict.about');
    Route::get('/vision-mission', [IctDepartmentController::class, 'visionMission'])->name('academic.ict.vision-mission');
    Route::get('/faculty', [IctDepartmentController::class, 'faculty'])->name('academic.ict.faculty');
    Route::get('/academic-staff', [IctDepartmentController::class, 'academicStaff'])->name('academic.ict.academic-staff');
    Route::get('/curriculum', [IctDepartmentController::class, 'curriculum'])->name('academic.ict.curriculum');
    Route::get('/alumni', [IctDepartmentController::class, 'alumni'])->name('academic.ict.alumni');
    Route::get('/events', [IctDepartmentController::class, 'events'])->name('academic.ict.events');
    Route::get('/events/{slug}', [IctDepartmentController::class, 'eventDetail'])->name('academic.ict.events.show');
    Route::get('/achievements', [IctDepartmentController::class, 'achievements'])->name('academic.ict.achievements');
    Route::get('/laboratories/{slug?}', [IctDepartmentController::class, 'laboratories'])->name('academic.ict.laboratories');
    Route::get('/research', [IctDepartmentController::class, 'research'])->name('academic.ict.research');
    Route::get('/ict-society', [IctDepartmentController::class, 'society'])->name('academic.ict.society');
});

// EEE Department Pages
Route::prefix('eee')->group(function() {
    Route::get('/', [EeeDepartmentController::class, 'index'])->name('academic.eee.index');
    Route::get('/about', [EeeDepartmentController::class, 'about'])->name('academic.eee.about');
    Route::get('/vision-mission', [EeeDepartmentController::class, 'visionMission'])->name('academic.eee.vision-mission');
    Route::get('/faculty', [EeeDepartmentController::class, 'faculty'])->name('academic.eee.faculty');
    Route::get('/academic-staff', [EeeDepartmentController::class, 'academicStaff'])->name('academic.eee.academic-staff');
    Route::get('/curriculum', [EeeDepartmentController::class, 'curriculum'])->name('academic.eee.curriculum');
    Route::get('/alumni', [EeeDepartmentController::class, 'alumni'])->name('academic.eee.alumni');
    Route::get('/events', [EeeDepartmentController::class, 'events'])->name('academic.eee.events');
    Route::get('/events/{slug}', [EeeDepartmentController::class, 'eventDetail'])->name('academic.eee.events.show');
    Route::get('/achievements', [EeeDepartmentController::class, 'achievements'])->name('academic.eee.achievements');
    Route::get('/laboratories/{slug?}', [EeeDepartmentController::class, 'laboratory'])->name('academic.eee.laboratories');
    Route::get('/eee-society', [EeeDepartmentController::class, 'society'])->name('academic.eee.society');
});

// ME Department Pages
Route::prefix('me')->group(function() {
    Route::get('/', [MeDepartmentController::class, 'index'])->name('academic.me.index');
    Route::get('/about', [MeDepartmentController::class, 'about'])->name('academic.me.about');
    Route::get('/vision-mission', [MeDepartmentController::class, 'visionMission'])->name('academic.me.vision-mission');
    Route::get('/faculty', [MeDepartmentController::class, 'faculty'])->name('academic.me.faculty');
    Route::get('/academic-staff', [MeDepartmentController::class, 'academicStaff'])->name('academic.me.academic-staff');
    Route::get('/curriculum', [MeDepartmentController::class, 'curriculum'])->name('academic.me.curriculum');
    Route::get('/alumni', [MeDepartmentController::class, 'alumni'])->name('academic.me.alumni');
    Route::get('/events', [MeDepartmentController::class, 'events'])->name('academic.me.events');
    Route::get('/events/{slug}', [MeDepartmentController::class, 'eventDetail'])->name('academic.me.events.show');
    Route::get('/achievements', [MeDepartmentController::class, 'achievements'])->name('academic.me.achievements');
    Route::get('/laboratories/{slug?}', [MeDepartmentController::class, 'laboratory'])->name('academic.me.laboratories');
    Route::get('/me-society', [MeDepartmentController::class, 'society'])->name('academic.me.society');
    Route::get('/online-resources', [MeDepartmentController::class, 'onlineResources'])->name('academic.me.online-resources');
    Route::get('/online-education', fn() => redirect('/me/online-resources'));
});

// IPE Department Pages
Route::prefix('ipe')->group(function() {
    Route::get('/', [IpeDepartmentController::class, 'index'])->name('academic.ipe.index');
    Route::get('/about', [IpeDepartmentController::class, 'about'])->name('academic.ipe.about');
    Route::get('/vision-mission', [IpeDepartmentController::class, 'visionMission'])->name('academic.ipe.vision-mission');
    Route::get('/faculty', [IpeDepartmentController::class, 'faculty'])->name('academic.ipe.faculty');
    Route::get('/academic-staff', [IpeDepartmentController::class, 'academicStaff'])->name('academic.ipe.academic-staff');
    Route::get('/curriculum', [IpeDepartmentController::class, 'curriculum'])->name('academic.ipe.curriculum');
    Route::get('/alumni', [IpeDepartmentController::class, 'alumni'])->name('academic.ipe.alumni');
    Route::get('/events', [IpeDepartmentController::class, 'events'])->name('academic.ipe.events');
    Route::get('/events/{slug}', [IpeDepartmentController::class, 'eventDetail'])->name('academic.ipe.events.show');
    Route::get('/achievements', [IpeDepartmentController::class, 'achievements'])->name('academic.ipe.achievements');
    Route::get('/laboratories/{slug?}', [IpeDepartmentController::class, 'laboratory'])->name('academic.ipe.laboratories');
    Route::get('/ipe-society', [IpeDepartmentController::class, 'society'])->name('academic.ipe.society');
    Route::get('/online-resources', [IpeDepartmentController::class, 'onlineResources'])->name('academic.ipe.online-resources');
    Route::get('/online-education', fn() => redirect('/ipe/online-resources'));
});

// CE Department Pages
Route::prefix('ce')->group(function() {
    Route::get('/', [CeDepartmentController::class, 'index'])->name('academic.ce.index');
    Route::get('/about', [CeDepartmentController::class, 'about'])->name('academic.ce.about');
    Route::get('/vision-mission', [CeDepartmentController::class, 'visionMission'])->name('academic.ce.vision-mission');
    Route::get('/faculty', [CeDepartmentController::class, 'faculty'])->name('academic.ce.faculty');
    Route::get('/academic-staff', [CeDepartmentController::class, 'academicStaff'])->name('academic.ce.academic-staff');
    Route::get('/curriculum', [CeDepartmentController::class, 'curriculum'])->name('academic.ce.curriculum');
    
    // Research
    Route::get('/research', fn() => redirect('/ce/research/publications'));
    Route::get('/research/publications', [CeDepartmentController::class, 'publications'])->name('academic.ce.research.publications');
    Route::get('/research/thesis-projects', [CeDepartmentController::class, 'thesisProjects'])->name('academic.ce.research.theses');

    // Alumni
    Route::get('/alumni', [CeDepartmentController::class, 'alumniAssoc'])->name('academic.ce.alumni');
    Route::get('/alumni/information', [CeDepartmentController::class, 'alumniInfo'])->name('academic.ce.alumni.information');
    Route::get('/alumni/association', [CeDepartmentController::class, 'alumniAssoc'])->name('academic.ce.alumni.association');

    // Student Voice
    Route::get('/student-voice', [CeDepartmentController::class, 'studentVoice'])->name('academic.ce.student-voice');
    Route::get('/online-education', fn() => redirect('/ce/student-voice'));

    // Gallery
    Route::get('/gallery', fn() => redirect('/ce/gallery/photos'));
    Route::get('/gallery/photos', [CeDepartmentController::class, 'galleryPhotos'])->name('academic.ce.gallery.photos');
    Route::get('/gallery/videos', [CeDepartmentController::class, 'galleryVideos'])->name('academic.ce.gallery.videos');

    Route::get('/events', [CeDepartmentController::class, 'events'])->name('academic.ce.events');
    Route::get('/events/{slug}', [CeDepartmentController::class, 'eventDetail'])->name('academic.ce.events.show');
    Route::get('/achievements', [CeDepartmentController::class, 'achievements'])->name('academic.ce.achievements');
    Route::get('/laboratories/{slug?}', [CeDepartmentController::class, 'laboratories'])->name('academic.ce.laboratories');
    Route::get('/clubs/{club?}', [CeDepartmentController::class, 'clubs'])->name('academic.ce.clubs');
    Route::get('/ce-society', [CeDepartmentController::class, 'society'])->name('academic.ce.society');
    Route::get('/online-resources', [CeDepartmentController::class, 'onlineResources'])->name('academic.ce.online-resources');
});

// Facilities Pages
Route::get('/facilities', function () {
    return Inertia::render('Facilities/Index');
})->name('facilities.index');

Route::get('/facilities/library', function () {
    return Inertia::render('Facilities/Library');
})->name('facilities.library');
Route::redirect('/library', '/facilities/library');

// Legacy baust.edu.bd sub-paths -> merged Facilities page sections
foreach ([
    'wifi-campus' => 'wifi',
    'multimedia-classroom' => 'multimedia',
    'modern-laboratories' => 'laboratories',
    'residential-facilities-male-female' => 'residential',
    'cafeteria' => 'cafeteria',
    'counseling' => 'counseling',
] as $path => $anchor) {
    Route::redirect('/facilities/'.$path, '/facilities#'.$anchor);
}
Route::redirect('/counseling', '/facilities#counseling');

// Counseling & Mental Health Booking (AES-256 encrypted at rest)
Route::post('/facilities/counseling/book', [App\Http\Controllers\CounselingBookingController::class, 'store'])
    ->middleware('throttle:20,1')
    ->name('facilities.counseling.book');

// Admission Pages
Route::redirect('/apply-now', 'https://admission.baust.edu.bd/apply');
Route::redirect('/apply', 'https://admission.baust.edu.bd/apply');
Route::redirect('/apply-online', 'https://admission.baust.edu.bd/apply');
Route::redirect('/admission/apply-online', 'https://admission.baust.edu.bd/apply');

Route::get('/admission/apply-online-instruction', function () {
    return Inertia::render('Admission/ApplyOnlineInstruction');
})->name('admission.apply-online-instruction');

Route::get('/admission/program-offering', function () {
    return Inertia::render('Admission/OfferedPrograms');
})->name('admission.program-offering');

Route::get('/admission/admission-requirment', function () {
    return Inertia::render('Admission/AdmissionRequirements');
})->name('admission.admission-requirement');

Route::get('/admission/admission-procedure', function () {
    return Inertia::render('Admission/AdmissionProcedure');
})->name('admission.admission-procedure');

Route::get('/admission/tuition-fees', function () {
    return Inertia::render('Admission/TuitionFees');
})->name('admission.tuition-fees');

Route::get('/admission/waiver-and-financial-aid', function () {
    return Inertia::render('Admission/WaiverAndFinancialAid');
})->name('admission.waiver-and-financial-aid');

Route::get('/admission/tuition-fee-payment-procedure', function () {
    return Inertia::render('Admission/PaymentProcedure');
})->name('admission.payment-procedure');

Route::get('/admission/dress-code', function () {
    return Inertia::render('Admission/DressCode');
})->name('admission.dress-code');

Route::get('/admission/credit-transfer-policy', function () {
    return Inertia::render('Admission/CreditTransferPolicy');
})->name('admission.credit-transfer-policy');

Route::get('/admission/cancel-policy', function () {
    return Inertia::render('Admission/CancelPolicy');
})->name('admission.cancel-policy');
Route::redirect('/admission-cancel-policy', '/admission/cancel-policy');

Route::get('/admission/academic-calendar', function () {
    return Inertia::render('Admission/AcademicCalendar');
})->name('admission.academic-calendar');
Route::get('/about/academic-calendar', function () {
    return Inertia::render('Admission/AcademicCalendar');
})->name('about.academic-calendar');

// Legacy /dress-code -> canonical admission path
Route::redirect('/dress-code', '/admission/dress-code');

// Research & Publication (single merged page)
Route::get('/research', function () {
    return Inertia::render('Research/Index');
})->name('research.index');
Route::redirect('/research/publications', '/research#publications');
Route::redirect('/research/projects', '/research#projects');
Route::redirect('/administration/offices/journal-office', '/research#cell');

// Non-engineering departments (Business Administration, Accounting & IS, English,
// Arts & Sciences) and the MBA program - DB-driven, rendered with the same layout as CSE
foreach (['dba', 'ais', 'eng', 'as', 'mba'] as $deptSlug) {
    Route::prefix($deptSlug)->name('academic.'.$deptSlug.'.')->group(function () use ($deptSlug) {
        Route::get('/', [App\Http\Controllers\DepartmentController::class, 'show'])->defaults('dept', $deptSlug)->name('index');
        Route::get('/about', [App\Http\Controllers\DepartmentController::class, 'about'])->defaults('dept', $deptSlug)->name('about');
        Route::get('/vision-mission', [App\Http\Controllers\DepartmentController::class, 'visionMission'])->defaults('dept', $deptSlug)->name('vision-mission');
        Route::get('/faculty', [App\Http\Controllers\DepartmentController::class, 'faculty'])->defaults('dept', $deptSlug)->name('faculty');
        Route::get('/academic-staff', [App\Http\Controllers\DepartmentController::class, 'academicStaff'])->defaults('dept', $deptSlug)->name('academic-staff');
        Route::get('/curriculum', [App\Http\Controllers\DepartmentController::class, 'curriculum'])->defaults('dept', $deptSlug)->name('curriculum');
        Route::get('/facilities', [App\Http\Controllers\DepartmentController::class, 'facilities'])->defaults('dept', $deptSlug)->name('facilities');
        Route::get('/facilities/{facilitySlug}', [App\Http\Controllers\DepartmentController::class, 'facilitiesDetail'])->defaults('dept', $deptSlug)->name('facilities.show');
        Route::redirect('/laboratories', "/{$deptSlug}/facilities");
        Route::get('/events', [App\Http\Controllers\DepartmentController::class, 'events'])->defaults('dept', $deptSlug)->name('events');
        Route::get('/events/{eventSlug}', [App\Http\Controllers\DepartmentController::class, 'eventDetail'])->defaults('dept', $deptSlug)->name('events.show');
        Route::get('/research/publications', [App\Http\Controllers\DepartmentController::class, 'researchPublications'])->defaults('dept', $deptSlug)->name('research.publications');
        Route::get('/research/projects', [App\Http\Controllers\DepartmentController::class, 'researchProjects'])->defaults('dept', $deptSlug)->name('research.projects');
        Route::get('/achievements', [App\Http\Controllers\DepartmentController::class, 'achievements'])->defaults('dept', $deptSlug)->name('achievements');
        Route::get('/online-resources', [App\Http\Controllers\DepartmentController::class, 'onlineResources'])->defaults('dept', $deptSlug)->name('online-resources');
        Route::get('/clubs', [App\Http\Controllers\DepartmentController::class, 'clubs'])->defaults('dept', $deptSlug)->name('clubs');
        Route::get('/alumni', [App\Http\Controllers\DepartmentController::class, 'alumni'])->defaults('dept', $deptSlug)->name('alumni');
    });
}

// IQAC - Institutional Quality Assurance Cell
Route::get('/iqac', [App\Http\Controllers\IqacController::class, 'index'])->name('iqac');

// Public Relations - News & Events with newspaper coverage, curated by the PRO
Route::get('/public-relations', [App\Http\Controllers\PublicRelationController::class, 'index'])->name('public-relations');

use App\Http\Controllers\NoticeController;

// Archive / Notice Pages
Route::get('/archive/notices', [NoticeController::class, 'index'])->name('archive.notices');
Route::get('/archive/notices/{slug}', [NoticeController::class, 'show'])->name('archive.notices.show');

// University Photo Gallery Page
Route::get('/gallery', function () {
    $dbGalleries = \App\Models\DepartmentGallery::where('is_active', true)
        ->where('type', 'photo')
        ->with('department:id,name,short_name')
        ->orderBy('order')
        ->get();

    return Inertia::render('Gallery/Index', [
        'dbGalleries' => $dbGalleries,
    ]);
})->name('gallery');

Route::redirect('/photo-gallery', '/gallery');
Route::redirect('/category/home-university-highlights', '/gallery');

// Category Legacy Redirects
Route::redirect('/category/notice', '/archive/notices');
Route::redirect('/category/news-events', '/archive/notices?category=news-events');
Route::redirect('/category/admission-notice', '/archive/notices?category=admission-notice');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        if (\Illuminate\Support\Facades\Auth::user()?->isPsychologist()) {
            return redirect()->route('admin.counseling.index');
        }
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('admin')->name('admin.')->group(function () {
        // Confidential Psychological Counseling Sessions (strictly restricted to psychologist@baust.edu.bd)
        Route::get('counseling-sessions', [App\Http\Controllers\Admin\CounselingSessionAdminController::class, 'index'])->name('counseling.index');
        Route::patch('counseling-sessions/{session}', [App\Http\Controllers\Admin\CounselingSessionAdminController::class, 'updateStatus'])->name('counseling.update');
        Route::delete('counseling-sessions/{session}', [App\Http\Controllers\Admin\CounselingSessionAdminController::class, 'destroy'])->name('counseling.destroy');
        Route::get('counseling-sessions/{id}/privacy-audit', [App\Http\Controllers\Admin\CounselingSessionAdminController::class, 'privacyAudit'])->name('counseling.audit');

        Route::match(['post', 'put', 'patch'], 'members/reorder', [App\Http\Controllers\Admin\DepartmentMemberController::class, 'reorder'])->name('members.reorder');
        Route::get('members/reorder', function () {
            return redirect()->route('admin.members.index');
        });
        Route::match(['post', 'put', 'patch'], 'members/{member}', [App\Http\Controllers\Admin\DepartmentMemberController::class, 'update'])->name('members.update');
        Route::resource('members', App\Http\Controllers\Admin\DepartmentMemberController::class)->except(['update']);
        Route::resource('notices', App\Http\Controllers\Admin\NoticeController::class);
        Route::get('notices-archive-register', [App\Http\Controllers\Admin\NoticeController::class, 'archiveRegister'])->name('notices.archive-register');

        // Media Coverage Requisitions (dept/office/IQAC admins submit; PRO/super_admin triage)
        Route::post('media-requests/{mediaRequest}/receive', [App\Http\Controllers\Admin\MediaCoverageRequestController::class, 'receive'])->name('media-requests.receive');
        Route::resource('media-requests', App\Http\Controllers\Admin\MediaCoverageRequestController::class)->except(['show']);

        // IQAC page content manager (super_admin or iqac_admin)
        Route::prefix('iqac')->name('iqac.')->middleware('can:manage-iqac')->group(function () {
            Route::get('/', [App\Http\Controllers\Admin\IqacController::class, 'manage'])->name('manage');
            Route::post('settings', [App\Http\Controllers\Admin\IqacController::class, 'updateSettings'])->name('settings');
            Route::post('collection/{type}', [App\Http\Controllers\Admin\IqacController::class, 'storeItem'])->name('items.store');
            Route::post('collection/{type}/{id}', [App\Http\Controllers\Admin\IqacController::class, 'updateItem'])->name('items.update');
            Route::delete('collection/{type}/{id}', [App\Http\Controllers\Admin\IqacController::class, 'destroyItem'])->name('items.destroy');
        });

        // Department content manager (super_admin / dept_admin)
        Route::prefix('departments')->name('departments.')->middleware('can:manage-departments')->group(function () {
            Route::get('/', [App\Http\Controllers\Admin\DepartmentController::class, 'index'])->name('index');
            Route::get('{slug}', [App\Http\Controllers\Admin\DepartmentController::class, 'manage'])->name('manage');
            Route::post('{slug}/profile', [App\Http\Controllers\Admin\DepartmentController::class, 'updateProfile'])->name('profile');
            Route::post('{slug}/collection/{type}', [App\Http\Controllers\Admin\DepartmentController::class, 'storeItem'])->name('items.store');
            Route::post('{slug}/collection/{type}/{id}', [App\Http\Controllers\Admin\DepartmentController::class, 'updateItem'])->name('items.update');
            Route::delete('{slug}/collection/{type}/{id}', [App\Http\Controllers\Admin\DepartmentController::class, 'destroyItem'])->name('items.destroy');
        });

        // Administrative offices (Office of the Registrar, ...)
        Route::prefix('offices')->name('offices.')->middleware('can:manage-departments')->group(function () {
            Route::get('/', [App\Http\Controllers\Admin\OfficeController::class, 'index'])->name('index');
            Route::get('{office}', [App\Http\Controllers\Admin\OfficeController::class, 'manage'])->name('manage');
            Route::post('{office}/members', [App\Http\Controllers\Admin\OfficeController::class, 'storeItem'])->name('members.store');
            Route::post('{office}/members/{id}', [App\Http\Controllers\Admin\OfficeController::class, 'updateItem'])->name('members.update');
            Route::delete('{office}/members/{id}', [App\Http\Controllers\Admin\OfficeController::class, 'destroyItem'])->name('members.destroy');
        });

        // Faculty Dean's Offices (super_admin only: create/edit/delete faculties and their page content)
        Route::resource('faculties', App\Http\Controllers\Admin\FacultyController::class)
            ->except(['show'])
            ->middleware('can:manage-faculties');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

// Old baust.edu.bd (WordPress) links -> their pages here; 404 if nothing matches.
Route::fallback(App\Http\Controllers\LegacyRedirectController::class);
