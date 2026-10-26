import AddCandidatePage from "@/components/candidatemanagement/addcandidate/page"

type CareerApplicationPageProps = {
  params: Promise<{ tenantId: string; jobId: string }>
  searchParams: Promise<{ position?: string | string[] }>
}

export default async function CareerApplicationPage({
  params,
  searchParams,
}: CareerApplicationPageProps) {
  const [{ tenantId, jobId }, query] = await Promise.all([params, searchParams])
  const position = Array.isArray(query.position)
    ? (query.position[0] ?? "")
    : (query.position ?? "")

  return (
    <AddCandidatePage
      initialJobApplication={{ company: tenantId, jobId, position }}
    />
  )
}
