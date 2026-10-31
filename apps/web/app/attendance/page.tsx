import AttendancePage from "@/components/Hr/attendance/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attendance - HRMS Portal",
  description: "View and manage employee attendance records and punch activity.",
};

export default function Page() {
  return <AttendancePage />;
}
