import DigitalOnboarding from "@/components/featuress/Onboarding/digitalonboarding/page"; // Import the DigitalOnboarding component
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Onboarding - HRMS Portal",
  description: "Streamline your employee onboarding process with our digital solution.",
};

export default function Page() {
  return <DigitalOnboarding />;
}
