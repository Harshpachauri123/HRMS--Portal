import type { Metadata } from "next"
import AddCandidatePage from "@/components/addcandidate/page"

export const metadata: Metadata = {
  title: "Add Candidate - HRMS Portal",
  description: "Add a candidate profile and attach documents and resume.",
}

export default function Page() {
  return <AddCandidatePage />
}
