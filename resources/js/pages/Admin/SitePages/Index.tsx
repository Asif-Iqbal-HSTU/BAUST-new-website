import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ExternalLink, FileText } from 'lucide-react';

interface PageRow {
    key: string;
    section: string;
    title: string;
    updated_at: string | null;
}

interface Props {
    pages: PageRow[];
    sections: Record<string, string>;
    publicUrls: Record<string, string>;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Website Pages', href: '/admin/site-pages' },
];

export default function Index({ pages, sections, publicUrls }: Props) {
    const grouped = Object.keys(sections)
        .map((section) => ({ section, label: sections[section], pages: pages.filter((p) => p.section === section) }))
        .filter((g) => g.pages.length > 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Website Pages" />
            <div className="mx-auto w-full max-w-4xl space-y-6 p-4 md:p-6">
                <div>
                    <h1 className="text-2xl font-black text-gray-900 dark:text-white">Website Pages</h1>
                    <p className="text-sm text-neutral-500">
                        Every text, person, table, list, image and document on these pages can be edited here. Changes go live when you save.
                    </p>
                </div>

                {grouped.map((group) => (
                    <section key={group.section} className="rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
                        <h2 className="border-b border-neutral-100 px-5 py-3 text-sm font-bold uppercase tracking-wider text-emerald-800 dark:border-neutral-800 dark:text-emerald-300">
                            {group.label} menu
                        </h2>
                        <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {group.pages.map((page) => (
                                <li key={page.key} className="flex items-center justify-between gap-3 px-5 py-3">
                                    <Link href={`/admin/site-pages/${page.key}`} className="flex min-w-0 items-center gap-3 hover:text-emerald-700">
                                        <FileText className="h-4 w-4 flex-shrink-0 text-emerald-600" />
                                        <span className="truncate text-sm font-semibold">{page.title}</span>
                                    </Link>
                                    <div className="flex flex-shrink-0 items-center gap-3 text-xs">
                                        {page.updated_at && <span className="hidden text-neutral-400 sm:inline">Updated {new Date(page.updated_at).toLocaleDateString()}</span>}
                                        {publicUrls[page.key] && (
                                            <a href={publicUrls[page.key]} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-neutral-500 hover:text-emerald-700">
                                                <ExternalLink className="h-3.5 w-3.5" /> View
                                            </a>
                                        )}
                                        <Link href={`/admin/site-pages/${page.key}`} className="rounded-lg bg-emerald-600 px-3 py-1.5 font-semibold text-white hover:bg-emerald-700">
                                            Edit
                                        </Link>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>
                ))}

                {grouped.length === 0 && <p className="text-sm text-neutral-500">No pages are assigned to your account.</p>}
            </div>
        </AppLayout>
    );
}
