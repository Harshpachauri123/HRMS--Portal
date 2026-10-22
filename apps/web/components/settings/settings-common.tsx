"use client"

import { Check, CircleAlert } from "lucide-react"
import * as React from "react"

import {
  SettingsBadge as Badge,
  SettingsButton as Button,
  SettingsDialog,
} from "@/components/settings/settings-ui"
import type { SettingsUser } from "@/lib/settings-mock-data"

export type Section =
  "profile" | "users" | "roles" | "permissions" | "audit-logs"

const pageInfo: Record<Section, { title: string; description: string }> = {
  profile: {
    title: "Profile",
    description: "Review your account details, password, and active sessions.",
  },
  users: {
    title: "Users",
    description: "Manage staff profiles and their account status.",
  },
  roles: {
    title: "Roles",
    description: "Review the HRMS roles and the users assigned to each role.",
  },
  permissions: {
    title: "Permissions",
    description:
      "Permission catalog and module details will be shown here when provided.",
  },
  "audit-logs": {
    title: "Audit Logs",
    description: "Immutable history of administrative and domain actions.",
  },
}

export const cardClass = "rounded-xl border border-slate-200 bg-white shadow-sm"
export const fieldClass =
  "h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500"

export function PageHeader({ section }: { section: Section }) {
  const info = pageInfo[section]
  return (
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="min-w-0 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-950">
          {info.title}
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-600">
          {info.description}
        </p>
      </div>
    </div>
  )
}

export function SectionTitle({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <div>
      <h2 className="text-base font-semibold text-slate-950">{title}</h2>
      {description ? (
        <p className="mt-1 text-sm leading-5 text-slate-600">{description}</p>
      ) : null}
    </div>
  )
}

export function StatusBadge({ status }: { status: SettingsUser["status"] }) {
  const active = status === "Active"
  const suspended = status === "Suspended"
  return (
    <Badge
      variant="outline"
      className={
        active
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : suspended
            ? "border-amber-200 bg-amber-50 text-amber-800"
            : "border-slate-300 bg-slate-100 text-slate-700"
      }
    >
      <span
        aria-hidden="true"
        className={`mr-1.5 size-1.5 rounded-full ${active ? "bg-emerald-600" : suspended ? "bg-amber-600" : "bg-slate-500"}`}
      />
      {status}
    </Badge>
  )
}

export function Feedback({
  kind,
  children,
}: {
  kind: "success" | "error"
  children: React.ReactNode
}) {
  return (
    <div
      role={kind === "error" ? "alert" : "status"}
      className={`flex items-start gap-2 rounded-lg border px-3 py-2.5 text-sm ${
        kind === "error"
          ? "border-rose-200 bg-rose-50 text-rose-800"
          : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
    >
      {kind === "error" ? (
        <CircleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      ) : (
        <Check className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      )}
      <span>{children}</span>
    </div>
  )
}

export type PendingConfirmation = {
  title: string
  description: string
  confirmLabel: string
  destructive?: boolean
  apply: () => void
}

export function ConfirmDialog({
  action,
  onClose,
  onConfirm,
  loading,
}: {
  action: PendingConfirmation | null
  onClose: () => void
  onConfirm: () => void
  loading: boolean
}) {
  return (
    <SettingsDialog
      open={Boolean(action)}
      onOpenChange={(open) => !open && onClose()}
      title={action?.title ?? "Confirm action"}
      description={action?.description ?? "Confirm this action."}
      width="max-w-md"
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            className="h-10 cursor-pointer"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant={action?.destructive ? "destructive" : "default"}
            className="h-10 cursor-pointer"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Please wait…" : action?.confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-sm text-slate-700">
        This change is limited to the local preview.
      </p>
    </SettingsDialog>
  )
}
