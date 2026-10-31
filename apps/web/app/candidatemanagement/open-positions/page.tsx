import CandidatesPage from "@/components/Hr/candidatemanagement/candidates/page"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Open Positions - HRMS Portal",
  description:
    "View and manage all open job positions and recruitment requirements.",
}

export default function Page() {
  return <CandidatesPage />
}

