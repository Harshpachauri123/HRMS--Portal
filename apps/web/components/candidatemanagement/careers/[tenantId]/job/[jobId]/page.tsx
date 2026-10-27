import AddCandidatePage from "@/components/candidatemanagement/addcandidate/page"
import Link from "next/link"
import { ArrowRight, BriefcaseBusiness } from "lucide-react"

type CareerApplicationPageProps = {
  params: Promise<{ tenantId: string; jobId: string }>
  searchParams: Promise<{
    position?: string | string[]
    experience?: string | string[]
    responsibilities?: string | string[]
    apply?: string | string[]
  }>
}

function decodeRouteValue(value: string) {
  let decoded = value
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const next = decodeURIComponent(decoded)
      if (next === decoded) break
      decoded = next
    } catch {
      break
    }
  }
  return decoded
}

export default async function PublicJobApplyPage({
  params,
  searchParams,
}: CareerApplicationPageProps) {
  const [{ tenantId, jobId }, query] = await Promise.all([params, searchParams])
  const readFirst = (value?: string | string[]) =>
    Array.isArray(value) ? (value[0] ?? "") : (value ?? "")
  const company = decodeRouteValue(tenantId)
  const application = {
    company,
    jobId,
    position: readFirst(query.position),
    experience: readFirst(query.experience),
    responsibilities: readFirst(query.responsibilities),
  }

  if (readFirst(query.apply) === "1") {
    return <AddCandidatePage initialJobApplication={application} />
  }

  const applyParams = new URLSearchParams({
    position: application.position,
    experience: application.experience,
    responsibilities: application.responsibilities,
    apply: "1",
  })
  const applyHref = `/careers/${encodeURIComponent(tenantId)}/job/${encodeURIComponent(jobId)}?${applyParams.toString()}`

  return (
    <main className="min-h-screen bg-[#f6faef] px-4 py-8 text-slate-900 sm:px-6 sm:py-12">
      <article className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-lime-200 bg-white shadow-xl shadow-green-950/5">
        <header className="border-b border-lime-100 bg-gradient-to-br from-[#f4f9e9] to-[#fffdf4] px-6 py-8 sm:px-10">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-green-800">
            <BriefcaseBusiness className="h-4 w-4" aria-hidden="true" />
            Career opportunity
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {application.position || "Open position"}
          </h1>
          <p className="mt-2 text-slate-600">{application.company}</p>
        </header>

        <div className="space-y-8 px-6 py-7 sm:px-10 sm:py-9">
          <section className="grid gap-5 sm:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Company name</p>
              <p className="mt-1 font-semibold">{application.company}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Job ID</p>
              <p className="mt-1 font-semibold">{application.jobId}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Required experience</p>
              <p className="mt-1 font-semibold">{application.experience || "Not specified"}</p>
            </div>
          </section>

          <section className="border-t border-lime-100 pt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-600">Roles &amp; responsibilities</h2>
            <p className="mt-3 whitespace-pre-wrap break-words text-sm leading-7 text-slate-700">
              {application.responsibilities || "Details for this position will be shared during the application process."}
            </p>
          </section>

          <div className="border-t border-lime-100 pt-6">
            <Link
              href={applyHref}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-lime-600 px-6 text-sm font-bold text-white transition-colors hover:bg-green-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-600/30 sm:w-auto"
            >
              Apply for this position
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    </main>
  )
}
