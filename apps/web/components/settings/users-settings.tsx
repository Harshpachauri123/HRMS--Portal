"use client"

import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  KeyRound,
  Plus,
  Search,
  Users,
} from "lucide-react"
import * as React from "react"

import {
  SettingsAlert as Alert,
  SettingsBadge as Badge,
  SettingsButton as Button,
  SettingsDialog,
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
  MOCK_USERS,
  SETTINGS_ROLES,
  type SettingsRole,
  type SettingsUser,
} from "@/lib/settings-mock-data"
import {
  cardClass,
  fieldClass,
} from "@/components/settings/settings-common"

type UserDraft = Omit<SettingsUser, "id"> & { initialPassword: string }

const userStatusStyles: Record<SettingsUser["status"], string> = {
  Active: "border-emerald-200 bg-emerald-50 text-emerald-800",
  Inactive: "border-slate-300 bg-slate-100 text-slate-700",
  Suspended: "border-amber-200 bg-amber-50 text-amber-800",
}

const userStatusDots: Record<SettingsUser["status"], string> = {
  Active: "bg-emerald-600",
  Inactive: "bg-slate-500",
  Suspended: "bg-amber-600",
}

function UserFormDialog({
  open,
  user,
  onOpenChange,
  onSave,
}: {
  open: boolean
  user: SettingsUser | null
  onOpenChange: (open: boolean) => void
  onSave: (draft: UserDraft) => void
}) {
  const [draft, setDraft] = React.useState<UserDraft>({
    name: "",
    email: "",
    department: "Unassigned",
    designation: "Staff",
    roles: ["User"],
    status: "Active",
    initialPassword: "",
  })
  const [resetLinkGenerated, setResetLinkGenerated] = React.useState(false)

  React.useEffect(() => {
    setDraft(
      user
        ? {
            name: user.name,
            email: user.email,
            department: user.department,
            designation: user.designation,
            roles: user.roles,
            status: user.status,
            initialPassword: "",
          }
        : {
            name: "",
            email: "",
            department: "Unassigned",
            designation: "Staff",
            roles: ["User"],
            status: "Active",
            initialPassword: "",
          }
    )
    setResetLinkGenerated(false)
  }, [user, open])

  function update<K extends keyof UserDraft>(key: K, value: UserDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }))
  }

  return (
    <SettingsDialog
      open={open}
      onOpenChange={onOpenChange}
      title={user ? "Edit user" : "Create staff user"}
      description={user ? user.email : "Set an initial password for account sign-in and assign roles."}
      width="max-w-xl"
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            className="h-10 cursor-pointer"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="settings-user-form"
            className="h-10 cursor-pointer"
          >
            {user ? "Save" : "Create"}
          </Button>
        </>
      }
    >
      <form
        id="settings-user-form"
        onSubmit={(event) => {
          event.preventDefault()
          if (draft.roles.length === 0) return
          onSave(draft)
        }}
        className="space-y-5 py-1"
      >
        <section className="space-y-3">
          <p className="text-xs font-semibold tracking-wide text-slate-500">PROFILE</p>
          <div className="space-y-1.5">
            <Label htmlFor="settings-user-name">Name</Label>
            <Input id="settings-user-name" required maxLength={100} value={draft.name} onChange={(event) => update("name", event.target.value)} />
          </div>
          {!user && <>
            <div className="space-y-1.5">
              <Label htmlFor="settings-user-email">Email / Employee ID</Label>
              <Input id="settings-user-email" type="text" required maxLength={254} value={draft.email} onChange={(event) => update("email", event.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="settings-user-password">Initial password</Label>
              <Input id="settings-user-password" type="password" required minLength={8} autoComplete="new-password" value={draft.initialPassword} onChange={(event) => update("initialPassword", event.target.value)} />
            </div>
          </>}
        </section>
        {user && <section className="space-y-2">
          <p className="text-xs font-semibold tracking-wide text-slate-500">STATUS</p>
          <select aria-label="User status" className={fieldClass} value={draft.status} onChange={(event) => update("status", event.target.value as SettingsUser["status"])}>
            <option value="Active">Active</option><option value="Inactive">Inactive</option><option value="Suspended">Suspended</option>
          </select>
        </section>}
        <section className="space-y-2">
          <div>
            <p className="text-xs font-semibold tracking-wide text-slate-500">ROLES</p>
            <p className="mt-1 text-sm text-slate-600">Select one or more roles for this account.</p>
          </div>
          <div className="space-y-2 rounded-xl border border-slate-200 p-3">
            {SETTINGS_ROLES.map((role) => <label key={role} className="flex cursor-pointer items-center gap-3 rounded-md px-1 py-1.5 text-sm text-slate-800">
              <input type="checkbox" checked={draft.roles.includes(role)} onChange={(event) => update("roles", event.target.checked ? [...draft.roles, role] : draft.roles.filter((item) => item !== role))} className="size-4 accent-indigo-600" />
              <span>{role}</span>
            </label>)}
          </div>
          {draft.roles.length === 0 && <p className="text-sm text-rose-700">Select at least one role to continue.</p>}
        </section>
        {user && <section className="space-y-3 rounded-xl border border-dashed border-slate-300 p-4">
          <div><p className="text-xs font-semibold tracking-wide text-slate-500">PASSWORD RESET</p><p className="mt-2 text-sm text-slate-600">Generate a one-time reset link to share with this user. The link is not emailed automatically.</p></div>
          <Button type="button" variant="outline" className="h-9 cursor-pointer" onClick={() => setResetLinkGenerated(true)}><KeyRound className="size-4" />Generate password reset link</Button>
          {resetLinkGenerated && <p role="status" className="text-sm text-emerald-700">Mock password reset link generated.</p>}
        </section>}
      </form>
    </SettingsDialog>
  )
}

