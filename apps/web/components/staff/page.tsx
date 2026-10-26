"use client"

import Link from "next/link"
import { AnimatePresence, MotionConfig, motion } from "motion/react"
import { createProfilePdf } from "@/lib/profile-pdf"
import { toast } from "@workspace/ui/components/toast"
import { useEffect, useMemo, useState } from "react"
import {
  ArrowUpRight,
  Download,
  Eye,
  FileText,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
} from "lucide-react"
import {
  deleteStaffRecord,
  saveStaffRecord,
  useDeletedStaffDemoIds,
  useStaffRecords,
  type FormRecord,
} from "@/lib/session-records"

type Employee = {
  id: number | string
  isSubmitted?: boolean
  avatar: string
  color: string
  empId: string
  name: string
  fatherName: string
  phone: string
  email: string
  dept: string
  designation: string
  manager: string
  date: string
  employmentType: string
  status: string
  documents: string[]
  formDetails?: FormRecord
}

const demoEmployees: Employee[] = [
  {
    id: 1,
    avatar: "AM",
    color: "bg-blue-600",
    empId: "PF-1001",
    name: "Aarav Mehta",
    fatherName: "Rajesh Mehta",
    phone: "DEMO-1001",
    email: "aarav.mehta@peopleflow.co",
    dept: "IT",
    designation: "Senior Frontend Engineer",
    manager: "Neha Kapoor",
    date: "Apr 11, 2022",
    employmentType: "Full-time",
    status: "Active",
    documents: [],
  },
  {
    id: 2,
    avatar: "IN",
    color: "bg-emerald-600",
    empId: "PF-1002",
    name: "Isha Nair",
    fatherName: "Suresh Nair",
    phone: "DEMO-1002",
    email: "isha.nair@peopleflow.co",
    dept: "HR",
    designation: "People Operations Lead",
    manager: "Divyanshi Rao",
    date: "Aug 23, 2021",
    employmentType: "Full-time",
    status: "Active",
    documents: [],
  },
  {
    id: 3,
    avatar: "KS",
    color: "bg-amber-600",
    empId: "PF-1003",
    name: "Kabir Sharma",
    fatherName: "Amit Sharma",
    phone: "DEMO-1003",
    email: "kabir.sharma@peopleflow.co",
    dept: "Sales",
    designation: "Enterprise Account Executive",
    manager: "Rohan Sethi",
    date: "Jan 9, 2023",
    employmentType: "Full-time",
    status: "On Leave",
    documents: [],
  },
  {
    id: 4,
    avatar: "MI",
    color: "bg-purple-600",
    empId: "PF-1004",
    name: "Meera Iyer",
    fatherName: "Ravi Iyer",
    phone: "DEMO-1004",
    email: "meera.iyer@peopleflow.co",
    dept: "Finance",
    designation: "Payroll Specialist",
    manager: "Ankit Jain",
    date: "Nov 16, 2020",
    employmentType: "Full-time",
    status: "Active",
    documents: [],
  },
  {
    id: 5,
    avatar: "RS",
    color: "bg-rose-600",
    empId: "PF-1005",
    name: "Riya Sen",
    fatherName: "Sanjay Sen",
    phone: "DEMO-1005",
    email: "riya.sen@peopleflow.co",
    dept: "Marketing",
    designation: "Growth Marketing Manager",
    manager: "Simran Gill",
    date: "Jun 2, 2022",
    employmentType: "Full-time",
    status: "Active",
    documents: [],
  },
  {
    id: 6,
    avatar: "VK",
    color: "bg-cyan-600",
    empId: "PF-1006",
    name: "Vihaan Kapoor",
    fatherName: "Nitin Kapoor",
    phone: "DEMO-1006",
    email: "vihaan.kapoor@peopleflow.co",
    dept: "IT",
    designation: "Backend Engineer",
    manager: "Neha Kapoor",
    date: "Feb 14, 2023",
    employmentType: "Full-time",
    status: "Active",
    documents: [],
  },
  {
    id: 7,
    avatar: "AD",
    color: "bg-orange-600",
    empId: "PF-1007",
    name: "Ananya Das",
    fatherName: "Pranab Das",
    phone: "DEMO-1007",
    email: "ananya.das@peopleflow.co",
    dept: "HR",
    designation: "Talent Acquisition Partner",
    manager: "Divyanshi Rao",
    date: "Sep 5, 2022",
    employmentType: "Full-time",
    status: "Active",
    documents: [],
  },
  {
    id: 8,
    avatar: "RM",
    color: "bg-fuchsia-600",
    empId: "PF-1008",
    name: "Reyansh Malhotra",
    fatherName: "Karan Malhotra",
    phone: "DEMO-1008",
    email: "reyansh.malhotra@peopleflow.co",
    dept: "Sales",
    designation: "Regional Sales Executive",
    manager: "Rohan Sethi",
    date: "Mar 20, 2021",
    employmentType: "Full-time",
    status: "On Leave",
    documents: [],
  },
  {
    id: 9,
    avatar: "SG",
    color: "bg-teal-600",
    empId: "PF-1009",
    name: "Sara George",
    fatherName: "Thomas George",
    phone: "DEMO-1009",
    email: "sara.george@peopleflow.co",
    dept: "Finance",
    designation: "Financial Analyst",
    manager: "Ankit Jain",
    date: "Dec 1, 2022",
    employmentType: "Full-time",
    status: "Active",
    documents: [],
  },
  {
    id: 10,
    avatar: "AP",
    color: "bg-violet-600",
    empId: "PF-1010",
    name: "Arjun Patel",
    fatherName: "Mahesh Patel",
    phone: "DEMO-1010",
    email: "arjun.patel@peopleflow.co",
    dept: "Marketing",
    designation: "Content Strategist",
    manager: "Simran Gill",
    date: "May 8, 2023",
    employmentType: "Full-time",
    status: "Active",
    documents: [],
  },
]

