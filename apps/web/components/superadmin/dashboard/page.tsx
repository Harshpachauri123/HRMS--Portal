// "use client";

// import React from "react";
// import { Building2, CheckCircle2, AlertCircle, TrendingUp, Users, Calendar } from "lucide-react";

// export default function DashboardPage() {
//   return (
//     <div className="space-y-8">
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-amber-100 shadow-sm">
//         <div>
//           <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
//             Company Management, at a glance.
//           </h1>
//           <p className="text-sm text-slate-500 mt-1">
//             A clear view of your registered companies, active vendors, and onboarding metrics.
//           </p>
//         </div>
//         <div className="flex items-center gap-2 bg-amber-50/80 border border-amber-200/60 px-4 py-2 rounded-2xl text-amber-900 text-sm font-semibold self-start md:self-auto">
//           <Calendar className="w-4 h-4 text-amber-600" />
//           <span>Friday, 30 October 2026</span>
//         </div>
//       </div>

//       {/* Stats Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
//         {/* Card 1: Total Registered Companies */}
//         <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-white via-indigo-50/30 to-indigo-100/40 border border-indigo-100/80 shadow-sm hover:shadow-md transition-all">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-bold uppercase tracking-wider text-indigo-900/60">
//               Total Companies
//             </span>
//             <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
//               <Building2 className="w-5 h-5" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <h2 className="text-3xl font-black text-slate-900 tracking-tight">48</h2>
//             <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-indigo-600">
//               <TrendingUp className="w-3.5 h-3.5" />
//               <span>+5 registered this month</span>
//             </div>
//           </div>
//         </div>

//         {/* Card 2: Active Companies */}
//         <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-white via-emerald-50/30 to-emerald-100/40 border border-emerald-100/80 shadow-sm hover:shadow-md transition-all">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-bold uppercase tracking-wider text-emerald-900/60">
//               Active Companies
//             </span>
//             <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
//               <CheckCircle2 className="w-5 h-5" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <h2 className="text-3xl font-black text-slate-900 tracking-tight">42</h2>
//             <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
//               <span>87.5% operational status</span>
//             </div>
//           </div>
//         </div>

//         {/* Card 3: Inactive / Suspended */}
//         <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-white via-rose-50/30 to-rose-100/40 border border-rose-100/80 shadow-sm hover:shadow-md transition-all">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-bold uppercase tracking-wider text-rose-900/60">
//               Inactive / Suspended
//             </span>
//             <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
//               <AlertCircle className="w-5 h-5" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <h2 className="text-3xl font-black text-slate-900 tracking-tight">06</h2>
//             <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-rose-600">
//               <span>2 pending document verification</span>
//             </div>
//           </div>
//         </div>

//         {/* Card 4: New Additions (This Month) */}
//         <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-white via-amber-50/30 to-amber-100/40 border border-amber-100/80 shadow-sm hover:shadow-md transition-all">
//           <div className="flex items-center justify-between">
//             <span className="text-xs font-bold uppercase tracking-wider text-amber-900/60">
//               New Additions
//             </span>
//             <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
//               <Users className="w-5 h-5" />
//             </div>
//           </div>
//           <div className="mt-4">
//             <h2 className="text-3xl font-black text-slate-900 tracking-tight">05</h2>
//             <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-amber-700">
//               <span>Onboarded recently</span>
//             </div>
//           </div>
//         </div>

//       </div>

//       {/* Lower Section / Quick Insights or Recent Activity Preview */}
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* Left 2 Columns: Overview Chart / Summary */}
//         <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-base font-bold text-slate-900">Company Growth Overview</h3>
//             <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
//               Monthly Active
//             </span>
//           </div>
//           <div className="h-64 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50">
//             <p className="text-sm font-medium text-slate-400">
//               [Yahan par company onboarding graph ya analytics chart integrate kar sakte hain]
//             </p>
//           </div>
//         </div>

//         {/* Right 1 Column: Recent Registered List Preview */}
//         <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-base font-bold text-slate-900">Recent Registrations</h3>
//             <a href="/companymanagement" className="text-xs font-bold text-orange-600 hover:underline">
//               View All
//             </a>
//           </div>
//           <div className="space-y-3 flex-1">
//             {[
//               { name: "SDV Edutech Pvt. Ltd.", date: "Today", status: "Active" },
//               { name: "Robonox Solutions", date: "2 days ago", status: "Active" },
//               { name: "Teamora Technologies", date: "5 days ago", status: "Pending" },
//               { name: "Apex Software Corp", date: "1 week ago", status: "Active" },
//             ].map((comp, idx) => (
//               <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-colors">
//                 <div>
//                   <p className="text-xs font-bold text-slate-900">{comp.name}</p>
//                   <p className="text-[10px] text-slate-500">{comp.date}</p>
//                 </div>
//                 <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
//                   comp.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
//                 }`}>
//                   {comp.status}
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }
"use client";

