"use client"

import { KeyRound } from "lucide-react"

import { cardClass, PageHeader } from "@/components/settings/settings-common"

export function PermissionsSettings() {
  return (
    <div className="space-y-4">
      <PageHeader section="permissions" />
      <section
        className={`${cardClass} flex min-h-72 flex-col items-center justify-center px-5 py-12 text-center`}
      >
        <span className="flex size-11 items-center justify-center rounded-full bg-slate-100 text-slate-600">
          <KeyRound className="size-5" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-sm font-semibold text-slate-950">
          Permission catalog is empty
        </h2>
        <p className="mt-1 max-w-md text-sm leading-6 text-slate-600">
          No permission names, modules, or access rules have been supplied for
          this frontend preview.
        </p>
        <p className="mt-3 text-xs text-slate-500">
          This area is ready to display permission data when it is provided.
        </p>
      </section>
    </div>
  )
}
