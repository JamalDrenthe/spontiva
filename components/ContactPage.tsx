import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare,
  ShieldCheck,
  Building,
  ArrowRight,
  HelpCircle
} from 'lucide-react';
import Card3D from './Card3D';
import ScrollReveal from './ScrollReveal';
import { PageView } from '../types';

interface ContactPageProps {
  onNavigate: (page: PageView) => void;
  onOpenAuth?: (mode: 'login' | 'register' | 'demo') => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, onOpenAuth }) => {
  const [formType, setFormType] = useState<'analyse' | 'aanvraag' | 'vraag'>('analyse');
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('€ 10.000 - € 50.000');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      
      {/* Top Banner */}
      <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="text-center max-w-2xl mx-auto space-y-3">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider shadow-sm">
                <Sparkles size={14} className="mr-2 text-teal-600 animate-pulse" />
                Contact & Intake
              </div>

              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
                Laten we je cashflow versnellen.
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Vraag een vrijblijvende TGC-analyse aan, stel een vraag of neem direct contact op met onze specialisten.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Content: Info Cards & Form */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Left Column: Direct Contact Info & Perks */}
          <div className="lg:col-span-5 space-y-6">
            <ScrollReveal direction="left">
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Direct bereikbaar</h2>
              <p className="text-xs sm:text-sm text-slate-500 mb-6">
                Wij reageren op werkdagen doorgaans binnen 2 uur op alle aanvragen en e-mails.
              </p>

              <div className="space-y-4">
                {/* Email card */}
                <Card3D className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-teal-50 text-teal-600 rounded-xl shrink-0">
                    <Mail size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">E-mail</h3>
                    <p className="text-xs text-slate-500 mb-1">Voor analyses, dossiers en algemene vragen:</p>
                    <a 
                      href="mailto:info@spontiva.nl" 
                      className="text-sm font-extrabold text-teal-600 hover:text-teal-700 underline underline-offset-2"
                    >
                      info@spontiva.nl
                    </a>
                  </div>
                </Card3D>

                {/* Openingstijden */}
                <Card3D className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                    <Clock size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Responstijd & Beschikbaarheid</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Maandag t/m vrijdag: 08:30 – 18:00 uur.
                    </p>
                    <p className="text-[11px] text-teal-700 font-semibold mt-1">
                      Acute dossiers worden dezelfde dag behandeld.
                    </p>
                  </div>
                </Card3D>

                {/* Landelijke Dekking */}
                <Card3D className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-start space-x-4">
                  <div className="p-3 bg-purple-50 text-purple-600 rounded-xl shrink-0">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Landelijke Dekking</h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Actief in heel Nederland voor ZZP'ers, MKB-ondernemingen en handelsorganisaties.
                    </p>
                  </div>
                </Card3D>
              </div>

              {/* Portal Callout */}
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-lg space-y-3 mt-6">
                <span className="text-xs font-bold text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles size={13} /> Bestaande klant of demo?
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Heb je al een lopend dossier of wil je de interactieve omgeving testen? Ga direct naar het dashboard.
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    onClick={() => {
                      if (onOpenAuth) onOpenAuth('login');
                      else onNavigate('dashboard');
                    }}
                    className="px-4 py-2 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold rounded-xl text-xs transition-colors"
                  >
                    Inloggen op Portal
                  </button>
                  <button
                    onClick={() => {
                      if (onOpenAuth) onOpenAuth('demo');
                    }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors"
                  >
                    Demo Testen
                  </button>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Intake Form */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="right">
              <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
                
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4 animate-in fade-in zoom-in duration-300">
                    <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto border border-teal-200">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">Bericht & Verzoek Ontvangen!</h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                      Dank voor je aanvraag. We hebben je gegevens ontvangen op <strong>info@spontiva.nl</strong>. 
                      Een van onze cashflow-specialisten neemt binnen 2 uur contact met je op.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-2.5 bg-slate-900 text-white font-semibold rounded-xl text-xs hover:bg-slate-800 transition-colors"
                    >
                      Nieuw bericht sturen
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
                    <div>
                      <h3 className="text-xl font-black text-slate-900 mb-1">Stel je vraag of start een aanvraag</h3>
                      <p className="text-xs text-slate-500 mb-4">Vul onderstaande velden in voor een snelle analyse.</p>
                    </div>

                    {/* Type Selector */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                        Waarmee kunnen we helpen?
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'analyse', label: 'TGC-Analyse' },
                          { id: 'aanvraag', label: 'Acute Aanvraag' },
                          { id: 'vraag', label: 'Algemene Vraag' }
                        ].map((t) => (
                          <button
                            type="button"
                            key={t.id}
                            onClick={() => setFormType(t.id as any)}
                            className={`py-2 px-2 text-center text-xs font-bold rounded-xl border transition-all ${
                              formType === t.id
                                ? 'bg-teal-50 border-teal-500 text-teal-800 shadow-sm ring-1 ring-teal-500'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            {t.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Bedrijfsnaam *</label>
                        <input
                          type="text"
                          required
                          placeholder="Bijv. Jansen Logistics B.V."
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Contactpersoon *</label>
                        <input
                          type="text"
                          required
                          placeholder="Voor- en achternaam"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">E-mailadres *</label>
                        <input
                          type="email"
                          required
                          placeholder="naam@bedrijf.nl"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Telefoonnummer</label>
                        <input
                          type="tel"
                          placeholder="+31 6 ..."
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Geschatte Liquiditeitsbehoefte</label>
                      <select
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                      >
                        <option value="< € 10.000">Tot € 10.000</option>
                        <option value="€ 10.000 - € 50.000">€ 10.000 – € 50.000</option>
                        <option value="€ 50.000 - € 150.000">€ 50.000 – € 150.000</option>
                        <option value="> € 150.000">Meer dan € 150.000</option>
                        <option value="Nog niet zeker">Nog niet zeker / Advies nodig</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Toelichting / Vraag</label>
                      <textarea
                        rows={3}
                        placeholder="Vertel kort over de debiteur, betaaltermijn of de uitdaging waar je tegenaan loopt..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 shadow-lg shadow-slate-900/15 transition-all hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <Send size={15} />
                      <span>Verstuur Aanvraag naar info@spontiva.nl</span>
                    </button>

                    <p className="text-[11px] text-slate-400 text-center">
                      Je gegevens worden vertrouwelijk behandeld conform onze privacyverklaring. Geen BKR-registratie.
                    </p>
                  </form>
                )}

              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* FAQ on Contact Page */}
      <section className="py-16 bg-white border-t border-slate-200/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <ScrollReveal direction="up">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold text-teal-600 uppercase tracking-wider">Veelgestelde Vragen</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Wat gebeurt er na je aanvraag?</h2>
            </div>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                q: "Hoe snel kan er uitbetaald worden?",
                a: "Bij een complete aanvraag en goedgekeurde debiteur kan een TGC-interventie vaak binnen 24 tot 48 uur worden ingezet."
              },
              {
                q: "Zit ik na een aanvraag ergens aan vast?",
                a: "Nee, de eerste analyse en intake zijn 100% vrijblijvend. Pas wanneer jij akkoord geeft op het voorstel, wordt een methode geactiveerd."
              },
              {
                q: "Neemt Spontiva contact op met mijn klanten?",
                a: "Nee. Bij vrijwel al onze methodes behoud je zelf het volledige contact en de relatie met je debiteuren."
              },
              {
                q: "Kan ik ook gewoon e-mailen?",
                a: "Zeker, stuur je factuur of vraag direct naar info@spontiva.nl. We pakken het direct op."
              }
            ].map((faq, i) => (
              <Card3D key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200/80">
                <h4 className="font-bold text-slate-900 text-sm mb-1.5 flex items-start gap-2">
                  <HelpCircle size={16} className="text-teal-600 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">{faq.a}</p>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
