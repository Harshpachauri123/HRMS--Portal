"use client"

import {
  CircleAlert,
  Check,
  Laptop,
  LockKeyhole,
  Smartphone,
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
  MOCK_PROFILE,
  MOCK_SESSIONS,
  type SettingsSession,
} from "@/lib/settings-mock-data"
import {
  cardClass,
  ConfirmDialog,
  Feedback,
  PageHeader,
  SectionTitle,
  type PendingConfirmation,
} from "@/components/settings/settings-common"

export function ProfileSettings() {
  const [sessions, setSessions] = React.useState<SettingsSession[]>([])
  const [sessionsLoading, setSessionsLoading] = React.useState(true)
  const [sessionsError, setSessionsError] = React.useState(false)
  const [currentPassword, setCurrentPassword] = React.useState("")
  const [newPassword, setNewPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("")
  const [passwordLoading, setPasswordLoading] = React.useState(false)
  const [passwordFeedback, setPasswordFeedback] = React.useState<{
    kind: "success" | "error"
    message: string
  } | null>(null)
  const [pendingAction, setPendingAction] =
    React.useState<PendingConfirmation | null>(null)
  const [confirmationLoading, setConfirmationLoading] = React.useState(false)

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      setSessions([...MOCK_SESSIONS])
      setSessionsLoading(false)
    }, 300)
    return () => window.clearTimeout(timer)
  }, [])

  function retrySessions() {
    setSessionsError(false)
    setSessionsLoading(true)
    window.setTimeout(() => {
      setSessions([...MOCK_SESSIONS])
      setSessionsLoading(false)
    }, 300)
  }

  async function changePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPasswordFeedback(null)
    if (newPassword !== confirmPassword) {
      setPasswordFeedback({
        kind: "error",
        message: "New passwords do not match.",
      })
      return
    }
    if (newPassword === currentPassword) {
      setPasswordFeedback({
        kind: "error",
        message:
          "Choose a new password that differs from your current password.",
      })
      return
    }

    setPasswordLoading(true)
    await new Promise((resolve) => window.setTimeout(resolve, 650))
    setPasswordLoading(false)
    setPasswordFeedback({
      kind: "success",
      message: "Password updated in this preview. No account data was changed.",
    })
    setCurrentPassword("")
    setNewPassword("")
    setConfirmPassword("")
  }

  async function confirmPendingAction() {
    if (!pendingAction) return
    setConfirmationLoading(true)
    await new Promise((resolve) => window.setTimeout(resolve, 350))
    pendingAction.apply()
    setConfirmationLoading(false)
    setPendingAction(null)
  }

  function askToRevokeSession(session: SettingsSession) {
    setPendingAction({
      title: "Revoke this session?",
      description: `This will sign out the ${session.device} session in this preview.`,
      confirmLabel: "Revoke session",
      destructive: true,
      apply: () =>
        setSessions((current) =>
          current.filter((item) => item.id !== session.id)
        ),
    })
  }

  function askToRevokeOtherSessions() {
    setPendingAction({
      title: "Sign out other sessions?",
      description:
        "All other listed devices will be removed from this preview. Your current session will stay active.",
      confirmLabel: "Sign out others",
      destructive: true,
      apply: () =>
        setSessions((current) => current.filter((session) => session.current)),
    })
  }

  return (
    <div className="space-y-4">
      <PageHeader section="profile" />

      <section className={`${cardClass} overflow-hidden`}>
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <SectionTitle
            title="Profile details"
            description="Mock account information for the signed-in user."
          />
        </div>
        <div className="grid gap-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
          {[
            ["Name", MOCK_PROFILE.name],
            ["Email", MOCK_PROFILE.email],
            ["Department", MOCK_PROFILE.department],
            ["Designation", MOCK_PROFILE.designation],
            ["Role", MOCK_PROFILE.role],
            ["Employee ID", MOCK_PROFILE.employeeId],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0">
              <p className="text-xs font-medium text-slate-500">{label}</p>
              <p className="mt-1 text-sm font-medium break-words text-slate-900">
                {value}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${cardClass} p-4 sm:p-5`}>
        <div className="mb-5 flex items-start gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-700">
            <LockKeyhole className="size-4" aria-hidden="true" />
          </span>
          <SectionTitle
            title="Change password"
            description="Use a strong password you do not use elsewhere."
          />
        </div>
        <form onSubmit={changePassword} className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="settings-current-password">Current Password</Label>
            <Input
              id="settings-current-password"
              type="password"
              autoComplete="current-password"
              required
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="h-10"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="settings-new-password">New Password</Label>
            <Input
              id="settings-new-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              aria-describedby="settings-password-hint"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="h-10"
            />
            <p id="settings-password-hint" className="text-xs text-slate-500">
              Use at least 8 characters.
            </p>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="settings-confirm-password">
              Confirm New Password
            </Label>
            <Input
              id="settings-confirm-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="h-10"
            />
          </div>
          <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
            {passwordFeedback ? (
              <Feedback kind={passwordFeedback.kind}>
                {passwordFeedback.message}
              </Feedback>
            ) : (
              <span />
            )}
            <Button
              type="submit"
              disabled={passwordLoading}
              className="h-10 cursor-pointer"
            >
              {passwordLoading ? "Updating…" : "Update password"}
            </Button>
          </div>
        </form>
      </section>

      <section className={`${cardClass} overflow-hidden`}>
        <div className="flex flex-col gap-3 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
          <SectionTitle
            title="Active sessions"
            description="Devices where this account is currently signed in."
          />
          <Button
            type="button"
            variant="outline"
            className="h-10 cursor-pointer"
            disabled={
              sessionsLoading ||
              sessionsError ||
              sessions.every((session) => session.current)
            }
            onClick={askToRevokeOtherSessions}
          >
            Sign out other sessions
          </Button>
        </div>
        {sessionsLoading ? (
          <div
            className="space-y-3 p-5"
            aria-busy="true"
            aria-label="Loading active sessions"
          >
            <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
            <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
          </div>
        ) : sessionsError ? (
          <div className="p-5">
            <Alert variant="destructive">
              <CircleAlert className="size-4" aria-hidden="true" />
              <div className="flex min-w-0 flex-1 flex-wrap items-center justify-between gap-3">
                Could not load active sessions.
                <Button
                  type="button"
                  variant="outline"
                  className="h-9"
                  onClick={retrySessions}
                >
                  Retry
                </Button>
              </div>
            </Alert>
          </div>
        ) : sessions.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-sm font-medium text-slate-900">
              No active sessions
            </p>
            <p className="mt-1 text-sm text-slate-600">
              There are no other sessions to display.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50 hover:bg-slate-50">
                  <TableHead className="px-4">Device</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Last active</TableHead>
                  <TableHead className="pr-4 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sessions.map((session) => (
                  <TableRow key={session.id}>
                    <TableCell className="px-4 py-3">
                      <div className="flex items-start gap-2.5">
                        <span className="mt-0.5 text-slate-500">
                          {session.device.toLowerCase().includes("iphone") ? (
                            <Smartphone className="size-4" aria-hidden="true" />
                          ) : (
                            <Laptop className="size-4" aria-hidden="true" />
                          )}
                        </span>
                        <div className="min-w-0">
                          <p className="font-medium text-slate-900">
                            {session.device}
                          </p>
                          <p className="text-xs text-slate-600">
                            {session.browser}
                          </p>
                        </div>
                        {session.current ? (
                          <Badge
                            variant="outline"
                            className="border-emerald-200 bg-emerald-50 text-emerald-800"
                          >
                            Current
                          </Badge>
                        ) : null}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-700">
                      {session.location}
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-slate-700">
                      {session.lastActive}
                    </TableCell>
                    <TableCell className="pr-4 text-right">
                      {session.current ? (
                        <span className="text-xs text-slate-500">
                          This device
                        </span>
                      ) : (
                        <Button
                          type="button"
                          variant="ghost"
                          className="h-9 cursor-pointer text-rose-700 hover:text-rose-800"
                          onClick={() => askToRevokeSession(session)}
                        >
                          Revoke
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      <ConfirmDialog
        action={pendingAction}
        onClose={() => setPendingAction(null)}
        onConfirm={() => void confirmPendingAction()}
        loading={confirmationLoading}
      />
    </div>
  )
}
