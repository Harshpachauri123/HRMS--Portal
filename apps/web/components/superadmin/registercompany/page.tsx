"use client";

import React, { useState } from "react";
import { Building2, Mail, Phone, Globe, MapPin, User, FileText, Upload, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function RegisterForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    brandName: "",
    industryType: "",
    regNumber: "",
    officialEmail: "",
    phone: "",
    website: "",
    address: "",
    contactPersonName: "",
    designation: "",
    directPhone: "",
    directEmail: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Company Data:", formData);
    // Form submit hone ke baad success view trigger hoga
    setIsSubmitted(true);
  };

  // Agar form submit ho chuka hai toh yeh success screen dikhegi
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-emerald-100 shadow-xl text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Step 2 Completed Successfully
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Your company is successfully registered!
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
               Your company is successfully onboarding in vendor details system. Now You can see list of registered company throught Step 3 (Company Directory) .
            </p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/companymanagement/onboardingcompany"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Step 2: Onbaording Company</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  companyName: "",
                  brandName: "",
                  industryType: "",
                  regNumber: "",
                  officialEmail: "",
                  phone: "",
                  website: "",
                  address: "",
                  contactPersonName: "",
                  designation: "",
                  directPhone: "",
                  directEmail: "",
                });
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
            >
              Register Another Company
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Page Header */}
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-3xl border border-amber-200/60 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Step 2: Onboarding Form
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
            Company Registration & Onboarding
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Add a new vendor or enterprise client into the HRMS ecosystem with complete verification credentials.
          </p>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 1: Basic Details */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">1. Basic Company Details</h2>
              <p className="text-xs text-slate-500">Provide official enterprise and legal identification credentials.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Company Name (Legal) *</label>
              <input
                type="text"
                name="companyName"
                required
                value={formData.companyName}
                onChange={handleChange}
                placeholder="e.g. SDV Edutech Pvt. Ltd."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Brand Name / Display Name</label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                placeholder="e.g. SDV Tech"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Industry Type *</label>
              <select
                name="industryType"
                required
                value={formData.industryType}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium text-slate-700"
              >
                <option value="">Select Industry</option>
                <option value="Information Technology">Information Technology</option>
                <option value="EdTech">EdTech</option>
                <option value="Finance & Fintech">Finance & Fintech</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="E-Governance">E-Governance</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Registration Number (CIN / GSTIN / PAN) *</label>
              <input
                type="text"
                name="regNumber"
                required
                value={formData.regNumber}
                onChange={handleChange}
                placeholder="e.g. U72900UP2026PTC..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium uppercase"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Contact Information */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">2. Official Contact Information</h2>
              <p className="text-xs text-slate-500">Corporate communication channels and registered headquarters address.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Official Email *</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  name="officialEmail"
                  required
                  value={formData.officialEmail}
                  onChange={handleChange}
                  placeholder="contact@company.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Phone Number *</label>
              <div className="relative">
                <Phone className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 98765 43210"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Website URL</label>
              <div className="relative">
                <Globe className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://company.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Registered Address *</label>
            <div className="relative">
              <MapPin className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
              <textarea
                name="address"
                rows={2}
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter complete office address with city, state, pin code..."
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Key Contact Person */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">3. Key Contact Person</h2>
              <p className="text-xs text-slate-500">Primary point of contact for administrative and operational management.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Person Name *</label>
              <input
                type="text"
                name="contactPersonName"
                required
                value={formData.contactPersonName}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Designation *</label>
              <input
                type="text"
                name="designation"
                required
                value={formData.designation}
                onChange={handleChange}
                placeholder="e.g. HR Director / CEO"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Direct Phone *</label>
              <input
                type="tel"
                name="directPhone"
                required
                value={formData.directPhone}
                onChange={handleChange}
                placeholder="+91..."
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Direct Email *</label>
              <input
                type="email"
                name="directEmail"
                required
                value={formData.directEmail}
                onChange={handleChange}
                placeholder="person@company.com"
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Document Uploads */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">4. Required Document Uploads</h2>
              <p className="text-xs text-slate-500">Upload PDF or high-resolution image files (Max size: 5MB per file).</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* GST Certificate */}
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-6 text-center hover:border-purple-500 transition-colors bg-slate-50/50 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-900">GST Certificate</p>
              <p className="text-[10px] text-slate-500 mt-1">PDF, PNG, JPG up to 5MB</p>
              <input type="file" accept=".pdf,image/*" className="mt-4 text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer" />
            </div>

            {/* PAN Card */}
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-6 text-center hover:border-purple-500 transition-colors bg-slate-50/50 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-900">Company PAN Card</p>
              <p className="text-[10px] text-slate-500 mt-1">PDF, PNG, JPG up to 5MB</p>
              <input type="file" accept=".pdf,image/*" className="mt-4 text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer" />
            </div>

            {/* Incorporation Certificate / Agreement */}
            <div className="border-2 border-dashed border-slate-200 rounded-3xl p-6 text-center hover:border-purple-500 transition-colors bg-slate-50/50 flex flex-col items-center justify-center">
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center mb-3">
                <Upload className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-slate-900">Incorporation / Agreement</p>
              <p className="text-[10px] text-slate-500 mt-1">PDF, PNG, JPG up to 5MB</p>
              <input type="file" accept=".pdf,image/*" className="mt-4 text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-purple-600 file:text-white hover:file:bg-purple-700 cursor-pointer" />
            </div>

          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex items-center justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-2xl border border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all transform hover:-translate-y-0.5"
          >
            <span>Submit Details & Onboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
}
