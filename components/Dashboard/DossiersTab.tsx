import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { TGCApplication, ApplicationStatus } from '../../types';
import { DashboardTab } from './DashboardLayout';
import { 
  FileText, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ArrowUpRight, 
  X,
  PlusCircle,
  Building2,
  Calendar,
  Zap,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';

interface DossiersTabProps {
  onNavigate: (tab: DashboardTab) => void;
}

const DossiersTab: React.FC<DossiersTabProps> = ({ onNavigate }) => {
  const { userApplications, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<TGCApplication | null>(null);

  const filteredApps = userApplications.filter(app => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.invoiceDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.counterparty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStepNumber = (status: ApplicationStatus): number => {
    switch (status) {
      case 'nieuw': return 1;
      case 'in_behandeling':
      case 'in_analyse': return 2;
      case 'goedgekeurd': return 3;
      case 'actief': return 4;
      case 'afgerond': return 5;
      default: return 1;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Zap size={14} />
            <span>Route 2 • Directe Executie & Dossiers</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            TGC-Interventies & Dossierbeheer
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Volg de actieve inzet van TGC-methodes op jouw facturen en leveranciersverplichtingen. Elke interventie stopt automatisch zodra de debiteur heeft voldaan.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <button
            onClick={() => onNavigate('nieuwe-aanvraag')}
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20 transition-all"
          >
            <PlusCircle size={15} />
            <span>Nieuwe TGC-Aanvraag Starten</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Zoek op ID, debiteur of omschrijving..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'Alles' },
            { id: 'actief', label: 'Actief (Liquiditeit Beschikbaar)' },
            { id: 'goedgekeurd', label: 'Goedgekeurd' },
            { id: 'in_behandeling', label: 'In Behandeling' },
            { id: 'afgerond', label: 'Afgerond' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === f.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dossiers List Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredApps.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-3">
            <FileText size={32} className="text-slate-400 mx-auto" />
            <p className="text-xs text-slate-500">Geen dossiers gevonden die voldoen aan je zoekcriteria.</p>
            <button
              onClick={() => onNavigate('nieuwe-aanvraag')}
              className="text-xs font-bold text-teal-600 hover:underline"
            >
              Start direct een nieuwe aanvraag
            </button>
          </div>
        ) : (
          filteredApps.map(app => {
            const step = getStepNumber(app.status);
            return (
              <div 
                key={app.id}
                onClick={() => setSelectedApp(app)}
                className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-teal-500/50 transition-all cursor-pointer space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex items-center space-x-2.5">
                    <span className="font-mono text-xs font-black bg-slate-900 text-white px-2.5 py-1 rounded-lg">
                      {app.id}
                    </span>
                    <span className="text-xs text-slate-400">
                      Ingediend op {app.submittedAt}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 self-start sm:self-auto">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase flex items-center gap-1.5 ${
                      app.status === 'actief' 
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                        : app.status === 'goedgekeurd'
                        ? 'bg-teal-100 text-teal-800 border border-teal-200'
                        : app.status === 'in_behandeling' || app.status === 'in_analyse'
                        ? 'bg-amber-100 text-amber-800 border border-amber-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {app.status === 'actief' && <Zap size={12} className="text-emerald-600" />}
                      <span>{app.status.replace('_', ' ')}</span>
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  <div className="md:col-span-8 space-y-1.5">
                    <h3 className="text-base font-bold text-slate-900">{app.invoiceDescription}</h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Building2 size={13} className="text-slate-400" />
                        Relatie: <strong className="text-slate-800">{app.counterparty}</strong>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} className="text-slate-400" />
                        Time Gap: <strong className="text-teal-700">{app.timeGapDays} dagen</strong>
                      </span>
                      {app.recommendedMethod && (
                        <>
                          <span>•</span>
                          <span className="text-teal-800 font-semibold bg-teal-50 px-2 py-0.5 rounded-md border border-teal-200">
                            {app.recommendedMethod}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="md:col-span-4 flex sm:justify-end items-center gap-3">
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Bedrag</span>
                      <span className="text-xl font-black text-slate-900">
                        € {app.amount.toLocaleString('nl-NL')}
                      </span>
                      {app.approvedAmount && (
                        <span className="text-[10px] text-teal-700 block font-semibold">
                          Gedekt: € {app.approvedAmount.toLocaleString('nl-NL')}
                        </span>
                      )}
                    </div>
                    <ArrowRight size={18} className="text-slate-300 hidden sm:block" />
                  </div>
                </div>

                {/* Visual Lifecycle Steps Indicator */}
                <div className="pt-3 border-t border-slate-100">
                  <div className="grid grid-cols-5 gap-1 text-center">
                    {[
                      { stepIdx: 1, label: '1. Ingediend' },
                      { stepIdx: 2, label: '2. Procescontrole' },
                      { stepIdx: 3, label: '3. Goedgekeurd' },
                      { stepIdx: 4, label: '4. Liquiditeit Actief' },
                      { stepIdx: 5, label: '5. Automatisch Afgerond' },
                    ].map(s => {
                      const isComplete = step >= s.stepIdx;
                      const isCurrent = step === s.stepIdx;
                      return (
                        <div key={s.stepIdx} className="space-y-1">
                          <div className={`h-1.5 rounded-full transition-all ${
                            isComplete ? 'bg-teal-500' : 'bg-slate-200'
                          }`}></div>
                          <span className={`text-[10px] font-semibold block line-clamp-1 ${
                            isCurrent ? 'text-teal-800 font-bold' : isComplete ? 'text-slate-700' : 'text-slate-400'
                          }`}>
                            {s.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* Dossier Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2.5 py-1 rounded-lg">
                  {selectedApp.id}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{selectedApp.invoiceDescription}</h3>
                <p className="text-xs text-slate-500 mt-0.5">Onderneming: {selectedApp.companyName}</p>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Relatie / Tegenpartij</span>
                  <span className="font-bold text-slate-900 text-sm mt-0.5 block">{selectedApp.counterparty}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Aanvraagbedrag</span>
                  <span className="font-black text-slate-900 text-sm mt-0.5 block">€ {selectedApp.amount.toLocaleString('nl-NL')}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Time Gap Wachttijd</span>
                  <span className="font-bold text-teal-700 text-sm mt-0.5 block">{selectedApp.timeGapDays} dagen</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Status</span>
                  <span className="font-bold text-slate-800 text-sm mt-0.5 block uppercase">{selectedApp.status.replace('_', ' ')}</span>
                </div>
              </div>

              {selectedApp.recommendedMethod && (
                <div className="p-3.5 bg-teal-50 border border-teal-200 rounded-xl space-y-1">
                  <span className="text-teal-900 font-bold block">Toegepaste TGC-Methode</span>
                  <p className="text-teal-800">{selectedApp.recommendedMethod}</p>
                </div>
              )}

              {selectedApp.adminFeedback && (
                <div className="p-3.5 bg-slate-100 rounded-xl space-y-1">
                  <span className="text-slate-700 font-bold block">Toelichting Beoordeling & Uitbetaling</span>
                  <p className="text-slate-600 leading-relaxed">{selectedApp.adminFeedback}</p>
                </div>
              )}

              <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-1">
                <span className="text-teal-400 font-bold block text-xs">Automatische Beëindiging</span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  Zodra {selectedApp.counterparty} de factuur betaalt, wordt de TGC-interventie direct en automatisch afgewikkeld. Geen doorlopende rente of structurele bancaire verplichtingen.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedApp(null)}
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md"
              >
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DossiersTab;
