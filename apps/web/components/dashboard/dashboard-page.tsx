"use client"

import React, { useState, useMemo } from "react"
import Link from "next/link"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import {
  UserPlus,
  Download,
  ArrowUpRight,
  PlusCircle,
  FileSignature,
  CreditCard,
  CalendarCheck,
  Search,
  Users,
  BriefcaseBusiness,
  UserRoundSearch,
  CalendarDays,
  Clock3,
  ArrowRight,
} from "lucide-react"

const initialEmployees = [
  {
    name: "Aarav Mehta",
    email: "aarav.mehta@peopleflow.co",
    avatar: "AM",
    dept: "IT",
    designation: "Senior Frontend Engineer",
    manager: "Neha Kapoor",
    date: "Apr 11, 2022",
    status: "Active",
    color: "bg-blue-600",
  },
  {
    name: "Isha Nair",
    email: "isha.nair@peopleflow.co",
    avatar: "IN",
    dept: "HR",
    designation: "People Operations Lead",
    manager: "Divyanshi Rao",
    date: "Aug 23, 2021",
    status: "Active",
    color: "bg-emerald-600",
  },
  {
    name: "Kabir Sharma",
    email: "kabir.sharma@peopleflow.co",
    avatar: "KS",
    dept: "Sales",
    designation: "Enterprise Account Executive",
    manager: "Rohan Sethi",
    date: "Jan 9, 2023",
    status: "On Leave",
    color: "bg-amber-600",
  },
  {
    name: "Meera Iyer",
    email: "meera.iyer@peopleflow.co",
    avatar: "MI",
    dept: "Finance",
    designation: "Payroll Specialist",
    manager: "Ankit Jain",
    date: "Nov 16, 2020",
    status: "Active",
    color: "bg-purple-600",
  },
  {
    name: "Riya Sen",
    email: "riya.sen@peopleflow.co",
    avatar: "RS",
    dept: "Marketing",
    designation: "Growth Marketing Manager",
    manager: "Simran Gill",
    date: "Jun 2, 2022",
    status: "Active",
    color: "bg-rose-600",
  },
]

