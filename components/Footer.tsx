import React from 'react';
import { FOOTER_TEXT } from '../constants';
import { PageView } from '../types';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onSectionClick: (id: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate, onSectionClick }) => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8">
        <div>
          <span 
            className="text-2xl font-bold text-white tracking-tight block mb-4 cursor-pointer" 
            onClick={() => onNavigate('home')}
          >
            Spontiva<span className="text-teal-500">.</span>
          </span>
          <p className="text-sm leading-relaxed max-w-sm">
            {FOOTER_TEXT}
          </p>
        </div>
        <div className="md:text-right flex flex-col justify-between">
          <div className="space-x-6 mb-4 md:mb-0">
             <button 
                onClick={() => onNavigate('privacy')} 
                className="hover:text-white transition-colors text-left md:text-right"
             >
                Privacy
             </button>
             <button 
                onClick={() => onNavigate('terms')} 
                className="hover:text-white transition-colors text-left md:text-right"
             >
                Voorwaarden
             </button>
             <button 
                onClick={() => onSectionClick('contact')} 
                className="hover:text-white transition-colors text-left md:text-right"
             >
                Contact
             </button>
          </div>
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Spontiva. Alle rechten voorbehouden.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;