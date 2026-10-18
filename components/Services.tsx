import React, { useEffect, useRef } from 'react';
import { SERVICES_CONTENT, ICONS } from '../constants';
import Card3D from './Card3D';
import ScrollReveal from './ScrollReveal';

interface ServicesProps {
  onSectionClick: (id: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onSectionClick }) => {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        parallaxRef.current.style.transform = `scale(1.1) translate3d(0, ${(scrolled * 0.08) - 60}px, 0)`;
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
    <section id="diensten" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="grid lg:grid-cols-2 gap-12 mb-16 items-end">
            <div>
              <h2 className="text-sm font-bold text-teal-600 tracking-wider uppercase mb-3">Onze Diensten</h2>
              <p className="text-3xl leading-tight font-extrabold text-slate-900 sm:text-4xl lg:text-5xl transition-all duration-300 hover:translate-x-2 hover:text-slate-800 cursor-default origin-left">
                Twee routes naar <br className="hidden md:block"/> inzicht en ruimte
              </p>
            </div>
            <div>
               <p className="text-xl text-slate-500 leading-relaxed">
                Kies voor een grondige analyse van je geldstromen of dien direct een aanvraag in voor TGC-methodes.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Image Column */}
          <div className="lg:col-span-4 hidden lg:block relative rounded-[2.5rem] overflow-hidden min-h-[500px] shadow-2xl">
             <div 
                ref={parallaxRef}
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url("https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop")',
                  willChange: 'transform'
                }}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent flex flex-col justify-end p-8">
                <span className="text-white font-bold text-xl">Feitelijke Procesanalyse</span>
                <p className="text-slate-300 mt-2 text-sm">Inzicht in waar in facturatie- en inkoopcycli tijdelijke liquiditeitsruimte ontstaat.</p>
             </div>
          </div>

          {/* Cards Column */}
          <div className="lg:col-span-8 grid gap-8 md:grid-cols-2">
            
            {/* Analysis Card */}
            <ScrollReveal direction="left" delay={100}>
              <Card3D className="group relative rounded-[2rem] border border-slate-200 bg-white p-8 lg:p-10 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/70 transition-all duration-300 flex flex-col h-full">
                <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center border border-teal-100 group-hover:scale-110 transition-transform duration-300 mb-6">
                  <ICONS.Analysis className="w-7 h-7 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{SERVICES_CONTENT.analysis.title}</h3>
                <p className="text-slate-600 mb-6 flex-grow">{SERVICES_CONTENT.analysis.description}</p>
                
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mb-6">
                  <p className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-1">Voordeel</p>
                  <p className="text-sm text-slate-700 font-medium">{SERVICES_CONTENT.analysis.benefit}</p>
                </div>
                
                <button 
                  onClick={() => onSectionClick('contact')}
                  className="inline-flex items-center text-teal-700 font-bold hover:text-teal-800 transition-colors group/link mt-auto"
                >
                  Vraag analyse aan <span aria-hidden="true" className="ml-2 group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                </button>
              </Card3D>
            </ScrollReveal>

            {/* Request Card */}
            <ScrollReveal direction="right" delay={200}>
              <Card3D glowColor="rgba(20, 184, 166, 0.3)" className="group relative rounded-[2rem] border border-slate-800 bg-slate-900 p-8 lg:p-10 shadow-2xl shadow-slate-900/30 hover:shadow-slate-900/40 transition-all duration-300 overflow-hidden flex flex-col h-full">
                <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center border border-slate-700 group-hover:scale-110 transition-transform duration-300 relative z-10 mb-6">
                  <ICONS.Request className="w-7 h-7 text-teal-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{SERVICES_CONTENT.request.title}</h3>
                <p className="text-slate-300 mb-6 flex-grow relative z-10">{SERVICES_CONTENT.request.description}</p>
                
                <div className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-xl border border-slate-700 mb-6 relative z-10">
                  <p className="text-xs font-bold text-white uppercase tracking-wide mb-1">Voordeel</p>
                  <p className="text-sm text-slate-300 font-medium">{SERVICES_CONTENT.request.benefit}</p>
                </div>
                
                <button 
                  onClick={() => onSectionClick('contact')}
                  className="inline-flex items-center text-teal-400 font-bold hover:text-teal-300 transition-colors group/link relative z-10 mt-auto"
                >
                  Start direct een aanvraag <span aria-hidden="true" className="ml-2 group-hover/link:translate-x-1 transition-transform">&rarr;</span>
                </button>
              </Card3D>
            </ScrollReveal>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;