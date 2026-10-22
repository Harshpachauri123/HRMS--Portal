"use client"

import Link from "next/link"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import { useEffect, useMemo, useState } from "react"
import {
  BriefcaseBusiness,
  CalendarDays,
  Check,
  Clock3,
  Download,
  Eye,
  FileText,
  Mail,
  Pencil,
  Plus,
  Phone,
  Search,
  Sparkles,
  Trash2,
  Users,
  X,
} from "lucide-react"
import {
  deleteCandidateRecord,
  saveCandidateRecord,
  useDeletedCandidateDemoIds,
  useCandidateRecords,
  type FormRecord,
} from "@/lib/session-records"

type CandidateStage =
  "New" | "Screening" | "Interview" | "Offer" | "Hired" | "Rejected"

type Candidate = {
  id: number | string
  isSubmitted?: boolean
  isSample?: boolean
  applicationId: string
  avatar: string
  color: string
  name: string
  email: string
  phone: string
  role: string
  experience: string
  appliedOn: string
  stage: CandidateStage
  source: string
  documents: string[]
}

const demoCandidates: Candidate[] = [
  {
    id: 1,
    applicationId: "CA-2041",
    avatar: "AS",
    color: "bg-violet-600",
    name: "Aditi Sharma",
    email: "aditi.sharma@example.com",
    phone: "+91 98765 43210",
    role: "Senior Product Designer",
    experience: "6 years",
    appliedOn: "Oct 10, 2026",
    stage: "Interview",
    source: "LinkedIn",
    documents: ["Resume", "Portfolio"],
  },
  {
    id: 2,
    applicationId: "CA-2040",
    avatar: "RM",
    color: "bg-sky-600",
    name: "Rohan Malhotra",
    email: "rohan.malhotra@example.com",
    phone: "+91 98123 45670",
    role: "Frontend Engineer",
    experience: "4 years",
    appliedOn: "Oct 09, 2026",
    stage: "Screening",
    source: "Careers page",
    documents: ["Resume"],
  },
  {
    id: 3,
    applicationId: "CA-2039",
    avatar: "PN",
    color: "bg-rose-600",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    phone: "+91 98220 12456",
    role: "People Business Partner",
    experience: "7 years",
    appliedOn: "Oct 08, 2026",
    stage: "Offer",
    source: "Referral",
    documents: ["Resume", "References"],
  },
  {
    id: 4,
    applicationId: "CA-2038",
    avatar: "KV",
    color: "bg-amber-600",
    name: "Kabir Verma",
    email: "kabir.verma@example.com",
    phone: "+91 98900 11223",
    role: "Data Analyst",
    experience: "3 years",
    appliedOn: "Oct 07, 2026",
    stage: "New",
    source: "Naukri",
    documents: ["Resume"],
  },
  {
    id: 5,
    applicationId: "CA-2037",
    avatar: "SK",
    color: "bg-emerald-600",
    name: "Sana Khan",
    email: "sana.khan@example.com",
    phone: "+91 97654 32109",
    role: "Product Manager",
    experience: "8 years",
    appliedOn: "Oct 06, 2026",
    stage: "Interview",
    source: "LinkedIn",
    documents: ["Resume"],
  },
  {
    id: 6,
    applicationId: "CA-2036",
    avatar: "AD",
    color: "bg-orange-600",
    name: "Arjun Desai",
    email: "arjun.desai@example.com",
    phone: "+91 97222 56781",
    role: "Finance Associate",
    experience: "2 years",
    appliedOn: "Oct 05, 2026",
    stage: "Screening",
    source: "Employee referral",
    documents: ["Resume", "Cover letter"],
  },
  {
    id: 7,
    applicationId: "CA-2035",
    avatar: "MJ",
    color: "bg-teal-600",
    name: "Meera Joshi",
    email: "meera.joshi@example.com",
    phone: "+91 98450 76123",
    role: "UX Researcher",
    experience: "5 years",
    appliedOn: "Oct 04, 2026",
    stage: "Hired",
    source: "Careers page",
    documents: ["Resume", "Portfolio"],
  },
  {
    id: 8,
    applicationId: "CA-2034",
    avatar: "IK",
    color: "bg-indigo-600",
    name: "Ishaan Kapoor",
    email: "ishaan.kapoor@example.com",
    phone: "+91 98111 22334",
    role: "Cloud Engineer",
    experience: "6 years",
    appliedOn: "Oct 03, 2026",
    stage: "Rejected",
    source: "LinkedIn",
    documents: ["Resume"],
  },
  {
    id: 9,
    applicationId: "CA-2033",
    avatar: "TB",
    color: "bg-pink-600",
    name: "Tara Bose",
    email: "tara.bose@example.com",
    phone: "+91 98300 44556",
    role: "Marketing Lead",
    experience: "5 years",
    appliedOn: "Oct 02, 2026",
    stage: "New",
    source: "Naukri",
    documents: ["Resume"],
  },
]

