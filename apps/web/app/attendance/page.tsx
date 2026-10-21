import type { Metadata } from "next";
import AttendancePage from "@/components/attendance/page";

export const metadata: Metadata = {
  title: "Attendance - HRMS Portal",
  description: "View and manage employee attendance records and punch activity.",
};

export default function Page() {
  return <AttendancePage />;
}
