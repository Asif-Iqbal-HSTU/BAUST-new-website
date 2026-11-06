<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\DepartmentMember;
use App\Models\Faculty;
use App\Models\MediaCoverageRequest;
use App\Models\Notice;
use App\Models\OfficeMember;
use App\Models\SitePage;
use App\Models\UpdateRequest;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

/**
 * The admin home page: what this account manages, key numbers, shortcuts,
 * content that needs attention and recent changes, depending on the role.
 */
class DashboardController extends Controller
{
    private const ROLE_LABELS = [
        'super_admin' => 'Super Admin',
        'dept_admin' => 'Department Focal Point',
        'pro' => 'Public Relations Officer',
        'iqac_admin' => 'IQAC Admin',
        'administration_admin' => 'Administration Admin',
        'library_admin' => 'Library Admin',
        'research_admin' => 'Research Admin',
        'admission_admin' => 'Admission Admin',
        'treasurer_admin' => 'Treasurer Office Admin',
    ];

    public function __invoke()
    {
        $user = auth()->user();
        if ($user->isPsychologist()) {
            return redirect()->route('admin.counseling.index');
        }

        $data = match (true) {
            $user->isSuperAdmin() => $this->superAdmin(),
            $user->isDeptAdmin() => $this->deptAdmin($user),
            $user->isPro() => $this->pro(),
            $user->isSectionAdmin() => $this->sectionAdmin($user),
            $user->isPageAdmin() => $this->pageAdmin($user),
            $user->canManageIqac() => $this->iqac(),
            default => ['scope' => null, 'stats' => [], 'actions' => [], 'attention' => [], 'recent' => null],
        };

        $data = $this->withUpdateRequests($user, $data);

        return Inertia::render('dashboard', $data + [
            'roleLabel' => self::ROLE_LABELS[$user->role] ?? ucfirst(str_replace('_', ' ', (string) $user->role)),
            'usesDefaultPassword' => Hash::check('password', $user->password),
        ]);
    }

    private function superAdmin(): array
    {
        // bcrypt checks are slow on purpose: cache until any password changes.
        $users = User::orderBy('id')->get(['id', 'email', 'role', 'password']);
        $defaultPasswordAccounts = collect(Cache::remember(
            'dashboard.default-password-accounts.'.md5($users->pluck('password')->implode('|')),
            now()->addDay(),
            fn () => $users->filter(fn (User $u) => Hash::check('password', $u->password))
                ->map(fn (User $u) => ['email' => $u->email, 'role' => self::ROLE_LABELS[$u->role] ?? $u->role])
                ->values()->all()
        ));
        $orphanAdmins = User::where('role', 'dept_admin')->whereNull('department')->count();

        $attention = [];
        if ($defaultPasswordAccounts->isNotEmpty()) {
            $attention[] = ['level' => 'danger', 'text' => "{$defaultPasswordAccounts->count()} accounts still use the default password \"password\" (listed below).", 'href' => null];
        }
        if ($orphanAdmins > 0) {
            $attention[] = ['level' => 'warning', 'text' => "{$orphanAdmins} focal-point accounts have no department and can do nothing (e.g. old self-registrations). Consider deleting them.", 'href' => null];
        }
        if (($pending = MediaCoverageRequest::where('status', 'pending')->count()) > 0) {
            $attention[] = ['level' => 'warning', 'text' => "{$pending} media coverage requests are waiting to be received.", 'href' => '/admin/media-requests?status=pending'];
        }

        return [
            'scope' => 'The whole website: every department, faculty, office, section page and account.',
            'stats' => [
                ['label' => 'Departments & programs', 'value' => Department::count(), 'href' => '/admin/departments'],
                ['label' => 'Faculty & staff profiles', 'value' => DepartmentMember::count(), 'href' => '/admin/members'],
                ['label' => 'Notices this month', 'value' => Notice::where('published_at', '>=', now()->startOfMonth())->count(), 'href' => '/admin/notices'],
                ['label' => 'Admin accounts', 'value' => User::count(), 'href' => null],
            ],
            'actions' => [
                ['label' => 'Departments', 'description' => 'Edit any department or program site', 'href' => '/admin/departments'],
                ['label' => 'Website pages', 'description' => 'Administration, Library, Research and Admission pages', 'href' => '/admin/site-pages'],
                ['label' => "Dean's offices", 'description' => 'Faculties and their Dean\'s pages', 'href' => '/admin/faculties'],
                ['label' => 'Offices', 'description' => 'University office staff lists', 'href' => '/admin/offices'],
                ['label' => 'Add a notice', 'description' => 'Publish a notice or news item', 'href' => '/admin/notices/create'],
            ],
            'attention' => $attention,
            'recent' => $this->recentNotices(Notice::query(), 'Latest notices'),
            'defaultPasswordAccounts' => $defaultPasswordAccounts,
        ];
    }

