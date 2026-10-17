import React, { useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { update, store, index } from '@/routes/admin/notices';
import RichTextEditor from '@/custom_components/RichTextEditor';
import {
    Bell,
    FileText,
    Paperclip,
    Pin,
    CheckCircle2,
    ArrowLeft,
    Save,
    Calendar,
    Building2,
    Trash2,
    Tag,
    Eye,
    Newspaper,
    Plus,
} from 'lucide-react';

interface Category {
    id: number;
    name: string;
    slug: string;
}

interface PressCoverage {
    id?: number;
    newspaper_name: string;
    url: string;
    published_date: string | null;
    hardcopy_archive_page: string;
    remarks: string;
    clipping_file: File | null;
    existing_clipping_file?: string | null;
}

interface Notice {
    id: number;
    title: string;
    content: string | null;
    excerpt: string | null;
    department: string | null;
    location: string | null;
    chief_guest: string | null;
    special_guests: string | null;
    chairperson: string | null;
    press_release_no: string | null;
    is_pinned: boolean;
    is_active: boolean;
    published_at: string;
    attachment: string | null;
    categories: Category[];
    press_coverages?: Array<{
        id: number;
        newspaper_name: string;
        url: string | null;
        clipping_file: string | null;
        published_date: string | null;
        hardcopy_archive_page: string | null;
        remarks: string | null;
    }>;
}

interface DeptItem {
    slug: string;
    name: string;
    short_name: string;
}

interface Props {
    notice: Notice | null;
    categories: Category[];
    departments: (string | DeptItem)[];
    prCategorySlugs?: string[];
    canPickDepartment?: boolean;
}

export default function Form({ notice, categories = [], departments = [], prCategorySlugs = ['news-events', 'upcoming-events', 'achievements', 'conference-workshops'], canPickDepartment = false }: Props) {
    const isEdit = !!notice;
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const isPro = (user as { role?: string })?.role === 'pro';
    const showDepartmentPicker = user.role === 'super_admin' || canPickDepartment;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Manage Notices', href: '/admin/notices' },
        { title: isEdit ? 'Edit Notice' : 'Add Notice', href: '#' },
    ];

    const formatDateTimeLocal = (dateStr: string | null) => {
        if (!dateStr) return new Date().toISOString().slice(0, 16);
        const date = new Date(dateStr);
        const tzOffset = date.getTimezoneOffset() * 60000;
        return new Date(date.getTime() - tzOffset).toISOString().slice(0, 16);
    };

    interface FormState {
        _method: string;
        title: string;
        content: string;
        excerpt: string;
        department: string | null;
        location: string;
        chief_guest: string;
        special_guests: string;
        chairperson: string;
        press_release_no: string;
        is_pinned: boolean;
        is_active: boolean;
        published_at: string;
        category_ids: number[];
        attachment_file: File | null;
        attachment_url: string;
        clear_attachment: boolean;
        coverages: PressCoverage[];
    }

    const defaultDepartment = isPro ? (notice?.department ?? null) : (notice?.department || (user as any)?.department || 'cse');

    const { data, setData, post, processing, errors } = useForm<FormState>({
        _method: isEdit ? 'PUT' : 'POST',
        title: notice?.title || '',
        content: notice?.content || '',
        excerpt: notice?.excerpt || '',
        department: defaultDepartment as string | null,
        location: notice?.location || '',
        chief_guest: notice?.chief_guest || '',
        special_guests: notice?.special_guests || '',
        chairperson: notice?.chairperson || '',
        press_release_no: notice?.press_release_no || '',
        is_pinned: notice?.is_pinned || false,
        is_active: notice?.is_active !== undefined ? notice.is_active : true,
        published_at: formatDateTimeLocal(notice?.published_at || null),
        category_ids: notice?.categories.map(c => c.id) || [] as number[],
        attachment_file: null as File | null,
        attachment_url: notice?.attachment && !notice.attachment.startsWith('/storage/') ? notice.attachment : '',
        clear_attachment: false,
        coverages: notice?.press_coverages?.map(c => ({
            newspaper_name: c.newspaper_name,
            url: c.url || '',
            published_date: c.published_date ? c.published_date.slice(0, 10) : '',
            hardcopy_archive_page: c.hardcopy_archive_page || '',
            remarks: c.remarks || '',
            clipping_file: null,
            existing_clipping_file: c.clipping_file,
        })) || [],
    });

    const addCoverage = () => {
        setData('coverages', [...data.coverages, { newspaper_name: '', url: '', published_date: '', hardcopy_archive_page: '', remarks: '', clipping_file: null, existing_clipping_file: null }]);
    };

    const updateCoverage = (idx: number, field: keyof PressCoverage, value: string | File | null) => {
        const next = [...data.coverages];
        next[idx] = { ...next[idx], [field]: value };
        setData('coverages', next);
    };

    const removeCoverage = (idx: number) => {
        setData('coverages', data.coverages.filter((_, i) => i !== idx));
    };

    const [attachmentName, setAttachmentName] = useState<string | null>(
        notice?.attachment ? notice.attachment.split('/').pop() || 'Attachment' : null
    );

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setData('attachment_file', file);
        if (file) {
            setData('attachment_url', '');
            setData('clear_attachment', false);
            setAttachmentName(file.name);
        }
    };

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setData('attachment_url', val);
        if (val) {
            setData('attachment_file', null);
            setData('clear_attachment', false);
            setAttachmentName(val.split('/').pop() || 'Attachment URL');
        }
    };

    const handleClearAttachment = () => {
        setData('clear_attachment', true);
        setData('attachment_file', null);
        setData('attachment_url', '');
        setAttachmentName(null);
    };

    const handleCategoryToggle = (id: number) => {
        const ids = [...data.category_ids];
        const idx = ids.indexOf(id);
        if (idx > -1) {
            ids.splice(idx, 1);
        } else {
            ids.push(id);
        }
        setData('category_ids', ids);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            post(update(notice.id).url);
        } else {
            post(store().url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? `Edit Notice - ${notice.title}` : 'Add Notice - Official Announcements'} />

            <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
                {/* Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200 dark:border-neutral-800">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                                {isEdit ? 'Announcement Editor' : 'Publish Announcement'}
                            </span>
                            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                Scope: {data.department ? data.department.toUpperCase() : 'ALL BAUST'}
                            </span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {isEdit ? 'Edit Notice' : 'Post New Notice'}
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            Publish official announcements, academic circulars, exam schedules, and events.
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Link
                            href={index()}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors shadow-xs"
                        >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back to Notices</span>
                        </Link>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* SECTION 1: Announcement Header */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                    <Bell className="w-4 h-4" />
                                </div>
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                    1. Announcement Header & Schedule
                                </h2>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">Primary Info</span>
                        </div>

                        <div className="p-6 space-y-5">
                            {/* Title */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                    Notice Title <span className="text-emerald-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Final Examination Schedule & Routine Summer 2026"
                                    value={data.title}
                                    onChange={e => setData('title', e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                    required
                                />
                                {errors.title && <p className="text-xs text-red-500 font-semibold">{errors.title}</p>}
                            </div>

                            {/* Summary / Excerpt */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                    Short Summary / Card Excerpt
                                </label>
                                <textarea
                                    placeholder="A concise 1-2 sentence preview displayed on homepage cards and notice feeds..."
                                    value={data.excerpt}
                                    onChange={e => setData('excerpt', e.target.value)}
                                    rows={2}
                                    className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors resize-y"
                                />
                                {errors.excerpt && <p className="text-xs text-red-500 font-semibold">{errors.excerpt}</p>}
                            </div>

                            {/* Published At Date Picker */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Publication Timestamp <span className="text-emerald-600">*</span>
                                    </label>
                                    <div className="relative">
                                        <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                                        <input
                                            type="datetime-local"
                                            value={data.published_at}
                                            onChange={e => setData('published_at', e.target.value)}
                                            className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white pl-10 pr-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                            required
                                        />
                                    </div>
                                    {errors.published_at && <p className="text-xs text-red-500 font-semibold">{errors.published_at}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Press Release No. <span className="text-gray-400 normal-case font-medium">(optional, for the archive register)</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. PR-2026-014"
                                        value={data.press_release_no}
                                        onChange={e => setData('press_release_no', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                    />
                                    {errors.press_release_no && <p className="text-xs text-red-500 font-semibold">{errors.press_release_no}</p>}
                                </div>
                            </div>

                            {/* Press Release Format Fields (policy §3.6) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-gray-100 dark:border-neutral-800">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">Location</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. BAUST Auditorium, Saidpur"
                                        value={data.location}
                                        onChange={e => setData('location', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">Chief Guest</label>
                                    <input
                                        type="text"
                                        value={data.chief_guest}
                                        onChange={e => setData('chief_guest', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">Special Guest(s)</label>
                                    <input
                                        type="text"
                                        value={data.special_guests}
                                        onChange={e => setData('special_guests', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">Chairperson</label>
                                    <input
                                        type="text"
                                        value={data.chairperson}
                                        onChange={e => setData('chairperson', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Scope, Categories & Visibility */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                    <Building2 className="w-4 h-4" />
                                </div>
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                    2. Department Scope & Classification
                                </h2>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">Audience & Filters</span>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                {/* Department Scope */}
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Department Audience
                                    </label>
                                    {showDepartmentPicker ? (
                                        <select
                                            value={data.department || ''}
                                            onChange={e => setData('department', e.target.value || null)}
                                            className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                        >
                                            <option value="">Global (All BAUST University)</option>
                                            {departments.map((d, idx) => {
                                                const slug = typeof d === 'string' ? d : d.slug;
                                                const label = typeof d === 'string' ? d.toUpperCase() : (d.short_name || d.name || d.slug.toUpperCase());
                                                return (
                                                    <option key={slug || idx} value={slug}>
                                                        {label} ({slug.toUpperCase()})
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={data.department ? data.department.toUpperCase() : ''}
                                            disabled
                                            className="w-full rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-100 dark:bg-neutral-800 text-sm text-gray-500 px-3.5 py-2.5 cursor-not-allowed"
                                        />
                                    )}
                                    {errors.department && <p className="text-xs text-red-500 font-semibold">{errors.department}</p>}
                                </div>

                                {/* Visibility Flags (Pinned & Active) */}
                                <div className="grid grid-cols-2 gap-3 pt-4">
                                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-gray-50/50 dark:bg-neutral-950/40 cursor-pointer hover:bg-gray-100/50 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={data.is_pinned}
                                            onChange={e => setData('is_pinned', e.target.checked)}
                                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
                                        />
                                        <div>
                                            <div className="text-xs font-bold text-gray-800 dark:text-gray-200">Pin Notice</div>
                                            <p className="text-[10px] text-gray-400">Keep at top of notice list</p>
                                        </div>
                                    </label>

                                    <label className="flex items-center gap-2.5 p-3 rounded-xl border border-gray-300 dark:border-neutral-700 bg-gray-50/50 dark:bg-neutral-950/40 cursor-pointer hover:bg-gray-100/50 transition-colors">
                                        <input
                                            type="checkbox"
                                            checked={data.is_active}
                                            onChange={e => setData('is_active', e.target.checked)}
                                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500 cursor-pointer"
                                        />
                                        <div>
                                            <div className="text-xs font-bold text-gray-800 dark:text-gray-200">Published</div>
                                            <p className="text-[10px] text-gray-400">Visible to public</p>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            {/* Category Tags */}
                            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-neutral-800">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center gap-1.5">
                                    <Tag className="w-3.5 h-3.5 text-gray-400" />
                                    <span>Categories & Tags</span>
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map(cat => {
                                        const isSelected = data.category_ids.includes(cat.id);
                                        const isPrCat = prCategorySlugs.includes(cat.slug);
                                        return (
                                            <button
                                                key={cat.id}
                                                type="button"
                                                onClick={() => handleCategoryToggle(cat.id)}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                                                    isSelected
                                                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                                        : 'bg-white dark:bg-neutral-900 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-neutral-700 hover:border-gray-400'
                                                }`}
                                                title={isPro && isPrCat ? 'Shows on the Public Relations page and department Events page' : undefined}
                                            >
                                                <span>{cat.name}</span>
                                                {isSelected && <span className="text-[10px]">✓</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                                {isPro && data.department && (
                                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold">
                                        Scoping to a department requires a News & Events / Upcoming Events / Achievements / Conferences category, so it appears on that department's Events page.
                                    </p>
                                )}
                                {errors.category_ids && <p className="text-xs text-red-500 font-semibold">{errors.category_ids}</p>}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: Notice Content (Rich Text) */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                    <FileText className="w-4 h-4" />
                                </div>
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                    3. Notice Body & Detailed Content (Rich Text)
                                </h2>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">WYSIWYG Editor</span>
                        </div>

                        <div className="p-6">
                            <RichTextEditor
                                value={data.content || ''}
                                onChange={val => setData('content', val)}
                                label="Detailed Announcement Body"
                                placeholder="Enter full announcement details, schedules, tables, guidelines, and bullet points..."
                                minHeight="260px"
                                helperText="Supports bold, italic, headings, lists, blockquotes, and links for clear communication."
                                error={errors.content}
                            />
                        </div>
                    </div>

                    {/* SECTION 4: File Attachments */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                    <Paperclip className="w-4 h-4" />
                                </div>
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                    4. Document Attachment (PDF, Image)
                                </h2>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">Downloadable Asset</span>
                        </div>

                        <div className="p-6 space-y-4">
                            {attachmentName && (
                                <div className="flex items-center justify-between p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/60 dark:bg-emerald-950/40">
                                    <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-900 dark:text-emerald-300">
                                        <Paperclip className="w-4 h-4 text-emerald-600" />
                                        <span>Current File: {attachmentName}</span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleClearAttachment}
                                        className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Remove</span>
                                    </button>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Upload Attachment File (PDF, DOCX, JPG - Max 20MB)
                                    </label>
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        className="w-full text-xs text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-gray-200 dark:file:border-neutral-700 file:text-xs file:font-bold file:bg-white dark:file:bg-neutral-800 file:text-emerald-700 dark:file:text-emerald-400 hover:file:bg-emerald-50 cursor-pointer"
                                    />
                                    {errors.attachment_file && <p className="text-xs text-red-500 font-semibold">{errors.attachment_file}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Or Direct File URL / Storage Path
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. /storage/notices/exam_schedule.pdf"
                                        value={data.attachment_url}
                                        onChange={handleUrlChange}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors"
                                    />
                                    {errors.attachment_url && <p className="text-xs text-red-500 font-semibold">{errors.attachment_url}</p>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SECTION 5: Newspaper / Press Coverage */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                    <Newspaper className="w-4 h-4" />
                                </div>
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                                    5. Newspaper Coverage
                                </h2>
                            </div>
                            <span className="text-xs text-gray-400 font-medium">Add once covered externally</span>
                        </div>

                        <div className="p-6 space-y-4">
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                Once this story gets picked up by a newspaper, add the paper's name and article link here. You can add several as more coverage comes in.
                            </p>

                            {data.coverages.length > 0 && (
                                <div className="space-y-3">
                                    {data.coverages.map((coverage, idx) => (
                                        <div key={idx} className="p-3.5 rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50/50 dark:bg-neutral-950/40 space-y-2.5">
                                            <div className="grid grid-cols-1 sm:grid-cols-[1fr_1.3fr_auto_auto] gap-3 items-start">
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="Newspaper name"
                                                        value={coverage.newspaper_name}
                                                        onChange={e => updateCoverage(idx, 'newspaper_name', e.target.value)}
                                                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                    />
                                                    {errors[`coverages.${idx}.newspaper_name` as keyof typeof errors] && (
                                                        <p className="text-[11px] text-red-500 font-semibold mt-1">{errors[`coverages.${idx}.newspaper_name` as keyof typeof errors]}</p>
                                                    )}
                                                </div>
                                                <div>
                                                    <input
                                                        type="text"
                                                        placeholder="https://example-daily.com/article/... (or attach clipping below)"
                                                        value={coverage.url}
                                                        onChange={e => updateCoverage(idx, 'url', e.target.value)}
                                                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                    />
                                                    {errors[`coverages.${idx}.url` as keyof typeof errors] && (
                                                        <p className="text-[11px] text-red-500 font-semibold mt-1">{errors[`coverages.${idx}.url` as keyof typeof errors]}</p>
                                                    )}
                                                </div>
                                                <input
                                                    type="date"
                                                    value={coverage.published_date || ''}
                                                    onChange={e => updateCoverage(idx, 'published_date', e.target.value)}
                                                    className="w-full sm:w-auto rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3 py-2 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeCoverage(idx)}
                                                    className="p-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer self-center"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-gray-200/70 dark:border-neutral-800">
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Clipping (PDF/Image)</label>
                                                    {coverage.existing_clipping_file && !coverage.clipping_file && (
                                                        <a href={coverage.existing_clipping_file} target="_blank" rel="noopener noreferrer" className="block text-[11px] text-blue-600 hover:underline mb-1 truncate">
                                                            Current: {coverage.existing_clipping_file.split('/').pop()}
                                                        </a>
                                                    )}
                                                    <input
                                                        type="file"
                                                        accept="application/pdf,image/*"
                                                        onChange={e => updateCoverage(idx, 'clipping_file', e.target.files?.[0] || null)}
                                                        className="w-full text-[11px] text-gray-600 dark:text-gray-400 file:mr-2 file:py-1.5 file:px-2.5 file:rounded-lg file:border file:border-gray-200 dark:file:border-neutral-700 file:text-[11px] file:font-bold file:bg-white dark:file:bg-neutral-800 file:text-emerald-700 dark:file:text-emerald-400 cursor-pointer"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Hardcopy Archive Page</label>
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. Binder 3, p. 42"
                                                        value={coverage.hardcopy_archive_page}
                                                        onChange={e => updateCoverage(idx, 'hardcopy_archive_page', e.target.value)}
                                                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3 py-1.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Preservation Remarks</label>
                                                    <input
                                                        type="text"
                                                        value={coverage.remarks}
                                                        onChange={e => updateCoverage(idx, 'remarks', e.target.value)}
                                                        className="w-full rounded-lg border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3 py-1.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button
                                type="button"
                                onClick={addCoverage}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 transition-colors cursor-pointer"
                            >
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add Newspaper Coverage</span>
                            </button>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-gray-300 dark:border-neutral-800 shadow-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                            <span>Saved notices automatically update department feeds and portals.</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <Link
                                href={index()}
                                className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-emerald-600/20 disabled:opacity-50 cursor-pointer"
                            >
                                <Save className="w-4 h-4" />
                                <span>{processing ? 'Saving Notice...' : isEdit ? 'Update Notice' : 'Publish Notice'}</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
