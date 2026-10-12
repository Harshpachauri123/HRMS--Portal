"use client";

import { Bell, Menu } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

interface NavigationHeaderProps {
  onMenuClick: () => void;
}

export function NavigationHeader({ onMenuClick }: NavigationHeaderProps) {
  return (
    <header className="sticky top-0 z-20 flex min-h-18 items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-7">
      <div className="flex min-w-0 items-center gap-3">
        <Button
          aria-label="Open navigation"
          variant="ghost"
          size="icon"
          className="shrink-0 lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="min-w-0">
          <h1 className="truncate text-base font-bold leading-tight text-slate-950 sm:text-2xl">
            Staff Management - HRMS Portal
          </h1>
          <p className="mt-1 truncate text-xs font-medium text-rose-800">
            SDV Edutech Pvt. Ltd.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          suppressHydrationWarning
          type="button"
          aria-label="Notifications"
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50 hover:text-slate-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-2.5 top-2.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-rose-500" />
        </button>

        <Button
          className="h-11 rounded-2xl px-5 font-bold">Sign-up</Button>
      </div>
    </header>
  );
}
