import React from 'react';
import { 
  ShieldCheck, 
  TrendingUp, 
  Clock, 
  Sparkles, 
  Users, 
  Award, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  Target,
  FileCheck2,
  Lock
} from 'lucide-react';
import Card3D from './Card3D';
import ScrollReveal from './ScrollReveal';
import { PageView } from '../types';

interface AboutProps {
  onNavigate: (page: PageView) => void;
  onOpenAuth?: (mode: 'login' | 'register' | 'demo') => void;
}

const About: React.FC<AboutProps> = ({ onNavigate, onOpenAuth }) => {
  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles size={14} className="mr-2 text-teal-600 animate-pulse" />
                Over Spontiva
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                Financiële wendbaarheid <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">
                  zonder structurele schuld.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed pt-2">
                Spontiva is opgericht met één duidelijke missie: gezonde ondernemers bevrijden van het 
                <strong> Time Gap dilemma</strong>. Wij overbruggen het tijdsverschil tussen facturatie en betaling 
                met meer dan 60 beproefde methodes.
              </p>
            </div>
          </ScrollReveal>

          {/* Stats Bar */}
          <ScrollReveal direction="up" delay={200}>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              {[
                { number: '€ 18.5M+', label: 'Overbrugde Liquiditeit', icon: TrendingUp },
                { number: '420+', label: 'MKB & ZZP Klanten', icon: Users },
                { number: '< 24 Uur', label: 'Gemiddelde Doorlooptijd', icon: Clock },
                { number: '60+', label: 'TGC-Methodes Beschikbaar', icon: Zap }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <Card3D key={i} className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm text-center">
                    <Icon size={22} className="mx-auto mb-2 text-teal-600" />
                    <div className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">{stat.number}</div>
                    <div className="text-xs text-slate-500 font-medium mt-1">{stat.label}</div>
                  </Card3D>
                );
              })}
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* The Story & The Dilemma */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <ScrollReveal direction="left">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Waarom Spontiva Bestaat</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                Gezonde bedrijven horen niet vast te lopen op timing.
              </h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Veel ondernemers leveren uitstekend werk en boeken gezonde winstcijfers. Toch ontstaan er 
                maandelijks acute liquiditeitstekorten. De oorzaak? Klanten en overheden betalen op 30, 60 of 
                zelfs 90 dagen, terwijl leveranciers, salarissen en belastingen al binnen 14 dagen voldaan moeten zijn.
              </p>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                Traditionele banken vereisen maanden papierwerk, zware balansverpandingen en persoonlijke borgstellingen. 
                Factoring eist vaak je hele debiteurenbeheer op tegen hoge doorlopende commissies.
              </p>
              <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-5 text-sm text-teal-950 font-medium space-y-1">
                <span className="font-bold flex items-center gap-1.5 text-teal-800">
                  <CheckCircle2 size={16} className="text-teal-600" />
                  Het Spontiva Verschil:
                </span>
                <p className="text-xs sm:text-sm text-teal-900">
                  Wij richten ons niet op kredietverstrekking met langdurige schuld, maar op procesmatige 
                  <strong> Time Gap Cashflow (TGC) interventies</strong>. Direct inzetbaar, tijdelijk van aard 
                  en exact afgestemd op de looptijd van je openstaande facturen.
                </p>
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-6">
            <ScrollReveal direction="right">
              <Card3D className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-4">
                  Traditioneel Krediet vs. Spontiva TGC
                </h3>

                <div className="space-y-4 text-xs sm:text-sm">
                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg shrink-0 mt-0.5">✕</div>
                    <div>
                      <strong className="text-slate-800 block">Traditionele Banklening</strong>
                      <span className="text-slate-500">6 tot 12 weken doorlooptijd, structurele schuld op balans, strikte onderpandeisen.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3">
                    <div className="p-1.5 bg-rose-50 text-rose-600 rounded-lg shrink-0 mt-0.5">✕</div>
                    <div>
                      <strong className="text-slate-800 block">Standaard Factoring</strong>
                      <span className="text-slate-500">Volledige overname debiteurenrelatie, ondoorzichtige fees, langlopende wurgcontracten.</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 pt-2 border-t border-slate-100">
                    <div className="p-1.5 bg-teal-50 text-teal-600 rounded-lg shrink-0 mt-0.5">✓</div>
                    <div>
                      <strong className="text-teal-900 font-bold block text-sm">Spontiva TGC-Methodes</strong>
                      <span className="text-slate-700">
                        Binnen 24-48 uur geactiveerd, stopt automatisch zodra je debiteur betaalt. Behoud van 100% eigenaarschap en klantcontact.
                      </span>
                    </div>
                  </div>
                </div>
              </Card3D>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* 4 Core Pillars */}
      <section className="py-20 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Onze Principes</span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                De vier fundamenten van Spontiva
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Zo zorgen we ervoor dat je bedrijf altijd over voldoende werkkapitaal beschikt.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Snelheid boven bureaucratie",
                desc: "Geen trage kredietcommissies. Met onze geavanceerde analyses weet je binnen 24 uur waar je aan toe bent.",
                icon: Clock
              },
              {
                title: "60+ Maatwerk Methodes",
                desc: "Geen 'one-size-fits-all'. We combineren de beste technieken uit debiteuren-, inkoop- en procesfinanciering.",
                icon: Target
              },
              {
                title: "Maximale Transparantie",
                desc: "Vooraf exact inzicht in effect, looptijd en kosten. Geen verrassingen achteraf op de eindafrekening.",
                icon: FileCheck2
              },
              {
                title: "Behoud van Autonomie",
                desc: "Jij blijft in regie. Jouw debiteuren merken niets van de interventie; jouw relatie blijft jouw relatie.",
                icon: Lock
              }
            ].map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <ScrollReveal key={index} direction="up" delay={index * 120}>
                  <Card3D className="bg-slate-50 hover:bg-white p-6 rounded-2xl border border-slate-200 transition-all hover:shadow-lg h-full flex flex-col justify-between">
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 flex items-center justify-center mb-4">
                        <Icon size={20} />
                      </div>
                      <h4 className="font-bold text-slate-900 text-base mb-2">{pillar.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed">{pillar.desc}</p>
                    </div>
                  </Card3D>
                </ScrollReveal>
              );
            })}
          </div>

        </div>
      </section>

      {/* Leadership & Contact CTA */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-14 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl text-center lg:text-left">
              <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center justify-center lg:justify-start gap-1.5">
                <Sparkles size={14} /> Direct aan de slag
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Ervaar zelf het effect van een TGC-analyse
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Ontdek binnen 24 uur hoeveel vastzittend werkkapitaal vrijgemaakt kan worden voor jouw onderneming.
              </p>
            </div>

            <div className="flex flex-wrap sm:flex-nowrap gap-3 shrink-0">
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-3.5 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-teal-500/20 transition-all hover:-translate-y-0.5"
              >
                Neem Contact Op
              </button>
              <button
                onClick={() => {
                  if (onOpenAuth) onOpenAuth('demo');
                }}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs sm:text-sm border border-white/20 transition-all"
              >
                Bekijk Demo Omgeving
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

    </div>
  );
};

export default About;
