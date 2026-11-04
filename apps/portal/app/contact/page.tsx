import Contact from "@/components/contact/page"; // Import the DigitalOnboarding component
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - HRMS Portal",
  description: "Get in touch with our team and learn more about our HR solutions.",
};

export default function Page() {
  return <Contact />;
}
