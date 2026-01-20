import { NavItem, ServiceItem, StepItem, SegmentItem, FAQItem } from './types';
import { LayoutDashboard, FileSearch, TrendingUp, Clock, ShieldCheck, PieChart } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Diensten', href: '#diensten' },
  { label: 'Hoe het werkt', href: '#werkwijze' },
  { label: 'Voor wie', href: '#doelgroep' },
  { label: 'Kosten', href: '#kosten' },
  { label: 'FAQ', href: '#faq' },
];

export const HERO_CONTENT = {
  title: "TIME GAP CASHFLOW",
  subtitle: "",
  ctaPrimary: "Vraag TGC-analyse aan",
  ctaSecondary: "Doe een TGC-aanvraag"
};

export const INTRO_CONTENT = {
  text: "Spontiva brengt TGC-methodes in die direct aansluiten op hoe geld door jouw bedrijf beweegt. Door deze methodes aan te bieden, kun je gebruikmaken van technieken die vaak sneller inzetbaar zijn dan traditionele trajecten, zodat je operationele verplichtingen minder gevoelig kunnen worden voor timingverschillen. Met de optie om eerst een TGC-analyse te laten uitvoeren, laten we zien waar precies in facturatie, inkoop en ontvangstmomenten tijdelijke ruimte kan ontstaan; dat inzicht geeft je concrete keuzes en de mogelijkheid om weloverwogen te handelen.",
  benefits: [
    "Benut bestaande processen voor tijdelijke ruimte.",
    "Geen langdurige structurele wijzigingen nodig.",
    "Inzicht in timingverschillen tussen inkomsten en uitgaven."
  ]
};

export const SERVICES_CONTENT: { analysis: ServiceItem; request: ServiceItem } = {
  analysis: {
    title: "TGC-analyse",
    description: "We nemen een kijkje in je processen, verzamelen relevante documenten en leggen de timing van inkomende en uitgaande geldstromen naast elkaar.",
    benefit: "Hierdoor ontstaan concrete inzichten in waar tijdelijke ruimte kan zitten en welke methodes daarvoor bruikbaar zijn.",
    outcome: "Het grote voordeel is dat je op basis van feitelijke processen opties krijgt gepresenteerd; dat maakt beslissen eenvoudiger en vermindert giswerk."
  },
  request: {
    title: "TGC-aanvraag",
    description: "Bij een TGC-aanvraag maak je gebruik van de methodes die Spontiva beschikbaar stelt en stemmen we samen af welke inzet en welke duur het beste passen.",
    benefit: "Wanneer een methode geschikt lijkt, kan deze relatief snel worden ingezet.",
    outcome: "Dat kan direct effect hebben op je operationele continuïteit en tijdelijke druk verlichten."
  }
};

export const PROCESS_STEPS: StepItem[] = [
  {
    number: 1,
    title: "TGC-analyse aanvragen",
    description: "Je levert basisdocumenten aan en we krijgen zicht op facturatie, betaaltermijnen en inkoopcycli. Dat levert een concreet overzicht op van mogelijke interventiepunten."
  },
  {
    number: 2,
    title: "Optie kiezen of direct aanvraag",
    description: "Op basis van de analyse kun je kiezen om methodes te laten toepassen, of je doet meteen een TGC-aanvraag als je al weet wat je nodig hebt. Je beslist zelf."
  },
  {
    number: 3,
    title: "Afstemming en inzet",
    description: "We leggen samen vast welke periode en inzet passend zijn. De methode wordt toegepast en stopt zodra de normale inkomsten binnenkomen."
  }
];

export const SEGMENTS: SegmentItem[] = [
  {
    title: "ZZP’ers & Kleine Ondernemers",
    description: "Die op opdrachtbasis werken en te maken hebben met wisselende betaalmomenten.",
    useCase: "We laten zien waar late betalingen knellen en welke methodes snel toepasbaar zijn, zodat je kunt beoordelen of een tijdelijke maatregel zinvol is."
  },
  {
    title: "MKB met Seizoensinvloeden",
    description: "Bedrijven die voorraden moeten inkopen voordat het verkoopseizoen start.",
    useCase: "We analyseren inkooppatronen zodat je opties krijgt om activiteiten te financieren via procesgerelateerde routes; dit kan bijdragen aan betere beschikbaarheid."
  },
  {
    title: "Projectmatige Organisaties",
    description: "Bureaus waar kosten vooruitlopen op de facturatie van projectfases.",
    useCase: "Door projectfacturen en betalingsmomenten te vergelijken tonen we mogelijkheden om continuïteit te waarborgen zonder langdurige verplichtingen."
  },
  {
    title: "Handelsbedrijven",
    description: "Ondernemingen met significante tijdsgaten tussen inkoop en verkoop.",
    useCase: "Tijdelijke inzet van methodes kan de bevoorrading mogelijk maken, waardoor de winkel tijdig vol staat en omzet gerealiseerd kan worden."
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Wat doet een TGC-analyse?",
    answer: "We brengen processen en timing van geldstromen in kaart en tonen concrete plekken waar tijdelijke ruimte mogelijk is. Dat inzicht helpt je beslissen of je methodes wilt inzetten."
  },
  {
    question: "Ben ik verplicht iets te doen na de analyse?",
    answer: "Nee. De analyse geeft opties; je kiest zelf of je methodes inzet en welke. Die vrijheid zorgt ervoor dat je alleen kiest wat voor jouw bedrijf relevant kan zijn."
  },
  {
    question: "Hoe snel werkt een TGC-aanvraag?",
    answer: "Afhankelijk van de gekozen methode en documentatie kan inzet snel plaatsvinden; in veel gevallen zie je binnen korte tijd praktische effecten."
  },
  {
    question: "Wat gebeurt er met mijn data?",
    answer: "We behandelen gegevens vertrouwelijk en werken volgens geldende privacyregels zodat je met vertrouwen informatie kunt delen die nodig is voor analyse of aanvraag."
  }
];

export const COST_INFO = {
  title: "Heldere kostenstructuur",
  description: "Voor elke analyse en aanvraag geven we vooraf een overzicht van de inzet en de kosten. Je ziet exact wat een maatregel voor de afgesproken periode kost en welk effect dit op netto kaspositie kan hebben. Dat overzicht helpt je een zakelijke keuze te maken.",
  disclaimer: "Disclaimer: Onderstaande simulatie is indicatief. Definitieve kosten hangen af van de gekozen methode en specifieke situatie."
};

export const CONTACT_LABELS = {
  name: "Bedrijfsnaam",
  email: "E-mailadres",
  type: "Waar heb je interesse in?",
  message: "Extra toelichting (optioneel)",
  file: "Documenten uploaden (optioneel)",
  submit: "Verstuur aanvraag",
  successTitle: "Aanvraag ontvangen",
  successMessage: "Dank, we hebben je verzoek ontvangen. We nemen contact op om de vervolgstappen te bespreken en samen af te stemmen welke route voor jouw situatie het meest passend kan zijn."
};

export const FOOTER_TEXT = "Spontiva werkt praktisch en procesgericht: wij laten zien waar tijdelijke ruimte kan zitten en welke methodes inzetbaar zijn. Het gebruik van TGC-methodes kan operationele ruimte bieden; of het in jullie specifieke situatie ook daadwerkelijk gunstig is, hangt af van processen en afspraken.";

// Icons map for easier usage in components
export const ICONS = {
  Analysis: FileSearch,
  Request: LayoutDashboard,
  Process: TrendingUp,
  Time: Clock,
  Trust: ShieldCheck,
  Chart: PieChart
};