import { ChevronDown, LogOut, Menu, UserRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

interface NavigationHeaderProps {
  onMenuClick: () => void;
  user?: {
    name: string;
    email: string;
    role: string;
  } | null;
  menuOpen?: boolean;
  onToggleMenu?: () => void;
  onCloseMenu?: () => void;
  onLogout?: () => void;
  isLoggingOut?: boolean;
  isLoaded?: boolean;
}

export function NavigationHeader({
  onMenuClick,
  user = null,
  menuOpen = false,
  onToggleMenu,
  onCloseMenu,
  onLogout,
  isLoggingOut = false,
  isLoaded = true,
}: NavigationHeaderProps) {
  const initials = user?.name
    ?.trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-20 flex min-h-18 items-center justify-between border-b border-[#ead9ae] bg-[#fff9e8] px-4 py-3 sm:px-6 lg:px-7">
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
          <h1 className="truncate text-base font-bold leading-tight text-emerald-600 sm:text-2xl">
            HR Pulse - Connecting People, Powering Progress
          </h1>
          <p>
            <span className="truncate text-sm font-medium text-slate-500">
              Staff Management - HRMS Portal
            </span>
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">

        {user ? (
          <div className="relative">
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              onClick={onToggleMenu}
              className="flex min-h-12 items-center gap-2 rounded-full border border-[#ead9ae] bg-[#fff2d2] py-1 pl-1 pr-3 text-left transition hover:border-lime-300 hover:bg-lime-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-2"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-700 text-sm font-bold text-white shadow-sm">
                {initials}
              </span>
              <span className="hidden min-w-0 sm:block">
                <span className="block max-w-36 truncate text-sm font-semibold leading-tight text-slate-900">
                  {user.name}
                </span>
                <span className="block text-xs leading-tight text-slate-600">
                  {user.role.replaceAll("_", " ")}
                </span>
              </span>
              <ChevronDown className="h-4 w-4 text-slate-500" />
            </button>

            {menuOpen && (
              <>
                <button
                  type="button"
                  aria-label="Close account menu"
                  className="fixed inset-0 z-30 cursor-default"
                  onClick={onCloseMenu}
                />
                <div
                  role="menu"
                  className="absolute right-0 z-40 mt-2 w-72 overflow-hidden rounded-2xl border border-[#ead9ae] bg-[#fffdf5] shadow-xl shadow-slate-900/10"
                >
                  <div className="border-b border-slate-200 px-4 py-3">
                    <p className="truncate text-sm font-semibold text-slate-900">{user.name}</p>
                    <p className="truncate text-xs text-slate-500">{user.email}</p>
                    <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                      {user.role.replaceAll("_", " ")}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    role="menuitem"
                    onClick={onCloseMenu}
                    className="flex min-h-11 items-center gap-2 px-4 text-sm font-medium text-slate-800 transition hover:bg-lime-100 hover:text-green-950 focus-visible:bg-lime-100 focus-visible:outline-none"
                  >
                    <UserRound className="h-4 w-4 text-slate-500" />
                    Profile &amp; password
                  </Link>
                  <button
                    type="button"
                    role="menuitem"
                    disabled={isLoggingOut || !isLoaded}
                    onClick={onLogout}
                    className="flex min-h-11 w-full items-center gap-2 border-t border-[#ead9ae] px-4 text-left text-sm font-medium text-slate-800 transition hover:bg-lime-100 hover:text-green-950 focus-visible:bg-lime-100 focus-visible:outline-none disabled:opacity-60"
                  >
                    <LogOut className="h-4 w-4 text-slate-500" />
                    {isLoggingOut ? "Logging out..." : "Log out"}
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
          
          </div>
        )}
      </div>
    </header>
  );
}