    private function deptAdmin(User $user): array
    {
        $dept = Department::where('slug', $user->department)->first();
        $manageable = $user->manageableDepartmentSlugs();
        $faculty = $user->managedFaculty();
        $members = DepartmentMember::where('department', $user->department);

        $attention = [];
        if ($dept) {
            if (blank($dept->hod_photo) && ! DepartmentMember::where('department', $dept->slug)->where('is_head', true)->whereNotNull('photo')->exists()) {
                $attention[] = ['level' => 'warning', 'text' => 'The Head of Department has no photo.', 'href' => "/admin/departments/{$dept->slug}"];
            }
            foreach (['about' => 'About text', 'vision' => 'Vision', 'mission' => 'Mission', 'hod_message' => "Head's message"] as $field => $label) {
                if (blank($dept->{$field})) {
                    $attention[] = ['level' => 'info', 'text' => "{$label} is empty on the department profile.", 'href' => "/admin/departments/{$dept->slug}"];
                }
            }
            if (($n = (clone $members)->where('status', 'active')->where(fn ($q) => $q->whereNull('photo')->orWhere('photo', ''))->count()) > 0) {
                $attention[] = ['level' => 'warning', 'text' => "{$n} active members have no photo.", 'href' => '/admin/members'];
            }
            if (($n = $dept->curricula()->where('is_active', true)->where(fn ($q) => $q->whereNull('file')->orWhere('file', ''))->count()) > 0) {
                $attention[] = ['level' => 'warning', 'text' => "{$n} curricula have no syllabus PDF to download.", 'href' => "/admin/departments/{$dept->slug}"];
            }
            if (($n = $dept->laboratories()->where('is_active', true)->where(fn ($q) => $q->whereNull('images')->orWhere('images', '[]'))->count()) > 0) {
                $attention[] = ['level' => 'info', 'text' => "{$n} laboratories have no photos.", 'href' => "/admin/departments/{$dept->slug}"];
            }
            if (! Notice::where('department', $dept->slug)->where('published_at', '>=', now()->subMonths(3))->exists()) {
                $attention[] = ['level' => 'info', 'text' => 'No department notice or event in the last 3 months.', 'href' => '/admin/notices/create'];
            }
        }

        $actions = [
            ['label' => 'Department page', 'description' => 'Profile, slider, curricula, labs, achievements and more', 'href' => "/admin/departments/{$user->department}"],
            ['label' => 'Faculty & staff', 'description' => 'Add, edit and reorder members', 'href' => '/admin/members'],
            ['label' => 'Add a notice or event', 'description' => 'Shown on your department pages', 'href' => '/admin/notices/create'],
            ['label' => 'View your website', 'description' => "/{$user->department}", 'href' => "/{$user->department}", 'external' => true],
        ];
        foreach (array_diff($manageable, [$user->department]) as $program) {
            $actions[] = ['label' => strtoupper($program).' program page', 'description' => 'Run by your faculty', 'href' => "/admin/departments/{$program}"];
        }
        if ($faculty) {
            $actions[] = ['label' => "{$faculty->code} Dean's page", 'description' => 'Shared with the other departments of your faculty', 'href' => "/admin/faculties/{$faculty->id}/edit"];
            $actions[] = ['label' => "{$faculty->code} Dean's office staff", 'description' => 'Dean, coordinators and staff', 'href' => "/admin/offices/{$faculty->slug}"];
        }

        return [
            'scope' => trim(($dept?->name ?? strtoupper((string) $user->department))
                .(count($manageable) > 1 ? ', plus the '.implode(' and ', array_map('strtoupper', array_diff($manageable, [$user->department]))).' program' : '')
                .($faculty ? " and the {$faculty->code} Dean's page" : '')),
            'stats' => [
                ['label' => 'Faculty members', 'value' => (clone $members)->facultyVisible()->where('status', 'active')->count(), 'href' => '/admin/members'],
                ['label' => 'Academic staff', 'value' => (clone $members)->staffVisible()->where('status', 'active')->count(), 'href' => '/admin/members'],
                ['label' => 'Laboratories', 'value' => $dept?->laboratories()->where('is_active', true)->count() ?? 0, 'href' => "/admin/departments/{$user->department}"],
                ['label' => 'Notices this year', 'value' => Notice::whereIn('department', $manageable)->where('published_at', '>=', now()->startOfYear())->count(), 'href' => '/admin/notices'],
            ],
            'actions' => $actions,
            'attention' => $attention,
            'recent' => $this->recentNotices(Notice::whereIn('department', $manageable), 'Your latest notices & events'),
        ];
    }

