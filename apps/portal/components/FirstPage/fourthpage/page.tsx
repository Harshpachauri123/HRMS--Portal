"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

type TabContent = {
  title: string;
  heading: string;
  description: string;
  bannerText: string;
};

export default function FourthPage() {
  // Tabs data with unique content for each category
  const tabContent: [TabContent, ...TabContent[]] = [
    {
      title: "Start-ups",
      heading: "Agile HR for high-growth Start-ups",
      description: "Fast-track your startup journey with Teamora. Automate payroll, rapid digital onboarding, and manage your core team without getting bogged down by manual paperwork so you can scale faster.",
      bannerText: "Built for Fast Scaling",
    },
    {
      title: "SMBs & MSMEs",
      heading: "Streamline operations for SMBs & MSMEs",
      description: "Empower your growing workforce with robust attendance tracking, shift management, and automated expense claims designed specifically to boost productivity for mid-sized businesses.",
      bannerText: "Proudly made in INDIA for the world.",
    },
    {
      title: "Large Enterprises",
      heading: "Enterprise-grade security & scale",
      description: "Multi-tenant architecture, advanced role-based access control, custom approval workflows, and robust compliance management tailored for large conglomerates.",
      bannerText: "Enterprise Security",
    },
    {
      title: "Blue collar workforce",
      heading: "Empower your blue-collar teams",
      description: "Simplified mobile-first attendance, geo-fencing check-ins, and quick multilingual support enabling on-ground workers to complete operational tasks effortlessly.",
      bannerText: "Mobile-First Operations",
    },
    {
      title: "Field workforce",
      heading: "Field workforce management made easy",
      description: "For organizations who are struggling to meet the HR needs of their field workforce due to remote work ways, Teamora offers one of the world's easiest-to-use HRMS, powered by an award-winning mobile app that allows field teams to close tasks without office constraints.",
      bannerText: "Seamless Field Tracking",
    },
  ];

  const [activeTab, setActiveTab] = useState<TabContent>(tabContent[0]);

  return (
    <section className="w-full bg-[#FAF9F5] py-20 px-4 sm:px-6 lg:px-8 text-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Heading with Teamora Logo Color Split */}
        <div className="text-center max-w-4xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-slate-900">
            Everyone who is obsessed about{" "}
            <span className="text-[#033022]">Building Amazing Workplaces Trusts </span>
            <span className="inline-flex items-baseline font-sans">
              <span className="text-[#033022] font-extrabold">Team</span>
              <span className="text-[#00B074] font-black">ora</span>
            </span>
          </h2>
        </div>

        {/* Interactive Tabs List */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {tabContent.map((tab, idx) => (
            <button
            suppressHydrationWarning
              key={idx}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#033022] text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: 3D Building Image */}
          <div className="lg:col-span-6 relative flex justify-center items-center">
            <div className="relative w-full max-w-lg h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-white flex items-center justify-center">
              <Image 
                src="https://hrone.cloud/wp-content/uploads/2023/06/building-3-1-2x.png" 
                alt="Teamora Building Workplace" 
                fill
                className="object-contain sm:object-cover"
                unoptimized
                priority
              />
            </div>
          </div>

          {/* Right Side: Dynamic Active Content Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200/80 transition-all duration-300 relative">
              
              <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-md text-xs font-bold mb-4 uppercase tracking-wider">
                {activeTab.title} Solutions
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {activeTab.heading}
              </h3>

              <p className="mt-4 text-slate-600 text-base leading-relaxed">
                {activeTab.description}
              </p>

              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
                  <CheckCircle2 className="w-4 h-4" /> Fully Integrated with Teamora HRMS
                </div>
                
                <a
                  href="#explore"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#033022] hover:text-emerald-700 transition-colors"
                >
                  <span>Learn more</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>

            {/* Pagination Dots Indicator */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {tabContent.map((tab, idx) => (
                <button
                  suppressHydrationWarning
                  key={idx}
                  onClick={() => setActiveTab(tab)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeTab === tab ? 'w-8 bg-[#033022]' : 'w-2.5 bg-slate-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
