import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Office { slug: string; name: string; count: number }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Offices', href: '/admin/offices' },
];

export default function Index({ offices }: { offices: Office[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Offices" />
            <div className="mx-auto w-full max-w-4xl p-4 md:p-6">
                <h1 className="mb-2 text-2xl font-black text-emerald-800 dark:text-emerald-300">Administrative Offices</h1>
                <p className="mb-6 text-sm text-neutral-500">Add, edit and reorder the members of each office. Changes go live immediately.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                    {offices.map((o) => (
                        <Link key={o.slug} href={`/admin/offices/${o.slug}`} className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:border-emerald-400 dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="font-bold text-emerald-900 dark:text-emerald-200">{o.name}</div>
                            <span className="text-xs font-semibold text-neutral-400">{o.count} members</span>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
