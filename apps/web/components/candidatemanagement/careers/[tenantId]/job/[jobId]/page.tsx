import AddCandidatePage from "@/components/candidatemanagement/addcandidate/page"

type CareerApplicationPageProps = {
  params: Promise<{ tenantId: string; jobId: string }>
  searchParams: Promise<{
    position?: string | string[]
    experience?: string | string[]
    responsibilities?: string | string[]
  }>
}

export default async function PublicJobApplyPage({
  params,
  searchParams,
}: CareerApplicationPageProps) {
  const [{ tenantId, jobId }, query] = await Promise.all([params, searchParams])
  const readFirst = (value?: string | string[]) =>
    Array.isArray(value) ? (value[0] ?? "") : (value ?? "")

  return (
    <AddCandidatePage
      initialJobApplication={{
        company: tenantId,
        jobId,
        position: readFirst(query.position),
        experience: readFirst(query.experience),
        responsibilities: readFirst(query.responsibilities),
      }}
    />
  )
}
