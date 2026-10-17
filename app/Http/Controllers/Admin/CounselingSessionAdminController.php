<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CounselingSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

class CounselingSessionAdminController extends Controller
{
    /**
     * Enforce strict confidentiality protocol: only the University Psychologist
     * can view or manage psychological counseling records.
     */
    protected function authorizePsychologist(): void
    {
        $user = auth()->user();
        if (!$user || (!$user->isPsychologist() && $user->email !== 'psychologist@baust.edu.bd')) {
            abort(403, 'Strict Confidentiality Protocol: Psychological counseling records are protected under medical-grade privacy and are accessible exclusively to the University Psychologist.');
        }
    }

    /**
     * Display the confidential counseling dashboard.
     */
    public function index(Request $request): Response
    {
        $this->authorizePsychologist();

        $statusFilter = $request->query('status', 'all');

        $query = CounselingSession::query()->orderBy('created_at', 'desc');

        if ($statusFilter !== 'all') {
            $query->where('status', $statusFilter);
        }

        $sessions = $query->get()->map(function ($s) {
            return [
                'id'                   => $s->id,
                'tracking_code'        => $s->tracking_code,
                'student_name'         => $s->student_name,
                'student_id'           => $s->student_id,
                'department'           => $s->department,
                'email'                => $s->email,
                'phone'                => $s->phone,
                'session_mode'         => $s->session_mode,
                'concern_category'     => $s->concern_category,
                'preferred_date'       => $s->preferred_date,
                'preferred_time'       => $s->preferred_time,
                'confidential_message' => $s->confidential_message,
                'status'               => $s->status,
                'psychologist_notes'   => $s->psychologist_notes,
                'created_at'           => $s->created_at ? $s->created_at->format('M d, Y h:i A') : '',
            ];
        });

        // Metrics for summary cards
        $counts = [
            'total'     => CounselingSession::count(),
            'pending'   => CounselingSession::where('status', 'pending')->count(),
            'confirmed' => CounselingSession::where('status', 'confirmed')->count(),
            'completed' => CounselingSession::where('status', 'completed')->count(),
            'cancelled' => CounselingSession::where('status', 'cancelled')->count(),
        ];

        // Fetch the raw database records (without Eloquent decryption) for audit / presentation demo
        $rawRecords = DB::table('counseling_sessions')
            ->orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        return Inertia::render('Admin/Counseling/Index', [
            'sessions'     => $sessions,
            'counts'       => $counts,
            'currentFilter'=> $statusFilter,
            'rawRecords'   => $rawRecords,
        ]);
    }

    /**
     * Update session status or private clinical notes.
     */
    public function updateStatus(Request $request, $id): RedirectResponse
    {
        $this->authorizePsychologist();

        $session = CounselingSession::findOrFail($id);

        $validated = $request->validate([
            'status'             => 'required|string|in:pending,confirmed,completed,cancelled',
            'psychologist_notes' => 'nullable|string|max:5000',
        ]);

        $session->update([
            'status'             => $validated['status'],
            'psychologist_notes' => $validated['psychologist_notes'] ?? $session->psychologist_notes,
        ]);

        return back()->with('success', "Session [{$session->tracking_code}] updated successfully.");
    }

    /**
     * Delete a session record.
     */
    public function destroy($id): RedirectResponse
    {
        $this->authorizePsychologist();

        $session = CounselingSession::findOrFail($id);
        $tracking = $session->tracking_code;
        $session->delete();

        return back()->with('success', "Session record [{$tracking}] has been permanently purged.");
    }

    /**
     * Live comparison API endpoint for presentation demo:
     * Returns raw encrypted MySQL ciphertext vs decrypted plaintext for a given session.
     */
    public function privacyAudit($id): JsonResponse
    {
        $this->authorizePsychologist();

        $raw = DB::table('counseling_sessions')->where('id', $id)->first();
        $decrypted = CounselingSession::find($id);

        if (!$raw || !$decrypted) {
            return response()->json(['error' => 'Record not found'], 404);
        }

        return response()->json([
            'tracking_code' => $raw->tracking_code,
            'cipher_algorithm' => 'AES-256-CBC (OpenSSL)',
            'raw_database_ciphertext' => [
                'student_name'         => $raw->student_name,
                'student_id'           => $raw->student_id,
                'email'                => $raw->email,
                'phone'                => $raw->phone,
                'concern_category'     => $raw->concern_category,
                'confidential_message' => $raw->confidential_message,
            ],
            'decrypted_psychologist_view' => [
                'student_name'         => $decrypted->student_name,
                'student_id'           => $decrypted->student_id,
                'email'                => $decrypted->email,
                'phone'                => $decrypted->phone,
                'concern_category'     => $decrypted->concern_category,
                'confidential_message' => $decrypted->confidential_message,
            ],
        ]);
    }
}
