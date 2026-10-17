import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ArrowLeft, Save, Megaphone, User as UserIcon, ClipboardCheck } from 'lucide-react';

interface MediaRequestDetail {
    id: number;
    event_name: string;
    organizing_unit: string;
    purpose: string | null;
    event_date: string;
    event_time: string | null;
    location: string | null;
    chief_guest: string | null;
    chairperson: string | null;
    expected_participants: number | null;
    contact_name: string;
    contact_designation: string | null;
    contact_mobile: string;
    coverage_press_release: boolean;
    coverage_facebook_post: boolean;
    coverage_media_send: boolean;
    coverage_other: string | null;
    special_instructions: string | null;
    status: string;
    receive_no: string | null;
    pr_remarks: string | null;
    notice_id: number | null;
    submitted_by?: { id: number; name: string; department: string | null } | null;
    handled_by?: { id: number; name: string } | null;
    notice?: { id: number; title: string; slug: string } | null;
}

interface NoticeOption {
    id: number;
    title: string;
    slug: string;
}

interface Props {
    mediaRequest: MediaRequestDetail | null;
    isManager: boolean;
    canEditBase?: boolean;
    defaultOrganizingUnit?: string | null;
    prWorthyNotices?: NoticeOption[];
}

const STATUS_OPTIONS = ['pending', 'received', 'in_progress', 'completed', 'declined'];

