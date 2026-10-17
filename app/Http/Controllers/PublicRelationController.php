<?php

namespace App\Http\Controllers;

use App\Models\Department;
use App\Models\Notice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicRelationController extends Controller
{
    /**
     * Public Relations section: all News & Events / Achievements / Conference
     * items published by the PRO, across every department plus university-wide.
     */
    public function index(Request $request): Response
    {
        $department = $request->query('department');
        $search = $request->query('search');

        $query = Notice::active()
            ->prWorthy()
            ->with(['categories', 'pressCoverages'])
            ->latest('published_at');

        if ($department) {
            $query->forDepartment($department);
        }

        if ($search) {
            $query->where('title', 'like', "%{$search}%");
        }

        $items = $query->paginate(12)->withQueryString();

        return Inertia::render('PublicRelations/Index', [
            'items' => $items,
            'filters' => ['department' => $department, 'search' => $search],
            'departments' => Department::orderBy('name')->get(['slug', 'name', 'short_name']),
        ]);
    }
}
