"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ClipboardList,
  LayoutDashboard,
  X,
} from "lucide-react";
import { NavigationHeader } from "@/components/sidebar/navigation-header";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@/lib/utils";

const Main = [
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
  {
    href: "/candidates",
    label: "Candidates Management",
    icon: ClipboardList,
  },
   {
    href: "/attendance",
    label: "Attendance Management",
    icon: ClipboardList,
  },
];

const sidebarLogoUrl =
  "/sdv logo.png";

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
  return (
    <div className="flex h-full flex-col border-r border-slate-200 bg-white">
      <div className="flex h-20 items-center gap-2 px-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={sidebarLogoUrl}
          alt="SDV Edutech logo"
          className="h-auto w-24 shrink-0 object-contain"
        />
        <div>
          <p className="text-sm font-bold text-red-800">SDV Edutech Pvt. Ltd.</p>
          <p className="text-xs font-medium text-red-500">HRMS Management</p>
        </div>
      </div>

      <nav className="grid gap-1 px-3">
        {Main.map((item) => {
          const Icon = item.icon;
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition",
                active
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-slate-200 p-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-semibold text-slate-950">System Admin</p>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  if (
    pathname.startsWith("/sign-in") ||
    pathname.startsWith("/sign-up") ||
    pathname === "/forgot-password"
  ) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-slate-50">
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
            <div className="absolute right-3 top-3 z-10">
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
