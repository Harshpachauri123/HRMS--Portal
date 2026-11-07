import React from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection() {
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

      </div>
    </section>
  );
}
