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

export type PageView = 'home' | 'privacy' | 'terms' | 'dashboard';

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

export interface DemoAccount {
  id: string;
  name: string;
  email: string;
  roleLabel: string;
  companyName: string;
  kvkNumber: string;
  iban: string;
  isAdmin: boolean;
  avatarBg: string;
  description: string;
  applications: TGCApplication[];
  documents: DocumentItem[];
}