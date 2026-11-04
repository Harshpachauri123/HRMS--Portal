"use client";

import React from 'react';
import { Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';

// Teamora Logo Component (Navbar wala hi official logo)
function TeamoraLogo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <svg
        width="40"
        height="40"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10 flex-shrink-0"
      >
        <circle cx="32" cy="22" r="7" fill="#00A7BD" />
        <circle cx="50" cy="17" r="8" fill="#00B074" />
        <circle cx="68" cy="22" r="7" fill="#00A7BD" />
        <path
          d="M 22 36 C 22 36, 40 36, 50 48 C 60 36, 78 36, 78 36 C 83 36, 85 41, 81 45 C 73 53, 60 56, 58 66 L 58 84 C 58 88, 42 88, 42 84 L 42 66 C 40 56, 27 53, 19 45 C 15 41, 17 36, 22 36 Z"
          fill="url(#teamora_footer_grad)"
        />
        <defs>
          <linearGradient id="teamora_footer_grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00A7BD" />
            <stop offset="50%" stopColor="#00B074" />
            <stop offset="100%" stopColor="#008E5B" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex items-baseline font-sans leading-none tracking-tight">
        <span className="text-3xl font-bold text-white tracking-normal">Team</span>
        <span className="text-3xl font-extrabold text-[#00E599]">ora</span>
      </div>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#022419] text-white pt-16 pb-12 border-t border-emerald-900/60 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/40">
          
          {/* Column 1 & 2: Logo and About */}
          <div className="lg:col-span-2 space-y-4">
            <TeamoraLogo />
            <p className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
              People First. Progress Together.
            </p>
            <p className="text-slate-300 text-sm leading-relaxed max-w-sm">
              Teamora is a next-generation HRMS platform designed to help modern organizations manage everything from onboarding to exit with zero friction.
            </p>
            <div className="pt-2 flex items-center gap-3 text-emerald-300 text-xs">
              <span className="px-2.5 py-1 bg-[#033022] border border-emerald-800 rounded-md">HRMS</span>
              <span className="px-2.5 py-1 bg-[#033022] border border-emerald-800 rounded-md">Attendance</span>
              <span className="px-2.5 py-1 bg-[#033022] border border-emerald-800 rounded-md">Payroll</span>
            </div>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Products & Features
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><a href="/featuress/Onboarding/digitalonboarding" className="hover:text-[#00E599] transition-colors">Digital Onboarding</a></li>
              <li><a href="/features/core-hr/empmanagement" className="hover:text-[#00E599] transition-colors">Employee Management</a></li>
              <li><a href="/features/attendance-management" className="hover:text-[#00E599] transition-colors">Attendance & Leave</a></li>
              <li><a href="/features/payroll" className="hover:text-[#00E599] transition-colors">Automated Payroll</a></li>
              <li><a href="/pricing" className="hover:text-[#00E599] transition-colors">Pricing Plans</a></li>
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li><a href="/hr-resources" className="hover:text-[#00E599] transition-colors">HR Toolkits & Guides</a></li>
              <li><a href="/teamora-studio" className="hover:text-[#00E599] transition-colors">Teamora Studio</a></li>
              <li><a href="/tools" className="hover:text-[#00E599] transition-colors">Free HR Calculators</a></li>
              <li><a href="/ai-for-hrs" className="hover:text-[#00E599] transition-colors">AI Assistant for HRs</a></li>
              <li><a href="/support" className="hover:text-[#00E599] transition-colors">Help & Support</a></li>
            </ul>
          </div>

          {/* Column 5: Contact Info */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#00E599] flex-shrink-0 mt-1" />
                <span>Agra, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#00E599] flex-shrink-0" />
                <span>support@teamora.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#00E599] flex-shrink-0" />
                <span>+91 (562) 456-7890</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright Section */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          {/*  */}
          
          <div className="flex items-center gap-6">
            <a href="/privacy" className="hover:text-[#00E599] transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-[#00E599] transition-colors">Terms of Service</a>
            <a href="/security" className="hover:text-[#00E599] transition-colors">Security</a>
          </div>

          <p className="flex items-center gap-1 text-slate-400">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Modern HRs
          </p>
        </div>

      </div>
    </footer>
  );
}
