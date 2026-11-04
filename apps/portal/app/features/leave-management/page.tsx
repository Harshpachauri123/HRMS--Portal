import LeaveManagementPage from "@/components/featuress/core-hr/Lmanagement/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leave Management - HRMS Portal",
  description:
    "Manage leave policies, requests, approvals, and balances in one place.",
};

export default function Page() {
  return <LeaveManagementPage />;
}
