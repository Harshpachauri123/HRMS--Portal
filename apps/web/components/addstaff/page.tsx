"use client"

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  FileText,
  GraduationCap,
  Landmark,
  LockKeyhole,
  ShieldCheck,
  Upload,
  UserRound,
  X,
} from "lucide-react"
import Link from "next/link"
import { MotionConfig, motion } from "motion/react"
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"

const acceptedFileTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
])
const maxFileSize = 10 * 1024 * 1024

const documentGroups = [
  {
    title: "Identity documents",
    description: "Upload clear photos or scans of the employee's ID proofs.",
    icon: ShieldCheck,
    documents: [
      { id: "aadhaar-front", label: "Aadhaar card — front side" },
      { id: "aadhaar-back", label: "Aadhaar card — back side" },
      { id: "pan-card", label: "PAN card" },
    ],
  },
  {
    title: "Bank details",
    description: "A passbook scan helps verify salary account information.",
    icon: Landmark,
    documents: [{ id: "passbook", label: "Bank passbook" }],
  },
  {
    title: "Education certificates",
    description: "Add available marksheets in PDF, JPG, PNG, or WebP format.",
    icon: GraduationCap,
    documents: [
      { id: "class-10", label: "Class 10 marksheet" },
      { id: "class-12", label: "Class 12 marksheet" },
      { id: "graduation", label: "Graduation marksheet" },
      { id: "post-graduation", label: "Post-graduation marksheet" },
    ],
  },
] as const

type DocumentUploadProps = {
  id: string
  label: string
}

type EmployeeReview = {
  details: { label: string; value: string }[]
  documents: { label: string; fileName: string; size: number }[]
}

