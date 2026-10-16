import React from 'react';
import { ShieldCheck } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <ShieldCheck className="w-8 h-8 text-teal-600 mr-3" />
          <h1 className="text-3xl font-extrabold text-slate-900">Privacyverklaring</h1>
        </div>
        
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
          <p className="text-lg">
            Bij Spontiva nemen we uw privacy serieus. In deze privacyverklaring leggen we uit welke persoonsgegevens we verzamelen, waarom we dat doen en hoe we deze beveiligen.
          </p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Gegevensverwerking</h2>
            <p>
              Voor het uitvoeren van een TGC-analyse of TGC-aanvraag verwerken wij diverse gegevens. Dit kunnen contactgegevens zijn (naam, e-mail, bedrijfsnaam) en financiële documenten (facturen, cashflow-prognoses) die u via ons beveiligde formulier uploadt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Doeleinden</h2>
            <p>Wij gebruiken uw gegevens uitsluitend voor:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Het uitvoeren van de aangevraagde TGC-analyse.</li>
              <li>Het beoordelen van de mogelijkheden voor Time Gap Cashflow methodes.</li>
              <li>Contact met u opnemen over onze dienstverlening.</li>
              <li>Het voldoen aan wettelijke administratieve verplichtingen.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Beveiliging en Bewaring</h2>
            <p>
              Wij nemen passende technische en organisatorische maatregelen om uw gegevens te beschermen tegen verlies of onrechtmatige verwerking. Gegevens worden versleuteld verzonden en opgeslagen op beveiligde servers. Wij bewaren uw gegevens niet langer dan noodzakelijk is voor het doel waarvoor ze zijn verzameld, tenzij een wettelijke bewaartermijn anders voorschrijft.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Delen met derden</h2>
            <p>
              Wij delen uw gegevens alleen met derden indien dit strikt noodzakelijk is voor de uitvoering van de dienst (bijvoorbeeld financiële partners die een specifieke TGC-methode faciliteren) of indien wij daartoe wettelijk verplicht zijn. Wij verkopen uw gegevens nooit aan derden.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Uw rechten</h2>
            <p>
              U heeft het recht om uw persoonsgegevens in te zien, te corrigeren of te laten verwijderen. Neem hiervoor contact met ons op via <a href="mailto:info@spontiva.nl" className="text-teal-600 font-semibold hover:underline">info@spontiva.nl</a> of het contactformulier op de website.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;