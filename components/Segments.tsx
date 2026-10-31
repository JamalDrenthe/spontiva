import React from 'react';
import { SEGMENTS } from '../constants';
import { Users, Laptop, Container, Building2, ShoppingBag, ArrowUpRight } from 'lucide-react';
import Card3D from './Card3D';
import ScrollReveal from './ScrollReveal';

const sectorVisuals = [
  {
    icon: Laptop,
    gradient: 'from-blue-600 to-indigo-700',
    tag: 'Factuurtermijn 45-60d',
    metric: '100% Salarisgarantie'
  },
  {
    icon: Container,
    gradient: 'from-teal-600 to-emerald-700',
    tag: 'Pre-order & Voorraad',
    metric: 'Directe Inkoopkracht'
  },
  {
    icon: Building2,
    gradient: 'from-amber-600 to-orange-700',
    tag: 'Fasefacturatie',
    metric: 'Materiaalliquiditeit'
  },
  {
    icon: ShoppingBag,
    gradient: 'from-emerald-600 to-teal-800',
    tag: 'Campagne & ROAS',
    metric: 'Seizoensversneller'
  }
];

const Segments: React.FC = () => {
  return (
    <section id="doelgroep" className="py-24 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal direction="up">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Users size={14} className="text-teal-600" />
              <span>Sectoren & Doelgroepen</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl tracking-tight">
              Voor wie is Spontiva TGC?
            </h2>
            <p className="mt-3 text-lg text-slate-500">
              Onze 60+ Time Gap Cashflow structuren zijn specifiek geconfigureerd voor bedrijven met periodieke liquiditeitsknelpunten.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SEGMENTS.map((segment, index) => {
            const visual = sectorVisuals[index];
            const Icon = visual.icon;
            return (
              <ScrollReveal key={index} direction="up" delay={index * 100}>
                <Card3D className="group rounded-3xl border border-slate-200/90 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col justify-between">
                  <div>
                    {/* Bespoke Header Graphic */}
                    <div className={`h-28 w-full bg-gradient-to-br ${visual.gradient} p-5 flex flex-col justify-between text-white relative overflow-hidden`}>
                       <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                       <div className="flex items-center justify-between relative z-10">
                          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                             <Icon size={20} className="text-white" />
                          </div>
                          <span className="text-[11px] font-bold bg-black/20 px-2.5 py-1 rounded-full backdrop-blur-sm">
                             {visual.tag}
                          </span>
                       </div>
                       <div className="text-xs font-semibold text-white/90 relative z-10">
                          {visual.metric}
                       </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                        {segment.title}
                      </h3>
                      <p className="text-slate-500 mb-4 text-xs font-medium leading-relaxed">
                        {segment.description}
                      </p>
                      <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                        <p className="text-slate-700 text-xs leading-relaxed">
                          <span className="font-bold text-teal-700 block mb-1">De praktijkcase:</span>
                          {segment.useCase}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <a
                      href="#kosten"
                      className="inline-flex items-center text-xs font-bold text-teal-700 hover:text-teal-800 transition-colors gap-1 group/link"
                    >
                      <span>Bereken voor deze sector</span>
                      <ArrowUpRight size={14} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </Card3D>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Segments;
