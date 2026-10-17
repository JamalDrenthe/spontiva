import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { DashboardTab } from './DashboardLayout';
import { 
  TrendingUp, 
  Clock, 
  ShieldCheck, 
  FileText, 
  ArrowUpRight, 
  CheckCircle2, 
  AlertCircle, 
  PlusCircle, 
  Calculator,
  ArrowRight,
  Sparkles,
  Calendar,
  FileSearch,
  Zap,
  Receipt,
  Layers,
  BarChart3,
  Building,
  Check
} from 'lucide-react';

interface OverviewTabProps {
  onNavigate: (tab: DashboardTab) => void;
  onDeployMethod?: (methodCode: string) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigate, onDeployMethod }) => {
  const { currentUser, userApplications, userInvoices, userReports } = useAuth();
  const [showTgcBuffer, setShowTgcBuffer] = useState(true);

  // Dynamic metrics from applications
  const approvedApps = userApplications.filter(a => a.status === 'goedgekeurd' || a.status === 'actief');
  const approvedTotal = approvedApps.reduce((acc, curr) => acc + (curr.approvedAmount || curr.amount), 0);
  const pendingApps = userApplications.filter(a => a.status === 'nieuw' || a.status === 'in_behandeling' || a.status === 'in_analyse');
  
  // Dynamic metrics from invoices
  const openInvoicesWithGap = userInvoices.filter(i => i.status === 'openstaand');
  const totalOpenGapAmount = openInvoicesWithGap.reduce((acc, curr) => acc + curr.amount, 0);

  const avgTimeGap = userApplications.length > 0 
    ? Math.round(userApplications.reduce((acc, curr) => acc + curr.timeGapDays, 0) / userApplications.length) 
    : 34;

  // 8-Week Cashflow Forecast Data
  const weeklyForecast = [
    { week: 'W1', in: 12000, out: 14000, gap: -2000 },
    { week: 'W2', in: 4000, out: 18000, gap: -14000 },
    { week: 'W3', in: 6000, out: 22000, gap: -16000 },
    { week: 'W4', in: 8000, out: 15000, gap: -7000 },
    { week: 'W5', in: 34000, out: 12000, gap: 22000 },
    { week: 'W6', in: 28000, out: 11000, gap: 17000 },
    { week: 'W7', in: 15000, out: 9000, gap: 6000 },
    { week: 'W8', in: 18000, out: 10000, gap: 8000 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Welcome & Command Cockpit Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-teal-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
              <Sparkles size={13} />
              Time Gap Cashflow Cockpit
            </span>
            <span className="text-slate-400 text-xs">
              KvK: <strong className="text-slate-200">{currentUser?.kvkNumber || '84920194'}</strong>
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">•</span>
            <span className="text-slate-400 text-xs">
              IBAN: <strong className="text-slate-200">{currentUser?.iban || 'NL91 ABNA 0412 3456 78'}</strong>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welkom, {currentUser?.displayName}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Voor <span className="text-white font-semibold">{currentUser?.companyName}</span>. 
            Je hebt direct controle over timingverschillen tussen debiteuren en operationele crediteurenverplichtingen. Kies voor diepgaande analyse of directe methode-inzet.
          </p>
        </div>

        {/* Action Route Launchers */}
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
          <button
            onClick={() => onNavigate('analyses')}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 border border-white/20 shadow-sm transition-all hover:-translate-y-0.5"
          >
            <FileSearch size={15} className="text-teal-400" />
            <span>Route 1: Vraag TGC-Analyse aan</span>
          </button>
          
          <button
            onClick={() => onNavigate('nieuwe-aanvraag')}
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/25 transition-all hover:-translate-y-0.5"
          >
            <Zap size={15} />
            <span>Route 2: Start TGC-Aanvraag</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Gerealiseerde Ruimte */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Actieve TGC-Ruimte</span>
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            € {approvedTotal > 0 ? approvedTotal.toLocaleString('nl-NL') : '0'}
          </div>
          <div className="mt-2 flex items-center text-[11px] text-teal-700 font-medium">
            <CheckCircle2 size={13} className="mr-1 text-teal-500" />
            <span>Direct inzetbaar werkkapitaal</span>
          </div>
        </div>

        {/* Card 2: Gemiddelde Time Gap */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Gemiddelde Time Gap</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Clock size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {avgTimeGap} Dagen
          </div>
          <div className="mt-2 flex items-center text-[11px] text-slate-500">
            <span>Verschil debiteuren vs verplichtingen</span>
          </div>
        </div>

        {/* Card 3: Openstaande Facturen met Gap */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Open Facturengat</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Receipt size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            € {totalOpenGapAmount.toLocaleString('nl-NL')}
          </div>
          <div className="mt-2 flex items-center text-[11px] text-amber-700 font-medium">
            <AlertCircle size={13} className="mr-1 text-amber-500" />
            <span>{openInvoicesWithGap.length} facturen overbrugbaar</span>
          </div>
        </div>

        {/* Card 4: Krediet & Audit Status */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Diagnostiek & Krediet</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 tracking-tight flex items-baseline gap-1.5">
            <span>A+ Score</span>
            <span className="text-xs text-slate-500 font-normal">Geverifieerd</span>
          </div>
          <div className="mt-2 flex items-center text-[11px] text-slate-500">
            <span>KvK & betaalhistorie goedgekeurd</span>
          </div>
        </div>

      </div>

      {/* Interactive Cashflow Gap Visualizer (8-Week In/Out Flow) */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/80 shadow-sm space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <BarChart3 size={14} className="text-teal-600" />
              <span>Kasstroom Timing & Gap Analyse</span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 mt-0.5">
              8-Weken Liquiditeitsverloop (Inkomend vs. Uitgaand)
            </h2>
            <p className="text-xs text-slate-500">
              Visualisatie van de tijdelijke dip in Week 2-4 vóórdat debiteuren facturen voldoen in Week 5-6.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <button
              onClick={() => setShowTgcBuffer(!showTgcBuffer)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                showTgcBuffer 
                  ? 'bg-teal-50 text-teal-800 border-teal-300 shadow-sm'
                  : 'bg-slate-100 text-slate-600 border-slate-200'
              }`}
            >
              <Zap size={13} className={showTgcBuffer ? 'text-teal-600' : 'text-slate-400'} />
              <span>Toon Spontiva TGC-Egalisatie</span>
            </button>

            <button
              onClick={() => onNavigate('simulator')}
              className="text-xs text-slate-600 hover:text-slate-900 font-semibold px-2 py-1.5 flex items-center gap-1"
            >
              <Calculator size={14} />
              <span>Simulator</span>
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs pt-1 border-t border-slate-100 text-slate-600">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-emerald-500"></div>
            <span>Inkomende geldstroom (Debiteuren)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded bg-amber-500"></div>
            <span>Uitgaande verplichtingen (Leveranciers & Salarissen)</span>
          </div>
          {showTgcBuffer && (
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded bg-teal-500"></div>
              <span className="font-semibold text-teal-800">Spontiva TGC Overbruggingsruimte</span>
            </div>
          )}
        </div>

        {/* Bar Chart Container */}
        <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 pt-4">
          {weeklyForecast.map((w, idx) => {
            const hasDip = w.gap < 0;
            return (
              <div key={idx} className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/60 flex flex-col justify-between space-y-3">
                <div className="text-center font-bold text-xs text-slate-800">{w.week}</div>
                
                {/* Visual stacked indicators */}
                <div className="space-y-1.5">
                  <div>
                    <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                      <span>In</span>
                      <span className="font-semibold text-emerald-700">€ {Math.round(w.in / 1000)}k</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${Math.min(100, (w.in / 35000) * 100)}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[10px] text-slate-500 mb-0.5">
                      <span>Uit</span>
                      <span className="font-semibold text-amber-700">€ {Math.round(w.out / 1000)}k</span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${Math.min(100, (w.out / 35000) * 100)}%` }}></div>
                    </div>
                  </div>

                  {showTgcBuffer && hasDip && (
                    <div className="pt-1">
                      <div className="flex justify-between text-[10px] text-teal-800 font-bold mb-0.5">
                        <span>TGC</span>
                        <span>+€ {Math.round(Math.abs(w.gap) / 1000)}k</span>
                      </div>
                      <div className="w-full bg-teal-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-teal-500 h-full rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-center pt-1 border-t border-slate-200/60">
                  <span className={`text-[11px] font-bold ${hasDip ? (showTgcBuffer ? 'text-teal-700' : 'text-rose-600') : 'text-emerald-700'}`}>
                    {hasDip 
                      ? (showTgcBuffer ? 'Gedicht' : `-€ ${Math.abs(w.gap).toLocaleString('nl-NL')}`)
                      : `+€ ${w.gap.toLocaleString('nl-NL')}`}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dual Core Routes Feature Presentation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Route 1 Feature Box */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                Route 1 • Onderzoek & Advies
              </span>
              <FileSearch size={18} className="text-teal-600" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">TGC-Procesanalyse</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We leggen de timing van inkomende en uitgaande geldstromen feitelijk naast elkaar. We brengen in kaart waar in facturatie, inkoop en ontvangstmomenten tijdelijke ruimte kan ontstaan en welke van onze 60+ methodes daarvoor inzetbaar zijn.
            </p>

            <ul className="space-y-1.5 text-xs text-slate-700 pt-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-teal-600 flex-shrink-0" />
                <span>Geen verplichtingen om tot actie over te gaan</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-teal-600 flex-shrink-0" />
                <span>Helder inzicht in betaaltermijnen en knelpunten</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-teal-600 flex-shrink-0" />
                <span>Aanbeveling op maat uit de 60+ methodes catalogus</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {userReports.length} rapport{userReports.length !== 1 ? 'en' : ''} beschikbaar
            </span>
            <button
              onClick={() => onNavigate('analyses')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 transition-colors"
            >
              <span>Bekijk Analyses</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

        {/* Route 2 Feature Box */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:border-teal-500/40 transition-all flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                Route 2 • Directe Executie
              </span>
              <Zap size={18} className="text-teal-600" />
            </div>

            <h3 className="text-lg font-bold text-slate-900">TGC-Aanvraag & Interventie</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Directe inzet van een beproefde Time Gap Cashflow methode. Snel inzetbaar om tijdelijke liquiditeitsdruk te verlichten. De methode stopt automatisch en direct zodra de normale betalingen binnenkomen.
            </p>

            <ul className="space-y-1.5 text-xs text-slate-700 pt-1">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-teal-600 flex-shrink-0" />
                <span>Snel operationeel werkkapitaal ontgrendelen</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-teal-600 flex-shrink-0" />
                <span>Vaste, transparante kosten vooraf bekend</span>
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-teal-600 flex-shrink-0" />
                <span>Geen langdurige leningen of structurele schulden</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              {approvedApps.length} actieve interventie{approvedApps.length !== 1 ? 's' : ''}
            </span>
            <button
              onClick={() => onNavigate('nieuwe-aanvraag')}
              className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-colors"
            >
              <span>Start TGC-Aanvraag</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>

      </div>

      {/* Active Interventions and Pressing Invoices Table */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Active TGC Interventions */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <FileText size={16} className="text-teal-600" />
              <span>Actieve TGC-Dossiers ({userApplications.length})</span>
            </h3>
            <button
              onClick={() => onNavigate('interventies')}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <span>Alle dossiers</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {userApplications.slice(0, 3).map((app) => (
              <div key={app.id} className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/60 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-900">{app.id}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    app.status === 'actief' || app.status === 'goedgekeurd'
                      ? 'bg-emerald-100 text-emerald-800'
                      : app.status === 'in_behandeling' || app.status === 'in_analyse'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {app.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-xs font-semibold text-slate-800 line-clamp-1">{app.invoiceDescription}</div>
                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/40 text-slate-500">
                  <span>Bedrag: <strong className="text-slate-900">€ {app.amount.toLocaleString('nl-NL')}</strong></span>
                  <span>Gap: <strong className="text-teal-700">{app.timeGapDays} dagen</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Facturen met Urgent Time Gap */}
        <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Receipt size={16} className="text-teal-600" />
              <span>Facturen met Time Gap</span>
            </h3>
            <button
              onClick={() => onNavigate('facturen')}
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 flex items-center gap-1"
            >
              <span>Facturenkalender</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {userInvoices.slice(0, 3).map((inv) => (
              <div key={inv.id} className="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/60 flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">{inv.invoiceNumber}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      inv.type === 'debiteur' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {inv.type === 'debiteur' ? 'Debiteur' : 'Crediteur'}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">{inv.counterparty}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Vervalt: {inv.dueDate} ({inv.timeGapDays} dgn)</div>
                </div>

                <div className="text-right flex-shrink-0 space-y-1.5">
                  <div className="text-sm font-black text-slate-900">€ {inv.amount.toLocaleString('nl-NL')}</div>
                  {inv.status === 'openstaand' ? (
                    <button
                      onClick={() => onNavigate('facturen')}
                      className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-2.5 py-1 rounded-lg text-[11px] flex items-center gap-1 shadow-sm transition-all"
                    >
                      <Zap size={11} />
                      <span>Overbrug</span>
                    </button>
                  ) : (
                    <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-md">
                      Overbrugd
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

export default OverviewTab;
