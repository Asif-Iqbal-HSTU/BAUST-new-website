<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

// While the old WordPress site is still live, pull new notices (and ticker changes) from it every hour.
Illuminate\Support\Facades\Schedule::command('notices:sync-source')->hourly()->withoutOverlapping()->runInBackground()
    ->when(fn () => config('services.legacy_site.sync'));
