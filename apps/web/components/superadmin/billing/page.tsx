"use client";

import React, { useState } from "react";
import { 
  Building2, DollarSign, Users, Calendar, CheckCircle2, 
  AlertCircle, Trash2, Mail, Calculator, Clock, Search, 
  Send, X, Edit3, Check, ArrowRight 
} from "lucide-react";

// Initial Mock Data
const initialCompanies = [
  {
    id: "1",
    companyName: "SDV Edutech Pvt. Ltd.",
    planType: "Enterprise Plan",
    activeUsers: 145,
    ratePerUser: 129,
    nextBillingDate: "2026-11-15",
    status: "Paid",
  },
  {
    id: "2",
    companyName: "Robonox Solutions",
    planType: "Pro Plan",
    activeUsers: 85,
    ratePerUser: 89,
    nextBillingDate: "2026-11-02",
    status: "Due",
  },
  {
    id: "3",
    companyName: "Teamora Technologies",
    planType: "Basic Plan",
    activeUsers: 35,
    ratePerUser: 49,
    nextBillingDate: "2026-10-28",
    status: "Overdue",
  },
  {
    id: "4",
    companyName: "Apex Software Corp",
    planType: "Enterprise Plan",
    activeUsers: 320,
    ratePerUser: 129,
    nextBillingDate: "2026-11-28",
    status: "Paid",
  },
];

