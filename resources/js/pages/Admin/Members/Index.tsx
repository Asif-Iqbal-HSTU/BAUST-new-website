import React, { useState, useEffect } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { index, create, edit, destroy } from '@/routes/admin/members';
import {
    GripVertical,
    ChevronUp,
    ChevronDown,
    CheckCircle2,
    AlertCircle,
    Loader2,
    Info,
    ArrowUpDown,
    Plus,
} from 'lucide-react';

interface Member {
    id: number;
    name: string;
    designation: string;
    department: string;
    type: string;
    employment_type: string;
    status: string;
    category: string;
    order: number;
    photo: string | null;
}

interface PaginatedMembers {
    data: Member[];
    links: { url: string | null; label: string; active: boolean }[];
    current_page: number;
    last_page: number;
    total: number;
}

interface Props {
    members: PaginatedMembers;
    filters: { department?: string };
    isSingleDept?: boolean;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Manage Members', href: '/admin/members' },
];

export default function Index({ members, filters, isSingleDept }: Props) {
    const { auth, flash } = usePage<SharedData>().props;
    const user = auth.user;

    const [items, setItems] = useState<Member[]>(members.data);
    const [draggedIdx, setDraggedIdx] = useState<number | null>(null);
    const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
    const [isSaving, setIsSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // Keep items in sync when members prop updates (e.g. filter change or pagination)
    useEffect(() => {
        setItems(members.data);
    }, [members.data]);

    const isDeptAdmin = user.role === 'dept_admin' || Boolean(user.department);
    const activeDept = isDeptAdmin ? (user.department || '') : (filters.department || '');
    const canReorder = Boolean(isDeptAdmin || isSingleDept || filters.department);

    const handleDepartmentFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        router.get(
            index().url,
            { department: e.target.value },
            { preserveState: true, replace: true }
        );
    };

    const handleDelete = (id: number, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            router.delete(destroy(id).url);
        }
    };

    const persistReorder = (newItems: Member[]) => {
        setIsSaving(true);
        router.post(
            '/admin/members/reorder',
            { ordered_ids: newItems.map((m) => m.id) },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: () => {
                    setIsSaving(false);
                    setStatusMessage({ type: 'success', text: 'Display order updated successfully!' });
                    setTimeout(() => setStatusMessage(null), 3000);
                },
                onError: () => {
                    setIsSaving(false);
                    setStatusMessage({ type: 'error', text: 'Failed to update order. Please try again.' });
                    setTimeout(() => setStatusMessage(null), 4000);
                },
            }
        );
    };

    const handleDragStart = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
        if (!canReorder) return;
        setDraggedIdx(index);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', String(index));
    };

    const handleDragOver = (e: React.DragEvent<HTMLTableRowElement>, index: number) => {
        if (!canReorder) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if (dragOverIdx !== index) {
            setDragOverIdx(index);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLTableRowElement>, targetIdx: number) => {
        if (!canReorder) return;
        e.preventDefault();
        if (draggedIdx === null || draggedIdx === targetIdx) {
            setDraggedIdx(null);
            setDragOverIdx(null);
            return;
        }

        const newItems = [...items];
        const [moved] = newItems.splice(draggedIdx, 1);
        newItems.splice(targetIdx, 0, moved);

        // Update local order numbers sequentially
        const updated = newItems.map((item, idx) => ({
            ...item,
            order: idx + 1,
        }));

        setItems(updated);
        setDraggedIdx(null);
        setDragOverIdx(null);
        persistReorder(updated);
    };

    const handleDragEnd = () => {
        setDraggedIdx(null);
        setDragOverIdx(null);
    };

    const handleMove = (index: number, direction: 'up' | 'down') => {
        const targetIdx = direction === 'up' ? index - 1 : index + 1;
        if (targetIdx < 0 || targetIdx >= items.length) return;

        const newItems = [...items];
        const [moved] = newItems.splice(index, 1);
        newItems.splice(targetIdx, 0, moved);

        const updated = newItems.map((item, idx) => ({
            ...item,
            order: idx + 1,
        }));

        setItems(updated);
        persistReorder(updated);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Members" />

            <div className="p-6 max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Department Members</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Manage directory information and customize the public display sequence of department faculty and staff.
                        </p>
                    </div>

                    <Link
                        href={create()}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm rounded-xl transition-all shadow-sm hover:shadow-md cursor-pointer"
                    >
                        <Plus className="w-4 h-4" />
                        Add Member
                    </Link>
                </div>

                {/* Flash Messages */}
                {flash?.success && (
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-xs animate-in fade-in duration-200">
                        <div className="flex items-center gap-2.5">
                            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                            <span>{flash.success}</span>
                        </div>
                    </div>
                )}
                {flash?.error && (
                    <div className="p-4 rounded-2xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-200 text-xs sm:text-sm font-semibold flex items-center justify-between gap-3 shadow-xs animate-in fade-in duration-200">
                        <div className="flex items-center gap-2.5">
                            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                            <span>{flash.error}</span>
                        </div>
                    </div>
                )}

                {/* Status / Alert Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-xs">
                    <div className="flex items-center gap-2.5 text-xs text-gray-600 dark:text-gray-300">
                        <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
                            <ArrowUpDown className="w-4 h-4" />
                        </div>
                        <div>
                            {canReorder ? (
                                <span>
                                    <strong className="text-gray-900 dark:text-white font-semibold">Drag & Drop Ordering Enabled: </strong>
                                    Grab any member row by the handle <span className="font-mono bg-gray-100 dark:bg-neutral-800 px-1.5 py-0.5 rounded text-gray-800 dark:text-gray-200">⠿</span> or use the <span className="font-semibold">↑ ↓</span> buttons to reorder. Changes apply immediately to the website.
                                </span>
                            ) : (
                                <span>
                                    <strong className="text-gray-900 dark:text-white font-semibold">Tip: </strong>
                                    Select a specific department in the filter below to drag and drop reorder members within that department.
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                        {isSaving && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-800 animate-pulse">
                                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" />
                                Saving...
                            </span>
                        )}
                        {statusMessage && (
                            <span
                                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                                    statusMessage.type === 'success'
                                        ? 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700'
                                        : 'bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700'
                                }`}
                            >
                                {statusMessage.type === 'success' ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                                ) : (
                                    <AlertCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                                )}
                                {statusMessage.text}
                            </span>
                        )}
                    </div>
                </div>

                {user.role === 'super_admin' ? (
                    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <label htmlFor="dept-filter" className="text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                                Department:
                            </label>
                            <select
                                id="dept-filter"
                                value={filters.department || ''}
                                onChange={handleDepartmentFilterChange}
                                className="text-sm rounded-xl border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white py-2 px-3.5 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                            >
                                <option value="">All Departments (Select to Reorder)</option>
                                <option value="cse">Computer Science and Engineering (CSE)</option>
                                <option value="eee">Electrical and Electronic Engineering (EEE)</option>
                                <option value="ict">Information and Communication Technology (ICT)</option>
                                <option value="me">Mechanical Engineering (ME)</option>
                                <option value="ipe">Industrial and Production Engineering (IPE)</option>
                                <option value="ce">Civil Engineering (CE)</option>
                                <option value="dba">Business Administration (DBA)</option>
                                <option value="ais">Accounting & Information Systems (AIS)</option>
                                <option value="eng">English (ENG)</option>
                                <option value="as">Arts & Sciences (AS)</option>
                                <option value="mba">MBA Program</option>
                            </select>
                        </div>

                        {filters.department && (
                            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                Viewing {items.length} {filters.department.toUpperCase()} Members
                            </span>
                        )}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl p-4 shadow-xs flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Department:</span>
                            <span className="font-bold text-emerald-600 uppercase">
                                {user.department ? `${user.department.toUpperCase()} Department` : 'Your Department'}
                            </span>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                            {items.length} Members
                        </span>
                    </div>
                )}

                {/* Table */}
                <div className="bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-neutral-800 bg-gray-50/75 dark:bg-neutral-800/60 text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    {canReorder && <th className="py-3.5 px-3 w-12 text-center">Move</th>}
                                    <th className="py-3.5 px-4 w-16 text-center">Order</th>
                                    <th className="py-3.5 px-6">Member</th>
                                    <th className="py-3.5 px-6">Department</th>
                                    <th className="py-3.5 px-6">Type / Category</th>
                                    <th className="py-3.5 px-6 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-neutral-800/80 text-sm text-gray-700 dark:text-gray-300">
                                {items.length > 0 ? (
                                    items.map((member, index) => {
                                        const isDragging = draggedIdx === index;
                                        const isOver = dragOverIdx === index && draggedIdx !== index;

                                        return (
                                            <tr
                                                key={member.id}
                                                draggable={canReorder}
                                                onDragStart={(e) => handleDragStart(e, index)}
                                                onDragOver={(e) => handleDragOver(e, index)}
                                                onDrop={(e) => handleDrop(e, index)}
                                                onDragEnd={handleDragEnd}
                                                className={`
                                                    transition-colors duration-150
                                                    ${isDragging ? 'opacity-30 bg-emerald-50/70 dark:bg-emerald-950/40' : 'hover:bg-gray-50/70 dark:hover:bg-neutral-800/40'}
                                                    ${isOver ? 'border-t-2 border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30' : ''}
                                                `}
                                            >
                                                {/* Drag Handle & Quick Move Buttons */}
                                                {canReorder && (
                                                    <td className="py-3.5 px-2 text-center whitespace-nowrap">
                                                        <div className="flex items-center justify-center gap-1">
                                                            <button
                                                                type="button"
                                                                className="p-1 cursor-grab active:cursor-grabbing text-gray-400 hover:text-emerald-600 transition-colors rounded hover:bg-gray-100 dark:hover:bg-neutral-800"
                                                                title="Drag up or down to reorder"
                                                            >
                                                                <GripVertical className="w-4 h-4" />
                                                            </button>
                                                            <div className="flex flex-col">
                                                                <button
                                                                    type="button"
                                                                    disabled={index === 0}
                                                                    onClick={() => handleMove(index, 'up')}
                                                                    className={`p-0.5 rounded text-gray-400 hover:text-emerald-600 transition-colors ${index === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer'}`}
                                                                    title="Move Up"
                                                                >
                                                                    <ChevronUp className="w-3 h-3" />
                                                                </button>
                                                                <button
                                                                    type="button"
                                                                    disabled={index === items.length - 1}
                                                                    onClick={() => handleMove(index, 'down')}
                                                                    className={`p-0.5 rounded text-gray-400 hover:text-emerald-600 transition-colors ${index === items.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-neutral-800 cursor-pointer'}`}
                                                                    title="Move Down"
                                                                >
                                                                    <ChevronDown className="w-3 h-3" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                )}

                                                {/* Sequence Order Number Badge */}
                                                <td className="py-3.5 px-4 text-center">
                                                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-gray-100 dark:bg-neutral-800 text-xs font-extrabold text-gray-700 dark:text-gray-300 border border-gray-200/80 dark:border-neutral-700">
                                                        {member.order}
                                                    </span>
                                                </td>

                                                {/* Member Info */}
                                                <td className="py-3.5 px-6">
                                                    <div className="flex items-center gap-3.5">
                                                        <img
                                                            src={member.photo || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=40`}
                                                            alt={member.name}
                                                            className="w-10 h-10 rounded-xl object-cover object-top shadow-xs bg-gray-100 dark:bg-neutral-800 border border-gray-100 dark:border-neutral-700"
                                                            onError={(e) => {
                                                                e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=059669&color=fff&size=40`;
                                                            }}
                                                        />
                                                        <div className="min-w-0">
                                                            <p className="font-bold text-gray-900 dark:text-white leading-snug truncate">{member.name}</p>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-snug truncate">{member.designation}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Department */}
                                                <td className="py-3.5 px-6">
                                                    <span className="uppercase inline-block bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 text-xs font-extrabold px-2.5 py-0.5 rounded-full border border-emerald-100/60 dark:border-emerald-900/40">
                                                        {member.department}
                                                    </span>
                                                </td>

                                                {/* Type / Category & Status */}
                                                <td className="py-3.5 px-6">
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-1.5 flex-wrap">
                                                            <span className="capitalize text-xs font-semibold text-gray-700 dark:text-gray-300">{member.employment_type === 'staff' ? 'Staff' : 'Faculty'}</span>
                                                            <span className="text-[11px] text-gray-400 italic capitalize">({member.type})</span>
                                                            {member.category && (
                                                                <span className="text-[11px] text-gray-400 italic capitalize">({member.category.replace('_', ' ')})</span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            {member.status === 'study_leave' ? (
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                                                    On Study Leave
                                                                </span>
                                                            ) : member.status === 'ex_faculty' ? (
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-neutral-800 text-slate-700 dark:text-neutral-300 border border-slate-300 dark:border-neutral-700">
                                                                    Ex-Member
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                                                    Active
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Actions */}
                                                <td className="py-3.5 px-6 text-right space-x-3 whitespace-nowrap">
                                                    <Link
                                                        href={edit(member.id)}
                                                        className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 hover:underline"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(member.id, member.name)}
                                                        className="text-xs font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:underline cursor-pointer"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan={canReorder ? 6 : 5} className="py-12 text-center text-gray-400">
                                            No department members found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination (shown if multiple pages exist) */}
                    {members.links && members.links.length > 3 && (
                        <div className="border-t border-gray-100 dark:border-neutral-800 p-4 bg-gray-50/50 dark:bg-neutral-850/30 flex items-center justify-center gap-1.5 flex-wrap">
                            {members.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url || '#'}
                                    disabled={!link.url}
                                    className={`
                                        px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                                        ${link.active
                                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                                            : 'bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50'
                                        }
                                        ${!link.url ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}
                                    `}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
