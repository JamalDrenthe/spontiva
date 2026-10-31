import { NavItem, ServiceItem, StepItem, SegmentItem, FAQItem } from './types';
import { LayoutDashboard, FileSearch, TrendingUp, Clock, ShieldCheck, PieChart, Sparkles } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Diensten', href: '#diensten' },
  { label: 'Hoe het werkt', href: '#werkwijze' },
  { label: 'Voor wie', href: '#doelgroep' },
  { label: 'Kosten & Calculator', href: '#kosten' },
  { label: 'FAQ', href: '#faq' },
];

export const HERO_CONTENT = {
  badge: "MEER DAN 60+ METHODES • WERKCAPITAAL OPTIMALISATIE",
  titlePrimary: "Direct werkkapitaal.",
  titleHighlight: "Zonder banklening of balansdruk.",
  subtitle: "Overbrug betalingstermijnen van 30 tot 90 dagen. Krijg binnen 24 tot 48 uur liquiditeit op basis van meer dan 60 beproefde Time Gap Cashflow (TGC) structuren.",
  ctaPrimary: "Bereken je werkkapitaal",
  ctaSecondary: "Vraag gratis gap-analyse aan"
};

export const INTRO_CONTENT = {
  tagline: "Waarom Spontiva TGC?",
  caseBadge: "Praktijkcase: Facturatiegap",
  caseValue: "+€ 35.000 Overbrugging",
  text: "Wachten op debiteuren van 30, 60 of 90 dagen belemmert je groei en inkoopkracht. Spontiva overbrugt dit timingverschil direct. Geen traditionele bankschuld op je balans, geen persoonlijke borgtocht en 100% behoud van je eigen klantrelaties.",
  benefits: [
    "Directe liquiditeit binnen 24 tot 48 uur na validatie.",
    "Geen schuldverzwaring op je balans of persoonlijke aansprakelijkheid.",
    "Transparante vaste vergoeding vooraf — geen verborgen fees achteraf."
  ]
};

export const SERVICES_CONTENT: { analysis: ServiceItem; request: ServiceItem } = {
  analysis: {
    title: "TGC Gap-Analyse",
    description: "Grondige scan van je facturatiecyclus, debiteurentermijnen en inkoopverplichtingen om vastzittend werkkapitaal bloot te leggen.",
    benefit: "Binnen 24 uur een helder strategisch rapport met exacte interventiepunten en liquiditeitsruimte.",
    outcome: "Helder stappenplan met de meest rendabele TGC-methodes voor jouw specifieke cashflowritme."
  },
  request: {
    title: "Directe TGC-Overbrugging",
    description: "Direct inzetten van kapitaal op basis van goedgekeurde facturen of lopende projectcontracten zonder trage bankprocedures.",
    benefit: "Uitbetaling binnen 24 tot 48 uur tegen een vooraf vastgesteld, transparant tarief.",
    outcome: "Onmiddellijke rust en handelingssnelheid: salarissen, inkoop en groei gaan onbelemmerd door."
  }
};

export const PROCESS_STEPS: StepItem[] = [
  {
    number: 1,
    title: "Documenten & Gap-Check",
    description: "Deel je openstaande facturen of debiteurenoverzicht via ons beveiligde portaal. We scannen direct waar de timing knelt."
  },
  {
    number: 2,
    title: "Methode Selectie",
    description: "We selecteren uit 60+ TGC-methodes de optimale structuur voor jouw sector, met 100% transparante kosten vooraf."
  },
  {
    number: 3,
    title: "Liquiditeit Binnen 24–48u",
    description: "Je ontvangt het werkkapitaal direct op je rekening. Zodra je opdrachtgever betaalt, wordt de faciliteit automatisch afgewikkeld."
  }
];

