<?php

namespace App\Http\Controllers;

use App\Models\CounselingSession;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CounselingBookingController extends Controller
{
    /**
     * Store a confidential counseling session request.
     * All sensitive inputs are encrypted at rest with AES-256 via Eloquent casts.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'student_name'         => 'required|string|max:255',
            'student_id'           => 'required|string|max:100',
            'department'           => 'required|string|max:100',
            'email'                => 'required|email|max:255',
            'phone'                => 'required|string|max:50',
            'session_mode'         => 'required|string|max:100',
            'concern_category'     => 'required|string|max:255',
            'preferred_date'       => 'required|string|max:100',
            'preferred_time'       => 'required|string|max:100',
            'confidential_message' => 'nullable|string|max:5000',
        ]);

        // Generate unique human-friendly tracking reference
        do {
            $trackingCode = 'BAUST-PSY-' . strtoupper(Str::random(6));
        } while (CounselingSession::where('tracking_code', $trackingCode)->exists());

        // Model attributes are cast as 'encrypted', guaranteeing AES-256 encryption in MySQL
        $session = CounselingSession::create([
            'tracking_code'        => $trackingCode,
            'student_name'         => $validated['student_name'],
            'student_id'           => $validated['student_id'],
            'department'           => $validated['department'],
            'email'                => $validated['email'],
            'phone'                => $validated['phone'],
            'session_mode'         => $validated['session_mode'],
            'concern_category'     => $validated['concern_category'],
            'preferred_date'       => $validated['preferred_date'],
            'preferred_time'       => $validated['preferred_time'],
            'confidential_message' => $validated['confidential_message'] ?? null,
            'status'               => 'pending',
        ]);

        if ($request->header('X-Inertia')) {
            return back()->with('booking_success', [
                'tracking_code' => $session->tracking_code,
                'student_name'  => $session->student_name,
            ]);
        }

        return response()->json([
            'success'       => true,
            'tracking_code' => $session->tracking_code,
            'message'       => 'Your counseling appointment request has been securely encrypted and delivered directly to the University Psychologist.',
        ]);
    }
}
