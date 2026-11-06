<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SitePage;
use Illuminate\Http\Request;
use Inertia\Inertia;

/** Section admins edit the pages under their menu; page admins (Treasurer) their assigned pages. */
class SitePageController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        SitePage::seedMissingFromDefaults();

        $pages = SitePage::query()
            ->when(! $user->isSuperAdmin(), fn ($q) => $q->where(fn ($w) => $w->whereIn('section', $user->managedSections())->orWhereIn('key', $user->managedPageKeys())))
            ->orderBy('section')->orderBy('title')
            ->get(['key', 'section', 'title', 'updated_at']);

        return Inertia::render('Admin/SitePages/Index', [
            'pages' => $pages,
            'sections' => collect(SitePage::SECTIONS)->map(fn ($s) => $s['label']),
            'publicUrls' => self::publicUrls(),
        ]);
    }

    public function edit(string $key)
    {
        $page = $this->authorizedPage($key);

        return Inertia::render('Admin/SitePages/Edit', [
            'page' => $page->only(['key', 'section', 'title', 'content', 'updated_at']),
            'defaults' => SitePage::defaults($key)['content'] ?? null,
            'publicUrl' => self::publicUrls()[$key] ?? null,
        ]);
    }

    public function update(Request $request, string $key)
    {
        $page = $this->authorizedPage($key);
        $data = $request->validate([
            'content' => 'required|string|max:2000000',
            'title' => 'nullable|string|max:255',
        ]);

        $content = json_decode($data['content'], true);
        if (! is_array($content)) {
            return back()->withErrors(['content' => 'The page content could not be read. Please try again.']);
        }

        $page->update([
            'content' => $content,
            'title' => ($data['title'] ?? null) ?: $page->title,
            'updated_by' => auth()->id(),
        ]);

        return back()->with('success', 'Page saved. The changes are live.');
    }

    /** Restore the content the page shipped with. */
    public function reset(string $key)
    {
        $page = $this->authorizedPage($key);
        $defaults = SitePage::defaults($key);
        abort_unless($defaults, 404);

        $page->update(['content' => $defaults['content'] ?? [], 'updated_by' => auth()->id()]);

        return back()->with('success', 'Page restored to its original content.');
    }

    /** Upload an image or document for a page field; returns its public path. */
    public function upload(Request $request, string $key)
    {
        $this->authorizedPage($key);
        $request->validate([
            'file' => 'required|file|max:20480|mimes:jpg,jpeg,png,gif,webp,svg,pdf,doc,docx,xls,xlsx,ppt,pptx',
        ]);

        $path = $request->file('file')->store('site-pages/'.SitePage::sectionOf($key), 'public');

        return response()->json(['path' => '/storage/'.$path]);
    }

    private function authorizedPage(string $key): SitePage
    {
        SitePage::seedMissingFromDefaults();
        $page = SitePage::where('key', $key)->firstOrFail();
        abort_unless(auth()->user()->canManageSitePage($page), 403);

        return $page;
    }

    /** Where each page is published, for "View page" links. */
    public static function publicUrls(): array
    {
        $urls = [];
        foreach (\Illuminate\Support\Facades\Route::getRoutes() as $route) {
            $key = $route->defaults['key'] ?? null;
            if ($key && ($route->action['controller'] ?? null) === \App\Http\Controllers\SitePageController::class.'@show' && ! isset($urls[$key])) {
                $urls[$key] = '/'.ltrim($route->uri(), '/');
            }
        }

        return $urls;
    }
}
