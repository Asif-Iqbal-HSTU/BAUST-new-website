import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    HeartHandshake, ShieldCheck, Lock, Eye, Calendar, Clock,
    Mail, Phone, User, CheckCircle2, AlertCircle, XCircle,
    Search, Filter, Database, KeyRound, Sparkles, X, FileText,
    MessageSquare, Building2, ExternalLink
} from 'lucide-react';

interface CounselingSessionItem {
    id: number;
    tracking_code: string;
    student_name: string;
    student_id: string;
    department: string;
    email: string;
    phone: string;
    session_mode: string;
    concern_category: string;
    preferred_date: string;
    preferred_time: string;
    confidential_message: string | null;
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
    psychologist_notes: string | null;
    created_at: string;
}

interface RawRecordItem {
    id: number;
    tracking_code: string;
    student_name: string;
    student_id: string;
    email: string;
    phone: string;
    session_mode: string;
    concern_category: string;
    confidential_message: string | null;
    status: string;
    created_at: string;
}

interface Props {
    sessions: CounselingSessionItem[];
    counts: {
        total: number;
        pending: number;
        confirmed: number;
        completed: number;
        cancelled: number;
    };
    currentFilter: string;
    rawRecords: RawRecordItem[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/admin/counseling-sessions' },
    { title: 'Confidential Counseling Sessions', href: '/admin/counseling-sessions' },
];

export default function CounselingDashboard({ sessions, counts, currentFilter, rawRecords }: Props) {
    const [search, setSearch] = useState('');
    const [activeTab, setActiveTab] = useState(currentFilter || 'all');
    const [selectedSession, setSelectedSession] = useState<CounselingSessionItem | null>(null);
    const [showCryptoModal, setShowCryptoModal] = useState(false);
    const [cryptoAuditSession, setCryptoAuditSession] = useState<CounselingSessionItem | null>(null);
    const [notesText, setNotesText] = useState('');
    const [statusUpdating, setStatusUpdating] = useState(false);

    // Filter sessions by search term & active tab
    const filteredSessions = sessions.filter((s) => {
        const matchesTab = activeTab === 'all' || s.status === activeTab;
        const q = search.toLowerCase();
        const matchesSearch =
            !q ||
            s.student_name.toLowerCase().includes(q) ||
            s.student_id.toLowerCase().includes(q) ||
            s.department.toLowerCase().includes(q) ||
            s.email.toLowerCase().includes(q) ||
            s.tracking_code.toLowerCase().includes(q) ||
            s.concern_category.toLowerCase().includes(q);
        return matchesTab && matchesSearch;
    });

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        router.get('/admin/counseling-sessions', { status: tab }, { preserveState: true, preserveScroll: true });
    };

    const handleOpenSessionModal = (session: CounselingSessionItem) => {
        setSelectedSession(session);
        setNotesText(session.psychologist_notes || '');
    };

    const handleUpdateStatus = (newStatus: string) => {
        if (!selectedSession) return;
        setStatusUpdating(true);
        router.patch(
            `/admin/counseling-sessions/${selectedSession.id}`,
            {
                status: newStatus,
                psychologist_notes: notesText,
            },
            {
                onSuccess: () => {
                    setStatusUpdating(false);
                    setSelectedSession({
                        ...selectedSession,
                        status: newStatus as any,
                        psychologist_notes: notesText,
                    });
                },
                onError: () => setStatusUpdating(false),
            }
        );
    };

    const handleOpenCryptoAudit = (session: CounselingSessionItem) => {
        setCryptoAuditSession(session);
        setShowCryptoModal(true);
    };

    // Find the corresponding raw encrypted record for the currently selected session in crypto audit
    const selectedRawRecord = cryptoAuditSession
        ? rawRecords.find((r) => r.id === cryptoAuditSession.id) || rawRecords[0]
        : rawRecords[0];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Psychological Counseling Sessions - BAUST" />

            <div className="flex flex-col gap-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
                
                {/* Header & Doctor-Patient Confidentiality Banner */}
                <div className="bg-gradient-to-r from-emerald-950 via-[#063320] to-teal-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-emerald-800/40">
                    <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold tracking-wider uppercase border border-emerald-500/30 mb-3">
                                <Lock className="w-3.5 h-3.5" /> Strict Doctor-Patient Privilege
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-3">
                                <HeartHandshake className="w-8 h-8 text-emerald-400" />
                                Psychological Counseling & Wellness Portal
                            </h1>
                            <p className="mt-2 text-sm text-emerald-100/80 max-w-2xl leading-relaxed">
                                Welcome, University Psychologist. All consultation appointments and confidential student statements displayed here are protected by <span className="text-emerald-300 font-semibold">AES-256 database encryption at rest</span>. Only your authenticated account holds the authorization to decrypt and review these records.
                            </p>
                        </div>

