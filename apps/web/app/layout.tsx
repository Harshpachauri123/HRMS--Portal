import type { Metadata } from "next";
import { AppShell } from "@/components/sidebar/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "HRMS Portal - SDV Edutech Pvt. Ltd.",
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
          <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
