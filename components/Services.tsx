import React from 'react';
import { SERVICES_CONTENT, ICONS } from '../constants';
import Card3D from './Card3D';
import ScrollReveal from './ScrollReveal';
import { ArrowRight, ShieldCheck, CheckCircle2, TrendingUp, Clock, Zap } from 'lucide-react';

interface ServicesProps {
  onSectionClick: (id: string) => void;
}

const Services: React.FC<ServicesProps> = ({ onSectionClick }) => {
  return (
    <section id="diensten" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <ScrollReveal direction="up">
          <div className="grid lg:grid-cols-2 gap-12 mb-16 items-end">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse"></span>
                <span>Onze Diensten</span>
              </div>
              <p className="text-3xl leading-tight font-extrabold text-slate-900 sm:text-4xl lg:text-5xl">
                Twee heldere routes naar <br className="hidden md:block"/> directe kasstroomruimte
              </p>
            </div>
            <div>
               <p className="text-lg sm:text-xl text-slate-500 leading-relaxed font-normal">
                Kies voor een strategische scan van je betaalcycli of activeer direct werkkapitaal op basis van goedgekeurde facturen.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Custom Bespoke FinTech Graphic Panel (replaces stock photo) */}
          <div className="lg:col-span-4 hidden lg:flex flex-col justify-between rounded-[2.5rem] bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950 text-white p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
             {/* Background glow */}
             <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/15 rounded-full blur-3xl pointer-events-none"></div>
             
             <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-950/80 border border-teal-800/60 text-teal-300 text-xs font-bold uppercase tracking-wide mb-6">
                   <Clock size={13} className="text-teal-400" />
                   <span>Het TGC-Principe</span>
                </div>
                <h4 className="text-2xl font-black text-white mb-2">Timing-Gap Overbrugging</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-6">
                  Hoe wij 30 tot 90 dagen debiteurentiming comprimeren naar 24 uur liquiditeit:
                </p>

                {/* Timeline visual steps */}
                <div className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-300">1. Factuur Verzonden</span>
                      <span className="text-[11px] text-slate-500 font-mono">Dag 0</span>
                    </div>
                    <div className="text-xs text-slate-400">Opdrachtgever hanteert 45-60 dagen betalingstermijn.</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-teal-950/60 border border-teal-500/40 shadow-lg shadow-teal-500/10">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-teal-300 flex items-center gap-1">
                        <Zap size={12} className="text-teal-400" />
                        2. Spontiva TGC Inzet
                      </span>
                      <span className="text-[11px] text-emerald-400 font-mono font-bold">Dag 1</span>
                    </div>
                    <div className="text-xs text-teal-100">100% werkkapitaal direct op jouw zakelijke rekening.</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-slate-300">3. Klant Voldoet Factuur</span>
                      <span className="text-[11px] text-slate-500 font-mono">Dag 45</span>
                    </div>
                    <div className="text-xs text-slate-400">Automatische afwikkeling, faciliteit sluit zonder restschuld.</div>
                  </div>
                </div>
             </div>

             <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center gap-2 text-xs text-teal-300 font-semibold">
                <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                <span>Geen balansschuld of persoonlijke borg</span>
             </div>
          </div>

          {/* Cards Column */}
          <div className="lg:col-span-8 grid gap-8 md:grid-cols-2">
            
            {/* Analysis Card */}
            <ScrollReveal direction="left" delay={100}>
              <Card3D className="group relative rounded-[2rem] border border-slate-200 bg-white p-8 lg:p-10 shadow-xl shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-200/70 transition-all duration-300 flex flex-col h-full justify-between">
                <div>
                  <div className="w-14 h-14 bg-teal-50 rounded-2xl flex items-center justify-center border border-teal-100 group-hover:scale-110 transition-transform duration-300 mb-6">
                    <ICONS.Analysis className="w-7 h-7 text-teal-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{SERVICES_CONTENT.analysis.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed text-sm">{SERVICES_CONTENT.analysis.description}</p>
                  
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mb-6 space-y-2">
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-wide">Jouw Voordeel:</p>
                    <p className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">{SERVICES_CONTENT.analysis.benefit}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => onSectionClick('contact')}
                  className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md group/btn"
                >
                  <span>Vraag analyse aan</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </Card3D>
            </ScrollReveal>

            {/* Request Card */}
            <ScrollReveal direction="right" delay={200}>
              <Card3D glowColor="rgba(20, 184, 166, 0.3)" className="group relative rounded-[2rem] border border-slate-800 bg-slate-950 p-8 lg:p-10 shadow-2xl shadow-slate-950/40 hover:shadow-slate-900/50 transition-all duration-300 overflow-hidden flex flex-col h-full justify-between">
                <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                
                <div>
                  <div className="w-14 h-14 bg-teal-950/80 rounded-2xl flex items-center justify-center border border-teal-800 group-hover:scale-110 transition-transform duration-300 relative z-10 mb-6">
                    <ICONS.Request className="w-7 h-7 text-teal-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 relative z-10">{SERVICES_CONTENT.request.title}</h3>
                  <p className="text-slate-300 mb-6 leading-relaxed text-sm relative z-10">{SERVICES_CONTENT.request.description}</p>
                  
                  <div className="bg-slate-900/80 backdrop-blur-sm p-5 rounded-xl border border-slate-800 mb-6 relative z-10 space-y-2">
                    <p className="text-xs font-bold text-teal-300 uppercase tracking-wide">Jouw Voordeel:</p>
                    <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">{SERVICES_CONTENT.request.benefit}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => onSectionClick('kosten')}
                  className="w-full py-3.5 px-6 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-teal-600/30 group/btn relative z-10"
                >
                  <span>Bereken & activeer direct</span>
                  <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
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
