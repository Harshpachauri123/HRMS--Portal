'use client'

import React, { useState } from 'react'
import { ArrowUpRight, BriefcaseBusiness, Building2, Check, CircleHelp, Copy, Plus } from 'lucide-react'
import { saveJobOpenings, useJobOpenings } from '@/lib/job-openings'
import { toast } from '@workspace/ui/components/toast'

const inputClassName = 'mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-[#fffef9] px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-lime-700 focus:ring-4 focus:ring-lime-600/20'
const labelClassName = 'text-sm font-semibold text-slate-800'

export default function CandidateManagementPage() {
  const jobs = useJobOpenings()
  const [formData, setFormData] = useState({ company: '', position: '', experience: '', responsibilities: '', id: '' })

  const handleCreateJob = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const updatedJobs = [{ ...formData }, ...jobs]
    saveJobOpenings(updatedJobs)
    toast.add({
      title: 'Job published',
      description: `${formData.position} is now in Position Link Generator.`,
      type: 'success',
    })
    setFormData({ company: '', position: '', experience: '', responsibilities: '', id: '' })
  }

  const handleCopyLink = async (company: string, jobId: string, position: string, experience: string, responsibilities: string) => {
    const baseUrl = window.location.origin
    const careerLink = baseUrl + "/careers/" + encodeURIComponent(company) + "/job/" + encodeURIComponent(jobId) + "?position=" + encodeURIComponent(position) + "&experience=" + encodeURIComponent(experience) + "&responsibilities=" + encodeURIComponent(responsibilities)
    try {
      await navigator.clipboard.writeText(careerLink)
      toast.add({ title: 'Career link copied', description: 'Share it to open this job application in another tab.', type: 'success' })
    } catch {
      toast.add({ title: 'Could not copy link', description: 'Please allow clipboard access and try again.', type: 'error' })
    }
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-9 rounded-2xl bg-[#fff9e8] px-4 py-6 sm:px-6 sm:py-8 lg:px-8" style={{ backgroundImage: "linear-gradient(to right, rgba(202, 138, 4, 0.09) 1px, transparent 1px), linear-gradient(to bottom, rgba(202, 138, 4, 0.09) 1px, transparent 1px)", backgroundSize: "28px 28px" }}>
      <header className="flex flex-col gap-5 border-b border-slate-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-lime-800">
            <BriefcaseBusiness aria-hidden="true" className="h-4 w-4" /> Talent acquisition
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Open positions</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            Create and manage roles, then share an application link with prospective candidates.
          </p>
        </div>
        <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-[#fff4d8] px-3 py-2 text-sm font-medium text-slate-700">
          <span className="h-2 w-2 rounded-full bg-emerald-600" aria-hidden="true" /> {jobs.length} published {jobs.length === 1 ? 'position' : 'positions'}
        </div>
      </header>

      <section aria-labelledby="create-position-title" className="overflow-hidden rounded-xl border border-[#ead9ae] bg-[#fffdf5]">
        <div className="border-b border-slate-200 bg-[#fff2d2] px-5 py-5 sm:px-7">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-lime-200 bg-lime-100 text-lime-900">
              <Plus aria-hidden="true" className="h-5 w-5" />
            </div>
            <div>
              <h2 id="create-position-title" className="text-lg font-bold text-slate-950">Create a job opening</h2>
              <p className="mt-1 text-sm text-slate-600">Add the role details candidates will see on your application page.</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleCreateJob} className="space-y-7 p-5 sm:p-7">
          <div>
            <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
              <Building2 aria-hidden="true" className="h-4 w-4 text-slate-500" />
              <h3 className="text-sm font-bold text-slate-900">Position details</h3>
            </div>
            <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
              <div>
                <label className={labelClassName} htmlFor="company">Company / tenant ID <span className="text-rose-700">*</span></label>
                <input id="company" name="company" type="text" placeholder="e.g. tata-technologies" autoComplete="organization" required value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} className={inputClassName} />
                <p className="mt-1.5 text-xs leading-5 text-slate-500">Use the tenant identifier that appears in your careers URL.</p>
              </div>
              <div>
                <label className={labelClassName} htmlFor="position">Position name <span className="text-rose-700">*</span></label>
                <input id="position" name="position" type="text" placeholder="e.g. Senior Software Engineer" autoComplete="off" required value={formData.position} onChange={(e) => setFormData({ ...formData, position: e.target.value })} className={inputClassName} />
              </div>
              <div>
                <label className={labelClassName} htmlFor="experience">Required experience <span className="text-rose-700">*</span></label>
                <select id="experience" name="experience" required value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className={inputClassName}>
                  <option value="" disabled>Select experience range</option>
                  <option value="Fresher">Fresher</option>
                  <option value="1-2 years">1-2 years</option>
                  <option value="2-3 years">2-3 years</option>
                  <option value="3-4 years">3-4 years</option>
                  <option value="4-5 years">4-5 years</option>
                  <option value="5+ years">5+ years</option>
                </select>
              </div>
              <div>
                <label className={labelClassName} htmlFor="job-id">Job ID <span className="text-rose-700">*</span></label>
                <input id="job-id" name="jobId" type="text" placeholder="e.g. ENG-102" required value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} className={inputClassName} />
                <p className="mt-1.5 text-xs leading-5 text-slate-500">A unique reference used in the candidate application link.</p>
              </div>
            </div>
            <div className="mt-5">
              <label className={labelClassName} htmlFor="responsibilities">Roles &amp; responsibilities <span className="text-rose-700">*</span></label>
              <textarea id="responsibilities" name="responsibilities" rows={5} required value={formData.responsibilities} onChange={(e) => setFormData({ ...formData, responsibilities: e.target.value })} placeholder="Describe the role, key responsibilities, and what success looks like..." className="mt-2 w-full resize-y rounded-lg border border-slate-300 bg-[#fffef9] px-3.5 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 hover:border-slate-400 focus:border-lime-700 focus:ring-4 focus:ring-lime-600/20" />
              <p className="mt-1.5 text-xs leading-5 text-slate-500">This description will appear with the position before candidates apply.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-start gap-2 text-xs leading-5 text-slate-500">
              <CircleHelp aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0" /> Required fields are marked with an asterisk.
            </p>
            <button type="submit" className="inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-lime-600 px-5 text-sm font-bold text-slate-950 shadow-sm transition duration-200 hover:bg-lime-400 hover:shadow-md focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-600/30 active:bg-lime-500">
              <Plus aria-hidden="true" className="h-4 w-4" /> Publish position
            </button>
          </div>
        </form>
      </section>

      <section aria-labelledby="published-positions-title" className="space-y-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="published-positions-title" className="text-lg font-bold text-slate-950">Published positions</h2>
            <p className="mt-1 text-sm text-slate-600">Manage live roles and copy their candidate application links.</p>
          </div>
        </div>
        {jobs.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-[#fffdf5] px-6 py-12 text-center">
            <BriefcaseBusiness aria-hidden="true" className="mx-auto h-8 w-8 text-slate-400" />
            <h3 className="mt-3 text-sm font-semibold text-slate-900">No positions published yet</h3>
            <p className="mt-1 text-sm text-slate-600">Create your first opening using the form above.</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {jobs.map((job) => (
              <article key={`${job.company}-${job.id}`} className="flex flex-col justify-between rounded-xl border border-[#ead9ae] bg-[#fffdf5] p-5 transition-colors hover:border-slate-300">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800"><Check aria-hidden="true" className="h-3.5 w-3.5" /> Published</span>
                    <span className="rounded-md border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600">{job.id}</span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-slate-950">{job.position}</h3>
                  <p className="mt-2 text-sm text-slate-600">{job.experience} experience</p>
                  <p className="mt-1 text-sm text-slate-600">{job.company}</p>
                  <p className="mt-3 line-clamp-3 whitespace-pre-line text-sm leading-6 text-slate-600">{job.responsibilities}</p>

                </div>
                <button type="button" onClick={() => handleCopyLink(job.company, job.id, job.position, job.experience, job.responsibilities)} className="mt-5 inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-lime-300 bg-[#fffef9] px-4 text-sm font-semibold text-slate-800 transition duration-200 hover:border-lime-500 hover:bg-lime-200 hover:text-green-950 hover:shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-600/20">
                  <Copy aria-hidden="true" className="h-4 w-4" /> Copy application link <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </button>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
