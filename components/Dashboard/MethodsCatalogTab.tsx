import React, { useState } from 'react';
import { TGC_METHODS_CATALOG, METHOD_CATEGORIES } from '../../tgcMethodsData';
import { TGCMethod, TGCMethodCategory } from '../../types';
import { DashboardTab } from './DashboardLayout';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Zap, 
  Percent, 
  Sparkles,
  Building,
  Check,
  PlusCircle,
  HelpCircle,
  Info
} from 'lucide-react';

interface MethodsCatalogTabProps {
  onSelectMethod: (methodCode: string) => void;
  onNavigate: (tab: DashboardTab) => void;
}

const MethodsCatalogTab: React.FC<MethodsCatalogTabProps> = ({ onSelectMethod, onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<TGCMethodCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSuitability, setSelectedSuitability] = useState<string>('all');
  const [activeModalMethod, setActiveModalMethod] = useState<TGCMethod | null>(null);

  const filteredMethods = TGC_METHODS_CATALOG.filter(method => {
    const matchesCategory = selectedCategory === 'all' || method.category === selectedCategory;
    const matchesSuitability = selectedSuitability === 'all' || method.suitability.includes(selectedSuitability as any);
    const matchesSearch = 
      method.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      method.useCase.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSuitability && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 rounded-2xl p-6 sm:p-8 text-white shadow-xl border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center space-x-2 text-teal-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Spontiva Kennisbank & Methodologie</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            60+ TGC-Methodes Catalogus
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            Spontiva beschikt over een breed palet aan Time Gap Cashflow methodes. Iedere methode is ontworpen om tijdelijke liquiditeitsgaten te overbruggen en stopt automatisch zodra reguliere debiteurenbetalingen binnenkomen.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
          <button
            onClick={() => onNavigate('analyses')}
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2.5 rounded-xl text-xs flex items-center justify-center space-x-2 border border-white/15 transition-all"
          >
            <BookOpen size={16} />
            <span>Laat Passende Methode Bepalen (Route 1)</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
        
        {/* Search and Suitability row */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Zoek methode (bijv. Skonto, Flex-Bridge, Seizoen, Bouw)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>

          {/* Segment Filter */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">Bedrijfstype:</span>
            <select
              value={selectedSuitability}
              onChange={(e) => setSelectedSuitability(e.target.value)}
              className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
            >
              <option value="all">Alle segmenten</option>
              <option value="ZZP">ZZP Ondernemers</option>
              <option value="MKB">MKB Ondernemingen</option>
              <option value="Retail">Retail & Groothandel</option>
              <option value="Projectorganisaties">Projectorganisaties</option>
              <option value="Handelsbedrijven">Handelsbedrijven</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none border-t border-slate-100">
          {METHOD_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMethods.map(method => (
          <div 
            key={method.id}
            className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group hover:border-teal-500/50"
          >
            <div className="p-5 space-y-4">
              
              {/* Top Meta */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2.5 py-1 rounded-lg">
                    {method.code}
                  </span>
                  <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    {method.categoryLabel}
                  </span>
                </div>
                {method.isPopular && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Sparkles size={10} /> Populair
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                  {method.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1.5 line-clamp-3 leading-relaxed">
                  {method.description}
                </p>
              </div>

              {/* Key Specs */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                <div className="bg-slate-50 p-2 rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Time Gap Bereik</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Clock size={12} className="text-teal-600" />
                    {method.timeGapRange}
                  </span>
                </div>
                <div className="bg-slate-50 p-2 rounded-xl">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Kostenindicatie</span>
                  <span className="font-semibold text-slate-800 flex items-center gap-1 mt-0.5">
                    <Percent size={12} className="text-emerald-600" />
                    {method.indicativeFee}
                  </span>
                </div>
              </div>

              {/* Suitability Pills */}
              <div className="flex flex-wrap gap-1 pt-1">
                {method.suitability.map((suit, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium">
                    {suit}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setActiveModalMethod(method)}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold px-2 py-1.5 flex items-center gap-1"
              >
                <Info size={14} />
                <span>Details bekijken</span>
              </button>

              <button
                onClick={() => onSelectMethod(method.code)}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-3.5 py-1.5 rounded-xl text-xs flex items-center space-x-1.5 shadow-sm transition-all"
              >
                <span>Methode Inzetten</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      {activeModalMethod && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-bold bg-slate-900 text-white px-2.5 py-1 rounded-lg">
                  {activeModalMethod.code}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">{activeModalMethod.title}</h3>
                <p className="text-xs text-teal-700 font-semibold">{activeModalMethod.categoryLabel}</p>
              </div>
              <button 
                onClick={() => setActiveModalMethod(null)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Beschrijving van de methode</h4>
                <p className="leading-relaxed">{activeModalMethod.description}</p>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <h4 className="font-bold text-slate-900 mb-1">Typische Situatie / Use Case</h4>
                <p className="leading-relaxed">{activeModalMethod.useCase}</p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5">Benodigde Documentatie</h4>
                <ul className="space-y-1">
                  {activeModalMethod.requirements.map((req, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-slate-700">
                      <CheckCircle2 size={13} className="text-teal-600 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-900">
                <span className="font-bold block mb-0.5">Automatische Beëindiging</span>
                <span>Zodra de normale inkomsten van de debiteur binnenkomen, stopt deze TGC-interventie direct. Geen langlopende rente of structurele schuld.</span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                onClick={() => setActiveModalMethod(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Sluiten
              </button>
              <button
                onClick={() => {
                  const code = activeModalMethod.code;
                  setActiveModalMethod(null);
                  onSelectMethod(code);
                }}
                className="bg-teal-600 hover:bg-teal-500 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 shadow-md"
              >
                <span>Direct Inzetten</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MethodsCatalogTab;
