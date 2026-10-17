<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\IqacEvent;
use App\Models\IqacMember;
use App\Models\IqacNotice;
use App\Models\IqacObePoint;
use App\Models\IqacQaArea;
use App\Models\IqacSetting;
use App\Models\IqacSlide;
use App\Models\IqacStat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class IqacController extends Controller
{
    /**
     * Registry of the repeatable collections. Each entry: model class,
     * optional image field (form key `<field>_file` / `<field>_url`), and
     * the validation rules for the plain fields.
     */
    private function collections(): array
    {
        return [
            'slides' => [
                'model' => IqacSlide::class,
                'image' => 'image',
                'rules' => ['title' => 'required|string|max:255', 'date_label' => 'nullable|string|max:100', 'order' => 'nullable|integer'],
            ],
            'stats' => [
                'model' => IqacStat::class,
                'rules' => ['value' => 'required|string|max:100', 'label' => 'required|string|max:150', 'order' => 'nullable|integer'],
            ],
            'qa-areas' => [
                'model' => IqacQaArea::class,
                'rules' => ['icon' => 'required|string|max:50', 'label' => 'required|string|max:150', 'order' => 'nullable|integer'],
            ],
            'obe-points' => [
                'model' => IqacObePoint::class,
                'rules' => ['text' => 'required|string|max:255', 'order' => 'nullable|integer'],
            ],
            'members' => [
                'model' => IqacMember::class,
                'image' => 'photo',
                'rules' => [
                    'name' => 'required|string|max:255',
                    'role' => 'required|string|max:255',
                    'affiliation' => 'nullable|string|max:255',
                    'credentials' => 'nullable|string|max:500',
                    'is_lead' => 'boolean',
                    'order' => 'nullable|integer',
                ],
            ],
            'events' => [
                'model' => IqacEvent::class,
                'rules' => ['date_label' => 'nullable|string|max:100', 'title' => 'required|string|max:255', 'order' => 'nullable|integer'],
            ],
            'notices' => [
                'model' => IqacNotice::class,
                'rules' => ['text' => 'required|string|max:500', 'order' => 'nullable|integer'],
            ],
        ];
    }

    public function manage()
    {
        return Inertia::render('Admin/Iqac/Manage', [
            'settings' => IqacSetting::allDecoded(),
            'slides' => IqacSlide::orderBy('order')->get(),
            'stats' => IqacStat::orderBy('order')->get(),
            'qaAreas' => IqacQaArea::orderBy('order')->get(),
            'obePoints' => IqacObePoint::orderBy('order')->get(),
            'members' => IqacMember::orderBy('order')->get(),
            'events' => IqacEvent::orderBy('order')->get(),
            'notices' => IqacNotice::orderBy('order')->get(),
            'iconOptions' => ['Landmark', 'BookOpen', 'GraduationCap', 'Building2', 'ClipboardCheck', 'LifeBuoy', 'Users', 'FlaskConical', 'Layers', 'RefreshCw', 'ShieldCheck', 'Award', 'Target'],
        ]);
    }

    /** Save all singleton page content (about, director, vision, mission, OBE, contact). */
    public function updateSettings(Request $request)
    {
        $validated = $request->validate([
            'about_heading' => 'nullable|string|max:255',
            'about_paragraphs' => 'nullable|array',
            'about_paragraphs.*' => 'nullable|string',
            'director_name' => 'nullable|string|max:255',
            'director_role' => 'nullable|string|max:255',
            'director_affiliation' => 'nullable|string|max:255',
            'director_credentials' => 'nullable|string|max:500',
            'director_message' => 'nullable|array',
            'director_message.*' => 'nullable|string',
            'director_photo_file' => 'nullable|image|max:2048',
            'director_photo_url' => 'nullable|string|max:500',
            'vision_text' => 'nullable|string',
            'mission_text' => 'nullable|string',
            'obe_heading' => 'nullable|string|max:255',
            'obe_description' => 'nullable|string',
            'contact_address' => 'nullable|string|max:255',
            'contact_email' => 'nullable|string|max:255',
            'contact_office' => 'nullable|string|max:255',
        ]);

        $keys = [
            'about_heading', 'about_paragraphs', 'director_name', 'director_role',
            'director_affiliation', 'director_credentials', 'director_message',
            'vision_text', 'mission_text', 'obe_heading', 'obe_description',
            'contact_address', 'contact_email', 'contact_office',
        ];
        foreach ($keys as $key) {
            if ($request->has($key)) {
                $value = $validated[$key] ?? null;
                if (is_array($value)) {
                    $value = array_values(array_filter(array_map('trim', $value), fn ($v) => $v !== ''));
                }
                IqacSetting::setValue($key, $value);
            }
        }

        // Director photo: uploaded file wins, else an explicit URL.
        if ($request->hasFile('director_photo_file')) {
            $path = $request->file('director_photo_file')->store('iqac/members', 'public');
            IqacSetting::setValue('director_photo', '/storage/'.$path);
        } elseif ($request->filled('director_photo_url')) {
            IqacSetting::setValue('director_photo', $validated['director_photo_url']);
        }

        return back()->with('success', 'IQAC page content updated.');
    }

    public function storeItem(Request $request, string $type)
    {
        $config = $this->configFor($type);
        $data = $this->validateItem($request, $config);
        $this->applyImage($request, $config, $data, null);

        $config['model']::create($data);

        return back()->with('success', 'Item added.');
    }

    public function updateItem(Request $request, string $type, int $id)
    {
        $config = $this->configFor($type);
        $item = $config['model']::findOrFail($id);
        $data = $this->validateItem($request, $config);
        $this->applyImage($request, $config, $data, $item);

        $item->update($data);

        return back()->with('success', 'Item updated.');
    }

    public function destroyItem(string $type, int $id)
    {
        $config = $this->configFor($type);
        $config['model']::findOrFail($id)->delete();

        return back()->with('success', 'Item deleted.');
    }

    private function configFor(string $type): array
    {
        $collections = $this->collections();
        abort_unless(isset($collections[$type]), 404, 'Unknown IQAC collection.');

        return $collections[$type];
    }

    private function validateItem(Request $request, array $config): array
    {
        $rules = $config['rules'];
        if (! empty($config['image'])) {
            $rules[$config['image'].'_file'] = 'nullable|image|max:2048';
            $rules[$config['image'].'_url'] = 'nullable|string|max:500';
        }
        $validated = $request->validate($rules);
        // Strip image helper keys — they are handled separately.
        if (! empty($config['image'])) {
            unset($validated[$config['image'].'_file'], $validated[$config['image'].'_url']);
        }
        if (array_key_exists('is_lead', $config['rules'])) {
            $validated['is_lead'] = $request->boolean('is_lead');
        }
        $validated['order'] = $validated['order'] ?? 0;

        return $validated;
    }

    /** Resolve the image field from an uploaded file or URL; keep existing on update. */
    private function applyImage(Request $request, array $config, array &$data, $existing): void
    {
        if (empty($config['image'])) {
            return;
        }
        $field = $config['image'];

        if ($request->hasFile($field.'_file')) {
            $stored = $request->file($field.'_file')->store('iqac/'.$field, 'public');
            $data[$field] = '/storage/'.$stored;
        } elseif ($request->filled($field.'_url')) {
            $data[$field] = $request->input($field.'_url');
        } elseif ($existing) {
            $data[$field] = $existing->{$field}; // unchanged
        } else {
            $data[$field] = null;
        }
    }
}
