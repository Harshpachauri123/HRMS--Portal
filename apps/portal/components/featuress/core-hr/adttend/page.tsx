"use client";

import React, { useState } from 'react';
import { 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  LogIn, 
  LogOut, 
  Calendar, 
  Bell, 
  Settings,
  ShieldCheck,
  Smartphone,
  BarChart3
} from 'lucide-react';

export default function AttendancePage() {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [punchTime, setPunchTime] = useState<string | null>(null);

  const handlePunchToggle = () => {
    if (!isPunchedIn) {
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setPunchTime(now);
      setIsPunchedIn(true);
    } else {
      setIsPunchedIn(false);
      setPunchTime(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-slate-900 font-sans pb-20">
      
      {/* 1. HERO HEADER SECTION */}
      <section className="pt-16 pb-12 px-4 text-center max-w-4xl mx-auto">
        <span className="px-4 py-1.5 bg-emerald-100 text-[#033022] rounded-full text-xs font-bold uppercase tracking-wider inline-block mb-4">
          Attendance Management System
        </span>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight">
          Manage your attendance <br />
          <span className="text-[#033022]">like clockwork</span>
        </h1>
        <p className="mt-6 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed font-medium">
          Boost workplace efficiency with a flexible attendance system that lets you check-in from the web and mobile app, allows policy customization according to changing work preferences, and manages all your attendance information accurately.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button className="px-8 py-3.5 bg-[#033022] hover:bg-[#054330] text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center gap-2">
            <span>Access Teamora Attendance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="px-8 py-3.5 bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-800 font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer">
            Request Demo →
          </button>
        </div>
      </section>

      {/* 2. INTERACTIVE DASHBOARD MOCKUP WITH PUNCH IN / PUNCH OUT SYSTEM */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-slate-900 rounded-3xl p-3 sm:p-4 shadow-2xl border-4 border-slate-800">
          
          {/* Top Browser Bar */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-800/80 rounded-t-2xl mb-3 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
            </div>
            <div className="bg-slate-900 px-6 py-1 rounded-md text-slate-300 font-mono">
              app.teamora.com/features/attendance
            </div>
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4" />
              <Settings className="w-4 h-4" />
            </div>
          </div>

          {/* Inner Dashboard UI Container */}
          <div className="bg-[#FAF9F5] rounded-2xl overflow-hidden shadow-inner p-8 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Description Features */}
              <div className="lg:col-span-7 space-y-6">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-md text-xs font-bold uppercase tracking-wider">
                  Quick Punch System
                </span>
                <h3 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  Seamless Web & Mobile Punching
                </h3>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Say goodbye to complex biometric setups. Teamora enables employees to punch in and punch out instantly with single clicks, tracking work hours, shifts, and overtime transparently.
                </p>

                <div className="space-y-3 pt-2 text-xs font-semibold text-slate-700">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00B074]" /> Real-time work hours tracking and live status updates
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00B074]" /> Shift scheduling and automated late-coming alerts
                  </div>
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#00B074]" /> Web dashboard and mobile app integration[cite: 14]
                  </div>
                </div>
              </div>

              {/* Right Interactive Punch Widget Card */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-200 text-center">
                <div className="w-12 h-12 bg-emerald-100 text-[#033022] rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Daily Attendance Tracker</h4>
                <p className="text-xs text-slate-500 mt-1">Mark your attendance for today</p>

                {/* Live Timer Status Box */}
                <div className="my-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <p className="text-[11px] font-bold text-slate-400 uppercase">Current Status</p>
                  <p className={`text-lg font-black mt-1 ${isPunchedIn ? 'text-emerald-600' : 'text-slate-700'}`}>
                    {isPunchedIn ? `Punched In at ${punchTime}` : 'Currently Punched Out'}
                  </p>
                </div>

                {/* Punch Action Button */}
                <button
                  onClick={handlePunchToggle}
                  className={`w-full py-3.5 px-4 rounded-xl font-black text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    isPunchedIn 
                      ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                      : 'bg-[#00E599] hover:bg-[#00cc85] text-[#033022]'
                  }`}
                >
                  {isPunchedIn ? (
                    <>
                      <LogOut className="w-4 h-4" />
                      <span>Punch Out Now</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-4 h-4" />
                      <span>Punch In Now</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
