"use client"

import { useRef, useState, type ChangeEvent } from "react"
import Link from "next/link"

import {
  ArrowLeft,
  BriefcaseBusiness,
  Camera,
  CalendarDays,
  Check,
  GraduationCap,
  Mail,
  MapPin,
  Pencil,
  Phone,
  UserRound,
  X,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { useEmployeePhoto } from "@/components/employee/employee-photo-provider"

type ProfileField = {
  label: string
  value: string
}

const profileSections: {
  title: string
  icon: LucideIcon
  fields: ProfileField[]
  className: string
}[] = [
  {
    title: "Primary details",
    icon: UserRound,
    className: "xl:col-span-2",
    fields: [
      { label: "Full name", value: "Aarav Mehta" },
      { label: "Preferred name", value: "Aarav" },
      { label: "Date of birth", value: "14 August 1994" },
      { label: "Gender", value: "Male" },
      { label: "Marital status", value: "Not provided" },
      { label: "Blood group", value: "Not provided" },
    ],
  },
  {
    title: "Contact details",
    icon: Mail,
    className: "xl:col-span-3",
    fields: [
      { label: "Work email", value: "aarav.mehta@peopleflow.co" },
      { label: "Personal email", value: "Not provided" },
      { label: "Phone number", value: "+91 98765 43210" },
      { label: "Work number", value: "Not provided" },
      { label: "Emergency contact", value: "Not provided" },
      { label: "Emergency contact number", value: "Not provided" },
    ],
  },
  {
    title: "Address & education",
    icon: GraduationCap,
    className: "xl:col-span-2",
    fields: [
      { label: "Current address", value: "Bengaluru, Karnataka" },
      { label: "Permanent address", value: "Not provided" },
      { label: "College", value: "Not provided" },
      { label: "School", value: "Not provided" },
    ],
  },
  {
    title: "Organization",
    icon: BriefcaseBusiness,
    className: "xl:col-span-3",
    fields: [
      { label: "Employee ID", value: "SDV-0248" },
      { label: "Department", value: "Product & Engineering" },
      { label: "Job title", value: "Senior Frontend Engineer" },
      { label: "Employment type", value: "Full time" },
      { label: "Date of joining", value: "11 April 2022" },
      { label: "Location", value: "Bengaluru office" },
      { label: "Reporting manager", value: "Neha Kapoor" },
      { label: "Work schedule", value: "Monday to Friday" },
    ],
  },
]

function prepareProfilePhoto(file: File) {
  return new Promise<string>((resolve, reject) => {
    const imageUrl = URL.createObjectURL(file)
    const image = new Image()

    image.onload = () => {
      try {
        const maxDimension = 512
        const scale = Math.min(
          1,
          maxDimension / image.naturalWidth,
          maxDimension / image.naturalHeight
        )
        const canvas = document.createElement("canvas")
        canvas.width = Math.max(1, Math.round(image.naturalWidth * scale))
        canvas.height = Math.max(1, Math.round(image.naturalHeight * scale))

        const context = canvas.getContext("2d")
        if (!context) throw new Error("Could not prepare this image.")

        context.fillStyle = "#fff4ec"
        context.fillRect(0, 0, canvas.width, canvas.height)
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL("image/jpeg", 0.84))
      } catch (error) {
        reject(error)
      } finally {
        URL.revokeObjectURL(imageUrl)
      }
    }

    image.onerror = () => {
      URL.revokeObjectURL(imageUrl)
      reject(new Error("Could not read that image. Try another one."))
    }
    image.src = imageUrl
  })
}