const employeeCardThemes = [
  {
    card: "border-indigo-200/80 bg-gradient-to-br from-white via-indigo-50 to-blue-100/90 hover:border-indigo-300 hover:shadow-indigo-900/15",
    glow: "from-indigo-300/50",
    button:
      "border-indigo-200 bg-indigo-50/80 text-indigo-700 hover:border-indigo-300 hover:bg-white",
    divider: "border-indigo-200/70",
    department: "text-indigo-900",
  },
  {
    card: "border-emerald-200/80 bg-gradient-to-br from-white via-emerald-50 to-teal-100/90 hover:border-emerald-300 hover:shadow-emerald-900/15",
    glow: "from-emerald-300/50",
    button:
      "border-emerald-200 bg-emerald-50/80 text-emerald-800 hover:border-emerald-300 hover:bg-white",
    divider: "border-emerald-200/70",
    department: "text-emerald-950",
  },
  {
    card: "border-amber-200/80 bg-gradient-to-br from-white via-amber-50 to-orange-100/90 hover:border-amber-300 hover:shadow-amber-900/15",
    glow: "from-amber-300/50",
    button:
      "border-amber-200 bg-amber-50/80 text-amber-800 hover:border-amber-300 hover:bg-white",
    divider: "border-amber-200/70",
    department: "text-amber-950",
  },
  {
    card: "border-violet-200/80 bg-gradient-to-br from-white via-violet-50 to-fuchsia-100/90 hover:border-violet-300 hover:shadow-violet-900/15",
    glow: "from-violet-300/50",
    button:
      "border-violet-200 bg-violet-50/80 text-violet-800 hover:border-violet-300 hover:bg-white",
    divider: "border-violet-200/70",
    department: "text-violet-950",
  },
] as const

function staffDetailsFromEmployee(employee: Employee): FormRecord {
  const [firstname = "", ...lastName] = employee.name.split(/\s+/)
  return {
    firstname,
    lastname: lastName.join(" "),
    employeeId: employee.empId,
    fatherName: employee.fatherName,
    contactNumber: employee.phone,
    email: employee.email,
    maritalStatus: "",
    nationality: "",
    qualification: "",
    dateofbirth: "",
    permanentAddress: "",
    department: employee.dept,
    designation: employee.designation,
    employeeType: employee.employmentType,
    joiningDate: "",
    aadharNo: "",
    panNo: "",
    accountNo: "",
    ifscCode: "",
    branchName: "",
  }
}

