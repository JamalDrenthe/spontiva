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
  DollarSign
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

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">TGC Dossiers & Aanvragen</h1>
          <p className="text-xs text-slate-500">
            Beheer en volg de status van al je Time Gap Cashflow analyses en interventies.
          </p>
        </div>
        <button
          onClick={() => onNavigate('nieuwe-aanvraag')}
          className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center space-x-2 shadow-sm transition-all self-start sm:self-auto"
        >
          <PlusCircle size={15} />
          <span>Nieuwe Aanvraag</span>
        </button>
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
            { id: 'nieuw', label: 'Nieuw' },
            { id: 'in_behandeling', label: 'In Behandeling' },
            { id: 'in_analyse', label: 'In Analyse' },
            { id: 'goedgekeurd', label: 'Goedgekeurd' },
            { id: 'actief', label: 'Actief' },
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

      {/* Dossiers List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        {filteredApps.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <FileText size={40} className="mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-700">Geen dossiers gevonden</p>
            <p className="text-xs text-slate-500">Pas je zoekopdracht aan of dien een nieuwe TGC-aanvraag in.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                  <th className="p-4">Dossier ID</th>
                  <th className="p-4">Omschrijving & Debiteur</th>
                  <th className="p-4">Bedrag</th>
                  <th className="p-4">Time Gap</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Datum</th>
                  <th className="p-4 text-right">Actie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{app.id}</td>
                    <td className="p-4">
                      <p className="font-semibold text-slate-900">{app.invoiceDescription}</p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Building2 size={12} /> {app.counterparty}
                      </p>
                    </td>
                    <td className="p-4 font-bold text-slate-900">
                      € {app.amount.toLocaleString('nl-NL')}
                      {app.approvedAmount && (
                        <span className="block text-[10px] text-teal-600 font-semibold">
                          Akkoord: € {app.approvedAmount.toLocaleString('nl-NL')}
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-slate-700">
                      <span className="font-semibold">{app.timeGapDays} dagen</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        app.status === 'actief' || app.status === 'goedgekeurd'
                          ? 'bg-emerald-100 text-emerald-800'
                          : app.status === 'in_behandeling' || app.status === 'in_analyse'
                          ? 'bg-amber-100 text-amber-800'
                          : app.status === 'nieuw'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {app.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{app.submittedAt}</td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => setSelectedApp(app)}
                        className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Dossier Detail Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-teal-400 tracking-wider">
                  Dossier Specificatie
                </span>
                <h3 className="text-xl font-bold">{selectedApp.id}</h3>
              </div>
              <button 
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                <div>
                  <span className="text-slate-500 block">Bedrijfsnaam</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedApp.companyName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Tegenpartij / Debiteur</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedApp.counterparty}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Gevraagd Bedrag</span>
                  <span className="font-bold text-slate-900 text-sm">€ {selectedApp.amount.toLocaleString('nl-NL')}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Geschatte Time Gap</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedApp.timeGapDays} Dagen</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-700 block mb-1">Omschrijving factuur & onderliggende prestatie</span>
                <p className="bg-slate-50 p-3 rounded-lg text-slate-800 leading-relaxed border border-slate-200">
                  {selectedApp.invoiceDescription}
                </p>
              </div>

              {selectedApp.notes && (
                <div>
                  <span className="font-bold text-slate-700 block mb-1">Opmerkingen aanvrager</span>
                  <p className="bg-slate-50 p-3 rounded-lg text-slate-600 leading-relaxed border border-slate-200">
                    {selectedApp.notes}
                  </p>
                </div>
              )}

              {selectedApp.adminFeedback && (
                <div className="bg-teal-50 border border-teal-200 p-4 rounded-xl space-y-1">
                  <span className="font-bold text-teal-900 block flex items-center gap-1">
                    <CheckCircle2 size={14} className="text-teal-600" />
                    Spontiva Beoordeling & Interventie
                  </span>
                  <p className="text-teal-800 leading-relaxed">
                    {selectedApp.adminFeedback}
                  </p>
                  {selectedApp.recommendedMethod && (
                    <p className="text-[11px] text-teal-900 font-semibold pt-1">
                      Aanbevolen methode: {selectedApp.recommendedMethod}
                    </p>
                  )}
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-xl"
                >
                  Sluiten
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default DossiersTab;
