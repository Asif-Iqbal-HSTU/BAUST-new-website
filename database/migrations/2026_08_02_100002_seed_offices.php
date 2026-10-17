<?php

use App\Models\OfficeMember;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $path = base_path('database/data/offices.json');
        if (! is_file($path)) {
            return;
        }
        foreach (json_decode(file_get_contents($path), true) as $office) {
            foreach ($office['members'] as $m) {
                OfficeMember::updateOrCreate(
                    ['office' => $m['office'], 'name' => $m['name']],
                    [
                        'designation' => $m['designation'] ?? null,
                        'photo' => $m['photo'] ?? null,
                        'phone' => $m['phone'] ?? null,
                        'email' => $m['email'] ?? null,
                        'education' => $m['education'] ?? [],
                        'tier' => $m['tier'] ?? 4,
                        'order' => $m['order'] ?? 0,
                    ]
                );
            }
        }
    }

    public function down(): void
    {
        $path = base_path('database/data/offices.json');
        if (! is_file($path)) {
            return;
        }
        $slugs = collect(json_decode(file_get_contents($path), true))->pluck('slug');
        OfficeMember::whereIn('office', $slugs)->delete();
    }
};
