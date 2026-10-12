import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { ApplicationType } from '../../types';
import { 
  PlusCircle, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Calculator, 
  ShieldCheck, 
  Calendar, 
  Building2, 
  Sparkles 
} from 'lucide-react';

interface NewApplicationTabProps {
  onSuccess: () => void;
}

const NewApplicationTab: React.FC<NewApplicationTabProps> = ({ onSuccess }) => {
  const { currentUser, addApplication } = useAuth();

  const [type, setType] = useState<ApplicationType>('analyse');
  const [amount, setAmount] = useState<number>(15000);
  const [timeGapDays, setTimeGapDays] = useState<number>(30);
  const [counterparty, setCounterparty] = useState('');
  const [invoiceDescription, setInvoiceDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counterparty || !invoiceDescription) return;

    addApplication({
      type,
      amount,
      timeGapDays,
      counterparty,
      invoiceDescription,
      notes
    });

    setSubmitted(true);
    setTimeout(() => {
      onSuccess();
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Nieuwe TGC-Aanvraag / Analyse</h1>
        <p className="text-xs text-slate-500">
          Dien je openstaande debiteuren, inkooporder of liquiditeitsvraag in voor Time Gap overbrugging.
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={24} />
          </div>
          <h2 className="text-lg font-bold text-emerald-950">Aanvraag Succesvol Ingediend!</h2>
          <p className="text-xs text-emerald-800 max-w-md mx-auto">
            Je dossier is direct aangemaakt en in behandeling genomen. Onze specialisten beoordelen de Time Gap analyse binnen 24 uur.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          
          {/* Step 1: Keuze Type */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Type Interventie
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setType('analyse')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  type === 'analyse'
                    ? 'border-teal-500 bg-teal-50/50 ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-2 font-bold text-sm text-slate-900">
                  <FileText size={16} className="text-teal-600" />
                  <span>TGC-Analyse</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Kijkje in processen, timing van inkomende en uitgaande geldstromen naast elkaar leggen.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setType('aanvraag')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  type === 'aanvraag'
                    ? 'border-teal-500 bg-teal-50/50 ring-2 ring-teal-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-2 font-bold text-sm text-slate-900">
                  <Sparkles size={16} className="text-teal-600" />
                  <span>Directe TGC-Aanvraag</span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Directe inzet van Spontiva methodes om het tijdsgat onmiddellijk te overbruggen.
                </p>
              </button>
            </div>
          </div>

          {/* Step 2: Bedrag & Dagen */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Benodigd Overbruggingsbedrag</label>
                <span className="text-sm font-black text-slate-900">€ {amount.toLocaleString('nl-NL')}</span>
              </div>
              <input
                type="range"
                min="2500"
                max="150000"
                step="2500"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>€ 2.500</span>
                <span>€ 150.000+</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold text-slate-700">Geschatte Time Gap (Dagen)</label>
                <span className="text-sm font-black text-slate-900">{timeGapDays} dagen</span>
              </div>
              <input
                type="range"
                min="7"
                max="90"
                step="1"
                value={timeGapDays}
                onChange={(e) => setTimeGapDays(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>7 dagen</span>
                <span>90 dagen</span>
              </div>
            </div>
          </div>

          {/* Step 3: Specificaties */}
          <div className="space-y-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Debiteur / Tegenpartij / Leverancier
              </label>
              <input
                type="text"
                required
                placeholder="Bijv. Gemeente Amsterdam, TechCorp B.V., Leverancier Logistics"
                value={counterparty}
                onChange={(e) => setCounterparty(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Omschrijving van de factuur of verplichting
              </label>
              <textarea
                required
                rows={3}
                placeholder="Geef een korte toelichting op de prestatie, geleverde goederen of diensten..."
                value={invoiceDescription}
                onChange={(e) => setInvoiceDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Extra opmerkingen of specifieke wensen (optioneel)
              </label>
              <input
                type="text"
                placeholder="Bijv. gewenste startdatum voor interventie, wachttijd op PO-nummer"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="text-[11px] text-slate-500">
              Vertrouwelijke verwerking conform AVG & Spontiva privacybeleid.
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs flex items-center space-x-2 shadow-lg shadow-slate-900/10 transition-all hover:-translate-y-0.5"
            >
              <span>Verstuur Aanvraag</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </form>
      )}

    </div>
  );
};

export default NewApplicationTab;
