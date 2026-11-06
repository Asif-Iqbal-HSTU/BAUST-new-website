<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\Notice;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            // Hand-written title/description for this URL (config/seo.php), used by <SeoHead>.
            'seo' => fn () => \App\Support\Seo::override(),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'topScrollNotices' => Notice::active()
                ->where(function ($q) {
                    $q->inCategory('top-scroll-notice')
                      ->orWhere('is_pinned', true);
                })
                ->latest('published_at')
                ->take(15)
                ->get(['id', 'title', 'slug', 'published_at']),
            'siteStats' => fn () => $this->siteStats(),
            'auth' => [
                'user' => $request->user(),
                // Extra pages a focal point runs besides their own department:
                // their faculty's Dean's page and the faculty's degree programs.
                'manages' => fn () => $this->manages($request),
                // Open update requests: all for the developer, own ones needing a reply for others.
                'updateRequests' => fn () => $request->user() ? [
                    'open' => $request->user()->isSuperAdmin() ? \App\Models\UpdateRequest::open()->count() : null,
                    'needsInfo' => \App\Models\UpdateRequest::where('user_id', $request->user()->id)->where('status', 'needs_info')->count(),
                ] : null,
            ],
            'flash' => [
                'success' => $request->session()->get('success'),
                'error' => $request->session()->get('error'),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
        ];
    }

    /**
     * @return array{faculty: array{id: int, slug: string, code: string}|null, programs: list<array{slug: string, short_name: string}>}|null
     */
    private function manages(Request $request): ?array
    {
        $user = $request->user();
        if (! $user?->isDeptAdmin()) {
            return null;
        }

        $faculty = $user->managedFaculty();
        $programs = \App\Models\Department::whereIn('slug', array_diff($user->manageableDepartmentSlugs(), [$user->department]))
            ->orderBy('order')->get(['slug', 'short_name']);

        return [
            'faculty' => $faculty ? ['id' => $faculty->id, 'slug' => $faculty->slug, 'code' => $faculty->code] : null,
            'programs' => $programs->map(fn ($p) => ['slug' => $p->slug, 'short_name' => $p->short_name])->all(),
        ];
    }

    /**
     * Visitor counter shown in the public footer. "Online" = non-bot
     * sessions active in the last 5 minutes (sessions are stored in the DB).
     *
     * @return array{online: int, totalViews: int}
     */
    private function siteStats(): array
    {
        try {
            $online = Cache::remember('site_stats.online', 30, fn () => DB::table('sessions')
                ->where('last_activity', '>=', now()->subMinutes(5)->getTimestamp())
                ->whereNotNull('user_agent')
                ->where('user_agent', 'not like', '%bot%')
                ->where('user_agent', 'not like', '%crawl%')
                ->where('user_agent', 'not like', '%spider%')
                ->count());

            $totalViews = (int) DB::table('site_stats')->where('key', 'page_views')->value('value');
        } catch (\Throwable) {
            return ['online' => 1, 'totalViews' => 0];
        }

        // The current visitor is always online, even before their session row is cached.
        return ['online' => max(1, $online), 'totalViews' => $totalViews];
    }
}
