'use client';

import React, { useState } from 'react';
import { saveJobOpenings, useJobOpenings } from '@/lib/job-openings';
import { toast } from '@workspace/ui/components/toast';

export default function CandidateManagementPage() {
  // Pehle se ek default job daal di hai taaki page khali na lage
  const jobs = useJobOpenings();

  const [formData, setFormData] = useState({
    company: '',
    position: '',
    experience: '',
    id: '',
  });

  const handleCreateJob = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedJobs = [formData, ...jobs];
    saveJobOpenings(updatedJobs);
    toast.add({
      title: 'Job published',
      description: `${formData.position} is now in Position Link Generator.`,
      type: 'success',
    });
    // Form reset kar diya
    setFormData({ company: '', position: '', experience: '', id: '' });
  };

  const handleCopyLink = async (company: string, jobId: string, position: string) => {
    const baseUrl = window.location.origin;
    const careerLink = `${baseUrl}/careers/${encodeURIComponent(company)}/job/${encodeURIComponent(jobId)}?position=${encodeURIComponent(position)}`;
    try {
      await navigator.clipboard.writeText(careerLink);
      toast.add({
        title: 'Career link copied',
        description: 'Share it to open this job application in another tab.',
        type: 'success',
      });
    } catch {
      toast.add({
        title: 'Could not copy link',
        description: 'Please allow clipboard access and try again.',
        type: 'error',
      });
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">Candidate Management & Recruitment</h1>

      {/* 1. Job Creation Form */}
      <form onSubmit={handleCreateJob} className="bg-white p-6 rounded-2xl shadow-md border space-y-4">
        <h3 className="font-bold text-gray-700">Create New Job Opening</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Company / Tenant ID</label>
            <input
              type="text"
              placeholder="e.g. tata-technologies"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Position Name</label>
            <input
              type="text"
              placeholder="e.g. React Developer"
              required
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Required Experience</label>
            <input
              type="text"
              placeholder="e.g. 2-4 Years"
              required
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Job ID</label>
            <input
              type="text"
              placeholder="e.g. job_102"
              required
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
              className="w-full px-3 py-2 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition shadow"
        >
          Publish Job Opening
        </button>
      </form>

      {/* 2. Active Job Openings Cards (Jaise aapne image mein dikhaya hai) */}
      <div className="space-y-4">
        <h3 className="font-bold text-gray-700">Published Job Openings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white rounded-2xl shadow-sm border p-5 relative overflow-hidden flex flex-col justify-between"
              style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.03) 0%, rgba(255, 255, 255, 1) 100%)' }}
            >
              {/* Top Row: Copy Link Button */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <span className="text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-600 rounded-lg">
                  ID: {job.id}
                </span>
                <button
                  onClick={() => handleCopyLink(job.company, job.id, job.position)}
                  className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-lg transition shadow-sm flex items-center gap-1.5"
                >
                  📋 Copy Career Link
                </button>
              </div>

              {/* Middle Row: Position & Experience Details */}
              <div className="py-4 text-center">
                <h4 className="font-bold text-gray-900 text-base">{job.position}</h4>
                <p className="text-xs text-gray-500 mt-1 font-medium">Experience: {job.experience}</p>
              </div>

              {/* Bottom Row: Company Info */}
              <div className="pt-3 border-t border-gray-100 text-center">
                <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                  Company / Tenant: {job.company}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