export function UsersSettings() {
  const [users, setUsers] = React.useState<SettingsUser[]>([...MOCK_USERS])
  const [search, setSearch] = React.useState("")
  const [roleFilter, setRoleFilter] = React.useState("all")
  const [statusFilter, setStatusFilter] = React.useState("all")
  const [page, setPage] = React.useState(1)
  const [formOpen, setFormOpen] = React.useState(false)
  const [editingUser, setEditingUser] = React.useState<SettingsUser | null>(
    null
  )
  const [loading, setLoading] = React.useState(true)
  const [loadError, setLoadError] = React.useState(false)
  const pageSize = 5

  React.useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 350)
    return () => window.clearTimeout(timer)
  }, [])

  const filteredUsers = React.useMemo(() => {
    const query = search.trim().toLocaleLowerCase()
    return users.filter((user) => {
      if (roleFilter !== "all" && !user.roles.includes(roleFilter as SettingsRole)) return false
      if (statusFilter !== "all" && user.status !== statusFilter) return false
      if (!query) return true
      return [user.name, user.email].some(
        (value) => value.toLocaleLowerCase().includes(query)
      )
    })
  }, [users, search, roleFilter, statusFilter])
  const pageCount = Math.max(1, Math.ceil(filteredUsers.length / pageSize))
  const visibleUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  React.useEffect(() => setPage(1), [search, roleFilter, statusFilter])

  function openUserForm(user: SettingsUser | null) {
    setEditingUser(user)
    setFormOpen(true)
  }

  function saveUser(draft: UserDraft) {
    const { initialPassword: _initialPassword, ...userData } = draft
    if (editingUser) {
      setUsers((current) =>
        current.map((user) =>
          user.id === editingUser.id ? { ...user, ...userData } : user
        )
      )
    } else {
      setUsers((current) => [{ id: `usr-${Date.now()}`, ...userData }, ...current])
      setPage(1)
    }
    setFormOpen(false)
    setEditingUser(null)
  }

  function updateUserStatus(userId: string, status: SettingsUser["status"]) {
    setUsers((current) =>
      current.map((user) => (user.id === userId ? { ...user, status } : user))
    )
  }

  function retryLoad() {
    setLoadError(false)
    setLoading(true)
    window.setTimeout(() => setLoading(false), 350)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950">Users</h1>
          <p className="text-sm leading-6 text-slate-600">Provision staff accounts, assign roles, and set initial passwords.</p>
        </div>
        <Button type="button" className="h-10 cursor-pointer" onClick={() => openUserForm(null)}>
          <Plus className="size-4" aria-hidden="true" /> Create user
        </Button>
      </div>
      <section className={`${cardClass} overflow-hidden`}>
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 lg:flex-row lg:items-center lg:p-4">
          <div className="relative min-w-0 flex-1 space-y-1.5">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-500"
              aria-hidden="true"
            />
            <Input
              id="users-search"
              className="h-10 pl-9"
              placeholder="Search by name, email, or employee ID..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 sm:flex">
            <div className="space-y-1.5">
              <select
                id="users-role-filter"
                aria-label="Filter by role"
                className={`${fieldClass} min-w-32`}
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
              >
                <option value="all">All roles</option>
                {SETTINGS_ROLES.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <select
                id="users-status-filter"
                aria-label="Filter by status"
                className={`${fieldClass} min-w-32`}
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
              >
                <option value="all">All statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div
            className="space-y-3 p-5"
            aria-busy="true"
            aria-label="Loading users"
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
                Could not load users. Try again.
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
        ) : filteredUsers.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <Users
              className="mx-auto size-8 text-slate-400"
              aria-hidden="true"
            />
            <p className="mt-3 text-sm font-semibold text-slate-900">
              No matching users
            </p>
            <p className="mt-1 text-sm text-slate-600">
              Try another search or change the filters.
            </p>
            {search || roleFilter !== "all" || statusFilter !== "all" ? (
              <Button
                type="button"
                variant="outline"
                className="mt-4 h-9 cursor-pointer"
                onClick={() => {
                  setSearch("")
                  setRoleFilter("all")
                  setStatusFilter("all")
                }}
              >
                Clear filters
              </Button>
            ) : null}
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <Table className="min-w-[760px] table-fixed">
                <TableHeader>
                  <TableRow className="bg-slate-50 hover:bg-slate-50">
                    <TableHead className="w-[25%] px-4">Name</TableHead>
                    <TableHead className="w-[27%]">Email / Employee ID</TableHead>
                    <TableHead className="w-[18%]">Roles</TableHead>
                    <TableHead className="w-[18%]">Status</TableHead>
                    <TableHead className="w-[12%] pr-4 text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visibleUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="px-4 py-3 font-medium text-slate-900">
                        <div className="flex items-center gap-3">
                          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-semibold text-indigo-700">{user.name.split(/\s+/).map((part) => part[0]).slice(0, 2).join("").toUpperCase()}</span>
                          <span>{user.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="break-words text-slate-700">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">{user.roles.map((role) => <Badge key={role} variant="outline" className="border-indigo-100 bg-indigo-50 text-indigo-700">{role}</Badge>)}</div>
                      </TableCell>
                      <TableCell>
                        <div className="relative inline-flex items-center">
                          <span
                            aria-hidden="true"
                            className={`pointer-events-none absolute left-2.5 size-1.5 rounded-full ${userStatusDots[user.status]}`}
                          />
                          <select
                            aria-label={`Status for ${user.name}`}
                            value={user.status}
                            onChange={(event) =>
                              updateUserStatus(
                                user.id,
                                event.target.value as SettingsUser["status"]
                              )
                            }
                            className={`h-8 w-[132px] cursor-pointer appearance-none rounded-full border py-1 pr-7 pl-6 text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${userStatusStyles[user.status]}`}
                          >
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Suspended">Suspended</option>
                          </select>
                          <ChevronDown
                            aria-hidden="true"
                            className="pointer-events-none absolute right-2 size-3.5"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="pr-4">
                        <div className="flex justify-end gap-1">
                          <Button
                            type="button"
                            variant="outline"
                            className="h-8 min-h-8 cursor-pointer rounded-lg px-3 text-xs"
                            aria-label={`Edit ${user.name}`}
                            onClick={() => openUserForm(user)}
                          >
                            Edit
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex flex-col gap-3 border-t border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                Showing{" "}
                {filteredUsers.length === 0 ? 0 : (page - 1) * pageSize + 1}–
                {Math.min(page * pageSize, filteredUsers.length)} of{" "}
                {filteredUsers.length} users
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

      <UserFormDialog
        open={formOpen}
        user={editingUser}
        onOpenChange={setFormOpen}
        onSave={saveUser}
      />
    </div>
  )
}

