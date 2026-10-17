import React, { useState } from 'react';
import {
    HeartHandshake, ShieldCheck, Lock, Send, CheckCircle2,
    Calendar, Clock, User, Mail, Phone, MessageSquare,
    AlertCircle, Sparkles, KeyRound, Building2, Check
} from 'lucide-react';

export default function PsychologicalCounselingSection() {
    const [formData, setFormData] = useState({
        student_name: '',
        student_id: '',
        department: 'CSE',
        email: '',
        phone: '',
        session_mode: 'In-Person (Campus Counseling Wing)',
        concern_category: 'Academic Stress & Exam Pressure',
        preferred_date: '',
        preferred_time: 'Morning (10:00 AM - 11:30 AM)',
        confidential_message: '',
        consent: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [trackingCode, setTrackingCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (!formData.consent) {
            setErrorMessage('Please confirm your understanding of the confidentiality policy before submitting.');
            return;
        }

        setIsSubmitting(true);

        try {
            // Retrieve CSRF token from document cookies or meta tag
            const csrfMeta = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            
            const response = await fetch('/facilities/counseling/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': csrfMeta || '',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok && data.success) {
                setSubmitSuccess(true);
                setTrackingCode(data.tracking_code);
            } else {
                setErrorMessage(data.message || 'An error occurred while submitting your booking. Please check your information and try again.');
            }
        } catch (err) {
            setErrorMessage('Network error occurred. Please verify your connection or contact psychologist@baust.edu.bd directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleReset = () => {
        setSubmitSuccess(false);
        setTrackingCode('');
        setFormData({
            student_name: '',
            student_id: '',
            department: 'CSE',
            email: '',
            phone: '',
            session_mode: 'In-Person (Campus Counseling Wing)',
            concern_category: 'Academic Stress & Exam Pressure',
            preferred_date: '',
            preferred_time: 'Morning (10:00 AM - 11:30 AM)',
            confidential_message: '',
            consent: false,
        });
    };

    // Calculate minimum selectable date (tomorrow)
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split('T')[0];

    return (
        <section id="counseling" className="scroll-mt-24 space-y-10">
            
            {/* Overview & Mission */}
            <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="order-2 lg:order-1">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                            <HeartHandshake className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[11px] font-bold uppercase tracking-widest text-emerald-600">Student Wellbeing & Mental Health</p>
                            <h2 className="text-2xl font-bold text-gray-900 leading-tight">Psychological Counseling & Guidance Cell</h2>
                        </div>
                    </div>

                    <p className="text-[15px] text-gray-600 leading-relaxed">
                        University life brings remarkable opportunities alongside natural challenges — rigorous engineering coursework, examinations, personal dilemmas, social adjustments, and future career choices. At BAUST, emotional wellbeing and mental health are given equal priority alongside academic achievement.
                    </p>
                    <p className="mt-4 text-[15px] text-gray-600 leading-relaxed">
                        The university provides a dedicated, compassionate, and professional psychological counseling service <span className="font-semibold text-emerald-800">free of charge</span> to all students, faculty members, and staff. Whether you are feeling overwhelmed, navigating anxiety, or simply need an empathetic sounding board, our licensed psychologist is here to support you in a calm, welcoming environment.
                    </p>
                    
                    <div className="mt-6 flex flex-wrap gap-2.5">
                        {[
                            '100% Confidential Doctor-Patient Privilege',
                            'AES-256 Encrypted Database Security',
                            'Individual One-on-One Counseling',
                            'Exam Stress & Panic Management',
                            'Free for All Enrolled Students & Staff'
                        ].map((t) => (
                            <span key={t} className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-emerald-100">
                                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {t}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Hero Feature Visual Card */}
                <div className="order-1 lg:order-2 h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-xl border border-emerald-100/80 bg-[#fbf9f5] relative flex flex-col justify-between group">
                    <div className="w-full h-full flex items-center justify-center p-3 sm:p-5 overflow-hidden">
                        <img
                            src="/images/depression-counseling-abstract-concept-illustration-vector.jpg"
                            alt="Psychological Counseling & Guidance Cell - BAUST"
                            className="w-full h-full object-contain rounded-2xl group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                        />
                    </div>
                    
                    {/* Bottom Floating Info Pill */}
                    <div className="absolute bottom-4 inset-x-4 sm:inset-x-6 bg-emerald-950/85 backdrop-blur-md p-4 rounded-2xl border border-emerald-700/40 text-white shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                                <Lock className="w-3 h-3 text-emerald-400" /> 100% Doctor-Patient Privilege
                            </div>
                            <h4 className="text-sm sm:text-base font-bold text-white mt-0.5">
                                You are never alone at BAUST
                            </h4>
                        </div>
                        <div className="flex flex-col sm:items-end text-[11px] text-emerald-200 shrink-0">
                            <span className="font-semibold text-emerald-300">✉️ psychologist@baust.edu.bd</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confidential Booking Card & Form */}
            <div className="bg-gradient-to-br from-white via-emerald-50/20 to-white rounded-3xl border border-emerald-100 shadow-xl p-6 sm:p-10 relative overflow-hidden">
                <div className="max-w-4xl mx-auto">
                    
                    {/* Header with Security Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                        <div>
                            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wider bg-emerald-100/70 px-3 py-1 rounded-full">
                                <KeyRound className="w-3.5 h-3.5 text-emerald-700" /> End-to-End Database Encryption
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-2">
                                Book a Confidential Counseling Session
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 mt-1">
                                Fill in the details below to request a private one-on-one session with the University Psychologist.
                            </p>
                        </div>
                        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 rounded-2xl px-4 py-2 text-xs text-emerald-800 font-medium shrink-0">
                            <Lock className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>AES-256 Encrypted at Rest</span>
                        </div>
                    </div>

                    {/* Success State View */}
                    {submitSuccess ? (
                        <div className="py-12 px-4 text-center max-w-lg mx-auto animate-fade-in">
                            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
                                <CheckCircle2 className="w-9 h-9" />
                            </div>
                            
                            <h4 className="text-2xl font-bold text-gray-900">
                                Session Request Successfully Encrypted & Sent!
                            </h4>
                            
                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                                Your appointment request has been encrypted with AES-256 and securely delivered directly to the University Psychologist's private dashboard.
                            </p>

                            <div className="my-6 p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 inline-block text-center">
                                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-1">
                                    Confidential Tracking Reference
                                </span>
                                <span className="font-mono text-xl font-extrabold text-emerald-950 tracking-wider">
                                    {trackingCode}
                                </span>
                                <span className="text-[11px] text-emerald-700 block mt-1">
                                    Save this code for your reference.
                                </span>
                            </div>

                            <div className="text-xs text-gray-500 space-y-1 bg-gray-50 rounded-xl p-4 border border-gray-100 mb-6 text-left">
                                <p className="font-semibold text-gray-700 flex items-center gap-1.5">
                                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" /> What happens next:
                                </p>
                                <p>• The psychologist will privately review your schedule and slot.</p>
                                <p>• You will receive a confirmation call or email at your provided contact.</p>
                            </div>

                            <button
                                onClick={handleReset}
                                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-6 py-2.5 rounded-xl shadow transition"
                            >
                                Book Another Session
                            </button>
                        </div>
                    ) : (
                        /* Booking Form */
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            
                            {errorMessage && (
                                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-rose-800 text-xs flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                                    <span>{errorMessage}</span>
                                </div>
                            )}

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                
                                {/* Full Name */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Full Name <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="student_name"
                                        required
                                        value={formData.student_name}
                                        onChange={handleChange}
                                        placeholder="e.g. Md. Tanvir Ahmed"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition"
                                    />
                                </div>

                                {/* Student ID */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Student / Staff ID <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="student_id"
                                        required
                                        value={formData.student_id}
                                        onChange={handleChange}
                                        placeholder="e.g. 210101045"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition"
                                    />
                                </div>

                                {/* Department */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Department / Faculty <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        name="department"
                                        value={formData.department}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition"
                                    >
                                        <option value="CSE">Computer Science & Engineering (CSE)</option>
                                        <option value="EEE">Electrical & Electronic Engineering (EEE)</option>
                                        <option value="ME">Mechanical Engineering (ME)</option>
                                        <option value="IPE">Industrial & Production Engineering (IPE)</option>
                                        <option value="CE">Civil Engineering (CE)</option>
                                        <option value="DBA">Business Administration (DBA)</option>
                                        <option value="AIS">Accounting & Information Systems (AIS)</option>
                                        <option value="English">English</option>
                                        <option value="A&S">Arts & Sciences (A&S)</option>
                                        <option value="Staff/Faculty">University Staff / Faculty Member</option>
                                    </select>
                                </div>

                                {/* Email Address */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Official / Contact Email <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="e.g. yourname@baust.edu.bd"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Mobile / WhatsApp Number <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="e.g. 01712-345678"
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition"
                                    />
                                </div>

                                {/* Preferred Session Mode */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Session Consultation Mode <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        name="session_mode"
                                        value={formData.session_mode}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition"
                                    >
                                        <option value="In-Person (Campus Counseling Wing)">In-Person (Campus Counseling Room)</option>
                                        <option value="Confidential Online (Google Meet)">Confidential Online Session (Google Meet)</option>
                                    </select>
                                </div>

                                {/* Concern Category */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Primary Concern / Focus Area <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        name="concern_category"
                                        value={formData.concern_category}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition"
                                    >
                                        <option value="Academic Stress & Exam Pressure">Academic Stress & Exam Pressure</option>
                                        <option value="Anxiety, Panic or Overthinking">Anxiety, Panic or Overthinking</option>
                                        <option value="Low Mood, Fatigue or Depression">Low Mood, Fatigue or Depression</option>
                                        <option value="Personal, Roommate or Family Dilemma">Personal, Roommate or Family Dilemma</option>
                                        <option value="Career & Future Uncertainty">Career & Future Uncertainty</option>
                                        <option value="Sleep Disturbance & Concentration">Sleep Disturbance & Concentration Difficulties</option>
                                        <option value="Trauma / Emotional Crisis">Trauma / Urgent Emotional Crisis</option>
                                        <option value="Other Confidential Concern">Other Confidential Concern</option>
                                    </select>
                                </div>

                                {/* Preferred Date */}
                                <div>
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Preferred Date <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        name="preferred_date"
                                        required
                                        min={minDate}
                                        value={formData.preferred_date}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition"
                                    />
                                </div>

                                {/* Preferred Time Slot */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Preferred Time Slot <span className="text-rose-500">*</span>
                                    </label>
                                    <select
                                        name="preferred_time"
                                        value={formData.preferred_time}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition"
                                    >
                                        <option value="Morning (10:00 AM - 11:30 AM)">Morning (10:00 AM – 11:30 AM)</option>
                                        <option value="Midday (11:30 AM - 01:00 PM)">Midday (11:30 AM – 01:00 PM)</option>
                                        <option value="Afternoon (02:30 PM - 04:00 PM)">Afternoon (02:30 PM – 04:00 PM)</option>
                                    </select>
                                </div>

                                {/* Confidential Message */}
                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                                        Confidential Message / Notes for Psychologist (Optional)
                                    </label>
                                    <textarea
                                        rows={3}
                                        name="confidential_message"
                                        value={formData.confidential_message}
                                        onChange={handleChange}
                                        placeholder="Feel free to share what you would like to discuss, or any specific circumstances you want the psychologist to know in advance. This message is encrypted in our database."
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-600 transition"
                                    />
                                </div>

                            </div>

                            {/* Consent Checkbox */}
                            <div className="pt-2">
                                <label className="flex items-start gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        name="consent"
                                        checked={formData.consent}
                                        onChange={handleChange}
                                        className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 border-gray-300"
                                    />
                                    <span className="text-xs text-gray-600 leading-relaxed">
                                        I confirm that I wish to schedule this counseling session. I understand that all information submitted here is <span className="font-semibold text-emerald-800">cryptographically encrypted (AES-256)</span> and reviewed exclusively by the University Psychologist under strict doctor-patient confidentiality.
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                                    <span>Confidential & Free for All BAUST Members</span>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 text-sm"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Encrypting & Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Lock className="w-4 h-4" />
                                            <span>Encrypt & Submit Session Request</span>
                                        </>
                                    )}
                                </button>
                            </div>

                        </form>
                    )}

                </div>
            </div>

        </section>
    );
}
