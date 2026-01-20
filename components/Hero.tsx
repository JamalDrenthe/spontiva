import React, { useEffect, useRef } from 'react';
import { HERO_CONTENT, INTRO_CONTENT, ICONS } from '../constants';

interface HeroProps {
  onSectionClick: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onSectionClick }) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (bgRef.current) {
        const scrolled = window.scrollY;
        bgRef.current.style.transform = `translate3d(0, ${scrolled * 0.5}px, 0)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    // Initial position
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative pt-32 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 min-h-screen flex flex-col justify-center">
      {/* Parallax Background Image */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform'
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm">
              <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
              MEER DAN 60+ METHODES
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900">
                {HERO_CONTENT.title}
              </span>
            </h1>
            
            {HERO_CONTENT.subtitle && (
              <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
                {HERO_CONTENT.subtitle}
              </p>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
              <button 
                onClick={() => onSectionClick('contact')}
                className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-bold rounded-2xl text-white bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/20 hover:shadow-2xl hover:shadow-slate-900/30 transition-all duration-300 hover:-translate-y-1"
              >
                <ICONS.Analysis className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                {HERO_CONTENT.ctaPrimary}
              </button>
              <button 
                onClick={() => onSectionClick('contact')}
                className="group inline-flex items-center justify-center px-8 py-4 border border-slate-200 text-base font-bold rounded-2xl text-slate-700 bg-white hover:bg-slate-50 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1"
              >
                <ICONS.Request className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform text-teal-600" />
                {HERO_CONTENT.ctaSecondary}
              </button>
            </div>

            {/* Microcopy */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-sm font-medium text-slate-500">
              <span className="flex items-center"><ICONS.Trust className="w-4 h-4 mr-2 text-teal-500" /> Geen traditionele leningen</span>
              <span className="flex items-center"><ICONS.Trust className="w-4 h-4 mr-2 text-teal-500" /> Procesgerichte analyse</span>
              <span className="flex items-center"><ICONS.Trust className="w-4 h-4 mr-2 text-teal-500" /> Tijdelijke oplossingen</span>
            </div>
          </div>

          {/* Intro Box / Image Combo */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-[2rem] p-8 shadow-2xl shadow-slate-200/50 border border-slate-100">
               <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-[2rem] rounded-tr-[2rem] -z-10"></div>
               
               <h2 className="text-2xl font-bold text-slate-900 mb-4 inline-block transition-transform duration-300 hover:scale-105 hover:text-teal-700 cursor-default">Waarom Spontiva?</h2>
               <p className="text-slate-600 leading-relaxed mb-6">
                 {INTRO_CONTENT.text.substring(0, 150)}...
               </p>
               
               <div className="space-y-3">
                  {INTRO_CONTENT.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-teal-50 p-1.5 rounded-lg mr-3 shrink-0">
                        <ICONS.Process className="w-4 h-4 text-teal-600" />
                      </div>
                      <span className="text-sm text-slate-800 font-medium">{benefit}</span>
                    </div>
                  ))}
               </div>
            </div>
            
            {/* Decorative floaty elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-teal-200/20 rounded-full blur-3xl animate-blob"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-200/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;