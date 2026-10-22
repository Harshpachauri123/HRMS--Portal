"use client"

import { useSyncExternalStore } from "react"

export type FormRecord = Record<string, string>

export type SessionRecord = {
  id: string
  details: FormRecord
  documents: string[]
}

const emptyRecords: SessionRecord[] = []
const emptyIds = new Set<string>()
let staffRecords: SessionRecord[] = []
let candidateRecords: SessionRecord[] = []
let deletedStaffDemoIds = new Set<string>()
let deletedCandidateDemoIds = new Set<string>()
let nextId = 1
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function notify() {
  listeners.forEach((listener) => listener())
}

export function useStaffRecords() {
  return useSyncExternalStore(
    subscribe,
    () => staffRecords,
    () => emptyRecords
  )
}

export function useCandidateRecords() {
  return useSyncExternalStore(
    subscribe,
    () => candidateRecords,
    () => emptyRecords
  )
}

export function useDeletedStaffDemoIds() {
  return useSyncExternalStore(subscribe, () => deletedStaffDemoIds, () => emptyIds)
}

export function useDeletedCandidateDemoIds() {
  return useSyncExternalStore(
    subscribe,
    () => deletedCandidateDemoIds,
    () => emptyIds
  )
}

export function saveStaffRecord(
  details: FormRecord,
  documents: string[],
  id?: string
) {
  const recordId = id ?? `staff-${nextId++}`
  const record = { id: recordId, details, documents }
  if (recordId.startsWith("demo-staff-")) {
    deletedStaffDemoIds = new Set(
      [...deletedStaffDemoIds].filter((deletedId) => deletedId !== recordId)
    )
  }
  const staffRecordExists = staffRecords.some((current) => current.id === recordId)
  staffRecords = staffRecordExists
    ? staffRecords.map((current) => (current.id === recordId ? record : current))
    : [record, ...staffRecords]
  notify()
  return recordId
}

export function deleteStaffRecord(id: string) {
  if (id.startsWith("demo-staff-")) {
    deletedStaffDemoIds = new Set([...deletedStaffDemoIds, id])
  }
  staffRecords = staffRecords.filter((record) => record.id !== id)
  notify()
}

export function saveCandidateRecord(
  details: FormRecord,
  documents: string[],
  id?: string
) {
  const recordId = id ?? `candidate-${nextId++}`
  const record = { id: recordId, details, documents }
  if (recordId.startsWith("demo-candidate-")) {
    deletedCandidateDemoIds = new Set(
      [...deletedCandidateDemoIds].filter((deletedId) => deletedId !== recordId)
    )
  }
  const candidateRecordExists = candidateRecords.some(
    (current) => current.id === recordId
  )
  candidateRecords = candidateRecordExists
    ? candidateRecords.map((current) => (current.id === recordId ? record : current))
    : [record, ...candidateRecords]
  notify()
  return recordId
}

export function deleteCandidateRecord(id: string) {
  if (id.startsWith("demo-candidate-")) {
    deletedCandidateDemoIds = new Set([...deletedCandidateDemoIds, id])
  }
  candidateRecords = candidateRecords.filter((record) => record.id !== id)
  notify()
}
