import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { update, store, index } from '@/routes/admin/faculties';
import { ArrowLeft, Save, Building2, FileText, Phone } from 'lucide-react';

interface DeptItem {
    slug: string;
    name: string;
    short_name: string;
}

interface Faculty {
    id: number;
    slug: string;
    office_name: string;
    office_subtitle: string | null;
    code: string;
    name: string;
    title: string | null;
    tagline: string | null;
    about: string | null;
    location: string | null;
    phone: string | null;
    email: string | null;
    department_slugs: string[] | null;
    order: number | null;
}

interface Props {
    faculty: Faculty | null;
    departments: DeptItem[];
    /** Super admin only: URL slug, department list and the faculties index. Focal points edit the page content. */
    canEditStructure?: boolean;
}

export default function Form({ faculty, departments = [], canEditStructure = true }: Props) {
    const isEdit = !!faculty;
    const backHref = canEditStructure ? index().url : '/dashboard';

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        ...(canEditStructure ? [{ title: "Dean's Offices / Faculties", href: index().url }] : []),
        { title: isEdit ? (canEditStructure ? 'Edit Faculty' : `${faculty?.code ?? ''} Dean's Page`) : 'Add Faculty', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'PUT' : 'POST',
        slug: faculty?.slug || '',
        office_name: faculty?.office_name || '',
        office_subtitle: faculty?.office_subtitle || '',
        code: faculty?.code || '',
        name: faculty?.name || '',
        title: faculty?.title || '',
        tagline: faculty?.tagline || '',
        about: faculty?.about || '',
        location: faculty?.location || '',
        phone: faculty?.phone || '',
        email: faculty?.email || '',
        department_slugs: faculty?.department_slugs || ([] as string[]),
        order: faculty?.order ?? null,
    });

    const toggleDepartment = (slug: string) => {
        const next = [...data.department_slugs];
        const idx = next.indexOf(slug);
        if (idx > -1) {
            next.splice(idx, 1);
        } else {
            next.push(slug);
        }
        setData('department_slugs', next);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            post(update(faculty.id).url);
        } else {
            post(store().url);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? `Edit Faculty - ${faculty.name}` : 'Add Faculty'} />

            <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200 dark:border-neutral-800">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {isEdit ? 'Edit Faculty' : 'Add New Faculty'}
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            Configure the Dean's Office page content shown at its public URL.
                        </p>
                    </div>
                    <Link
                        href={backHref}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors shadow-xs"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        <span>{canEditStructure ? 'Back to Faculties' : 'Back to Dashboard'}</span>
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* SECTION 1: Identity */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                <Building2 className="w-4 h-4" />
                            </div>
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">1. Identity</h2>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Faculty Code <span className="text-emerald-600">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. FME"
                                        value={data.code}
                                        onChange={e => setData('code', e.target.value.toUpperCase())}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                        required
                                    />
                                    {errors.code && <p className="text-xs text-red-500 font-semibold">{errors.code}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        URL Slug <span className="text-gray-400 normal-case font-medium">(short public URL, e.g. /fme)</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Auto-generated from code if left blank"
                                        value={data.slug}
                                        onChange={e => setData('slug', e.target.value.toLowerCase())}
                                        disabled={!canEditStructure}
                                        className="disabled:cursor-not-allowed disabled:opacity-60 w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                    {errors.slug && <p className="text-xs text-red-500 font-semibold">{errors.slug}</p>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                    Faculty Name <span className="text-emerald-600">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Faculty of Mechanical Engineering"
                                    value={data.name}
                                    onChange={e => setData('name', e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    required
                                />
                                {errors.name && <p className="text-xs text-red-500 font-semibold">{errors.name}</p>}
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Office Name <span className="text-gray-400 normal-case font-medium">(offices catalog / page title)</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. FME Dean's Office"
                                        value={data.office_name}
                                        onChange={e => setData('office_name', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                        required
                                    />
                                    {errors.office_name && <p className="text-xs text-red-500 font-semibold">{errors.office_name}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">Office Subtitle</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Faculty of Mechanical Engineering"
                                        value={data.office_subtitle}
                                        onChange={e => setData('office_subtitle', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                        Page Title <span className="text-gray-400 normal-case font-medium">(Dean's Office page heading)</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. FME Dean's Office"
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                    />
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* SECTION 2: Page Content */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                <FileText className="w-4 h-4" />
                            </div>
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">2. Page Content</h2>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">Tagline</label>
                                <textarea
                                    value={data.tagline}
                                    onChange={e => setData('tagline', e.target.value)}
                                    rows={2}
                                    className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-y"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">About</label>
                                <textarea
                                    value={data.about}
                                    onChange={e => setData('about', e.target.value)}
                                    rows={5}
                                    className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-y"
                                />
                            </div>

                            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-neutral-800">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">
                                    Departments Under This Faculty
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {departments.map(d => {
                                        const isSelected = data.department_slugs.includes(d.slug);
                                        return (
                                            <button
                                                key={d.slug}
                                                type="button"
                                                onClick={() => toggleDepartment(d.slug)}
                                                disabled={!canEditStructure}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
                                                    isSelected
                                                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                                                        : 'bg-white dark:bg-neutral-900 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-neutral-700 hover:border-gray-400'
                                                }`}
                                            >
                                                <span>{d.short_name || d.name} ({d.slug.toUpperCase()})</span>
                                                {isSelected && <span className="text-[10px]">✓</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                                {!canEditStructure && <p className="text-[11px] text-gray-400">The URL and the department list are set by the super admin.</p>}
                                {errors.department_slugs && <p className="text-xs text-red-500 font-semibold">{errors.department_slugs}</p>}
                            </div>
                        </div>
                    </div>

                    {/* SECTION 3: Contact */}
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                <Phone className="w-4 h-4" />
                            </div>
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">3. Contact</h2>
                        </div>

                        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5 sm:col-span-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">Location</label>
                                <input
                                    type="text"
                                    value={data.location}
                                    onChange={e => setData('location', e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">Phone</label>
                                <input
                                    type="text"
                                    value={data.phone}
                                    onChange={e => setData('phone', e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300">Email</label>
                                <input
                                    type="email"
                                    value={data.email}
                                    onChange={e => setData('email', e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Action Bar */}
                    <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-gray-300 dark:border-neutral-800 shadow-xl flex items-center justify-end gap-3">
                        <Link
                            href={backHref}
                            className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
                        >
                            Cancel
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer"
                        >
                            <Save className="w-4 h-4" />
                            <span>{processing ? 'Saving...' : isEdit ? 'Update Faculty' : 'Create Faculty'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