import React from "react";
import { Building2, CheckCircle2, AlertCircle, TrendingUp, Users, Calendar } from "lucide-react";
import Link from "next/link";

const growthData = [
  { month: "May", value: 32 },
  { month: "Jun", value: 38 },
  { month: "Jul", value: 35 },
  { month: "Aug", value: 47 },
  { month: "Sep", value: 44 },
  { month: "Oct", value: 58 },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-amber-100 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Company Management, at a glance.
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            A clear view of your registered companies, active vendors, and onboarding metrics.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-amber-50/80 border border-amber-200/60 px-4 py-2 rounded-2xl text-amber-900 text-sm font-semibold self-start md:self-auto">
          <Calendar className="w-4 h-4 text-amber-600" />
          <span>Friday, 30 October 2026</span>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        
        {/* Card 1: Total Registered Companies */}
        <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-white via-indigo-50/30 to-indigo-100/40 border border-indigo-100/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-900/60">
              Total Companies
            </span>
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">48</h2>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-indigo-600">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+5 registered this month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Active Companies */}
        <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-white via-emerald-50/30 to-emerald-100/40 border border-emerald-100/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-900/60">
              Active Companies
            </span>
            <div className="w-10 h-10 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/20">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">42</h2>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
              <span>87.5% operational status</span>
            </div>
          </div>
        </div>

        {/* Card 3: Inactive / Suspended */}
        <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-white via-rose-50/30 to-rose-100/40 border border-rose-100/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-900/60">
              Inactive / Suspended
            </span>
            <div className="w-10 h-10 rounded-2xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/20">
              <AlertCircle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">06</h2>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-rose-600">
              <span>2 pending document verification</span>
            </div>
          </div>
        </div>

        {/* Card 4: New Additions (This Month) */}
        <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-white via-amber-50/30 to-amber-100/40 border border-amber-100/80 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900/60">
              New Additions
            </span>
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/20">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">05</h2>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-amber-700">
              <span>Onboarded recently</span>
            </div>
          </div>
        </div>

      </div>

      {/* Lower Section / Quick Insights or Recent Activity Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Overview Chart / Summary */}
        <div className="xl:col-span-2 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base font-bold text-slate-900">Company Growth Overview</h3>
            <span className="text-xs font-semibold px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
              Monthly Active
            </span>
          </div>
          <div
            role="img"
            aria-label="Monthly active companies increased from 32 in May to 58 in October"
            className="h-64 rounded-2xl bg-slate-50/50 px-3 py-4 sm:px-5"
          >
            <div className="flex h-full">
              <div
                aria-hidden="true"
                className="flex flex-col justify-between pb-7 pr-3 text-[10px] font-medium text-slate-400"
              >
                <span>60</span>
                <span>45</span>
                <span>30</span>
                <span>15</span>
                <span>0</span>
              </div>
              <div className="relative flex min-w-0 flex-1 flex-col">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 bottom-7 flex flex-col justify-between"
                >
                  {[0, 1, 2, 3, 4].map((line) => (
                    <span
                      key={line}
                      className="border-t border-dashed border-slate-200"
                    />
                  ))}
                </div>
                <svg
                  viewBox="0 0 600 180"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="relative h-full w-full overflow-visible"
                >
                  <defs>
                    <linearGradient id="company-growth-fill" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity=".22" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 100 L120 85 L240 92.5 L360 62.5 L480 70 L600 35 L600 180 L0 180 Z"
                    fill="url(#company-growth-fill)"
                  />
                  <path
                    d="M0 100 L120 85 L240 92.5 L360 62.5 L480 70 L600 35"
                    fill="none"
                    stroke="#059669"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                  {growthData.map((point, index) => {
                    const x = index * 120
                    const y = 180 - point.value * 2.5

                    return (
                      <circle
                        key={point.month}
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#fff"
                        stroke="#059669"
                        strokeWidth="3"
                        vectorEffect="non-scaling-stroke"
                      />
                    )
                  })}
                </svg>
                <div
                  aria-hidden="true"
                  className="grid grid-cols-6 pt-2 text-center text-[10px] font-semibold text-slate-500"
                >
                  {growthData.map((point) => (
                    <span key={point.month}>{point.month}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Recent Registered List Preview */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900">Recent Registrations</h3>
            {/* Sahi Link component ka use kiya gaya hai */}
            <Link href="/superadmin/registercompany" className="text-xs font-bold text-orange-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-3 flex-1">
            {[
              { name: "SDV Edutech Pvt. Ltd.", date: "Today", status: "Active" },
              { name: "Robonox Solutions", date: "2 days ago", status: "Active" },
              { name: "Teamora Technologies", date: "5 days ago", status: "Pending" },
              { name: "Apex Software Corp", date: "1 week ago", status: "Active" },
            ].map((comp, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 transition-colors">
                <div>
                  <p className="text-xs font-bold text-slate-900">{comp.name}</p>
                  <p className="text-[10px] text-slate-500">{comp.date}</p>
                </div>
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                  comp.status === "Active" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {comp.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
