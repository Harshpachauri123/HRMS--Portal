"use client";

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Search, Menu, X, UserPlus, User, Mail, Lock, CheckCircle, ArrowRight } from 'lucide-react';

// Teamora Logo Component
function TeamoraLogo() {
  return (
    <div className="flex items-center gap-3 cursor-pointer">
      <svg
        width="48"
        height="48"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-12 h-12 flex-shrink-0"
      >
        <circle cx="32" cy="22" r="7" fill="#00A7BD" />
        <circle cx="50" cy="17" r="8" fill="#00B074" />
        <circle cx="68" cy="22" r="7" fill="#00A7BD" />
        <path
          d="M 22 36 C 22 36, 40 36, 50 48 C 60 36, 78 36, 78 36 C 83 36, 85 41, 81 45 C 73 53, 60 56, 58 66 L 58 84 C 58 88, 42 88, 42 84 L 42 66 C 40 56, 27 53, 19 45 C 15 41, 17 36, 22 36 Z"
          fill="url(#teamora_grad)"
        />
        <defs>
          <linearGradient id="teamora_grad" x1="0%" y1="0%" x2="100%" y2="100%">
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

// Features Submenu Data
const featuresCategories = [
  {
    id: 'onboarding',
    title: 'Onboarding',
    items: [
      { name: 'Digital Onboarding', href: '/featuress/Onboarding/digitalonboarding' },
    ],
  },
  {
    id: 'core-hr',
    title: 'Core HR',
    items: [
      { name: 'Employee management', href: '/features/core-hr/empmanagement' },
      { name: 'Offboarding', href: '/features/core-hr/offboarding' },
      { name: 'Attendance management', href: '/features/attendance-management' },
      { name: 'Leave management (Time off)', href: '/features/leave-management' },
    ],
  },
  {
    id: 'payroll-expense',
    title: 'Payroll & expense',
    items: [
      { name: 'Automated Payroll', href: '/features/payroll' },
      { name: 'Expense Claims', href: '/features/expenses' },
      { name: 'Tax & Compliance', href: '/features/compliance' },
    ],
  },
  {
    id: 'employee-engagement',
    title: 'Employee engagement',
    items: [
      { name: 'Pulse Surveys', href: '/features/surveys' },
      { name: 'Employee Rewards', href: '/features/rewards' },
    ],
  },
  {
    id: 'hr-automation',
    title: 'HR automation',
    items: [
      { name: 'Custom Workflows', href: '/features/workflows' },
      { name: 'Trigger Notifications', href: '/features/notifications' },
    ],
  },
  {
    id: 'custom-services',
    title: 'Custom services',
    items: [
      { name: 'Custom Modules', href: '/features/custom-modules' },
    ],
  },
];

const navLinks = [
  { name: 'Features', href: '/features', type: 'mega' },
  { name: 'Solutions', href: '/solutions', type: 'simple' },
  { name: 'Pricing', href: '/pricing', type: 'link' },
  { name: 'HR Resources', href: '/hr-resources', type: 'simple' },
  { name: 'Tools', href: '/tools', type: 'simple' },
  { name: 'Contact', href: '/contact', type: 'link' },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('onboarding');
  
  // Signup Modal State Control
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [isSuccess, setIsSuccess] = useState(false);

  const currentCategoryObj = featuresCategories.find((cat) => cat.id === activeCategory) ?? {
    title: 'Features',
    items: [],
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.password) {
      setIsSuccess(true);
    }
  };

  const handleCloseModal = () => {
    setIsSignupOpen(false);
    setIsSuccess(false);
    setFormData({ name: '', email: '', password: '' });
  };

  return (
    <>
      <nav className="bg-[#033022] text-white w-full sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <a href="/" className="flex items-center">
                <TeamoraLogo />
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-6 text-base font-medium">
              
              {/* Features Link with Mega Dropdown */}
              <div 
                className="relative group py-8"
                onMouseEnter={() => setIsFeaturesOpen(true)}
                onMouseLeave={() => setIsFeaturesOpen(false)}
              >
                <button 
                  className="flex items-center gap-1 hover:text-emerald-400 transition-colors focus:outline-none"
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                >
                  <span>Features</span>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isFeaturesOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Mega Dropdown Menu */}
                {isFeaturesOpen && (
                  <div className="absolute top-full -left-20 bg-white text-gray-900 shadow-2xl rounded-md border border-gray-100 flex w-[580px] overflow-hidden z-50 transition-all duration-200">
                    
                    {/* Left Column: Sub-Categories */}
                    <div className="w-[240px] bg-gray-50/70 border-r border-gray-100 py-3">
                      {featuresCategories.map((category) => {
                        const isActive = activeCategory === category.id;
                        return (
                          <div
                            key={category.id}
                            onMouseEnter={() => setActiveCategory(category.id)}
                            className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors ${
                              isActive
                                ? 'bg-white text-emerald-700 font-semibold shadow-sm border-l-4 border-emerald-600'
                                : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100/60'
                            }`}
                          >
                            <span className="truncate">{category.title}</span>
                            <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-600' : 'text-gray-400'}`} />
                          </div>
                        );
                      })}
                    </div>

                    {/* Right Column: Items List */}
                    <div className="w-[340px] bg-white p-4">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 px-2">
                        {currentCategoryObj.title}
                      </h4>
                      <div className="space-y-1">
                        {currentCategoryObj.items.map((item, idx) => (
                          <a
                            key={idx}
                            href={item.href}
                            className="block px-2 py-2 text-sm text-gray-800 hover:text-emerald-700 hover:bg-emerald-50/60 rounded-md transition-colors font-medium"
                          >
                            {item.name}
                          </a>
                        ))}
                      </div>
                    </div>

                  </div>
                )}
              </div>

              {/* Other Navigation Links */}
              {navLinks.slice(1).map((link, index) => (
                link.type === 'link' ? (
                  <a 
                    key={index} 
                    href={link.href} 
                    className="hover:text-emerald-400 transition-colors py-2"
                  >
                    {link.name}
                  </a>
                ) : (
                  <div key={index} className="relative group cursor-pointer flex items-center gap-1 hover:text-emerald-400 transition-colors py-2">
                    <span>{link.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                )
              ))}

              {/* Search Icon */}
              <button 
                aria-label="Search" 
                className="p-1 hover:text-emerald-400 transition-colors rounded-full focus:outline-none"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Sign Up Button (Triggers Popup Modal) */}
              <button
                onClick={() => setIsSignupOpen(true)}
                className="ml-2 inline-flex items-center gap-2 px-5 py-2.5 bg-[#00E599] hover:bg-[#00cc85] text-[#033022] font-bold text-sm rounded-lg transition-all shadow-sm duration-150 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </button>

            </div>

            {/* Mobile Menu Right Icons */}
            <div className="lg:hidden flex items-center gap-3">
              <button
                onClick={() => setIsSignupOpen(true)}
                className="px-3.5 py-1.5 bg-[#00E599] hover:bg-[#00cc85] text-[#033022] font-bold text-xs rounded-md transition-colors"
              >
                Sign Up
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md hover:bg-[#054330] focus:outline-none"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#022419] border-t border-emerald-900 px-4 pt-3 pb-6 space-y-2 max-h-[80vh] overflow-y-auto">
            <div className="py-2 border-b border-emerald-800">
              <span className="text-xs uppercase text-emerald-400 font-bold tracking-wider">Features</span>
              <div className="mt-2 space-y-1 pl-2">
                {featuresCategories.map((cat) => (
                  <div key={cat.id} className="py-1">
                    <span className="text-sm font-semibold text-gray-200">{cat.title}</span>
                    <div className="pl-3 mt-1 space-y-1">
                      {cat.items.map((sub, idx) => (
                        <a
                          key={idx}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-xs text-emerald-200 hover:text-white py-1"
                        >
                          {sub.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {navLinks.slice(1).map((link, index) => (
              <a
                key={index}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2.5 px-3 rounded-md text-base font-medium hover:bg-[#033022] hover:text-emerald-400 transition-colors"
              >
                {link.name}
              </a>
            ))}

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSignupOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-[#00E599] text-[#033022] font-bold text-base rounded-md"
              >
                <UserPlus className="w-5 h-5" />
                <span>Sign Up Free</span>
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* SIGN UP POPUP MODAL OVERLAY */}
      {isSignupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-md bg-[#022419] border border-emerald-800/80 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 text-white">
            
            {/* Close Button */}
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-1.5 text-emerald-400 hover:text-white hover:bg-emerald-900/60 rounded-full transition-colors focus:outline-none"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSuccess ? (
              <>
                <div className="flex flex-col items-center text-center mb-6">
                  <h3 className="text-2xl font-extrabold text-white">Create your account</h3>
                  <p className="text-xs text-emerald-400 mt-1 font-medium">People First. Progress Together.</p>
                </div>

                <form onSubmit={handleSignupSubmit} className="space-y-4">
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
              <div className="text-center py-4 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/20 text-[#00E599] rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white">Welcome to Teamora!</h3>
                <p className="text-sm text-emerald-200">
                  Your account has been created successfully. Your onboarding process has started.
                </p>
                <button
                  onClick={handleCloseModal}
                  className="w-full py-2.5 bg-[#00E599] hover:bg-[#00cc85] text-[#033022] font-bold text-sm rounded-lg transition-colors shadow-md"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
}
