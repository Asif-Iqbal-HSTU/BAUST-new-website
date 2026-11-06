<?php

namespace App\Providers;

use App\Models\SitePage;
use App\Support\AdminActivity;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->scoped(AdminActivity::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Record what logged-in admins change so NotifyAdminActivity can email it.
        Event::listen(['eloquent.created: *', 'eloquent.updated: *', 'eloquent.deleted: *'], function (string $event, array $payload) {
            if (! auth()->check() || ! ($payload[0] ?? null) instanceof Model) {
                return;
            }
            $this->app->make(AdminActivity::class)->record(str($event)->between('eloquent.', ':')->toString(), $payload[0]);
        });

        Gate::define('manage-iqac', fn (User $user) => $user->canManageIqac());
        Gate::define('manage-departments', fn (User $user) => $user->isSuperAdmin() || $user->isDeptAdmin());
        Gate::define('manage-faculties', fn (User $user) => $user->isSuperAdmin());
        // Office staff lists: see User::canManageOffice (the office index is for
        // the super admin and the Administration admin).
        Gate::define('manage-offices', fn (User $user, ?string $office = null) => $office === null
            ? $user->isSuperAdmin() || $user->role === SitePage::SECTIONS['administration']['role']
            : $user->canManageOffice($office));
        Gate::define('manage-site-pages', fn (User $user) => $user->managedSections() !== [] || $user->managedPageKeys() !== []);
        Gate::define('manage-members', fn (User $user) => $user->isSuperAdmin() || $user->isDeptAdmin());
        Gate::define('manage-notices', fn (User $user) => $user->isSuperAdmin() || $user->isDeptAdmin() || $user->isPro() || $user->isAdmissionAdmin());
        Gate::define('submit-media-request', fn (User $user) => $user->canSubmitMediaRequest());
        Gate::define('manage-media-requests', fn (User $user) => $user->canManageMediaRequests());
    }
}
