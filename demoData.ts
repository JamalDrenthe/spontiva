import { DemoAccount, TGCApplication, DocumentItem, InvoiceItem, AnalysisReport } from './types';

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: 'demo-zzp',
    name: 'Jan Bakker',
    email: 'jan@bakker-consultancy.nl',
    roleLabel: 'ZZP Ondernemer',
    companyName: 'Bakker Consultancy',
    kvkNumber: '84920194',
    iban: 'NL91 ABNA 0412 3456 78',
    vatNumber: 'NL84920194B01',
    address: 'Keizersgracht 421, 1016 EK Amsterdam',
    isAdmin: false,
    avatarBg: 'bg-emerald-500',
    description: 'Werkt op opdrachtbasis met 30-60 dagen betaaltermijnen voor zakelijke klanten en overheid.',
    applications: [
      {
        id: 'TGC-2026-081',
        userId: 'demo-zzp',
        userEmail: 'jan@bakker-consultancy.nl',
        companyName: 'Bakker Consultancy',
        type: 'aanvraag',
        amount: 8500,
        timeGapDays: 32,
        status: 'actief',
        invoiceDescription: 'Factuur Q3 Software Architectuur consultancy aan TechCorp BV',
        counterparty: 'TechCorp BV',
        submittedAt: '2026-09-28',
        updatedAt: '2026-10-02',
        notes: 'Wachttijd op goedkeuring inkooporder bij debiteur. Leverancier IT-licenties moet op dag 14 worden betaald.',
        adminFeedback: 'Positieve kredietwaardigheid van debiteur. TGC Flex-bridge methode geactiveerd voor 85% voorschot (€ 7.225 direct beschikbaar gesteld).',
        approvedAmount: 8500,
        recommendedMethod: 'Spontiva Flex-Bridge (Debiteuren Interventie)'
      },
      {
        id: 'TGC-2026-094',
        userId: 'demo-zzp',
        userEmail: 'jan@bakker-consultancy.nl',
        companyName: 'Bakker Consultancy',
        type: 'analyse',
        amount: 4200,
        timeGapDays: 21,
        status: 'in_behandeling',
        invoiceDescription: 'Projectmanagement deliverables factuur Gemeente Utrecht',
        counterparty: 'Gemeente Utrecht',
        submittedAt: '2026-10-08',
        updatedAt: '2026-10-10',
        notes: 'Verwerkingstermijn overheidsorgaan duurt standaard 30-45 dagen.'
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
    ],
    invoices: [
      {
        id: 'inv-101',
        userId: 'demo-zzp',
        invoiceNumber: 'VF-2026-081',
        counterparty: 'TechCorp BV',
        type: 'debiteur',
        amount: 8500,
        issueDate: '2026-09-28',
        dueDate: '2026-11-15',
        timeGapDays: 32,
        status: 'overbrugd',
        linkedMethodId: 'TGC-M01',
        notes: 'Gekoppeld aan actieve TGC-2026-081 Flex-Bridge interventie'
      },
      {
        id: 'inv-102',
        userId: 'demo-zzp',
        invoiceNumber: 'VF-2026-094',
        counterparty: 'Gemeente Utrecht',
        type: 'debiteur',
        amount: 4200,
        issueDate: '2026-10-05',
        dueDate: '2026-11-20',
        timeGapDays: 28,
        status: 'openstaand',
        notes: 'Wacht op gemeentelijke fiattering'
      },
      {
        id: 'inv-103',
        userId: 'demo-zzp',
        invoiceNumber: 'IF-2026-044',
        counterparty: 'Cloud Hosting Infra B.V.',
        type: 'crediteur',
        amount: 1450,
        issueDate: '2026-10-01',
        dueDate: '2026-10-15',
        timeGapDays: 14,
        status: 'openstaand',
        notes: 'Vaste operationele hostingkosten'
      },
      {
        id: 'inv-104',
        userId: 'demo-zzp',
        invoiceNumber: 'VF-2026-070',
        counterparty: 'Studio Noord B.V.',
        type: 'debiteur',
        amount: 3200,
        issueDate: '2026-08-15',
        dueDate: '2026-09-15',
        timeGapDays: 0,
        status: 'voldaan',
        notes: 'Keurig op tijd voldaan'
      }
    ],
    reports: [
      {
        id: 'anl-2026-001',
        userId: 'demo-zzp',
        companyName: 'Bakker Consultancy',
        title: 'TGC Procesaudit & Betaalcyclus Diagnostiek Q3/Q4',
        auditDate: '2026-10-04',
        status: 'voltooid',
        cashflowScore: 82,
        avgDebtorDays: 48,
        avgCreditorDays: 14,
        lockedCapital: 12700,
        unlockedPotential: 10800,
        bottlenecks: [
          {
            title: 'Timing mismatch TechCorp BV vs Serverlicenties',
            description: 'TechCorp hanteert 60 dagen betaaltermijn terwijl licentiepartijen 14 dagen eisen.',
            impactAmount: 8500,
            daysDelay: 32,
            severity: 'hoog',
            suggestedMethodCode: 'TGC-M01',
            suggestedMethodTitle: 'Spontiva Flex-Bridge'
          },
          {
            title: 'Gemeentelijke PO-doorlooptijd',
            description: 'Gemeente Utrecht heeft interne administratieve fiattering van gemiddeld 21 werkdagen.',
            impactAmount: 4200,
            daysDelay: 21,
            severity: 'gemiddeld',
            suggestedMethodCode: 'TGC-M02',
            suggestedMethodTitle: 'Overheid Betaaltermijn Smoothing'
          }
        ],
        conclusion: 'De cashflow van Bakker Consultancy kent een structureel timinggat van gemiddeld 34 dagen. De debiteuren zijn zeer kredietwaardig waardoor TGC-interventie 100% veilig kan worden ingezet.',
        recommendedNextStep: 'Activeer TGC-M01 op factuur VF-2026-094 zodra de gemeente de PO verstrekt.'
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
    vatNumber: 'NL72381944B01',
    address: 'Transportweg 18, 3044 AT Rotterdam',
    isAdmin: false,
    avatarBg: 'bg-blue-600',
    description: 'Transport- en logistiekbedrijf met pieken in voorfinanciering van brandstof, tol en vlootonderhoud.',
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
        notes: 'Klantcontracten betalen op 60 dagen, brandstofleveranciers verlangen 14 dagen betaling.',
        adminFeedback: 'TGC Cashflow Interventie succesvol uitgerold. Voorschot van € 48.000 toegekend tegen 1.4% vaste vergoeding.',
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
        updatedAt: '2026-10-11',
        notes: 'Aanvraag voor procesanalyse om inkooppiek voor herfstcampagne te spreiden.'
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
    ],
    invoices: [
      {
        id: 'inv-201',
        userId: 'demo-mkb',
        invoiceNumber: 'VF-NEX-401',
        counterparty: 'DHL Global Forwarding',
        type: 'debiteur',
        amount: 32000,
        issueDate: '2026-09-25',
        dueDate: '2026-11-10',
        timeGapDays: 38,
        status: 'openstaand',
        notes: 'Internationale lijndienst distributie'
      },
      {
        id: 'inv-202',
        userId: 'demo-mkb',
        invoiceNumber: 'IF-SHL-882',
        counterparty: 'Shell Commercial Fleet Cards',
        type: 'crediteur',
        amount: 48000,
        issueDate: '2026-09-15',
        dueDate: '2026-09-29',
        timeGapDays: 45,
        status: 'overbrugd',
        linkedMethodId: 'TGC-M11',
        notes: 'Gedekt door TGC-2026-062 interventie'
      },
      {
        id: 'inv-203',
        userId: 'demo-mkb',
        invoiceNumber: 'IF-SCN-119',
        counterparty: 'Scania Nederland B.V.',
        type: 'crediteur',
        amount: 22500,
        issueDate: '2026-10-05',
        dueDate: '2026-10-19',
        timeGapDays: 28,
        status: 'openstaand',
        notes: 'Groot periodiek onderhoud 8 trekkers'
      }
    ],
    reports: [
      {
        id: 'anl-2026-002',
        userId: 'demo-mkb',
        companyName: 'Nexus Logistiek B.V.',
        title: 'Cashflow Gap Analyse & Brandstof Inkoopoptimalisatie',
        auditDate: '2026-09-15',
        status: 'voltooid',
        cashflowScore: 89,
        avgDebtorDays: 52,
        avgCreditorDays: 14,
        lockedCapital: 70500,
        unlockedPotential: 62000,
        bottlenecks: [
          {
            title: 'Knelpunt Brandstof vs Debiteurtermijnen',
            description: 'Brandstofleveranciers eisen 14 dagen incasso terwijl expediteurs na 45-60 dagen betalen.',
            impactAmount: 48000,
            daysDelay: 45,
            severity: 'hoog',
            suggestedMethodCode: 'TGC-M11',
            suggestedMethodTitle: 'Seasonal Inventory / Cash Boost'
          },
          {
            title: 'Skonto Leverancierskorting Onbenut',
            description: 'Scania biedt 2% betalingskorting bij voldoening binnen 7 dagen (€ 450 directe winst).',
            impactAmount: 22500,
            daysDelay: 14,
            severity: 'gemiddeld',
            suggestedMethodCode: 'TGC-M12',
            suggestedMethodTitle: 'Bulkinkoop Skonto Arbitrage'
          }
        ],
        conclusion: 'Door strategische inzet van Spontiva TGC kan Nexus Logistiek zowel het brandstofgat dichten als € 5.400 op jaarbasis besparen via skonto contantkorting.',
        recommendedNextStep: 'Uitvoeren van TGC-M12 arbitrage op de Scania factuur.'
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
    vatNumber: 'NL61928471B01',
    address: 'Handelsboulevard 55, 5652 AM Eindhoven',
    isAdmin: false,
    avatarBg: 'bg-amber-500',
    description: 'Groothandel en retail met aanzienlijke seizoensvoorraad voor de feestdagen en pieken in Q4.',
    applications: [
      {
        id: 'TGC-2026-077',
        userId: 'demo-retail',
        userEmail: 'mark@vandijk-retail.nl',
        companyName: 'Van Dijk Retail Groep',
        type: 'aanvraag',
        amount: 65000,
        timeGapDays: 60,
        status: 'actief',
        invoiceDescription: 'Inkoop voorraad kerstcollectie leveranciers Europa',
        counterparty: 'Diverse Europese Fabrikanten',
        submittedAt: '2026-09-20',
        updatedAt: '2026-09-25',
        adminFeedback: 'Goedgekeurd. Dekking gebaseerd op historische seizoensverkopen Q4. Overbrugging loopt tot 31 december 2026.',
        approvedAmount: 65000,
        recommendedMethod: 'Spontiva Seasonal Inventory Boost'
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
    ],
    invoices: [
      {
        id: 'inv-301',
        userId: 'demo-retail',
        invoiceNumber: 'IF-VD-771',
        counterparty: 'Nordic Design Supplies',
        type: 'crediteur',
        amount: 65000,
        issueDate: '2026-09-18',
        dueDate: '2026-10-02',
        timeGapDays: 60,
        status: 'overbrugd',
        linkedMethodId: 'TGC-M11',
        notes: 'Gefinancierd via TGC-2026-077'
      },
      {
        id: 'inv-302',
        userId: 'demo-retail',
        invoiceNumber: 'VF-VD-902',
        counterparty: 'Bijenkorf / De Boer Retail',
        type: 'debiteur',
        amount: 44000,
        issueDate: '2026-10-01',
        dueDate: '2026-11-30',
        timeGapDays: 45,
        status: 'openstaand',
        notes: 'Levering herfstassortiment filialen'
      }
    ],
    reports: [
      {
        id: 'anl-2026-003',
        userId: 'demo-retail',
        companyName: 'Van Dijk Retail Groep',
        title: 'Voorraad & Seizoensliquiditeit Audit 2026',
        auditDate: '2026-09-22',
        status: 'voltooid',
        cashflowScore: 86,
        avgDebtorDays: 60,
        avgCreditorDays: 21,
        lockedCapital: 65000,
        unlockedPotential: 65000,
        bottlenecks: [
          {
            title: 'Q4 Voorraad Voorfinanciering',
            description: 'Fabrikanten leveren in september en factureren per direct, terwijl de consument pas in nov/dec koopt.',
            impactAmount: 65000,
            daysDelay: 60,
            severity: 'hoog',
            suggestedMethodCode: 'TGC-M11',
            suggestedMethodTitle: 'Seasonal Inventory Cash Boost'
          }
        ],
        conclusion: 'De retail timing gap is volledig gecompenseerd door TGC-M11 waardoor de schappen gevuld zijn zonder bankkrediet.',
        recommendedNextStep: 'Monitoren van de kassa-inkomsten in november om de afwikkeling automatisch te laten plaatsvinden.'
      }
    ]
  },
  {
    id: 'demo-admin',
    name: 'Jamal Drenthe',
    email: 'info@spontiva.nl',
    roleLabel: 'Spontiva Administrator',
    companyName: 'Spontiva B.V. Hoofdkantoor',
    kvkNumber: '91823746',
    iban: 'NL02 ABNA 0111 2223 33',
    vatNumber: 'NL91823746B01',
    address: 'Zuidas Financial District, Amsterdam',
    isAdmin: true,
    avatarBg: 'bg-purple-600',
    description: 'Hoofdbeheerder van het Spontiva Platform met volledige bevoegdheid over alle dossiers, analyses en methodes.',
    applications: [],
    documents: [],
    invoices: [],
    reports: []
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

// Combine all invoices
export const getAllInvoices = (): InvoiceItem[] => {
  const all: InvoiceItem[] = [];
  DEMO_ACCOUNTS.forEach(account => {
    if (account.invoices) all.push(...account.invoices);
  });
  return all;
};

// Combine all reports
export const getAllReports = (): AnalysisReport[] => {
  const all: AnalysisReport[] = [];
  DEMO_ACCOUNTS.forEach(account => {
    if (account.reports) all.push(...account.reports);
  });
  return all;
};
