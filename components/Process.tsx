import React from 'react';
import { PROCESS_STEPS } from '../constants';
import ScrollReveal from './ScrollReveal';
import Card3D from './Card3D';

const Process: React.FC = () => {
  return (
    <section id="werkwijze" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <ScrollReveal direction="up">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Hoe het werkt
            </h2>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto">
              Transparant en stapsgewijs naar meer controle over je cashflow.
            </p>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-slate-200 via-teal-200 to-slate-200 rounded-full" aria-hidden="true"></div>

          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {PROCESS_STEPS.map((step, index) => (
              <ScrollReveal key={step.number} direction="up" delay={index * 150}>
                <Card3D className="bg-white/80 p-8 rounded-3xl border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col items-center text-center">
                  <div className="relative flex items-center justify-center w-20 h-20 bg-white border-4 border-slate-100 rounded-full z-10 shadow-lg shadow-teal-500/10 mb-6 group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-black text-teal-600">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </Card3D>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal direction="up" delay={450}>
          <div className="mt-16 text-center">
             <div className="inline-flex items-center justify-center bg-white px-6 py-4 rounded-2xl shadow-md border border-slate-100 max-w-xl mx-auto">
               <div className="flex-shrink-0 w-2.5 h-2.5 rounded-full bg-teal-500 mr-4 animate-pulse"></div>
               <p className="text-xs sm:text-sm text-slate-600 font-medium">
                 <span className="text-slate-900 font-bold">Stap 4: Afsluiting.</span> De methode stopt automatisch zodra de normale geldstroom herstelt.
               </p>
             </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};

export default Process;