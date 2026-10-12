import CandidatePage from "@/components/candidates/page"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Candidate Pipeline - HRMS Portal",
  description:
    "Review candidate applications, track hiring stages, and manage your recruitment pipeline.",
}

export default function Page() {
  return <CandidatePage />
}
