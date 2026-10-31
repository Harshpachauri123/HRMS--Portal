import RegisterCompany from "../../../components/superadmin/registercompany/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registration Company - HRMS Portal",
  description: "Register a new company or vendor into the HRMS ecosystem.",
};

export default function Page() {
  return <RegisterCompany />;
}