function ProfileSection({
  title,
  icon: Icon,
  fields,
  className,
  onSave,
}: {
  title: string
  icon: LucideIcon
  fields: ProfileField[]
  className: string
  onSave: (fields: ProfileField[]) => void
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [values, setValues] = useState(fields)
  const [draft, setDraft] = useState(fields)

  function startEditing() {
    setDraft(values)
    setIsEditing(true)
  }

  function cancelEditing() {
    setDraft(values)
    setIsEditing(false)
  }

  function saveChanges() {
    const updatedFields = draft.map((field) => ({
      ...field,
      value: field.value.trim() || "Not provided",
    }))
    setValues(updatedFields)
    onSave(updatedFields)
    setIsEditing(false)
  }

  return (
    <section
      className={`rounded-2xl border border-[#f0cbb6] bg-[#fff4ec] p-5 shadow-sm transition duration-200 hover:border-[#e9a886] hover:shadow-md sm:p-6 ${className}`}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#f0d8ca] pb-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#ffe2d2] text-[#d94d1b]">
            <Icon className="h-4 w-4" aria-hidden="true" />
          </span>
          <h2 className="text-base font-bold text-slate-900">{title}</h2>
        </div>
        <button
          type="button"
          onClick={isEditing ? cancelEditing : startEditing}
          aria-label={`${isEditing ? "Cancel editing" : "Edit"} ${title}`}
          className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full border border-[#f0c8b1] bg-[#fffaf6] px-3 text-xs font-semibold text-[#a63e18] transition-colors hover:border-[#e9a886] hover:bg-[#ffede1] focus-visible:ring-2 focus-visible:ring-[#eb5b25] focus-visible:outline-none"
        >
          {isEditing ? (
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          ) : (
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
          )}
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>
      <dl className="grid gap-x-6 gap-y-5 pt-5 sm:grid-cols-2">
        {values.map(({ label, value }, index) => (
          <div key={label} className="min-w-0">
            <dt className="text-xs font-medium text-slate-500">{label}</dt>
            {isEditing ? (
              <input
                type="text"
                aria-label={label}
                value={
                  draft[index]?.value === "Not provided"
                    ? ""
                    : draft[index]?.value
                }
                placeholder="Not provided"
                onChange={(event) =>
                  setDraft((current) =>
                    current.map((field, fieldIndex) =>
                      fieldIndex === index
                        ? { ...field, value: event.target.value }
                        : field
                    )
                  )
                }
                className="mt-1 min-h-10 w-full rounded-lg border border-[#efc6ad] bg-white px-3 text-sm font-medium text-slate-800 transition outline-none focus:border-[#eb5b25] focus:ring-2 focus:ring-[#eb5b25]/20"
              />
            ) : (
              <dd className="mt-1 text-sm font-semibold break-words text-slate-800">
                {value}
              </dd>
            )}
          </div>
        ))}
      </dl>
      {isEditing && (
        <div className="mt-5 flex justify-end border-t border-[#f0d8ca] pt-4">
          <button
            type="button"
            onClick={saveChanges}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#eb5b25] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#d94d1b] focus-visible:ring-2 focus-visible:ring-[#eb5b25] focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            <Check className="h-4 w-4" aria-hidden="true" />
            Save changes
          </button>
        </div>
      )}
    </section>
  )
}

export default function EmployeeProfilePage() {
  const photoInputRef = useRef<HTMLInputElement>(null)
  const [sections, setSections] = useState(profileSections)
  const { photoUrl, setPhotoUrl } = useEmployeePhoto()
  const [photoError, setPhotoError] = useState<string | null>(null)

  function getProfileValue(sectionTitle: string, fieldLabel: string) {
    return (
      sections
        .find((section) => section.title === sectionTitle)
        ?.fields.find((field) => field.label === fieldLabel)?.value ??
      "Not provided"
    )
  }

  const workEmail = getProfileValue("Contact details", "Work email")
  const phoneNumber = getProfileValue("Contact details", "Phone number")
  const employeeId = getProfileValue("Organization", "Employee ID")
  const currentAddress = getProfileValue(
    "Address & education",
    "Current address"
  )

  function saveProfileSection(title: string, fields: ProfileField[]) {
    setSections((current) =>
      current.map((section) =>
        section.title === title ? { ...section, fields } : section
      )
    )
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const photo = event.target.files?.[0]
    if (!photo) return

    if (!photo.type.startsWith("image/")) {
      setPhotoError("Choose an image file.")
      event.target.value = ""
      return
    }

    if (photo.size > 5 * 1024 * 1024) {
      setPhotoError("Choose an image smaller than 5 MB.")
      event.target.value = ""
      return
    }

    setPhotoError(null)
    void prepareProfilePhoto(photo)
      .then(setPhotoUrl)
      .catch(() => setPhotoError("Could not load that image. Try another one."))
  }

  return (
    <div className="mx-auto max-w-[1600px] space-y-6 rounded-[28px] bg-[#fce9df] p-3 pb-8 sm:p-5 lg:p-6">
      <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/employee/dashboard"
            className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-[#c74617] focus-visible:ring-2 focus-visible:ring-[#eb5b25] focus-visible:outline-none"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
            My profile
          </h1>
          <p className="mt-1 text-sm text-slate-600">
            Your personal and employment details in one place.
          </p>
        </div>
        <span className="inline-flex min-h-9 w-fit items-center gap-2 rounded-full bg-[#e5f1da] px-3 text-xs font-semibold text-green-900">
          <span
            className="h-2 w-2 rounded-full bg-green-700"
            aria-hidden="true"
          />
          Active employee
        </span>
      </header>

      <section className="overflow-hidden rounded-2xl border border-[#f0cbb6] bg-[#fff4ec] shadow-sm">
        <div className="px-5 pt-5 pb-5 sm:px-7 sm:pt-6 sm:pb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex min-w-0 items-end gap-4">
              {photoUrl ? (
                <div className="flex max-h-36 max-w-32 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-[#fff4ec] bg-[#fff4ec] shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photoUrl}
                    alt="Aarav Mehta profile photo"
                    className="block max-h-32 max-w-28 rounded-xl object-contain"
                  />
                </div>
              ) : (
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-[#fff4ec] bg-[#eb5b25] text-2xl font-bold text-white shadow-md sm:h-24 sm:w-24">
                  AM
                </div>
              )}
              <div className="min-w-0 pb-1">
                <h2 className="truncate text-xl font-bold text-slate-950 sm:text-2xl">
                  Aarav Mehta
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Senior Frontend Engineer · Product &amp; Engineering
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:pb-2">
              <input
                ref={photoInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                aria-label="Choose a profile photo"
                onChange={handlePhotoChange}
              />
              <button
                type="button"
                onClick={() => photoInputRef.current?.click()}
                className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-[#efc6ad] bg-[#fffaf6] px-3 text-sm font-semibold text-[#a63e18] transition-colors hover:border-[#e9a886] hover:bg-[#ffede1] focus-visible:ring-2 focus-visible:ring-[#eb5b25] focus-visible:outline-none"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                {photoUrl ? "Edit photo" : "Add photo"}
              </button>
              <span className="inline-flex items-center gap-2 text-xs font-medium text-slate-500">
                <BriefcaseBusiness
                  className="h-4 w-4 text-[#d94d1b]"
                  aria-hidden="true"
                />
                Employee ID: {employeeId}
              </span>
            </div>
          </div>

          {photoError && (
            <p className="mt-3 text-sm font-medium text-red-700" role="alert">
              {photoError}
            </p>
          )}

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 border-t border-[#f0d8ca] pt-4 text-sm text-slate-700">
            {workEmail === "Not provided" ? (
              <span className="inline-flex min-h-8 items-center gap-2">
                <Mail className="h-4 w-4 text-[#d94d1b]" aria-hidden="true" />
                {workEmail}
              </span>
            ) : (
              <a
                href={`mailto:${workEmail}`}
                className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-[#c74617] focus-visible:ring-2 focus-visible:ring-[#eb5b25] focus-visible:outline-none"
              >
                <Mail className="h-4 w-4 text-[#d94d1b]" aria-hidden="true" />
                {workEmail}
              </a>
            )}
            {phoneNumber === "Not provided" ? (
              <span className="inline-flex min-h-8 items-center gap-2">
                <Phone className="h-4 w-4 text-green-700" aria-hidden="true" />
                {phoneNumber}
              </span>
            ) : (
              <a
                href={`tel:${phoneNumber.replace(/[^\d+]/g, "")}`}
                className="inline-flex min-h-8 items-center gap-2 transition-colors hover:text-[#c74617] focus-visible:ring-2 focus-visible:ring-[#eb5b25] focus-visible:outline-none"
              >
                <Phone className="h-4 w-4 text-green-700" aria-hidden="true" />
                {phoneNumber}
              </a>
            )}
            <span className="inline-flex min-h-8 items-center gap-2">
              <MapPin className="h-4 w-4 text-[#d94d1b]" aria-hidden="true" />
              {currentAddress}
            </span>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-5">
        {sections.map((section) => (
          <ProfileSection
            key={section.title}
            {...section}
            onSave={(fields) => saveProfileSection(section.title, fields)}
          />
        ))}
      </div>

      <aside className="flex items-start gap-3 rounded-2xl border border-[#efc6ad] bg-[#fff1e7] p-4 text-sm text-slate-700">
        <CalendarDays
          className="mt-0.5 h-4 w-4 shrink-0 text-[#d94d1b]"
          aria-hidden="true"
        />
        <p>
          Need to update your personal or employment details? Contact your HR
          team to request a change.
        </p>
      </aside>
    </div>
  )
}
