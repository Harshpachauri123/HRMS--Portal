
import Billing from "@/components/superadmin/billing/page";
import type { Metadata } from "next";


export const metadata: Metadata = {
  title: "Suscription & Billing Fields  - HRMS Portal",
  description: "View and manage employee attendance records and punch activity.",
};

export default function Page() {
  return <Billing />;
}
