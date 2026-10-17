import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { InvoiceItem } from '../../types';
import { TGC_METHODS_CATALOG } from '../../tgcMethodsData';
import { DashboardTab } from './DashboardLayout';
import { 
  Receipt, 
  Search, 
  Filter, 
  PlusCircle, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Building2, 
  Zap, 
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign
} from 'lucide-react';

interface InvoicesTabProps {
  onNavigate: (tab: DashboardTab) => void;
}

const InvoicesTab: React.FC<InvoicesTabProps> = ({ onNavigate }) => {
  const { userInvoices, addInvoice, bridgeInvoice } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'debiteur' | 'crediteur'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Modals state
  const [showAddModal, setShowAddModal] = useState(false);
  const [bridgeTargetInvoice, setBridgeTargetInvoice] = useState<InvoiceItem | null>(null);
  const [selectedMethodCode, setSelectedMethodCode] = useState('TGC-M01');
  const [bridgeSuccess, setBridgeSuccess] = useState(false);

  // New Invoice form state
  const [newInvoiceNumber, setNewInvoiceNumber] = useState('');
  const [newCounterparty, setNewCounterparty] = useState('');
  const [newType, setNewType] = useState<'debiteur' | 'crediteur'>('debiteur');
  const [newAmount, setNewAmount] = useState<number>(5000);
  const [newDueDate, setNewDueDate] = useState('');
  const [newNotes, setNewNotes] = useState('');

  // Calculations
  const totalReceivables = userInvoices
    .filter(i => i.type === 'debiteur' && i.status !== 'voldaan')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalPayables = userInvoices
    .filter(i => i.type === 'crediteur' && i.status !== 'voldaan')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalBridged = userInvoices
    .filter(i => i.status === 'overbrugd')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const filteredInvoices = userInvoices.filter(inv => {
    const matchesSearch = 
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.counterparty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || inv.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || inv.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInvoiceNumber || !newCounterparty) return;

    // Calculate approximate time gap
    const now = new Date();
    const due = newDueDate ? new Date(newDueDate) : new Date(now.getTime() + 30 * 86400000);
    const diffTime = Math.max(0, due.getTime() - now.getTime());
    const gapDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    addInvoice({
      invoiceNumber: newInvoiceNumber,
      counterparty: newCounterparty,
      type: newType,
      amount: newAmount,
      issueDate: now.toISOString().split('T')[0],
      dueDate: newDueDate || new Date(now.getTime() + 30 * 86400000).toISOString().split('T')[0],
      timeGapDays: gapDays,
      status: 'openstaand',
      notes: newNotes
    });

    setShowAddModal(false);
    setNewInvoiceNumber('');
    setNewCounterparty('');
    setNewNotes('');
  };

  const handleBridgeConfirm = () => {
    if (!bridgeTargetInvoice) return;
    bridgeInvoice(bridgeTargetInvoice.id, selectedMethodCode);
    setBridgeSuccess(true);
    setTimeout(() => {
      setBridgeSuccess(false);
      setBridgeTargetInvoice(null);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Receipt size={14} />
            <span>Facturatie & Cashflow Gap Kalender</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Facturen & Betaalcyclus Overzicht
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Houd grip op het verschil tussen te ontvangen debiteurenfacturen en uitgaande leveranciersverplichtingen. Overbrug het timinggat met één klik via de passende TGC-methode.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20 transition-all"
          >
            <PlusCircle size={15} />
            <span>Factuur Toevoegen</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        {/* Receivables */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Te Ontvangen (Debiteuren)</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <ArrowDownLeft size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            € {totalReceivables.toLocaleString('nl-NL')}
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Openstaand bij zakelijke opdrachtgevers
          </div>
        </div>

        {/* Payables */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Te Betalen (Crediteuren/Inkoop)</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <ArrowUpRight size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            € {totalPayables.toLocaleString('nl-NL')}
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Kortlopende operationele verplichtingen
          </div>
        </div>

        {/* Bridged */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider">Overbrugd via Spontiva TGC</span>
            <div className="p-2 bg-teal-50 text-teal-600 rounded-xl">
              <Sparkles size={16} />
            </div>
          </div>
          <div className="text-2xl font-black text-teal-600 tracking-tight">
            € {totalBridged.toLocaleString('nl-NL')}
          </div>
          <div className="mt-2 text-[11px] text-teal-700 font-medium flex items-center gap-1">
            <CheckCircle2 size={12} />
            <span>Liquiditeit direct ontgrendeld</span>
          </div>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Zoek factuurnr of tegenpartij..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Type filter */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setTypeFilter('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${typeFilter === 'all' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
            >
              Alles
            </button>
            <button
              onClick={() => setTypeFilter('debiteur')}
              className={`px-3 py-1 rounded-lg transition-colors ${typeFilter === 'debiteur' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
            >
              Debiteuren (Inkomend)
            </button>
            <button
              onClick={() => setTypeFilter('crediteur')}
              className={`px-3 py-1 rounded-lg transition-colors ${typeFilter === 'crediteur' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600'}`}
            >
              Crediteuren (Uitgaand)
            </button>
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-700"
          >
            <option value="all">Alle statussen</option>
            <option value="openstaand">Openstaand</option>
            <option value="overbrugd">Overbrugd met TGC</option>
            <option value="voldaan">Voldaan</option>
          </select>
        </div>
      </div>

      {/* Invoices List */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200/80 text-slate-500 uppercase tracking-wider font-semibold text-[11px]">
              <tr>
                <th className="py-3.5 px-4">Factuurnummer</th>
                <th className="py-3.5 px-4">Tegenpartij / Relatie</th>
                <th className="py-3.5 px-4">Type</th>
                <th className="py-3.5 px-4">Bedrag</th>
                <th className="py-3.5 px-4">Vervaldatum</th>
                <th className="py-3.5 px-4">Time Gap Dagen</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actie</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-8 text-center text-slate-400">
                    Geen facturen gevonden die voldoen aan de filters.
                  </td>
                </tr>
              ) : (
                filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      {inv.invoiceNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{inv.counterparty}</div>
                      {inv.notes && <div className="text-[10px] text-slate-400">{inv.notes}</div>}
                    </td>
                    <td className="py-3.5 px-4">
                      {inv.type === 'debiteur' ? (
                        <span className="inline-flex items-center text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                          Debiteur (Inkomend)
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          Crediteur (Uitgaand)
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 font-black text-slate-900">
                      € {inv.amount.toLocaleString('nl-NL')}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={13} className="text-slate-400" />
                        <span>{inv.dueDate}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        inv.timeGapDays > 30 
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : inv.timeGapDays > 14
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}>
                        <Clock size={11} />
                        <span>{inv.timeGapDays} dagen gap</span>
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      {inv.status === 'overbrugd' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                          <CheckCircle2 size={12} /> Overbrugd met TGC
                        </span>
                      )}
                      {inv.status === 'openstaand' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                          <Clock size={12} /> Openstaand
                        </span>
                      )}
                      {inv.status === 'voldaan' && (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                          <CheckCircle2 size={12} /> Voldaan
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {inv.status === 'openstaand' && inv.type === 'debiteur' && (
                        <button
                          onClick={() => setBridgeTargetInvoice(inv)}
                          className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs inline-flex items-center gap-1 shadow-sm transition-all"
                        >
                          <Zap size={12} />
                          <span>Overbrug met TGC</span>
                        </button>
                      )}
                      {inv.status === 'openstaand' && inv.type === 'crediteur' && (
                        <button
                          onClick={() => setBridgeTargetInvoice(inv)}
                          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-xl text-xs inline-flex items-center gap-1 shadow-sm transition-all"
                        >
                          <Sparkles size={12} />
                          <span>Skonto Arbitrage</span>
                        </button>
                      )}
                      {inv.status === 'overbrugd' && (
                        <span className="text-[11px] text-teal-700 font-semibold">
                          Actief gedekt
                        </span>
                      )}
                      {inv.status === 'voldaan' && (
                        <span className="text-[11px] text-slate-400">
                          Afgerond
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bridge Invoice Modal */}
      {bridgeTargetInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Route 2 • Directe Interventie</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Factuur Overbruggen met TGC</h3>
                <p className="text-xs text-slate-500">
                  Dicht het timinggat voor factuur <span className="font-bold text-slate-800">{bridgeTargetInvoice.invoiceNumber}</span>.
                </p>
              </div>
              <button 
                onClick={() => setBridgeTargetInvoice(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {bridgeSuccess ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-950">TGC-Interventie Direct Geactiveerd!</h4>
                <p className="text-xs text-emerald-800">
                  De factuur is gekoppeld en de liquiditeit is ontgrendeld. Zodra {bridgeTargetInvoice.counterparty} betaalt, stopt de interventie automatisch.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Relatie:</span>
                    <span className="font-bold text-slate-900">{bridgeTargetInvoice.counterparty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Factuurbedrag:</span>
                    <span className="font-black text-slate-900">€ {bridgeTargetInvoice.amount.toLocaleString('nl-NL')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Time Gap Termijn:</span>
                    <span className="font-bold text-teal-700">{bridgeTargetInvoice.timeGapDays} Dagen wachttijd</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1.5">Kies de toe te passen TGC-Methode</label>
                  <select
                    value={selectedMethodCode}
                    onChange={(e) => setSelectedMethodCode(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  >
                    {TGC_METHODS_CATALOG.slice(0, 6).map(m => (
                      <option key={m.code} value={m.code}>
                        {m.code} - {m.title} ({m.indicativeFee})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-900 text-[11px] space-y-1">
                  <span className="font-bold block">Transparante Vaste Vergoeding</span>
                  <p>
                    Geen verborgen bankrente, geen doorlopende verplichtingen. De vaste vergoeding wordt éénmalig berekend en de interventie wordt automatisch beëindigd bij betaling.
                  </p>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setBridgeTargetInvoice(null)}
                    className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Annuleren
                  </button>
                  <button
                    type="button"
                    onClick={handleBridgeConfirm}
                    className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2 rounded-xl shadow-md"
                  >
                    Activeer Overbrugging
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Invoice Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Nieuwe Factuur Registreren</h3>
                <p className="text-xs text-slate-500">Voeg een inkomende debiteur of uitgaande leveranciersfactuur toe.</p>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Type Factuur</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  >
                    <option value="debiteur">Debiteur (Verkoop / Te ontvangen)</option>
                    <option value="crediteur">Crediteur (Inkoop / Te betalen)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Factuurnummer</label>
                  <input
                    type="text"
                    required
                    placeholder="bijv. VF-2026-105"
                    value={newInvoiceNumber}
                    onChange={(e) => setNewInvoiceNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Klant / Leverancier (Tegenpartij)</label>
                <input
                  type="text"
                  required
                  placeholder="bijv. Heijmans B.V. of KPN Zakelijk"
                  value={newCounterparty}
                  onChange={(e) => setNewCounterparty(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Factuurbedrag (€)</label>
                  <input
                    type="number"
                    required
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Vervaldatum</label>
                  <input
                    type="date"
                    required
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notities (optioneel)</label>
                <input
                  type="text"
                  placeholder="bijv. Inkooporder PO-8891 gekoppeld"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
                >
                  Annuleren
                </button>
                <button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-4 py-2 rounded-xl shadow-md"
                >
                  Opslaan in Kalender
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default InvoicesTab;