function candidateDetailsFromCandidate(candidate: Candidate): FormRecord {
  const [firstname = "", ...lastName] = candidate.name.split(/\s+/)
  return {
    firstname,
    lastname: lastName.join(" "),
    candidateId: candidate.applicationId,
    fatherName: "",
    contactNumber: candidate.phone,
    email: candidate.email,
    maritalStatus: "",
    nationality: "",
    qualification: candidate.experience,
    dateofbirth: "",
    permanentAddress: "",
    department: "",
    designation: candidate.role,
    employeeType: "",
    joiningDate: "",
    aadharNo: "",
    panNo: "",
    accountNo: "",
    ifscCode: "",
    branchName: "",
  }
}

const candidateStages: CandidateStage[] = [
  "New",
  "Screening",
  "Interview",
  "Offer",
  "Hired",
  "Rejected",
]
const stages: Array<"All" | CandidateStage> = ["All", ...candidateStages]

const stageStyles: Record<CandidateStage, string> = {
  New: "border-sky-200 bg-sky-50 text-sky-700",
  Screening: "border-amber-200 bg-amber-50 text-amber-700",
  Interview: "border-violet-200 bg-violet-50 text-violet-700",
  Offer: "border-orange-200 bg-orange-50 text-orange-700",
  Hired: "border-emerald-200 bg-emerald-50 text-emerald-700",
  Rejected: "border-slate-200 bg-slate-100 text-slate-600",
}

async function createCandidatePdf(candidate: Candidate) {
  const pdf = await PDFDocument.create()
  const page = pdf.addPage([595.28, 841.89])
  const regular = await pdf.embedFont(StandardFonts.Helvetica)
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold)
  const ink = rgb(0.09, 0.13, 0.22)
  const muted = rgb(0.38, 0.43, 0.51)
  const accent = rgb(0.05, 0.5, 0.42)

  page.drawText("CANDIDATE PROFILE", {
    x: 48,
    y: 782,
    size: 19,
    font: bold,
    color: ink,
  })
  page.drawText("DEMO RECORD", {
    x: 443,
    y: 788,
    size: 8,
    font: bold,
    color: accent,
  })
  page.drawText(`${candidate.name}  |  ${candidate.applicationId}`, {
    x: 48,
    y: 752,
    size: 11,
    font: regular,
    color: muted,
  })
  page.drawLine({
    start: { x: 48, y: 736 },
    end: { x: 547, y: 736 },
    thickness: 1,
    color: rgb(0.88, 0.9, 0.93),
  })

  const rows: [string, string][] = [
    ["Candidate name", candidate.name],
    ["Application ID", candidate.applicationId],
    ["Email address", candidate.email],
    ["Contact number", candidate.phone],
    ["Applied role", candidate.role],
    [candidate.isSample ? "Experience" : "Qualification", candidate.experience],
    ["Application date", candidate.appliedOn],
    ["Current stage", candidate.stage],
    ["Application source", candidate.source],
  ]

  let y = 704
  for (const [label, value] of rows) {
    page.drawText(label, {
      x: 48,
      y,
      size: 9,
      font: bold,
      color: muted,
    })
    page.drawText(value, {
      x: 205,
      y,
      size: 10,
      font: regular,
      color: ink,
      maxWidth: 340,
    })
    y -= 30
  }

  y -= 5
  page.drawText("SUBMITTED DOCUMENTS", {
    x: 48,
    y,
    size: 11,
    font: bold,
    color: ink,
  })
  y -= 23
  if (candidate.documents.length) {
    for (const document of candidate.documents) {
      page.drawText(`- ${document}`, {
        x: 52,
        y,
        size: 9,
        font: regular,
        color: muted,
      })
      y -= 17
    }
  } else {
    page.drawText("No documents are available in this demo record.", {
      x: 52,
      y,
      size: 9,
      font: regular,
      color: muted,
    })
  }

  page.drawText(
    "Demo data only. Candidate records and resumes are not connected to HRMS storage.",
    {
      x: 48,
      y: 38,
      size: 8,
      font: regular,
      color: muted,
      maxWidth: 500,
    }
  )

  const bytes = await pdf.save()
  return new Blob([bytes as BlobPart], { type: "application/pdf" })
}

