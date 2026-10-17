import React, { useState, useEffect } from 'react';
import { useAuth } from '../../AuthContext';
import { ApplicationType } from '../../types';
import { TGC_METHODS_CATALOG } from '../../tgcMethodsData';
import { 
  PlusCircle, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  FileSearch,
  Zap,
  Calculator, 
  ShieldCheck, 
  Calendar, 
  Building2, 
  Sparkles,
  Info
} from 'lucide-react';

interface NewApplicationTabProps {
  initialType?: ApplicationType;
  initialMethodCode?: string;
  onSuccess: () => void;
}

const NewApplicationTab: React.FC<NewApplicationTabProps> = ({ 
  initialType = 'aanvraag', 
  initialMethodCode = '', 
  onSuccess 
}) => {
  const { currentUser, addApplication } = useAuth();

  const [type, setType] = useState<ApplicationType>(initialType);
  const [selectedMethodCode, setSelectedMethodCode] = useState<string>(initialMethodCode || 'TGC-M01');
  const [amount, setAmount] = useState<number>(18500);
  const [timeGapDays, setTimeGapDays] = useState<number>(34);
  const [counterparty, setCounterparty] = useState('');
  const [invoiceDescription, setInvoiceDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (initialMethodCode) {
      setSelectedMethodCode(initialMethodCode);
      setType('aanvraag');
    }
  }, [initialMethodCode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!counterparty || !invoiceDescription) return;

    const chosenMethod = TGC_METHODS_CATALOG.find(m => m.code === selectedMethodCode);

    addApplication({
      type,
      amount,
      timeGapDays,
      counterparty,
      invoiceDescription,
      notes,
      recommendedMethod: type === 'aanvraag' ? `${selectedMethodCode} • ${chosenMethod?.title || ''}` : undefined
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
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Nieuwe TGC-Aanvraag of Analyse</h1>
        <p className="text-xs text-slate-500">
          Kies tussen een grondige procesaudit (Route 1) of directe inzet van een TGC-methode (Route 2).
        </p>
      </div>

      {submitted ? (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center space-y-3">
          <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={24} />
          </div>
          <h2 className="text-lg font-bold text-emerald-950">Aanvraag Succesvol Ingediend!</h2>
          <p className="text-xs text-emerald-800 max-w-md mx-auto">
            Je dossier is direct aangemaakt en in behandeling genomen. Onze cashflow-specialisten verwerken je verzoek binnen 24 uur.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          
          {/* Step 1: Keuze Route */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
              1. Kies de gewenste Route
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              
              {/* Option A: Route 1 Analyse */}
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
                  <FileSearch size={16} className="text-teal-600" />
                  <span>Route 1: TGC-Analyse</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Procesaudit van je inkomende en uitgaande geldstromen. We identificeren knelpunten en geven opties zonder verplichting.
                </p>
              </button>

              {/* Option B: Route 2 Aanvraag */}
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
                  <Zap size={16} className="text-teal-600" />
                  <span>Route 2: TGC-Aanvraag</span>
                </div>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Directe inzet van een methode om een acuut liquiditeitsgat te dichten. Stopt automatisch zodra betaling binnen is.
                </p>
              </button>
            </div>
          </div>

          {/* Conditional: Method Selection if Route 2 */}
          {type === 'aanvraag' && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Selecteer TGC-Methode uit de 60+ Catalogus
              </label>
              <select
                value={selectedMethodCode}
                onChange={(e) => setSelectedMethodCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                {TGC_METHODS_CATALOG.map(m => (
                  <option key={m.code} value={m.code}>
                    {m.code} - {m.title} ({m.categoryLabel} • {m.indicativeFee})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Step 2: Bedrag & Time Gap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {type === 'analyse' ? 'Indicatief Bedrag Factuur / Knelpunt (€)' : 'Benodigd Overbruggingsbedrag (€)'}
              </label>
              <input
                type="number"
                min="1000"
                step="500"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Geschatte Time Gap (Wachttijd in dagen)
              </label>
              <input
                type="number"
                min="7"
                max="120"
                value={timeGapDays}
                onChange={(e) => setTimeGapDays(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-bold"
              />
            </div>
          </div>

          {/* Step 3: Tegenpartij & Omschrijving */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Klant / Debiteur of Leverancier (Tegenpartij)
              </label>
              <input
                type="text"
                required
                placeholder="bijv. Gemeente Amsterdam, Heijmans B.V. of Shell Commercial"
                value={counterparty}
                onChange={(e) => setCounterparty(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Omschrijving van de factuur of prestatie
              </label>
              <input
                type="text"
                required
                placeholder="bijv. Factuur 2026-088 levering materialen project Zuidas fase 2"
                value={invoiceDescription}
                onChange={(e) => setInvoiceDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Extra Toelichting / Documentreferentie (optioneel)
              </label>
              <textarea
                rows={3}
                placeholder="Geef eventuele context mee over betalingsafspraken, inkooporders of specifieke voorwaarden..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          {/* Notice */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-teal-600" />
              <span>Transparant en vertrouwelijk</span>
            </span>
            <p className="text-[11px] leading-relaxed">
              Gegevens worden strikt vertrouwelijk behandeld. Na indiening toetst Spontiva de debiteur en presenteren we direct het afwikkelingsschema met vaste kosten.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-sm transition-all"
          >
            <span>Verstuur {type === 'analyse' ? 'TGC-Analyse Aanvraag' : 'TGC-Interventie Dossier'}</span>
            <ArrowRight size={15} />
          </button>
        </form>
      )}

    </div>
  );
};

export default NewApplicationTab;
