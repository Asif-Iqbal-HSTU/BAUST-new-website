import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import ReorderHandle, { reorderRowClass } from '@/components/reorder-handle';
import { useDragReorder } from '@/hooks/use-drag-reorder';
import { type BreadcrumbItem } from '@/types';
import { index, create, edit, destroy } from '@/routes/admin/faculties';
import { manage as manageOffice } from '@/routes/admin/offices';

interface FacultyRow {
    id: number;
    slug: string;
    code: string;
    name: string;
    office_name: string;
    department_count: number;
    member_count: number;
}

interface Props {
    faculties: FacultyRow[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: "Dean's Offices / Faculties", href: index().url },
];

export default function Index({ faculties }: Props) {
    const reorder = useDragReorder(faculties, '/admin/faculties/reorder');
    const handleDelete = (id: number, name: string) => {
        if (confirm(`Delete "${name}"? This also removes its Dean's Office member list (Dean, Coordinator, staff). This cannot be undone.`)) {
            router.delete(destroy(id).url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Faculties / Dean's Offices" />

            <div className="p-6 max-w-6xl mx-auto space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Faculties & Dean's Offices</h1>
                        <p className="text-sm text-gray-500">
                            Create, edit, or remove faculties (e.g. FME, FECE) and manage each Dean's Office page content. Drag rows by the handle (or use ↑ ↓) to change their order.
                        </p>
                    </div>

                    <Link
                        href={create()}
                        className="inline-flex items-center justify-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-lg transition-colors shadow-sm"
                    >
                        Add Faculty
                    </Link>
                </div>

                <div className="bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-100 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-850 text-xs font-bold text-gray-500 uppercase tracking-wider">
                                    <th className="py-3 px-2 w-12"></th>
                                    <th className="py-3 px-6">Code</th>
                                    <th className="py-3 px-6">Faculty Name</th>
                                    <th className="py-3 px-6">Departments</th>
                                    <th className="py-3 px-6">Office Members</th>
                                    <th className="py-3 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-neutral-800 text-sm text-gray-700 dark:text-gray-300">
                                {faculties.length > 0 ? (
                                    reorder.items.map((f, idx) => (
                                        <tr
                                            key={f.id}
                                            {...reorder.rowProps(idx)}
                                            className={`hover:bg-gray-50/50 dark:hover:bg-neutral-850/50 transition-colors ${reorderRowClass(reorder.isDragging(idx), reorder.isOver(idx))}`}
                                        >
                                            <td className="py-4 px-2">
                                                <ReorderHandle index={idx} count={reorder.items.length} onUp={() => reorder.moveUp(idx)} onDown={() => reorder.moveDown(idx)} />
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="uppercase inline-block bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-0.5 rounded">
                                                    {f.code}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <p className="font-bold text-gray-900 dark:text-white leading-snug">{f.name}</p>
                                                <p className="text-xs text-gray-400">/{f.slug} &middot; {f.office_name}</p>
                                            </td>
                                            <td className="py-4 px-6 text-gray-500">{f.department_count}</td>
                                            <td className="py-4 px-6 text-gray-500">{f.member_count}</td>
                                            <td className="py-4 px-6 text-right space-x-3 whitespace-nowrap">
                                                <Link
                                                    href={manageOffice(f.slug)}
                                                    className="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline"
                                                >
                                                    Manage Members
                                                </Link>
                                                <Link
                                                    href={edit(f.id)}
                                                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 hover:underline"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(f.id, f.name)}
                                                    className="text-xs font-bold text-red-600 hover:text-red-700 hover:underline cursor-pointer"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="py-8 text-center text-gray-400">
                                            No faculties found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
