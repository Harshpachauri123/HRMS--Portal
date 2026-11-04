import OffboardingPage from "@/components/featuress/core-hr/offboarding/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offboarding - HRMS Portal",
  description:
    "Manage employee exits with a clear, connected offboarding workflow.",
};

export default function Page() {
  return <OffboardingPage />;
}
