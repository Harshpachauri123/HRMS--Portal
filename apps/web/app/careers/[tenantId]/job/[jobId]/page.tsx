import PublicJobApplyPage from "@/components/candidatemanagement/careers/[tenantId]/job/[jobId]/page"

type CareerApplicationPageProps = {
  params: Promise<{ tenantId: string; jobId: string }>
  searchParams: Promise<{
    position?: string | string[]
    experience?: string | string[]
    responsibilities?: string | string[]
    apply?: string | string[]
  }>
}

export default function CareerApplicationPage(props: CareerApplicationPageProps) {
  return <PublicJobApplyPage {...props} />
}
