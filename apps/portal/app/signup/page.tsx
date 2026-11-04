import SignupRoute from "@/components/signup/SignupRoute";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - HRMS Portal",
  description: "Create your account and get started with our HR management solution.",
};

export default function Page() {
  return <SignupRoute />;
}