    private function pro(): array
    {
        $pending = MediaCoverageRequest::where('status', 'pending')->count();

        return [
            'scope' => 'University news, events and notices, and media coverage requests from departments and offices.',
            'stats' => [
                ['label' => 'Pending media requests', 'value' => $pending, 'href' => '/admin/media-requests?status=pending'],
                ['label' => 'In progress', 'value' => MediaCoverageRequest::whereIn('status', ['received', 'in_progress'])->count(), 'href' => '/admin/media-requests'],
                ['label' => 'Notices this month', 'value' => Notice::where('published_at', '>=', now()->startOfMonth())->count(), 'href' => '/admin/notices'],
            ],
            'actions' => [
                ['label' => 'Media requests inbox', 'description' => 'Receive and track coverage requests', 'href' => '/admin/media-requests'],
                ['label' => 'Add news or a notice', 'description' => 'University-wide or for a department', 'href' => '/admin/notices/create'],
                ['label' => 'Press archive register', 'description' => 'Press releases and clippings', 'href' => '/admin/notices-archive-register'],
            ],
            'attention' => $pending > 0 ? [['level' => 'warning', 'text' => "{$pending} media coverage requests are waiting to be received.", 'href' => '/admin/media-requests?status=pending']] : [],
            'recent' => $this->recentNotices(Notice::query(), 'Latest notices'),
        ];
    }