function DocumentUpload({ id, label }: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File | null>(null)
  const [error, setError] = useState("")
  const [previewUrl, setPreviewUrl] = useState("")

  useEffect(() => {
    if (!file || !file.type.startsWith("image/")) {
      setPreviewUrl("")
      return
    }

    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
    return () => URL.revokeObjectURL(objectUrl)
  }, [file])

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.currentTarget.files?.[0]
    event.currentTarget.value = ""
    setError("")

    if (!selectedFile) return

    if (!acceptedFileTypes.has(selectedFile.type)) {
      setError("Choose a JPG, PNG, WebP, or PDF file.")
      return
    }

    if (selectedFile.size > maxFileSize) {
      setError("File must be 10 MB or smaller.")
      return
    }

    setFile(selectedFile)
  }

  function removeFile() {
    setFile(null)
    setError("")
  }

  return (
    <div>
      <input
        ref={inputRef}
        id={id}
        name={id}
        type="file"
        accept="image/jpeg,image/png,image/webp,application/pdf"
        onChange={handleFileChange}
        className="hidden"
      />
      <div
        className={`flex min-h-[94px] items-center gap-3 rounded-xl border p-3 transition ${
          file
            ? "border-indigo-200 bg-indigo-50/40"
            : "border-dashed border-slate-300 bg-white hover:border-indigo-300 hover:bg-slate-50"
        }`}
      >
        {file && previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt={`${label} preview`}
            className="h-14 w-14 shrink-0 rounded-lg border border-slate-200 object-cover"
          />
        ) : (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
            {file ? (
              <FileText className="h-5 w-5" />
            ) : (
              <Upload className="h-5 w-5" />
            )}
          </span>
        )}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-slate-800">
            {label}
          </p>
          {file ? (
            <p className="mt-1 truncate text-xs text-slate-500">
              {file.name} · {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          ) : (
            <p className="mt-1 text-xs text-slate-500">
              JPG, PNG, WebP or PDF · up to 10 MB
            </p>
          )}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-label={`${file ? "Replace" : "Browse files for"} ${label}`}
            className="mt-2 inline-flex cursor-pointer items-center gap-1 rounded-sm text-xs font-semibold text-indigo-700 hover:text-indigo-800 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:outline-none"
          >
            {file ? "Replace file" : "Browse files"}
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </button>
        </div>
        {file ? (
          <button
            type="button"
            onClick={removeFile}
            aria-label={`Remove ${label}`}
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-rose-600"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>
      {error ? (
        <p className="mt-1.5 text-xs font-medium text-rose-600">{error}</p>
      ) : null}
    </div>
  )
}

export default function AddStaffPage() {
  const [step, setStep] = useState<"editing" | "review" | "submitted">(
    "editing"
  )
  const [review, setReview] = useState<EmployeeReview | null>(null)

  function handleReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const details = [
      { label: "Employee full name", name: "name" },
      { label: "Father's name", name: "fatherName" },
      { label: "Contact number", name: "contactNumber" },
      { label: "Email address", name: "email" },
      { label: "Department", name: "department" },
      { label: "Designation", name: "designation" },
    ].map(({ label, name }) => ({
      label,
      value: String(formData.get(name) ?? "").trim(),
    }))
    const documents = documentGroups.flatMap((group) =>
      group.documents.flatMap((document) => {
        const file = formData.get(document.id)
        return file instanceof File && file.size > 0
          ? [{ label: document.label, fileName: file.name, size: file.size }]
          : []
      })
    )

    setReview({ details, documents })
    setStep("review")
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative isolate mx-auto max-w-6xl space-y-6 overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-100 via-indigo-50/80 to-cyan-50/80 p-4 pb-10 sm:p-6 lg:p-7">
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full bg-indigo-300/25 blur-3xl" />
          <div className="absolute top-[38rem] -left-28 h-72 w-72 rounded-full bg-cyan-300/25 blur-3xl" />
          <div className="absolute right-1/4 bottom-10 h-64 w-64 rounded-full bg-violet-300/20 blur-3xl" />
        </div>
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
          <Link
            href="/staff"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to employees
          </Link>
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 px-6 py-7 text-white shadow-xl shadow-indigo-950/15 sm:px-8 sm:py-9"
        >
          <div className="pointer-events-none absolute -top-24 -right-12 h-72 w-72 rounded-full border border-white/10 bg-indigo-400/10 blur-2xl" />
          <div className="pointer-events-none absolute right-1/3 bottom-[-7rem] h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-xs font-bold tracking-[0.16em] text-indigo-200 uppercase">
                People operations{" "}
                <span className="px-1 text-indigo-400">/</span> Employee
                onboarding
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white">
                {step === "editing"
                  ? "Add a new employee"
                  : step === "review"
                    ? "Review employee details"
                    : "Submission complete"}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100/75">
                {step === "editing"
                  ? "Enter their personal details and attach the documents needed to complete their employee profile."
                  : step === "review"
                    ? "Review the details and documents before submitting the employee form."
                    : "The employee form has been submitted successfully."}
              </p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-emerald-100">
              <LockKeyhole className="h-3.5 w-3.5 text-emerald-300" />
              Secure employee information
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className={`grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_280px] ${
            step === "editing" ? "" : "hidden"
          }`}
        >
          <form onSubmit={handleReview} className="space-y-6">
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br from-white/95 via-indigo-50/55 to-blue-100/55 shadow-lg shadow-indigo-950/5 backdrop-blur-sm"
            >
              <div className="flex items-start gap-3 border-b border-indigo-100/80 bg-white/45 px-5 py-5 sm:px-7">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-600/20">
                  <UserRound className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Personal information
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Basic details used to identify and contact the employee.
                  </p>
                </div>
              </div>
              <div className="grid gap-x-5 gap-y-5 px-5 py-6 sm:grid-cols-2 sm:px-7">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="employee-name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Employee full name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="employee-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    maxLength={120}
                    placeholder="Enter full name as per ID proof"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="Staff-Id"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Staff ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="Staff-Id"
                    name="staffId"
                    type="text"
                    required
                    maxLength={120}
                    placeholder="Enter staff ID"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="father-name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Father&apos;s name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="father-name"
                    name="fatherName"
                    type="text"
                    required
                    maxLength={120}
                    placeholder="Enter father's full name"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-number"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Contact number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="contact-number"
                    name="contactNumber"
                    type="tel"
                    inputMode="numeric"
                    autoComplete="tel"
                    required
                    pattern="[6-9][0-9]{9}"
                    title="Enter a valid 10-digit Indian mobile number"
                    placeholder="10-digit mobile number"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                  <p className="mt-1.5 text-xs text-slate-500">
                    Enter a 10-digit Indian mobile number.
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder="employee@company.com"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="Joining-date"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Joining Date <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="Joining-date"
                    name="joiningDate"
                    type="date"
                    required
                    maxLength={120}
                    placeholder="Enter joining date"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="Employee-type"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Employee Type <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="Employee-type"
                    name="employeeType"
                    type="text"
                    required
                    maxLength={120}
                    placeholder="Enter employee type (e.g., Full-time, Part-time, Contract, Internship)"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="department"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Department <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="department"
                    name="department"
                    type="text"
                    autoComplete="department"
                    required
                    maxLength={100}
                    placeholder="HR, IT, Sales, etc."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
                <div>
                  <label
                    htmlFor="designation"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Designation <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="designation"
                    name="designation"
                    type="text"
                    autoComplete="designation"
                    required
                    maxLength={254}
                    placeholder="HR Manager, Software Engineer, Sales Associate, etc."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />
                </div>
              </div>
            </motion.section>

            {documentGroups.map((group) => {
              const Icon = group.icon
              return (
                <motion.section
                  key={group.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 }}
                  className="overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br from-white/95 via-violet-50/45 to-cyan-50/60 shadow-lg shadow-indigo-950/5 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3 border-b border-indigo-100/70 bg-white/45 px-5 py-5 sm:px-7">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/15">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        {group.title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        {group.description}
                      </p>
                    </div>
                  </div>
                  <div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7">
                    {group.documents.map((document) => (
                      <DocumentUpload
                        key={document.id}
                        id={document.id}
                        label={document.label}
                      />
                    ))}
                  </div>
                </motion.section>
              )
            })}

            <motion.div
              whileHover={{ y: -2 }}
              className="flex flex-col-reverse gap-3 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-lg shadow-indigo-950/5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <p className="text-xs text-slate-500">
                Fields marked <span className="font-bold text-rose-500">*</span>{" "}
                are required.
              </p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Link
                  href="/staff"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:outline-none"
                >
                  Review employee details
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          </form>

          <motion.aside
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.12 }}
            className="space-y-4 xl:sticky xl:top-6"
          >
            <section className="rounded-2xl border border-white/80 bg-gradient-to-br from-white/95 via-indigo-50/55 to-cyan-50/65 p-5 shadow-lg shadow-indigo-950/5 backdrop-blur-sm">
              <h2 className="text-sm font-bold text-slate-900">
                Onboarding checklist
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                Complete these sections to prepare the employee profile.
              </p>
              <ol className="mt-5 space-y-4">
                {[
                  {
                    title: "Personal information",
                    detail: "Contact and identity details",
                    icon: UserRound,
                  },
                  {
                    title: "Identity & bank",
                    detail: "Aadhaar, PAN and passbook",
                    icon: Landmark,
                  },
                  {
                    title: "Education",
                    detail: "School and degree marksheets",
                    icon: GraduationCap,
                  },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <li key={item.title} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-800">
                          {String(index + 1).padStart(2, "0")}. {item.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          {item.detail}
                        </span>
                      </span>
                    </li>
                  )
                })}
              </ol>
            </section>

            <section className="rounded-2xl border border-indigo-200/70 bg-gradient-to-br from-indigo-100/90 via-violet-100/65 to-sky-100/75 p-5 shadow-md shadow-indigo-950/5">
              <div className="flex items-center gap-2 text-sm font-bold text-indigo-950">
                <LockKeyhole className="h-4 w-4 text-indigo-700" />
                Handle documents safely
              </div>
              <p className="mt-2 text-xs leading-5 text-indigo-900/75">
                Aadhaar, PAN, and bank documents contain sensitive personal
                data. Only upload them when your secure employee storage is
                configured.
              </p>
              <div className="mt-4 flex items-start gap-2 border-t border-indigo-200/70 pt-3 text-xs leading-5 text-indigo-900/75">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-indigo-700" />
                Files stay in this form and are not saved by this page.
              </div>
            </section>

            <div className="flex items-start gap-2 px-1 text-xs leading-5 text-slate-500">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              Supported formats: JPG, PNG, WebP, PDF. Maximum file size: 10 MB
              each.
            </div>
          </motion.aside>
        </motion.div>

        {step === "review" && review ? (
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl space-y-6"
          >
            <section className="overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br from-white/95 via-indigo-50/55 to-cyan-50/55 shadow-lg shadow-indigo-950/5">
              <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-5 sm:px-7">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                  <UserRound className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Personal information
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Review all employee information before submitting.
                  </p>
                </div>
              </div>
              <dl className="grid gap-5 p-5 sm:grid-cols-2 sm:p-7">
                {review.details.map((detail) => (
                  <div key={detail.label}>
                    <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                      {detail.label}
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium break-words text-slate-900">
                      {detail.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>

            {documentGroups.map((group) => {
              const Icon = group.icon
              return (
                <section
                  key={group.title}
                  className="overflow-hidden rounded-2xl border border-white/80 bg-gradient-to-br from-white/95 via-violet-50/40 to-cyan-50/55 shadow-lg shadow-indigo-950/5"
                >
                  <div className="flex items-start gap-3 border-b border-slate-100 px-5 py-5 sm:px-7">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h2 className="text-base font-bold text-slate-900">
                        {group.title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Uploaded files are listed below.
                      </p>
                    </div>
                  </div>
                  <ul className="grid gap-3 p-5 sm:grid-cols-2 sm:p-7">
                    {group.documents.map((document) => {
                      const uploadedDocument = review.documents.find(
                        (item) => item.label === document.label
                      )
                      return (
                        <li
                          key={document.id}
                          className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 p-3"
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              uploadedDocument
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {uploadedDocument ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-slate-800">
                              {document.label}
                            </span>
                            {uploadedDocument ? (
                              <span className="mt-0.5 block truncate text-xs text-slate-500">
                                {uploadedDocument.fileName} ·{" "}
                                {(
                                  uploadedDocument.size /
                                  (1024 * 1024)
                                ).toFixed(2)}{" "}
                                MB
                              </span>
                            ) : (
                              <span className="mt-0.5 block text-xs text-slate-400">
                                Not uploaded
                              </span>
                            )}
                          </span>
                        </li>
                      )
                    })}
                  </ul>
                </section>
              )
            })}

            <div className="flex flex-col-reverse justify-end gap-3 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-lg shadow-indigo-950/5 backdrop-blur-sm sm:flex-row sm:px-6">
              <button
                type="button"
                onClick={() => setStep("editing")}
                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to edit
              </button>
              <button
                type="button"
                onClick={() => setStep("submitted")}
                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:outline-none"
              >
                Submit Staff form
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : null}

        {step === "submitted" ? (
          <motion.section
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            role="status"
            className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-emerald-100/80 bg-gradient-to-br from-white via-emerald-50/60 to-cyan-50/80 px-6 py-12 text-center shadow-xl shadow-emerald-950/10 sm:px-12 sm:py-16"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-8 ring-emerald-50/60">
              <BadgeCheck className="h-11 w-11" />
            </span>
            <p className="mt-7 text-xs font-bold tracking-[0.16em] text-emerald-700 uppercase">
              Submission successful
            </p>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Your Staff form has been submitted successfully. The Staff profile
              will be created and the onboarding process will begin.
            </p>
            <Link
              href="/staff"
              className="mt-8 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Back to Staff Management
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.section>
        ) : null}
      </main>
    </MotionConfig>
  )
}
