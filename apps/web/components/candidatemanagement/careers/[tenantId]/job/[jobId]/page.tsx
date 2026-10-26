'use client';

import AddCandidateForm from '@/components/candidatemanagement/addcandidate/page';
import { useParams } from 'next/navigation';

export default function PublicJobApplyPage() {
  const params = useParams();
  
  // %20 ko wapas normal space " " mein convert karne ke liye decodeURIComponent use karein:
  const rawTenantId = params.tenantId as string;
  const tenantId = decodeURIComponent(rawTenantId); 
  
  const jobId = params.jobId as string;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto text-center mb-8">
        <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-semibold uppercase">
          {/* Ab yahan 'SDV Edutech' saaf dikhega, '%20' nahi aayega */}
          Company: {tenantId} 
        </span>
        <h1 className="text-2xl font-bold text-gray-900 mt-2">Job Application Portal</h1>
        <p className="text-sm text-gray-500">Applying for Job ID: #{jobId}</p>
      </div>

      <AddCandidateForm tenantId={tenantId} jobId={jobId} />
    </div>
  );
}
