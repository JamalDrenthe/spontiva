import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

interface SimulatorTabProps {
  onApply: () => void;
}

const SimulatorTab: React.FC<SimulatorTabProps> = ({ onApply }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(35000);
  const [debtorDays, setDebtorDays] = useState<number>(50);
  const [creditorDays, setCreditorDays] = useState<number>(14);

  // Time gap calculation
  const gapDays = Math.max(0, debtorDays - creditorDays);
  // Estimated cashflow strain / liquidity locked up
  const dailyFlow = monthlyRevenue / 30;
  const lockedLiquidity = Math.round(dailyFlow * gapDays);
  // Estimated Spontiva TGC intervention capacity (e.g. 85% advance)
  const availableTGC = Math.round(lockedLiquidity * 0.85);

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Time Gap Cashflow Simulator</h1>
        <p className="text-xs text-slate-500">
          Bereken hoeveel liquiditeit vastzit in je betaalcyclus en hoeveel werkkapitaal vrijgemaakt kan worden.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls Column */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Calculator size={16} className="text-teal-600" />
            <span>Parameters Invoeren</span>
          </h2>

          {/* Slider 1: Omzet */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700">Maandelijkse Facturatie / Omzet</label>
              <span className="text-sm font-black text-slate-900">€ {monthlyRevenue.toLocaleString('nl-NL')}</span>
            </div>
            <input
              type="range"
              min="5000"
              max="200000"
              step="5000"
              value={monthlyRevenue}
              onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>€ 5.000</span>
              <span>€ 200.000</span>
            </div>
          </div>

          {/* Slider 2: Debiteur Termijn */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700">Gemiddelde Betaaltermijn Klanten (Debiteuren)</label>
              <span className="text-sm font-black text-slate-900">{debtorDays} dagen</span>
            </div>
            <input
              type="range"
              min="14"
              max="90"
              step="1"
              value={debtorDays}
              onChange={(e) => setDebtorDays(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>14 dagen</span>
              <span>90 dagen</span>
            </div>
          </div>

          {/* Slider 3: Crediteur Termijn */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700">Betalingstermijn Leveranciers & Vaste Lasten</label>
              <span className="text-sm font-black text-slate-900">{creditorDays} dagen</span>
            </div>
            <input
              type="range"
              min="7"
              max="60"
              step="1"
              value={creditorDays}
              onChange={(e) => setCreditorDays(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>7 dagen</span>
              <span>60 dagen</span>
            </div>
          </div>

          {/* Timeline bar */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-bold text-slate-800 block mb-2">Visuele Gap Timing:</span>
            <div className="h-6 w-full bg-slate-100 rounded-xl overflow-hidden flex relative">
              <div 
                className="bg-blue-500 h-full flex items-center justify-center text-[10px] text-white font-bold"
                style={{ width: `${Math.min(100, (creditorDays / debtorDays) * 100)}%` }}
              >
                Inkoop
              </div>
              <div 
                className="bg-rose-400 h-full flex items-center justify-center text-[10px] text-white font-bold"
                style={{ width: `${Math.max(0, 100 - (creditorDays / debtorDays) * 100)}%` }}
              >
                Tijdsgat ({gapDays}d)
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              Rood gearceerd gedeelte toont de periode waarin rekeningen betaald moeten worden vóórdat jouw klanten betalen.
            </p>
          </div>
        </div>

        {/* Calculation Result Column */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between border border-slate-800">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles size={14} />
              <span>Simulatie Uitkomst</span>
            </div>

            <div className="space-y-1">
              <span className="text-xs text-slate-400">Time Gap (Liquiditeitsgat)</span>
              <div className="text-3xl font-extrabold text-white">{gapDays} Dagen</div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-400">Vastzittend Kapitaal in de Gap</span>
              <div className="text-2xl font-bold text-rose-300">
                € {lockedLiquidity.toLocaleString('nl-NL')}
              </div>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800">
              <span className="text-xs text-teal-400 font-bold">Vrij te maken met Spontiva TGC</span>
              <div className="text-3xl font-black text-teal-400">
                € {availableTGC.toLocaleString('nl-NL')}
              </div>
              <p className="text-[11px] text-slate-300">
                Direct inzetbare liquide middelen zonder langlopende schuldverplichting.
              </p>
            </div>
          </div>

          <div className="pt-6 mt-6 border-t border-slate-800 space-y-3">
            <button
              onClick={onApply}
              className="w-full py-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-0.5"
            >
              <span>Zet om in TGC-Aanvraag</span>
              <ArrowRight size={14} />
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              Indicatieve berekening. Definitieve toewijzing na controle van facturen.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default SimulatorTab;
