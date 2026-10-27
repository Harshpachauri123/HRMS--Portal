"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Menu, UserRound, X } from "lucide-react"
import { cn } from "@/lib/utils"

const links = [
  { href: "/employee/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/employee/profile", label: "Profile", icon: UserRound },
]

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  return (
    <div className="flex h-full flex-col border-r border-[#f1cbb5] bg-[#fce9df]">
      <div className="border-b border-[#f1cbb5] px-4 py-4">
        <Link
          href="/employee/dashboard"
          onClick={onNavigate}
          className="block h-28 w-full overflow-hidden rounded-xl border border-[#f0c8b1] bg-[#fff1e7] shadow-sm ring-1 ring-[#f0c8b1] transition hover:border-[#e9a886] hover:shadow-md focus-visible:ring-2 focus-visible:ring-[#eb5b25] focus-visible:outline-none"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Hr Pulse.png"
            alt="HR Pulse - Connecting People, Powering Progress"
            className="h-full w-full object-contain"
          />
        </Link>
      </div>
      <nav aria-label="Employee navigation" className="grid gap-1 px-3">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-11 items-center gap-3 rounded-full px-3 py-3 text-sm font-semibold transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-[#eb5b25] focus-visible:outline-none",
                active
                  ? "bg-[#eb5b25] text-white shadow-sm hover:bg-[#d94d1b]"
                  : "text-slate-700 hover:bg-white/70 hover:text-[#c74617]"
              )}
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto border-t border-[#f1cbb5] p-4">
        <div className="rounded-2xl border border-[#f0c8b1] bg-[#fff1e7] p-4 transition-colors duration-200 hover:border-[#e9a886] hover:bg-[#ffede1]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#eb5b25] text-sm font-bold text-white">
              AM
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-950">
                Aarav Mehta
              </p>
              <p className="truncate text-xs text-slate-600">Employee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EmployeeShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  return (
    <div className="min-h-screen bg-[#f8e5da]">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 lg:block">
        <Sidebar />
      </aside>
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            aria-label="Close navigation"
            className="absolute inset-0 bg-slate-950/45"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-80 max-w-[86vw]">
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 z-10 flex h-11 w-11 items-center justify-center rounded-lg text-slate-700 focus-visible:ring-2 focus-visible:ring-[#eb5b25] focus-visible:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex min-h-18 items-center justify-between border-b border-[#f1cbb5] bg-[#fce9df] px-4 py-3 sm:px-6 lg:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <button
              aria-label="Open navigation"
              onClick={() => setOpen(true)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-slate-700 hover:bg-white/60 focus-visible:ring-2 focus-visible:ring-[#eb5b25] focus-visible:outline-none lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h1 className="truncate text-base leading-tight font-bold text-[#202020] sm:text-2xl">
                HR Pulse - Connecting People, Powering Progress
              </h1>
              <p className="truncate text-sm font-medium text-slate-600">
                Employee Self Service - HRMS Portal
              </p>
            </div>
          </div>
          <div className="ml-3 hidden shrink-0 items-center gap-2 rounded-full border border-[#efc6ad] bg-white/75 py-1 pr-3 pl-1 sm:flex">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eb5b25] text-sm font-bold text-white shadow-sm">
              AM
            </span>
            <span className="hidden sm:block">
              <span className="block text-sm leading-tight font-semibold text-slate-900">
                Aarav Mehta
              </span>
              <span className="block text-xs leading-tight text-slate-600">
                Employee
              </span>
            </span>
          </div>
        </header>
        <main className="mx-auto min-h-[calc(100vh-4.5rem)] max-w-[1600px] px-4 pt-5 pb-28 sm:px-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
      <nav
        aria-label="Employee mobile navigation"
        className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t border-[#f1cbb5] bg-[#fff4ec]/95 px-3 pt-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] shadow-[0_-8px_24px_rgba(124,57,28,0.08)] backdrop-blur lg:hidden"
      >
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl text-xs font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-[#eb5b25] focus-visible:outline-none",
                active
                  ? "bg-[#ffe2d2] text-[#c74617]"
                  : "text-slate-600 hover:bg-white hover:text-[#c74617]"
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
