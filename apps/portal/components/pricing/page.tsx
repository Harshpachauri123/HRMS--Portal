"use client";

import React, { useState } from 'react';
import { Check, ArrowRight, Building2, Sparkles, HelpCircle } from 'lucide-react';

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  // Pricing Plans Data
  const plans = [
    {
      name: "ESSENTIAL HR",
      monthlyPrice: 60,
      yearlyPrice: 48,
      popular: false,
      features: [
        "Onboarding and offboarding",
        "Employee database management",
        "Document management",
        "Time-off management (Leave)",
        "HR reports",
        "Teamora AI Assistant",
      ],
    },
    {
      name: "PROFESSIONAL",
      monthlyPrice: 120,
      yearlyPrice: 96,
      popular: false,
      addonTitle: "Essential HR +",
      features: [
        "Attendance management",
        "Timesheets",
        "Roster management",
      ],
    },
    {
      name: "PREMIUM",
      monthlyPrice: 180,
      yearlyPrice: 144,
      popular: true,
      addonTitle: "Professional +",
      features: [
        "Performance management",
        "Compensation management",
        "Employee engagement",
        "Advanced HR analytics",
      ],
    },
    {
      name: "ENTERPRISE",
      monthlyPrice: 240,
      yearlyPrice: 192,
      popular: false,
      addonTitle: "Premium +",
      features: [
        "HR help desk",
        "Learning management system",
        "Sandbox environment",
      ],
    },
  ];

  // Client Logos List
  const clientLogos = [
    "Aparajitha", "Meesho", "Daikin", "SpiceJet", "McDonald's", "Zomato"
  ];

  return (
    <div className="w-full bg-[#FAF9F5] text-slate-900 font-sans min-h-screen pb-20">
      
      {/* 1. PRICING HEADER SECTION */}
      <section className="pt-16 pb-12 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-block relative">
          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight">
            <span className="inline-flex items-baseline font-sans">
              <span className="text-[#033022] font-black">Team</span>
              <span className="text-[#00B074] font-black">ora</span>
            </span>{" "}
            <span className="text-[#033022]">Plans and Pricing</span>
          </h1>
          {/* Subtle Accent Glow */}
          <div className="absolute -top-3 -right-6 text-amber-500">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
        </div>

        <p className="mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-medium">
          Choose a plan and then select add-ons as per your requirements or let our team recommend the best plan for you.
        </p>

        {/* MONTHLY / YEARLY TOGGLE TAB */}
        <div className="mt-10 flex items-center justify-center">
          <div className="bg-emerald-950/10 p-1.5 rounded-full inline-flex items-center gap-1 border border-emerald-900/10">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${
                billingCycle === 'monthly'
                  ? 'bg-[#033022] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                billingCycle === 'yearly'
                  ? 'bg-[#033022] text-white shadow-md'
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              <span>Yearly</span>
              <span className="bg-[#00E599] text-[#033022] text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. PRICING CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 relative items-stretch">
          
          {plans.map((plan, idx) => {
            const price = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
            return (
              <div
                key={idx}
                className={`bg-white rounded-2xl p-6 flex flex-col justify-between shadow-sm border relative transition-all duration-200 hover:shadow-xl ${
                  plan.popular
                    ? 'border-[#00B074] ring-2 ring-[#00B074]/30'
                    : 'border-slate-200'
                }`}
              >
                {/* Most Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#00B074] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                    Most Popular
                  </div>
                )}

                <div>
                  {/* Plan Title */}
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-500 text-center mb-4">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="text-center my-3">
                    <div className="flex items-start justify-center gap-0.5 text-slate-900">
                      <span className="text-xl font-bold mt-1">₹</span>
                      <span className="text-4xl font-extrabold">{price}</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-500 block mt-1">
                      /user/month {billingCycle === 'yearly' && 'billed annually'}
                    </span>
                  </div>

                  {/* Try For Free CTA Button */}
                 

                  {/* Addon Header Label */}
                  {plan.addonTitle && (
                    <p className="text-xs font-extrabold text-[#00B074] mb-3">
                      {plan.addonTitle}
                    </p>
                  )}

                  {/* Feature Checklist */}
                  <ul className="space-y-3 text-xs text-slate-700 font-medium">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-[#00B074] flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            );
          })}

          {/* 3. SIDEBAR CARD: TEAMORA PLUS */}
          <div className="bg-gradient-to-b from-emerald-50/80 to-white rounded-2xl p-6 border border-emerald-200 flex flex-col justify-between shadow-sm">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-black text-[#033022]">Teamora</span>
                <span className="text-xs font-bold bg-[#00E599] text-[#033022] px-2 py-0.5 rounded">
                  Plus
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-600 mb-4 leading-relaxed">
                Unified HR software suite for all your diverse enterprise needs.
              </p>

              <a
                href="#explore-plus"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#00B074] hover:underline mb-6"
              >
                <span>Explore Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <ul className="space-y-3 text-xs font-medium text-slate-700">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00B074] flex-shrink-0 mt-0.5" />
                  <span>Teamora Recruit & Talent Acquisition</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00B074] flex-shrink-0 mt-0.5" />
                  <span>Teamora Core HR & People</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00B074] flex-shrink-0 mt-0.5" />
                  <span>Automated Payroll Suite</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00B074] flex-shrink-0 mt-0.5" />
                  <span>Expense Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#00B074] flex-shrink-0 mt-0.5" />
                  <span>Team Collaboration Tools</span>
                </li>
              </ul>
            </div>
          </div>

        </div>

        <p className="text-center text-xs text-slate-500 mt-6">
          Local taxes (VAT, GST, etc.) will be charged as applicable.
        </p>
      </section>

      {/* 4. CUSTOM ENTERPRISE QUOTE SECTION */}
      <section className="mt-16 text-center max-w-3xl mx-auto px-4 space-y-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
            Have more than <span className="font-black text-[#033022]">500 users?</span>
          </h3>
          <div className="mt-4">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#033022] text-[#033022] hover:bg-[#033022] hover:text-white font-bold text-sm rounded-lg transition-colors shadow-sm"
            >
              <span>Ask for a price quote</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="pt-4 flex items-center justify-center gap-3">
          <span className="text-base font-semibold text-slate-700">
            Choose a plan that's right for your organization.
          </span>
          <a
            href="#all-features"
            className="text-base font-bold text-[#00B074] hover:underline inline-flex items-center gap-1"
          >
            <span>Expand all features</span>
            <Sparkles className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* 5. CLIENT LOGOS TRUSTED BANNER SECTION */}
      <section className="mt-20 border-t border-slate-200 pt-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight mb-10">
            Trusted by <span className="bg-emerald-100 text-[#033022] px-3 py-1 rounded-lg">50,000+</span> businesses worldwide
          </h2>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            {clientLogos.map((client, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200/80 rounded-xl px-6 py-4 shadow-sm text-slate-700 font-extrabold text-sm sm:text-base hover:shadow-md transition-shadow"
              >
                {client}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER SECTION */}
      <section className="mt-20 max-w-5xl mx-auto px-4 text-center">
        <div className="bg-[#033022] rounded-3xl p-10 sm:p-14 text-white shadow-2xl relative overflow-hidden">
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            HR management made simple, smart, and scalable
          </h2>
          <div className="mt-8">
            <a
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#00E599] hover:bg-[#00cc85] text-[#033022] font-black text-sm rounded-xl transition-all shadow-lg"
            >
              <span>Access Teamora</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
