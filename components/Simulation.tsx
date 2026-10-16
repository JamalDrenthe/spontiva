import React, { useState } from 'react';
import { COST_INFO, ICONS } from '../constants';
import ScrollReveal from './ScrollReveal';
import Card3D from './Card3D';
import { Sparkles, TrendingUp } from 'lucide-react';

const Simulation: React.FC = () => {
  const [amount, setAmount] = useState<number>(15000);
  const [days, setDays] = useState<number>(30);

  // Fictitious logic for demonstration purposes
  const rate = 0.02 + (days * 0.0004); 
  const cost = Math.round(amount * rate);
  const liquidity = amount;

  return (
    <section id="kosten" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white relative overflow-hidden">
      {/* Abstract Glowing Background Shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[140px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <ScrollReveal direction="left">
            <div className="lg:pr-12 space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-bold uppercase tracking-wider">
                <Sparkles size={13} className="mr-1.5" />
                Heldere TGC-Kostenstructuur
              </div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                {COST_INFO.title}
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed font-light">
                {COST_INFO.description}
              </p>
              <div className="flex items-center text-teal-400 font-bold bg-slate-800/60 w-fit px-5 py-3 rounded-2xl border border-slate-700/60 backdrop-blur-sm shadow-lg">
                <ICONS.Chart className="w-5 h-5 mr-3" />
                <span>Geen verborgen fees • Transparant vooraf</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Calculator Tool with Card3D */}
          <ScrollReveal direction="right">
            <Card3D glowColor="rgba(20, 184, 166, 0.25)" className="bg-white text-slate-900 rounded-[2.5rem] p-8 lg:p-10 shadow-2xl shadow-black/40 border border-slate-100">
              <h3 className="text-2xl font-black mb-8 border-b border-slate-100 pb-5 flex items-center justify-between">
                <span>Interactieve Rekentool</span>
                <span className="text-xs bg-teal-50 text-teal-700 px-3 py-1 rounded-full uppercase tracking-wider font-bold border border-teal-200">
                  Realtime Indicatie
                </span>
              </h3>
              
              {/* Sliders */}
              <div className="space-y-8 mb-8">
                <div>
                  <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                    <span>Benodigde liquiditeit</span>
                    <span className="text-teal-600 font-black text-lg">€ {amount.toLocaleString('nl-NL')}</span>
                  </label>
                  <input
                    type="range"
                    min="2500"
                    max="100000"
                    step="2500"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none"
                  />
                  <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                    <span>€ 2.500</span>
                    <span>€ 100.000</span>
                  </div>
                </div>

                <div>
                  <label className="flex justify-between text-sm font-bold text-slate-700 mb-3">
                    <span>Overbruggingsperiode (Time Gap)</span>
                    <span className="text-teal-600 font-black text-lg">{days} dagen</span>
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
                    <span>90 dagen</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Visual Ratio Bar */}
              <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Vrijgemaakte Liquiditeit</span>
                  <span>Geschatte Fee Ratio ({((cost / amount) * 100).toFixed(1)}%)</span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
                  <div className="bg-teal-500 h-full rounded-full transition-all duration-300" style={{ width: `${Math.max(10, 100 - (cost/amount * 100))}%` }}></div>
                  <div className="bg-slate-400 h-full transition-all duration-300" style={{ width: `${(cost/amount * 100)}%` }}></div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-4 shadow-inner relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                 
                 <div className="flex justify-between items-center relative z-10">
                    <span className="text-slate-300 font-medium text-sm">Directe Kasstroomruimte:</span>
                    <span className="text-2xl sm:text-3xl font-black text-white">€ {liquidity.toLocaleString('nl-NL')}</span>
                 </div>
                 
                 <div className="flex justify-between items-center pt-3 border-t border-slate-800 relative z-10">
                    <span className="text-slate-300 font-medium text-sm">Indicatieve Kosten (eenmalig):</span>
                    <span className="text-2xl font-black text-teal-400">€ {cost.toLocaleString('nl-NL')}</span>
                 </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-4 text-center italic">
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