    private function sectionAdmin(User $user): array
    {
        $sections = $user->managedSections();
        $section = $sections[0];
        $label = SitePage::SECTIONS[$section]['label'];
        SitePage::seedMissingFromDefaults();
        $pages = SitePage::whereIn('section', $sections)->orderByDesc('updated_at')->get(['key', 'title', 'updated_at', 'updated_by', 'created_at']);
        $edited = $pages->filter(fn ($p) => $p->updated_by !== null);

        $offices = $section === 'administration'
            ? array_keys(array_filter(OfficeMember::offices(), fn ($cfg, $slug) => ! Faculty::where('slug', $slug)->exists(), ARRAY_FILTER_USE_BOTH))
            : (SitePage::SECTION_OFFICES[$section] ?? []);
        $catalog = OfficeMember::offices();

        $stats = [
            ['label' => "{$label} pages", 'value' => $pages->count(), 'href' => '/admin/site-pages'],
            ['label' => 'Pages edited so far', 'value' => $edited->count(), 'href' => '/admin/site-pages'],
        ];
        if ($offices) {
            $stats[] = ['label' => 'Office staff listed', 'value' => OfficeMember::whereIn('office', $offices)->count(), 'href' => count($offices) > 1 ? '/admin/offices' : "/admin/offices/{$offices[0]}"];
        }
        if ($user->isAdmissionAdmin()) {
            $stats[] = ['label' => 'Admission notices this year', 'value' => Notice::whereNull('department')->inCategory('admission-notice')->where('published_at', '>=', now()->startOfYear())->count(), 'href' => '/admin/notices'];
        }

        $actions = [['label' => 'Website pages', 'description' => "Edit the pages under the {$label} menu", 'href' => '/admin/site-pages']];
        foreach ($pages->sortBy('title')->take(6) as $page) {
            $actions[] = ['label' => $page->title, 'description' => 'Edit this page', 'href' => "/admin/site-pages/{$page->key}"];
        }
        foreach (count($offices) > 1 ? [] : $offices as $office) {
            $actions[] = ['label' => ($catalog[$office]['name'] ?? $office).' staff', 'description' => 'Add, edit and reorder staff', 'href' => "/admin/offices/{$office}"];
        }
        if (count($offices) > 1) {
            $actions[] = ['label' => 'University offices', 'description' => 'Staff lists of '.count($offices).' offices', 'href' => '/admin/offices'];
        }
        if ($user->isAdmissionAdmin()) {
            $actions[] = ['label' => 'Add an admission notice', 'description' => 'Published under Admission Notice', 'href' => '/admin/notices/create'];
        }

        $attention = [];
        foreach ($offices as $office) {
            if (! OfficeMember::where('office', $office)->exists()) {
                $attention[] = ['level' => 'info', 'text' => ($catalog[$office]['name'] ?? $office).' has no staff listed yet.', 'href' => "/admin/offices/{$office}"];
            }
        }

        $urls = \App\Http\Controllers\Admin\SitePageController::publicUrls();

        return [
            'scope' => "Every page under the {$label} menu".($offices ? ' and '.(count($offices) > 1 ? 'the university offices\' staff lists' : 'its office staff list') : '').($user->isAdmissionAdmin() ? ', plus Admission Notices' : '').'.',
            'stats' => $stats,
            'actions' => $actions,
            'attention' => $attention,
            'recent' => [
                'title' => 'Recently edited pages',
                'items' => $edited->take(6)->map(fn ($p) => [
                    'title' => $p->title,
                    'meta' => 'Edited '.$p->updated_at?->diffForHumans(),
                    'href' => "/admin/site-pages/{$p->key}",
                    'external' => $urls[$p->key] ?? null,
                ])->values(),
                'empty' => 'No page has been edited yet. Open one from Website Pages to start.',
            ],
        ];
    }

    /** Office admins with a few assigned pages and their office's staff list (Treasurer). */
    private function pageAdmin(User $user): array
    {
        $config = SitePage::PAGE_ADMINS[$user->role];
        SitePage::seedMissingFromDefaults();
        $pages = SitePage::whereIn('key', $config['pages'])->orderBy('title')->get(['key', 'title', 'updated_at', 'updated_by']);
        $catalog = OfficeMember::offices();
        $urls = \App\Http\Controllers\Admin\SitePageController::publicUrls();

        $stats = [['label' => 'Pages you maintain', 'value' => $pages->count(), 'href' => '/admin/site-pages']];
        $actions = [];
        foreach ($pages as $page) {
            $actions[] = ['label' => $page->title, 'description' => 'Edit this page', 'href' => "/admin/site-pages/{$page->key}"];
        }
        $attention = [];
        foreach ($config['offices'] as $office) {
            $name = $catalog[$office]['name'] ?? $office;
            $stats[] = ['label' => "{$name} staff", 'value' => OfficeMember::where('office', $office)->count(), 'href' => "/admin/offices/{$office}"];
            $actions[] = ['label' => "{$name} staff", 'description' => 'Add, edit and reorder staff', 'href' => "/admin/offices/{$office}"];
            if (! OfficeMember::where('office', $office)->exists()) {
                $attention[] = ['level' => 'info', 'text' => "{$name} has no staff listed yet.", 'href' => "/admin/offices/{$office}"];
            }
        }

        return [
            'scope' => $pages->pluck('title')->merge(collect($config['offices'])->map(fn ($o) => ($catalog[$o]['name'] ?? $o).' staff list'))->implode(', ').'.',
            'stats' => $stats,
            'actions' => $actions,
            'attention' => $attention,
            'recent' => [
                'title' => 'Your pages',
                'items' => $pages->map(fn ($p) => [
                    'title' => $p->title,
                    'meta' => $p->updated_by ? 'Edited '.$p->updated_at?->diffForHumans() : 'Not edited yet',
                    'href' => "/admin/site-pages/{$p->key}",
                    'external' => $urls[$p->key] ?? null,
                ])->values(),
                'empty' => 'No pages assigned.',
            ],
        ];
    }

