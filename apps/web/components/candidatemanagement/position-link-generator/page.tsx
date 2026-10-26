"use client"

import Link from "next/link"
import { BriefcaseBusiness, UserRound } from "lucide-react"
import { useJobOpenings } from "@/lib/job-openings"

export default function PositionLinkGeneratorPage() {
  const jobs = useJobOpenings()

  return (
    <main className="mx-auto max-w-5xl space-y-6">
      <header>
        <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-indigo-600">
          <BriefcaseBusiness className="h-4 w-4" /> Careers
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900">
          Position Link Generator
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Published positions and their application forms.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2">
        {jobs.map((job) => (
          <article
            key={`${job.company}-${job.id}`}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <h2 className="font-bold text-slate-900">{job.position}</h2>
                <span className="shrink-0 rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                  ID: {job.id}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Experience: {job.experience}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Company: {job.company}
              </p>
            </div>
            <Link
              href={`/addcandidate?company=${encodeURIComponent(job.company)}&jobId=${encodeURIComponent(job.id)}&position=${encodeURIComponent(job.position)}`}
              className="mt-5 inline-flex min-h-10 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
            >
              <UserRound className="h-4 w-4" /> Apply
            </Link>
          </article>
        ))}
      </section>
    </main>
  )
}