export default function CompanyBillingPage() {
  const [companies, setCompanies] = useState(initialCompanies);
  const [searchTerm, setSearchTerm] = useState("");

  // Calculator States with Safe Fallbacks
  const [calcCompanyId, setCalcCompanyId] = useState(initialCompanies[0]?.id || "");
  const [calcUsers, setCalcUsers] = useState(initialCompanies[0]?.activeUsers || 0);
  const [calcRate, setCalcRate] = useState(initialCompanies[0]?.ratePerUser || 49);

  // Modal States for Actions
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [emailContent, setEmailContent] = useState("");

  // Date Editor State
  const [editingCompanyId, setEditingCompanyId] = useState<string | null>(null);
  const [newBillingDate, setNewBillingDate] = useState("");

  // Handle Company Selection in Calculator
  const handleCalculatorCompanyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    setCalcCompanyId(id);
    const found = companies.find((c) => c.id === id);
    if (found) {
      setCalcUsers(found.activeUsers);
      setCalcRate(found.ratePerUser);
    }
  };

  // Confirm Calculator Changes to Table & Records
  const handleConfirmPayoutUpdate = () => {
    if (!calcCompanyId) return;

    let updatedPlan = "Basic Plan";
    if (calcRate === 89) updatedPlan = "Pro Plan";
    if (calcRate === 129) updatedPlan = "Enterprise Plan";

    setCompanies(
      companies.map((c) => {
        if (c.id === calcCompanyId) {
          return {
            ...c,
            activeUsers: calcUsers,
            ratePerUser: calcRate,
            planType: updatedPlan,
          };
        }
        return c;
      })
    );

    alert("Calculator payout synced successfully! Company table and billing details have been updated.");
  };

  // Filter companies
  const filteredCompanies = companies.filter((c) =>
    c.companyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Permanent Delete Handler
  const handleDeleteCompany = (id: string, name: string) => {
    if (window.confirm(`WARNING: Are you sure you want to permanently delete "${name}"? This will remove the company and all its data from the entire HRMS portal.`)) {
      setCompanies(companies.filter((c) => c.id !== id));
    }
  };

  // Open Email Budget Modal
  const handleOpenEmailModal = (company: any) => {
    setSelectedCompany(company);
    const payout = company.activeUsers * company.ratePerUser;
    setEmailContent(
      `Dear ${company.companyName},\n\nYour monthly HRMS budget summary for the upcoming billing cycle (${company.nextBillingDate}):\n- Active Users: ${company.activeUsers}\n- Plan: ${company.planType} (₹${company.ratePerUser}/user)\n- Total Monthly Payout: ₹${payout.toLocaleString("en-IN")}\n\nPlease clear your dues before the due date.\n\nRegards,\nTeamora HRMS System Admin`
    );
    setEmailModalOpen(true);
  };

  const handleSendEmail = () => {
    alert(`Budget & Invoice email successfully sent to ${selectedCompany?.companyName}!`);
    setEmailModalOpen(false);
  };

  // Update Billing Date
  const handleSaveDate = (id: string) => {
    if (!newBillingDate) return;
    setCompanies(
      companies.map((c) => (c.id === id ? { ...c, nextBillingDate: newBillingDate } : c))
    );
    setEditingCompanyId(null);
    setNewBillingDate("");
  };

  // Calculations for Stats
  const totalMRR = companies.reduce((acc, c) => acc + c.activeUsers * c.ratePerUser, 0);
  const totalActiveUsers = companies.reduce((acc, c) => acc + c.activeUsers, 0);

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-20">
      
      {/* 1. Page Header */}
      <div className="bg-white/85 backdrop-blur-md p-8 rounded-3xl border border-amber-200/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            UI/UX Pro Max • Subscription & Financials
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Company Subscription & Billing Hub
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage plans, calculate payouts, trigger budget notifications, and execute account terminations.
          </p>
        </div>
      </div>

      {/* 2. Pricing Tiers Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* Basic Plan */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Basic</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-black text-[#f24e1e]">₹49</span>
              <span className="text-xs font-semibold text-slate-400">/user/mo</span>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1">Teams up to 50</p>

            <ul className="mt-6 space-y-3 text-xs font-medium text-slate-700">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>Payroll processing</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>Leave management</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>Attendance tracking</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>Payslip generation</span>
              </li>
            </ul>
          </div>

          <button className="mt-8 w-full py-3 px-4 rounded-xl bg-[#f24e1e] hover:bg-[#d93f13] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-white rounded-3xl p-8 border-2 border-[#f24e1e] shadow-lg relative flex flex-col justify-between transform md:-translate-y-1">
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#f24e1e] text-white text-[11px] font-bold px-4 py-1 rounded-full uppercase tracking-wider flex items-center gap-1 shadow-sm">
            <span>⚡ Most Popular</span>
          </div>

          <div>
            <h3 className="text-xl font-extrabold text-[#f24e1e]">Pro</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-black text-[#f24e1e]">₹89</span>
              <span className="text-xs font-semibold text-slate-400">/user/mo</span>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1">Teams up to 500</p>

            <ul className="mt-6 space-y-3 text-xs font-medium text-slate-700">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>Everything in Basic</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>PF/ESI/TDS auto filing</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>Self-service portal</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>Appraisal module</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>API access</span>
              </li>
            </ul>
          </div>

          <button className="mt-8 w-full py-3 px-4 rounded-xl bg-[#f24e1e] hover:bg-[#d93f13] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#f24e1e]/20">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">Enterprise</h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="text-4xl font-black text-[#f24e1e]">₹129</span>
              <span className="text-xs font-semibold text-slate-400">/user/mo</span>
            </div>
            <p className="text-xs font-medium text-slate-500 mt-1">500+ employees</p>

            <ul className="mt-6 space-y-3 text-xs font-medium text-slate-700">
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>Everything in Pro</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>Custom workflows</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>Biometric integration</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>HRMS consultant</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f24e1e] stroke-[2.5]" />
                <span>SLA guarantee</span>
              </li>
            </ul>
          </div>

          <button className="mt-8 w-full py-3 px-4 rounded-xl bg-[#f24e1e] hover:bg-[#d93f13] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* 3. Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Monthly Revenue (MRR)</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">₹{totalMRR.toLocaleString("en-IN")}</h3>
            <span className="text-[11px] font-semibold text-emerald-600 mt-1 inline-block">Active revenue stream</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Active Employees</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{totalActiveUsers} Users</h3>
            <span className="text-[11px] font-semibold text-indigo-600 mt-1 inline-block">Across {companies.length} companies</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Paid Invoices</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {companies.filter(c => c.status === "Paid").length} Cleared
            </h3>
            <span className="text-[11px] font-semibold text-emerald-600 mt-1 inline-block">No pending clearance</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Dues</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">
              {companies.filter(c => c.status !== "Paid").length} Companies
            </h3>
            <span className="text-[11px] font-semibold text-rose-600 mt-1 inline-block">Requires budget notice</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center font-bold">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* 4. Action Calculator Section with Company Selector */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 text-white shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 bg-indigo-500/30 border border-indigo-400/30 px-3 py-1 rounded-full text-indigo-300 text-xs font-bold">
              <Calculator className="w-3.5 h-3.5" />
              <span>Interactive Payout Calculator & Table Sync</span>
            </div>
            <h3 className="text-xl font-black tracking-tight">Select Company & Calculate Monthly Payout</h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Choose a registered company, modify active users or rate, and click confirm to instantly update the main directory table below.
            </p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/15 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Select Company</label>
            <select
              value={calcCompanyId}
              onChange={handleCalculatorCompanyChange}
              className="w-full bg-slate-900/90 border border-white/20 rounded-xl px-3 py-2.5 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              {companies.map((c) => (
                <option key={c.id} value={c.id} className="text-slate-900">
                  {c.companyName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Active Users Count</label>
            <input 
              type="number" 
              value={calcUsers} 
              onChange={(e) => setCalcUsers(Number(e.target.value))}
              className="w-full bg-slate-900/90 border border-white/20 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Rate per User (₹)</label>
            <select 
              value={calcRate} 
              onChange={(e) => setCalcRate(Number(e.target.value))}
              className="w-full bg-slate-900/90 border border-white/20 rounded-xl px-3 py-2 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            >
              <option value={49} className="text-slate-900">Basic Plan (₹49)</option>
              <option value={89} className="text-slate-900">Pro Plan (₹89)</option>
              <option value={129} className="text-slate-900">Enterprise Plan (₹129)</option>
            </select>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-4 pt-2 md:pt-0">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-300 block">Total Payout</span>
              <span className="text-2xl font-black text-amber-400">₹{(calcUsers * calcRate).toLocaleString("en-IN")}</span>
            </div>
            <button
              onClick={handleConfirmPayoutUpdate}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Confirm & Update</span>
            </button>
          </div>

        </div>
      </div>

      {/* 5. Company Directory Table */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search company by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 font-medium"
            />
          </div>
          <div className="text-xs font-bold text-slate-500">
            Showing {filteredCompanies.length} registered companies
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-4">Company Name</th>
                <th className="pb-4">Plan Type</th>
                <th className="pb-4">Active Users</th>
                <th className="pb-4">Monthly Payout</th>
                <th className="pb-4">Next Billing Date</th>
                <th className="pb-4">Payment Status</th>
                <th className="pb-4 text-right">Actions / Controls</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-100 font-medium">
              {filteredCompanies.map((item) => {
                const monthlyPayout = item.activeUsers * item.ratePerUser;
                const isEditingDate = editingCompanyId === item.id;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    
                    <td className="py-4 font-bold text-slate-900">
                      {item.companyName}
                    </td>

                    <td className="py-4">
                      <span className="text-slate-900 font-semibold">{item.planType}</span>
                      <span className="block text-[11px] text-slate-400">₹{item.ratePerUser}/user/mo</span>
                    </td>

                    <td className="py-4">
                      <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                        {item.activeUsers} Users
                      </span>
                    </td>

                    <td className="py-4 font-black text-slate-900">
                      ₹{monthlyPayout.toLocaleString("en-IN")}
                    </td>

                    <td className="py-4 text-slate-600 text-xs">
                      {isEditingDate ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="date" 
                            value={newBillingDate}
                            onChange={(e) => setNewBillingDate(e.target.value)}
                            className="bg-slate-100 border border-slate-300 rounded-xl px-2 py-1 text-xs font-bold text-slate-800"
                          />
                          <button 
                            onClick={() => handleSaveDate(item.id)}
                            className="px-2 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold"
                          >
                            Save
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{item.nextBillingDate}</span>
                          <button 
                            onClick={() => { setEditingCompanyId(item.id); setNewBillingDate(item.nextBillingDate); }}
                            className="ml-1 text-indigo-600 hover:text-indigo-800"
                            title="Edit billing date"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </td>

                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                          item.status === "Paid"
                            ? "bg-emerald-100 text-emerald-700"
                            : item.status === "Due"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-rose-100 text-rose-700"
                        }`}
                      >
                        {item.status === "Paid" && <CheckCircle2 className="w-3.5 h-3.5" />}
                        {item.status === "Due" && <Clock className="w-3.5 h-3.5" />}
                        {item.status === "Overdue" && <AlertCircle className="w-3.5 h-3.5" />}
                        {item.status}
                      </span>
                    </td>

                    <td className="py-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEmailModal(item)}
                        className="p-2 bg-indigo-50 hover:bg-indigo-600 hover:text-white text-indigo-600 rounded-xl transition-all"
                        title="Send Monthly Budget Email"
                      >
                        <Mail className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeleteCompany(item.id, item.companyName)}
                        className="p-2 bg-rose-50 hover:bg-rose-600 hover:text-white text-rose-600 rounded-xl transition-all"
                        title="Permanently Delete Company from HRMS"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* 6. Send Budget Email Modal */}
      {emailModalOpen && selectedCompany && (
        <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Send Monthly Budget & Invoice</h3>
                  <p className="text-xs text-slate-500">To: {selectedCompany.companyName}</p>
                </div>
              </div>
              <button 
                onClick={() => setEmailModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Email Template Preview</label>
              <textarea
                rows={7}
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="w-full p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setEmailModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSendEmail}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Budget Email</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
