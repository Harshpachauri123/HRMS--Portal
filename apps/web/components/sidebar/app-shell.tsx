"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronDown,
  BriefcaseBusiness,
  ClipboardList,
  KeyRound,
  LayoutDashboard,
  Link2,
  ScrollText,
  Settings as SettingsIcon,
  Shield,
  X,
  UserRound,
  Users,
} from "lucide-react";
import { NavigationHeader } from "@/components/sidebar/navigation-header";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@/lib/utils";

const MainTop = [
  {
    href: "/",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/staff",
    label: "Employees Management",
    icon: ClipboardList,
  },
];

const MainBottom = [
  {
    href: "/attendance",
    label: "Attendance Management",
    icon: ClipboardList,
  },
];

const sidebarLogoUrl = "/Hr Pulse.png";

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <SidebarContentBody
      key={pathname}
      pathname={pathname}
      onNavigate={onNavigate}
    />
  );
}

function SidebarContentBody({
  pathname,
  onNavigate,
}: {
  pathname: string;
  onNavigate?: () => void;
}) {
  const [settingsOpen, setSettingsOpen] = React.useState(
    pathname.startsWith("/settings")
  );
  const [candidateManagementOpen, setCandidateManagementOpen] = React.useState(
    pathname.startsWith("/candidatemanagement")
  );
  const inSettings = pathname.startsWith("/settings");
  const inCandidateManagement = pathname.startsWith("/candidatemanagement");
  const candidateManagementSections = [
    {
      href: "/candidatemanagement/candidateprofile",
      label: "Candidate Dashboard",
      icon: LayoutDashboard,
    },
    {
      href: "/candidatemanagement/open-positions",
      label: "Open Position",
      icon: BriefcaseBusiness,
    },
    {
      href: "/candidatemanagement/position-link-generator",
      label: "Position Link Generator",
      icon: Link2,
    },
  ];
  const settingsSections = [
    { href: "/settings/profile", label: "Profile", icon: UserRound },
    { href: "/settings/users", label: "Users", icon: Users },
    { href: "/settings/roles", label: "Roles", icon: Shield },
    { href: "/settings/permissions", label: "Permissions", icon: KeyRound },
    { href: "/settings/audit-logs", label: "Audit Logs", icon: ScrollText },
  ];

  return (
    <div className="flex h-full flex-col border-r border-[#ead9ae] bg-[#fff9e8]">
      <div className="border-b border-slate-200/80 px-4 py-4">
        <div className="h-28 w-full overflow-hidden rounded-xl border border-[#ead9ae] bg-[#fffdf5] shadow-sm ring-1 ring-[#ead9ae]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sidebarLogoUrl}
            alt="HR Pulse - Connecting People, Powering Progress"
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <nav className="grid gap-1 px-3">
        {MainTop.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition",
                active
                  ? "bg-amber-100 text-amber-950"
                  : "text-slate-600 hover:bg-lime-100 hover:text-green-950"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <button
            type="button"
            aria-expanded={candidateManagementOpen}
            aria-controls="candidate-management-navigation"
            onClick={() => setCandidateManagementOpen((open) => !open)}
            className={cn(
              "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:outline-none",
              inCandidateManagement
                ? "bg-amber-100 text-amber-950"
                : "text-slate-600 hover:bg-lime-100 hover:text-green-950"
            )}
          >
            <ClipboardList className="h-5 w-5" aria-hidden="true" />
            <span className="flex-1">Candidates Management</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                candidateManagementOpen && "rotate-180"
              )}
              aria-hidden="true"
            />
          </button>
          {candidateManagementOpen ? (
            <div
              id="candidate-management-navigation"
              className="mt-1 grid gap-1 pl-4"
            >
              {candidateManagementSections.map((section) => {
                const Icon = section.icon;
                const active = pathname === section.href;
                return (
                  <Link
                    key={section.href}
                    href={section.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:outline-none",
                      active
                        ? "bg-amber-200 text-amber-950"
                        : "text-slate-600 hover:bg-lime-100 hover:text-green-950"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{section.label}</span>
                  </Link>
                );
              })}
            </div>
          ) : null}
        {MainBottom.map((item) => {
          const Icon = item.icon;
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition",
                active
                  ? "bg-amber-100 text-amber-950"
                  : "text-slate-600 hover:bg-lime-100 hover:text-green-950"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        <div className="mt-2 border-t border-slate-100 pt-2">
          <button
            type="button"
            aria-expanded={settingsOpen}
            aria-controls="settings-navigation"
            onClick={() => setSettingsOpen((open) => !open)}
            className={cn(
              "flex min-h-11 w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:outline-none",
              inSettings
                ? "bg-amber-100 text-amber-950"
                : "text-slate-600 hover:bg-lime-100 hover:text-green-950"
            )}
          >
            <SettingsIcon className="h-5 w-5" aria-hidden="true" />
            <span className="flex-1">Settings</span>
            <ChevronDown
              className={cn(
                "h-4 w-4 transition-transform",
                settingsOpen && "rotate-180"
              )}
              aria-hidden="true"
            />
          </button>
          {settingsOpen ? (
            <div id="settings-navigation" className="mt-1 grid gap-1 pl-4">
              {settingsSections.map((section) => {
                const Icon = section.icon;
                const active = pathname === section.href;
                return (
                  <Link
                    key={section.href}
                    href={section.href}
                    onClick={onNavigate}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:outline-none",
                      active
                        ? "bg-amber-200 text-amber-950"
                        : "text-slate-600 hover:bg-lime-100 hover:text-green-950"
                    )}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    <span>{section.label}</span>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
      </nav>

      <div className="mt-auto border-t border-slate-200 p-4">
        <div className="rounded-xl bg-[#fff2d2] p-4">
          <p className="text-sm font-semibold text-slate-950">System Admin</p>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();
  const hasFormPageBackground = ["/addcandidate", "/addstaff", "/companymanagement", "/profile", "/candidatemanagement/open-positions", "/candidatemanagement/position-link-generator"].includes(pathname) || pathname.startsWith("/settings") || pathname.startsWith("/careers/");

  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname === "/forgot-password"
  ) {
    return <>{children}</>;
  }

  return (
    <div className={cn("min-h-screen", hasFormPageBackground ? "bg-sky-50" : "bg-slate-50")}>
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 lg:block">
        <SidebarContent />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Close sidebar backdrop"
            className="absolute inset-0 bg-slate-950/45"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-80 max-w-[86vw]">
            <div className="absolute top-3 right-3 z-10">
              <Button
                aria-label="Close navigation"
                variant="ghost"
                size="icon"
                onClick={() => setOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <SidebarContent onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      ) : null}

      <div className="lg:pl-72">
        <NavigationHeader onMenuClick={() => setOpen(true)} />

        <main className="mx-auto min-h-screen max-w-[1600px] px-4 py-5 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
