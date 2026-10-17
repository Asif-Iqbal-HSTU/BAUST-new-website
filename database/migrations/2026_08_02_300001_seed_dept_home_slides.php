<?php

use App\Models\Department;
use App\Models\DepartmentSlide;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    public function up(): void
    {
        $path = base_path('database/data/dept_home_slides.json');
        if (! is_file($path)) {
            return;
        }
        foreach (json_decode(file_get_contents($path), true) as $slug => $slides) {
            $dept = Department::where('slug', $slug)->first();
            if (! $dept) {
                continue;
            }
            $order = 1;
            foreach ($slides as $s) {
                DepartmentSlide::updateOrCreate(
                    ['department_id' => $dept->id, 'image' => $s['image']],
                    ['title' => $s['title'] ?? null, 'order' => $order++]
                );
            }
        }
    }

    public function down(): void
    {
        $path = base_path('database/data/dept_home_slides.json');
        if (! is_file($path)) {
            return;
        }
        foreach (array_keys(json_decode(file_get_contents($path), true)) as $slug) {
            $dept = Department::where('slug', $slug)->first();
            if ($dept) {
                DepartmentSlide::where('department_id', $dept->id)->delete();
            }
        }
    }
};
