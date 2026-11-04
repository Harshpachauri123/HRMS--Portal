import React from 'react';
import { 
  Users, 
  IndianRupee, 
  Clock, 
  Target, 
  Search, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';

export default function SecondPage() {
  // Features modules list with exact matching custom icons & styling from Image 14
  const hrModules = [
    {
      title: 'Workforce Management',
      icon: (
        <div className="relative flex flex-col items-center justify-center w-10 h-10 text-rose-400">
          <Users className="w-8 h-8" />
        </div>
      ),
      active: true,
    },
    {
      title: 'Payroll Management',
      icon: (
        <div className="relative w-10 h-10 rounded-full bg-rose-200/70 flex items-center justify-center text-rose-700">
          <IndianRupee className="w-5 h-5 font-bold" />
          <div className="absolute inset-0 border border-dashed border-slate-700 rounded-full animate-spin-slow"></div>
        </div>
      ),
      active: false,
    },
    {
      title: 'Attendance Management',
      icon: (
        <div className="w-10 h-10 rounded-full bg-rose-200/70 flex items-center justify-center text-rose-700 relative">
          <Clock className="w-5 h-5" />
        </div>
      ),
      active: false,
    },
    {
      title: 'Performance Management',
      icon: (
        <div className="w-10 h-10 rounded-full bg-rose-200/70 flex items-center justify-center text-rose-700 relative">
          <Target className="w-5 h-5" />
        </div>
      ),
      active: false,
    },
    {
      title: 'Recruitment Management',
      icon: (
        <div className="relative flex items-center justify-center w-10 h-10 text-rose-400">
          <Search className="w-7 h-7" />
        </div>
      ),
      active: false,
      badge: '5+',
    },
  ];

  return (
    <section className="w-full bg-[#FFF5F2] py-16 px-4 sm:px-6 lg:px-8 text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Your workplace. Your way.
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Your dependable guide to achieving freedom from manual HR work and building that perfect workplace you have always aspired to build.
          </p>

          <p className="mt-6 text-lg sm:text-xl font-bold">
            <span className="text-slate-900">1 Platform, 127 HR processes.</span>{' '}
            <span className="text-rose-400 font-semibold">As Comprehensive as it gets.</span>
          </p>
        </div>

        {/* HR MODULE CARDS GRID (Matching Image 14 Visuals) */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative">
          {hrModules.map((module, idx) => (
            <div
              key={idx}
              className={`relative rounded-2xl p-5 flex flex-col items-start justify-between min-h-[150px] transition-all duration-200 cursor-pointer ${
                module.active
                  ? 'bg-white shadow-xl ring-2 ring-rose-400/40'
                  : 'bg-white hover:shadow-md shadow-sm border border-slate-100'
              }`}
            >
              {/* Custom Icon Container */}
              <div className="mb-4">
                {module.icon}
              </div>

              {/* Module Title */}
              <span className="text-xs sm:text-sm font-bold text-slate-900 leading-snug">
                {module.title}
              </span>

              {/* Green Badge for 5+ Extra Modules */}
              {module.badge && (
                <span className="absolute -top-3 -right-2 bg-[#2D6A4F] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                  {module.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* BOTTOM FEATURE HERO CARD WITH MOBILE UI */}
        <div className="mt-10 bg-white rounded-3xl p-6 sm:p-10 border border-rose-100/60 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-2xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Manage your Employee Lifecycle like a breeze
              </h3>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Empowering your employees with a simplified journey from Onboarding to Exit
              </p>

              {/* Bullet Points */}
              <ul className="space-y-3 pt-2">
                <li className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 fill-rose-100" />
                  <span>Confirmation</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 fill-rose-100" />
                  <span>Separation</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm font-semibold text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-rose-500 fill-rose-100" />
                  <span>Workforce Insights</span>
                </li>
              </ul>

              {/* Know More Button */}
              <div className="pt-2">
                <a
                  href="#know-more"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#033022] hover:bg-[#054330] text-white text-sm font-semibold rounded-lg transition-colors shadow-md"
                >
                  <span>Know More</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right Side: Mockup Illustration with Teamora Mobile App Screen */}
            <div className="lg:col-span-6 flex justify-center items-center relative min-h-[300px]">
              <div className="absolute w-64 h-64 bg-rose-100 rounded-full blur-2xl opacity-60"></div>

              <div className="relative flex items-center justify-center gap-4 z-10">
                <div className="hidden sm:flex flex-col items-center">
                  <div className="w-36 h-48 bg-amber-100 rounded-2xl border border-amber-200 overflow-hidden shadow-md flex items-center justify-center text-xs font-semibold text-amber-800">
                    Team Photo
                  </div>
                </div>

                {/* Teamora Mobile Phone Container */}
                <div className="w-60 sm:w-64 bg-slate-900 p-2.5 rounded-[36px] shadow-2xl border-4 border-slate-800">
                  <div className="w-20 h-4 bg-slate-800 rounded-full mx-auto mb-2"></div>

                  <div className="bg-white rounded-[26px] overflow-hidden border border-slate-100 text-center pb-4">
                    <div className="bg-[#033022] text-white py-2.5 px-3 flex items-center justify-center gap-1">
                      <span className="text-xs font-black tracking-wide">Teamora</span>
                    </div>

                    <div className="p-4 space-y-3">
                      <p className="text-[11px] font-medium text-slate-600 leading-snug">
                        Would you like to confirm employee?
                      </p>

                      <div className="w-16 h-16 rounded-full bg-rose-100 border-2 border-rose-300 mx-auto flex items-center justify-center font-bold text-rose-700 text-sm shadow-sm">
                        NR
                      </div>

                      <p className="text-xs font-bold text-slate-800">Neha Roy</p>

                      <div className="space-y-1.5 pt-2">
                        <button className="w-full py-1.5 bg-[#033022] text-white text-[10px] font-semibold rounded-md shadow-sm">
                          Confirm
                        </button>
                        <button className="w-full py-1.5 bg-slate-100 text-slate-600 text-[10px] font-semibold rounded-md">
                          Reject
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
