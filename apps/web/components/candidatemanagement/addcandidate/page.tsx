"use client"

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
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
import {
  saveCandidateRecord,
  useCandidateRecords,
} from "@/lib/session-records"
import { MotionConfig, motion } from "motion/react"
import { toast } from "@workspace/ui/components/toast"
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react"

const maxResumeSize = 10 * 1024 * 1024
const acceptedResumeTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
])

const acceptedFileTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
])
const maxFileSize = 10 * 1024 * 1024

const documentGroups = [
 
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

type CandidateDetails = {
  // 1. Personal & Contact
  firstname: string
  lastname: string
  candidateId: string
  fatherName: string
  contactNumber: string
  email: string
  maritalStatus: string
  nationality: string
  qualification: string
  experience: string
  dateofbirth: string
  permanentAddress: string

  // 2. Role & Employment
  department: string
  designation: string
  employeeType: string
  joiningDate: string

  // 3. Identity & KYC
  aadharNo: string
  panNo: string

  // 4. Bank Account Details
  accountNo: string
  ifscCode: string
  branchName: string
  companyName: string
  jobId: string
}

type FormFieldConfig = {
  name: keyof CandidateDetails
  label: string
  type: string
  placeholder: string
  options?: string[]
  autoComplete?: string
  colSpan?: boolean
  helperText?: string
  maxLength?: number
  pattern?: string
  inputMode?: "text" | "numeric" | "tel" | "email"
}

type FieldGroup = {
  title: string
  fields: FormFieldConfig[]
}

const fieldGroups: FieldGroup[] = [
  {
    title: "1. Personal & Contact Details",
    fields: [
      {
        name: "firstname",
        label: "First name",
        type: "text",
        placeholder: "Enter first name",
        autoComplete: "given-name",
        colSpan: true,
      },
      {
        name: "lastname",
        label: "Last name",
        type: "text",
        placeholder: "Enter last name",
        autoComplete: "family-name",
        colSpan: true,
      },
      {
        name: "candidateId",
        label: "Candidate ID",
        type: "text",
        placeholder: "e.g. CA-2041 or EMP-101",
      },
      {
        name: "fatherName",
        label: "Father's name",
        type: "text",
        placeholder: "Enter father's full name",
      },
      {
        name: "contactNumber",
        label: "Contact number",
        type: "tel",
        inputMode: "numeric",
        placeholder: "10-digit mobile number",
        autoComplete: "tel",
        pattern: "[6-9][0-9]{9}",
        helperText: "Enter a 10-digit Indian mobile number.",
      },
      {
        name: "email",
        label: "Email address",
        type: "email",
        placeholder: "candidate@example.com",
        autoComplete: "email",
      },
      {
        name: "maritalStatus",
        label: "Marital status",
        type: "select",
        placeholder: "Select marital status",
        options: ["Married", "Unmarried", "Divorced", "Other"],
      },
      {
        name: "nationality",
        label: "Nationality",
        type: "select",
        placeholder: "Select nationality",
        options: ["Indian", "Other"],
      },
      {
        name: "qualification",
        label: "Highest qualification",
        type: "select",
        placeholder: "Select qualification",
        options: [
          "High School",
          "Intermediate",
          "Bachelor's Degree",
          "Master's Degree",
        ],
      },
      {
        name: "experience",
        label: "Total experience",
        type: "select",
        placeholder: "Select experience level",
        options: [
          "Fresher",
          "1-2 years",
          "3-5 years",
          "5+ years",
        ],
      },
       {
        name: "dateofbirth",
        label: "Date of birth",
        type: "date",
        placeholder: "",
      },
      {
        name: "permanentAddress",
        label: "Permanent address",
        type: "text",
        placeholder: "Complete residential address with City, State & PIN code",
        colSpan: true,
        autoComplete: "street-address",
      },
    ],
  },
  {
    title: "2. Role & Employment Details",
    fields: [
      {
        name: "department",
        label: "Department",
        type: "text",
        placeholder: "HR, IT, Sales, Marketing, etc.",
      },
      {
        name: "designation",
        label: "Designation",
        type: "text",
        placeholder: "Role or position applied for",
      },
      {
        name: "employeeType",
        label: "Employment type",
        type: "text",
        placeholder: "Select employment type",
        options: [
          "Full-time",
          "Part-time",
          "Contract",
          "Internship",
        ],
      },
      {
        name: "joiningDate",
        label: "Applying date",
        type: "date",
        placeholder: "",
      },
    ],
  },
]

function readDetails(formData: FormData): CandidateDetails {
  return {
    firstname: String(formData.get("firstname") ?? "").trim(),
    lastname: String(formData.get("lastname") ?? "").trim(),
    candidateId: String(formData.get("candidateId") ?? "").trim(),
    fatherName: String(formData.get("fatherName") ?? "").trim(),
    contactNumber: String(formData.get("contactNumber") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    maritalStatus: String(formData.get("maritalStatus") ?? "").trim(),
    nationality: String(formData.get("nationality") ?? "").trim(),
    qualification: String(formData.get("qualification") ?? "").trim(),
    experience: String(formData.get("experience") ?? "").trim(),
    dateofbirth: String(formData.get("dateofbirth") ?? "").trim(),
    permanentAddress: String(formData.get("permanentAddress") ?? "").trim(),
    department: String(formData.get("department") ?? "").trim(),
    designation: String(formData.get("designation") ?? "").trim(),
    employeeType: String(formData.get("employeeType") ?? "").trim(),
    joiningDate: String(formData.get("joiningDate") ?? "").trim(),
    aadharNo: String(formData.get("aadharNo") ?? "").trim(),
    panNo: String(formData.get("panNo") ?? "").trim(),
    accountNo: String(formData.get("accountNo") ?? "").trim(),
    ifscCode: String(formData.get("ifscCode") ?? "").trim(),
    branchName: String(formData.get("branchName") ?? "").trim(),
    companyName: String(formData.get("companyName") ?? "").trim(),
    jobId: String(formData.get("jobId") ?? "").trim(),
  }
}

type DocumentUploadProps = {
  id: string
  label: string
  file?: File | null
  onFileChange: (file: File | null) => void
}

function DocumentUpload({
  id,
  label,
  file,
  onFileChange,
}: DocumentUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
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

    onFileChange(selectedFile)
  }

  function removeFile() {
    onFileChange(null)
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
            ? "border-lime-200 bg-lime-50/60"
            : "border-dashed border-slate-300 bg-[#f6faef] hover:border-lime-300 hover:bg-lime-50/30"
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
              <FileText className="h-5 w-5 text-lime-700" />
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
              {file.name} ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          ) : (
            <p className="mt-1 text-xs text-slate-500">
              JPG, PNG, WebP or PDF ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· up to 10 MB
            </p>
          )}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            aria-label={`${file ? "Replace" : "Browse files for"} ${label}`}
            className="mt-2 inline-flex cursor-pointer items-center gap-1 rounded-sm text-xs font-semibold text-lime-700 hover:text-lime-800 focus-visible:ring-2 focus-visible:ring-lime-400 focus-visible:outline-none"
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
            className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-slate-400 transition hover:bg-[#f6faef] hover:text-rose-600"
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

function CandidateResumeUpload({
  file,
  onResumeChange,
}: {
  file: File | null
  onResumeChange: (file: File | null) => void
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [error, setError] = useState("")

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.currentTarget.files?.[0] ?? null
    event.currentTarget.value = ""
    setError("")

    if (!selectedFile) return

    if (!acceptedResumeTypes.has(selectedFile.type)) {
      setError("Choose a PDF, DOC, or DOCX resume.")
      return
    }

    if (selectedFile.size > maxResumeSize) {
      setError("Resume must be 10 MB or smaller.")
      return
    }

    onResumeChange(selectedFile)
  }

  function removeResume() {
    setError("")
    onResumeChange(null)
  }

  return (
    <div>
      <input
        ref={inputRef}
        id="candidate-resume"
        name="resume"
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        onChange={handleFileChange}
        className="sr-only"
      />
      <div
        className={`rounded-2xl border-2 border-dashed p-5 transition sm:p-6 ${
          file
            ? "border-lime-300 bg-lime-50/70"
            : "border-slate-300 bg-slate-50/80 hover:border-lime-300 hover:bg-lime-50/40"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <span
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              file
                ? "bg-lime-100 text-lime-700"
                : "bg-[#f6faef] text-slate-500 shadow-sm"
            }`}
          >
            {file ? (
              <FileText className="h-5 w-5" />
            ) : (
              <Upload className="h-5 w-5" />
            )}
          </span>
          <p className="mt-3 max-w-full truncate text-sm font-semibold text-slate-800">
            {file ? file.name : "Upload candidate resume"}
          </p>
          <p className="mt-1 text-xs text-slate-500">
            {file
              ? `${(file.size / (1024 * 1024)).toFixed(2)} MB`
              : "PDF, DOC, or DOCX ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· up to 10 MB"}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-lime-600 px-3.5 text-xs font-semibold text-white transition hover:bg-lime-400 hover:text-green-950 focus-visible:ring-4 focus-visible:ring-lime-200 focus-visible:outline-none"
            >
              <Upload className="h-3.5 w-3.5" />
              {file ? "Replace resume" : "Choose resume"}
            </button>
            {file ? (
              <button
                type="button"
                onClick={removeResume}
                className="inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-[#fbfdf6] px-3.5 text-xs font-semibold text-slate-600 transition hover:border-rose-200 hover:text-rose-700"
              >
                <X className="h-3.5 w-3.5" />
                Remove
              </button>
            ) : null}
          </div>
        </div>
      </div>
      {error ? (
        <p role="alert" className="mt-2 text-xs font-medium text-rose-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}

type JobApplication = {
  company: string
  jobId: string
  position: string
  experience?: string
  responsibilities?: string
}

export default function AddCandidatePage({
  initialJobApplication,
}: {
  initialJobApplication?: JobApplication
} = {}) {
  const candidateRecords = useCandidateRecords()
  const [recordId, setRecordId] = useState<string | null>(null)
  const [formReady, setFormReady] = useState(false)
  const [step, setStep] = useState<"editing" | "review" | "submitted">(
    "editing"
  )
  const [details, setDetails] = useState<CandidateDetails | null>(null)
  const [resume, setResume] = useState<File | null>(null)
  const [documents, setDocuments] = useState<Record<string, File>>({})
  const [jobApplication, setJobApplication] = useState({
    company: "",
    jobId: "",
    position: "",
    experience: "",
    responsibilities: "",
  })
  const editingRecord = candidateRecords.find((record) => record.id === recordId)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setRecordId(params.get("edit"))
    setJobApplication({
      company: initialJobApplication?.company ?? params.get("company") ?? "",
      jobId: initialJobApplication?.jobId ?? params.get("jobId") ?? "",
      position: initialJobApplication?.position ?? params.get("position") ?? "",
      experience: initialJobApplication?.experience ?? params.get("experience") ?? "",
      responsibilities: initialJobApplication?.responsibilities ?? params.get("responsibilities") ?? "",
    })
    setFormReady(true)
  }, [initialJobApplication])

  function handleDocumentChange(id: string, file: File | null) {
    setDocuments((prev) => {
      const next = { ...prev }
      if (file) {
        next[id] = file
      } else {
        delete next[id]
      }
      return next
    })
  }

  function handleReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setDetails(readDetails(new FormData(event.currentTarget)))
    setStep("review")
    toast.add({
      title: "Application ready to review",
      description: "Check the candidate details before confirming.",
      type: "success",
    })
  }

  function handleConfirm() {
    if (!details) return
    const documentNames = [
      ...new Set([
        ...(editingRecord?.documents ?? []),
        ...(resume ? [resume.name] : []),
        ...Object.values(documents).map((file) => file.name),
      ]),
    ]
    saveCandidateRecord({ ...details }, documentNames, recordId ?? undefined)
    setStep("submitted")
    toast.add({
      title: "Application submitted",
      description: "Candidate details have been saved for this session.",
      type: "success",
    })
  }

  if (recordId && formReady && !editingRecord) {
    return (
      <main className="mx-auto max-w-2xl rounded-3xl border border-amber-200 bg-amber-50 p-6 text-center">
        <h1 className="text-lg font-bold text-slate-900">Candidate record unavailable</h1>
        <p className="mt-2 text-sm text-slate-600">
          This demo record is held only for the current session. Return to the candidate list and try again.
        </p>
      </main>
    )
  }

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative isolate mx-auto max-w-6xl space-y-6 overflow-hidden rounded-[30px] border border-[#d5e4bf] bg-[#f6faed] p-4 pb-10 sm:p-6 lg:p-7" style={{ backgroundImage: "linear-gradient(to right, rgba(132, 204, 22, 0.075) 1px, transparent 1px), linear-gradient(to bottom, rgba(132, 204, 22, 0.075) 1px, transparent 1px)", backgroundSize: "28px 28px" }}>
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-28 -right-24 h-88 w-88 rounded-full bg-lime-300/30 blur-3xl" />
          <div className="absolute top-[34rem] -left-28 h-80 w-80 rounded-full bg-green-300/20 blur-3xl" />
          <div className="absolute right-1/4 bottom-10 h-64 w-64 rounded-full bg-lime-200/25 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
        >
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-lime-950 to-green-900 px-6 py-7 text-white shadow-xl shadow-lime-950/15 sm:px-8 sm:py-9"
        >
          <div
            className="pointer-events-none absolute -top-24 -right-12 h-72 w-72 rounded-full border border-white/10 bg-lime-400/10 blur-2xl"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-lime-200 uppercase">
                <BriefcaseBusiness className="h-4 w-4" />
                Talent acquisition <span className="text-lime-400">/</span> New
                application
              </p>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {step === "editing"
                  ? recordId
                    ? "Edit candidate details"
                    : "Add a candidate"
                  : step === "review"
                    ? "Review application"
                    : "Application received"}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-lime-100/75">
                {step === "editing"
                  ? "Add candidate details, attach their resume and required documents to start the application review."
                  : step === "review"
                    ? "Make sure the candidate information and documents are correct before submitting."
                    : "The candidate details and documents were reviewed in this demo form."}
              </p>
            </div>
            <div className="flex items-center gap-2 self-start rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-lime-100 sm:self-auto">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15">
                {step === "submitted" ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <LockKeyhole className="h-3.5 w-3.5" />
                )}
              </span>
              {step === "editing"
                ? "Step 1 ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· Candidate details & documents"
                : step === "review"
                  ? "Step 2 ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· Review"
                  : "Step 3 ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· Complete"}
            </div>
          </div>
          <div className="relative mt-7 h-1.5 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-lime-400 to-green-300"
              initial={false}
              animate={{
                width:
                  step === "editing"
                    ? "33.33%"
                    : step === "review"
                      ? "66.66%"
                      : "100%",
              }}
              transition={{ duration: 0.35 }}
            />
          </div>
        </motion.header>

        <motion.form
          key={recordId ?? jobApplication.jobId ?? "new-candidate"}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleReview}
          className={`grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_300px] ${
            step === "editing" ? "" : "hidden"
          }`}
        >
          {jobApplication.jobId ? (
            <section className="rounded-2xl border border-lime-200 bg-[#f6faef] px-5 py-4 shadow-sm xl:col-span-2">
              <h2 className="text-sm font-bold text-slate-900">
                Applying for this position
              </h2>
              <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase text-slate-500">
                    Company name
                  </dt>
                  <dd className="mt-1 font-medium text-slate-900">
                    {jobApplication.company}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase text-slate-500">
                    Job ID
                  </dt>
                  <dd className="mt-1 font-medium text-slate-900">
                    {jobApplication.jobId}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase text-slate-500">Position</dt>
                  <dd className="mt-1 font-medium text-slate-900">{jobApplication.position}</dd>
                </div>
                {jobApplication.experience ? (
                  <div>
                    <dt className="text-xs font-semibold uppercase text-slate-500">Required experience</dt>
                    <dd className="mt-1 font-medium text-slate-900">{jobApplication.experience}</dd>
                  </div>
                ) : null}
                {jobApplication.responsibilities ? (
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-semibold uppercase text-slate-500">Roles &amp; responsibilities</dt>
                    <dd className="mt-1 whitespace-pre-line leading-6 text-slate-700">{jobApplication.responsibilities}</dd>
                  </div>
                ) : null}
              </dl>
            </section>
          ) : null}
          <input type="hidden" name="companyName" value={jobApplication.company} />
          <input type="hidden" name="jobId" value={jobApplication.jobId} />
          <div className="space-y-6">
            <section className="overflow-hidden rounded-3xl border border-white/80 bg-[#f6faef] shadow-lg shadow-lime-950/5 backdrop-blur-sm">
              <div className="flex items-start gap-3 border-b border-lime-100/80 bg-gradient-to-r from-white via-lime-50/60 to-green-50/40 px-5 py-5 sm:px-7">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-600 text-white shadow-md shadow-lime-600/20">
                  <UserRound className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Candidate information
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Enter the complete profile details for candidate onboarding.
                  </p>
                </div>
              </div>

              <div className="space-y-6 p-5 sm:p-7">
                {fieldGroups.map((group, groupIndex) => (
                  <div
                    key={group.title}
                    className={
                      groupIndex > 0 ? "border-t border-slate-100 pt-6" : ""
                    }
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-lime-600" />
                      <h3 className="text-xs font-bold tracking-wider text-lime-900 uppercase">
                        {group.title}
                      </h3>
                    </div>
                    <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2">
                      {group.fields.map((field) => (
                        <div
                          key={field.name}
                          className={field.colSpan ? "sm:col-span-2" : ""}
                        >
                          <label
                            htmlFor={`candidate-${field.name}`}
                            className="mb-2 block text-sm font-semibold text-slate-700"
                          >
                            {field.label}{" "}
                            <span className="text-rose-500">*</span>
                          </label>
                          {field.options ? (
                            <select
                              id={`candidate-${field.name}`}
                              name={field.name}
                              required={
                                !editingRecord ||
                                Boolean(editingRecord.details[field.name])
                              }
                              defaultValue={editingRecord?.details[field.name] ?? ""}
                              className="h-11 w-full rounded-xl border border-slate-200 bg-[#fbfdf6] px-3.5 text-sm text-slate-900 transition outline-none focus:border-lime-400 focus:ring-4 focus:ring-lime-100"
                            >
                              <option value="" disabled>
                                {field.placeholder}
                              </option>
                              {field.options.map((option) => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              id={`candidate-${field.name}`}
                              name={field.name}
                              type={field.type}
                              autoComplete={field.autoComplete}
                              required={
                                !editingRecord ||
                                Boolean(editingRecord.details[field.name])
                              }
                              maxLength={field.maxLength ?? 254}
                              pattern={field.pattern}
                              inputMode={field.inputMode}
                              placeholder={field.placeholder}
                              value={
                                field.name === "designation"
                                  ? editingRecord?.details.designation ?? jobApplication.position
                                  : undefined
                              }
                              defaultValue={
                                field.name === "designation"
                                  ? undefined
                                  : editingRecord?.details[field.name] ?? ""
                              }
                              onChange={
                                field.name === "designation"
                                  ? (event) => {
                                      const position = event.currentTarget.value
                                      setJobApplication((current) => ({
                                        ...current,
                                        position,
                                      }))
                                    }
                                  : undefined
                              }
                              className="h-11 w-full rounded-xl border border-slate-200 bg-[#fbfdf6] px-3.5 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-lime-400 focus:ring-4 focus:ring-lime-100"
                            />
                          )}
                          {field.helperText ? (
                            <p className="mt-1.5 text-xs text-slate-500">
                              {field.helperText}
                            </p>
                          ) : null}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-white/80 bg-[#f6faef] shadow-lg shadow-lime-950/5 backdrop-blur-sm">
              <div className="flex items-start gap-3 border-b border-lime-100/80 bg-gradient-to-r from-white via-lime-50/60 to-green-50/40 px-5 py-5 sm:px-7">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white shadow-md shadow-green-600/20">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Resume</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Upload candidate resume in PDF, DOC, or DOCX format.
                  </p>
                </div>
              </div>
              <div className="p-5 sm:p-7">
                <CandidateResumeUpload
                  file={resume}
                  onResumeChange={setResume}
                />
              </div>
            </section>

            {documentGroups.map((group) => {
              const Icon = group.icon
              return (
                <motion.section
                  key={group.title}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.06 }}
                  className="overflow-hidden rounded-3xl border border-white/80 bg-[#f6faef] shadow-lg shadow-lime-950/5 backdrop-blur-sm"
                >
                  <div className="flex items-start gap-3 border-b border-lime-100/80 bg-gradient-to-r from-white via-lime-50/60 to-green-50/40 px-5 py-5 sm:px-7">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-lime-600 to-green-600 text-white shadow-md shadow-lime-600/20">
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
                        file={documents[document.id] ?? null}
                        onFileChange={(file) =>
                          handleDocumentChange(document.id, file)
                        }
                      />
                    ))}
                  </div>
                </motion.section>
              )
            })}

            <div className="flex flex-col-reverse gap-3 rounded-2xl border border-white/80 bg-[#f6faef] p-4 shadow-lg shadow-lime-950/5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <p className="text-xs text-slate-500">
                Fields marked <span className="font-bold text-rose-500">*</span>{" "}
                are required. Resume and documents are optional.
              </p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Link
                  href="/candidates"
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-[#f6faef] px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-lime-600 px-5 text-sm font-semibold text-slate-950 shadow-sm shadow-lime-200 transition hover:bg-lime-400 hover:text-green-950 focus-visible:ring-4 focus-visible:ring-lime-200 focus-visible:outline-none"
                >
                  Review candidate
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <aside className="space-y-4 xl:sticky xl:top-6">
            <section className="rounded-3xl border border-white/80 bg-gradient-to-br from-white via-lime-50/60 to-green-50/50 p-5 shadow-lg shadow-lime-950/5">
              <h2 className="text-sm font-bold text-slate-900">
                Application checklist
              </h2>
              <p className="mt-1 text-xs leading-5 text-slate-500">
                A quick overview of what you will provide.
              </p>
              <ul className="mt-5 space-y-4">
                {[
                  {
                    icon: UserRound,
                    title: "Candidate details",
                    description: "Personal, KYC & bank details",
                  },
                  {
                    icon: FileText,
                    title: "Resume",
                    description: "PDF, DOC, or DOCX ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â· max 10 MB",
                  },
                  {
                    icon: ShieldCheck,
                    title: "Identity & bank docs",
                    description: "Aadhaar, PAN and passbook",
                  },
                  {
                    icon: GraduationCap,
                    title: "Education docs",
                    description: "School and degree marksheets",
                  },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <li key={item.title} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f6faef] text-lime-700 shadow-sm">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-slate-800">
                          {String(index + 1).padStart(2, "0")}. {item.title}
                        </span>
                        <span className="mt-0.5 block text-xs text-slate-500">
                          {item.description}
                        </span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>

            <section className="rounded-3xl border border-lime-200/80 bg-gradient-to-br from-lime-100/90 via-green-100/60 to-lime-100/70 p-5 shadow-md shadow-lime-950/5">
              <div className="flex items-center gap-2 text-sm font-bold text-lime-950">
                <LockKeyhole className="h-4 w-4 text-lime-700" />
                Handle documents safely
              </div>
              <p className="mt-2 text-xs leading-5 text-lime-900/80">
                Aadhaar, PAN, and bank documents contain sensitive personal
                data. Files stay in this form and are not saved without secure
                candidate storage.
              </p>
              <div className="mt-4 flex items-start gap-2 border-t border-lime-200/70 pt-3 text-xs leading-5 text-lime-900/80">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lime-700" />
                Files stay in this form and are not persisted.
              </div>
            </section>

            <div className="flex items-start gap-2 px-1 text-xs leading-5 text-slate-500">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              Supported formats: JPG, PNG, WebP, PDF, DOC, DOCX. Maximum file size: 10 MB each.
            </div>
          </aside>
        </motion.form>

        {step === "review" && details ? (
          <motion.div
            key="review"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto max-w-4xl space-y-5"
          >
            <section className="overflow-hidden rounded-3xl border border-white/80 bg-[#f6faef] shadow-lg shadow-lime-950/5">
              <div className="flex items-start gap-3 border-b border-lime-100/80 bg-gradient-to-r from-white via-lime-50/60 to-green-50/40 px-5 py-5 sm:px-7">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-600 text-white">
                  <UserRound className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Candidate details
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Review all candidate information before confirming.
                  </p>
                </div>
              </div>

              <div className="space-y-6 p-5 sm:p-7">
                {fieldGroups.map((group, groupIndex) => (
                  <div
                    key={group.title}
                    className={
                      groupIndex > 0 ? "border-t border-slate-100 pt-6" : ""
                    }
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-lime-600" />
                      <h3 className="text-xs font-bold tracking-wider text-lime-900 uppercase">
                        {group.title}
                      </h3>
                    </div>
                    <dl className="grid gap-5 sm:grid-cols-2">
                      {group.fields.map((field) => (
                        <div
                          key={field.name}
                          className={field.colSpan ? "sm:col-span-2" : ""}
                        >
                          <dt className="text-xs font-semibold tracking-wide text-slate-500 uppercase">
                            {field.label}
                          </dt>
                          <dd className="mt-1.5 text-sm font-medium break-words text-slate-900">
                            {details[field.name] || "ÃƒÆ’Ã†â€™Ãƒâ€šÃ‚Â¢ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¬ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬Ãƒâ€šÃ‚Â"}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </section>

            <section className="overflow-hidden rounded-3xl border border-white/80 bg-[#f6faef] p-5 shadow-lg shadow-lime-950/5 sm:p-7">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-100 text-lime-700">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Resume attachment
                  </h2>
                  <p className="text-sm text-slate-500">
                    Review attached resume file.
                  </p>
                </div>
              </div>
              {resume ? (
                <div className="mt-4 flex items-center gap-3 rounded-xl border border-lime-200 bg-lime-50/60 p-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-100 text-lime-700">
                    <FileText className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-slate-800">
                      {resume.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {(resume.size / (1024 * 1024)).toFixed(2)} MB
                    </span>
                  </span>
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  No resume attached.
                </p>
              )}
            </section>

            {documentGroups.map((group) => {
              const Icon = group.icon
              return (
                <section
                  key={group.title}
                  className="overflow-hidden rounded-3xl border border-white/80 bg-[#f6faef] shadow-lg shadow-lime-950/5"
                >
                  <div className="flex items-start gap-3 border-b border-lime-100/80 bg-gradient-to-r from-white via-lime-50/50 to-green-50/30 px-5 py-5 sm:px-7">
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
                      const uploadedFile = documents[document.id]
                      return (
                        <li
                          key={document.id}
                          className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 p-3"
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              uploadedFile
                                ? "bg-lime-50 text-lime-700"
                                : "bg-slate-100 text-slate-400"
                            }`}
                          >
                            {uploadedFile ? (
                              <Check className="h-4 w-4" />
                            ) : (
                              <FileText className="h-4 w-4" />
                            )}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold text-slate-800">
                              {document.label}
                            </span>
                            {uploadedFile ? (
                              <span className="mt-0.5 block truncate text-xs text-slate-500">
                                {uploadedFile.name} ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â·{" "}
                                {(
                                  uploadedFile.size /
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

            <div className="flex flex-col-reverse justify-end gap-3 rounded-2xl border border-white/80 bg-[#f6faef] p-4 shadow-lg shadow-lime-950/5 sm:flex-row sm:px-6">
              <button
                type="button"
                onClick={() => setStep("editing")}
                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-200 bg-[#f6faef] px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to edit
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-lime-600 px-5 text-sm font-semibold text-slate-950 shadow-sm shadow-lime-200 transition hover:bg-lime-400 hover:text-green-950 focus-visible:ring-4 focus-visible:ring-lime-200 focus-visible:outline-none"
              >
                {recordId ? "Save candidate changes" : "Confirm candidate"}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : null}

        {step === "submitted" ? (
          <motion.section
            initial={{ opacity: 0, scale: 0.97, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            role="status"
            className="mx-auto flex max-w-2xl flex-col items-center rounded-3xl border border-lime-100/80 bg-gradient-to-br from-white via-lime-50/60 to-green-50/70 px-6 py-12 text-center shadow-xl shadow-lime-950/10 sm:px-12 sm:py-16"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full bg-lime-50 text-lime-700 ring-8 ring-lime-50/60">
              <BadgeCheck className="h-11 w-11" />
            </span>
            <p className="mt-7 text-xs font-bold tracking-[0.16em] text-lime-700 uppercase">
              Review complete
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-900">
              Candidate details confirmed
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
              Your candidate details and documents have been successfullys submitted.
            
            </p>
          </motion.section>
        ) : null}
      </main>
    </MotionConfig>
  )
}