export default function DashboardPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDept, setSelectedDept] = useState("All")
  const [selectedStatus, setSelectedStatus] = useState("All")
  const today = new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  }).format(new Date())

  const filteredEmployees = useMemo(() => {
    return initialEmployees.filter((emp) => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.designation.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesDept = selectedDept === "All" || emp.dept === selectedDept

      const matchesStatus =
        selectedStatus === "All" || emp.status === selectedStatus

      return matchesSearch && matchesDept && matchesStatus
    })
  }, [searchTerm, selectedDept, selectedStatus])

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative isolate min-h-[calc(100vh-9rem)] space-y-6 overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-100 via-indigo-50/80 to-cyan-50/80 p-4 sm:space-y-8 sm:p-6 lg:p-7">
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-28 -right-28 h-96 w-96 rounded-full bg-indigo-300/25 blur-3xl" />
          <div className="absolute top-[40rem] -left-32 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
        </div>
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-950 via-indigo-950 to-violet-900 px-6 py-7 text-white shadow-xl shadow-indigo-950/15 sm:px-8 sm:py-9"
        >
          <div className="pointer-events-none absolute -top-28 -right-12 h-80 w-80 rounded-full border border-white/10 bg-indigo-400/10 blur-2xl" />
          <div className="pointer-events-none absolute right-1/3 bottom-[-8rem] h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="relative flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
            <div className="max-w-2xl">
              <div className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-indigo-200 uppercase">
                <span className="h-2 w-2 rounded-full bg-cyan-300" />
                People operations
                <span className="text-indigo-400">/</span>
                Overview
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Your team, at a glance.
              </h1>
              <p className="mt-2 text-sm leading-6 text-indigo-100/75 sm:text-base">
                A clear view of your people, hiring pipeline, and today&apos;s
                attendance.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              <span className="mr-1 hidden items-center gap-2 text-sm font-medium text-indigo-100/80 sm:inline-flex">
                <CalendarDays className="h-4 w-4 text-indigo-200" />
                {today}
              </span>
              <Link
                href="/addstaff"
                className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-indigo-950 shadow-lg shadow-black/10 transition hover:bg-indigo-50 focus-visible:ring-4 focus-visible:ring-white/20 focus-visible:outline-none"
              >
                <UserPlus className="h-4 w-4" />
                Add Employee
              </Link>
            </div>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "Total employees",
              value: "254",
              note: "+8 this month",
              icon: Users,
              noteIcon: ArrowUpRight,
              color: "bg-indigo-600 text-white",
              card: "from-indigo-100 via-white to-blue-200/90",
              glow: "bg-indigo-500/20",
              shadow: "shadow-indigo-900/10",
              labelColor: "text-indigo-900/70",
              trend: "text-emerald-700",
            },
            {
              label: "Open positions",
              value: "12",
              note: "3 closing soon",
              icon: BriefcaseBusiness,
              noteIcon: Clock3,
              color: "bg-amber-500 text-white",
              card: "from-amber-100 via-white to-orange-200/90",
              glow: "bg-amber-500/20",
              shadow: "shadow-amber-900/10",
              labelColor: "text-amber-950/70",
              trend: "text-amber-700",
            },
            {
              label: "Candidates in pipeline",
              value: "68",
              note: "+14 this week",
              icon: UserRoundSearch,
              noteIcon: ArrowUpRight,
              color: "bg-violet-600 text-white",
              card: "from-violet-100 via-white to-fuchsia-200/90",
              glow: "bg-violet-500/20",
              shadow: "shadow-violet-900/10",
              labelColor: "text-violet-950/70",
              trend: "text-emerald-700",
            },
            {
              label: "Today's attendance",
              value: "241 / 254",
              note: "95% of your team",
              icon: CalendarCheck,
              noteIcon: ArrowUpRight,
              color: "bg-emerald-600 text-white",
              card: "from-emerald-100 via-white to-teal-200/90",
              glow: "bg-emerald-500/20",
              shadow: "shadow-emerald-900/10",
              labelColor: "text-emerald-950/70",
              trend: "text-emerald-700",
            },
          ].map((metric) => {
            const Icon = metric.icon
            const NoteIcon = metric.noteIcon
            return (
              <motion.article
                key={metric.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.4 }}
                whileHover={{ y: -4 }}
                className={`relative overflow-hidden rounded-2xl border border-white/90 bg-gradient-to-br ${metric.card} p-5 shadow-lg ${metric.shadow} backdrop-blur-sm`}
              >
                <div
                  className={`pointer-events-none absolute -top-10 -right-8 h-32 w-32 rounded-full ${metric.glow} blur-2xl`}
                />
                <div className="flex items-start justify-between gap-3">
                  <p className={`text-sm font-semibold ${metric.labelColor}`}>
                    {metric.label}
                  </p>
                  <span
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-md ${metric.shadow} ${metric.color}`}
                  >
                    <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                  </span>
                </div>
                <p className="mt-4 text-3xl font-bold tracking-tight text-slate-950">
                  {metric.value}
                </p>
                <p
                  className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${metric.trend}`}
                >
                  <NoteIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  {metric.note}
                </p>
              </motion.article>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="grid grid-cols-1 gap-5 xl:grid-cols-2"
        >
          <section className="rounded-2xl border border-white/80 bg-gradient-to-br from-white/95 via-indigo-50/55 to-violet-100/60 p-5 shadow-lg shadow-indigo-950/5 backdrop-blur-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Attendance overview
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Today&apos;s team check-in
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                On track
              </span>
            </div>
            <div className="mt-7 flex flex-col items-center gap-7 sm:flex-row sm:justify-center sm:gap-10">
              <div
                className="relative grid h-40 w-40 shrink-0 place-items-center rounded-full"
                style={{
                  background:
                    "conic-gradient(#4f46e5 0deg 342deg, #e2e8f0 342deg 360deg)",
                }}
                role="img"
                aria-label="241 of 254 employees present today, 95 percent"
              >
                <div className="grid h-[118px] w-[118px] place-content-center rounded-full bg-gradient-to-br from-white to-indigo-50 text-center">
                  <span className="text-3xl font-bold tracking-tight text-slate-950">
                    95%
                  </span>
                  <span className="mt-0.5 text-xs font-medium text-slate-500">
                    attendance
                  </span>
                </div>
              </div>
              <div className="grid w-full max-w-xs grid-cols-2 gap-x-5 gap-y-4">
                <div>
                  <p className="text-xs font-medium text-slate-500">Present</p>
                  <p className="mt-1 text-xl font-bold text-slate-900">241</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Total team
                  </p>
                  <p className="mt-1 text-xl font-bold text-slate-900">254</p>
                </div>
                <div className="col-span-2 border-t border-slate-100 pt-3">
                  <p className="flex items-center gap-2 text-sm font-medium text-slate-600">
                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-600" />
                    Checked in today
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/80 bg-gradient-to-br from-white/95 via-cyan-50/55 to-sky-100/60 p-5 shadow-lg shadow-cyan-950/5 backdrop-blur-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  Employee distribution
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Team size by department
                </p>
              </div>
              <span className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-semibold text-slate-500">
                5 teams
              </span>
            </div>
            <div className="mt-6 flex h-44 items-end justify-between gap-3 border-b border-slate-100 px-2 sm:px-4">
              {[
                { label: "HR", height: "h-[28%]", color: "bg-violet-400" },
                { label: "IT", height: "h-[98%]", color: "bg-indigo-600" },
                { label: "Sales", height: "h-[58%]", color: "bg-blue-500" },
                { label: "Marketing", height: "h-[34%]", color: "bg-sky-400" },
                {
                  label: "Finance",
                  height: "h-[38%]",
                  color: "bg-emerald-500",
                },
              ].map((bar) => (
                <div
                  key={bar.label}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                >
                  <div
                    className={`w-full max-w-10 rounded-t-lg ${bar.color} ${bar.height} transition-[height]`}
                  />
                  <span className="mb-2 text-[11px] font-medium text-slate-500 sm:text-xs">
                    {bar.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.45 }}
          className="rounded-2xl border border-white/80 bg-gradient-to-br from-white/95 via-indigo-50/55 to-blue-100/60 p-5 shadow-lg shadow-indigo-950/5 backdrop-blur-sm sm:p-6"
        >
          <h2 className="text-base font-bold text-slate-900">Quick actions</h2>
          <p className="mt-1 text-sm text-slate-500">
            Common tasks, right at your fingertips
          </p>
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {[
              { label: "Add Employee", icon: UserPlus, href: "/addstaff" },
              {
                label: "Create Job Opening",
                icon: PlusCircle,
                href: undefined,
              },
              { label: "Add Candidate", icon: UserPlus, href: "/addcandidate" },
              {
                label: "Generate Offer Letter",
                icon: FileSignature,
                href: undefined,
              },
              { label: "Process Payroll", icon: CreditCard, href: undefined },
              {
                label: "Mark Attendance",
                icon: CalendarCheck,
                href: undefined,
              },
            ].map((action, index) => {
              const Icon = action.icon
              const content = (
                <>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600 transition group-hover:bg-indigo-100 group-hover:text-indigo-700">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1">{action.label}</span>
                  <ArrowRight
                    className="h-4 w-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:text-indigo-600"
                    aria-hidden="true"
                  />
                </>
              )
              const className =
                "group flex min-h-14 items-center gap-3 rounded-xl border border-white/80 bg-white/75 px-4 py-3 text-left text-sm font-semibold text-slate-700 shadow-sm backdrop-blur-sm transition hover:border-indigo-200 hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-100"
              const motionProps = {
                initial: { opacity: 0, y: 12 },
                animate: { opacity: 1, y: 0 },
                transition: { delay: index * 0.045, duration: 0.3 },
                whileHover: { y: -3, scale: 1.01 },
              }
              return action.href ? (
                <motion.div key={action.label} {...motionProps}>
                  <Link href={action.href} className={className}>
                    {content}
                  </Link>
                </motion.div>
              ) : (
                <motion.button
                  key={action.label}
                  type="button"
                  className={className}
                  {...motionProps}
                >
                  {content}
                </motion.button>
              )
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.24, duration: 0.45 }}
          className="overflow-hidden rounded-2xl border border-white/80 bg-white/75 shadow-xl shadow-indigo-950/10 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 border-b border-indigo-100/80 bg-gradient-to-r from-white/90 via-indigo-50/70 to-cyan-50/70 p-5 sm:p-6 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Recent employees
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your latest team members and their details
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search employees..."
                  aria-label="Search employees by name, email, or designation"
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white pr-3 pl-9 text-sm text-slate-700 transition outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 sm:w-56"
                />
              </div>

              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                aria-label="Filter by department"
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="All">All departments</option>
                <option value="HR">HR</option>
                <option value="IT">IT</option>
                <option value="Sales">Sales</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                aria-label="Filter by employee status"
                className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 transition outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              >
                <option value="All">All statuses</option>
                <option value="Active">Active</option>
                <option value="On Leave">On Leave</option>
                <option value="Pending">Pending</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm text-slate-600">
              <thead className="bg-slate-50/80 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                <tr>
                  <th scope="col" className="px-5 py-3.5">
                    Employee
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Department
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Designation
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Manager
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Joining date
                  </th>
                  <th scope="col" className="px-5 py-3.5">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.length > 0 ? (
                  <AnimatePresence mode="popLayout">
                    {filteredEmployees.map((emp) => (
                      <motion.tr
                        key={emp.email}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="transition-colors hover:bg-indigo-50/50"
                      >
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ${emp.color}`}
                            >
                              {emp.avatar}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">
                                {emp.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {emp.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="rounded-lg bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">
                            {emp.dept}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-700">
                          {emp.designation}
                        </td>
                        <td className="px-5 py-3.5">{emp.manager}</td>
                        <td className="px-5 py-3.5 whitespace-nowrap">
                          {emp.date}
                        </td>
                        <td className="px-5 py-3.5">
                          <span
                            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                              emp.status === "Active"
                                ? "bg-emerald-50 text-emerald-700"
                                : emp.status === "On Leave"
                                  ? "bg-purple-50 text-purple-700"
                                  : "bg-amber-50 text-amber-700"
                            }`}
                          >
                            {emp.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-12 text-center text-sm text-slate-500"
                    >
                      No employees found matching selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-slate-100 px-5 py-4 text-sm text-slate-500">
            <span>
              Showing {filteredEmployees.length} of {initialEmployees.length}{" "}
              employees
            </span>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.45 }}
          className="space-y-4"
        >
          <div className="flex items-end justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Recent activity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                The latest updates across your organization
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
            {[
              {
                title: "Offer generated",
                desc: "Aditya Menon's backend engineer offer is ready for approval.",
                time: "10 min ago",
              },
              {
                title: "Candidate applied",
                desc: "Rahul Khanna applied for Sales Manager.",
                time: "34 min ago",
              },
              {
                title: "Employee joined",
                desc: "Nikhil Bansal completed onboarding.",
                time: "1 hr ago",
              },
              {
                title: "Leave approved",
                desc: "Riya Sen's casual leave was approved.",
                time: "2 hrs ago",
              },
              {
                title: "Payroll processed",
                desc: "June payroll completed for Finance.",
                time: "Yesterday",
              },
            ].map((activity, index) => (
              <motion.article
                key={activity.title}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                whileHover={{ y: -4 }}
                className="flex flex-col justify-between rounded-2xl border border-white/80 bg-gradient-to-br from-white/90 to-indigo-50/70 p-4 shadow-lg shadow-indigo-950/5 backdrop-blur-sm"
              >
                <div>
                  <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="text-sm font-bold text-slate-900">
                    {activity.title}
                  </p>
                  <p className="mt-1.5 text-xs leading-5 text-slate-500">
                    {activity.desc}
                  </p>
                </div>
                <p className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
                  <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                  {activity.time}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </main>
    </MotionConfig>
  )
}
