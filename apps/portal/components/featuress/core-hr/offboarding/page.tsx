import {
  ArrowRight,
  CheckCircle2,
  CheckSquare,
  Clock,
  FileText,
  Send,
  ShieldCheck,
  UserMinus,
} from "lucide-react";

const offboardingSteps = [
  {
    title: "Resignation & clearance",
    heading: "Start with a clear, well-managed resignation",
    description:
      "Record the resignation, confirm the notice period, and route clearance requests to the right managers and departments.",
    icon: Send,
    tasks: [
      "Capture the resignation date and reason",
      "Confirm notice period and final working day",
      "Collect manager and department clearances",
    ],
    status: [
      { label: "Resignation submitted", value: "Received", complete: true },
      { label: "Manager approval", value: "In review", complete: false },
      { label: "Final working day", value: "To confirm", complete: false },
    ],
    outcome: "An approved exit request with a clear final working date.",
  },
  {
    title: "Asset handover",
    heading: "Track every company asset through handover",
    description:
      "Give IT, facilities, and the employee a shared checklist for returning equipment, access cards, and other company property.",
    icon: CheckSquare,
    tasks: [
      "Review assets assigned to the employee",
      "Record returned items and their condition",
      "Follow up on pending equipment or access cards",
    ],
    status: [
      { label: "Laptop and accessories", value: "Return pending", complete: false },
      { label: "Access card", value: "Returned", complete: true },
      { label: "System access review", value: "Scheduled", complete: false },
    ],
    outcome: "A documented asset checklist before the employee's last day.",
  },
  {
    title: "Exit interview & feedback",
    heading: "Turn exit feedback into useful insights",
    description:
      "Offer a consistent, respectful way to share feedback and capture the employee's experience as they leave.",
    icon: UserMinus,
    tasks: [
      "Schedule an exit conversation",
      "Collect feedback through a guided questionnaire",
      "Keep notes available to authorized HR staff",
    ],
    status: [
      { label: "Exit questionnaire", value: "Ready to share", complete: true },
      { label: "HR conversation", value: "To schedule", complete: false },
      { label: "Feedback summary", value: "Not started", complete: false },
    ],
    outcome: "A consistent record of feedback to help improve the workplace.",
  },
  {
    title: "Full & final settlement",
    heading: "Close the employment record with confidence",
    description:
      "Coordinate final salary inputs, eligible leave balances, and required documents so HR and payroll can complete the exit.",
    icon: FileText,
    tasks: [
      "Review attendance, leave, and payroll inputs",
      "Coordinate the final settlement with payroll",
      "Prepare relieving and experience documents",
    ],
    status: [
      { label: "Payroll inputs", value: "In progress", complete: false },
      { label: "Settlement review", value: "Pending", complete: false },
      { label: "Exit documents", value: "To prepare", complete: false },
    ],
    outcome: "A completed settlement review and an organized set of exit documents.",
  },
];

export default function OffboardingPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] pb-20 font-sans text-slate-900">
      <section className="mx-auto max-w-4xl px-4 pb-12 pt-16 text-center">
        <span className="mb-4 inline-block rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#033022]">
          Employee Offboarding Software
        </span>
        <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-6xl">
          Make every employee exit
          <br />
          <span className="text-[#033022]">smooth, secure & structured</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
          Guide HR, managers, and employees through each part of the exit
          process. Keep clearance, asset returns, feedback, and final documents
          organized in one connected workflow.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#offboarding-workflow"
            className="inline-flex items-center gap-2 rounded-xl bg-[#033022] px-8 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#054330]"
          >
            Explore the offboarding steps
            <ArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#offboarding-benefits"
            className="rounded-xl border-2 border-slate-300 bg-white px-8 py-3.5 text-sm font-bold text-slate-800 shadow-sm transition-colors hover:border-slate-400"
          >
            Why use a guided workflow?
          </a>
        </div>
      </section>

      <section
        aria-label="Offboarding workflow"
        className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8"
      >
        <div className="mb-8 flex flex-col justify-between gap-3 border-b border-slate-200 pb-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Exit workflow
            </p>
            <h2 className="mt-1 text-2xl font-black text-slate-900 sm:text-3xl">
              A guided process from notice to closure
            </h2>
          </div>
          <span className="inline-flex w-fit items-center gap-2 text-xs font-bold text-slate-600">
            <Clock className="h-4 w-4 text-emerald-700" />
            4 steps · progress at a glance
          </span>
        </div>

        <div id="offboarding-workflow" className="divide-y divide-slate-200">
          {offboardingSteps.map(
            (
              {
                title,
                heading,
                description,
                icon: Icon,
                tasks,
                status,
                outcome,
              },
              index,
            ) => (
              <article
                key={title}
                className="scroll-mt-6 grid gap-8 py-8 lg:grid-cols-12 lg:gap-12"
              >
                <div className="lg:col-span-7">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-800">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800">
                        Step {index + 1}
                      </span>
                      <h3 className="mt-1 text-lg font-black text-slate-900 sm:text-xl">
                        {title}
                      </h3>
                    </div>
                  </div>

                  <h4 className="mt-5 text-base font-extrabold text-slate-900 sm:text-lg">
                    {heading}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {description}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {tasks.map((task) => (
                      <li
                        key={task}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700" />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="lg:col-span-5 lg:pt-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Example checklist
                    </p>
                    <span className="text-[10px] font-bold text-slate-500">
                      Step {index + 1} of {offboardingSteps.length}
                    </span>
                  </div>

                  <div className="mt-4 divide-y divide-slate-200">
                    {status.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between gap-3 py-3"
                      >
                        <span className="text-xs font-semibold text-slate-700">
                          {item.label}
                        </span>
                        <span
                          className={`shrink-0 text-[10px] font-bold ${
                            item.complete
                              ? "text-emerald-800"
                              : "text-amber-800"
                          }`}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <p className="mt-4 text-xs leading-relaxed text-slate-600">
                    <span className="font-bold text-slate-800">
                      Step outcome:{" "}
                    </span>
                    {outcome}
                  </p>
                </div>
              </article>
            ),
          )}
        </div>

        <section
          id="offboarding-benefits"
          className="scroll-mt-6 border-t border-slate-200 py-10 text-center"
        >
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <h2 className="mt-4 text-2xl font-black text-slate-900">
            A respectful exit, with fewer loose ends
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
            A shared checklist helps teams understand what is complete, what
            still needs attention, and who is responsible at every stage.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs font-semibold text-slate-700">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-700" />
              Clear ownership
            </span>
            <span className="inline-flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-700" />
              Organized records
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-700" />
              Secure handover
            </span>
          </div>
        </section>
      </section>
    </main>
  );
}
