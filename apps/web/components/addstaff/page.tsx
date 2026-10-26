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
import {
  saveStaffRecord,
  useStaffRecords,
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

type StaffDetails = {
  // 1. Personal & Contact
  firstname: string
  lastname: string
  employeeId: string
  fatherName: string
  contactNumber: string
  email: string
  maritalStatus: string
  nationality: string
  qualification: string
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
}

type FormFieldConfig = {
  name: keyof StaffDetails
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
        name: "employeeId",
        label: "Employee ID",
        type: "text",
        placeholder: "e.g. SDV-001, SDV-002, etc.",
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
        placeholder: "employee@company.com",
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
        placeholder: "HR Manager, Software Engineer, Sales Associate, etc.",
      },
      {
        name: "employeeType",
        label: "Employee type",
        type: "text",
        placeholder: "Full-time, Part-time, Contract, Internship",
      },
      {
        name: "joiningDate",
        label: "Joining date",
        type: "date",
        placeholder: "",
      },
    ],
  },
  {
    title: "3. Identity & Statutory (KYC)",
    fields: [
      {
        name: "aadharNo",
        label: "Aadhaar number",
        type: "text",
        inputMode: "numeric",
        placeholder: "12-digit Aadhaar number",
        maxLength: 14,
        helperText: "12-digit UIDAI identity number.",
      },
      {
        name: "panNo",
        label: "PAN card number",
        type: "text",
        placeholder: "10-character PAN (e.g. ABCDE1234F)",
        maxLength: 10,
        helperText: "Permanent Account Number.",
      },
    ],
  },
  {
    title: "4. Bank Account Details",
    fields: [
      {
        name: "accountNo",
        label: "Bank account number",
        type: "text",
        placeholder: "Enter salary bank account number",
        maxLength: 20,
      },
      {
        name: "ifscCode",
        label: "IFSC code",
        type: "text",
        placeholder: "e.g. SBIN0001234",
        maxLength: 11,
        helperText: "11-character bank branch IFSC code.",
      },
      {
        name: "branchName",
        label: "Branch name",
        type: "text",
        placeholder: "Bank branch name & city",
        colSpan: true,
      },
    ],
  },
]

