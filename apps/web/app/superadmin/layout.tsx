import React from "react";
import { SuperAdminShell } from "@/components/superadmin/sidebar/superadmin-shell"; // Apne path ke mutabiq check kar lein

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SuperAdminShell>
      {children}
    </SuperAdminShell>
  );
}
