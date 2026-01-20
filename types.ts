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

export type PageView = 'home' | 'privacy' | 'terms';