<?php

namespace App\Http\Controllers;

use App\Models\IqacEvent;
use App\Models\IqacMember;
use App\Models\IqacNotice;
use App\Models\IqacObePoint;
use App\Models\IqacQaArea;
use App\Models\IqacSetting;
use App\Models\IqacSlide;
use App\Models\IqacStat;
use Inertia\Inertia;
use Inertia\Response;

class IqacController extends Controller
{
    public function index(): Response
    {
        $s = IqacSetting::allDecoded();

        return Inertia::render('Iqac/Index', [
            'iqac' => [
                'about' => [
                    'heading' => $s['about_heading'] ?? '',
                    'paragraphs' => $s['about_paragraphs'] ?? [],
                ],
                'stats' => IqacStat::orderBy('order')->get(['value', 'label']),
                'director' => [
                    'name' => $s['director_name'] ?? '',
                    'role' => $s['director_role'] ?? '',
                    'affiliation' => $s['director_affiliation'] ?? '',
                    'credentials' => $s['director_credentials'] ?? '',
                    'photo' => $s['director_photo'] ?? null,
                    'message' => $s['director_message'] ?? [],
                ],
                'vision' => $s['vision_text'] ?? '',
                'mission' => $s['mission_text'] ?? '',
                'qaAreas' => IqacQaArea::orderBy('order')->get(['icon', 'label']),
                'obe' => [
                    'heading' => $s['obe_heading'] ?? '',
                    'description' => $s['obe_description'] ?? '',
                    'points' => IqacObePoint::orderBy('order')->pluck('text'),
                ],
                'members' => IqacMember::orderBy('order')->get()->map(fn ($m) => [
                    'name' => $m->name,
                    'role' => $m->role,
                    'affiliation' => $m->affiliation,
                    'credentials' => $m->credentials,
                    'photo' => $m->photo,
                    'lead' => (bool) $m->is_lead,
                ]),
                'events' => IqacEvent::orderBy('order')->get()->map(fn ($e) => [
                    'date' => $e->date_label,
                    'title' => $e->title,
                ]),
                'notices' => IqacNotice::orderBy('order')->pluck('text'),
                'slides' => IqacSlide::orderBy('order')->get()->map(fn ($sl) => [
                    'img' => $sl->image,
                    'title' => $sl->title,
                    'date' => $sl->date_label,
                ]),
                'contact' => [
                    'address' => $s['contact_address'] ?? '',
                    'email' => $s['contact_email'] ?? '',
                    'office' => $s['contact_office'] ?? '',
                ],
            ],
        ]);
    }
}
