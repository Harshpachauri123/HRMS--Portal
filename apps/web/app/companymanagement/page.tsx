import type { Metadata } from "next";
import CompanyOnboarding from "@/components/attendance/page";


export const metadata: Metadata = {
  title: "Company Management - HRMS Portal",
  description: "View and manage employee attendance records and punch activity.",
};

export default function Page() {
  return <CompanyOnboarding />;
}
