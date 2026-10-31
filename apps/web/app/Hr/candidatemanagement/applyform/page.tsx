import CopyLinkPage from "@/components/Hr/candidatemanagement/applyform/page"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Apply Form - HRMS Portal",
  description:
    "Generate shareable application links for open positions to share with candidates.",
}

export default function Page() {
  return <CopyLinkPage />
}

