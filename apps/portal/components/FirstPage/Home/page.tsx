import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Meesho Logo Component
function MeeshoLogo() {
  return (
    <span className="text-3xl font-extrabold text-[#550F47] tracking-tight font-sans">
      meesho
    </span>
  );
}

// Aparajitha Logo Component
function AparajithaLogo() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-1">
        <span className="text-2xl font-bold text-[#642681]">Aparajitha</span>
        <svg className="w-4 h-4 text-amber-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      </div>
      <span className="text-[9px] tracking-wider text-gray-400 font-medium -mt-1">
        An Xcelerated Venture
      </span>
    </div>
  );
}

// Daikin Logo Component
function DaikinLogo() {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-6 h-6 bg-[#00A0E9] transform -skew-x-12 flex items-center justify-center">
        <div className="w-0 h-0 border-t-[12px] border-t-black border-r-[12px] border-r-transparent"></div>
      </div>
      <span className="text-2xl font-black italic tracking-tighter text-[#00A0E9]">
        DAIKIN
      </span>
    </div>
  );
}

// SpiceJet Logo Component
function SpiceJetLogo() {
  return (
    <div className="flex items-center gap-1">
      <div className="grid grid-cols-3 gap-0.5 w-5 h-5">
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
      </div>
      <span className="text-2xl font-black italic text-[#C7161C] tracking-tight">
        SpiceJet
      </span>
    </div>
  );
}

// Zomato Logo Component
function ZomatoLogo() {
  return (
    <span className="text-3xl font-black italic text-[#2D2D2D] tracking-tighter font-sans">
      zomato
    </span>
  );
}

export default function HeroSection() {
  const clientLogos = [
    { name: 'Meesho', component: <MeeshoLogo /> },
    { name: 'Aparajitha', component: <AparajithaLogo /> },
    { name: 'Daikin', component: <DaikinLogo /> },
    { name: 'SpiceJet', component: <SpiceJetLogo /> },
    { name: 'Zomato', component: <ZomatoLogo /> },
  ];

  return (
    <section className="w-full bg-white text-gray-900 pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-black max-w-4xl leading-[1.15]">
          HR software <br className="hidden sm:inline" />
          for every business
        </h1>

        {/* Subtitle Paragraph */}
        <p className="mt-6 text-lg sm:text-xl text-gray-700 max-w-2xl font-normal leading-relaxed">
          Streamline all your HR processes and deliver exceptional employee
          experiences with <span className="font-semibold text-gray-900">Teamora</span>—cloud-based AI HR software that's intuitive, agile, mobile-friendly.
        </p>

        {/* Call-to-Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <Link
            href="/signup"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#1B55E2] hover:bg-blue-700 text-white font-medium text-base rounded-md transition-all duration-200 shadow-sm"
          >
            <span>Sign up for Onboarding</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-black border border-black font-medium text-base rounded-md transition-all duration-200"
          >
            <span>Request demo</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>

        {/* Client Logos Section */}
        <div className="mt-20 w-full">
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-90 hover:opacity-100 transition-all duration-300">
            {clientLogos.map((logo, index) => (
              <div key={index} className="flex items-center justify-center h-12 px-2">
                {logo.component}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
