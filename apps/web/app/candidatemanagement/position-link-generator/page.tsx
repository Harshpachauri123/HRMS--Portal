import CopyLinkPage from "@/components/candidatemanagement/position-link-generator/page"

import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Position Link Generator - HRMS Portal",
  description:
    "Generate shareable application links for open positions to share with candidates.",
}

export default function Page() {
  return <CopyLinkPage />
}

