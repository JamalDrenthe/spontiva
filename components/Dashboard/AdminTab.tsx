import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { TGCApplication, ApplicationStatus } from '../../types';
import { 
  ShieldAlert, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  DollarSign, 
  Building2, 
  User, 
  FileEdit, 
  Sparkles, 
  TrendingUp, 
  Search,
  Filter,
  Check,
  X,
  MessageSquare,
  AlertTriangle
} from 'lucide-react';
import { ADMIN_EMAIL } from '../../firebaseConfig';
import { DEMO_ACCOUNTS } from '../../demoData';

import { TGC_METHODS_CATALOG } from '../../tgcMethodsData';

const AdminTab: React.FC = () => {
  const { applications, updateApplicationStatus, currentUser, loginWithDemo } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [editingApp, setEditingApp] = useState<TGCApplication | null>(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [approvedAmountInput, setApprovedAmountInput] = useState<number>(0);
  const [assignedMethod, setAssignedMethod] = useState<string>('TGC-M01');
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('goedgekeurd');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Platform Metrics
  const totalVolume = applications.reduce((acc, curr) => acc + curr.amount, 0);
  const approvedVolume = applications
    .filter(a => a.status === 'goedgekeurd' || a.status === 'actief')
    .reduce((acc, curr) => acc + (curr.approvedAmount || curr.amount), 0);
  const pendingCount = applications.filter(a => a.status === 'nieuw' || a.status === 'in_behandeling' || a.status === 'in_analyse').length;
  const activeCount = applications.filter(a => a.status === 'actief').length;

  const filteredApps = applications.filter(app => {
    const matchesSearch = 
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.counterparty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || app.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleOpenEdit = (app: TGCApplication) => {
    setEditingApp(app);
    setNewStatus(app.status);
    setFeedbackText(app.adminFeedback || '');
    setApprovedAmountInput(app.approvedAmount || app.amount);
    setAssignedMethod(app.recommendedMethod?.split(' ')[0] || 'TGC-M01');
  };

  const handleSaveDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;

    const chosen = TGC_METHODS_CATALOG.find(m => m.code === assignedMethod);
    const feedbackWithMethod = feedbackText 
      ? `[Methode: ${assignedMethod} - ${chosen?.title || ''}] ${feedbackText}`
      : `Toegewezen methode: ${assignedMethod} - ${chosen?.title || ''}`;

    updateApplicationStatus(
      editingApp.id,
      newStatus,
      feedbackWithMethod,
      approvedAmountInput
    );

    setActionSuccess(`Status voor ${editingApp.id} succesvol bijgewerkt naar ${newStatus.toUpperCase()}`);
    setEditingApp(null);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleQuickApprove = (app: TGCApplication) => {
    updateApplicationStatus(
      app.id,
      'goedgekeurd',
      'Goedgekeurd door hoofdbeheerder via snelactie. TGC Interventie geactiveerd.',
      app.amount
    );
    setActionSuccess(`Dossier ${app.id} is direct goedgekeurd voor € ${app.amount.toLocaleString('nl-NL')}!`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Admin Hero Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white border border-purple-800/50 shadow-xl space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-purple-300 text-xs font-bold uppercase tracking-wider mb-1">
              <ShieldAlert size={16} />
              <span>Spontiva Directie Beheerderspaneel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Centrale Dossiercontrole
            </h1>
            <p className="text-xs text-purple-200 mt-1 max-w-xl">
              Geautoriseerd als <span className="font-bold underline text-white">{currentUser?.email}</span> ({ADMIN_EMAIL}). 
              Je hebt volledige administratieve bevoegdheid over alle Time Gap aanvragen, analyses en kredietlimieten.
            </p>
          </div>

          <div className="bg-purple-900/40 border border-purple-700/50 p-3 rounded-xl text-right flex-shrink-0">
            <span className="text-[11px] text-purple-300 uppercase font-semibold block">Systeemstatus</span>
            <span className="text-xs font-bold text-emerald-400 flex items-center justify-end gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live & Synchroon
            </span>
          </div>
        </div>
      </div>

      {actionSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0" />
          <span className="font-semibold">{actionSuccess}</span>
        </div>
      )}

      {/* Admin KPI Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Totaal Beoordeeld Volume
          </div>
          <div className="text-2xl font-black text-slate-900">
            € {totalVolume.toLocaleString('nl-NL')}
          </div>
          <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
            <TrendingUp size={13} className="text-teal-600" />
            <span>Over {applications.length} klantendossiers</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Geplaatste TGC Liquiditeit
          </div>
          <div className="text-2xl font-black text-teal-600">
            € {approvedVolume.toLocaleString('nl-NL')}
          </div>
          <div className="text-[11px] text-teal-700 mt-1 font-medium">
            <span>Actief ingezet werkkapitaal</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Wachtend op Beoordeling
          </div>
          <div className="text-2xl font-black text-amber-600">
            {pendingCount} Dossiers
          </div>
          <div className="text-[11px] text-amber-700 mt-1 font-medium">
            <span>Vereist admin actie</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
            Actieve Klanten
          </div>
          <div className="text-2xl font-black text-purple-600">
            {DEMO_ACCOUNTS.length - 1} Bedrijven
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            <span>ZZP, MKB & Handelsorganisaties</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Zoek bedrijf, ID, e-mail of debiteur..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'Alle Dossiers' },
            { id: 'nieuw', label: 'Nieuw' },
            { id: 'in_behandeling', label: 'In Behandeling' },
            { id: 'in_analyse', label: 'In Analyse' },
            { id: 'goedgekeurd', label: 'Goedgekeurd' },
            { id: 'actief', label: 'Actief' },
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setSelectedStatus(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedStatus === f.id
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Master Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900">Alle Dossiers in Portefeuille ({filteredApps.length})</h2>
            <p className="text-xs text-slate-500">Volledig beheer van klantverzoeken en kredietbesluiten</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase font-semibold">
                <th className="p-4">Dossier ID</th>
                <th className="p-4">Klant / Bedrijf</th>
                <th className="p-4">Aanvraag Omschrijving</th>
                <th className="p-4">Bedrag</th>
                <th className="p-4">Time Gap</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Beheerdersacties</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{app.id}</td>
                  <td className="p-4">
                    <p className="font-bold text-slate-900">{app.companyName}</p>
                    <p className="text-[11px] text-slate-500">{app.userEmail}</p>
                  </td>
                  <td className="p-4">
                    <p className="font-medium text-slate-800">{app.invoiceDescription}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Debiteur: {app.counterparty}</p>
                  </td>
                  <td className="p-4 font-bold text-slate-900">
                    € {app.amount.toLocaleString('nl-NL')}
                    {app.approvedAmount && (
                      <span className="block text-[10px] text-teal-600 font-semibold">
                        Akkoord: € {app.approvedAmount.toLocaleString('nl-NL')}
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-slate-700 font-medium">
                    {app.timeGapDays} Dagen
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
                  <td className="p-4 text-right space-x-1.5 whitespace-nowrap">
                    {app.status !== 'goedgekeurd' && app.status !== 'actief' && (
                      <button
                        onClick={() => handleQuickApprove(app)}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] transition-colors shadow-sm inline-flex items-center gap-1"
                        title="Snel goedkeuren"
                      >
                        <Check size={12} />
                        <span>Goedkeuren</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleOpenEdit(app)}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-[11px] transition-colors inline-flex items-center gap-1"
                    >
                      <FileEdit size={12} />
                      <span>Beoordelen</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Admin Edit & Decision Modal */}
      {editingApp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
            <div className="bg-purple-900 text-white p-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-bold text-purple-300 tracking-wider">
                  Beheerders Besluitvorming
                </span>
                <h3 className="text-xl font-bold">{editingApp.id} - {editingApp.companyName}</h3>
              </div>
              <button 
                onClick={() => setEditingApp(null)}
                className="text-purple-300 hover:text-white p-1 rounded-lg"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveDecision} className="p-6 space-y-4 text-xs">
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-1">
                <p><strong>Aanvrager:</strong> {editingApp.userEmail}</p>
                <p><strong>Debiteur:</strong> {editingApp.counterparty}</p>
                <p><strong>Oorspronkelijk bedrag:</strong> € {editingApp.amount.toLocaleString('nl-NL')}</p>
                <p><strong>Time Gap:</strong> {editingApp.timeGapDays} dagen</p>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nieuwe Status Toewijzen</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-semibold"
                >
                  <option value="nieuw">NIEUW</option>
                  <option value="in_behandeling">IN BEHANDELING</option>
                  <option value="in_analyse">IN ANALYSE</option>
                  <option value="goedgekeurd">GOEDGEKEURD</option>
                  <option value="actief">ACTIEF (UITBETAALD)</option>
                  <option value="afgerond">AFGEROND</option>
                  <option value="afgewezen">AFGEWEZEN</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Toegewezen TGC-Methode (60+ Catalogus)</label>
                <select
                  value={assignedMethod}
                  onChange={(e) => setAssignedMethod(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-medium"
                >
                  {TGC_METHODS_CATALOG.map(m => (
                    <option key={m.code} value={m.code}>
                      {m.code} - {m.title} ({m.indicativeFee})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Goedgekeurd Bedrag (€)</label>
                <input
                  type="number"
                  value={approvedAmountInput}
                  onChange={(e) => setApprovedAmountInput(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Toelichting / Feedback aan de Klant</label>
                <textarea
                  rows={3}
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  placeholder="Voer het advies van Spontiva in, bijv. gekozen methode, uitbetalingsvoorwaarden..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                />
              </div>

              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="px-4 py-2 border border-slate-300 rounded-xl font-semibold text-slate-700"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl shadow-md"
                >
                  Besluit Opslaan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminTab;
