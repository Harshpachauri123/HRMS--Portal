"use client"

import { useEffect, useMemo, useState } from "react"
import {
  ArrowDownToLine,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  LogIn,
  LogOut,
  ShieldCheck,
} from "lucide-react"
import { toast } from "@workspace/ui/components/toast"

interface AttendanceRecord {
  date: string
  checkIn: string
  checkOut: string | null
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function getDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")

  return `${year}-${month}-${day}`
}

function formatTime(value: string | null) {
  if (!value) return "--:--"

  return new Intl.DateTimeFormat("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(value))
}

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  return `${hours}h ${String(remainingMinutes).padStart(2, "0")}m`
}

function getDurationMinutes(record: AttendanceRecord, now: Date) {
  const endTime = record.checkOut ? new Date(record.checkOut) : now
  const elapsed = Math.floor(
    (endTime.getTime() - new Date(record.checkIn).getTime()) / 60_000
  )

  return Math.max(0, elapsed)
}

function getCalendarDays(month: Date) {
  const year = month.getFullYear()
  const monthIndex = month.getMonth()
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()
  const leadingDays = (new Date(year, monthIndex, 1).getDay() + 6) % 7
  const cellCount = Math.ceil((leadingDays + daysInMonth) / 7) * 7

  return Array.from({ length: cellCount }, (_, index) => {
    const day = index - leadingDays + 1
    return day > 0 && day <= daysInMonth
      ? new Date(year, monthIndex, day)
      : null
  })
}

