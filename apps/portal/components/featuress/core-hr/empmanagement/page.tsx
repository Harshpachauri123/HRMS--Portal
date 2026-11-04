import {
  ArrowRight,
  Award,
  Bell,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Globe,
  MessageSquare,
  Plus,
  Search,
  Settings,
  Shield,
  UserCheck,
  Users,
} from "lucide-react";

const employees = [
  {
    name: "Aarav Mehta",
    id: "PF-1001",
    role: "Senior Frontend Engineer",
    department: "Engineering",
    initials: "AM",
    color: "bg-blue-600",
    status: "Active",
  },
  {
    name: "Isha Nair",
    id: "PF-1002",
    role: "People Operations Lead",
    department: "People & Culture",
    initials: "IN",
    color: "bg-emerald-600",
    status: "Active",
  },
  {
    name: "Kabir Sharma",
    id: "PF-1003",
    role: "Enterprise Account Executive",
    department: "Sales",
    initials: "KS",
    color: "bg-amber-600",
    status: "On leave",
  },
];

const employeeJourney = [
  {
    step: "01",
    title: "Bring people onboard",
    description:
      "Create a profile, assign an employee ID, and collect essential documents in one place.",
    icon: UserCheck,
  },
  {
    step: "02",
    title: "Keep records current",
    description:
      "Maintain role, department, location, and reporting details as your team changes.",
    icon: FileText,
  },
  {
    step: "03",
    title: "Support everyday work",
    description:
      "Give employees and managers a clear view of attendance, leave, and approvals.",
    icon: Calendar,
  },
  {
    step: "04",
    title: "Grow together",
    description:
      "Recognize milestones, share updates, and keep teams connected across locations.",
    icon: Award,
  },
];