    private function iqac(): array
    {
        return [
            'scope' => 'The IQAC website: slider, stats, QA areas, OBE points, members, events and notices.',
            'stats' => [
                ['label' => 'IQAC members', 'value' => \App\Models\IqacMember::count(), 'href' => '/admin/iqac'],
                ['label' => 'Events', 'value' => \App\Models\IqacEvent::count(), 'href' => '/admin/iqac'],
                ['label' => 'Notices', 'value' => \App\Models\IqacNotice::count(), 'href' => '/admin/iqac'],
            ],
            'actions' => [
                ['label' => 'Manage IQAC page', 'description' => 'All IQAC content', 'href' => '/admin/iqac'],
                ['label' => 'Request media coverage', 'description' => 'Ask the PR office to cover an event', 'href' => '/admin/media-requests/create'],
                ['label' => 'View IQAC page', 'description' => '/iqac', 'href' => '/iqac', 'external' => true],
            ],
            'attention' => [],
            'recent' => null,
        ];
    }

    /** Update requests: the developer's open queue, or the requester's open questions. */
    private function withUpdateRequests(User $user, array $data): array
    {
        $data['actions'][] = $user->isSuperAdmin()
            ? ['label' => 'Update requests', 'description' => 'Requests from admins', 'href' => '/admin/update-requests?status=open']
            : ['label' => 'Request an update', 'description' => 'Ask the developer for any change on the website', 'href' => '/admin/update-requests/create'];

        if ($user->isSuperAdmin()) {
            $open = UpdateRequest::open()->count();
            $urgent = UpdateRequest::open()->whereIn('priority', ['urgent', 'high'])->count();
            if ($open > 0) {
                array_unshift($data['attention'], [
                    'level' => $urgent > 0 ? 'danger' : 'warning',
                    'text' => "{$open} open update requests from admins".($urgent ? " ({$urgent} high or urgent)" : '').'.',
                    'href' => '/admin/update-requests?status=open',
                ]);
            }
        } elseif (($needsInfo = UpdateRequest::where('user_id', $user->id)->where('status', 'needs_info')->count()) > 0) {
            array_unshift($data['attention'], [
                'level' => 'warning',
                'text' => "The developer needs more information on {$needsInfo} of your update requests.",
                'href' => '/admin/update-requests?status=needs_info',
            ]);
        }

        return $data;
    }

    /** @param \Illuminate\Database\Eloquent\Builder<Notice> $query */
    private function recentNotices($query, string $title): array
    {
        return [
            'title' => $title,
            'items' => $query->latest('published_at')->take(6)->get(['id', 'title', 'department', 'published_at', 'is_active'])
                ->map(fn (Notice $n) => [
                    'title' => html_entity_decode(strip_tags($n->title), ENT_QUOTES | ENT_HTML5, 'UTF-8'),
                    'meta' => trim(($n->department ? strtoupper($n->department).' · ' : '').($n->published_at?->format('d M Y') ?? '').($n->is_active ? '' : ' · hidden')),
                    'href' => "/admin/notices/{$n->id}/edit",
                ])->values(),
            'empty' => 'No notices yet.',
        ];
    }
}
