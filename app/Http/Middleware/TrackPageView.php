<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class TrackPageView
{
    /**
     * Count one page view per successful public page load (full load or
     * Inertia navigation). Skips admin/auth areas, prefetches, asset/API
     * calls and obvious bots.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if ($this->shouldCount($request, $response)) {
            try {
                DB::table('site_stats')->where('key', 'page_views')->increment('value');
            } catch (\Throwable) {
                // Never break a page because of the counter.
            }
        }

        return $response;
    }

    private function shouldCount(Request $request, Response $response): bool
    {
        if (! $request->isMethod('GET') || ! $response->isSuccessful()) {
            return false;
        }

        // Inertia/browser link prefetches aren't real views.
        if ($request->header('Purpose') === 'prefetch' || $request->header('Sec-Purpose') === 'prefetch') {
            return false;
        }

        // Partial reloads (only=...) refresh data on the same page.
        if ($request->hasHeader('X-Inertia-Partial-Data')) {
            return false;
        }

        // Only HTML pages or Inertia page responses — not JSON endpoints, files, etc.
        if (! $request->header('X-Inertia') && ! str_contains((string) $response->headers->get('Content-Type'), 'text/html')) {
            return false;
        }

        if ($request->is('admin', 'admin/*', 'dashboard', 'dashboard/*', 'settings', 'settings/*', 'login', 'register', 'forgot-password', 'reset-password/*', 'verify-email*', 'confirm-password', 'up')) {
            return false;
        }

        return ! self::isBot($request->userAgent());
    }

    public static function isBot(?string $userAgent): bool
    {
        if (! $userAgent) {
            return true;
        }

        return (bool) preg_match('/bot|crawl|spider|slurp|facebookexternalhit|preview|monitor|curl|wget|python|headless|lighthouse/i', $userAgent);
    }
}
