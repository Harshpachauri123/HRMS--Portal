"use client"

import { useEmployeePhoto } from "@/components/Employees/sidebar/employee-photo-provider"
import { cn } from "@/lib/utils"

export function EmployeeAvatar({
  className,
  initials = "AM",
  alt = "Employee profile photo",
}: {
  className?: string
  initials?: string
  alt?: string
}) {
  const { photoUrl } = useEmployeePhoto()

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden",
        className
      )}
    >
      {photoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={photoUrl}
          alt={alt}
          className="h-full w-full object-contain"
        />
      ) : (
        initials
      )}
    </div>
  )
}
