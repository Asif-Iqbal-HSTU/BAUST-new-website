import '../css/app.css';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'BAUST';

createInertiaApp({
    title: (title) => {
        if (!title) return appName;
        const cleaned = title.replace(/\s*-\s*Laravel/gi, '').trim();
        if (cleaned.toLowerCase().includes('baust')) return cleaned;
        return `${cleaned} - ${appName}`;
    },
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// If something between the browser and the app (e.g. a Cloudflare security challenge,
// which answers with HTTP 503/403, or a brief outage) replies to a page navigation with
// anything but an Inertia response, fall back to a normal full-page load instead of
// Inertia's error modal / a silent failure that makes menu clicks look ignored.
let pendingNavigation: string | null = null;
router.on('start', (event) => {
    const { visit } = event.detail;
    pendingNavigation = visit.method === 'get' && !visit.prefetch ? visit.url.href : null;
});
router.on('finish', () => {
    pendingNavigation = null;
});
const fallBackToFullPageLoad = (event: Event) => {
    if (!pendingNavigation) return;
    event.preventDefault();
    window.location.href = pendingNavigation;
};
router.on('invalid', fallBackToFullPageLoad);
router.on('exception', fallBackToFullPageLoad);

// This will set light / dark mode on load...
initializeTheme();
