import AttendancePage from "@/components/featuress/core-hr/adttend/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Attendance Management - HRMS Portal",
  description: "Manage attendance efficiently with our comprehensive attendance management solution.",
};

export default function Page() {
  return <AttendancePage />;
}
