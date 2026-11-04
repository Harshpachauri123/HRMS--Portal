import Pricing from "@/components/pricing/page"; // Import the DigitalOnboarding component
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing - HRMS Portal",
  description: "View our pricing plans and find the perfect solution for your organization.",
};

export default function Page() {
  return <Pricing />;
}
