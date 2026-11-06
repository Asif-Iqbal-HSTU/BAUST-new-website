<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\DepartmentMember;
use App\Models\Notice;
use App\Models\NoticeCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

/**
 * Route::fallback for links into the old WordPress site at baust.edu.bd, which
 * this app replaces. Anything we can map gets a permanent redirect, WordPress-only
 * URLs listed under 'gone' in config/legacy-redirects.php answer 410, the rest 404.
 * Plain renamed paths are not handled here: they are 301 routes built from that
 * same config file.
 *
 *   /{post-slug}/                     -> /archive/notices/{slug}
 *   /{dept}/{post-slug}/              -> /{dept}/events/{slug}
 *   /{dept}/faculty-members/          -> /{dept}/faculty
 *   /{dept}/employees/{slug}/         -> /{dept}/faculty?profile=...
 *   /category/{slug}/, /{dept}/category/{slug}/ -> notice archive / department events
 */
class LegacyRedirectController extends Controller
{
    public function __invoke(Request $request): RedirectResponse
    {
        $raw = trim($request->getPathInfo(), '/');
        $segments = explode('/', $raw);
        $dept = Department::where('slug', $segments[0])->exists() ? $segments[0] : null;
        $rest = $dept ? array_slice($segments, 1) : $segments;

        if ($dept && ($rest[0] ?? null) === 'faculty-members') {
            return redirect("/{$dept}/faculty", 301);
        }

        if ($dept && ($rest[0] ?? null) === 'employees' && count($rest) > 1) {
            $slug = end($rest);
            $member = DepartmentMember::where('department', $dept)
                ->where(fn ($q) => $q->where('wp_profile_url', 'like', "%/employees/%{$slug}/")->orWhere('wp_profile_url', 'like', "%/employees/%{$slug}"))
                ->first();

            return redirect("/{$dept}/faculty".($member ? '?profile='.self::profileSlug($member->name) : ''), 301);
        }

        if (($rest[0] ?? null) === 'category' && isset($rest[1])) {
            if ($dept) {
                return redirect("/{$dept}/events", 301);
            }
            if (NoticeCategory::where('slug', $rest[1])->exists()) {
                return redirect('/archive/notices?category='.urlencode($rest[1]), 301);
            }
        }

        // Post permalinks: match the stored source URL (with/without www and trailing slash).
        $candidates = [];
        foreach (array_unique([$raw, rawurldecode($raw)]) as $p) {
            foreach (['https://baust.edu.bd/', 'https://www.baust.edu.bd/', 'http://baust.edu.bd/', 'http://www.baust.edu.bd/'] as $host) {
                $candidates[] = $host.$p;
                $candidates[] = $host.$p.'/';
            }
        }
        $notice = Notice::active()->whereIn('original_url', $candidates)->first();
        if ($notice) {
            return redirect($notice->department ? "/{$notice->department}/events/{$notice->slug}" : "/archive/notices/{$notice->slug}", 301);
        }

        foreach (config('legacy-redirects.gone', []) as $pattern) {
            if (preg_match($pattern, $raw)) {
                abort(410);
            }
        }

        abort(404);
    }

    /** PHP twin of getProfileSlug() in resources/js/custom_components/ProfileModal.tsx. */
    public static function profileSlug(string $name): string
    {
        $s = strtolower($name);
        $s = preg_replace('/^(dr\s+md\s+|dr\.\s+md\.\s+|dr\.\s+|prof\.\s+|mr\.\s+|ms\.\s+|mrs\.\s+|col\.\s+|major\.\s+|sgt\.\s+)/', '', $s);
        $s = preg_replace('/[^a-z0-9]+/', '-', $s);

        return trim($s, '-');
    }
}