export default function AttendancePage() {
  const [now, setNow] = useState<Date | null>(null)
  const [month, setMonth] = useState<Date | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [records, setRecords] = useState<AttendanceRecord[]>([])

  useEffect(() => {
    const initialNow = new Date()
    setNow(initialNow)
    setMonth(new Date(initialNow.getFullYear(), initialNow.getMonth(), 1))
    setSelectedDate(getDateKey(initialNow))

    const timer = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(timer)
  }, [])

  const todayKey = now ? getDateKey(now) : null
  const activeRecord =
    records.find((record) => record.checkOut === null) ?? null
  const todayRecord = records.find((record) => record.date === todayKey) ?? null
  const calendarDays = useMemo(
    () => (month ? getCalendarDays(month) : []),
    [month]
  )
  const monthRecords = records.filter(
    (record) =>
      month &&
      record.date.startsWith(
        `${month.getFullYear()}-${String(month.getMonth() + 1).padStart(2, "0")}`
      )
  )
  const completedRecords = monthRecords.filter((record) => record.checkOut)
  const monthMinutes =
    now &&
    monthRecords.reduce(
      (total, record) => total + getDurationMinutes(record, now),
      0
    )
  const completedMinutes =
    now &&
    completedRecords.reduce(
      (total, record) => total + getDurationMinutes(record, now),
      0
    )
  const averageMinutes =
    completedRecords.length > 0 && typeof completedMinutes === "number"
      ? Math.round(completedMinutes / completedRecords.length)
      : 0
  const canMoveToNextMonth =
    month &&
    now &&
    (month.getFullYear() < now.getFullYear() ||
      (month.getFullYear() === now.getFullYear() &&
        month.getMonth() < now.getMonth()))
  function handlePunchIn() {
    if (!now || !todayKey || activeRecord || todayRecord) return

    setRecords([
      ...records,
      { date: todayKey, checkIn: now.toISOString(), checkOut: null },
    ])
    setSelectedDate(todayKey)
    setMonth(new Date(now.getFullYear(), now.getMonth(), 1))
    toast.add({
      title: "Attendance started",
      description: "Your check-in time has been recorded.",
      type: "success",
    })
  }

  function handlePunchOut() {
    if (!now || !activeRecord) return

    setRecords(
      records.map((record) =>
        record === activeRecord
          ? { ...record, checkOut: now.toISOString() }
          : record
      )
    )
    toast.add({
      title: "Attendance ended",
      description: "Your check-out time has been recorded.",
      type: "success",
    })
  }

  function moveMonth(amount: number) {
    if (!month) return
    setMonth(new Date(month.getFullYear(), month.getMonth() + amount, 1))
  }

  function exportMonth() {
    if (!month || monthRecords.length === 0) return

    const rows = [
      ["Date", "Punch in", "Punch out", "Hours", "Status"],
      ...monthRecords.map((record) => [
        record.date,
        formatTime(record.checkIn),
        formatTime(record.checkOut),
        formatDuration(now ? getDurationMinutes(record, now) : 0),
        record.checkOut ? "Complete" : "In progress",
      ]),
    ]
    const csv = rows
      .map((row) =>
        row.map((value) => `"${value.replaceAll('"', '""')}"`).join(",")
      )
      .join("\n")
    const url = URL.createObjectURL(
      new Blob([csv], { type: "text/csv;charset=utf-8" })
    )
    const link = document.createElement("a")
    link.href = url
    link.download = `attendance-${getDateKey(month).slice(0, 7)}.csv`
    link.click()
    URL.revokeObjectURL(url)
    toast.add({
      title: "Attendance exported",
      description: `Attendance data for ${getDateKey(month).slice(0, 7)} was downloaded.`,
      type: "success",
    })
  }

  return (
    <div className="min-h-[calc(100vh-12rem)] space-y-6 rounded-[30px] bg-[#fce9df] p-4 pb-10 sm:p-6 lg:p-7">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-indigo-600">
            Employee self-service
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
            My attendance
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Punch in, track your workday, and review your attendance calendar.
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          Personal attendance
        </span>
      </div>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-indigo-800 p-6 text-white shadow-xl shadow-indigo-950/10 sm:p-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-indigo-100">
                TODAY&apos;S SHIFT
              </span>
              <span className="text-sm text-indigo-200">
                {now
                  ? new Intl.DateTimeFormat("en-IN", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }).format(now)
                  : "Loading today..."}
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-bold sm:text-3xl">
              {activeRecord
                ? "You’re on the clock"
                : todayRecord
                  ? "Your workday is complete"
                  : "Ready to start your day?"}
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-indigo-100/80">
              {activeRecord
                ? `You punched in at ${formatTime(activeRecord.checkIn)}. Remember to punch out when you finish.`
                : todayRecord
                  ? `You worked ${formatDuration(getDurationMinutes(todayRecord, now ?? new Date()))} today. Your attendance is shown in the calendar.`
                  : "Your punch-in will appear on today’s calendar while this page is open."}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-indigo-100">
              <span className="inline-flex items-center gap-2">
                <Clock3 className="h-4 w-4 text-indigo-300" />
                Example shift: 9:00 AM – 6:00 PM
              </span>
              {activeRecord && now && (
                <span className="inline-flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-300" />
                  {formatDuration(getDurationMinutes(activeRecord, now))}{" "}
                  tracked
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center lg:flex-col lg:items-end">
            <div className="min-w-36 text-left sm:text-right lg:text-right">
              <p className="text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
                {now ? formatTime(now.toISOString()) : "--:--"}
              </p>
              <p className="mt-1 text-xs text-indigo-200">Your local time</p>
            </div>
            {activeRecord ? (
              <button
                type="button"
                onClick={handlePunchOut}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-rose-500 px-5 text-sm font-bold text-white shadow-lg shadow-rose-950/25 transition hover:bg-rose-400 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-900 focus-visible:outline-none"
              >
                <LogOut className="h-4 w-4" />
                Punch out
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePunchIn}
                disabled={!now || Boolean(todayRecord)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-indigo-950 shadow-lg shadow-indigo-950/20 transition hover:bg-indigo-50 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-900 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
              >
                <LogIn className="h-4 w-4" />
                {todayRecord ? "Day completed" : "Punch in"}
              </button>
            )}
          </div>
        </div>
      </section>

      <section
        aria-label="Monthly attendance summary"
        className="grid gap-4 sm:grid-cols-3"
      >
        {[
          {
            label: "Days attended",
            value: String(monthRecords.length),
            note: "This month",
            icon: CalendarDays,
            color: "text-indigo-600 bg-indigo-50",
          },
          {
            label: "Hours tracked",
            value: formatDuration(
              typeof monthMinutes === "number" ? monthMinutes : 0
            ),
            note: "Including today",
            icon: Clock3,
            color: "text-emerald-600 bg-emerald-50",
          },
          {
            label: "Average workday",
            value: formatDuration(averageMinutes),
            note: "Completed days",
            icon: Check,
            color: "text-amber-600 bg-amber-50",
          },
        ].map(({ label, value, note, icon: Icon, color }) => (
          <article
            key={label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-2 text-2xl font-bold text-slate-950 tabular-nums">
                  {value}
                </p>
              </div>
              <span className={`rounded-xl p-2.5 ${color}`}>
                <Icon className="h-5 w-5" />
              </span>
            </div>
            <p className="mt-3 text-xs text-slate-400">{note}</p>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-950">
                Attendance calendar
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your attendance and weekly offs are marked by date.
              </p>
            </div>
            <button
              type="button"
              onClick={exportMonth}
              disabled={monthRecords.length === 0}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowDownToLine className="h-4 w-4" />
              Export
            </button>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <p className="text-base font-bold text-slate-900">
              {month
                ? new Intl.DateTimeFormat("en-IN", {
                    month: "long",
                    year: "numeric",
                  }).format(month)
                : "Loading calendar..."}
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous month"
                disabled={!month}
                onClick={() => moveMonth(-1)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next month"
                disabled={!canMoveToNextMonth}
                onClick={() => moveMonth(1)}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7">
            {WEEKDAYS.map((weekday) => (
              <span
                key={weekday}
                className={`py-2 text-center text-xs font-semibold ${
                  weekday === "Sun" ? "text-rose-500" : "text-slate-400"
                }`}
              >
                {weekday}
              </span>
            ))}
            {calendarDays.map((date, index) => {
              if (!date)
                return <span aria-hidden="true" key={`empty-${index}`} />

              const dateKey = getDateKey(date)
              const record = records.find((item) => item.date === dateKey)
              const isSelected = dateKey === selectedDate
              const isToday = dateKey === todayKey
              const isFuture = Boolean(todayKey && dateKey > todayKey)
              const isWeeklyOff = date.getDay() === 0

              return (
                <button
                  key={dateKey}
                  type="button"
                  aria-label={`${date.toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}${isWeeklyOff ? ", weekly off" : ""}${record ? `, ${record.checkOut ? "attendance complete" : "punched in"}` : ""}`}
                  aria-pressed={isSelected}
                  disabled={isFuture}
                  onClick={() => setSelectedDate(dateKey)}
                  className={`relative mx-auto my-1 flex h-11 w-11 flex-col items-center justify-center rounded-xl text-sm font-semibold transition sm:h-12 sm:w-12 ${
                    isSelected
                      ? isWeeklyOff
                        ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                        : "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : isToday
                        ? isWeeklyOff
                          ? "bg-rose-50 text-rose-700 ring-1 ring-indigo-200 ring-inset"
                          : "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200 ring-inset"
                        : isWeeklyOff
                          ? "bg-rose-50/70 text-rose-600 hover:bg-rose-100"
                          : "text-slate-700 hover:bg-slate-100"
                  } ${isFuture ? "cursor-not-allowed opacity-30" : ""}`}
                >
                  {date.getDate()}
                  {record && (
                    <span
                      className={`absolute bottom-1.5 h-1.5 w-1.5 rounded-full ${
                        isSelected
                          ? "bg-white"
                          : record.checkOut
                            ? "bg-emerald-500"
                            : "bg-amber-500"
                      }`}
                    />
                  )}
                </button>
              )
            })}
          </div>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-100 pt-4">
            <span className="inline-flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              Weekly off
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Completed
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              In progress
            </span>
            <span className="inline-flex items-center gap-2 text-xs text-slate-500">
              <span className="h-2 w-2 rounded-full bg-indigo-300" />
              Today
            </span>
          </div>
        </div>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
            <h2 className="text-lg font-bold text-slate-950">Attendance log</h2>
            <p className="mt-1 text-sm text-slate-500">
              Punch records from this page session.
            </p>
            <p className="mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-5 text-amber-800">
              Login is not connected yet. Employee name, email, and ID will
              appear here once authentication is added.
            </p>
          </div>

          {records.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left">
                <thead className="bg-slate-50">
                  <tr>
                    {[
                      "Employee",
                      "Email",
                      "Employee ID",
                      "Date",
                      "Punch in",
                      "Punch out",
                    ].map((heading) => (
                      <th
                        key={heading}
                        scope="col"
                        className="px-5 py-3 text-xs font-semibold tracking-wide text-slate-500 uppercase"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[...records].reverse().map((record) => (
                    <tr key={record.date}>
                      <td className="px-5 py-4 text-sm font-medium text-slate-700">
                        Login required
                      </td>
                      <td className="px-5 py-4 text-sm text-slate-500">—</td>
                      <td className="px-5 py-4 text-sm text-slate-500">—</td>
                      <td className="px-5 py-4 text-sm text-slate-600">
                        {new Intl.DateTimeFormat("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        }).format(new Date(`${record.date}T00:00:00`))}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-800 tabular-nums">
                        {formatTime(record.checkIn)}
                      </td>
                      <td className="px-5 py-4 text-sm font-semibold text-slate-800 tabular-nums">
                        {formatTime(record.checkOut)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="px-5 py-8 text-center text-sm text-slate-500">
              No punches yet. Your punch in/out times will appear here.
            </p>
          )}
        </section>
      </section>
    </div>
  )
}
