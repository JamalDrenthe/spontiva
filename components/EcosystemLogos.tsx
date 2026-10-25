import React, { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import Card3D from './Card3D';
import { ArrowUpRight, ShieldCheck, Network, Layers, Sparkles } from 'lucide-react';

interface SisterCompany {
  id: string;
  name: string;
  tagline: string;
  category: string;
  logo: string;
  description: string;
  synergy: string;
}

export const SISTER_COMPANIES: SisterCompany[] = [
  {
    id: 'quantum-initium',
    name: 'QuantumInitium',
    tagline: 'Holding & Venture Matrix',
    category: 'Venture Capital',
    logo: '/logos/quantum-initium.svg',
    description: 'De strategische moederholding die de kapitaalstructuur en langetermijnvisie van het ecosysteem stuurt.',
    synergy: 'Directe strategische verankering en kapitaalgaranties voor grootschalige werkkapitaalprogramma’s.'
  },
  {
    id: 'vvc',
    name: 'VVC',
    tagline: 'Commercial Gateway & Netwerk',
    category: 'Business Club',
    logo: '/logos/vvc.svg',
    description: 'Verdienende Vrienden Club — het besloten zakelijke netwerk van topondernemers en kapitaalstrategen.',
    synergy: 'Toegang tot een hecht B2B-dealflow netwerk met gevalideerde transactiegeschiedenis.'
  },
  {
    id: 'investbotiq',
    name: 'Investbotiq',
    tagline: 'Cashflow & Execution Engine',
    category: 'FinTech Algoritmes',
    logo: '/logos/investbotiq.svg',
    description: 'Geautomatiseerde kapitaalallocatie en algoritmische cashflow optimalisatie.',
    synergy: 'Realtime data-koppeling voor geautomatiseerde TGC-liquiditeitsberekeningen.'
  },
  {
    id: 'crmos',
    name: 'CRMos',
    tagline: 'Enterprise SaaS & Intelligence',
    category: 'Enterprise SaaS',
    logo: '/logos/crmos.svg',
    description: 'Modern relatie- en pijplijnbeheer voor high-velocity verkoop- en serviceorganisaties.',
    synergy: 'Inzicht in debiteurentermijnen en pijplijnwaarde voor nauwkeurige gap-analyses.'
  },
  {
    id: 'djobba',
    name: 'DJOBBA',
    tagline: 'B2B IT & Tech Detachering',
    category: 'Tech Detachering',
    logo: '/logos/djobba.svg',
    description: 'Gespecialiseerde IT-detachering en high-end tech talent pool voor scale-ups en corporates.',
    synergy: 'Overbrugging van 30-60 dagen betalingstermijnen op enterprise detacheringscontracten.'
  },
  {
    id: 'boostplug',
    name: 'Boostplug',
    tagline: 'Growth & Performance Acceleration',
    category: 'Growth Tech',
    logo: '/logos/boostplug.svg',
    description: 'Marketing- en reviewversneller voor schaalbare e-commerce en digitale ondernemingen.',
    synergy: 'Financiering van mediabudgetten en voorraadcycli op basis van voorspelbare ROAS.'
  },
  {
    id: 'woningvry',
    name: 'WoningVry',
    tagline: 'PropTech & Real Estate Innovation',
    category: 'PropTech',
    logo: '/logos/woningvry.svg',
    description: 'Innovatieve vastgoedtransities en alternatieve financieringsstructuren voor vastgoedportefeuilles.',
    synergy: 'Liquiditeitsoverbrugging tussen vastgoedprojectfasen en verkoopoverdrachten.'
  },
  {
    id: 'immigratiepunt',
    name: 'Immigratiepunt',
    tagline: 'Visa, Relocation & Corporate Mobility',
    category: 'Global Mobility',
    logo: '/logos/immigratiepunt.svg',
    description: 'End-to-end expat- en immigratiebegeleiding voor internationale professionals en kennismigranten.',
    synergy: 'Garanties voor onboarding en internationale salary-settlements.'
  },
  {
    id: 'xabi-world',
    name: 'Xabi World',
    tagline: 'Global Payment Rails & Merchant',
    category: 'Global Payments',
    logo: '/logos/xabi-world.svg',
    description: 'Veilige internationale betalingsrails en merchant clearing voor grensoverschrijdende handel.',
    synergy: 'Directe verrekening en escrow-oplossingen bij grensoverschrijdende TGC-faciliteiten.'
  },
  {
    id: 'zheavenzy',
    name: 'Zheavenzy',
    tagline: 'Creative Studio & Sound Media',
    category: 'Creative Studio',
    logo: '/logos/zheavenzy.svg',
    description: 'Professionele audio-, studio- en multimedia-producties voor next-gen merken.',
    synergy: 'Productie- en royalty-overbrugging bij distributiecontracten en mediareleases.'
  },
  {
    id: 'logs-rent',
    name: 'Logs.rent',
    tagline: 'Cloud Infrastructure & High Availability',
    category: 'Cloud Infra',
    logo: '/logos/logs-rent.svg',
    description: 'Gespecialiseerde servercapaciteit, account hosting en hoogbeschikbare cloud storage.',
    synergy: 'Financiering van langlopende data- en serverlicenties zonder upfront cash drain.'
  }
];

const EcosystemLogos: React.FC = () => {
  const [activeCompany, setActiveCompany] = useState<SisterCompany | null>(null);

  // Duplicate list for infinite continuous marquee loop
  const marqueeItems = [...SISTER_COMPANIES, ...SISTER_COMPANIES];

  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden border-y border-slate-800/80">
      {/* Background radial ambient lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold tracking-wide uppercase mb-4">
              <Network size={14} className="text-teal-400" />
              <span>Verbonden Ecosysteem</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4">
              Onderdeel van een krachtig <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200 bg-clip-text text-transparent">
                ondernemersnetwerk
              </span>
            </h2>
            
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
              Spontiva financiert, versnelt en ontzorgt werkkapitaal in nauwe synergie met 11 gespecialiseerde bedrijven binnen het QuantumInitium netwerk.
            </p>
          </div>
        </ScrollReveal>

        {/* Marquee Ticker: Infinite smooth gliding strip */}
        <div className="relative mb-16 overflow-hidden mask-gradient-x">
          {/* Gradient fade edge masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />

          <div className="flex gap-4 sm:gap-6 animate-marquee hover:[animation-play-state:paused] w-max py-2">
            {marqueeItems.map((comp, idx) => (
              <button
                key={`${comp.id}-${idx}`}
                onClick={() => setActiveCompany(comp)}
                className={`flex items-center gap-3.5 px-4 py-2.5 rounded-2xl border transition-all duration-300 group text-left ${
                  activeCompany?.id === comp.id
                    ? 'bg-teal-900/40 border-teal-500 shadow-lg shadow-teal-500/20'
                    : 'bg-slate-900/80 border-slate-800 hover:bg-slate-800/90 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-700/60 p-1.5 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <img
                    src={comp.logo}
                    alt={comp.name}
                    className="w-full h-full object-contain filter drop-shadow"
                    loading="lazy"
                  />
                </div>
                <div className="pr-2">
                  <div className="text-sm font-bold text-white group-hover:text-teal-300 transition-colors flex items-center gap-1">
                    {comp.name}
                  </div>
                  <div className="text-[11px] text-slate-400 font-medium">
                    {comp.category}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid of the 11 Companies */}
        <ScrollReveal direction="up" delay={150}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {SISTER_COMPANIES.map((comp) => {
              const isSelected = activeCompany?.id === comp.id;
              return (
                <div
                  key={comp.id}
                  onClick={() => setActiveCompany(isSelected ? null : comp)}
                  className={`group relative rounded-2xl p-5 border cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-b from-teal-950/50 to-slate-900/90 border-teal-500 shadow-xl shadow-teal-500/10 -translate-y-1'
                      : 'bg-slate-900/60 border-slate-800/90 hover:bg-slate-900 hover:border-slate-700 hover:-translate-y-1'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 p-2.5 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform group-hover:border-teal-500/40">
                      <img
                        src={comp.logo}
                        alt={comp.name}
                        className="w-full h-full object-contain filter drop-shadow"
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-teal-400 bg-teal-950/80 border border-teal-800/60 px-2.5 py-1 rounded-full">
                      {comp.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-teal-300 transition-colors flex items-center justify-between">
                    <span>{comp.name}</span>
                    <ArrowUpRight size={16} className="text-slate-500 group-hover:text-teal-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  
                  <p className="text-xs font-medium text-slate-400 mb-3">
                    {comp.tagline}
                  </p>

                  <p className="text-xs text-slate-400/90 leading-relaxed line-clamp-2 mb-3">
                    {comp.description}
                  </p>

                  <div className="pt-3 border-t border-slate-800/80 flex items-center gap-1.5 text-[11px] font-medium text-slate-400 group-hover:text-teal-300 transition-colors">
                    <Sparkles size={13} className="text-teal-400 shrink-0" />
                    <span className="truncate">Synergie: {comp.synergy}</span>
                  </div>
                </div>
              );
            })}

            {/* Final Highlight Card: Spontiva's Position */}
            <div className="sm:col-span-2 lg:col-span-1 rounded-2xl p-5 border border-teal-500/40 bg-gradient-to-br from-teal-950/60 via-slate-900/90 to-emerald-950/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/30 p-2.5 flex items-center justify-center">
                    <Layers className="text-teal-400 w-7 h-7" />
                  </div>
                  <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-800/60 px-2.5 py-1 rounded-full">
                    Liquiditeitsmotor
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-1">
                  12 Bedrijven, 1 Visie
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  Samen vormen we een autonoom ondernemersnetwerk met diepe sectorinzichten, snelle besluitvorming en robuuste TGC-financieringsfaciliteiten.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-teal-300">
                <ShieldCheck size={16} />
                <span>Ondersteund door QuantumInitium Ltd</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Modal / Detailed Drawer for active company */}
        {activeCompany && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div 
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveCompany(null)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors"
                aria-label="Sluiten"
              >
                ✕
              </button>

              <div className="flex items-center gap-4 mb-5">
                <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-800 p-3 flex items-center justify-center">
                  <img
                    src={activeCompany.logo}
                    alt={activeCompany.name}
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">
                    {activeCompany.category}
                  </span>
                  <h3 className="text-2xl font-black text-white">
                    {activeCompany.name}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {activeCompany.tagline}
                  </p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Over het bedrijf
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {activeCompany.description}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-800/40">
                  <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Sparkles size={14} />
                    <span>Synergie met Spontiva TGC</span>
                  </div>
                  <p className="text-sm text-teal-100 leading-relaxed">
                    {activeCompany.synergy}
                  </p>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setActiveCompany(null)}
                  className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm transition-colors"
                >
                  Sluiten
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EcosystemLogos;
