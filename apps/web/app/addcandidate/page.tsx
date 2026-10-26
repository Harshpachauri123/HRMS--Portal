import AddCandidatePage from "@/components/candidatemanagement/addcandidate/page"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Add Candidate - HRMS Portal",
  description: "Add a candidate profile and attach documents and resume.",
}

export default function Page() {
  return <AddCandidatePage />
}
