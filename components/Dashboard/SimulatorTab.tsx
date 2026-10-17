import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp, CheckCircle2, ShieldCheck, Sparkles, Percent, DollarSign, Clock, Zap } from 'lucide-react';
import { DashboardTab } from './DashboardLayout';

interface SimulatorTabProps {
  onApply: (type: 'analyse' | 'aanvraag') => void;
  onNavigate: (tab: DashboardTab) => void;
}

const SimulatorTab: React.FC<SimulatorTabProps> = ({ onApply, onNavigate }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(45000);
  const [debtorDays, setDebtorDays] = useState<number>(50);
  const [creditorDays, setCreditorDays] = useState<number>(14);
  const [skontoDiscount, setSkontoDiscount] = useState<number>(2.0); // % supplier early payment discount
  const [monthlySupplierPurchases, setMonthlySupplierPurchases] = useState<number>(20000);

  // Time gap calculation
  const gapDays = Math.max(0, debtorDays - creditorDays);
  
  // Daily flow and locked liquidity
  const dailyFlow = monthlyRevenue / 30;
  const lockedLiquidity = Math.round(dailyFlow * gapDays);
  
  // Spontiva TGC intervention capacity (85% advance)
  const availableTGC = Math.round(lockedLiquidity * 0.85);

  // Fee calculation (indicative fixed fee of ~1.4% flat)
  const fixedTgcFee = Math.round(availableTGC * 0.014);

  // Skonto savings on purchases (e.g. 2% of purchases paid on Day 1)
  const skontoSavings = Math.round(monthlySupplierPurchases * (skontoDiscount / 100));

  // Net benefit / cost
  const netFinancialResult = skontoSavings - fixedTgcFee;

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Calculator size={14} />
            <span>Financiële Modellering & Scenario Planner</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Time Gap Cashflow Simulator
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Bereken exact hoeveel liquiditeit momenteel klem zit in je facturatiecyclus en ontdek hoe de inzet van een TGC-methode (zoals Skonto-arbitrage of Flex-Bridge) je werkkapitaal direct kan versterken.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Controls Column (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Calculator size={16} className="text-teal-600" />
              <span>Variabelen Instellen</span>
            </h2>
            <span className="text-xs text-slate-400">Interactieve berekening</span>
          </div>

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
              <span>€ 5.000 / mnd</span>
              <span>€ 200.000 / mnd</span>
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
              <span>90 dagen wachttijd</span>
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
              max="45"
              step="1"
              value={creditorDays}
              onChange={(e) => setCreditorDays(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>7 dagen</span>
              <span>45 dagen eis leverancier</span>
            </div>
          </div>

          {/* Slider 4: Leverancierskorting (Skonto Arbitrage) */}
          <div className="pt-2 border-t border-slate-100">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex items-center gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Mogelijke Leverancierskorting bij Dag-1 Betaling (Skonto)</label>
                <span className="text-[10px] bg-emerald-50 text-emerald-700 px-1.5 py-0.2 rounded font-bold">Arbitrage</span>
              </div>
              <span className="text-sm font-black text-emerald-600">{skontoDiscount.toFixed(1)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="3"
              step="0.5"
              value={skontoDiscount}
              onChange={(e) => setSkontoDiscount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>0% (geen korting)</span>
              <span>3% contantkorting</span>
            </div>
          </div>

          {/* Slider 5: Maandelijkse inkoop */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-slate-700">Maandelijkse Inkoop bij Leveranciers</label>
              <span className="text-sm font-black text-slate-900">€ {monthlySupplierPurchases.toLocaleString('nl-NL')}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="100000"
              step="2000"
              value={monthlySupplierPurchases}
              onChange={(e) => setMonthlySupplierPurchases(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-700"
            />
          </div>

        </div>

        {/* Results Column (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-7 rounded-2xl text-white shadow-xl border border-slate-800 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">Uitkomst Simulatie</span>
              <span className="text-xs bg-white/10 px-2 py-0.5 rounded-full text-slate-300">
                Gap: {gapDays} dagen
              </span>
            </div>

            {/* Metric 1: Vastzittende liquiditeit */}
            <div className="space-y-1">
              <span className="text-xs text-slate-400">Vastzittend Werkkapitaal in Gap:</span>
              <div className="text-2xl font-black text-white">
                € {lockedLiquidity.toLocaleString('nl-NL')}
              </div>
            </div>

            {/* Metric 2: Beschikbare TGC Ruimte */}
            <div className="bg-white/10 p-4 rounded-xl border border-white/15 space-y-1">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider block">
                Direct Ontgrendelbare TGC-Ruimte
              </span>
              <div className="text-3xl font-black text-teal-300">
                € {availableTGC.toLocaleString('nl-NL')}
              </div>
              <span className="text-[11px] text-slate-300 block">
                Direct beschikbaar voor salarissen, leveranciers & groei
              </span>
            </div>

            {/* Financial Breakdown */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Indicatieve TGC-vergoeding (vast ~1.4%):</span>
                <span className="font-semibold text-rose-300">-€ {fixedTgcFee.toLocaleString('nl-NL')}</span>
              </div>
              {skontoDiscount > 0 && (
                <div className="flex justify-between text-emerald-400 font-semibold">
                  <span>Verdiende leverancierskorting (Skonto):</span>
                  <span>+€ {skontoSavings.toLocaleString('nl-NL')}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm pt-2 border-t border-white/10">
                <span>Netto Resultaat:</span>
                <span className={netFinancialResult >= 0 ? 'text-emerald-400' : 'text-slate-200'}>
                  {netFinancialResult >= 0 ? `+€ ${netFinancialResult.toLocaleString('nl-NL')} Winst!` : `€ ${netFinancialResult.toLocaleString('nl-NL')}`}
                </span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/10">
              <p>
                <strong>Automatische Beëindiging:</strong> De interventie stopt zodra jouw debiteuren betalen. Geen bankkrediet, geen structurele rente.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={() => onApply('aanvraag')}
              className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/25 transition-all"
            >
              <Zap size={15} />
              <span>Activeer Deze TGC-Ruimte (Route 2)</span>
            </button>
            <button
              onClick={() => onApply('analyse')}
              className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1 border border-white/15 transition-all"
            >
              <span>Vraag eerst TGC-Procesanalyse aan (Route 1)</span>
            </button>
          </div>
        </div>

      </div>

      {/* Side-by-Side Scenario Comparison */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
        <h3 className="text-base font-bold text-slate-900">
          Vergelijking: Huidige Situatie vs. Met Spontiva TGC
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Box A: Zonder Spontiva */}
          <div className="p-5 rounded-2xl bg-rose-50/50 border border-rose-200/70 space-y-3">
            <div className="flex items-center space-x-2 text-rose-800 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-rose-200 flex items-center justify-center text-xs">✕</span>
              <span>Zonder TGC (Huidige situatie)</span>
            </div>
            <ul className="space-y-2 text-xs text-rose-950">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>{gapDays} dagen krapte:</strong> Je moet crediteuren en lonen betalen terwijl debiteuren wachten.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Leverancierskortingen gemist:</strong> Geen mogelijkheid om 2% snelle betalingskorting te verzilveren.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">•</span>
                <span><strong>Projectuitstel:</strong> Nieuwe opdrachten of voorraad moeten wachten op debiteurenbetalingen.</span>
              </li>
            </ul>
          </div>

          {/* Box B: Met Spontiva TGC */}
          <div className="p-5 rounded-2xl bg-teal-50/50 border border-teal-200 space-y-3">
            <div className="flex items-center space-x-2 text-teal-900 font-bold text-sm">
              <span className="w-6 h-6 rounded-full bg-teal-200 flex items-center justify-center text-xs">✓</span>
              <span>Met Spontiva TGC-Interventie</span>
            </div>
            <ul className="space-y-2 text-xs text-teal-950">
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>€ {availableTGC.toLocaleString('nl-NL')} direct ontgrendeld:</strong> Vrij werkkapitaal zonder banklening.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Skonto-winst:</strong> Verdien contantkorting bij je leveranciers door dag-1 betaling.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-teal-600 font-bold">•</span>
                <span><strong>Automatische afwikkeling:</strong> Zodra de klant betaalt, stopt de interventie direct.</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  );
};

export default SimulatorTab;