export default function EmpManagement() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] pb-20 font-sans text-slate-900">
      <section className="mx-auto max-w-5xl px-4 pb-14 pt-16 text-center sm:px-6">
        <span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#033022]">
          Employee Management System
        </span>
        <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
          Every employee detail,
          <br />
          <span className="text-[#033022]">in one clear view</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
          Bring employee profiles, team records, and everyday HR information
          together. Follow the employee journey from onboarding through their
          growth with your organization.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#employee-directory"
            className="flex items-center gap-2 rounded-xl bg-[#033022] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#054330]"
          >
            Explore employee management
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#employee-journey"
            className="rounded-xl border-2 border-slate-300 bg-white px-8 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:border-slate-400"
          >
            See how it works
          </a>
        </div>
      </section>

      <section
        aria-label="Employee management dashboard preview"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="rounded-3xl border-4 border-slate-800 bg-slate-900 p-3 shadow-2xl sm:p-4">
          <div className="mb-3 flex items-center justify-between rounded-t-2xl bg-slate-800/80 px-4 py-2 text-xs text-slate-400">
            <div className="flex items-center gap-2" aria-hidden="true">
              <span className="h-3 w-3 rounded-full bg-rose-500" />
              <span className="h-3 w-3 rounded-full bg-amber-500" />
              <span className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            <span className="rounded-md bg-slate-900 px-4 py-1 font-mono text-slate-300 sm:px-6">
              app.teamora.com/people
            </span>
            <div className="flex items-center gap-3" aria-hidden="true">
              <Bell className="h-4 w-4" />
              <Settings className="h-4 w-4" />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl bg-[#FAF9F5] shadow-inner">
            <div className="flex min-h-16 items-center justify-between border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
              <div>
                <p className="text-xs font-semibold text-slate-500">
                  PEOPLE OVERVIEW
                </p>
                <h2 className="mt-1 text-lg font-extrabold text-slate-900">
                  Your team at a glance
                </h2>
              </div>
              <span className="hidden items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-800 sm:flex">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                All systems up to date
              </span>
            </div>

            <div className="space-y-10 p-4 sm:p-8">
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                {[
                  {
                    label: "Total employees",
                    value: "248",
                    note: "Across all locations",
                    color: "text-blue-900",
                    bg: "bg-blue-50",
                  },
                  {
                    label: "Active today",
                    value: "236",
                    note: "12 away today",
                    color: "text-emerald-900",
                    bg: "bg-emerald-50",
                  },
                  {
                    label: "Departments",
                    value: "12",
                    note: "Teams working together",
                    color: "text-purple-900",
                    bg: "bg-purple-50",
                  },
                  {
                    label: "Pending requests",
                    value: "08",
                    note: "Ready for review",
                    color: "text-amber-900",
                    bg: "bg-amber-50",
                  },
                ].map((stat) => (
                  <article
                    key={stat.label}
                    className={`rounded-2xl border border-white p-4 sm:p-5 ${stat.bg}`}
                  >
                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate-600">
                      {stat.label}
                    </p>
                    <p className={`mt-2 text-3xl font-black ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[11px] text-slate-600">
                      {stat.note}
                    </p>
                  </article>
                ))}
              </div>

              <section
                id="employee-directory"
                className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                      One trusted source
                    </p>
                    <h2 className="mt-1 text-xl font-black text-slate-900">
                      Employee directory
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Find people and see the details that help your teams work.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#033022] px-4 py-2.5 text-xs font-bold text-white transition-colors hover:bg-[#054330]"
                  >
                    <Plus className="h-4 w-4" />
                    Add employee
                  </button>
                </div>

                <div className="relative mt-5">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    aria-label="Search employees"
                    placeholder="Search by name, role, or employee ID"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>

                <div className="mt-4 divide-y divide-slate-100">
                  {employees.map((employee) => (
                    <article
                      key={employee.id}
                      className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${employee.color}`}
                        >
                          {employee.initials}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-900">
                            {employee.name}
                          </h3>
                          <p className="mt-0.5 text-xs text-slate-500">
                            {employee.role} · {employee.department}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 pl-14 sm:pl-0">
                        <span className="font-mono text-xs text-slate-500">
                          {employee.id}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            employee.status === "Active"
                              ? "bg-emerald-50 text-emerald-800"
                              : "bg-amber-50 text-amber-800"
                          }`}
                        >
                          {employee.status}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
                <button
                  type="button"
                  className="mt-2 inline-flex items-center gap-2 text-xs font-bold text-emerald-800 hover:text-emerald-950"
                >
                  <Download className="h-4 w-4" />
                  Export employee list
                </button>
              </section>

              <section className="grid gap-5 lg:grid-cols-5">
                <article className="rounded-2xl bg-[#033022] p-6 text-white lg:col-span-2">
                  <span className="inline-flex rounded-full bg-emerald-900 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-100">
                    Employee spotlight
                  </span>
                  <div className="mt-5 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-xl font-black text-[#033022]">
                      CS
                    </div>
                    <div>
                      <h2 className="text-lg font-extrabold">
                        Christine Spalding
                      </h2>
                      <p className="mt-1 text-sm text-emerald-200">
                        HR Manager · People & Culture
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-3 border-t border-emerald-900 pt-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-emerald-300">
                        Location
                      </p>
                      <p className="mt-1 text-sm font-semibold">Dubai, UAE</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-emerald-300">
                        Reporting to
                      </p>
                      <p className="mt-1 text-sm font-semibold">Jordan Taylor</p>
                    </div>
                    <div className="col-span-2 flex items-center gap-2 pt-1 text-xs text-emerald-100">
                      <Clock className="h-4 w-4" />
                      Attendance and work history stay with the profile
                    </div>
                  </div>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        Profile timeline
                      </p>
                      <h2 className="mt-1 text-lg font-black text-slate-900">
                        A clear history of change
                      </h2>
                    </div>
                    <FileText className="h-5 w-5 text-slate-400" />
                  </div>
                  <div className="mt-5 space-y-4">
                    <div className="flex gap-4">
                      <span className="w-12 shrink-0 text-xs font-bold text-slate-500">
                        DEC 19
                      </span>
                      <div className="border-l-2 border-amber-200 pl-4">
                        <p className="text-sm font-bold text-slate-800">
                          Work location updated
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          Employee location changed to Dubai.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-12 shrink-0 text-xs font-bold text-slate-500">
                        MAY 17
                      </span>
                      <div className="border-l-2 border-emerald-200 pl-4">
                        <p className="text-sm font-bold text-slate-800">
                          Promoted to HR Head
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          Role change recorded in the employee history.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <span className="w-12 shrink-0 text-xs font-bold text-slate-500">
                        MAR 05
                      </span>
                      <div className="border-l-2 border-blue-200 pl-4">
                        <p className="text-sm font-bold text-slate-800">
                          Joined People & Culture
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          Department and reporting details added to the profile.
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              </section>

              <section
                id="employee-journey"
                className="scroll-mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
              >
                <div className="mx-auto max-w-2xl text-center">
                  <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    One connected flow
                  </p>
                  <h2 className="mt-2 text-2xl font-black text-slate-900">
                    Support the whole employee journey
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    Keep employee information connected as people join, settle
                    in, contribute, and grow with your organization.
                  </p>
                </div>
                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {employeeJourney.map(({ step, title, description, icon: Icon }) => (
                    <article
                      key={step}
                      className="rounded-xl border border-slate-100 bg-slate-50 p-4"
                    >
                      <div className="flex items-center justify-between">
                        <Icon className="h-5 w-5 text-emerald-800" />
                        <span className="font-mono text-xs font-bold text-slate-400">
                          {step}
                        </span>
                      </div>
                      <h3 className="mt-4 text-sm font-extrabold text-slate-900">
                        {title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        {description}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="grid gap-5 lg:grid-cols-2">
                <article className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-800">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                        Organization setup
                      </p>
                      <h2 className="mt-1 text-lg font-black text-slate-900">
                        Set your teams up for success
                      </h2>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    Structure departments, roles, locations, and reporting lines
                    to match the way your organization works.
                  </p>
                  <ul className="mt-5 space-y-3">
                    {[
                      "Organize teams and reporting relationships",
                      "Keep employee records consistent across locations",
                      "Control access to sensitive people information",
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs font-medium text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-2xl border border-slate-200 bg-white p-6">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-blue-50 p-2.5 text-blue-800">
                      <Globe className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-blue-800">
                        Connected workplace
                      </p>
                      <h2 className="mt-1 text-lg font-black text-slate-900">
                        Keep everyone in the loop
                      </h2>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600">
                    Bring important team updates and shared workplace
                    information into the same employee experience.
                  </p>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-slate-50 p-3">
                      <MessageSquare className="h-4 w-4 text-emerald-700" />
                      <h3 className="mt-2 text-xs font-bold text-slate-900">
                        Team updates
                      </h3>
                      <p className="mt-1 text-[11px] text-slate-600">
                        Share news and useful announcements.
                      </p>
                    </div>
                    <div className="rounded-xl bg-slate-50 p-3">
                      <Calendar className="h-4 w-4 text-emerald-700" />
                      <h3 className="mt-2 text-xs font-bold text-slate-900">
                        Key dates
                      </h3>
                      <p className="mt-1 text-[11px] text-slate-600">
                        Keep schedules and milestones visible.
                      </p>
                    </div>
                  </div>
                </article>
              </section>

              <section className="rounded-2xl bg-[#033022] px-6 py-8 text-center text-white sm:px-10">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-900 text-emerald-200">
                  <Shield className="h-5 w-5" />
                </div>
                <h2 className="mt-4 text-2xl font-black">
                  People information, organized and protected
                </h2>
                <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-emerald-100">
                  Give employees and managers a consistent place for the details
                  they need, while keeping important records structured and
                  access-conscious.
                </p>
                <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-semibold text-emerald-100">
                  <span className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Clear employee records
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Connected teams
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Organization-wide visibility
                  </span>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
