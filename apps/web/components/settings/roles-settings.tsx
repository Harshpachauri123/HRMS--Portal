"use client"

import { ShieldCheck, UserRound, Users } from "lucide-react"
import * as React from "react"

import {
  SettingsBadge as Badge,
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
} from "@/lib/settings-mock-data"
import {
  cardClass,
  PageHeader,
  SectionTitle,
  StatusBadge,
} from "@/components/settings/settings-common"

const ROLE_DESCRIPTIONS: Record<SettingsRole, string> = {
  "Super Admin": "Primary administrator account in this HRMS preview.",
  HR: "People operations role used by HR team members in this preview.",
  User: "Standard staff role used by employee accounts in this preview.",
}

export function RolesSettings() {
  const [users] = React.useState([...MOCK_USERS])
  const [selectedRole, setSelectedRole] =
    React.useState<SettingsRole>("Super Admin")
  const assignedUsers = users.filter((user) => user.roles.includes(selectedRole))

  return (
    <div className="space-y-4">
      <PageHeader section="roles" />
      <div className="grid gap-4 lg:grid-cols-[280px_minmax(0,1fr)]">
        <section
          className={`${cardClass} h-fit p-3`}
          aria-label="Available roles"
        >
          <p className="px-2 py-2 text-xs font-semibold tracking-wide text-slate-500 uppercase">
            HRMS roles
          </p>
          <div className="space-y-1">
            {SETTINGS_ROLES.map((role) => {
              const selected = selectedRole === role
              const count = users.filter((user) => user.roles.includes(role)).length
              return (
                <button
                  key={role}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setSelectedRole(role)}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-lg border px-3 py-2.5 text-left transition focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none ${selected ? "border-indigo-200 bg-indigo-50 text-indigo-900" : "border-transparent text-slate-700 hover:bg-slate-50"}`}
                >
                  <span
                    className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${selected ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-600"}`}
                  >
                    {role === "Super Admin" ? (
                      <ShieldCheck className="size-4" aria-hidden="true" />
                    ) : role === "HR" ? (
                      <Users className="size-4" aria-hidden="true" />
                    ) : (
                      <UserRound className="size-4" aria-hidden="true" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-medium">
                    {role}
                  </span>
                  <Badge
                    variant="outline"
                    className="border-slate-200 bg-white text-slate-700"
                  >
                    {count}
                  </Badge>
                </button>
              )
            })}
          </div>
        </section>

        <section className={`${cardClass} overflow-hidden`}>
          <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
            <div className="flex items-start gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-lg font-semibold text-slate-950">
                  {selectedRole}
                </h2>
                <p className="mt-1 max-w-xl text-sm leading-5 text-slate-600">
                  {ROLE_DESCRIPTIONS[selectedRole]}
                </p>
              </div>
            </div>
            <Badge
              variant="outline"
              className="w-fit border-indigo-200 bg-indigo-50 text-indigo-800"
            >
              {assignedUsers.length} assigned{" "}
              {assignedUsers.length === 1 ? "user" : "users"}
            </Badge>
          </div>
          <div className="p-4 sm:p-5">
            <SectionTitle
              title="Assigned users"
              description={`Users assigned to the ${selectedRole} role in mock data.`}
            />
            {assignedUsers.length === 0 ? (
              <div className="mt-4 rounded-lg border border-dashed border-slate-300 px-4 py-10 text-center">
                <Users
                  className="mx-auto size-7 text-slate-400"
                  aria-hidden="true"
                />
                <p className="mt-2 text-sm font-medium text-slate-900">
                  No users assigned
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  There are no mock users for this role.
                </p>
              </div>
            ) : (
              <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200">
                <Table className="min-w-[540px]">
                  <TableHeader>
                    <TableRow className="bg-slate-50 hover:bg-slate-50">
                      <TableHead className="px-4">Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Department</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignedUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="px-4 py-3 font-medium text-slate-900">
                          {user.name}
                        </TableCell>
                        <TableCell className="text-slate-700">
                          {user.email}
                        </TableCell>
                        <TableCell className="text-slate-700">
                          {user.department}
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={user.status} />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}