async function createEmployeePdf(employee: Employee) {
  const details = employee.formDetails ?? staffDetailsFromEmployee(employee)
  const value = (key: string, fallback = "") => details[key as keyof typeof details] ?? fallback
  return createProfilePdf({
    title: "Employee profile",
    name: employee.name,
    id: employee.empId,
    documentTitle: "Uploaded documents",
    documents: employee.documents,
    sections: [
      { title: "Personal & contact details", fields: [
        ["First name", value("firstname", employee.name.split(/\s+/)[0] ?? "")], ["Last name", value("lastname", employee.name.split(/\s+/).slice(1).join(" "))],
        ["Employee ID", value("employeeId", employee.empId)], ["Father's name", value("fatherName", employee.fatherName)],
        ["Contact number", value("contactNumber", employee.phone)], ["Email address", value("email", employee.email)],
        ["Marital status", value("maritalStatus")], ["Nationality", value("nationality")], ["Highest qualification", value("qualification")],
        ["Date of birth", value("dateofbirth")], ["Permanent address", value("permanentAddress")],
      ] },
      { title: "Role & employment details", fields: [
        ["Department", value("department", employee.dept)], ["Designation", value("designation", employee.designation)],
        ["Employee type", value("employeeType", employee.employmentType)], ["Joining date", value("joiningDate", employee.date)],
        ["Manager", employee.manager], ["Status", employee.status],
      ] },
      { title: "Identity & statutory details", fields: [["Aadhaar number", value("aadharNo")], ["PAN card number", value("panNo")]] },
      { title: "Bank account details", fields: [["Bank account number", value("accountNo")], ["IFSC code", value("ifscCode")], ["Branch name", value("branchName")]] },
    ],
  })
}

