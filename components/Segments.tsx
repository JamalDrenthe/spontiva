import React from 'react';
import { SEGMENTS } from '../constants';
import { Users } from 'lucide-react';

const segmentImages = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop", // ZZP/Tech
  "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?q=80&w=2832&auto=format&fit=crop", // Retail/Inventory
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop", // Project/Office
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop", // Trade/Logistics
];

const Segments: React.FC = () => {
  return (
    <section id="doelgroep" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-teal-50 rounded-xl mb-4">
             <Users className="w-6 h-6 text-teal-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            <span className="inline-block transition-transform duration-300 hover:scale-105 hover:text-teal-700 cursor-default">Voor wie is Spontiva?</span>
          </h2>
          <p className="mt-4 text-xl text-slate-500">TGC-methodes zijn toepasbaar in diverse sectoren.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SEGMENTS.map((segment, index) => (
            <div key={index} className="group rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 overflow-hidden hover:-translate-y-1">
              {/* Image Header */}
              <div className="h-32 w-full overflow-hidden relative">
                 <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10"></div>
                 <img 
                   src={segmentImages[index]} 
                   alt={segment.title}
                   className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                 />
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight min-h-[3rem]">{segment.title}</h3>
                <p className="text-slate-500 mb-4 text-xs font-bold uppercase tracking-wide">
                  {segment.description}
                </p>
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <p className="text-slate-700 text-xs leading-relaxed">
                    <span className="font-semibold text-teal-600 block mb-1">De praktijk:</span>
                    {segment.useCase}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Segments;