function readDetails(formData: FormData): StaffDetails {
  return {
    firstname: String(formData.get("firstname") ?? "").trim(),
    lastname: String(formData.get("lastname") ?? "").trim(),
    employeeId: String(formData.get("employeeId") ?? "").trim(),
    fatherName: String(formData.get("fatherName") ?? "").trim(),
    contactNumber: String(formData.get("contactNumber") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    maritalStatus: String(formData.get("maritalStatus") ?? "").trim(),
    nationality: String(formData.get("nationality") ?? "").trim(),
    qualification: String(formData.get("qualification") ?? "").trim(),
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
              <FileText className="h-5 w-5 text-indigo-700" />
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
  const staffRecords = useStaffRecords()
  const [recordId, setRecordId] = useState<string | null>(null)
  const [formReady, setFormReady] = useState(false)
  const [step, setStep] = useState<"editing" | "review" | "submitted">(
    "editing"
  )
  const [details, setDetails] = useState<StaffDetails | null>(null)
  const [documents, setDocuments] = useState<Record<string, File>>({})
  const editingRecord = staffRecords.find((record) => record.id === recordId)

  useEffect(() => {
    setRecordId(new URLSearchParams(window.location.search).get("edit"))
    setFormReady(true)
  }, [])

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
      title: "Employee details ready to review",
      description: "Check the information before confirming.",
      type: "success",
    })
  }

  function handleConfirm() {
    if (!details) return
    const documentNames = [
      ...new Set([
        ...(editingRecord?.documents ?? []),
        ...Object.values(documents).map((file) => file.name),
      ]),
    ]
    saveStaffRecord({ ...details }, documentNames, recordId ?? undefined)
    setStep("submitted")
    toast.add({
      title: "Employee details saved",
      description: "The employee profile has been saved for this session.",
      type: "success",
    })
  }

  if (recordId && formReady && !editingRecord) {
    return (
      <main className="mx-auto max-w-2xl rounded-3xl border border-amber-200 bg-amber-50 p-6 text-center">
        <h1 className="text-lg font-bold text-slate-900">Employee record unavailable</h1>
        <p className="mt-2 text-sm text-slate-600">
          This demo record is held only for the current session. Return to the employee list and try again.
        </p>
        <Link href="/staff" className="mt-4 inline-flex font-semibold text-indigo-700 hover:underline">
          Back to employees
        </Link>
      </main>
    )
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
                  ? recordId
                    ? "Edit employee details"
                    : "Add a new employee"
                  : step === "review"
                    ? "Review employee details"
                    : "Submission complete"}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-indigo-100/75">
                {step === "editing"
                  ? "Enter their personal details, KYC, bank information and attach the documents needed to complete their employee profile."
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
          <form key={recordId ?? "new-employee"} onSubmit={handleReview} className="space-y-6">
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
                    Basic details, KYC, and bank information for employee records.
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
                      <span className="h-2 w-2 rounded-full bg-indigo-600" />
                      <h3 className="text-xs font-bold tracking-wider text-indigo-900 uppercase">
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
                            htmlFor={`staff-${field.name}`}
                            className="mb-2 block text-sm font-semibold text-slate-700"
                          >
                            {field.label}{" "}
                            <span className="text-rose-500">*</span>
                          </label>
                          {field.options ? (
                            <select
                              id={`staff-${field.name}`}
                              name={field.name}
                              required={
                                !editingRecord ||
                                Boolean(editingRecord.details[field.name])
                              }
                              defaultValue={editingRecord?.details[field.name] ?? ""}
                              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 transition outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
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
                            id={`staff-${field.name}`}
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
                            defaultValue={editingRecord?.details[field.name] ?? ""}
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 transition outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
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

            <motion.div
              whileHover={{ y: -2 }}
              className="flex flex-col-reverse gap-3 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-lg shadow-indigo-950/5 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:px-6"
            >
              <p className="text-xs text-slate-500">
                Fields marked <span className="font-bold text-rose-500">*</span>{" "}
                are required. Documents are optional.
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
                    detail: "Personal, KYC & bank details",
                    icon: UserRound,
                  },
                  {
                    title: "Identity & bank docs",
                    detail: "Aadhaar, PAN and passbook",
                    icon: Landmark,
                  },
                  {
                    title: "Education certificates",
                    detail: "School and degree marksheets",
                    icon: GraduationCap,
                  },
                ].map((item, index) => {
                  const Icon = item.icon
                  return (
                    <li key={item.title} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-indigo-700">
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
                Files stay in this form and are not persisted.
              </div>
            </section>

            <div className="flex items-start gap-2 px-1 text-xs leading-5 text-slate-500">
              <FileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
              Supported formats: JPG, PNG, WebP, PDF. Maximum file size: 10 MB
              each.
            </div>
          </motion.aside>
        </motion.div>

        {step === "review" && details ? (
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
                    Employee information
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Review all employee details before submitting.
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
                      <span className="h-2 w-2 rounded-full bg-indigo-600" />
                      <h3 className="text-xs font-bold tracking-wider text-indigo-900 uppercase">
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
                            {details[field.name] || "—"}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
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
                      const uploadedFile = documents[document.id]
                      return (
                        <li
                          key={document.id}
                          className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 p-3"
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              uploadedFile
                                ? "bg-emerald-50 text-emerald-700"
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
                                {uploadedFile.name} ·{" "}
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
                onClick={handleConfirm}
                className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition hover:bg-indigo-700 focus-visible:ring-4 focus-visible:ring-indigo-200 focus-visible:outline-none"
              >
                {recordId ? "Save employee changes" : "Submit Staff form"}
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
              {recordId
                ? "The employee profile has been updated for this session."
                : "The employee profile has been added for this session."}
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
