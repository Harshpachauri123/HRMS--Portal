"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

const sections = [
  { label: "Profile", href: "/settings/profile" },
  { label: "Users", href: "/settings/users" },
  { label: "Roles", href: "/settings/roles" },
  { label: "Permissions", href: "/settings/permissions" },
  { label: "Audit Logs", href: "/settings/audit-logs" },
]

export function SettingsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-semibold tracking-wider text-indigo-700">
          ACCESS &amp; ADMINISTRATION
        </p>
        <p className="mt-1 text-sm text-slate-600">
          Manage staff accounts, profile details, and administrative activity.
        </p>
      </div>

      <nav
        aria-label="Settings sections"
        className="flex gap-1 overflow-x-auto border-b border-slate-200 [scrollbar-width:thin]"
      >
        {sections.map((section) => {
          const active = pathname === section.href
          return (
            <Link
              key={section.href}
              href={section.href}
              aria-current={active ? "page" : undefined}
              className={`min-h-11 shrink-0 border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none focus-visible:ring-inset ${
                active
                  ? "border-indigo-600 text-indigo-700"
                  : "border-transparent text-slate-600 hover:text-slate-950"
              }`}
            >
              {section.label}
            </Link>
          )
        })}
      </nav>

      {children}
    </div>
  )
}
