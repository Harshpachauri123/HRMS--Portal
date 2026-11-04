"use client";

import React, { useState } from 'react';
import { User, Mail, Phone, MessageSquare, Send, CheckCircle2, MapPin, Clock } from 'lucide-react';

// Teamora Logo Component
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
          fill="url(#teamora_contact_grad)"
        />
        <defs>
          <linearGradient id="teamora_contact_grad" x1="0%" y1="0%" x2="100%" y2="100%">
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

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.phone && formData.message) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-[#033022] text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      
      {/* Background Subtle Accent Glows */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex justify-center mb-4">
            <TeamoraLogo />
          </div>
          <p className="text-xs uppercase tracking-widest text-[#00E599] font-bold mb-2">
            Get In Touch With Us
          </p>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Let's Talk About Your Workplace Needs
          </h1>
          <p className="mt-4 text-emerald-200/80 text-sm sm:text-base leading-relaxed">
            Have questions about Teamora HRMS? Fill out the form below and our HR automation experts will get back to you shortly.
          </p>
        </div>

        {/* Main 2-Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Left Column: Contact Info & Value Highlights */}
          <div className="lg:col-span-5 bg-[#022419] border border-emerald-900/80 rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-extrabold text-white mb-2">Contact Information</h3>
                <p className="text-xs text-emerald-300/80">
                  We are here to support your HR journey every step of the way.
                </p>
              </div>

              {/* Info Items */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#033022] border border-emerald-800 flex items-center justify-center text-[#00E599] flex-shrink-0 shadow-sm">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Email Us</h4>
                    <p className="text-sm font-semibold text-white mt-1">support@teamora.com</p>
                    <p className="text-xs text-emerald-200/60">Fast response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#033022] border border-emerald-800 flex items-center justify-center text-[#00E599] flex-shrink-0 shadow-sm">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Call Us</h4>
                    <p className="text-sm font-semibold text-white mt-1">+91 (562) 456-7890</p>
                    <p className="text-xs text-emerald-200/60">Mon-Fri from 9am to 6pm IST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#033022] border border-emerald-800 flex items-center justify-center text-[#00E599] flex-shrink-0 shadow-sm">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Our Office</h4>
                    <p className="text-sm font-semibold text-white mt-1">Agra, Uttar Pradesh, India</p>
                    <p className="text-xs text-emerald-200/60">STPI IT Park, Shastri Puram</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Support Badge */}
            <div className="mt-10 pt-6 border-t border-emerald-900/60 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#00E599]" />
              <span className="text-xs text-emerald-200 font-medium">
                24/7 Priority Support for Enterprise Clients
              </span>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#022419] border border-emerald-900/80 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
            
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-2xl font-extrabold text-white mb-6">Send Us a Message</h3>

                {/* Name Input */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-2">
                    Full Name <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-500">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      className="w-full pl-11 pr-4 py-3 bg-[#033022] border border-emerald-800/80 rounded-xl text-white placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-[#00E599] text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-2">
                    Work Email <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-500">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@company.com"
                      className="w-full pl-11 pr-4 py-3 bg-[#033022] border border-emerald-800/80 rounded-xl text-white placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-[#00E599] text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-2">
                    Contact Number <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-emerald-500">
                      <Phone className="w-5 h-5" />
                    </div>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full pl-11 pr-4 py-3 bg-[#033022] border border-emerald-800/80 rounded-xl text-white placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-[#00E599] text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="block text-xs font-semibold text-emerald-200 mb-2">
                    Your Message <span className="text-rose-400">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3.5 left-3.5 pointer-events-none text-emerald-500">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us how we can help you..."
                      className="w-full pl-11 pr-4 py-3 bg-[#033022] border border-emerald-800/80 rounded-xl text-white placeholder-emerald-700 focus:outline-none focus:ring-2 focus:ring-[#00E599] text-sm transition-all"
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl font-black text-sm text-[#033022] bg-[#00E599] hover:bg-[#00cc85] transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Success State Display */
              <div className="text-center py-12 space-y-5">
                <div className="w-20 h-20 bg-emerald-500/20 text-[#00E599] rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-12 h-12" />
                </div>
                <h3 className="text-3xl font-extrabold text-white">Message Sent Successfully!</h3>
                <p className="text-sm text-emerald-200/80 max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out to Teamora. Our team will review your enquiry and respond to <span className="text-white font-bold">{formData.email}</span> within 24 hours.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-[#033022] border border-emerald-700 hover:bg-emerald-900/60 text-white font-bold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
