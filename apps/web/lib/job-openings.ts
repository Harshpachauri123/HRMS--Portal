import { useSyncExternalStore } from "react"

export type JobOpening = {
  id: string
  company: string
  position: string
  experience: string
  responsibilities: string
}

export const defaultJobOpenings: JobOpening[] = [
  {
    id: "job_101",
    company: "tata-technologies",
    position: "Software Developer Opening",
    experience: "2-3 years",
    responsibilities: "Build and maintain reliable software features. Collaborate with product and engineering teams, review code, and contribute to technical documentation.",
  },
]

let jobs = defaultJobOpenings
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useJobOpenings() {
  return useSyncExternalStore(subscribe, () => jobs, () => defaultJobOpenings)
}

export function saveJobOpenings(nextJobs: JobOpening[]) {
  jobs = nextJobs
  listeners.forEach((listener) => listener())
}
