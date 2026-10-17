<?php

require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "=== CSE Faculty Members in DB ===" . PHP_EOL;
$faculty = App\Models\DepartmentMember::where('department', 'cse')->get();
echo "Total members: " . $faculty->count() . PHP_EOL;
echo "Permanent: " . $faculty->where('type', 'permanent')->count() . PHP_EOL;
echo "Adjunct: " . $faculty->where('type', 'adjunct')->count() . PHP_EOL;
echo "Staff: " . $faculty->where('type', 'staff')->count() . PHP_EOL;
echo "With Areas of Interest: " . $faculty->filter(fn($m) => !empty($m->areas_of_interest))->count() . PHP_EOL;
echo "With Publications: " . $faculty->filter(fn($m) => !empty($m->publications))->count() . PHP_EOL;
echo "With Experience: " . $faculty->filter(fn($m) => !empty($m->experience))->count() . PHP_EOL;
echo "With Research: " . $faculty->filter(fn($m) => !empty($m->research))->count() . PHP_EOL;
echo "With Achievements: " . $faculty->filter(fn($m) => !empty($m->achievements))->count() . PHP_EOL;
echo "With Seminars: " . $faculty->filter(fn($m) => !empty($m->seminars))->count() . PHP_EOL;
echo "With Training: " . $faculty->filter(fn($m) => !empty($m->training))->count() . PHP_EOL;
echo "With Others: " . $faculty->filter(fn($m) => !empty($m->others))->count() . PHP_EOL;

echo PHP_EOL . "=== Top 5 Sample Members ===" . PHP_EOL;
foreach ($faculty->take(5) as $m) {
    $areas = is_array($m->areas_of_interest) ? implode(', ', $m->areas_of_interest) : $m->areas_of_interest;
    echo "- {$m->name} ({$m->designation}) [{$m->type}/{$m->status}]" . PHP_EOL;
    echo "  Email: {$m->email} | Phone: {$m->phone}" . PHP_EOL;
    echo "  Areas of Interest: {$areas}" . PHP_EOL;
    echo "  Publications: " . (empty($m->publications) ? 'None' : strlen($m->publications) . ' chars') . PHP_EOL;
    echo "  Achievements: " . (empty($m->achievements) ? 'None' : strlen($m->achievements) . ' chars') . PHP_EOL;
}
