<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Department;
use App\Models\DepartmentAchievement;
use App\Models\DepartmentCurriculum;
use App\Models\DepartmentHighlight;
use App\Models\DepartmentLaboratory;
use App\Models\DepartmentObe;
use App\Models\DepartmentSlide;
use App\Models\DepartmentSociety;
use App\Models\DepartmentStat;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    private function collections(): array
    {
        return [
            'slides' => [
                'model' => DepartmentSlide::class,
                'image' => 'image',
                'rules' => ['title' => 'nullable|string|max:255', 'caption' => 'nullable|string|max:255', 'order' => 'nullable|integer'],
            ],
            'stats' => [
                'model' => DepartmentStat::class,
                'rules' => ['value' => 'required|string|max:100', 'label' => 'required|string|max:150', 'order' => 'nullable|integer'],
            ],
            'highlights' => [
                'model' => DepartmentHighlight::class,
                'rules' => ['icon' => 'required|string|max:50', 'title' => 'required|string|max:150', 'text' => 'nullable|string|max:255', 'order' => 'nullable|integer'],
            ],
            'curricula' => [
                'model' => DepartmentCurriculum::class,
                'file' => 'file',
                'json' => ['highlights'],
                'rules' => [
                    'title' => 'required|string|max:255',
                    'year' => 'nullable|string|max:20',
                    'description' => 'nullable|string',
                    'highlights' => 'nullable|string',
                    'duration' => 'nullable|string|max:100',
                    'credits' => 'nullable|string|max:100',
                    'degree' => 'nullable|string|max:150',
                    'order' => 'nullable|integer',
                ],
            ],
            'laboratories' => [
                'model' => DepartmentLaboratory::class,
                'json' => ['equipment', 'objectives', 'images'],
                'rules' => [
                    'name' => 'required|string|max:255',
                    'slug' => 'nullable|string|max:100',
                    'description' => 'nullable|string',
                    'equipment' => 'nullable|string',
                    'objectives' => 'nullable|string',
                    'images' => 'nullable|string',
                    'order' => 'nullable|integer',
                ],
            ],
            'achievements' => [
                'model' => DepartmentAchievement::class,
                'json' => ['team_members'],
                'rules' => [
                    'title' => 'required|string|max:255',
                    'type' => 'nullable|string|max:100',
                    'icon' => 'nullable|string|max:50',
                    'color' => 'nullable|string|max:50',
                    'description' => 'nullable|string',
                    'details' => 'nullable|string',
                    'team_title' => 'nullable|string|max:150',
                    'team_members' => 'nullable|string',
                    'link' => 'nullable|string|max:500',
                    'order' => 'nullable|integer',
                ],
            ],
            'societies' => [
                'model' => DepartmentSociety::class,
                'file' => 'committee_pdf',
                'rules' => [
                    'name' => 'required|string|max:255',
                    'slug' => 'nullable|string|max:100',
                    'type' => 'required|string|in:society,alumni',
                    'description' => 'nullable|string',
                    'member_count' => 'nullable|string|max:100',
                    'established' => 'nullable|string|max:50',
                    'order' => 'nullable|integer',
                ],
            ],
            'obes' => [
                'model' => DepartmentObe::class,
                'rules' => [
                    'type' => 'required|string|in:peo,plo',
                    'code' => 'required|string|max:50',
                    'title' => 'nullable|string|max:255',
                    'description' => 'required|string',
                    'order' => 'nullable|integer',
                ],
            ],
            'online_resources' => [
                'model' => \App\Models\DepartmentOnlineResource::class,
                'rules' => [
                    'title' => 'required|string|max:255',
                    'link' => 'required|url|max:1000',
                    'category' => 'nullable|string|max:100',
                    'description' => 'nullable|string',
                    'order' => 'nullable|integer',
                ],
            ],
            'researches' => [
                'model' => \App\Models\DepartmentResearch::class,
                'file' => 'pdf_file',
                'rules' => [
                    'type' => 'required|string|in:publication,thesis',
                    'category' => 'nullable|string|max:100',
                    'title' => 'required|string|max:500',
                    'authors' => 'nullable|string',
                    'journal_conference' => 'nullable|string|max:500',
                    'year' => 'nullable|string|max:20',
                    'link' => 'nullable|string|max:1000',
                    'supervisor' => 'nullable|string|max:255',
                    'students_info' => 'nullable|string',
                    'order' => 'nullable|integer',
                ],
            ],
            'student_voices' => [
                'model' => \App\Models\DepartmentStudentVoice::class,
                'image' => 'image',
                'rules' => [
                    'student_name' => 'required|string|max:255',
                    'student_id' => 'nullable|string|max:50',
                    'batch' => 'nullable|string|max:100',
                    'title' => 'nullable|string|max:255',
                    'profile_link' => 'nullable|string|max:500',
                    'quote' => 'nullable|string',
                    'order' => 'nullable|integer',
                ],
            ],
            'galleries' => [
                'model' => \App\Models\DepartmentGallery::class,
                'json' => ['images'],
                'rules' => [
                    'type' => 'required|string|in:photo,video',
                    'title' => 'required|string|max:255',
                    'category' => 'nullable|string|max:100',
                    'description' => 'nullable|string',
                    'images' => 'nullable|string',
                    'video_url' => 'nullable|string|max:500',
                    'order' => 'nullable|integer',
                ],
            ],
            'alumni' => [
                'model' => \App\Models\DepartmentAlumnus::class,
                'rules' => [
                    'type' => 'required|string|in:job_holder,higher_study',
                    'name' => 'required|string|max:255',
                    'batch' => 'nullable|string|max:100',
                    'passing_year' => 'nullable|string|max:50',
                    'designation' => 'nullable|string|max:255',
                    'organization' => 'nullable|string|max:255',
                    'order' => 'nullable|integer',
                ],
            ],
        ];
    }

    public function index()
    {
        $user = auth()->user();
        if ($user->isDeptAdmin()) {
            if ($user->department) {
                return redirect()->route('admin.departments.manage', $user->department);
            }
            abort(403, 'No department assigned to your account.');
        }

        return Inertia::render('Admin/Departments/Index', [
            'departments' => Department::orderBy('order')->get(['id', 'slug', 'name', 'short_name', 'faculty']),
        ]);
    }

    public function manage(string $slug)
    {
        $user = auth()->user();
        abort_unless($user->canManageDepartment($slug), 403, 'Unauthorized access to this department.');

        $dept = Department::where('slug', $slug)->firstOrFail();

        return Inertia::render('Admin/Departments/Manage', [
            'department' => $dept,
            'slides' => $dept->slides,
            'stats' => $dept->stats,
            'highlights' => $dept->highlights,
            'curricula' => $dept->curricula,
            'laboratories' => $dept->laboratories,
            'achievements' => $dept->achievements,
            'societies' => $dept->societies,
            'obes' => $dept->obes,
            'onlineResources' => $dept->onlineResources,
            'researches' => $dept->researches,
            'studentVoices' => $dept->studentVoices,
            'galleries' => $dept->galleries,
            'alumni' => $dept->alumni,
            'iconOptions' => [
                'GraduationCap', 'Users', 'Building2', 'Handshake', 'Sparkles', 'Target', 'Eye',
                'Cpu', 'BookOpen', 'Award', 'Briefcase', 'FlaskConical', 'Globe', 'Lightbulb',
                'Layers', 'Trophy', 'ShieldCheck', 'Code', 'Star', 'Zap', 'Heart', 'Coffee', 'Megaphone',
                'Flame', 'Wrench', 'Bot', 'TrendingUp', 'Network', 'Activity', 'Sliders'
            ],
        ]);
    }

    public function updateProfile(Request $request, string $slug)
    {
        $user = auth()->user();
        abort_unless($user->canManageDepartment($slug), 403, 'Unauthorized access to this department.');

        $dept = Department::where('slug', $slug)->firstOrFail();
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'short_name' => 'required|string|max:50',
            'faculty' => 'nullable|string|max:100',
            'tagline' => 'nullable|string|max:255',
            'established' => 'nullable|string|max:50',
            'accreditation_badge' => 'nullable|string|max:100',
            'accreditation_title' => 'nullable|string|max:255',
            'accreditation_text' => 'nullable|string',
            'about' => 'nullable|string',
            'vision' => 'nullable|string',
            'mission' => 'nullable|string',
            'hod_name' => 'nullable|string|max:255',
            'hod_designation' => 'nullable|string|max:255',
            'hod_message' => 'nullable|string',
            'hod_photo_file' => 'nullable|image|max:2048',
        ]);
        if ($request->hasFile('hod_photo_file')) {
            $data['hod_photo'] = '/storage/'.$request->file('hod_photo_file')->store('members', 'public');
        }
        unset($data['hod_photo_file']);
        $dept->update($data);

        return back()->with('success', 'Department profile updated.');
    }

    public function storeItem(Request $request, string $slug, string $type)
    {
        $user = auth()->user();
        abort_unless($user->canManageDepartment($slug), 403, 'Unauthorized access to this department.');

        $dept = Department::where('slug', $slug)->firstOrFail();
        $config = $this->configFor($type);
        $data = $this->validated($request, $config);
        $data['department_id'] = $dept->id;
        $this->applyImage($request, $config, $data, null);
        $this->applyFile($request, $config, $data, null);

        if (empty($data['slug']) && !empty($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $config['model']::create($data);

        return back()->with('success', 'Item added.');
    }

    public function updateItem(Request $request, string $slug, string $type, int $id)
    {
        $user = auth()->user();
        abort_unless($user->canManageDepartment($slug), 403, 'Unauthorized access to this department.');

        $config = $this->configFor($type);
        $item = $config['model']::findOrFail($id);
        $data = $this->validated($request, $config);
        $this->applyImage($request, $config, $data, $item);
        $this->applyFile($request, $config, $data, $item);

        if (empty($data['slug']) && !empty($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        $item->update($data);

        return back()->with('success', 'Item updated.');
    }

    public function destroyItem(string $slug, string $type, int $id)
    {
        $user = auth()->user();
        abort_unless($user->canManageDepartment($slug), 403, 'Unauthorized access to this department.');

        $config = $this->configFor($type);
        $config['model']::findOrFail($id)->delete();

        return back()->with('success', 'Item deleted.');
    }

    private function configFor(string $type): array
    {
        $c = $this->collections();
        abort_unless(isset($c[$type]), 404);

        return $c[$type];
    }

    private function validated(Request $request, array $config): array
    {
        $rules = $config['rules'];
        if (! empty($config['image'])) {
            $rules[$config['image'].'_file'] = 'nullable|image|max:2048';
        }
        if (! empty($config['file'])) {
            $rules[$config['file'].'_file'] = 'nullable|file|max:20480';
        }
        $v = $request->validate($rules);
        unset($v[($config['image'] ?? '').'_file']);
        unset($v[($config['file'] ?? '').'_file']);
        $v['order'] = $v['order'] ?? 0;

        // Process json text fields (convert newline-separated text into array)
        if (! empty($config['json'])) {
            foreach ($config['json'] as $jsonField) {
                if (isset($v[$jsonField]) && is_string($v[$jsonField])) {
                    $raw = trim($v[$jsonField]);
                    if (str_starts_with($raw, '[') && str_ends_with($raw, ']')) {
                        $decoded = json_decode($raw, true);
                        if (is_array($decoded)) {
                            $v[$jsonField] = $decoded;
                            continue;
                        }
                    }
                    $lines = array_filter(array_map('trim', explode("\n", $raw)));
                    $v[$jsonField] = array_values($lines);
                }
            }
        }

        return $v;
    }

    private function applyImage(Request $request, array $config, array &$data, $existing): void
    {
        if (empty($config['image'])) {
            return;
        }
        $f = $config['image'];
        if ($request->hasFile($f.'_file')) {
            $data[$f] = '/storage/'.$request->file($f.'_file')->store('departments', 'public');
        } elseif ($existing) {
            $data[$f] = $existing->{$f};
        }
    }

    private function applyFile(Request $request, array $config, array &$data, $existing): void
    {
        if (empty($config['file'])) {
            return;
        }
        $f = $config['file'];
        if ($request->hasFile($f.'_file')) {
            $data[$f] = '/storage/'.$request->file($f.'_file')->store('departments', 'public');
        } elseif ($existing) {
            $data[$f] = $existing->{$f};
        }
    }
}
