import EmpManagement from "@/components/featuress/core-hr/empmanagement/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Employee Management - HRMS Portal",
  description:
    "Manage your employees efficiently with our comprehensive employee management solution.",
};

export default function Page() {
  return <EmpManagement />;
}
