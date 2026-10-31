import { AppShell } from "@/components/Hr/sidebar/app-shell";
import { Toaster } from "@workspace/ui/components/toast";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HR Pulse - Staff Management System",
  description:
    "A responsive municipal admin dashboard for survey, tax, cash desk, and transaction operations.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppShell>
          {children}
        </AppShell>
        <Toaster />
      </body>
    </html>
  );
}
