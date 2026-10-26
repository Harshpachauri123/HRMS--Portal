"use client"

import * as React from "react"
import { X } from "lucide-react"

export function SettingsButton({
  variant = "default",
  className = "",
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?:
    "default" | "primary" | "outline" | "ghost" | "danger" | "destructive"
}) {
  const styles = {
    default:
      "border border-lime-600 bg-lime-600 text-slate-950 hover:border-lime-400 hover:bg-lime-400",
    primary:
      "border border-lime-600 bg-lime-600 text-slate-950 hover:border-lime-400 hover:bg-lime-400",
    outline:
      "border border-slate-300 bg-[#fbfdf6] text-slate-800 hover:border-lime-400 hover:bg-lime-100",
    ghost:
      "border border-transparent bg-transparent text-slate-700 hover:bg-lime-100",
    danger:
      "border border-rose-700 bg-rose-700 text-white hover:border-rose-800 hover:bg-rose-800",
    destructive:
      "border border-rose-700 bg-rose-700 text-white hover:border-rose-800 hover:bg-rose-800",
  }

  return (
    <button
      type={type}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-3.5 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${styles[variant]} ${className}`}
      {...props}
    />
  )
}

export function SettingsInput({
  className = "",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`h-10 w-full rounded-lg border border-slate-300 bg-[#fbfdf6] px-3 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-lime-600 focus:ring-2 focus:ring-lime-600/20 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-500 ${className}`}
      {...props}
    />
  )
}

export function SettingsLabel({
  className = "",
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={`block text-sm font-medium text-slate-800 ${className}`}
      {...props}
    />
  )
}

export function SettingsBadge({
  variant = "outline",
  className = "",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "outline" | "neutral" | "indigo" | "success"
}) {
  const styles = {
    neutral: "border-slate-300 bg-slate-100 text-slate-800",
    indigo: "border-lime-200 bg-lime-50 text-lime-800",
    success: "border-emerald-200 bg-emerald-50 text-emerald-800",
    outline: "border-slate-300 bg-white text-slate-800",
  }
  return (
    <span
      className={`inline-flex h-6 w-fit shrink-0 items-center rounded-full border px-2.5 text-xs font-medium ${styles[variant]} ${className}`}
      {...props}
    />
  )
}

export function SettingsTable({
  className = "",
  ...props
}: React.TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={`w-full border-collapse text-left text-sm ${className}`}
        {...props}
      />
    </div>
  )
}

export function SettingsTableHeader({
  className = "",
  ...props
}: React.ComponentProps<"thead">) {
  return <thead className={className} {...props} />
}

export function SettingsTableBody({
  className = "",
  ...props
}: React.ComponentProps<"tbody">) {
  return <tbody className={className} {...props} />
}

export function SettingsTableHead({
  className = "",
  ...props
}: React.ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`h-11 border-b border-slate-200 bg-slate-50 px-4 text-left text-xs font-semibold tracking-wide whitespace-nowrap text-slate-600 ${className}`}
      {...props}
    />
  )
}

export function SettingsTableCell({
  className = "",
  ...props
}: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={`border-b border-slate-100 px-4 py-3 align-middle text-sm text-slate-700 ${className}`}
      {...props}
    />
  )
}

export function SettingsTableRow({
  className = "",
  ...props
}: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`transition-colors hover:bg-slate-50 last:[&>td]:border-b-0 ${className}`}
      {...props}
    />
  )
}

export function SettingsAlert({
  children,
  className = "",
  variant: _variant,
}: {
  children: React.ReactNode
  className?: string
  variant?: "destructive" | "default"
}) {
  return (
    <div
      role="alert"
      className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-800 ${className}`}
    >
      {children}
    </div>
  )
}

export function SettingsDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  width = "max-w-xl",
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  children: React.ReactNode
  footer?: React.ReactNode
  width?: "max-w-md" | "max-w-xl"
}) {
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const titleId = React.useId()
  const descriptionId = React.useId()

  React.useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault()
        onOpenChange(false)
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onOpenChange(false)
      }}
      className={`fixed inset-0 m-auto w-[calc(100%-2rem)] ${width} max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-950/50 backdrop:backdrop-blur-[2px]`}
    >
      <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4 sm:px-6">
        <div className="min-w-0">
          <h2 id={titleId} className="text-lg font-semibold text-slate-950">
            {title}
          </h2>
          <p
            id={descriptionId}
            className="mt-1 text-sm leading-5 text-slate-600"
          >
            {description}
          </p>
        </div>
        <button
          type="button"
          aria-label="Close dialog"
          onClick={() => onOpenChange(false)}
          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:outline-none"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
      <div className="px-5 py-5 sm:px-6">{children}</div>
      {footer ? (
        <div className="flex flex-col-reverse gap-2 border-t border-slate-200 bg-slate-50 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          {footer}
        </div>
      ) : null}
    </dialog>
  )
}
