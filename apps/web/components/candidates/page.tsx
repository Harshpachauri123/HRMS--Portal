
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BriefcaseBusiness, UserRound } from 'lucide-react';
import { defaultJobOpenings, readJobOpenings, type JobOpening } from '@/lib/job-openings';

export default function CandidateManagementPage() {
  const [jobs, setJobs] = useState<JobOpening[]>(defaultJobOpenings);

  useEffect(() => setJobs(readJobOpenings()), []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Candidate Management & Recruitment</h1>
      
      {/* Copy Link Button Card */}
      <div className="bg-white p-4 rounded-xl shadow border flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-800">Software Developer Opening</h3>
          <p className="text-xs text-gray-500">ID: {jobId} | Tenant: {tenantId}</p>
        </div>

        <button
          onClick={handleCopyCareerLink}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition"
        >
          📋 Copy Career Link
        </button>
      </div>
    </div>
  );
}
