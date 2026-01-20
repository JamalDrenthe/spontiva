import React from 'react';
import { PROCESS_STEPS } from '../constants';

const Process: React.FC = () => {
  return (
    <section id="werkwijze" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4">
            <span className="inline-block transition-transform duration-300 hover:scale-105 hover:text-teal-700 cursor-default">Hoe het werkt</span>
          </h2>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            Transparant en stapsgewijs naar meer controle over je cashflow.
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-gradient-to-r from-slate-200 via-teal-100 to-slate-200 rounded-full" aria-hidden="true"></div>

          <div className="grid md:grid-cols-3 gap-12">
            {PROCESS_STEPS.map((step) => (
              <div key={step.number} className="relative group">
                <div className="flex flex-col items-center text-center">
                  <div className="relative flex items-center justify-center w-24 h-24 bg-white border-4 border-white rounded-full z-10 shadow-lg shadow-slate-200/50 mb-8 group-hover:scale-110 transition-transform duration-300">
                    <div className="absolute inset-0 rounded-full border-4 border-slate-100 group-hover:border-teal-50 transition-colors"></div>
                    <span className="text-3xl font-black text-slate-300 group-hover:text-teal-600 transition-colors">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-4 px-4">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed px-4">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
           <div className="inline-flex items-center justify-center bg-white px-6 py-4 rounded-2xl shadow-md border border-slate-100 max-w-xl mx-auto">
             <div className="flex-shrink-0 w-2 h-2 rounded-full bg-teal-500 mr-4 animate-pulse"></div>
             <p className="text-slate-600 font-medium">
               <span className="text-slate-900 font-bold">Stap 4: Afsluiting.</span> De methode stopt automatisch zodra de normale geldstroom herstelt.
             </p>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Process;