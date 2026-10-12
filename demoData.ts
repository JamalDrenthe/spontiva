import { DemoAccount, TGCApplication, DocumentItem } from './types';

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'demo-zzp',
    name: 'Jan Bakker',
    email: 'jan@bakker-consultancy.nl',
    roleLabel: 'ZZP Ondernemer',
    companyName: 'Bakker Consultancy',
    kvkNumber: '84920194',
    iban: 'NL91 ABNA 0412 3456 78',
    isAdmin: false,
    avatarBg: 'bg-emerald-500',
    description: 'Werkt op opdrachtbasis met 30-60 dagen betaaltermijnen voor zakelijke klanten.',
    applications: [
      {
        id: 'TGC-2026-081',
        userId: 'demo-zzp',
        userEmail: 'jan@bakker-consultancy.nl',
        companyName: 'Bakker Consultancy',
        type: 'analyse',
        amount: 8500,
        timeGapDays: 32,
        status: 'goedgekeurd',
        invoiceDescription: 'Factuur Q3 Software Architectuur consultancy aan TechCorp BV',
        counterparty: 'TechCorp BV',
        submittedAt: '2026-09-28',
        updatedAt: '2026-10-02',
        notes: 'Wachttijd op goedkeuring inkooporder bij debiteur.',
        adminFeedback: 'Positieve kredietwaardigheid van debiteur. TGC Flex-bridge methode geactiveerd voor 80% voorschot.',
        approvedAmount: 8500,
        recommendedMethod: 'Spontiva Flex-Bridge (Debiteuren Interventie)'
      },
      {
        id: 'TGC-2026-094',
        userId: 'demo-zzp',
        userEmail: 'jan@bakker-consultancy.nl',
        companyName: 'Bakker Consultancy',
        type: 'aanvraag',
        amount: 4200,
        timeGapDays: 21,
        status: 'in_behandeling',
        invoiceDescription: 'Projectmanagement deliverables factuur Gemeente Utrecht',
        counterparty: 'Gemeente Utrecht',
        submittedAt: '2026-10-08',
        updatedAt: '2026-10-10',
        notes: 'Verwerkingstermijn overheidsorgaan duurt standaard 30 dagen.'
      }
    ],
    documents: [
      {
        id: 'doc-1',
        userId: 'demo-zzp',
        name: 'Factuur_TechCorp_2026_09.pdf',
        type: 'Factuur',
        size: '240 KB',
        uploadedAt: '2026-09-28',
        status: 'geverifieerd'
      },
      {
        id: 'doc-2',
        userId: 'demo-zzp',
        name: 'KvK_Uittreksel_BakkerConsultancy.pdf',
        type: 'KvK Uittreksel',
        size: '512 KB',
        uploadedAt: '2026-09-15',
        status: 'geverifieerd'
      },
      {
        id: 'doc-3',
        userId: 'demo-zzp',
        name: 'Gemeente_Utrecht_Overeenkomst.pdf',
        type: 'Overeenkomst',
        size: '1.2 MB',
        uploadedAt: '2026-10-08',
        status: 'in_beoordeling'
      }
    ]
  },
  {
    id: 'demo-mkb',
    name: 'Sophie de Vries',
    email: 'sophie@nexus-logistiek.nl',
    roleLabel: 'MKB Directeur',
    companyName: 'Nexus Logistiek B.V.',
    kvkNumber: '72381944',
    iban: 'NL44 INGB 0001 2345 67',
    isAdmin: false,
    avatarBg: 'bg-blue-600',
    description: 'Transport- en logistiekbedrijf met pieken in voorfinanciering van brandstof en onderhoud.',
    applications: [
      {
        id: 'TGC-2026-062',
        userId: 'demo-mkb',
        userEmail: 'sophie@nexus-logistiek.nl',
        companyName: 'Nexus Logistiek B.V.',
        type: 'aanvraag',
        amount: 48000,
        timeGapDays: 45,
        status: 'actief',
        invoiceDescription: 'Inkoop brandstof & tolkaarten voor Q4 transportcontracten',
        counterparty: 'Shell Commercial & DKV Euro Service',
        submittedAt: '2026-09-12',
        updatedAt: '2026-09-18',
        notes: 'Klantcontracten betalen op 60 dagen, leveranciers verlangen 14 dagen betalingstermijn.',
        adminFeedback: 'TGC Cashflow Interventie succesvol uitgerold. Wekelijkse verrekening op debiteurenrekening.',
        approvedAmount: 48000,
        recommendedMethod: 'Spontiva Seasonal Cash Boost'
      },
      {
        id: 'TGC-2026-101',
        userId: 'demo-mkb',
        userEmail: 'sophie@nexus-logistiek.nl',
        companyName: 'Nexus Logistiek B.V.',
        type: 'analyse',
        amount: 22500,
        timeGapDays: 28,
        status: 'in_analyse',
        invoiceDescription: 'Vlootonderhoud en bandenwissel Scania trucks herfstcampagne',
        counterparty: 'Scania Nederland B.V.',
        submittedAt: '2026-10-10',
        updatedAt: '2026-10-11'
      }
    ],
    documents: [
      {
        id: 'doc-4',
        userId: 'demo-mkb',
        name: 'Jaarrekening_2025_NexusLogistiek.pdf',
        type: 'Jaarcijfers',
        size: '3.4 MB',
        uploadedAt: '2026-09-10',
        status: 'geverifieerd'
      },
      {
        id: 'doc-5',
        userId: 'demo-mkb',
        name: 'Debiteurenlijst_September_2026.xlsx',
        type: 'Debiteurenadministratie',
        size: '890 KB',
        uploadedAt: '2026-09-12',
        status: 'geverifieerd'
      }
    ]
  },
  {
    id: 'demo-retail',
    name: 'Mark Jansen',
    email: 'mark@vandijk-retail.nl',
    roleLabel: 'Handelsbedrijf / Retail',
    companyName: 'Van Dijk Retail Groep',
    kvkNumber: '61928471',
    iban: 'NL18 RABO 0300 9876 54',
    isAdmin: false,
    avatarBg: 'bg-amber-500',
    description: 'Groothandel en retail met aanzienlijke seizoensvoorraad voor feestdagen.',
    applications: [
      {
        id: 'TGC-2026-077',
        userId: 'demo-retail',
        userEmail: 'mark@vandijk-retail.nl',
        companyName: 'Van Dijk Retail Groep',
        type: 'aanvraag',
        amount: 65000,
        timeGapDays: 60,
        status: 'goedgekeurd',
        invoiceDescription: 'Inkoop voorraad kerstcollectie leveranciers Europa',
        counterparty: 'Diverse Europese Fabrikanten',
        submittedAt: '2026-09-20',
        updatedAt: '2026-09-25',
        adminFeedback: 'Goedgekeurd. Dekking gebaseerd op historische omzet Q4 2024 en 2025.',
        approvedAmount: 65000,
        recommendedMethod: 'Spontiva Inventory Inventory Bridge'
      }
    ],
    documents: [
      {
        id: 'doc-6',
        userId: 'demo-retail',
        name: 'Inkooporders_Q4_2026.pdf',
        type: 'Inkooporders',
        size: '1.8 MB',
        uploadedAt: '2026-09-20',
        status: 'geverifieerd'
      }
    ]
  },
  {
    id: 'demo-admin',
    name: 'Jamal Drenthe',
    email: 'info@jamaldrenthe.com',
    roleLabel: 'Spontiva Administrator',
    companyName: 'Spontiva B.V. Hoofdkantoor',
    kvkNumber: '91823746',
    iban: 'NL02 ABNA 0111 2223 33',
    isAdmin: true,
    avatarBg: 'bg-purple-600',
    description: 'Hoofdbeheerder van het Spontiva Platform met volledige bevoegdheid over alle dossiers.',
    applications: [],
    documents: []
  }
];

// Combine all applications for the admin overview
export const getAllApplications = (): TGCApplication[] => {
  const all: TGCApplication[] = [];
  DEMO_ACCOUNTS.forEach(account => {
    all.push(...account.applications);
  });
  return all;
};
