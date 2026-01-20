import React, { useState } from 'react';
import { COST_INFO, ICONS } from '../constants';

const Simulation: React.FC = () => {
  const [amount, setAmount] = useState<number>(10000);
  const [days, setDays] = useState<number>(30);

  // Fictitious logic for demonstration purposes
  const rate = 0.02 + (days * 0.0005); 
  const cost = Math.round(amount * rate);
  const liquidity = amount;

  return (
    <section id="kosten" className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:pr-12">
            <h2 className="text-4xl font-extrabold mb-8 tracking-tight text-white inline-block transition-transform duration-300 hover:scale-105 hover:text-teal-400 cursor-default origin-left">{COST_INFO.title}</h2>
            <p className="text-xl text-slate-300 leading-relaxed mb-10 font-light">
              {COST_INFO.description}
            </p>
            <div className="flex items-center text-teal-400 font-bold bg-slate-800/50 w-fit px-5 py-3 rounded-xl border border-slate-700/50 backdrop-blur-sm">
              <ICONS.Chart className="w-5 h-5 mr-3" />
              <span>Transparant en vooraf duidelijk</span>
            </div>
          </div>

          {/* Calculator Tool */}
          <div className="bg-white text-slate-900 rounded-[2rem] p-8 lg:p-10 shadow-2xl shadow-black/20 border border-slate-100/10">
            <h3 className="text-2xl font-bold mb-8 border-b border-slate-100 pb-6 flex items-center justify-between">
              Voorbeeldsimulatie
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full uppercase tracking-wider font-semibold">Indicatie</span>
            </h3>
            
            {/* Sliders */}
            <div className="space-y-10 mb-10">
              <div>
                <label className="flex justify-between text-base font-semibold text-slate-700 mb-4">
                  <span>Benodigde liquiditeit</span>
                  <span className="text-teal-600 font-bold">€ {amount.toLocaleString()}</span>
                </label>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                  <span>€ 1.000</span>
                  <span>€ 50.000</span>
                </div>
              </div>

              <div>
                <label className="flex justify-between text-base font-semibold text-slate-700 mb-4">
                  <span>Periode (Dagen)</span>
                  <span className="text-teal-600 font-bold">{days} dagen</span>
                </label>
                <input
                  type="range"
                  min="15"
                  max="90"
                  step="5"
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-3 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-medium">
                  <span>15 dagen</span>
                  <span>90 dagen</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-slate-50 rounded-2xl p-6 space-y-4 border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-20 h-20 bg-teal-100 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <div className="flex justify-between items-center relative z-10">
                  <span className="text-slate-600 font-medium">Vrijgemaakte cashflow</span>
                  <span className="text-2xl font-extrabold text-slate-900">€ {liquidity.toLocaleString()}</span>
               </div>
               <div className="flex justify-between items-center pt-4 border-t border-slate-200 relative z-10">
                  <span className="text-slate-600 font-medium">Indicatieve kosten (totaal)</span>
                  <span className="text-2xl font-extrabold text-teal-600">€ {cost.toLocaleString()}</span>
               </div>
            </div>

            <p className="text-xs text-slate-400 mt-6 text-center italic">
              {COST_INFO.disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Simulation;