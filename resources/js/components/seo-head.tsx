import { Head, usePage } from '@inertiajs/react';

import type { SharedData } from '@/types';

/**
 * <Head> for a page, preferring the hand-written title for this URL from
 * config/seo.php (shared as the `seo` prop) over the page's own title, so the
 * browser tab matches the title in the server HTML.
 */
export default function SeoHead({ title }: { title: string }) {
    const { seo } = usePage<SharedData>().props;

    return <Head title={seo?.title ?? title} />;
}
