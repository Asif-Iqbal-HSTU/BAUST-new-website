import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ShieldCheck, GraduationCap, Globe, Bell, Megaphone, Archive, Building2, HeartHandshake, MessageSquarePlus, Inbox } from 'lucide-react';
import AppLogo from './app-logo';

const footerNavItems: NavItem[] = [
    {
        title: 'BAUST Website',
        href: '/',
        icon: Globe,
    },
    {
        title: 'Notice Archive',
        href: '/archive/notices',
        icon: Bell,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth?.user;
    const role = (user as { role?: string } | undefined)?.role;

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: (role === 'psychologist' || (user as { email?: string })?.email === 'psychologist@baust.edu.bd') 
                ? '/admin/counseling-sessions' 
                : dashboard(),
            icon: LayoutGrid,
        },
    ];

    if (user) {
        // Dedicated, confidential portal for the University Psychologist
        if (role === 'psychologist' || (user as { email?: string })?.email === 'psychologist@baust.edu.bd') {
            mainNavItems.push({
                title: 'Counseling Sessions',
                href: '/admin/counseling-sessions',
                icon: HeartHandshake,
            });
        } else {
            // Manage Members is for departmental content admins, not the PRO
            if (role === 'super_admin' || role === 'dept_admin') {
                mainNavItems.push({
                    title: 'Manage Members',
                    href: '/admin/members',
                    icon: BookOpen,
                });
            }

            if (role === 'super_admin' || role === 'dept_admin' || role === 'pro' || role === 'admission_admin') {
                mainNavItems.push({
                    title: role === 'pro' ? 'News, Events & Notices' : role === 'admission_admin' ? 'Admission Notices' : 'Manage Notices',
                    href: '/admin/notices',
                    icon: Folder,
                });
            }
        }

        // Media Coverage Requisitions: dept/office/IQAC admins submit; PRO/super_admin triage
        if (role === 'dept_admin' || role === 'iqac_admin' || role === 'pro' || role === 'super_admin') {
            mainNavItems.push({
                title: role === 'pro' || role === 'super_admin' ? 'Media Requests (Inbox)' : 'Request Media Coverage',
                href: '/admin/media-requests',
                icon: Megaphone,
            });
        }

        // Press Release Archive Register: PRO/super_admin only
        if (role === 'pro' || role === 'super_admin') {
            mainNavItems.push({
                title: 'Press Archive Register',
                href: '/admin/notices-archive-register',
                icon: Archive,
            });
        }

        // Department Page for Department Admins
        if (role === 'dept_admin' && (user as { department?: string })?.department) {
            mainNavItems.push({
                title: 'Department Page',
                href: `/admin/departments/${(user as { department?: string }).department}`,
                icon: GraduationCap,
            });
        }

        // Update requests to the developer (everyone; the developer sees all of them)
        const requests = (auth as { updateRequests?: { open: number | null; needsInfo: number } | null }).updateRequests;
        const pending = role === 'super_admin' ? requests?.open ?? 0 : requests?.needsInfo ?? 0;
        mainNavItems.push({
            title: `${role === 'super_admin' ? 'Update Requests' : 'Request an Update'}${pending ? ` (${pending})` : ''}`,
            href: role === 'super_admin' ? '/admin/update-requests' : '/admin/update-requests/create',
            icon: MessageSquarePlus,
        });
        if (role !== 'super_admin') {
            mainNavItems.push({ title: 'My Requests', href: '/admin/update-requests', icon: Inbox });
        }

        // Section admins: pages under the Administration / Library / Research / Admission menus;
        // the Treasurer Office admin: the Finance Committee page and the treasurer's staff
        const sectionRoles: Record<string, { offices: { title: string; href: string }[] }> = {
            administration_admin: { offices: [{ title: 'University Offices', href: '/admin/offices' }] },
            library_admin: { offices: [{ title: 'Librarian Office Staff', href: '/admin/offices/librarian' }] },
            research_admin: { offices: [] },
            admission_admin: { offices: [{ title: 'Admission Office Staff', href: '/admin/offices/admission-office' }] },
            treasurer_admin: { offices: [{ title: 'Treasurer Office Staff', href: '/admin/offices/treasurer' }] },
        };
        if (role === 'super_admin' || (role && role in sectionRoles)) {
            mainNavItems.push({ title: 'Website Pages', href: '/admin/site-pages', icon: Globe });
        }
        if (role && role in sectionRoles) {
            sectionRoles[role].offices.forEach((office) => mainNavItems.push({ ...office, icon: Building2 }));
        }

        // Programs and the faculty Dean's page run jointly by the faculty's focal points
        const manages = (auth as { manages?: { faculty: { id: number; slug: string; code: string } | null; programs: { slug: string; short_name: string }[] } | null }).manages;
        manages?.programs.forEach((program) => {
            mainNavItems.push({
                title: `${program.short_name} Program Page`,
                href: `/admin/departments/${program.slug}`,
                icon: GraduationCap,
            });
        });
        if (manages?.faculty) {
            mainNavItems.push(
                {
                    title: `${manages.faculty.code} Dean's Page`,
                    href: `/admin/faculties/${manages.faculty.id}/edit`,
                    icon: Building2,
                },
                {
                    title: `${manages.faculty.code} Dean's Office Staff`,
                    href: `/admin/offices/${manages.faculty.slug}`,
                    icon: Building2,
                },
            );
        }

        // Exclusive to Superadmin
        if (role === 'super_admin') {
            mainNavItems.push(
                {
                    title: 'Departments',
                    href: '/admin/departments',
                    icon: GraduationCap,
                },
                {
                    title: 'Offices',
                    href: '/admin/offices',
                    icon: Folder,
                },
                {
                    title: "Dean's Offices",
                    href: '/admin/faculties',
                    icon: Building2,
                }
            );
        }

        // IQAC Content
        if (role === 'super_admin' || role === 'iqac_admin') {
            mainNavItems.push({
                title: 'IQAC Page',
                href: '/admin/iqac',
                icon: ShieldCheck,
            });
        }
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
