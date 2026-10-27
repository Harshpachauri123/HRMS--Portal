import { EmployeeShell } from "@/components/employee/employee-shell"
import { EmployeePhotoProvider } from "@/components/employee/employee-photo-provider"

export default function EmployeeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <EmployeePhotoProvider>
      <EmployeeShell>{children}</EmployeeShell>
    </EmployeePhotoProvider>
  )
}
