import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  HeartPulse,
  Plane,
  ShieldCheck,
  Users,
} from "lucide-react";

const leaveBalances = [
  {
    name: "Annual leave",
    detail: "For planned time away",
    balance: "15 days",
    icon: Plane,
    color: "bg-emerald-100 text-emerald-800",
  },
  {
    name: "Sick leave",
    detail: "Time to focus on your health",
    balance: "7 days",
    icon: HeartPulse,
    color: "bg-rose-100 text-rose-800",
  },
  {
    name: "Personal leave",
    detail: "For life's important moments",
    balance: "5 days",
    icon: Calendar,
    color: "bg-blue-100 text-blue-800",
  },
];

const requestSteps = [
  {
    number: "01",
    title: "Submit a request",
    description:
      "Choose your leave type and dates. Your available balance and any overlapping team absences are easy to review.",
    icon: FileText,
  },
  {
    number: "02",
    title: "Get the right approval",
    description:
      "The request is sent to the designated manager, who can review team coverage before responding.",
    icon: Users,
  },
  {
    number: "03",
    title: "Keep plans in sync",
    description:
      "Approved time off is reflected in the employee's leave history and helps the team plan ahead.",
    icon: CheckCircle2,
  },
];

const policyFeatures = [
  "Configure leave types and eligibility",
  "Set accrual rules and carry-over limits",
  "Define approval responsibilities",
  "Maintain holiday calendars by location",
];

export default function LeaveManagementPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] pb-20 font-sans text-slate-900">
      <section className="mx-auto max-w-5xl px-4 pb-14 pt-16 text-center sm:px-6">
        <span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#033022]">
          Leave management system
        </span>
        <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
          Time off made simple,
          <br />
          <span className="text-[#033022]">for people and teams</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
          Make leave easier to plan and manage. Give employees a clear view of
          their time off, help managers review requests, and keep workplace
          policies consistent.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#leave-overview"
            className="inline-flex items-center gap-2 rounded-xl bg-[#033022] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#054330]"
          >
            Explore leave management
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#leave-workflow"
            className="rounded-xl border-2 border-slate-300 bg-white px-8 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:border-slate-400"
          >
            See how requests work
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6 lg:px-8">
        <section id="leave-overview" className="scroll-mt-8">
          <div className="flex flex-col justify-between gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Leave at a glance
              </p>
              <h2 className="mt-1 text-2xl font-black sm:text-3xl">
                Make available time easy to understand
              </h2>
            </div>
            <p className="text-xs font-medium text-slate-500">
              Example balances for illustration
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {leaveBalances.map(({ name, detail, balance, icon: Icon, color }) => (
              <article
                key={name}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-extrabold">{name}</h3>
                    <p className="mt-1 text-xs text-slate-600">{detail}</p>
                  </div>
                  <div className={`rounded-xl p-2.5 ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-6 text-3xl font-black text-[#033022]">
                  {balance}
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                  Available balance
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="leave-workflow" className="scroll-mt-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              A straightforward process
            </p>
            <h2 className="mt-1 text-2xl font-black sm:text-3xl">
              From request to approved time off
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Keep employees, managers, and HR aligned with a consistent
              end-to-end leave workflow.
            </p>
          </div>

          <div className="mt-7 divide-y divide-slate-200 border-y border-slate-200">
            {requestSteps.map(({ number, title, description, icon: Icon }) => (
              <article
                key={number}
                className="grid gap-4 py-6 sm:grid-cols-[auto_1fr] sm:gap-6"
              >
                <div className="flex items-center gap-4 sm:items-start">
                  <span className="font-mono text-sm font-bold text-emerald-800">
                    {number}
                  </span>
                  <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-800 sm:hidden">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:gap-5">
                  <div className="hidden h-fit rounded-xl bg-emerald-100 p-2.5 text-emerald-800 sm:block">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold">{title}</h3>
                    <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-600">
                      {description}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Policies that fit your workplace
            </p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">
              Set clear rules for every kind of leave
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              Configure time-off policies to match your organization, and make
              the rules clear for employees and approvers.
            </p>
            <ul className="mt-6 space-y-3">
              {policyFeatures.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2.5 text-sm font-medium text-slate-700"
                >
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="border-y border-slate-200 py-6">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-100 p-2.5 text-blue-800">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold">Clear, consistent decisions</h3>
                <p className="mt-1 text-xs text-slate-600">
                  Shared rules help employees know what to expect.
                </p>
              </div>
            </div>
            <div className="my-5 border-t border-slate-200" />
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-amber-100 p-2.5 text-amber-800">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold">Better visibility for managers</h3>
                <p className="mt-1 text-xs text-slate-600">
                  Review requests alongside team schedules and balances.
                </p>
              </div>
            </div>
            <div className="my-5 border-t border-slate-200" />
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-800">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-extrabold">A more prepared team</h3>
                <p className="mt-1 text-xs text-slate-600">
                  Plan coverage around upcoming approved leave.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-slate-200 pt-10 text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
            <Calendar className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-2xl font-black sm:text-3xl">
            More clarity for every time-off decision
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600">
            Bring leave balances, policies, and approvals together so your
            people can take time off with confidence and your teams can plan
            ahead.
          </p>
          <a
            href="#leave-overview"
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-950"
          >
            Back to leave overview
            <ArrowRight className="h-4 w-4" />
          </a>
        </section>
      </div>
    </main>
  );
}
