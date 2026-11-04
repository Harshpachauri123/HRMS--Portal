"use client";

import { useRouter } from "next/navigation";
import SignupModal from "@/components/signup/page";

export default function SignupRoute() {
  const router = useRouter();

  return <SignupModal isOpen onClose={() => router.push("/")} />;
}
