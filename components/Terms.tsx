import React from 'react';
import { FileText } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-8">
          <FileText className="w-8 h-8 text-teal-600 mr-3" />
          <h1 className="text-3xl font-extrabold text-slate-900">Algemene Voorwaarden</h1>
        </div>
        
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-8">
          <p className="text-lg">
            Welkom bij Spontiva. Hieronder vindt u de voorwaarden die van toepassing zijn op het gebruik van onze diensten, waaronder de TGC-analyse en TGC-aanvragen.
          </p>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Algemeen</h2>
            <p>
              Deze voorwaarden zijn van toepassing op iedere aanbieding, offerte en overeenkomst tussen Spontiva en een Opdrachtgever, tenzij schriftelijk anders is overeengekomen.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Dienstverlening</h2>
            <p>
              Spontiva biedt inzichten in financiële processen en bemiddelt in oplossingen voor Time Gap Cashflow (TGC). Spontiva fungeert als adviseur en procesbegeleider, niet als bank of kredietverstrekker. Alle analyses zijn gebaseerd op de door de Opdrachtgever aangeleverde data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. Verantwoordelijkheid Opdrachtgever</h2>
            <p>
              De Opdrachtgever is verantwoordelijk voor de juistheid en volledigheid van de aangeleverde documenten en gegevens. Spontiva aanvaardt geen aansprakelijkheid voor schade voortvloeiend uit onjuiste of onvolledige informatieverstrekking door de Opdrachtgever.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Aansprakelijkheid</h2>
            <p>
              Spontiva heeft een inspanningsverplichting en geen resultaatverplichting. Wij kunnen niet garanderen dat een TGC-aanvraag altijd leidt tot een succesvolle inzet van financiële methodes, aangezien dit afhankelijk is van externe factoren en acceptatiecriteria. De aansprakelijkheid van Spontiva is beperkt tot het bedrag dat voor de betreffende dienst in rekening is gebracht.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Intellectueel Eigendom</h2>
            <p>
              Alle door Spontiva verstrekte modellen, analyses, rapporten en adviezen blijven intellectueel eigendom van Spontiva en mogen zonder schriftelijke toestemming niet aan derden worden verstrekt, anders dan voor het doel van de opdracht.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Toepasselijk recht</h2>
            <p>
              Op alle rechtsbetrekkingen waarbij Spontiva partij is, is uitsluitend het Nederlands recht van toepassing.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;