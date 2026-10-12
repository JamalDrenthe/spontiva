import React from 'react';
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
  Calendar
} from 'lucide-react';

interface OverviewTabProps {
  onNavigate: (tab: DashboardTab) => void;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigate }) => {
  const { currentUser, userApplications, isAdmin } = useAuth();

  // Calculate dynamic metrics from applications
  const totalAmount = userApplications.reduce((acc, curr) => acc + curr.amount, 0);
  const approvedApps = userApplications.filter(a => a.status === 'goedgekeurd' || a.status === 'actief');
  const approvedTotal = approvedApps.reduce((acc, curr) => acc + (curr.approvedAmount || curr.amount), 0);
  const pendingApps = userApplications.filter(a => a.status === 'nieuw' || a.status === 'in_behandeling' || a.status === 'in_analyse');
  
  const avgTimeGap = userApplications.length > 0 
    ? Math.round(userApplications.reduce((acc, curr) => acc + curr.timeGapDays, 0) / userApplications.length) 
    : 30;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-6 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-800">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Time Gap Cashflow Platform</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welkom, {currentUser?.displayName}
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
            Bedrijf: <span className="text-white font-semibold">{currentUser?.companyName}</span>. 
            Je hebt direct inzicht in lopende timingverschillen tussen inkomsten en uitgaven.
          </p>
        </div>

        <div className="flex flex-wrap sm:flex-nowrap gap-3 flex-shrink-0">
          <button
            onClick={() => onNavigate('nieuwe-aanvraag')}
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0"
          >
            <PlusCircle size={16} />
            <span>Nieuwe TGC-aanvraag</span>
          </button>
          <button
            onClick={() => onNavigate('simulator')}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 border border-white/15 transition-all"
          >
            <Calculator size={16} />
            <span>Simulatie Uitvoeren</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Gerealiseerde Ruimte */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Actieve TGC Ruimte</span>
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <TrendingUp size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            € {approvedTotal > 0 ? approvedTotal.toLocaleString('nl-NL') : '0'}
          </div>
          <div className="mt-2 flex items-center text-[11px] text-teal-700 font-medium">
            <CheckCircle2 size={13} className="mr-1 text-teal-500" />
            <span>Direct inzetbaar voor werkkapitaal</span>
          </div>
        </div>

        {/* Card 2: Gemiddelde Time Gap */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Gemiddelde Time Gap</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <Clock size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {avgTimeGap} Dagen
          </div>
          <div className="mt-2 flex items-center text-[11px] text-slate-500">
            <span>Tijdverschil debiteur vs verplichting</span>
          </div>
        </div>

        {/* Card 3: In Behandeling / Analyse */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Dossiers in Behandeling</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <FileText size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {pendingApps.length} Dossiers
          </div>
          <div className="mt-2 flex items-center text-[11px] text-amber-700 font-medium">
            <Clock size={13} className="mr-1 text-amber-500" />
            <span>Verwerking binnen 24-48 uur</span>
          </div>
        </div>

        {/* Card 4: Liquiditeitsstatus */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider">Kredietwaardigheidsscore</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck size={18} />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 tracking-tight flex items-baseline gap-1">
            <span>A+</span>
            <span className="text-xs text-slate-500 font-normal">Geverifieerd</span>
          </div>
          <div className="mt-2 flex items-center text-[11px] text-slate-500">
            <span>Gebaseerd op factuurhistorie & KvK</span>
          </div>
        </div>
      </div>

      {/* Cashflow Gap Visualizer & Method Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Visualizer Widget */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Cashflow Timing Gap Overzicht</h2>
              <p className="text-xs text-slate-500">Verloop van betaalmomenten en Spontiva interventies</p>
            </div>
            <span className="text-xs font-semibold bg-teal-50 text-teal-700 px-2.5 py-1 rounded-full border border-teal-200">
              Live Indicatie
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {/* Timeline bar 1: Debiteur betalingstermijn */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Normale wachttijd debiteuren</span>
                <span className="text-slate-500">Gemiddeld 45 dagen</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-amber-400 h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
              <p className="text-[11px] text-slate-500">Geld zit tijdelijk vast in openstaande vorderingen.</p>
            </div>

            {/* Timeline bar 2: Met Spontiva TGC */}
            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-900">Met Spontiva TGC-Methode</span>
                <span className="text-teal-600 font-bold">Binnen 24 uur beschikbaar</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div className="bg-teal-500 h-full rounded-full" style={{ width: '100%' }}></div>
              </div>
              <p className="text-[11px] text-teal-700 font-medium">Overbrugt het tijdsgat direct zonder structurele banklening.</p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200/70 flex items-center justify-between">
            <div className="text-xs text-slate-600">
              <span className="font-bold text-slate-800">Wil je berekenen hoeveel ruimte vrijkomt?</span> Gebruik de interactieve rekentool.
            </div>
            <button
              onClick={() => onNavigate('simulator')}
              className="text-xs text-teal-600 font-bold hover:text-teal-700 flex items-center space-x-1"
            >
              <span>Naar Simulator</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Action Panel */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-1">Snelle Handelingen</h2>
            <p className="text-xs text-slate-500 mb-4">Directe acties voor je TGC-dossiers</p>

            <div className="space-y-2.5">
              <button
                onClick={() => onNavigate('nieuwe-aanvraag')}
                className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left border border-slate-200 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <PlusCircle size={16} className="text-teal-600" />
                  <span className="text-xs font-semibold text-slate-800">TGC Analyse aanvragen</span>
                </div>
                <ArrowRight size={14} className="text-slate-400 group-hover:text-slate-700 transition-colors" />
              </button>

              <button
                onClick={() => onNavigate('documenten')}
                className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left border border-slate-200 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <FileText size={16} className="text-blue-600" />
                  <span className="text-xs font-semibold text-slate-800">Documenten & Facturen</span>
                </div>
                <ArrowRight size={14} className="text-slate-400 group-hover:text-slate-700 transition-colors" />
              </button>

              <button
                onClick={() => onNavigate('simulator')}
                className="w-full p-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-left border border-slate-200 transition-colors flex items-center justify-between group"
              >
                <div className="flex items-center space-x-2.5">
                  <Calculator size={16} className="text-purple-600" />
                  <span className="text-xs font-semibold text-slate-800">Cashflow Simulatie</span>
                </div>
                <ArrowRight size={14} className="text-slate-400 group-hover:text-slate-700 transition-colors" />
              </button>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="text-[11px] text-slate-500">
              Vragen over een lopend dossier? Neem direct contact op via info@jamaldrenthe.com.
            </div>
          </div>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Recente Aanvragen & Analyses</h2>
            <p className="text-xs text-slate-500">Overzicht van je ingediende TGC-dossiers</p>
          </div>
          <button
            onClick={() => onNavigate('dossiers')}
            className="text-xs text-teal-600 hover:text-teal-700 font-semibold flex items-center space-x-1"
          >
            <span>Bekijk alle dossiers</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {userApplications.length === 0 ? (
          <div className="p-8 text-center text-slate-400 space-y-3">
            <FileText size={36} className="mx-auto text-slate-300" />
            <p className="text-sm font-medium text-slate-600">Nog geen TGC dossiers geregistreerd.</p>
            <button
              onClick={() => onNavigate('nieuwe-aanvraag')}
              className="text-xs bg-slate-900 text-white font-semibold px-4 py-2 rounded-xl"
            >
              Start je eerste aanvraag
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/70 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <th className="p-4">Dossier ID</th>
                  <th className="p-4">Omschrijving</th>
                  <th className="p-4">Debiteur / Tegenpartij</th>
                  <th className="p-4">Bedrag</th>
                  <th className="p-4">Time Gap</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Datum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {userApplications.slice(0, 5).map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{app.id}</td>
                    <td className="p-4 text-slate-700 font-medium max-w-xs truncate">{app.invoiceDescription}</td>
                    <td className="p-4 text-slate-600">{app.counterparty}</td>
                    <td className="p-4 font-bold text-slate-900">€ {app.amount.toLocaleString('nl-NL')}</td>
                    <td className="p-4 text-slate-600">{app.timeGapDays} dagen</td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        app.status === 'actief' || app.status === 'goedgekeurd'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'in_behandeling' || app.status === 'in_analyse'
                          ? 'bg-amber-100 text-amber-800'
                          : app.status === 'nieuw'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        {app.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{app.submittedAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default OverviewTab;
