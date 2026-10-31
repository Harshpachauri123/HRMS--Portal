import type { Metadata } from "next";
import CompanyOnboarding from "../../../components/superadmin/onboardingcompany/page";


export const metadata: Metadata = {
  title: "Company Onboarding - HRMS Portal",
  description: "View and manage employee attendance records and punch activity.",
};

export default function Page() {
  return <CompanyOnboarding />;
}