export const SEGMENTS: SegmentItem[] = [
  {
    title: "IT, Tech & Detachering",
    description: "Consultancy & tech bureaus met wekelijkse/maandelijkse loonkosten en 45-60 dagen betalingstermijnen van corporates.",
    useCase: "Salarissen en onderaannemers direct betalen zonder afhankelijk te zijn van trage corporate facturatiecycli."
  },
  {
    title: "Groothandel & Import",
    description: "Bedrijven die leveranciers upfront moeten betalen voordat goederen worden uitgeleverd en gefactureerd.",
    useCase: "Inkooporders en containerladingen tijdig financieren zodat voorraden op peil blijven en omzet piekt."
  },
  {
    title: "Projectbureaus & Bouw",
    description: "Aannemers en creatieve studio's waar projectfases en voorinvesteringen vooruitlopen op de eindafrekening.",
    useCase: "Materiaalkosten en uren voorschieten zonder rood te hoeven staan bij de traditionele bank."
  },
  {
    title: "E-Commerce & Scale-ups",
    description: "Merken met seizoenspieken, hoge advertentie-uitgaven en snelle voorraadomloopsnelheden.",
    useCase: "Marketingbudgetten en seizoensvoorraden direct opschalen op basis van voorspelbare omzet."
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Wat is het verschil tussen Spontiva TGC en een traditionele banklening?",
    answer: "Een banklening creëert een langdurige schuld op je balans, vereist vaak persoonlijke borgtocht en duurt weken. Spontiva TGC is een procesgerichte kortlopende overbrugging van bestaand werkkapitaal: geen schuld op de balans, binnen 24-48 uur beschikbaar en direct afgerond zodra je debiteur betaalt."
  },
  {
    question: "Neemt Spontiva contact op met mijn klanten of opdrachtgevers?",
    answer: "Nee, in veruit de meeste TGC-methodes behoud je 100% de regie over het klantcontact. Jouw relatie met je opdrachtgever blijft discreet, professioneel en onaangetast."
  },
  {
    question: "Hoe snel kan het werkkapitaal op mijn rekening staan?",
    answer: "Na het uploaden van je factuur of contract en een snelle verificatie staat het benodigde bedrag doorgaans binnen 24 tot maximaal 48 uur op je zakelijke bankrekening."
  },
  {
    question: "Zit ik vast aan langlopende contracten of verplichtingen?",
    answer: "Absoluut niet. TGC is flexibel per factuur of per periode inzetbaar. Je bepaalt zelf wanneer en hoe vaak je een overbrugging activeert."
  },
  {
    question: "Hoe worden mijn bedrijfsgegevens beveiligd?",
    answer: "Al je gegevens en uploads worden end-to-end versleuteld verwerkt in onze ISO-gecertificeerde Europese cloudinfrastructuur conform de strengste AVG/GDPR normen."
  }
];

export const COST_INFO = {
  title: "Transparante vergoeding vooraf. Geen verrassingen achteraf.",
  description: "Bij Spontiva weet je exact waar je aan toe bent. Je betaalt een vast percentage over het overbrugde bedrag voor de afgesproken looptijd. Geen afsluitprovisies, geen verborgen administratiekosten en geen boetes bij eerdere aflossing.",
  disclaimer: "Onderstaande rekentool toont een directe realtime indicatie. Definitieve tarieven worden vastgelegd na gap-verificatie."
};

export const CONTACT_LABELS = {
  name: "Bedrijfsnaam",
  email: "Zakelijk e-mailadres",
  type: "Waar heb je interesse in?",
  message: "Gewenst overbruggingsbedrag of toelichting (optioneel)",
  file: "Factuur of debiteurenlijst uploaden (optioneel)",
  submit: "Verstuur aanvraag voor directe analyse",
  successTitle: "Aanvraag succesvol ontvangen",
  successMessage: "Binnen 24 uur nemen we contact op met je persoonlijke Time Gap Cashflow rapport en beschikbare methodes."
};

export const FOOTER_TEXT = "Spontiva is de toonaangevende specialist in Time Gap Cashflow (TGC) overbruggingen voor het Nederlandse ondernemersnetwerk. Geen traditionele bankschulden, maar intelligente procesliquiditeit.";

export const ICONS = {
  Analysis: FileSearch,
  Request: LayoutDashboard,
  Process: TrendingUp,
  Time: Clock,
  Trust: ShieldCheck,
  Chart: PieChart,
  Sparkles: Sparkles
};
