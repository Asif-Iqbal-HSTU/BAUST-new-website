<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Gate::define('manage-iqac', fn (User $user) => $user->canManageIqac());
        Gate::define('manage-departments', fn (User $user) => $user->isSuperAdmin() || $user->isDeptAdmin());
        Gate::define('manage-faculties', fn (User $user) => $user->isSuperAdmin());
        Gate::define('submit-media-request', fn (User $user) => $user->canSubmitMediaRequest());
        Gate::define('manage-media-requests', fn (User $user) => $user->canManageMediaRequests());
    }
}
