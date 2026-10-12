import type { Metadata } from "next"
import AddStaffPage from "@/components/addstaff/page"

export const metadata: Metadata = {
  title: "Add Staff - HRMS Portal",
  description: "Create a staff profile and attach onboarding documents.",
}

export default function Page() {
  return <AddStaffPage />
}
