"use client";

import React, { useState } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  LayoutDashboard, 
  Building2, 
  FileSpreadsheet, 
  CreditCard, 
  UserCheck, 
  Clock, 
  Users, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function DigitalOnboardingPage() {
  const [activeTab, setActiveTab] = useState<'preview' | 'portal'>('preview');

  // Onboarding report mockup data (Image 10 matching)
  const onboardingReports = [
    { name: 'Rahul J', email: 'rahul.j@teamora.com', date: '13-May-2026', role: 'HR Manager', status: '0/6 in progress', color: 'bg-amber-100 text-amber-800' },
    { name: 'Kate Windsor', email: 'kate.w@teamora.com', date: '03-Apr-2026', role: 'HR Specialist', status: '4/6 in progress', color: 'bg-blue-100 text-blue-800' },
    { name: 'Evangelin Zillum', email: 'evangelin.z@teamora.com', date: '03-Apr-2026', role: 'Site Engineer', status: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
    { name: 'Elena Brown', email: 'elena.b@teamora.com', date: '16-Feb-2026', role: 'Supervisor', status: '1/6 in progress', color: 'bg-amber-100 text-amber-800' },
    { name: 'Jack Oliver', email: 'jack.o@teamora.com', date: '16-Feb-2026', role: 'Project Manager', status: '5/6 in progress', color: 'bg-blue-100 text-blue-800' },
    { name: 'George Parker', email: 'george.p@teamora.com', date: '01-Jan-2026', role: 'Graphic Designer', status: 'Completed', color: 'bg-emerald-100 text-emerald-800' },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      
      {/* SECTION 1: HERO HEADER (Image 7 Layout) */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50 text-center">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200/60 shadow-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Onboarding Software
          </span>

          {/* Hero Heading */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.12]">
            Create a memorable first impression
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
            Give your new hires the warm welcome they deserve. With personalized onboarding workflows, <span className="font-semibold text-emerald-700">Teamora</span> helps your new hires complete onboarding procedures seamlessly before day one.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <a
              href="#signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base rounded-lg transition-all duration-200 shadow-md hover:shadow-emerald-600/25"
            >
              <span>Access Teamora</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>

            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold text-base rounded-lg transition-all duration-200 shadow-sm"
            >
              <span>Request Demo</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>

        </div>

        {/* HERO SHOWCASE CARD (Image 8 Welcome Onboard Mockup) */}
        <div className="mt-14 max-w-5xl mx-auto px-2">
          <div className="relative rounded-2xl p-2 sm:p-4 bg-gradient-to-r from-amber-100/40 via-emerald-100/40 to-teal-100/40 border border-slate-200 shadow-2xl overflow-hidden backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-6 sm:p-10 text-left grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              
              {/* Illustration / Graphic Side */}
              <div className="bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-indigo-500/10 rounded-xl p-8 flex flex-col items-center justify-center border border-emerald-100/50 min-h-[260px] text-center">
                <div className="w-20 h-20 rounded-full bg-emerald-600/10 flex items-center justify-center mb-4 text-emerald-600">
                  <UserCheck className="w-10 h-10" />
                </div>
                <h3 className="font-bold text-slate-800 text-lg">Digital Handshake</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs">Automated welcome kit & document collection portal</p>
              </div>

              {/* Welcome Card Content */}
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 bg-emerald-600 text-white font-bold text-xs rounded tracking-wider uppercase">
                  TEAMORA HRMS
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Welcome Onboard
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We're excited to have you with us! We extend our best wishes for the journey ahead in our organization. If you need assistance at any point, we're always here to help.
                </p>

                {/* Profile Card Snippet */}
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs mt-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm">
                      CS
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">Christine Spalding</p>
                      <p className="text-slate-500">HR Executive</p>
                    </div>
                  </div>
                  <div className="text-right border-l border-slate-200 pl-3">
                    <p className="text-slate-400">Employee ID</p>
                    <p className="font-bold text-slate-700">TM-108</p>
                  </div>
                </div>

                <button className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-xs rounded-md shadow-sm transition-colors">
                  Let's Get Started
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SMOOTH INDUCTION & PREVIEW (Image 9 Layout) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          
          <div className="lg:col-span-6 space-y-3">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
              Employee onboarding
            </span>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
              Ensure a smooth induction
            </h2>
          </div>

          <div className="lg:col-span-6 text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
            Successfully integrate your new hires by giving them a quick tour of the organization, introducing them to their team members, and assisting them in completing procedures for a delightful day one.
          </div>

        </div>

        {/* Interactive Form Preview Box (Image 9 UI) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-slate-100 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-400"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
              <span className="text-xs font-bold text-slate-600 ml-2">Onboarding Preview</span>
            </div>
            <span className="text-xs text-slate-400">Teamora HRMS Workflow</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12">
            
            {/* Left Steps Menu */}
            <div className="md:col-span-4 bg-slate-50 border-r border-slate-200 p-5 space-y-2">
              <div className="p-3 bg-emerald-600 text-white rounded-lg font-bold text-sm mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Teamora Onboarding
              </div>
              
              <div className="space-y-1 text-xs">
                <div className="p-2.5 rounded-md hover:bg-slate-200/60 font-medium text-slate-700 flex items-center gap-2">
                  <span>Welcome aboard</span>
                </div>
                <div className="p-2.5 rounded-md bg-emerald-50 text-emerald-700 font-bold flex items-center justify-between border-l-4 border-emerald-600">
                  <span>Onboarding Forms</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="p-2.5 rounded-md hover:bg-slate-200/60 font-medium text-slate-500 pl-6">
                  Employee Details
                </div>
                <div className="p-2.5 rounded-md hover:bg-slate-200/60 font-medium text-slate-700">
                  Documents and policies
                </div>
                <div className="p-2.5 rounded-md hover:bg-slate-200/60 font-medium text-slate-700">
                  Team Overview
                </div>
                <div className="p-2.5 rounded-md hover:bg-slate-200/60 font-medium text-slate-700">
                  Training Modules
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-slate-200">
                <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                  <span>Completed</span>
                  <span className="text-emerald-600">45%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="w-[45%] h-full bg-emerald-600 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Right Form Fields */}
            <div className="md:col-span-8 p-6 sm:p-8 bg-white space-y-6">
              <h4 className="text-base font-bold text-slate-800 border-b pb-3">Employee Information</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Email ID</label>
                  <input type="text" readOnly value="new.hire@teamora.com" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700" />
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Designation</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
                    <option>Senior Software Engineer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Location</label>
                  <input type="text" readOnly value="Noida / Remote" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700" />
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Department</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
                    <option>Engineering & IT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Mobile</label>
                  <input type="text" readOnly value="+91 98765 43210" className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700" />
                </div>
                <div>
                  <label className="block text-slate-500 font-medium mb-1">Assigned Mentor</label>
                  <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-md text-slate-700">
                    <option>Harsh Pachauri (Tech Lead)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button className="px-4 py-2 border border-slate-300 text-xs font-semibold rounded-md text-slate-700 hover:bg-slate-50">
                  Save Draft
                </button>
                <button className="px-4 py-2 bg-emerald-600 text-xs font-semibold rounded-md text-white hover:bg-emerald-700 shadow-sm">
                  Proceed to Next Step
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: REAL-TIME TRACKING REPORTS (Image 10 Layout) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-100/70">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            <div className="lg:col-span-6 space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Reports & Analytics
              </span>
              <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 leading-tight">
                Track onboarding progress in real time
              </h2>
            </div>
            <div className="lg:col-span-6 text-slate-600 text-base sm:text-lg leading-relaxed pt-2">
              Monitor the onboarding progress at every stage using comprehensive reports. With regular reminders and continued support, encourage your new hires to complete processes quickly and easily.
            </div>
          </div>

          {/* Report Data Table Container (Image 10 Grid) */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-x-auto">
            <div className="p-4 bg-slate-800 text-white flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" /> Employee Onboarding Reports
              </span>
              <span className="text-slate-400">Live Status Tracker</span>
            </div>

            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Employee Name</th>
                  <th className="py-3.5 px-4">Date of Joining</th>
                  <th className="py-3.5 px-4">Designation</th>
                  <th className="py-3.5 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {onboardingReports.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-bold text-slate-900">{row.name}</p>
                        <p className="text-slate-400 text-xs">{row.email}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-600">{row.date}</td>
                    <td className="py-3 px-4 text-slate-700 font-medium">{row.role}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold ${row.color}`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* SECTION 4: INTEGRATED SIDEBAR SECTION (Image 12 Teamora Portal Sidebar Integration) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="px-3.5 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">
            Portal Control
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-3">
            Integrated HRMS Admin Dashboard
          </h2>
          <p className="text-slate-600 mt-2">
            Seamlessly manage company onboarding, registrations, and employee records in one central platform.
          </p>
        </div>

        {/* Sidebar UI Display (Matching Image 12) */}
        <div className="bg-orange-50/40 border border-orange-200/80 rounded-2xl p-6 sm:p-10 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Sidebar Mockup Column (Image 12 Exact Reproduction) */}
            <div className="md:col-span-5 bg-[#FFEFE5] border border-orange-200 rounded-xl p-5 space-y-4 shadow-sm">
              <div className="border-b border-orange-200 pb-3">
                <h3 className="text-xl font-bold text-emerald-800">Teamora HRMS</h3>
                <p className="text-xs text-slate-500">Staff Management Portal</p>
              </div>

              <div className="space-y-2 text-sm font-medium">
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-orange-100/60 cursor-pointer">
                  <LayoutDashboard className="w-5 h-5 text-slate-600" />
                  <span>Dashboard</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-orange-100/60 cursor-pointer">
                  <Building2 className="w-5 h-5 text-slate-600" />
                  <span>Company Registration</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[#F15A24] text-white font-bold shadow-md cursor-pointer">
                  <FileSpreadsheet className="w-5 h-5" />
                  <span>Company Onboarding</span>
                </div>
                <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-700 hover:bg-orange-100/60 cursor-pointer">
                  <CreditCard className="w-5 h-5 text-slate-600" />
                  <span>Subscription & Billing</span>
                </div>
              </div>
            </div>

            {/* Feature Description Side */}
            <div className="md:col-span-7 space-y-4 pl-0 md:pl-4">
              <h3 className="text-2xl font-bold text-slate-900">
                Full Portal Access for HR Admins
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                With Teamora's centralized administration hub, easily navigate between multi-tenant organization setup, company onboarding templates, attendance tracking, and billing plans.
              </p>
              
              <ul className="space-y-2.5 text-sm font-semibold text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Multi-tenant company onboarding workflow
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Live attendance and geolocation integration
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Flexible subscription & automated invoice management
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 5: FOOTER CTA (Image 11 Layout) */}
      <section className="py-24 bg-gradient-to-t from-slate-900 via-slate-900 to-slate-800 text-white text-center px-4 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight">
            First steps matter
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">
            Transform your onboarding workflow with Teamora's intelligent HR automation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="#signup"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-base rounded-lg transition-colors shadow-lg"
            >
              <span>Access Teamora</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-semibold text-base rounded-lg transition-colors"
            >
              <span>Request Demo</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
