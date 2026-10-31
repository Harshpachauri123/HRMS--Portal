import { EmployeePhotoProvider } from "@/components/Employees/sidebar/employee-photo-provider"
import { EmployeeShell } from "@/components/Employees/sidebar/employee-shell"

export default function EmployeeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <EmployeePhotoProvider>
      <EmployeeShell>{children}</EmployeeShell>
    </EmployeePhotoProvider>
  )
}
