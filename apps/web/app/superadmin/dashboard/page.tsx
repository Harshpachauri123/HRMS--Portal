
import DashboardPage from "@/components/superadmin/dashboard/page";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Super Admin Dashboard - HRMS Portal",
  description:
    "View company registration, onboarding, and operational metrics.",
};

export default function Page() {
  return <DashboardPage />;
}
