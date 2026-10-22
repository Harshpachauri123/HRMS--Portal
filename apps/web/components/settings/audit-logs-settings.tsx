"use client"

import {
  CircleAlert,
  Clock3,
  ChevronLeft,
  ChevronRight,
  Check,
  Search,
  Copy,
} from "lucide-react"
import * as React from "react"

import {
  SettingsAlert as Alert,
  SettingsBadge as Badge,
  SettingsButton as Button,
  SettingsInput as Input,
  SettingsLabel as Label,
  SettingsTable as Table,
  SettingsTableBody as TableBody,
  SettingsTableCell as TableCell,
  SettingsTableHead as TableHead,
  SettingsTableHeader as TableHeader,
  SettingsTableRow as TableRow,
} from "@/components/settings/settings-ui"
import {
  MOCK_AUDIT_LOGS,
  type SettingsAuditLog,
} from "@/lib/settings-mock-data"
import {
  cardClass,
  fieldClass,
  PageHeader,
} from "@/components/settings/settings-common"

export function AuditLogsSettings() {
  const [logs] = React.useState<SettingsAuditLog[]>([...MOCK_AUDIT_LOGS])
  const [search, setSearch] = React.useState("")
  const [moduleFilter, setModuleFilter] = React.useState("all")
  const [copiedLogId, setCopiedLogId] = React.useState<string | null>(null)
  const [fromDate, setFromDate] = React.useState("")
  const [toDate, setToDate] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState(false)
  const [page, setPage] = React.useState(1)
  const pageSize = 10

  React.useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350)
    return () => window.clearTimeout(timer)
  }, [])

  const entities = React.useMemo(
    () => [...new Set(logs.map((log) => log.module))].sort(),
    [logs]
  )
  const filteredLogs = React.useMemo(() => {
    const query = search.trim().toLocaleLowerCase()
    return logs.filter((log) => {
      const date = log.timestamp.slice(0, 10)
      if (fromDate && date < fromDate) return false
      if (toDate && date > toDate) return false
      if (moduleFilter !== "all" && log.module !== moduleFilter) return false
      if (!query) return true
      return [log.user, log.action, log.module].some((value) =>
        value.toLocaleLowerCase().includes(query)
      )
    })
  }, [logs, search, moduleFilter, fromDate, toDate])
  const pageCount = Math.max(1, Math.ceil(filteredLogs.length / pageSize))
  const visibleLogs = filteredLogs.slice((page - 1) * pageSize, page * pageSize)
  React.useEffect(() => setPage(1), [search, moduleFilter, fromDate, toDate])

  function retryLoad() {
    setLoadError(false)
    setLoading(true)
    window.setTimeout(() => setLoading(false), 350)
  }

  async function copyEntityId(id: string) {
    try {
      await navigator.clipboard.writeText(id)
      setCopiedLogId(id)
      window.setTimeout(() => setCopiedLogId(null), 1500)
    } catch {
      setCopiedLogId(null)
    }
  }

  function clearFilters() {
    setSearch("")
    setModuleFilter("all")
    setFromDate("")
    setToDate("")
  }

  return (
    <div className="space-y-4">
      <PageHeader section="audit-logs" />
      <section className={`${cardClass} overflow-hidden`}>
        <div className="grid gap-3 border-b border-slate-200 p-4 sm:grid-cols-2 lg:grid-cols-[minmax(0,1fr)_160px_300px] lg:items-end lg:p-4">
          <div className="relative min-w-0 sm:col-span-2 lg:col-span-1">
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500"
                aria-hidden="true"
              />
              <Input
                id="audit-search"
                className="h-10 pl-9"
                placeholder="Search action, entity, actor..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="audit-module-filter">Entity</Label>
            <select
              id="audit-module-filter"
              className={fieldClass}
              value={moduleFilter}
              onChange={(event) => setModuleFilter(event.target.value)}
            >
              <option value="all">All entities</option>
              {entities.map((entity) => (
                <option key={entity} value={entity}>
                  {entity}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3 lg:col-span-1">
            <div className="space-y-1.5">
              <Label htmlFor="audit-from">From</Label>
              <Input
                id="audit-from"
                type="date"
                className="h-10"
                value={fromDate}
                max={toDate || undefined}
                onChange={(event) => setFromDate(event.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="audit-to">To</Label>
              <Input
                id="audit-to"
                type="date"
                className="h-10"
                value={toDate}
                min={fromDate || undefined}
                onChange={(event) => setToDate(event.target.value)}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div
            className="space-y-3 p-5"
            aria-busy="true"
            aria-label="Loading audit logs"
          >
            {Array.from({ length: 5 }, (_, index) => (
              <div
                key={index}
                className="h-12 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        ) : loadError ? (
          <div className="p-5">
            <Alert variant="destructive">
              <CircleAlert className="size-4" aria-hidden="true" />
              <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-3">
                Could not load audit logs.
                <Button
                  type="button"
                  variant="outline"
                  className="h-9"
                  onClick={retryLoad}
                >
                  Retry
                </Button>
              </div>
            </Alert>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <Clock3
              className="mx-auto size-8 text-slate-400"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-semibold text-slate-900">
              No matching audit logs
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Adjust the search or filters to see activity.
            </p>
            <Button
              type="button"
              variant="outline"
              className="mt-4 h-9 cursor-pointer"
              onClick={clearFilters}
            >
              Clear filters
            </Button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table className="min-w-[980px] table-fixed">
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="w-[23%] px-4">When</TableHead>
                    <TableHead className="w-[25%]">Actor</TableHead>
                    <TableHead className="w-[17%]">Action</TableHead>
                    <TableHead className="w-[22%]">Entity</TableHead>
                    <TableHead className="w-[13%]">Entity ID</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="px-4 py-3 text-slate-600">
                        {new Date(log.timestamp).toLocaleString("en-US", {
                          dateStyle: "short",
                          timeStyle: "medium",
                        })}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2.5">
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-[11px] font-semibold text-indigo-700">
                            {log.user
                              .split(/\s+/)
                              .map((part) => part[0])
                              .slice(0, 2)
                              .join("")
                              .toUpperCase()}
                          </span>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-slate-900">
                              {log.user}
                            </p>
                            <p className="truncate text-xs text-slate-500">
                              {log.user.toLowerCase().replace(/\s+/g, ".")}
                              @sdvedutech.com
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className="border-indigo-100 bg-indigo-50 text-indigo-800"
                        >
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-900">
                        {log.module}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <span
                            className="max-w-28 truncate font-mono text-xs text-slate-700"
                            title={log.id}
                          >
                            {log.id}
                          </span>
                          <button
                            type="button"
                            aria-label={`Copy entity ID ${log.id}`}
                            title="Copy entity ID"
                            onClick={() => void copyEntityId(log.id)}
                            className="rounded p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500"
                          >
                            {copiedLogId === log.id ? (
                              <Check className="size-3.5 text-emerald-600" />
                            ) : (
                              <Copy className="size-3.5" />
                            )}
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                Showing {(page - 1) * pageSize + 1}–
                {Math.min(page * pageSize, filteredLogs.length)} of{" "}
                {filteredLogs.length} entries
              </p>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 cursor-pointer"
                  disabled={page <= 1}
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                >
                  <ChevronLeft className="size-4" aria-hidden="true" /> Previous
                </Button>
                <span
                  aria-live="polite"
                  className="min-w-16 text-center text-sm text-slate-700"
                >
                  Page {page} of {pageCount}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  className="h-9 cursor-pointer"
                  disabled={page >= pageCount}
                  onClick={() =>
                    setPage((current) => Math.min(pageCount, current + 1))
                  }
                >
                  Next <ChevronRight className="size-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  )
}
