import StaffPage from "@/components/Hr/staff/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Management - HRMS Portal",
  description:
    "A responsive municipal admin dashboard for survey, tax, cash desk, and transaction operations.",
};

export default function Page() {
  return <StaffPage />;
}
