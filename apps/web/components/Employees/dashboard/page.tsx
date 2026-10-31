// apps/web/app/(employee)/dashboard/page.tsx
import { EmployeeAvatar } from "@/components/Employees/sidebar/employee-avatar"
import {
    ArrowUpRight,
    Briefcase,
    Calendar,
    CheckCircle2,
    Clock,
    Download,
    FileText,
    TrendingUp,
} from "lucide-react"

export default function EmployeeDashboard() {
  return (
    <div className="mx-auto max-w-[1600px] space-y-6 rounded-[28px] bg-[#fce9df] p-3 pb-8 sm:p-5 lg:p-6">
      {/* 1. Welcome Header & Profile Overview */}
      <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-[#f0c8b1] bg-[#fff1e7] p-6 shadow-sm transition-colors duration-200 hover:border-[#e9a886] md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <EmployeeAvatar
            alt="Aarav Mehta profile photo"
            className="h-16 w-16 rounded-2xl border-2 border-[#eb5b25] bg-[#ffe0cf] text-xl font-bold text-[#c74617]"
          />
          <div>
            <h1 className="text-xl font-bold text-slate-950">
              Welcome back, Aarav!
            </h1>
            <p className="text-sm text-slate-500">
              Senior Frontend Engineer · SDV-0248
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-[#e5f1da] px-3 py-1 text-xs font-semibold text-green-900">
            <CheckCircle2 className="h-3.5 w-3.5" /> Present Today
          </span>
        </div>
      </div>

      {/* 2. Stat Cards (Punch Details, Leaves, Attendance %) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Punch In / Out Status */}
        <div className="rounded-2xl border border-[#ead2c3] bg-[#edf0d1] p-5 shadow-sm transition duration-200 hover:border-[#e9a886] hover:shadow-md">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Today's Punch</span>
            <Clock className="h-4 w-4 text-[#df5420]" aria-hidden="true" />
          </div>
          <div className="mt-2">
            <p className="text-lg font-bold text-slate-800">In: 09:28 AM</p>
            <p className="mt-0.5 text-xs text-slate-500">
              Out:{" "}
              <span className="font-semibold text-slate-700">
                --:-- (Working)
              </span>
            </p>
          </div>
          <div className="mt-3 flex items-center gap-1 border-t border-slate-100 pt-3 text-[11px] font-medium text-emerald-600">
            Status: On Time
          </div>
        </div>

        {/* Card 2: Total Leaves of Month */}
        <div className="rounded-2xl border border-[#ead2c3] bg-[#f8d8c7] p-5 shadow-sm transition duration-200 hover:border-[#e9a886] hover:shadow-md">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Leaves This Month</span>
            <Calendar className="h-4 w-4 text-[#df5420]" aria-hidden="true" />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-slate-800">2 / 12</p>
            <p className="mt-0.5 text-xs text-slate-400">
              2 leaves taken out of 12
            </p>
          </div>
          <div className="mt-3 border-t border-slate-100 pt-3 text-[11px] font-medium text-green-800">
            10 Leaves Available
          </div>
        </div>

        {/* Card 3: Total Attendance Percentage */}
        <div className="rounded-2xl border border-[#ead2c3] bg-[#e4e9eb] p-5 shadow-sm transition duration-200 hover:border-[#e9a886] hover:shadow-md">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Attendance Rate</span>
            <TrendingUp className="h-4 w-4 text-green-700" />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-slate-800">96.5%</p>
            <p className="mt-0.5 text-xs text-slate-600">Overall this year</p>
          </div>
          <div className="mt-3 border-t border-slate-100 pt-3 text-[11px] font-medium text-emerald-600">
            +2.4% than last month
          </div>
        </div>

        {/* Card 4: Working Hours */}
        <div className="rounded-2xl border border-[#ead2c3] bg-[#fff1e6] p-5 shadow-sm transition duration-200 hover:border-[#e9a886] hover:shadow-md">
          <div className="flex items-center justify-between text-xs font-medium text-slate-500">
            <span>Total Hours Today</span>
            <Briefcase className="h-4 w-4 text-[#df5420]" aria-hidden="true" />
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold text-slate-800">06h 45m</p>
            <p className="mt-0.5 text-xs text-slate-400">Target: 08h 00m</p>
          </div>
          <div className="mt-3 border-t border-slate-100 pt-3 text-[11px] font-medium text-amber-600">
            1h 15m remaining
          </div>
        </div>
      </div>

      {/* 3. Middle Section: Charts & Quick Links */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Attendance & Working Hours Chart / Graph Area */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#f0cbb6] bg-[#fff4ec] p-6 shadow-sm transition duration-200 hover:border-[#e9a886] hover:shadow-md lg:col-span-2">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-800">
                Weekly Working Hours
              </h2>
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs text-slate-700">
                This Week
              </span>
            </div>

            {/* Visual Bar Graph Simulation */}
            <div className="flex h-48 items-end justify-between gap-2 rounded-xl border border-[#f0d1c0] bg-[#fff0e5] px-4 pt-6 pb-2">
              <BarGraphDay day="Mon" hours="8.2h" height="80%" />
              <BarGraphDay day="Tue" hours="7.9h" height="75%" />
              <BarGraphDay day="Wed" hours="8.5h" height="90%" />
              <BarGraphDay day="Thu" hours="6.5h" height="60%" />
              <BarGraphDay day="Fri" hours="7.8h" height="72%" active />
              <BarGraphDay day="Sat" hours="0h" height="10%" />
              <BarGraphDay day="Sun" hours="0h" height="10%" />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-3 text-xs text-slate-600">
            <span>
              Average Daily:{" "}
              <strong className="text-slate-700">7.8 Hours</strong>
            </span>
            <span className="cursor-pointer font-medium text-[#cf4b1a] hover:underline">
              View Detailed Attendance Logs &rarr;
            </span>
          </div>
        </div>

        {/* Right 1 Col: Quick Links (Payslip, Leaves, etc.) */}
        <div className="flex flex-col justify-between rounded-2xl border border-[#f0cbb6] bg-[#fff4ec] p-6 shadow-sm transition duration-200 hover:border-[#e9a886] hover:shadow-md">
          <div>
            <h2 className="mb-4 text-lg font-semibold text-slate-800">
              Quick Links & Actions
            </h2>
            <div className="space-y-2.5">
              <QuickLinkButton
                title="Download Latest Payslip"
                subtitle="October 2026 Salary Slip"
                icon={<Download className="h-4 w-4 text-[#df5420]" />}
              />
              <QuickLinkButton
                title="Apply For Leave"
                subtitle="Casual or Paid Leave Request"
                icon={<Calendar className="h-4 w-4 text-[#df5420]" />}
              />
              <QuickLinkButton
                title="Attendance Regularization"
                subtitle="Fix missed punch-in/out"
                icon={<Clock className="h-4 w-4 text-[#df5420]" />}
              />
              <QuickLinkButton
                title="Company Policies & Docs"
                subtitle="HR Guidelines & Handbook"
                icon={<FileText className="h-4 w-4 text-green-700" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BarGraphDay({
  day,
  hours,
  height,
  active,
}: {
  day: string
  hours: string
  height: string
  active?: boolean
}) {
  return (
    <div className="flex h-full flex-1 flex-col items-center justify-end gap-2">
      <span className="text-[10px] font-medium text-slate-500">{hours}</span>
      <div
        style={{ height }}
        className={`w-full max-w-[32px] rounded-t-md transition-all ${
          active ? "bg-[#eb5b25]" : "bg-[#e9c6b1] hover:bg-[#dfad90]"
        }`}
      ></div>
      <span className="text-xs font-medium text-slate-600">{day}</span>
    </div>
  )
}

function QuickLinkButton({
  title,
  subtitle,
  icon,
}: {
  title: string
  subtitle: string
  icon: React.ReactNode
}) {
  return (
    <button className="group flex w-full items-center justify-between rounded-xl border border-[#f0d1c0] bg-[#fffaf6] p-3 text-left transition hover:border-[#e9a886] hover:bg-[#ffede1] focus-visible:ring-2 focus-visible:ring-[#eb5b25] focus-visible:outline-none">
      <div className="flex items-center gap-3">
        <div className="rounded-lg border border-[#f0d1c0] bg-white p-2 shadow-sm group-hover:border-[#eb9c73]">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800 transition group-hover:text-[#c74617]">
            {title}
          </p>
          <p className="text-xs text-slate-400">{subtitle}</p>
        </div>
      </div>
      <ArrowUpRight className="h-4 w-4 text-slate-400 transition group-hover:text-[#c74617]" />
    </button>
  )
}
