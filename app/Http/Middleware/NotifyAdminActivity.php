<?php

namespace App\Http\Middleware;

use App\Mail\AdminActivityNotification;
use App\Support\AdminActivity;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpFoundation\Response;

class NotifyAdminActivity
{
    /**
     * Account/session housekeeping that isn't a website content update, and
     * update requests, which send their own UpdateRequestNotification.
     */
    private const SKIP_ROUTES = ['logout', 'login', 'login.store', 'two-factor.*', 'password.confirm*', 'verification.*', 'appearance*', 'admin.update-requests.*'];

    public function __construct(private AdminActivity $activity)
    {
    }

    /**
     * Emails a summary of what an admin changed in this request. Bulk
     * reorders run as query-builder updates (no model events), so successful
     * reorder routes are reported even without recorded changes.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        $user = $request->user();
        $route = $request->route()?->getName();

        if (! $user || $request->isMethodSafe() || $response->getStatusCode() >= 400 || ($route && $request->routeIs(...self::SKIP_ROUTES))) {
            return $response;
        }

        // A failed validation redirects back with freshly flashed errors.
        if ($request->hasSession() && in_array('errors', $request->session()->get('_flash.new', []), true)) {
            return $response;
        }

        $changes = $this->activity->changes();
        $isReorder = $route !== null && str_ends_with($route, 'reorder');

        if ($changes === [] && ! $isReorder) {
            return $response;
        }

        try {
            Mail::to(config('mail.recipients.admin_activity'))->queue(new AdminActivityNotification(
                adminName: $user->name,
                adminEmail: $user->email,
                adminRole: $user->role,
                method: $request->method(),
                url: $request->fullUrl(),
                route: $route,
                ip: $request->ip(),
                occurredAt: now()->timezone('Asia/Dhaka')->format('d M Y, h:i A'),
                changes: $changes,
            ));
        } catch (\Throwable $e) {
            // Never fail an admin's save because the notification couldn't be queued.
            report($e);
        }

        return $response;
    }
}
