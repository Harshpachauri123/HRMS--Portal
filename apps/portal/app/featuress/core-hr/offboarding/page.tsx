import OffboardingPage from "@/components/featuress/core-hr/offboarding/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Offboarding - HRMS Portal",
  description: "Manage your employee offboarding process efficiently with our comprehensive offboarding solution.",
};

export default function Page() {
  return <OffboardingPage />;
}
