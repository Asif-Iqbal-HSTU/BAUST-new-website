import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { AlertTriangle, ArrowRight, CheckCircle2, ExternalLink, Info, KeyRound, ShieldAlert } from 'lucide-react';

interface Stat {
    label: string;
    value: number;
    href: string | null;
}

interface Action {
    label: string;
    description: string;
    href: string;
    external?: boolean;
}

interface Attention {
    level: 'danger' | 'warning' | 'info';
    text: string;
    href: string | null;
}

interface RecentItem {
    title: string;
    meta: string;
    href: string;
    external?: string | null;
}

interface Props {
    roleLabel: string;
    scope: string | null;
    usesDefaultPassword: boolean;
    stats: Stat[];
    actions: Action[];
    attention: Attention[];
    recent: { title: string; items: RecentItem[]; empty: string } | null;
    defaultPasswordAccounts?: { email: string; role: string }[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Dashboard', href: dashboard().url }];

const card = 'rounded-2xl border border-sidebar-border/70 bg-white p-5 shadow-sm dark:border-sidebar-border dark:bg-neutral-900';

const ATTENTION_STYLE: Record<Attention['level'], { icon: typeof Info; className: string }> = {
    danger: { icon: ShieldAlert, className: 'text-red-600 dark:text-red-400' },
    warning: { icon: AlertTriangle, className: 'text-amber-600 dark:text-amber-400' },
    info: { icon: Info, className: 'text-sky-600 dark:text-sky-400' },
};

function greeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
}

export default function Dashboard({ roleLabel, scope, usesDefaultPassword, stats = [], actions = [], attention = [], recent, defaultPasswordAccounts }: Props) {
    const { auth } = usePage<SharedData>().props;
    const order = { danger: 0, warning: 1, info: 2 };
    const sortedAttention = [...attention].sort((a, b) => order[a.level] - order[b.level]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-5 overflow-x-auto p-4 md:p-6">
                {/* Welcome */}
                <div className={`${card} flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between`}>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {greeting()}, {auth.user.name}
                        </h1>
                        {scope && <p className="mt-1 text-sm text-neutral-500">You manage: {scope}</p>}
                    </div>
                    <span className="w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        {roleLabel}
                    </span>
                </div>

                {usesDefaultPassword && (
                    <div className="flex flex-col gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between dark:border-red-900 dark:bg-red-950/40">
                        <div className="flex items-start gap-3">
                            <KeyRound className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                            <p className="text-sm text-red-800 dark:text-red-200">
                                <strong>Your account still uses the default password.</strong> Anyone who knows it can change the website. Please set your own password now.
                            </p>
                        </div>
                        <Link href="/settings/password" className="w-fit rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700">
                            Change password
                        </Link>
                    </div>
                )}

                {/* Key numbers */}
                {stats.length > 0 && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => {
                            const body = (
                                <>
                                    <div className="text-3xl font-black text-emerald-700 dark:text-emerald-400">{stat.value.toLocaleString()}</div>
                                    <div className="mt-1 text-sm font-medium text-neutral-600 dark:text-neutral-400">{stat.label}</div>
                                </>
                            );
                            return stat.href ? (
                                <Link key={stat.label} href={stat.href} className={`${card} transition-colors hover:border-emerald-300`}>{body}</Link>
                            ) : (
                                <div key={stat.label} className={card}>{body}</div>
                            );
                        })}
                    </div>
                )}

                <div className="grid gap-5 lg:grid-cols-3">
                    <div className="space-y-5 lg:col-span-2">
                        {/* Needs attention */}
                        <section className={card}>
                            <h2 className="mb-3 text-base font-bold text-gray-900 dark:text-white">Needs attention</h2>
                            {sortedAttention.length > 0 ? (
                                <ul className="space-y-2">
                                    {sortedAttention.map((item, i) => {
                                        const { icon: Icon, className } = ATTENTION_STYLE[item.level];
                                        const text = <span className="text-sm text-neutral-700 dark:text-neutral-300">{item.text}</span>;
                                        return (
                                            <li key={i} className="flex items-start gap-2.5">
                                                <Icon className={`mt-0.5 h-4 w-4 flex-shrink-0 ${className}`} />
                                                {item.href ? (
                                                    <Link href={item.href} className="group flex-1 hover:text-emerald-700">
                                                        {text} <span className="text-xs font-semibold text-emerald-700 opacity-0 group-hover:opacity-100">Fix →</span>
                                                    </Link>
                                                ) : (
                                                    text
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <p className="flex items-center gap-2 text-sm text-neutral-500">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Nothing needs your attention right now.
                                </p>
                            )}
                        </section>

                        {/* Quick actions */}
                        {actions.length > 0 && (
                            <section className={card}>
                                <h2 className="mb-3 text-base font-bold text-gray-900 dark:text-white">Quick actions</h2>
                                <div className="grid gap-3 sm:grid-cols-2">
                                    {actions.map((action) => {
                                        const inner = (
                                            <>
                                                <div className="min-w-0">
                                                    <div className="truncate text-sm font-bold text-gray-900 dark:text-white">{action.label}</div>
                                                    <div className="truncate text-xs text-neutral-500">{action.description}</div>
                                                </div>
                                                {action.external ? <ExternalLink className="h-4 w-4 flex-shrink-0 text-emerald-600" /> : <ArrowRight className="h-4 w-4 flex-shrink-0 text-emerald-600" />}
                                            </>
                                        );
                                        const className = 'flex items-center justify-between gap-3 rounded-xl border border-neutral-200 p-3 transition-colors hover:border-emerald-300 hover:bg-emerald-50/50 dark:border-neutral-800 dark:hover:bg-emerald-950/20';
                                        return action.external ? (
                                            <a key={action.href} href={action.href} target="_blank" rel="noopener noreferrer" className={className}>{inner}</a>
                                        ) : (
                                            <Link key={action.href} href={action.href} className={className}>{inner}</Link>
                                        );
                                    })}
                                </div>
                            </section>
                        )}

                        {defaultPasswordAccounts && defaultPasswordAccounts.length > 0 && (
                            <section className={card}>
                                <h2 className="mb-1 text-base font-bold text-gray-900 dark:text-white">Accounts on the default password</h2>
                                <p className="mb-3 text-xs text-neutral-500">These accounts log in with “password”. Ask each person to change it, or set a new one for them.</p>
                                <ul className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {defaultPasswordAccounts.map((acc) => (
                                        <li key={acc.email} className="flex items-center justify-between gap-3 py-2 text-sm">
                                            <span className="truncate font-medium text-neutral-800 dark:text-neutral-200">{acc.email}</span>
                                            <span className="flex-shrink-0 text-xs text-neutral-500">{acc.role}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>

                    {/* Recent */}
                    {recent && (
                        <section className={`${card} h-fit`}>
                            <h2 className="mb-3 text-base font-bold text-gray-900 dark:text-white">{recent.title}</h2>
                            {recent.items.length > 0 ? (
                                <ul className="space-y-3">
                                    {recent.items.map((item) => (
                                        <li key={item.href} className="flex items-start justify-between gap-2">
                                            <Link href={item.href} className="min-w-0 hover:text-emerald-700">
                                                <div className="line-clamp-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">{item.title}</div>
                                                <div className="text-xs text-neutral-500">{item.meta}</div>
                                            </Link>
                                            {item.external && (
                                                <a href={item.external} target="_blank" rel="noopener noreferrer" title="View page" className="flex-shrink-0 text-neutral-400 hover:text-emerald-700">
                                                    <ExternalLink className="h-4 w-4" />
                                                </a>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-neutral-500">{recent.empty}</p>
                            )}
                        </section>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