                        {/* Presentation Demo Trigger Button */}
                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                            <button
                                onClick={() => handleOpenCryptoAudit(sessions[0] || null)}
                                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-gray-950 font-bold px-5 py-3 rounded-2xl shadow-lg transition-all transform hover:-translate-y-0.5 active:scale-95 text-xs sm:text-sm"
                            >
                                <Database className="w-4 h-4" />
                                <span>Inspect Database Encryption (Demo)</span>
                            </button>
                        </div>
                    </div>

                    {/* Security Guarantee Pill Row */}
                    <div className="mt-6 pt-5 border-t border-emerald-800/50 flex flex-wrap gap-4 text-xs text-emerald-200/90">
                        <span className="flex items-center gap-1.5 font-medium">
                            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Cryptographic AES-256 Storage
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                            <KeyRound className="w-4 h-4 text-emerald-400" /> Key Isolation in App Environment
                        </span>
                        <span className="flex items-center gap-1.5 font-medium">
                            <Lock className="w-4 h-4 text-emerald-400" /> Zero Raw DB Plaintext Exposure
                        </span>
                    </div>
                </div>

                {/* Metric Summary Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-gray-100 dark:border-neutral-800 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between text-gray-500">
                            <span className="text-xs font-bold uppercase tracking-wider">Total Consultations</span>
                            <HeartHandshake className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="mt-4">
                            <span className="text-3xl font-extrabold text-gray-900 dark:text-white">{counts.total}</span>
                            <p className="text-[11px] text-gray-400 mt-1">Cumulative bookings logged</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-amber-100 dark:border-amber-950/40 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between text-amber-600">
                            <span className="text-xs font-bold uppercase tracking-wider">Pending Review</span>
                            <AlertCircle className="w-5 h-5" />
                        </div>
                        <div className="mt-4">
                            <span className="text-3xl font-extrabold text-amber-600">{counts.pending}</span>
                            <p className="text-[11px] text-amber-700/80 mt-1">Awaiting triage & scheduling</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-950/40 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between text-emerald-600">
                            <span className="text-xs font-bold uppercase tracking-wider">Confirmed</span>
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div className="mt-4">
                            <span className="text-3xl font-extrabold text-emerald-600">{counts.confirmed}</span>
                            <p className="text-[11px] text-emerald-700/80 mt-1">Scheduled appointments</p>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-neutral-900 rounded-2xl p-5 border border-blue-100 dark:border-blue-950/40 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between text-blue-600">
                            <span className="text-xs font-bold uppercase tracking-wider">Completed</span>
                            <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div className="mt-4">
                            <span className="text-3xl font-extrabold text-blue-600">{counts.completed}</span>
                            <p className="text-[11px] text-blue-700/80 mt-1">Sessions closed with notes</p>
                        </div>
                    </div>
                </div>

                {/* Search & Tabs Toolbar */}
                <div className="bg-white dark:bg-neutral-900 rounded-2xl p-4 border border-gray-100 dark:border-neutral-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Status Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto p-1 bg-gray-50 dark:bg-neutral-800/60 rounded-xl">
                        {[
                            { key: 'all', label: 'All Sessions', count: counts.total },
                            { key: 'pending', label: 'Pending', count: counts.pending },
                            { key: 'confirmed', label: 'Confirmed', count: counts.confirmed },
                            { key: 'completed', label: 'Completed', count: counts.completed },
                            { key: 'cancelled', label: 'Cancelled', count: counts.cancelled },
                        ].map((t) => (
                            <button
                                key={t.key}
                                onClick={() => handleTabChange(t.key)}
                                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                                    activeTab === t.key
                                        ? 'bg-emerald-700 text-white shadow-sm'
                                        : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 hover:bg-white/80 dark:hover:bg-neutral-700'
                                }`}
                            >
                                <span>{t.label}</span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                                    activeTab === t.key ? 'bg-emerald-800 text-emerald-100' : 'bg-gray-200 dark:bg-neutral-700 text-gray-700 dark:text-gray-300'
                                }`}>
                                    {t.count}
                                </span>
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative w-full md:w-80">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by student, ID, dept..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition"
                        />
                    </div>
                </div>

                {/* Sessions Table / Cards */}
                <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
                    {filteredSessions.length === 0 ? (
                        <div className="py-16 text-center">
                            <HeartHandshake className="w-12 h-12 text-gray-300 dark:text-neutral-700 mx-auto mb-3" />
                            <h3 className="text-base font-bold text-gray-700 dark:text-gray-200">No Counseling Sessions Found</h3>
                            <p className="text-xs text-gray-400 mt-1">There are no records matching your selected filter.</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-xs sm:text-sm">
                                <thead className="bg-gray-50 dark:bg-neutral-800/70 border-b border-gray-100 dark:border-neutral-800 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                                    <tr>
                                        <th className="py-3.5 px-4 sm:px-6">Tracking Ref</th>
                                        <th className="py-3.5 px-4">Student & ID</th>
                                        <th className="py-3.5 px-4">Dept</th>
                                        <th className="py-3.5 px-4">Concern / Area</th>
                                        <th className="py-3.5 px-4">Preferred Slot</th>
                                        <th className="py-3.5 px-4">Mode</th>
                                        <th className="py-3.5 px-4">Status</th>
                                        <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 dark:divide-neutral-800">
                                    {filteredSessions.map((session) => (
                                        <tr key={session.id} className="hover:bg-gray-50/70 dark:hover:bg-neutral-800/40 transition">
                                            <td className="py-4 px-4 sm:px-6 font-mono font-bold text-emerald-700 dark:text-emerald-400">
                                                {session.tracking_code}
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="font-bold text-gray-900 dark:text-white">{session.student_name}</div>
                                                <div className="text-xs text-gray-500 font-mono mt-0.5">ID: {session.student_id}</div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="inline-block bg-slate-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 font-bold text-[11px] px-2.5 py-1 rounded-md">
                                                    {session.department}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="inline-block bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 font-medium text-xs px-2.5 py-1 rounded-lg">
                                                    {session.concern_category}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-700 dark:text-gray-300 font-medium">
                                                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                                                    {session.preferred_date}
                                                </div>
                                                <div className="flex items-center gap-1.5 text-[11px] text-gray-500 mt-1">
                                                    <Clock className="w-3 h-3" />
                                                    {session.preferred_time}
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                                                    session.session_mode.includes('In-Person')
                                                        ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300'
                                                        : 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                                                }`}>
                                                    {session.session_mode.includes('In-Person') ? '🏢 In-Person' : '💻 Online'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${
                                                    session.status === 'pending'
                                                        ? 'bg-amber-100 text-amber-800'
                                                        : session.status === 'confirmed'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : session.status === 'completed'
                                                        ? 'bg-blue-100 text-blue-800'
                                                        : 'bg-rose-100 text-rose-800'
                                                }`}>
                                                    {session.status.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 sm:px-6 text-right">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handleOpenSessionModal(session)}
                                                        className="px-3 py-1.5 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold text-xs rounded-xl transition flex items-center gap-1.5"
                                                        title="Review confidential message and update status"
                                                    >
                                                        <Eye className="w-3.5 h-3.5" /> Review
                                                    </button>
                                                    <button
                                                        onClick={() => handleOpenCryptoAudit(session)}
                                                        className="p-1.5 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                                                        title="Inspect AES-256 database ciphertext"
                                                    >
                                                        <Database className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>

            {/* Modal 1: Session Details & Clinical Notes */}
            {selectedSession && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/70 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white dark:bg-neutral-900 rounded-3xl max-w-2xl w-full border border-gray-100 dark:border-neutral-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        
                        {/* Modal Header */}
                        <div className="p-6 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex items-center justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-xs font-bold text-emerald-300 uppercase tracking-wider">
                                    <Lock className="w-3.5 h-3.5" /> Confidential Session Details
                                </div>
                                <h2 className="text-xl font-bold mt-1">{selectedSession.student_name}</h2>
                                <p className="text-xs text-emerald-100/70 mt-0.5">
                                    Ref: <span className="font-mono font-bold text-white">{selectedSession.tracking_code}</span> • Submitted {selectedSession.created_at}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedSession(null)}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
                            
                            {/* Student Metadata Card */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-gray-50 dark:bg-neutral-800/50 rounded-2xl border border-gray-100 dark:border-neutral-800">
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Student ID</span>
                                    <span className="font-mono font-bold text-gray-800 dark:text-white">{selectedSession.student_id}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Department</span>
                                    <span className="font-semibold text-gray-800 dark:text-white">{selectedSession.department}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Session Mode</span>
                                    <span className="font-semibold text-emerald-700 dark:text-emerald-400">{selectedSession.session_mode}</span>
                                </div>
                                <div>
                                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Phone</span>
                                    <a href={`tel:${selectedSession.phone}`} className="font-semibold text-gray-800 dark:text-white hover:underline flex items-center gap-1">
                                        <Phone className="w-3 h-3 text-emerald-600" /> {selectedSession.phone}
                                    </a>
                                </div>
                                <div className="sm:col-span-2">
                                    <span className="text-[10px] uppercase font-bold text-gray-400 block">Email Address</span>
                                    <a href={`mailto:${selectedSession.email}`} className="font-semibold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 truncate">
                                        <Mail className="w-3 h-3 text-emerald-600 shrink-0" /> {selectedSession.email}
                                    </a>
                                </div>
                            </div>

                            {/* Preferred Schedule */}
                            <div className="flex items-center gap-3 p-4 bg-emerald-50/70 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-900/60">
                                <Calendar className="w-6 h-6 text-emerald-700 dark:text-emerald-400 shrink-0" />
                                <div>
                                    <div className="font-bold text-emerald-950 dark:text-emerald-100 text-sm">
                                        Preferred Schedule: {selectedSession.preferred_date}
                                    </div>
                                    <div className="text-xs text-emerald-700 dark:text-emerald-300 font-medium">
                                        Time Slot: {selectedSession.preferred_time}
                                    </div>
                                </div>
                            </div>

                            {/* Student's Confidential Statement */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                                    <MessageSquare className="w-4 h-4 text-purple-600" /> Student's Confidential Concern & Statement
                                </h4>
                                <div className="p-4 bg-purple-50/50 dark:bg-purple-950/30 rounded-2xl border border-purple-100 dark:border-purple-900/40">
                                    <div className="text-xs font-bold text-purple-700 dark:text-purple-300 mb-2">
                                        Category: {selectedSession.concern_category}
                                    </div>
                                    <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                                        {selectedSession.confidential_message || 'No additional text message submitted.'}
                                    </p>
                                </div>
                            </div>

                            {/* Psychologist Clinical Notes */}
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-2 flex items-center gap-1.5">
                                    <FileText className="w-4 h-4 text-emerald-600" /> Private Clinical / Action Notes (Psychologist Only)
                                </h4>
                                <textarea
                                    rows={3}
                                    value={notesText}
                                    onChange={(e) => setNotesText(e.target.value)}
                                    placeholder="Enter private session notes, counseling observations, or follow-up instructions here. These notes are also encrypted in the database."
                                    className="w-full p-3.5 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-2xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition leading-relaxed"
                                />
                            </div>

                        </div>

                        {/* Modal Footer / Status Update Controls */}
                        <div className="p-5 bg-gray-50 dark:bg-neutral-800/80 border-t border-gray-100 dark:border-neutral-800 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                                <span className="text-xs font-bold text-gray-500">Change Status:</span>
                                <button
                                    onClick={() => handleUpdateStatus('confirmed')}
                                    disabled={statusUpdating}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                                        selectedSession.status === 'confirmed'
                                            ? 'bg-emerald-600 text-white'
                                            : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                    }`}
                                >
                                    Confirm Session
                                </button>
                                <button
                                    onClick={() => handleUpdateStatus('completed')}
                                    disabled={statusUpdating}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                                        selectedSession.status === 'completed'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                    }`}
                                >
                                    Mark Completed
                                </button>
                                <button
                                    onClick={() => handleUpdateStatus('cancelled')}
                                    disabled={statusUpdating}
                                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                                        selectedSession.status === 'cancelled'
                                            ? 'bg-rose-600 text-white'
                                            : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                                    }`}
                                >
                                    Cancel
                                </button>
                            </div>

                            <button
                                onClick={() => handleUpdateStatus(selectedSession.status)}
                                disabled={statusUpdating}
                                className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl shadow transition"
                            >
                                {statusUpdating ? 'Saving...' : 'Save Notes & Status'}
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* Modal 2: PRESENTATION DEMO - Cryptographic AES-256 Database Encryption Inspector */}
            {showCryptoModal && selectedRawRecord && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md animate-fade-in">
                    <div className="bg-neutral-900 text-white rounded-3xl max-w-4xl w-full border border-neutral-700 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col font-sans">
                        
                        {/* Demo Header */}
                        <div className="p-6 bg-gradient-to-r from-neutral-950 to-neutral-900 border-b border-neutral-800 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                                    <KeyRound className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                                        <Sparkles className="w-3 h-3" /> Presentation Slide Demo
                                    </div>
                                    <h3 className="text-lg font-extrabold text-white">
                                        Data Privacy & Database Encryption Audit
                                    </h3>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowCryptoModal(false)}
                                className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 flex items-center justify-center text-gray-300 transition"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Demo Body: Comparison View */}
                        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
                            
                            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-2xl p-4 text-emerald-200 leading-relaxed text-xs">
                                <strong>How BAUST Protects Student Mental Health Privacy:</strong> Even if an attacker gains physical access to the database server or extracts a raw SQL dump, the records below demonstrate that student names, contact numbers, and confidential statements are mathematically unreadable without the university's master AES-256 application encryption key.
                            </div>

                            {/* Side-by-Side Comparison */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                
                                {/* Column A: Decrypted Authorized View */}
                                <div className="bg-neutral-950 rounded-2xl p-5 border border-emerald-900/50 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
                                            <span className="font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
                                                <Eye className="w-4 h-4" /> Decrypted Plaintext
                                            </span>
                                            <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-mono">
                                                Psychologist Dashboard
                                            </span>
                                        </div>

                                        <div className="space-y-3 font-mono text-[11px]">
                                            <div>
                                                <span className="text-gray-500 block text-[10px] uppercase">Student Name:</span>
                                                <span className="text-emerald-200 font-bold">{cryptoAuditSession?.student_name || 'Tanvir Ahmed'}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-[10px] uppercase">Student ID:</span>
                                                <span className="text-emerald-200">{cryptoAuditSession?.student_id || '200101045'}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-[10px] uppercase">Contact Email:</span>
                                                <span className="text-emerald-200">{cryptoAuditSession?.email || 'tanvir@baust.edu.bd'}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-[10px] uppercase">Phone:</span>
                                                <span className="text-emerald-200">{cryptoAuditSession?.phone || '01712-345678'}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-[10px] uppercase">Concern Category:</span>
                                                <span className="text-purple-300">{cryptoAuditSession?.concern_category || 'Academic Stress & Anxiety'}</span>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-[10px] uppercase">Confidential Message:</span>
                                                <div className="p-2.5 bg-neutral-900 rounded-xl text-gray-200 text-[11px] leading-relaxed font-sans border border-neutral-800">
                                                    "{cryptoAuditSession?.confidential_message || 'Feeling overwhelmed with upcoming finals and needing guidance on managing panic episodes.'}"
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-neutral-800 text-[10px] text-gray-400">
                                        ✓ Verified Authenticated Session: <span className="text-emerald-400">psychologist@baust.edu.bd</span>
                                    </div>
                                </div>

                                {/* Column B: Raw Encrypted Database View */}
                                <div className="bg-neutral-950 rounded-2xl p-5 border border-amber-900/40 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
                                            <span className="font-bold text-amber-400 flex items-center gap-1.5 text-xs">
                                                <Lock className="w-4 h-4" /> Raw MySQL Ciphertext
                                            </span>
                                            <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-mono">
                                                AES-256-CBC at Rest
                                            </span>
                                        </div>

                                        <div className="space-y-3 font-mono text-[10.5px]">
                                            <div>
                                                <span className="text-gray-500 block text-[10px] uppercase">student_name in MySQL:</span>
                                                <p className="text-amber-200/90 break-all bg-neutral-900 p-2 rounded-lg border border-neutral-800">
                                                    {selectedRawRecord.student_name}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-[10px] uppercase">student_id in MySQL:</span>
                                                <p className="text-amber-200/90 break-all bg-neutral-900 p-2 rounded-lg border border-neutral-800">
                                                    {selectedRawRecord.student_id}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-[10px] uppercase">email in MySQL:</span>
                                                <p className="text-amber-200/90 break-all bg-neutral-900 p-2 rounded-lg border border-neutral-800">
                                                    {selectedRawRecord.email}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-gray-500 block text-[10px] uppercase">confidential_message in MySQL:</span>
                                                <p className="text-amber-200/90 break-all bg-neutral-900 p-2 rounded-lg border border-neutral-800 max-h-24 overflow-y-auto">
                                                    {selectedRawRecord.confidential_message || 'eyJpdiI6Ik9QNWZ... [AES-256 Payload]'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-3 border-t border-neutral-800 text-[10px] text-amber-400/80">
                                        🔒 Stored on disk as encrypted base64 payload with cryptographic IV and HMAC.
                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 bg-neutral-950 border-t border-neutral-800 flex items-center justify-between text-xs text-gray-400">
                            <span>University Security Protocol §6.2 • Zero Plaintext Storage</span>
                            <button
                                onClick={() => setShowCryptoModal(false)}
                                className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold rounded-xl transition"
                            >
                                Close Audit Demo
                            </button>
                        </div>

                    </div>
                </div>
            )}

        </AppLayout>
    );
}
