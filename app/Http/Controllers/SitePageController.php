<?php

namespace App\Http\Controllers;

use App\Models\SitePage;
use Inertia\Inertia;
use Inertia\Response;

class SitePageController extends Controller
{
    /** Render a content-driven page (routes pass the page key and its React component). */
    public function show(string $key, string $component): Response
    {
        return Inertia::render($component, ['content' => SitePage::contentFor($key)]);
    }
}
