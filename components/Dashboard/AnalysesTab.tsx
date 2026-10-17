import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { AnalysisReport } from '../../types';
import { DashboardTab } from './DashboardLayout';
import { 
  FileSearch, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ArrowRight, 
  PlusCircle, 
  Download, 
  TrendingUp, 
  ShieldCheck, 
  Calendar, 
  Building2,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';

interface AnalysesTabProps {
  onStartNewAnalysis: () => void;
  onDeployMethod: (methodCode: string) => void;
  onNavigate: (tab: DashboardTab) => void;
}

const AnalysesTab: React.FC<AnalysesTabProps> = ({ onStartNewAnalysis, onDeployMethod, onNavigate }) => {
  const { userReports, currentUser } = useAuth();
  const [selectedReportId, setSelectedReportId] = useState<string>(
    userReports.length > 0 ? userReports[0].id : ''
  );
  const [showNewModal, setShowNewModal] = useState(false);
  const [newCompany, setNewCompany] = useState(currentUser?.companyName || '');
  const [debtorTerms, setDebtorTerms] = useState(45);
  const [creditorTerms, setCreditorTerms] = useState(14);
  const [notes, setNotes] = useState('');
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  const selectedReport = userReports.find(r => r.id === selectedReportId) || userReports[0];

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRequestSubmitted(true);
    setTimeout(() => {
      setShowNewModal(false);
      setRequestSubmitted(false);
    }, 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Route 1 Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <FileSearch size={14} />
            <span>Route 1 • Procesaudits & Diagnostiek</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            TGC-Analyses & Knelpunten Audit
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Bij een TGC-analyse leggen we de timing van inkomende en uitgaande geldstromen naast elkaar. Je krijgt inzicht in waar inkoop, debiteuren en facturatie knellen, inclusief concrete interventiepunten en opties om weloverwogen keuzes te maken.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <button
            onClick={() => setShowNewModal(true)}
            className="bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 shadow-lg shadow-teal-500/20 transition-all"
          >
            <PlusCircle size={15} />
            <span>Vraag Nieuwe TGC-Analyse Aan</span>
          </button>
        </div>
      </div>

      {userReports.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-4">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-500">
            <FileSearch size={22} />
          </div>
          <h3 className="text-base font-bold text-slate-800">Nog geen uitgevoerde TGC-analyses</h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Laat Spontiva je kasstroom en betaaltermijnen analyseren om direct te zien waar verborgen werkkapitaal zit.
          </p>
          <button
            onClick={() => setShowNewModal(true)}
            className="bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Start je eerste analyse
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Report Selector list */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
              Jouw Auditrapporten ({userReports.length})
            </h2>

            <div className="space-y-2">
              {userReports.map(report => (
                <div
                  key={report.id}
                  onClick={() => setSelectedReportId(report.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedReport?.id === report.id
                      ? 'bg-white border-teal-500 shadow-md ring-2 ring-teal-500/20'
                      : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span className="font-mono font-semibold">{report.id.toUpperCase()}</span>
                    <span>{report.auditDate}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 line-clamp-1">{report.title}</h3>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Efficiëntiescore:</span>
                    <span className="font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                      {report.cashflowScore}/100
                    </span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Vrij potentieel:</span>
                    <span className="font-bold text-slate-800">
                      € {report.unlockedPotential.toLocaleString('nl-NL')}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Helper Box */}
            <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200/60 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <Info size={14} className="text-teal-600" />
                <span>Geen verplichtingen</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Een TGC-analyse verplicht je tot niets. Het geeft je feitelijke opties op basis van je echte processen, zodat je zelf beslist of en wanneer je een methode activeert.
              </p>
            </div>
          </div>

          {/* Right Column: Detailed Report View */}
          {selectedReport && (
            <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
              
              {/* Header with Title & Badge */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-400 mb-1">
                    <span className="font-mono">{selectedReport.id.toUpperCase()}</span>
                    <span>•</span>
                    <span>Geanalyseerd op {selectedReport.auditDate}</span>
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">{selectedReport.title}</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Onderneming: {selectedReport.companyName}</p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 size={13} /> Voltooid
                  </span>
                  <button 
                    onClick={() => alert(`Analyserapport ${selectedReport.id} wordt geëxporteerd als PDF...`)}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors"
                    title="Exporteer als PDF"
                  >
                    <Download size={15} />
                  </button>
                </div>
              </div>

              {/* KPI Score Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Cashflow Score</span>
                  <span className="text-xl font-black text-teal-600">{selectedReport.cashflowScore}/100</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Gezonde basis</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Debiteuren Dagen</span>
                  <span className="text-xl font-black text-slate-900">{selectedReport.avgDebtorDays} dgn</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Gem. betaaltermijn</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Crediteuren Dagen</span>
                  <span className="text-xl font-black text-slate-900">{selectedReport.avgCreditorDays} dgn</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">Eis leveranciers</span>
                </div>
                <div className="bg-teal-50/70 p-3.5 rounded-xl border border-teal-100">
                  <span className="text-[10px] uppercase font-bold text-teal-700 block">Vrij te Maken Ruimte</span>
                  <span className="text-xl font-black text-teal-900">
                    € {selectedReport.unlockedPotential.toLocaleString('nl-NL')}
                  </span>
                  <span className="text-[10px] text-teal-700 block mt-0.5">Via TGC-methodes</span>
                </div>
              </div>

              {/* Detected Bottlenecks & Intervention Points */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <AlertTriangle size={14} className="text-amber-500" />
                  <span>Geïdentificeerde Interventiepunten ({selectedReport.bottlenecks.length})</span>
                </h3>

                <div className="space-y-3">
                  {selectedReport.bottlenecks.map((bn, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-all space-y-2.5"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            bn.severity === 'hoog' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-800'
                          }`}>
                            Piek: {bn.severity}
                          </span>
                          <span className="font-bold text-xs text-slate-900">{bn.title}</span>
                        </div>
                        <span className="font-extrabold text-xs text-slate-800">
                          Gat: € {bn.impactAmount.toLocaleString('nl-NL')} ({bn.daysDelay} dagen vertraging)
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {bn.description}
                      </p>

                      <div className="pt-2 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div className="flex items-center space-x-1.5 text-xs">
                          <span className="text-slate-400">Aanbevolen methode:</span>
                          <span className="font-bold text-teal-700">{bn.suggestedMethodCode} • {bn.suggestedMethodTitle}</span>
                        </div>

                        <button
                          onClick={() => onDeployMethod(bn.suggestedMethodCode)}
                          className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-lg text-xs flex items-center space-x-1 self-start sm:self-auto transition-colors"
                        >
                          <span>Activeer {bn.suggestedMethodCode}</span>
                          <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Conclusion & Recommendation */}
              <div className="bg-slate-900 text-white rounded-xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>Audit Conclusie & Advies</span>
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedReport.conclusion}
                </p>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Volgende stap:</span>
                  <span className="font-semibold text-teal-300">{selectedReport.recommendedNextStep}</span>
                </div>
              </div>

            </div>
          )}
        </div>
      )}

      {/* New Analysis Request Modal */}
      {showNewModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600">Route 1</span>
                <h3 className="text-xl font-bold text-slate-900">Nieuwe TGC-Analyse Aanvragen</h3>
                <p className="text-xs text-slate-500 mt-1">Geheel vrijblijvende audit van je cashflow timingverschillen.</p>
              </div>
              <button 
                onClick={() => setShowNewModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            {requestSubmitted ? (
              <div className="p-6 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 size={32} className="text-emerald-600 mx-auto" />
                <h4 className="font-bold text-sm text-emerald-950">Aanvraag Ontvangen!</h4>
                <p className="text-xs text-emerald-800">
                  Onze analisten nemen je debiteuren- en crediteurencylus in behandeling. Binnen 24 uur ontvang je het complete diagnostische rapport.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bedrijfsnaam</label>
                  <input
                    type="text"
                    required
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Gemiddelde Debiteur Termijn</label>
                    <input
                      type="number"
                      value={debtorTerms}
                      onChange={(e) => setDebtorTerms(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                    <span className="text-[10px] text-slate-400">Dagen tot klant betaalt</span>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Crediteur Termijn</label>
                    <input
                      type="number"
                      value={creditorTerms}
                      onChange={(e) => setCreditorTerms(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200"
                    />
                    <span className="text-[10px] text-slate-400">Dagen tot leverancier eist</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Waar zit momenteel de meeste druk?</label>
                  <textarea
                    rows={3}
                    placeholder="Bijv: late betalingen overheid, seizoensvoorraad feestdagen, skonto korting..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowNewModal(false)}
                    className="px-4 py-2 font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Annuleren
                  </button>
                  <button
                    type="submit"
                    className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2 rounded-xl shadow-md"
                  >
                    Verzend Audit Aanvraag
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default AnalysesTab;