export default function StaffPage() {
  const submittedRecords = useStaffRecords()
  const deletedDemoIds = useDeletedStaffDemoIds()
  const [searchTerm, setSearchTerm] = useState("")
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

  const employees = useMemo<Employee[]>(
    () => [
      ...submittedRecords.map((record) => {
        const details = record.details
        const demoId = record.id.startsWith("demo-staff-")
          ? Number(record.id.slice("demo-staff-".length))
          : null
        const original = demoId
          ? demoEmployees.find((employee) => employee.id === demoId)
          : undefined
        const name =
          [details.firstname, details.lastname].filter(Boolean).join(" ") ||
          original?.name ||
          "New employee"
        return {
          id: record.id,
          isSubmitted: true,
          avatar: name
            .split(/\s+/)
            .slice(0, 2)
            .map((part) => part[0] ?? "")
            .join("")
            .toUpperCase(),
          color: "bg-emerald-600",
          empId: details.employeeId || original?.empId || record.id,
          name,
          fatherName: details.fatherName || original?.fatherName || "",
          phone: details.contactNumber || original?.phone || "",
          email: details.email || original?.email || "",
          dept: details.department || original?.dept || "",
          designation: details.designation || original?.designation || "",
          manager: original?.manager || "",
          date: details.joiningDate || original?.date || "",
          employmentType:
            details.employeeType || original?.employmentType || "",
          status: original?.status || "Active",
          documents: record.documents,
          formDetails: details,
        }
      }),
      ...demoEmployees.filter(
        (employee) =>
          !deletedDemoIds.has(`demo-staff-${employee.id}`) &&
          !submittedRecords.some(
            (record) => record.id === `demo-staff-${employee.id}`
          )
      ),
    ],
    [deletedDemoIds, submittedRecords]
  )

  function openEmployeeEditor(employee: Employee) {
    if (!employee.isSubmitted) {
      saveStaffRecord(
        staffDetailsFromEmployee(employee),
        employee.documents,
        `demo-staff-${employee.id}`
      )
    }
  }

  const filteredEmployees = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return employees
    return employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(query) ||
        employee.phone.toLowerCase().includes(query)
    )
  }, [employees, searchTerm])

  async function handleDownload(employee: Employee) {
    setDownloadingId(employee.id)
    setDownloadError("")
    try {
      const blob = await createEmployeePdf(employee)
      const url = URL.createObjectURL(blob)
      const anchor = document.createElement("a")
      anchor.href = url
      anchor.download = `${employee.empId}-${employee.name.replaceAll(" ", "-")}.pdf`
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      window.setTimeout(() => URL.revokeObjectURL(url), 1000)
      toast.add({
        title: "Employee profile downloaded",
        description: `${employee.name}'s profile PDF is ready.`,
        type: "success",
      })
    } catch {
      setDownloadError(
        `Could not create the PDF for ${employee.name}. Please try again.`
      )
    } finally {
      setDownloadingId(null)
    }
  }

  async function handleViewPdf(employee: Employee) {
    setPreviewingId(employee.id)
    setDownloadError("")
    try {
      const blob = await createEmployeePdf(employee)
      const url = URL.createObjectURL(blob)
      setPdfPreview({
        url,
        title: `${employee.name} · Employee profile`,
        filename: `${employee.empId}-${employee.name.replaceAll(" ", "-")}.pdf`,
      })
      toast.add({
        title: "Employee profile opened",
        description: `${employee.name}'s PDF preview is ready.`,
        type: "success",
      })
    } catch {
      setDownloadError(
        `Could not create the PDF for ${employee.name}. Please try again.`
      )
    } finally {
      setPreviewingId(null)
    }
  }

  const activeCount = employees.filter(
    (employee) => employee.status === "Active"
  ).length
  const departmentCount = new Set(
    employees.map((employee) => employee.dept)
  ).size

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
                Back to employees
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
      <main className="relative isolate min-h-[calc(100vh-9rem)] space-y-6 overflow-hidden rounded-[30px] bg-gradient-to-br from-slate-100 via-indigo-50/80 to-cyan-50/80 p-4 pb-10 sm:p-6 lg:p-7">
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-indigo-300/25 blur-3xl" />
          <div className="absolute top-[34rem] -left-32 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl" />
          <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl" />
        </div>

        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 px-6 py-7 text-white shadow-xl shadow-indigo-950/15 sm:px-8 sm:py-9"
        >
          <div className="pointer-events-none absolute -top-28 -right-12 h-80 w-80 rounded-full border border-white/10 bg-indigo-400/10 blur-2xl" />
          <div className="pointer-events-none absolute right-1/3 bottom-[-8rem] h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 text-xs font-bold tracking-[0.18em] text-indigo-200 uppercase">
                People operations{" "}
                <span className="px-1 text-indigo-400">/</span> Directory
              </p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Employees
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-6 text-indigo-100/75">
                Search employees by name or contact number and download an
                employee profile.
              </p>
            </div>
            <Link
              href="/addstaff"
              className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 self-start rounded-xl bg-white px-5 text-sm font-bold text-indigo-950 shadow-lg shadow-black/10 transition hover:bg-indigo-50 sm:self-auto"
            >
              <Plus className="h-4 w-4" />
              Add Employee
            </Link>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.4 }}
            whileHover={{ y: -3 }}
            className="relative overflow-hidden rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-200 via-indigo-100 to-blue-200 p-5 shadow-lg shadow-indigo-900/10"
          >
            <div className="pointer-events-none absolute -top-10 -right-8 h-32 w-32 rounded-full bg-indigo-500/20 blur-2xl" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-indigo-950/75">
                Total employees
              </span>
              <span className="rounded-xl bg-indigo-600 p-2 text-white shadow-md shadow-indigo-700/25">
                <Users className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-indigo-950">
              {employees.length}
            </p>
            <p className="mt-2 text-xs font-medium text-indigo-950/65">
              Sample records for the directory preview
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            whileHover={{ y: -3 }}
            className="relative overflow-hidden rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-200 via-emerald-100 to-teal-200 p-5 shadow-lg shadow-emerald-900/10"
          >
            <div className="pointer-events-none absolute -top-10 -right-8 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-emerald-950/75">
                Active staff
              </span>
              <span className="rounded-xl bg-emerald-600 p-2 text-white shadow-md shadow-emerald-700/25">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-emerald-950">
              {activeCount}
            </p>
            <p className="mt-2 text-xs font-medium text-emerald-950/65">
              In the demo directory
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.4 }}
            whileHover={{ y: -3 }}
            className="relative overflow-hidden rounded-2xl border border-violet-200/80 bg-gradient-to-br from-violet-200 via-violet-100 to-fuchsia-200 p-5 shadow-lg shadow-violet-900/10"
          >
            <div className="pointer-events-none absolute -top-10 -right-8 h-32 w-32 rounded-full bg-violet-500/20 blur-2xl" />
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-violet-950/75">
                Departments
              </span>
              <span className="rounded-xl bg-violet-600 p-2 text-white shadow-md shadow-violet-700/25">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-3xl font-bold text-violet-950">
              {departmentCount}
            </p>
            <p className="mt-2 text-xs font-medium text-violet-950/65">
              Across the demo records
            </p>
          </motion.div>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="overflow-hidden rounded-3xl border border-white/80 bg-white/75 shadow-xl shadow-indigo-950/10 backdrop-blur-xl"
        >
          <div className="flex flex-col gap-4 border-b border-indigo-100/80 bg-gradient-to-r from-white/90 via-indigo-50/70 to-cyan-50/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">
                  Employee directory
                </h2>
                <span className="rounded-full border border-amber-200/80 bg-amber-100/80 px-2.5 py-1 text-[11px] font-bold tracking-wide text-amber-800 uppercase">
                  Demo data
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                Employee profiles in a clear, easy-to-scan layout.
              </p>
            </div>
            <label className="relative block w-full sm:max-w-sm">
              <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name or contact number..."
                aria-label="Search employees by name or contact number"
                className="h-11 w-full rounded-xl border border-indigo-100 bg-white/90 pr-3 pl-9 text-sm text-slate-800 shadow-sm transition outline-none placeholder:text-slate-400 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
              />
            </label>
          </div>

          {downloadError ? (
            <p
              role="alert"
              className="mx-5 mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 sm:mx-6"
            >
              {downloadError}
            </p>
          ) : null}

          {filteredEmployees.length ? (
            <div className="bg-gradient-to-br from-indigo-50/35 via-white/45 to-cyan-50/45 p-5 sm:p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <AnimatePresence mode="popLayout">
                  {filteredEmployees.map((employee, index) => {
                    const theme =
                      employeeCardThemes[index % employeeCardThemes.length] ??
                      employeeCardThemes[0]
                    const editId = employee.isSubmitted
                      ? String(employee.id)
                      : `demo-staff-${employee.id}`
                    return (
                      <motion.article
                        key={employee.id}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 12, scale: 0.97 }}
                        transition={{
                          duration: 0.3,
                          delay: Math.min(index * 0.045, 0.36),
                          layout: { duration: 0.25 },
                        }}
                        whileHover={{ y: -7, scale: 1.02 }}
                        className={`group relative flex min-h-[260px] min-w-0 flex-col overflow-hidden rounded-2xl border p-5 shadow-[0_8px_24px_rgba(49,46,129,0.07)] transition-[border-color,box-shadow] duration-300 hover:shadow-xl ${theme.card}`}
                      >
                        <div
                          className={`pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-gradient-to-bl ${theme.glow} to-transparent transition-transform duration-500 group-hover:scale-125`}
                        />
                        <div className="relative mb-4 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => void handleDownload(employee)}
                            disabled={downloadingId === employee.id}
                            aria-label={`Download ${employee.name} employee details as PDF`}
                            className={`inline-flex h-9 min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border bg-white/75 px-2 text-xs font-semibold shadow-sm transition disabled:cursor-wait disabled:opacity-60 ${theme.button}`}
                          >
                            <Download className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">
                              {downloadingId === employee.id
                                ? "Preparing..."
                                : "PDF"}
                            </span>
                          </button>
                          <Link
                            href={`/addstaff?edit=${encodeURIComponent(editId)}`}
                            onClick={() => openEmployeeEditor(employee)}
                            aria-label={`Edit ${employee.name}`}
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-200 bg-white/80 text-indigo-700 shadow-sm transition hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                          <button
                            type="button"
                            onClick={() => void handleViewPdf(employee)}
                            disabled={previewingId === employee.id}
                            aria-label={`Read ${employee.name} PDF`}
                            title={previewingId === employee.id ? "Preparing PDF..." : "Read full PDF"}
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 disabled:cursor-wait disabled:opacity-60"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete ${employee.name}?`)) {
                                deleteStaffRecord(editId)
                                toast.add({
                                  title: "Employee deleted",
                                  description: `${employee.name}'s employee record was removed.`,
                                  type: "success",
                                })
                              }
                            }}
                            aria-label={`Delete ${employee.name}`}
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-rose-200 bg-white/80 text-rose-700 shadow-sm transition hover:bg-rose-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex flex-col items-center text-center">
                          <span
                            className={`flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold text-white ${employee.color}`}
                          >
                            {employee.avatar}
                          </span>
                          <h3
                            className="mt-3 w-full truncate text-base font-bold text-slate-900"
                            title={employee.name}
                          >
                            {employee.name}
                          </h3>
                          <p className="mt-1 text-xs font-medium text-slate-400">
                            {employee.empId}
                          </p>
                        </div>
                        <div
                          className={`mt-4 space-y-2 border-t pt-3 text-center ${theme.divider}`}
                        >
                          <p
                            className={`truncate text-sm font-bold ${theme.department}`}
                            title={employee.dept}
                          >
                            {employee.dept}
                          </p>
                          <p
                            className="truncate text-xs text-slate-500"
                            title={employee.designation}
                          >
                            {employee.designation}
                          </p>
                          <p
                            className="truncate text-xs text-slate-500"
                            title={employee.phone}
                          >
                            {employee.phone}
                          </p>
                        </div>
                        <div className="mt-auto flex items-center justify-center gap-1.5 pt-4">
                          <FileText className="h-4 w-4 text-slate-400" />
                          <span className="text-xs text-slate-500">
                            {employee.documents.length
                              ? `${employee.documents.length} docs`
                              : "No demo docs"}
                          </span>
                        </div>
                      </motion.article>
                    )
                  })}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <Search className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-sm font-bold text-slate-900">
                No employees found
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Try another name or contact number.
              </p>
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
