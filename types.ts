export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  benefit: string;
  outcome: string;
}

export interface StepItem {
  number: number;
  title: string;
  description: string;
}

export interface SegmentItem {
  title: string;
  description: string;
  useCase: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export enum FormType {
  ANALYSIS = 'analysis',
  REQUEST = 'request',
  CONTACT = 'contact'
}

export type PageView = 'home' | 'privacy' | 'terms' | 'dashboard' | 'about' | 'contact';

export type UserRole = 'admin' | 'user' | 'demo';

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  companyName: string;
  kvkNumber?: string;
  iban?: string;
  phone?: string;
  role: UserRole;
  isDemo?: boolean;
  photoURL?: string;
  createdAt: string;
}

export type ApplicationStatus = 
  | 'nieuw' 
  | 'in_behandeling' 
  | 'in_analyse' 
  | 'goedgekeurd' 
  | 'actief' 
  | 'afgerond' 
  | 'afgewezen';

export type ApplicationType = 'analyse' | 'aanvraag';

export interface TGCApplication {
  id: string;
  userId: string;
  userEmail: string;
  companyName: string;
  type: ApplicationType;
  amount: number;
  timeGapDays: number;
  status: ApplicationStatus;
  invoiceDescription: string;
  counterparty: string;
  submittedAt: string;
  updatedAt: string;
  notes?: string;
  adminFeedback?: string;
  approvedAmount?: number;
  recommendedMethod?: string;
}

export interface DocumentItem {
  id: string;
  userId: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  status: 'geverifieerd' | 'in_beoordeling' | 'afgekeurd';
  url?: string;
}

export type DashboardTab = 
  | 'overzicht' 
  | 'analyses' 
  | 'interventies' 
  | 'facturen' 
  | 'methodes' 
  | 'nieuwe-aanvraag' 
  | 'simulator' 
  | 'documenten' 
  | 'instellingen' 
  | 'admin';

export type TGCMethodCategory = 
  | 'debiteuren' 
  | 'inkoop_voorraad' 
  | 'projecten' 
  | 'lasten_belasting' 
  | 'korting_arbitrage';

export interface TGCMethod {
  id: string;
  code: string;
  title: string;
  category: TGCMethodCategory;
  categoryLabel: string;
  description: string;
  useCase: string;
  timeGapRange: string;
  indicativeFee: string;
  duration: string;
  suitability: string[];
  requirements: string[];
  isPopular?: boolean;
  autoStopsOnPayment: boolean;
}

export interface InvoiceItem {
  id: string;
  userId: string;
  invoiceNumber: string;
  counterparty: string;
  type: 'debiteur' | 'crediteur';
  amount: number;
  issueDate: string;
  dueDate: string;
  timeGapDays: number;
  status: 'openstaand' | 'overbrugd' | 'voldaan';
  linkedMethodId?: string;
  notes?: string;
}

export interface AnalysisBottleneck {
  title: string;
  description: string;
  impactAmount: number;
  daysDelay: number;
  severity: 'hoog' | 'gemiddeld' | 'laag';
  suggestedMethodCode: string;
  suggestedMethodTitle: string;
}

export interface AnalysisReport {
  id: string;
  userId: string;
  companyName: string;
  title: string;
  auditDate: string;
  status: 'voltooid' | 'in_analyse';
  cashflowScore: number;
  avgDebtorDays: number;
  avgCreditorDays: number;
  lockedCapital: number;
  unlockedPotential: number;
  bottlenecks: AnalysisBottleneck[];
  conclusion: string;
  recommendedNextStep: string;
}

export interface DemoAccount {
  id: string;
  name: string;
  email: string;
  roleLabel: string;
  companyName: string;
  kvkNumber: string;
  iban: string;
  vatNumber?: string;
  address?: string;
  isAdmin: boolean;
  avatarBg: string;
  description: string;
  applications: TGCApplication[];
  documents: DocumentItem[];
  invoices?: InvoiceItem[];
  reports?: AnalysisReport[];
}