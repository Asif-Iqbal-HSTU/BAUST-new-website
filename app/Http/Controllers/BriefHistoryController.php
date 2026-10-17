<?php

namespace App\Http\Controllers;

use App\Models\BriefHistory;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BriefHistoryController extends Controller
{
    /**
     * Display the Brief History page.
     */
    public function index(): Response
    {
        $histories = BriefHistory::orderBy('order', 'asc')->get();

        return Inertia::render('About/BriefHistory', [
            'histories' => $histories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // For admin panel
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // For admin panel
    }
}
