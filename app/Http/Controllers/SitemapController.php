<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\DepartmentLaboratory;
use App\Models\DepartmentSociety;
use App\Models\Notice;
use App\Models\SitePage;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;

/** sitemap.xml: every public page, department lab/club page and published notice. */
class SitemapController extends Controller
{
    /** Paths that are not public pages. */
    private const EXCLUDE = ['admin', 'dashboard', 'settings', 'login', 'register', 'logout', 'forgot-password', 'reset-password',
        'verify-email', 'email', 'confirm-password', 'user', 'two-factor', 'storage', 'up', 'sitemap.xml', 'sanctum', 'facilities/counseling'];

    public function __invoke()
    {
        // Keyed on the site address so a changed APP_URL never serves stale links.
        $xml = Cache::remember('sitemap.xml.'.md5((string) config('app.url')), now()->addHour(), fn () => $this->build());

        return response($xml, 200, ['Content-Type' => 'application/xml; charset=UTF-8']);
    }

    private function build(): string
    {
        $urls = [];
        // Only canonical, indexable URLs: aliases of another page (config/seo.php) are skipped.
        $aliases = config('seo.canonical', []);
        $add = function (string $path, $lastmod = null, string $priority = '0.6') use (&$urls, $aliases) {
            $path = '/'.trim($path, '/');
            if (isset($aliases[$path])) {
                return;
            }
            $urls[$path] ??= ['loc' => \App\Support\Seo::absolute($path), 'lastmod' => $lastmod ? $lastmod->toAtomString() : null, 'priority' => $priority];
        };

        // Public pages without parameters (department sites, faculties, offices, section pages, ...)
        $departments = Department::all()->keyBy('slug');
        $pageDates = SitePage::pluck('updated_at', 'key');
        foreach (Route::getRoutes() as $route) {
            $uri = $route->uri();
            $action = $route->getActionName();
            if (! in_array('GET', $route->methods(), true) || str_contains($uri, '{')
                || Str::startsWith($uri, self::EXCLUDE) || str_contains($action, 'RedirectController')
                || str_contains($action, 'LegacyRedirect') || ($route->action['uses'] ?? null) instanceof Redirector) {
                continue;
            }
            $first = explode('/', $uri)[0];
            $lastmod = $departments[$first]->updated_at ?? (isset($route->defaults['key']) ? ($pageDates[$route->defaults['key']] ?? null) : null);
            $priority = $uri === '/' ? '1.0' : (substr_count($uri, '/') === 0 ? '0.8' : '0.6');
            $add($uri === '/' ? '/' : $uri, $lastmod, $priority);
        }

        // Laboratory and club pages
        $engineering = ['cse', 'ict', 'eee', 'me', 'ipe', 'ce'];
        foreach (DepartmentLaboratory::with('department:id,slug')->where('is_active', true)->get() as $lab) {
            $slug = $lab->department?->slug;
            if ($slug) {
                $add(in_array($slug, $engineering, true) ? "/{$slug}/laboratories/{$lab->slug}" : "/{$slug}/facilities/{$lab->slug}", $lab->updated_at, '0.5');
            }
        }
        foreach (DepartmentSociety::where('department_id', $departments['ce']->id ?? 0)->whereIn('type', ['society', 'club'])->where('is_active', true)->get() as $club) {
            $add("/ce/clubs/{$club->slug}", $club->updated_at, '0.5');
        }

        // Published notices, news and events
        Notice::active()->where(fn ($q) => $q->whereNull('published_at')->orWhere('published_at', '<=', now()))
            ->where('slug', '!=', '')->whereNotNull('slug')
            ->latest('published_at')->select(['slug', 'updated_at', 'published_at'])
            ->each(fn ($n) => $add("/archive/notices/{$n->slug}", $n->updated_at ?? $n->published_at, '0.5'));

        $out = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'];
        foreach ($urls as $u) {
            $out[] = '  <url><loc>'.e($u['loc']).'</loc>'.($u['lastmod'] ? '<lastmod>'.$u['lastmod'].'</lastmod>' : '').'<priority>'.$u['priority'].'</priority></url>';
        }
        $out[] = '</urlset>';

        return implode("\n", $out)."\n";
    }
}