export default function CandidatePage() {
  const submittedRecords = useCandidateRecords()
  const deletedDemoIds = useDeletedCandidateDemoIds()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStage, setSelectedStage] = useState<"All" | CandidateStage>(
    "All"
  )
  const [downloadError, setDownloadError] = useState("")
  const [downloadingId, setDownloadingId] = useState<number | string | null>(null)
  const [pdfPreview, setPdfPreview] = useState<{
    url: string
    title: string
    filename: string
  } | null>(null)
  const [previewingId, setPreviewingId] = useState<number | string | null>(null)

  useEffect(() => {
    return () => {
      if (pdfPreview) URL.revokeObjectURL(pdfPreview.url)
    }
  }, [pdfPreview])

  const candidates = useMemo<Candidate[]>(
    () => [
      ...submittedRecords.map((record) => {
        const details = record.details
        const demoId = record.id.startsWith("demo-candidate-")
          ? Number(record.id.slice("demo-candidate-".length))
          : null
        const original = demoId
          ? demoCandidates.find((candidate) => candidate.id === demoId)
          : undefined
        const name =
          [details.firstname, details.lastname].filter(Boolean).join(" ") ||
          original?.name ||
          "New candidate"
        return {
          id: record.id,
          isSubmitted: true,
          isSample: Boolean(original),
          applicationId:
            details.candidateId || original?.applicationId || record.id,
          avatar: name
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0] ?? "")
            .join("")
            .toUpperCase(),
          color: "bg-teal-600",
          name: name || "New candidate",
          email: details.email || original?.email || "",
          phone: details.contactNumber || original?.phone || "",
          role: details.designation || original?.role || "",
          experience:
            details.qualification || original?.experience || "Not specified",
          appliedOn: original?.appliedOn || "Just added",
          stage:
            candidateStages.find((stage) => stage === details.stage) ??
            original?.stage ??
            "New",
          source: original?.source || "Added manually",
          documents: record.documents,
        }
      }),
      ...demoCandidates.filter(
        (candidate) =>
          !deletedDemoIds.has(`demo-candidate-${candidate.id}`) &&
          !submittedRecords.some(
            (record) => record.id === `demo-candidate-${candidate.id}`
          )
      ),
    ],
    [deletedDemoIds, submittedRecords]
  )

  function openCandidateEditor(candidate: Candidate) {
    if (!candidate.isSubmitted) {
      saveCandidateRecord(
        candidateDetailsFromCandidate(candidate),
        candidate.documents,
        `demo-candidate-${candidate.id}`
      )
    }
  }

  function updateCandidateStage(candidate: Candidate, stage: CandidateStage) {
    const recordId = candidate.isSubmitted
      ? String(candidate.id)
      : `demo-candidate-${candidate.id}`
    const currentDetails =
      submittedRecords.find((record) => record.id === recordId)?.details ??
      candidateDetailsFromCandidate(candidate)

    saveCandidateRecord(
      { ...currentDetails, stage },
      candidate.documents,
      recordId
    )
  }

  const filteredCandidates = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    return candidates.filter((candidate) => {
      const matchesSearch =
        !query ||
        candidate.name.toLowerCase().includes(query) ||
        candidate.email.toLowerCase().includes(query) ||
        candidate.role.toLowerCase().includes(query)
      const matchesStage =
        selectedStage === "All" || candidate.stage === selectedStage
      return matchesSearch && matchesStage
    })
  }, [candidates, searchTerm, selectedStage])

  async function handleDownload(candidate: Candidate) {
    setDownloadingId(candidate.id)
    setDownloadError("")
    try {
      const blob = await createCandidatePdf(candidate)
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = `${candidate.applicationId}-${candidate.name.replaceAll(" ", "-")}.pdf`
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
    } catch {
      setDownloadError(
        `Could not create the PDF for ${candidate.name}. Please try again.`
      )
    } finally {
      setDownloadingId(null)
    }
  }

  async function handleViewPdf(candidate: Candidate) {
    setPreviewingId(candidate.id)
    setDownloadError("")
    try {
      const blob = await createCandidatePdf(candidate)
      const url = URL.createObjectURL(blob)
      setPdfPreview({
        url,
        title: `${candidate.name} · Candidate profile`,
        filename: `${candidate.applicationId}-${candidate.name.replaceAll(" ", "-")}.pdf`,
      })
    } catch {
      setDownloadError(
        `Could not create the PDF for ${candidate.name}. Please try again.`
      )
    } finally {
      setPreviewingId(null)
    }
  }

  const hiredCount = candidates.filter(
    (candidate) => candidate.stage === "Hired"
  ).length
  const notHiredCount = candidates.length - hiredCount

  const metrics = [
    {
      label: "Total applicants",
      value: candidates.length,
      detail: "Across all open roles",
      icon: Users,
      tone: "border-slate-200 bg-white text-slate-900",
      iconTone: "bg-slate-900 text-white",
    },
    {
      label: "Hired",
      value: hiredCount,
      detail: "Added to your team",
      icon: Check,
      tone: "border-emerald-200 bg-emerald-50/80 text-emerald-950",
      iconTone: "bg-emerald-600 text-white",
    },
    {
      label: "Not hired",
      value: notHiredCount,
      detail: "Not yet added to your team",
      icon: X,
      tone: "border-rose-200 bg-rose-50/80 text-rose-950",
      iconTone: "bg-rose-600 text-white",
    },
  ]

  if (pdfPreview) {
    return (
      <main className="min-h-screen bg-slate-100 p-3 sm:p-6">
        <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-7xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:min-h-[calc(100vh-3rem)]">
          <header className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setPdfPreview(null)}
                className="min-h-11 rounded-lg border border-slate-200 px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Back to candidates
              </button>
              <h1 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
                {pdfPreview.title}
              </h1>
            </div>
            <a
              href={pdfPreview.url}
              download={pdfPreview.filename}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </header>
          <iframe
            title={pdfPreview.title}
            src={pdfPreview.url}
            className="min-h-[75vh] flex-1 bg-slate-200"
          />
        </div>
      </main>
    )
  }

  return (
    <MotionConfig reducedMotion="user">
      <>
      <main className="relative isolate min-h-[calc(100vh-9rem)] space-y-6 overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-50 via-emerald-50/70 to-cyan-50/80 p-4 pb-10 sm:p-6 lg:p-7">
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
          <div className="absolute top-[34rem] -left-32 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl" />
        </div>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-emerald-950 to-teal-900 px-6 py-7 text-white shadow-xl shadow-emerald-950/15 sm:px-8 sm:py-9"
        >
          <div
            className="pointer-events-none absolute -top-28 -right-12 h-80 w-80 rounded-full border border-white/10 bg-emerald-400/10 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-emerald-200 uppercase">
                <Sparkles className="h-4 w-4" />
                Talent acquisition <span className="text-emerald-400">
                  /
                </span>{" "}
                Pipeline
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Candidate pipeline
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-100/75">
                Keep every application moving, from first review to a successful
                hire.
              </p>
            </div>
            <Link
              href="/addcandidate"
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 self-start rounded-xl bg-white px-5 text-sm font-bold text-emerald-950 shadow-lg shadow-black/10 transition hover:bg-emerald-50 sm:self-auto"
            >
              Add Candidate
              <Plus className="h-4 w-4" />
            </Link>
          </div>
          <div className="relative mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/10 pt-4 text-xs text-emerald-100/75">
            <span className="inline-flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-300" />
              {candidates.length} applications in this session
            </span>
            <span>Updated just now</span>
            <span className="rounded-full border border-white/15 px-2.5 py-1">
              Demo pipeline
            </span>
          </div>
        </motion.header>

        <section
          aria-label="Hiring overview"
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            return (
              <motion.article
                key={metric.label}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + index * 0.07, duration: 0.4 }}
                whileHover={{ y: -3 }}
                className={`relative overflow-hidden rounded-2xl border p-5 shadow-lg shadow-slate-900/5 ${metric.tone}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold opacity-75">
                    {metric.label}
                  </span>
                  <span
                    className={`rounded-xl p-2 shadow-sm ${metric.iconTone}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 text-3xl font-bold">{metric.value}</p>
                <p className="mt-2 text-xs font-medium opacity-65">
                  {metric.detail}
                </p>
              </motion.article>
            )
          })}
        </section>

        <motion.section
          id="candidate-list"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="scroll-mt-6 overflow-hidden rounded-3xl border border-white/80 bg-white/85 shadow-xl shadow-emerald-950/10 backdrop-blur-xl"
        >
          <div className="border-b border-slate-100 bg-white/80 p-5 sm:px-6 sm:py-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-bold text-slate-900">
                    Applications
                  </h2>
                  <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold tracking-wide text-emerald-800 uppercase">
                    {filteredCandidates.length} shown
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-500">
                  Review applicants and track their next hiring step.
                </p>
              </div>
              <label className="relative block w-full lg:max-w-sm">
                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search name, email or role..."
                  aria-label="Search candidates by name, email or role"
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pr-3 pl-9 text-sm text-slate-800 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                />
              </label>
            </div>

            <div
              className="mt-5 flex gap-2 overflow-x-auto pb-1"
              aria-label="Filter by application stage"
            >
              {stages.map((stage) => {
                const count =
                  stage === "All"
                    ? candidates.length
                    : candidates.filter(
                        (candidate) => candidate.stage === stage
                      ).length
                const isSelected = selectedStage === stage
                return (
                  <button
                    key={stage}
                    type="button"
                    onClick={() => setSelectedStage(stage)}
                    aria-pressed={isSelected}
                    className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                      isSelected
                        ? "bg-slate-900 text-white shadow-sm"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-800"
                    }`}
                  >
                    {stage}
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                        isSelected
                          ? "bg-white/15 text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {downloadError ? (
            <p
              role="alert"
              className="mx-5 mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 sm:mx-6"
            >
              {downloadError}
            </p>
          ) : null}

          {filteredCandidates.length ? (
            <div className="bg-gradient-to-br from-emerald-50/35 via-white/50 to-cyan-50/40 p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                <AnimatePresence mode="popLayout">
                  {filteredCandidates.map((candidate, index) => {
                    const editId = candidate.isSubmitted
                      ? String(candidate.id)
                      : `demo-candidate-${candidate.id}`
                    return (
                      <motion.article
                      key={candidate.id}
                      layout
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{
                        duration: 0.28,
                        delay: Math.min(index * 0.035, 0.25),
                        layout: { duration: 0.22 },
                      }}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-950/5 sm:p-6"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                        <span
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-sm ${candidate.color}`}
                        >
                          {candidate.avatar}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3
                                className="truncate text-base font-bold text-slate-900"
                                title={candidate.name}
                              >
                                {candidate.name}
                              </h3>
                              <p className="mt-1 text-xs font-medium text-slate-400">
                                {candidate.applicationId}
                              </p>
                            </div>
                            <span
                              className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${stageStyles[candidate.stage]}`}
                            >
                              {candidate.stage}
                            </span>
                          </div>

                          <p
                            className="mt-3 flex items-center gap-2 text-sm font-semibold text-slate-700"
                            title={candidate.role}
                          >
                            <BriefcaseBusiness className="h-4 w-4 shrink-0 text-emerald-600" />
                            <span className="truncate">{candidate.role}</span>
                          </p>

                          <div className="mt-4 grid grid-cols-2 gap-3 rounded-xl bg-slate-50/80 p-3">
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <Clock3 className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                              <span>
                                {candidate.isSubmitted
                                  ? candidate.isSample
                                    ? `${candidate.experience} experience`
                                    : `Qualification: ${candidate.experience}`
                                  : `${candidate.experience} experience`}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600">
                              <CalendarDays className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                              <span>Applied {candidate.appliedOn}</span>
                            </div>
                            <a
                              href={`mailto:${candidate.email}`}
                              className="flex min-w-0 items-center gap-2 text-xs text-slate-600 transition hover:text-emerald-700"
                            >
                              <Mail className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                              <span className="truncate">
                                {candidate.email}
                              </span>
                            </a>
                            <a
                              href={`tel:${candidate.phone.replaceAll(" ", "")}`}
                              className="flex items-center gap-2 text-xs text-slate-600 transition hover:text-emerald-700"
                            >
                              <Phone className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                              <span>{candidate.phone}</span>
                            </a>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-500">
                              <span className="inline-flex items-center gap-1.5">
                                <FileText className="h-3.5 w-3.5 text-emerald-600" />
                                {candidate.documents.length}{" "}
                                {candidate.documents.length === 1
                                  ? "document"
                                  : "documents"}
                              </span>
                              <span>Via {candidate.source}</span>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                              <Link
                                href={`/addcandidate?edit=${encodeURIComponent(editId)}`}
                                onClick={() => openCandidateEditor(candidate)}
                                aria-label={`Edit ${candidate.name}`}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-sky-200 bg-white text-sky-700 transition hover:bg-sky-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
                              >
                                <Pencil className="h-4 w-4" />
                              </Link>
                              <label className="sr-only" htmlFor={`stage-${candidate.id}`}>
                                Change {candidate.name}'s application stage
                              </label>
                              <select
                                id={`stage-${candidate.id}`}
                                value={candidate.stage}
                                onChange={(event) =>
                                  updateCandidateStage(
                                    candidate,
                                    event.target.value as CandidateStage
                                  )
                                }
                                aria-label={`Change ${candidate.name}'s application stage`}
                                className={`min-h-9 cursor-pointer rounded-lg border px-2.5 text-xs font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${stageStyles[candidate.stage]}`}
                              >
                                {candidateStages.map((stage) => (
                                  <option key={stage} value={stage}>
                                    {stage}
                                  </option>
                                ))}
                              </select>
                              <button
                                type="button"
                                onClick={() => void handleViewPdf(candidate)}
                                disabled={previewingId === candidate.id}
                                aria-label={`Read ${candidate.name} PDF`}
                                title={previewingId === candidate.id ? "Preparing PDF..." : "Read full PDF"}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:cursor-wait disabled:opacity-60"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  if (window.confirm(`Delete ${candidate.name}?`)) {
                                    deleteCandidateRecord(editId)
                                  }
                                }}
                                aria-label={`Delete ${candidate.name}`}
                                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-rose-200 bg-white text-rose-700 transition hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                onClick={() => void handleDownload(candidate)}
                                disabled={downloadingId === candidate.id}
                                aria-label={`Download ${candidate.name} candidate profile as PDF`}
                                className="inline-flex h-9 cursor-pointer items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 text-xs font-semibold text-emerald-800 transition hover:border-emerald-300 hover:bg-emerald-100 disabled:cursor-wait disabled:opacity-60"
                              >
                                <Download className="h-3.5 w-3.5" />
                                {downloadingId === candidate.id
                                  ? "Preparing..."
                                  : "Download profile"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      </motion.article>
                    )
                  })}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                <Search className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-bold text-slate-900">
                No candidates found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try another search or choose a different application stage.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("")
                  setSelectedStage("All")
                }}
                className="mt-4 cursor-pointer text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}

          <p className="border-t border-slate-100 px-5 py-3 text-xs leading-5 text-slate-500 sm:px-6">
            Records added in this demo are kept in memory for this session and
            clear when the page is refreshed. Connect the backend to keep them.
          </p>
        </motion.section>
      </main>
      </>
    </MotionConfig>
  )
}
