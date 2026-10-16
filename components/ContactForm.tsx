import React, { useState, FormEvent } from 'react';
import { CONTACT_LABELS } from '../constants';
import { FormType } from '../types';

const ContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formType, setFormType] = useState<FormType>(FormType.ANALYSIS);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
        setIsSubmitted(true);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <section id="contact" className="py-24 bg-white min-h-[600px] flex items-center justify-center">
         <div className="max-w-md mx-auto px-6 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-teal-100 shadow-sm">
               <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-4">{CONTACT_LABELS.successTitle}</h3>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">{CONTACT_LABELS.successMessage}</p>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="text-teal-600 font-bold hover:text-teal-700 hover:underline underline-offset-4"
            >
              Terug naar formulier
            </button>
         </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            <span className="inline-block transition-transform duration-300 hover:scale-105 hover:text-teal-700 cursor-default">Start vandaag nog</span>
          </h2>
          <p className="mt-4 text-xl text-slate-500">
            Vraag een analyse aan, mail naar <a href="mailto:info@spontiva.nl" className="text-teal-600 font-semibold hover:underline">info@spontiva.nl</a> of plan een kennismaking in.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 sm:p-10 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-slate-100 relative z-10">
          
          {/* Form Type Selector */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-3 uppercase tracking-wider">{CONTACT_LABELS.type}</label>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormType(FormType.ANALYSIS)}
                className={`px-4 py-3 text-sm font-bold rounded-xl border transition-all duration-200 ${
                  formType === FormType.ANALYSIS 
                    ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                TGC-Analyse
              </button>
              <button
                type="button"
                onClick={() => setFormType(FormType.REQUEST)}
                className={`px-4 py-3 text-sm font-bold rounded-xl border transition-all duration-200 ${
                  formType === FormType.REQUEST 
                    ? 'bg-teal-50 border-teal-500 text-teal-700 shadow-sm' 
                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                TGC-Aanvraag
              </button>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="company" className="block text-sm font-bold text-slate-700 mb-2">
                {CONTACT_LABELS.name}
              </label>
              <input
                type="text"
                id="company"
                required
                className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-200 font-medium text-slate-900 placeholder-slate-400"
                placeholder="Uw bedrijfsnaam"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-2">
                {CONTACT_LABELS.email}
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-200 font-medium text-slate-900 placeholder-slate-400"
                placeholder="naam@bedrijf.nl"
              />
            </div>

            <div>
               <label className="block text-sm font-bold text-slate-700 mb-2">
                 {CONTACT_LABELS.file}
               </label>
               <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-slate-200 border-dashed rounded-2xl hover:bg-slate-50 hover:border-teal-400 transition-all cursor-pointer relative group">
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
                  <div className="space-y-2 text-center">
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto group-hover:bg-teal-50 transition-colors">
                      <svg className="h-6 w-6 text-slate-400 group-hover:text-teal-600 transition-colors" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-slate-600 group-hover:text-slate-900">
                      Upload relevante documenten
                    </p>
                    <p className="text-xs text-slate-400">Facturen, prognoses (Max 10MB)</p>
                  </div>
               </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-2">
                {CONTACT_LABELS.message}
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-transparent focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all duration-200 font-medium text-slate-900 placeholder-slate-400 resize-none"
                placeholder="Vertel ons kort over uw situatie..."
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-4 px-6 border border-transparent rounded-2xl shadow-lg shadow-slate-900/10 text-lg font-bold text-white bg-slate-900 hover:bg-slate-800 hover:shadow-xl hover:shadow-slate-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all duration-200 transform hover:-translate-y-0.5"
          >
            {CONTACT_LABELS.submit}
          </button>
          
          <p className="text-xs text-center text-slate-400 mt-4">
            Door te versturen gaat u akkoord met ons privacybeleid en worden uw gegevens versleuteld verwerkt.
          </p>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;