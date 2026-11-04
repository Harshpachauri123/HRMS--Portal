"use client";

import React, { useState } from 'react';
import { User, Mail, Lock, CheckCircle, ArrowRight, X } from 'lucide-react';

// Teamora Branded Logo Component (Icon + Split Color Text)
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
          fill="url(#teamora_grad_modal)"
        />
        <defs>
          <linearGradient id="teamora_grad_modal" x1="0%" y1="0%" x2="100%" y2="100%">
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

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignupModal({ isOpen, onClose }: SignupModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      setIsSuccess(true);
    }
  };

  const handleModalClose = () => {
    setIsSuccess(false);
    setFormData({ name: '', email: '', password: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      
      {/* Main Popup Modal Card */}
      <div className="relative w-full max-w-md bg-[#022419] border border-emerald-800/80 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 text-white">
        
        {/* Close Button */}
        <button 
          onClick={handleModalClose}
          className="absolute top-4 right-4 p-1.5 text-emerald-400 hover:text-white hover:bg-emerald-900/60 rounded-full transition-colors focus:outline-none"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <>
            {/* Modal Header with Teamora Logo */}
            <div className="flex flex-col items-center text-center mb-6">
              <TeamoraLogo />
              <p className="text-xs text-emerald-400 mt-2 font-medium uppercase tracking-wider">People First. Progress Together.</p>
              <h3 className="mt-3 text-2xl font-extrabold text-white">Create your account</h3>
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#033022] border border-emerald-800 rounded-lg text-white placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-[#00E599] text-sm"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#033022] border border-emerald-800 rounded-lg text-white placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-[#00E599] text-sm"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-xs font-semibold text-emerald-200 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3 py-2.5 bg-[#033022] border border-emerald-800 rounded-lg text-white placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-[#00E599] text-sm"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-bold text-sm text-[#033022] bg-[#00E599] hover:bg-[#00cc85] transition-all shadow-md cursor-pointer"
              >
                <span>Sign Up</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          /* Success Popup Message Inside Modal */
          <div className="text-center py-4 space-y-4">
            <div className="flex justify-center mb-2">
              <TeamoraLogo />
            </div>
            <div className="w-16 h-16 bg-emerald-500/20 text-[#00E599] rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <CheckCircle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-white">Welcome to Teamora!</h3>
            <p className="text-sm text-emerald-200">
              Your account has been created successfully. Your onboarding process has started.
            </p>
            <button
              onClick={handleModalClose}
              className="w-full py-2.5 bg-[#00E599] hover:bg-[#00cc85] text-[#033022] font-bold text-sm rounded-lg transition-colors shadow-md cursor-pointer"
            >
              Done
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
