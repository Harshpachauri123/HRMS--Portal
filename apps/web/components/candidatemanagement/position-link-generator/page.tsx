"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Clock3,
  Copy,
  Search,
  Sparkles,
  X,
} from "lucide-react"
import { toast } from "@workspace/ui/components/toast"
import { useJobOpenings, type JobOpening } from "@/lib/job-openings"

function getJobKey(job: JobOpening) {
  return job.company + ":" + job.id
}

function getCandidateHref(job: JobOpening) {
  const params = new URLSearchParams({
    company: job.company,
    jobId: job.id,
    position: job.position,
    experience: job.experience,
    responsibilities: job.responsibilities,
  })
  return "/addcandidate?" + params.toString()
}

export default function PositionLinkGeneratorPage() {
  const jobs = useJobOpenings()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedJobKey, setSelectedJobKey] = useState<string | null>(null)
  const selectedDetailsRef = useRef<HTMLElement | null>(null)
  const normalizedQuery = searchQuery.trim().toLocaleLowerCase()
  const filteredJobs = jobs.filter((job) =>
    [job.position, job.company, job.id, job.experience, job.responsibilities]
      .join(" ")
      .toLocaleLowerCase()
      .includes(normalizedQuery),
  )
  const companyCount = new Set(jobs.map((job) => job.company)).size
  const selectedJob = jobs.find((job) => getJobKey(job) === selectedJobKey)

  useEffect(() => {
    if (!selectedJob) return
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    selectedDetailsRef.current?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    })
  }, [selectedJob])

  const handleCopyLink = async (job: JobOpening) => {
    const careerUrl =
      window.location.origin +
      "/careers/" +
      encodeURIComponent(job.company) +
      "/job/" +
      encodeURIComponent(job.id) +
      "?position=" +
      encodeURIComponent(job.position) +
      "&experience=" +
      encodeURIComponent(job.experience) +
      "&responsibilities=" +
      encodeURIComponent(job.responsibilities)

    try {
      await navigator.clipboard.writeText(careerUrl)
      toast.add({
        title: "Career link copied",
        description: "The application link is ready to share with candidates.",
        type: "success",
      })
    } catch {
      toast.add({
        title: "Could not copy link",
        description: "Please allow clipboard access and try again.",
        type: "error",
      })
    }
  }

  return (
    <main
      className="mx-auto max-w-5xl space-y-7 rounded-2xl bg-[#fff9e8] p-4 sm:p-6 lg:p-8"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(202, 138, 4, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(202, 138, 4, 0.09) 1px, transparent 1px)",
        backgroundSize: "28px 28px",
      }}
    >
      <header className="relative overflow-hidden rounded-2xl bg-green-950 px-5 py-6 text-white shadow-lg shadow-green-950/10 sm:px-8 sm:py-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-12 -top-20 h-56 w-56 rounded-full border border-lime-300/15 bg-lime-300/10"
        />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-lime-200">
              <BriefcaseBusiness aria-hidden="true" className="h-4 w-4" />
              Careers workspace
            </p>
            <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
              Application link generator
            </h1>
            <p className="mt-2 text-sm leading-6 text-green-50/80">
              Review each role, share its application link, or open its details
              before continuing to the candidate form.
            </p>
          </div>
          </div>
      </header>

      <section aria-label="Position overview" className="grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl border border-[#ead9ae] bg-[#fffdf5] p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#fff2d2] text-amber-950">
            <BriefcaseBusiness aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-2xl font-bold leading-none text-slate-950">{jobs.length}</p>
            <p className="mt-1.5 text-sm text-slate-600">Published positions</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-xl border border-[#ead9ae] bg-[#fffdf5] p-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-lime-100 text-lime-900">
            <Building2 aria-hidden="true" className="h-5 w-5" />
          </span>
          <div>
            <p className="text-2xl font-bold leading-none text-slate-950">{companyCount}</p>
            <p className="mt-1.5 text-sm text-slate-600">Companies hiring</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="published-positions-heading" className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="published-positions-heading" className="text-lg font-bold text-slate-950">
              Published positions
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Choose Apply to review a role and continue with its candidate form.
            </p>
          </div>
          <label className="relative block w-full sm:max-w-xs">
            <span className="sr-only">Search published positions</span>
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-slate-500"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search roles or companies"
              className="h-11 w-full rounded-lg border border-[#dfd0a8] bg-[#fffdf5] pr-10 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-500 hover:border-amber-500 focus:border-lime-700 focus:ring-4 focus:ring-lime-600/15"
            />
            {searchQuery ? (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-2 inline-flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-md text-slate-500 transition hover:bg-lime-100 hover:text-green-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600"
              >
                <X aria-hidden="true" className="h-4 w-4" />
              </button>
            ) : null}
          </label>
        </div>

        <p className="text-xs font-medium text-slate-600" aria-live="polite">
          Showing {filteredJobs.length} of {jobs.length}{" "}
          {jobs.length === 1 ? "position" : "positions"}
        </p>

        {filteredJobs.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {filteredJobs.map((job) => {
              const isSelected = getJobKey(job) === selectedJobKey

              return (
                <article
                  key={getJobKey(job)}
                  className="flex min-w-0 flex-col justify-between rounded-xl border border-[#ead9ae] bg-[#fffdf5] p-5 transition duration-200 hover:border-lime-300 hover:shadow-md hover:shadow-lime-950/5"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-lime-200 bg-lime-50 px-2.5 py-1 text-xs font-semibold text-lime-900">
                        <Check aria-hidden="true" className="h-3.5 w-3.5" />
                        Published
                      </span>
                      <span className="rounded-md bg-[#fff2d2] px-2.5 py-1 text-xs font-semibold text-amber-950">
                        ID: {job.id}
                      </span>
                    </div>
                    <h3 className="mt-4 break-words text-lg font-bold text-slate-950">
                      {job.position}
                    </h3>
                    <div className="mt-4 grid gap-3 border-t border-[#eee3c8] pt-4 text-sm sm:grid-cols-2">
                      <div className="flex min-w-0 items-start gap-2.5">
                        <Building2 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-slate-500">Company</p>
                          <p className="mt-0.5 break-words font-semibold text-slate-800">{job.company}</p>
                        </div>
                      </div>
                      <div className="flex min-w-0 items-start gap-2.5">
                        <Clock3 aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-slate-500" />
                        <div>
                          <p className="text-xs font-medium text-slate-500">Experience</p>
                          <p className="mt-0.5 font-semibold text-slate-800">{job.experience}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs font-medium text-slate-500">Roles &amp; responsibilities</p>
                      <p className="mt-1 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-600">{job.responsibilities}</p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      onClick={() => handleCopyLink(job)}
                      className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-lime-300 bg-[#fffef9] px-3 text-sm font-semibold text-slate-800 transition hover:border-lime-500 hover:bg-lime-200 hover:text-green-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-600/20"
                    >
                      <Copy aria-hidden="true" className="h-4 w-4" />
                      Copy link
                    </button>
                    <button
                      type="button"
                      aria-expanded={isSelected}
                      aria-controls="selected-job-details"
                      onClick={() => setSelectedJobKey(isSelected ? null : getJobKey(job))}
                      className="inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-lime-600 px-3 text-sm font-semibold text-slate-950 transition hover:bg-lime-400 hover:text-green-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-600/25"
                    >
                      {isSelected ? "Selected" : "Apply"}
                      <ArrowDown aria-hidden="true" className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-[#d8c89d] bg-[#fffdf5] px-6 py-12 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff2d2] text-amber-950">
              <Search aria-hidden="true" className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-bold text-slate-950">
              {jobs.length === 0 ? "No positions published yet" : "No matching positions"}
            </h3>
            <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-600">
              {jobs.length === 0
                ? "Publish a position to create a candidate application link."
                : "Try a different title, company, job ID, or experience range."}
            </p>
            {jobs.length === 0 ? (
              <Link
                href="/candidatemanagement/open-positions"
                className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-lime-600 px-4 text-sm font-semibold text-slate-950 transition hover:bg-lime-400 hover:text-green-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-600/25"
              >
                <BriefcaseBusiness aria-hidden="true" className="h-4 w-4" />
                Create a position
              </Link>
            ) : null}
          </div>
        )}

        {selectedJob ? (
          <section
            id="selected-job-details"
            ref={selectedDetailsRef}
            aria-labelledby="selected-job-heading"
            className="scroll-mt-24 overflow-hidden rounded-2xl border border-[#d9c791] bg-[#fffdf5] shadow-sm"
          >
            <div className="flex flex-col gap-4 border-b border-[#ead9ae] bg-[#fff2d2] p-5 sm:flex-row sm:items-start sm:justify-between sm:p-6">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-lime-900">
                  Position details
                </p>
                <h2 id="selected-job-heading" className="mt-2 text-xl font-bold text-slate-950">
                  {selectedJob.position}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSelectedJobKey(null)}
                className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 self-start rounded-lg border border-[#dfd0a8] bg-[#fffdf5] px-3 text-sm font-semibold text-slate-700 transition hover:bg-lime-100 hover:text-green-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600"
              >
                <ArrowLeft aria-hidden="true" className="h-4 w-4" />
                Back to positions
              </button>
            </div>

            <div className="space-y-5 p-5 sm:p-6">
              <dl className="grid gap-x-8 gap-y-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Company name</dt>
                  <dd className="mt-1 break-words text-sm font-semibold text-slate-900">{selectedJob.company}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Job ID</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">{selectedJob.id}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Position</dt>
                  <dd className="mt-1 break-words text-sm font-semibold text-slate-900">{selectedJob.position}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Required experience</dt>
                  <dd className="mt-1 text-sm font-semibold text-slate-900">{selectedJob.experience}</dd>
                </div>
              </dl>

              <div className="border-t border-[#eee3c8] pt-4">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Roles &amp; responsibilities</h3>
                <p className="mt-2 whitespace-pre-line break-words text-sm leading-6 text-slate-700">
                  {selectedJob.responsibilities}
                </p>
              </div>

              <div className="flex flex-col gap-3 border-t border-[#eee3c8] pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-600">
                  Review the role details, then continue to the candidate application form.
                </p>
                <Link
                  href={getCandidateHref(selectedJob)}
                  className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-lg bg-lime-600 px-5 text-sm font-bold text-slate-950 transition hover:bg-lime-400 hover:text-green-950 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-600/25"
                >
                  Apply for this position
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </section>
        ) : null}
      </section>
    </main>
  )
}
