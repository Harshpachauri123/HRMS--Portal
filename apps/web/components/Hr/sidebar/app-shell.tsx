"use client"

import { NavigationHeader } from "@/components/Hr/sidebar/navigation-header"
import { cn } from "@/lib/utils"
import { Button } from "@workspace/ui/components/button"
import {
    BriefcaseBusiness,
    CalendarCheck,
    ChevronDown,
    ClipboardList,
    KeyRound,
    LayoutDashboard,
    Link2,
    ScrollText,
    Settings as SettingsIcon,
    Shield,
    UserRound,
    Users,
    X,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import * as React from "react"

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
]

const MainBottom = [
  {
    href: "/attendance",
    label: "Attendance Management",
    icon: ClipboardList,
  },
  {
    href: "/companymanagement",
    label: "Company Management",
    icon: ClipboardList,
  },
]

const sidebarLogoUrl = "/teamora.png"

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()

  return (
    <SidebarContentBody
      key={pathname}
      pathname={pathname}
      onNavigate={onNavigate}
    />
  )
}

function SidebarContentBody({
  pathname,
  onNavigate,
}: {
  pathname: string
  onNavigate?: () => void
}) {
  const [settingsOpen, setSettingsOpen] = React.useState(
    pathname.startsWith("/settings")
  )
  const [candidateManagementOpen, setCandidateManagementOpen] = React.useState(
    pathname.startsWith("/candidatemanagement")
  )
  const inSettings = pathname.startsWith("/settings")
  const inCandidateManagement = pathname.startsWith("/candidatemanagement")
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
      href: "/candidatemanagement/applyform",
      label: "Apply Form",
      icon: Link2,
    },
  ]
  const settingsSections = [
    { href: "/settings/profile", label: "Profile", icon: UserRound },
    { href: "/settings/users", label: "Users", icon: Users },
    { href: "/settings/roles", label: "Roles", icon: Shield },
    { href: "/settings/permissions", label: "Permissions", icon: KeyRound },
    { href: "/settings/audit-logs", label: "Audit Logs", icon: ScrollText },
  ]

  return (
    <div className="flex h-full flex-col border-r border-[#ead9ae] bg-[#fff9e8]">
      <div className="border-b border-slate-200/80 px-4 py-4">
        <div className="aspect-video w-full overflow-hidden rounded-xl border border-[#ead9ae] bg-[#fffdf5] shadow-sm ring-1 ring-[#ead9ae]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sidebarLogoUrl}
            alt="Teamora - People First. Progress Together."
            className="h-full w-full object-contain"
          />
        </div>
      </div>

      <nav className="grid gap-1 px-3">
        {MainTop.map((item) => {
          const Icon = item.icon
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href)

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
          )
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
              const Icon = section.icon
              const active = pathname === section.href
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
              )
            })}
          </div>
        ) : null}
        {MainBottom.map((item) => {
          const Icon = item.icon
          const active = pathname.startsWith(item.href)
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
          )
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
                const Icon = section.icon
                const active = pathname === section.href
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
                )
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
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false)
  const [mobileSubmenu, setMobileSubmenu] = React.useState<
    "candidates" | "settings" | null
  >(null)
  const pathname = usePathname()
  const hasFormPageBackground =
    [
      "/addcandidate",
      "/addstaff",
      "/companymanagement",
      "/profile",
      "/candidatemanagement/open-positions",
      "/candidatemanagement/position-link-generator",
    ].includes(pathname) ||
    pathname.startsWith("/settings") ||
    pathname.startsWith("/careers/")
  const appBackground = pathname.startsWith("/settings")
    ? "bg-[#fce9df]"
    : hasFormPageBackground
      ? "bg-sky-50"
      : "bg-slate-50"

  if (
    pathname.startsWith("/employee") ||
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname === "/forgot-password"
  ) {
    return <>{children}</>
  }

  // Public career pages are shared with applicants and must not expose the admin shell.
  if (
    pathname.startsWith("/careers/") ||
    pathname === "/candidatemanagement/applyform"
  ) {
    return <>{children}</>
  }

  return (
    <div className={cn("min-h-screen", appBackground)}>
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
        <NavigationHeader
          onMenuClick={() => {
            setMobileSubmenu(null)
            setOpen(true)
          }}
        />

        <main className="mx-auto min-h-screen max-w-[1600px] px-4 pt-5 pb-28 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>

      {mobileSubmenu ? (
        <button
          type="button"
          aria-label="Close mobile navigation menu"
          className="fixed inset-0 z-20 bg-slate-950/10 lg:hidden"
          onClick={() => setMobileSubmenu(null)}
        />
      ) : null}

      {mobileSubmenu === "candidates" ? (
        <nav
          id="mobile-candidate-menu"
          aria-label="Candidate management pages"
          className="fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-40 max-h-[60vh] overflow-y-auto rounded-2xl border border-[#ead9ae] bg-[#fff9e8] p-2 shadow-xl lg:hidden"
        >
          {[
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
              href: "/candidatemanagement/applyform",
              label: "Apply Form",
              icon: Link2,
            },
          ].map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileSubmenu(null)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:outline-none",
                  active
                    ? "bg-amber-100 text-amber-950"
                    : "text-slate-700 hover:bg-lime-100"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </Link>
            )
          })}
        </nav>
      ) : null}

      {mobileSubmenu === "settings" ? (
        <nav
          id="mobile-settings-menu"
          aria-label="Settings pages"
          className="fixed inset-x-3 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] z-40 max-h-[60vh] overflow-y-auto rounded-2xl border border-[#ead9ae] bg-[#fff9e8] p-2 shadow-xl lg:hidden"
        >
          {[
            { href: "/settings/profile", label: "Profile", icon: UserRound },
            { href: "/settings/users", label: "Users", icon: Users },
            { href: "/settings/roles", label: "Roles", icon: Shield },
            {
              href: "/settings/permissions",
              label: "Permissions",
              icon: KeyRound,
            },
            {
              href: "/settings/audit-logs",
              label: "Audit Logs",
              icon: ScrollText,
            },
          ].map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileSubmenu(null)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-12 items-center gap-3 rounded-xl px-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:outline-none",
                  active
                    ? "bg-amber-100 text-amber-950"
                    : "text-slate-700 hover:bg-lime-100"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                {label}
              </Link>
            )
          })}
        </nav>
      ) : null}

      <nav
        aria-label="Main mobile navigation"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 gap-1 border-t border-[#ead9ae] bg-[#fff9e8]/95 px-2 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] shadow-[0_-8px_24px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden"
      >
        <Link
          href="/"
          onClick={() => setMobileSubmenu(null)}
          aria-current={pathname === "/" ? "page" : undefined}
          className={cn(
            "flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-center text-[10px] leading-tight font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:outline-none",
            pathname === "/"
              ? "bg-amber-100 text-amber-950"
              : "text-slate-600 hover:bg-lime-100"
          )}
        >
          <LayoutDashboard className="h-5 w-5" aria-hidden="true" />
          Dashboard
        </Link>
        <Link
          href="/staff"
          onClick={() => setMobileSubmenu(null)}
          aria-label="Employee management"
          aria-current={pathname.startsWith("/staff") ? "page" : undefined}
          className={cn(
            "flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-center text-[10px] leading-tight font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:outline-none",
            pathname.startsWith("/staff")
              ? "bg-amber-100 text-amber-950"
              : "text-slate-600 hover:bg-lime-100"
          )}
        >
          <ClipboardList className="h-5 w-5" aria-hidden="true" />
          Employees
        </Link>
        <button
          type="button"
          aria-label="Candidate management"
          aria-expanded={mobileSubmenu === "candidates"}
          aria-controls="mobile-candidate-menu"
          onClick={() =>
            setMobileSubmenu((current) =>
              current === "candidates" ? null : "candidates"
            )
          }
          className={cn(
            "flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-center text-[10px] leading-tight font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:outline-none",
            pathname.startsWith("/candidatemanagement") ||
              mobileSubmenu === "candidates"
              ? "bg-amber-100 text-amber-950"
              : "text-slate-600 hover:bg-lime-100"
          )}
        >
          <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
          Candidates
        </button>
        <Link
          href="/attendance"
          onClick={() => setMobileSubmenu(null)}
          aria-current={pathname.startsWith("/attendance") ? "page" : undefined}
          className={cn(
            "flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-center text-[10px] leading-tight font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:outline-none",
            pathname.startsWith("/attendance")
              ? "bg-amber-100 text-amber-950"
              : "text-slate-600 hover:bg-lime-100"
          )}
        >
          <CalendarCheck className="h-5 w-5" aria-hidden="true" />
          Attendance
        </Link>
        <button
          type="button"
          aria-label="Settings"
          aria-expanded={mobileSubmenu === "settings"}
          aria-controls="mobile-settings-menu"
          onClick={() =>
            setMobileSubmenu((current) =>
              current === "settings" ? null : "settings"
            )
          }
          className={cn(
            "flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 text-center text-[10px] leading-tight font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:outline-none",
            pathname.startsWith("/settings") || mobileSubmenu === "settings"
              ? "bg-amber-100 text-amber-950"
              : "text-slate-600 hover:bg-lime-100"
          )}
        >
          <SettingsIcon className="h-5 w-5" aria-hidden="true" />
          Settings
        </button>
      </nav>
    </div>
  )
}
