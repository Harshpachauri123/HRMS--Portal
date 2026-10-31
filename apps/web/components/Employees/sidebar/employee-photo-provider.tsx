"use client"

import { createContext, useContext, useState } from "react"

type EmployeePhotoContextValue = {
  photoUrl: string | null
  setPhotoUrl: (photoUrl: string | null) => void
}

const EmployeePhotoContext = createContext<EmployeePhotoContextValue | null>(
  null
)

export function EmployeePhotoProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null)

  return (
    <EmployeePhotoContext.Provider value={{ photoUrl, setPhotoUrl }}>
      {children}
    </EmployeePhotoContext.Provider>
  )
}

export function useEmployeePhoto() {
  const context = useContext(EmployeePhotoContext)
  if (!context) {
    throw new Error(
      "useEmployeePhoto must be used within EmployeePhotoProvider"
    )
  }
  return context
}
