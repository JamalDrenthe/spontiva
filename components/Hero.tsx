import React, { useEffect, useRef } from 'react';
import { HERO_CONTENT, INTRO_CONTENT, ICONS } from '../constants';
import { Sparkles, ArrowRight, UserCheck, ShieldCheck, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';
import Card3D from './Card3D';
import ScrollReveal from './ScrollReveal';

interface HeroProps {
  onSectionClick: (id: string) => void;
  onOpenAuth?: (mode: 'login' | 'register' | 'demo') => void;
}

const Hero: React.FC<HeroProps> = ({ onSectionClick, onOpenAuth }) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (bgRef.current) {
        const scrolled = window.scrollY;
        bgRef.current.style.transform = `translate3d(0, ${scrolled * 0.35}px, 0)`;
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
    handleScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-36 overflow-hidden bg-slate-50 min-h-screen flex flex-col justify-center">
      
      {/* 3D WebGL Canvas for interactive motion */}
      <ThreeCanvas className="opacity-80" />

      {/* Subtle Depth Background */}
      <div 
        ref={bgRef}
        className="absolute inset-0 z-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-7 text-center lg:text-left">
            
            <ScrollReveal direction="down">
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-teal-50/90 border border-teal-200/80 text-teal-800 text-xs font-bold uppercase tracking-wide mb-6 shadow-sm backdrop-blur-sm">
                <span className="w-2 h-2 bg-teal-500 rounded-full mr-2 animate-pulse"></span>
                <span>MEER DAN 60+ METHODES • TIME GAP CASHFLOW</span>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={100}>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight leading-[1.08] mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-teal-900">
                  {HERO_CONTENT.title}
                </span>
              </h1>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200}>
              <p className="text-base sm:text-xl text-slate-600 mb-8 leading-relaxed font-normal max-w-2xl">
                Spontiva overbrugt het tijdsverschil tussen jouw debiteuren en crediteuren. Krijg binnen 24 uur inzicht in vastzittend kapitaal en benut procesgerichte oplossingen zonder structurele leningen.
              </p>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={300}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                <button 
                  onClick={() => onSectionClick('contact')}
                  className="group inline-flex items-center justify-center px-8 py-4 border border-transparent text-sm sm:text-base font-bold rounded-2xl text-white bg-slate-900 hover:bg-slate-800 shadow-xl shadow-slate-900/25 hover:shadow-2xl hover:shadow-slate-900/35 transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
                >
                  <ICONS.Analysis className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  <span>{HERO_CONTENT.ctaPrimary}</span>
                </button>
                <button 
                  onClick={() => onSectionClick('contact')}
                  className="group inline-flex items-center justify-center px-8 py-4 border border-slate-200 text-sm sm:text-base font-bold rounded-2xl text-slate-700 bg-white/90 hover:bg-white shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-200/60 transition-all duration-300 hover:-translate-y-1 active:translate-y-0 backdrop-blur-sm"
                >
                  <ICONS.Request className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform text-teal-600" />
                  <span>{HERO_CONTENT.ctaSecondary}</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Account Portal Callout */}
            {onOpenAuth && (
              <ScrollReveal direction="up" delay={350}>
                <div className="mb-8 p-3 rounded-2xl bg-white/90 border border-slate-200/80 shadow-sm inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs backdrop-blur-sm">
                  <span className="text-slate-600 flex items-center gap-1 font-medium">
                    <Sparkles size={14} className="text-teal-600" />
                    Al klant of direct testen?
                  </span>
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="font-bold text-slate-900 hover:text-teal-600 underline underline-offset-2"
                  >
                    Inloggen via Google / E-mail
                  </button>
                  <span className="text-slate-300">•</span>
                  <button
                    onClick={() => onOpenAuth('demo')}
                    className="font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <UserCheck size={13} />
                    <span>Probeer Demo Accounts</span>
                  </button>
                </div>
              </ScrollReveal>
            )}

            {/* Microcopy with 3D feel */}
            <ScrollReveal direction="up" delay={400}>
              <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-3 text-xs sm:text-sm font-medium text-slate-500">
                <span className="flex items-center"><ICONS.Trust className="w-4 h-4 mr-2 text-teal-500" /> Geen traditionele leningen</span>
                <span className="flex items-center"><ICONS.Trust className="w-4 h-4 mr-2 text-teal-500" /> Procesgerichte analyse</span>
                <span className="flex items-center"><ICONS.Trust className="w-4 h-4 mr-2 text-teal-500" /> Binnen 24-48 uur inzetbaar</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Intro Box / 3D Card Interactive Display */}
          <div className="lg:col-span-5 relative">
            <ScrollReveal direction="right" delay={200}>
              <Card3D className="relative z-10 bg-white/90 backdrop-blur-md rounded-[2.5rem] p-8 sm:p-10 shadow-2xl shadow-slate-300/60 border border-slate-100">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-[2.5rem] rounded-tr-[2.5rem] -z-10"></div>
                
                {/* Floating mini badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                    Indicatieve Case: Facturatiegap
                  </span>
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
                    <TrendingUp size={14} className="text-emerald-500" /> +€ 35.000 Overbrugging
                  </span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 mb-3">Waarom Spontiva?</h2>
                <p className="text-slate-600 leading-relaxed mb-6 text-xs sm:text-sm">
                  {INTRO_CONTENT.text.substring(0, 160)}...
                </p>
                
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  {INTRO_CONTENT.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-teal-50 p-1.5 rounded-lg mr-3 shrink-0 text-teal-600">
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="text-xs sm:text-sm text-slate-800 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* 3D Visual Flow indication */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Debiteur: 45 dagen</span>
                  <span className="text-teal-600 font-bold">TGC-Interventie ➔ Direct inzetbaar</span>
                </div>
              </Card3D>
            </ScrollReveal>
            
            {/* Ambient subtle glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-teal-100/40 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-slate-100/50 rounded-full blur-3xl pointer-events-none"></div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;