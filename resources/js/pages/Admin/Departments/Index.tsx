import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Dept { id: number; slug: string; name: string; short_name: string; faculty: string | null }

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Departments', href: '/admin/departments' },
];

export default function Index({ departments }: { departments: Dept[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Departments" />
            <div className="mx-auto w-full max-w-4xl p-4 md:p-6">
                <h1 className="mb-2 text-2xl font-black text-emerald-800 dark:text-emerald-300">Departments</h1>
                <p className="mb-6 text-sm text-neutral-500">Edit each department's profile, slider, stats and highlights. Changes go live immediately.</p>
                <div className="grid gap-3 sm:grid-cols-2">
                    {departments.map((d) => (
                        <Link
                            key={d.id}
                            href={`/admin/departments/${d.slug}`}
                            className="flex items-center justify-between rounded-xl border border-neutral-200 bg-white p-4 transition-colors hover:border-emerald-400 dark:border-neutral-800 dark:bg-neutral-900"
                        >
                            <div>
                                <div className="font-bold text-emerald-900 dark:text-emerald-200">{d.short_name}</div>
                                <div className="text-sm text-neutral-500">{d.name}</div>
                            </div>
                            <span className="text-xs font-semibold text-neutral-400">{d.faculty}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