export default function Form({ mediaRequest, isManager, canEditBase = true, defaultOrganizingUnit, prWorthyNotices = [] }: Props) {
    const isEdit = !!mediaRequest;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: '/dashboard' },
        { title: 'Media Coverage Requests', href: '/admin/media-requests' },
        { title: isEdit ? 'Manage Request' : 'New Request', href: '#' },
    ];

    const { data, setData, post, processing, errors } = useForm({
        _method: isEdit ? 'PUT' : 'POST',
        event_name: mediaRequest?.event_name || '',
        organizing_unit: mediaRequest?.organizing_unit || defaultOrganizingUnit || '',
        purpose: mediaRequest?.purpose || '',
        event_date: mediaRequest?.event_date ? mediaRequest.event_date.slice(0, 10) : '',
        event_time: mediaRequest?.event_time || '',
        location: mediaRequest?.location || '',
        chief_guest: mediaRequest?.chief_guest || '',
        chairperson: mediaRequest?.chairperson || '',
        expected_participants: mediaRequest?.expected_participants?.toString() || '',
        contact_name: mediaRequest?.contact_name || '',
        contact_designation: mediaRequest?.contact_designation || '',
        contact_mobile: mediaRequest?.contact_mobile || '',
        coverage_press_release: mediaRequest?.coverage_press_release || false,
        coverage_facebook_post: mediaRequest?.coverage_facebook_post || false,
        coverage_media_send: mediaRequest?.coverage_media_send || false,
        coverage_other: mediaRequest?.coverage_other || '',
        special_instructions: mediaRequest?.special_instructions || '',
        // PR office use only
        status: mediaRequest?.status || 'pending',
        receive_no: mediaRequest?.receive_no || '',
        pr_remarks: mediaRequest?.pr_remarks || '',
        notice_id: mediaRequest?.notice_id?.toString() || '',
    });

    const readOnly = isEdit && !canEditBase && !isManager;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            post(`/admin/media-requests/${mediaRequest.id}`);
        } else {
            post('/admin/media-requests');
        }
    };

    const inputCls = 'w-full rounded-xl border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-sm text-gray-900 dark:text-white px-3.5 py-2.5 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 shadow-xs transition-colors disabled:bg-gray-50 disabled:text-gray-400 dark:disabled:bg-neutral-950 disabled:cursor-not-allowed';
    const labelCls = 'text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? `Media Request - ${mediaRequest.event_name}` : 'New Media Coverage Request'} />

            <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-gray-200 dark:border-neutral-800">
                    <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                            Media Coverage Requisition
                        </span>
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-1">
                            {isEdit ? mediaRequest.event_name : 'Request PR Office Coverage'}
                        </h1>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                            Submit at least 3 working days before the event, per the Media Coverage & Archive Policy (Appendix A).
                        </p>
                    </div>
                    <Link
                        href="/admin/media-requests"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-700 transition-colors shadow-xs"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back
                    </Link>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                <Megaphone className="w-4 h-4" />
                            </div>
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">1. Event Details</h2>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div className="space-y-1.5">
                                    <label className={labelCls}>Event Name *</label>
                                    <input type="text" value={data.event_name} onChange={e => setData('event_name', e.target.value)} disabled={readOnly} className={inputCls} required />
                                    {errors.event_name && <p className="text-xs text-red-500 font-semibold">{errors.event_name}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className={labelCls}>Organizing Department/Office *</label>
                                    <input type="text" value={data.organizing_unit} onChange={e => setData('organizing_unit', e.target.value)} disabled={readOnly} className={inputCls} required />
                                    {errors.organizing_unit && <p className="text-xs text-red-500 font-semibold">{errors.organizing_unit}</p>}
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className={labelCls}>Purpose (brief)</label>
                                <textarea value={data.purpose} onChange={e => setData('purpose', e.target.value)} disabled={readOnly} rows={2} className={inputCls} />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <div className="space-y-1.5">
                                    <label className={labelCls}>Date *</label>
                                    <input type="date" value={data.event_date} onChange={e => setData('event_date', e.target.value)} disabled={readOnly} className={inputCls} required />
                                    {errors.event_date && <p className="text-xs text-red-500 font-semibold">{errors.event_date}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className={labelCls}>Time</label>
                                    <input type="time" value={data.event_time} onChange={e => setData('event_time', e.target.value)} disabled={readOnly} className={inputCls} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className={labelCls}>Location</label>
                                    <input type="text" value={data.location} onChange={e => setData('location', e.target.value)} disabled={readOnly} className={inputCls} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <div className="space-y-1.5">
                                    <label className={labelCls}>Chief Guest</label>
                                    <input type="text" value={data.chief_guest} onChange={e => setData('chief_guest', e.target.value)} disabled={readOnly} className={inputCls} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className={labelCls}>Chairperson</label>
                                    <input type="text" value={data.chairperson} onChange={e => setData('chairperson', e.target.value)} disabled={readOnly} className={inputCls} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className={labelCls}>Expected Participants</label>
                                    <input type="number" min={0} value={data.expected_participants} onChange={e => setData('expected_participants', e.target.value)} disabled={readOnly} className={inputCls} />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-300 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 bg-gray-50/70 dark:bg-neutral-800/60 border-b border-gray-200 dark:border-neutral-800 flex items-center gap-2.5">
                            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400">
                                <UserIcon className="w-4 h-4" />
                            </div>
                            <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">2. Contact Person & Coverage Needed</h2>
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                <div className="space-y-1.5">
                                    <label className={labelCls}>Contact Name *</label>
                                    <input type="text" value={data.contact_name} onChange={e => setData('contact_name', e.target.value)} disabled={readOnly} className={inputCls} required />
                                    {errors.contact_name && <p className="text-xs text-red-500 font-semibold">{errors.contact_name}</p>}
                                </div>
                                <div className="space-y-1.5">
                                    <label className={labelCls}>Designation</label>
                                    <input type="text" value={data.contact_designation} onChange={e => setData('contact_designation', e.target.value)} disabled={readOnly} className={inputCls} />
                                </div>
                                <div className="space-y-1.5">
                                    <label className={labelCls}>Mobile *</label>
                                    <input type="text" value={data.contact_mobile} onChange={e => setData('contact_mobile', e.target.value)} disabled={readOnly} className={inputCls} required />
                                    {errors.contact_mobile && <p className="text-xs text-red-500 font-semibold">{errors.contact_mobile}</p>}
                                </div>
                            </div>

                            <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-neutral-800">
                                <label className={labelCls}>Coverage Type Requested</label>
                                <div className="flex flex-wrap gap-4 pt-1">
                                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <input type="checkbox" checked={data.coverage_press_release} onChange={e => setData('coverage_press_release', e.target.checked)} disabled={readOnly} className="w-4 h-4 text-emerald-600 rounded" />
                                        Press Release
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <input type="checkbox" checked={data.coverage_facebook_post} onChange={e => setData('coverage_facebook_post', e.target.checked)} disabled={readOnly} className="w-4 h-4 text-emerald-600 rounded" />
                                        Facebook Post
                                    </label>
                                    <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <input type="checkbox" checked={data.coverage_media_send} onChange={e => setData('coverage_media_send', e.target.checked)} disabled={readOnly} className="w-4 h-4 text-emerald-600 rounded" />
                                        Send to Media
                                    </label>
                                </div>
                                <input type="text" placeholder="Other (specify)" value={data.coverage_other} onChange={e => setData('coverage_other', e.target.value)} disabled={readOnly} className={inputCls + ' mt-2'} />
                            </div>

                            <div className="space-y-1.5">
                                <label className={labelCls}>Special Instructions</label>
                                <textarea value={data.special_instructions} onChange={e => setData('special_instructions', e.target.value)} disabled={readOnly} rows={2} className={inputCls} />
                            </div>
                        </div>
                    </div>

                    {isManager && (
                        <div className="bg-white dark:bg-neutral-900 rounded-2xl border-2 border-blue-200 dark:border-blue-900/60 shadow-sm overflow-hidden">
                            <div className="px-6 py-4 bg-blue-50/70 dark:bg-blue-950/30 border-b border-blue-100 dark:border-blue-900/60 flex items-center gap-2.5">
                                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400">
                                    <ClipboardCheck className="w-4 h-4" />
                                </div>
                                <h2 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">PR Office Use Only</h2>
                            </div>

                            <div className="p-6 space-y-5">
                                {mediaRequest?.submitted_by && (
                                    <p className="text-xs text-gray-500">
                                        Submitted by <span className="font-bold text-gray-700 dark:text-gray-300">{mediaRequest.submitted_by.name}</span>
                                        {mediaRequest.submitted_by.department && ` (${mediaRequest.submitted_by.department.toUpperCase()})`}
                                    </p>
                                )}

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                                    <div className="space-y-1.5">
                                        <label className={labelCls}>Status</label>
                                        <select value={data.status} onChange={e => setData('status', e.target.value)} className={inputCls}>
                                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelCls}>Receive No.</label>
                                        <input type="text" placeholder="Auto-assigned via Mark Received" value={data.receive_no} onChange={e => setData('receive_no', e.target.value)} className={inputCls} />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className={labelCls}>Link Published Press Release</label>
                                        <select value={data.notice_id} onChange={e => setData('notice_id', e.target.value)} className={inputCls}>
                                            <option value="">— None yet —</option>
                                            {prWorthyNotices.map(n => <option key={n.id} value={n.id}>{n.title}</option>)}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className={labelCls}>PR Office Remarks</label>
                                    <textarea value={data.pr_remarks} onChange={e => setData('pr_remarks', e.target.value)} rows={2} className={inputCls} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="sticky bottom-4 z-20 p-4 rounded-2xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-gray-300 dark:border-neutral-800 shadow-xl flex items-center justify-end gap-3">
                        <Link href="/admin/media-requests" className="px-4 py-2.5 rounded-xl border border-gray-300 dark:border-neutral-700 text-gray-700 dark:text-gray-300 text-xs font-bold hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors">
                            Cancel
                        </Link>
                        {(!isEdit || canEditBase || isManager) && (
                            <button type="submit" disabled={processing} className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-md disabled:opacity-50 cursor-pointer">
                                <Save className="w-4 h-4" />
                                {processing ? 'Saving...' : isEdit ? 'Update Request' : 'Submit Request'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
