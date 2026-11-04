import React from 'react';
import { 
  Smartphone, 
  ShieldCheck, 
  Sparkles, 
  Layers, 
  Cpu, 
  PiggyBank 
} from 'lucide-react';

export default function ThirdPage() {
  const valueProps = [
    {
      title: 'Cloud & Mobile Ready',
      description: "Award winning mobile app that's used by 5 lakh+ users in India",
      icon: <Smartphone className="w-6 h-6 text-[#00E599]" />,
    },
    {
      title: 'Secure & Reliable',
      description: 'Powered with Microsoft Azure, GDPR, ISO27001 Compliant: Superior data security',
      icon: <ShieldCheck className="w-6 h-6 text-[#00E599]" />,
    },
    {
      title: 'Simple & Intuitive',
      description: 'Powered by InboxforHR™, a simple interface you don\'t need a trainer for.',
      icon: <Sparkles className="w-6 h-6 text-[#00E599]" />,
    },
    {
      title: 'Comprehensive & Configurable',
      description: 'The complete hire-to-retire suite for your people function',
      icon: <Layers className="w-6 h-6 text-[#00E599]" />,
    },
    {
      title: 'Easy To Integrate',
      description: 'Connect with any software using open APIs',
      icon: <Cpu className="w-6 h-6 text-[#00E599]" />,
    },
    {
      title: 'Value For Money',
      description: 'Priced competitively with no hidden features costs',
      icon: <PiggyBank className="w-6 h-6 text-[#00E599]" />,
    },
  ];

  return (
    <section className="w-full bg-[#FAF9F5] py-20 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* Main Heading with Teamora Branding */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Join 2,500+ Leading Brands: <span className="text-[#033022]">Discover Why</span>
            <br className="hidden sm:inline" />
            <span className="text-[#033022] font-black"> Teamora </span>
            <span className="text-[#00B074]">is the #1 HRMS</span>
          </h2>
        </div>

        {/* 3x2 Grid Layout with Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-emerald-900/10 border-t border-b border-emerald-900/10">
          
          {/* Top Row / First 3 Items */}
          {valueProps.slice(0, 3).map((item, idx) => (
            <div 
              key={idx} 
              className="p-8 sm:p-10 flex flex-col justify-start space-y-3 hover:bg-emerald-50/40 transition-colors duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-[#033022] flex items-center justify-center shadow-md mb-2">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}

        </div>

        {/* Bottom Row / Next 3 Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-emerald-900/10 border-b border-emerald-900/10">
          {valueProps.slice(3, 6).map((item, idx) => (
            <div 
              key={idx} 
              className="p-8 sm:p-10 flex flex-col justify-start space-y-3 hover:bg-emerald-50/40 transition-colors duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-[#033022] flex items-center justify-center shadow-md mb-2">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                {item.title}
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
