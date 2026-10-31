import React, { useState } from 'react';
import { COST_INFO, ICONS } from '../constants';
import ScrollReveal from './ScrollReveal';
import Card3D from './Card3D';
import { Sparkles, TrendingUp, ArrowRight, ShieldCheck, Clock, Zap } from 'lucide-react';

interface SimulationProps {
  onApply?: (amount: number, days: number) => void;
}

const Simulation: React.FC<SimulationProps> = ({ onApply }) => {
  const [amount, setAmount] = useState<number>(15000);
  const [days, setDays] = useState<number>(30);

  // Transparent indicative TGC fee formula
  const rate = 0.018 + (days * 0.00035); 
  const cost = Math.round(amount * rate);
  const netLiquidity = amount;

  const handleApplyClick = () => {
    if (onApply) {
      onApply(amount, days);
    } else {
      const contactEl = document.getElementById('contact');
      if (contactEl) {
        contactEl.scrollIntoView({ behavior: 'smooth' });
        // Set message field if present
        const msgField = document.getElementById('message') as HTMLTextAreaElement | null;
        if (msgField) {
          msgField.value = `Interesse in overbrugging van € ${amount.toLocaleString('nl-NL')} voor ${days} dagen.`;
        }
      }
    }
  };

  return (
    <section id="kosten" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white relative overflow-hidden">
      {/* Abstract Glowing Background Shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <ScrollReveal direction="left">
            <div className="lg:pr-12 space-y-6">
              <div className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={13} className="mr-1.5 text-teal-400" />
                Heldere TGC-Kostenstructuur
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
                {COST_INFO.title}
              </h2>
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-light">
                {COST_INFO.description}
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-center text-sm font-semibold text-slate-200">
                  <ShieldCheck className="w-5 h-5 mr-3 text-emerald-400 shrink-0" />
                  <span>Geen afsluitprovisie, geen verborgen administratiekosten</span>
                </div>
                <div className="flex items-center text-sm font-semibold text-slate-200">
                  <Clock className="w-5 h-5 mr-3 text-teal-400 shrink-0" />
                  <span>100% werkkapitaal uitbetaald binnen 24–48 uur</span>
                </div>
                <div className="flex items-center text-sm font-semibold text-slate-200">
                  <Zap className="w-5 h-5 mr-3 text-emerald-400 shrink-0" />
                  <span>Faciliteit stopt automatisch zodra je debiteur betaalt</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Calculator Tool with Card3D */}
          <ScrollReveal direction="right">
            <Card3D glowColor="rgba(20, 184, 166, 0.25)" className="bg-white text-slate-900 rounded-[2.5rem] p-6 sm:p-10 shadow-2xl shadow-black/40 border border-slate-100">
              <div className="flex items-center justify-between mb-8 pb-5 border-b border-slate-100">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  Werkkapitaal Calculator
                </h3>
                <span className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-teal-200">
                  Realtime Indicatie
                </span>
              </div>
              
              {/* Sliders */}
              <div className="space-y-8 mb-8">
                <div>
                  <label className="flex justify-between items-center text-sm font-bold text-slate-700 mb-3">
                    <span>Benodigde overbrugging</span>
                    <span className="text-teal-600 font-black text-xl">€ {amount.toLocaleString('nl-NL')}</span>
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="2500"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                    <span>€ 5.000</span>
                    <span>€ 50.000</span>
                    <span>€ 100.000</span>
                  </div>
                </div>

                <div>
                  <label className="flex justify-between items-center text-sm font-bold text-slate-700 mb-3">
                    <span>Betaaltermijn (Time Gap)</span>
                    <span className="text-teal-600 font-black text-xl">{days} dagen</span>
                  </label>
                  <input
                    type="range"
                    min="14"
                    max="90"
                    step="1"
                    value={days}
                    onChange={(e) => setDays(Number(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                    <span>14 dagen</span>
                    <span>45 dagen</span>
                    <span>90 dagen</span>
                  </div>
                </div>
              </div>

              {/* Results Box */}
              <div className="bg-slate-950 text-white rounded-2xl p-6 space-y-4 shadow-inner relative overflow-hidden mb-6">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/15 rounded-full blur-2xl pointer-events-none"></div>
                 
                 <div className="flex justify-between items-center relative z-10">
                    <span className="text-slate-300 font-medium text-xs sm:text-sm">Directe Liquiditeit (100%):</span>
                    <span className="text-2xl sm:text-3xl font-black text-white">€ {netLiquidity.toLocaleString('nl-NL')}</span>
                 </div>

                 <div className="flex justify-between items-center relative z-10 text-xs sm:text-sm">
                    <span className="text-slate-400">Cashflow versnelling:</span>
                    <span className="text-emerald-400 font-bold">{days} dagen sneller op rekening</span>
                 </div>
                 
                 <div className="flex justify-between items-center pt-3 border-t border-slate-800 relative z-10">
                    <span className="text-slate-300 font-medium text-xs sm:text-sm">Vaste Indicatieve Fee:</span>
                    <div className="text-right">
                      <span className="text-xl sm:text-2xl font-black text-teal-400">€ {cost.toLocaleString('nl-NL')}</span>
                      <span className="block text-[10px] text-slate-400 font-medium">({((cost / amount) * 100).toFixed(1)}% over de gehele looptijd)</span>
                    </div>
                 </div>
              </div>

              {/* Action Button: Convert calculation into immediate application */}
              <button
                onClick={handleApplyClick}
                className="w-full py-4 px-6 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-teal-600/25 hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Vraag deze € {amount.toLocaleString('nl-NL')} overbrugging direct aan</span>
                <ArrowRight size={18} />
              </button>

              <p className="text-[11px] text-slate-400 mt-4 text-center">
                {COST_INFO.disclaimer}
              </p>
            </Card3D>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default Simulation;
