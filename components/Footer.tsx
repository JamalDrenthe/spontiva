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
          <div 
            className="flex items-center mb-4 cursor-pointer group w-fit" 
            onClick={() => onNavigate('home')}
          >
            <img 
              src="/spontiva-full-logo-dark.svg" 
              alt="Spontiva - TIME GAP CASHFLOW" 
              className="h-10 w-auto transition-transform group-hover:scale-105"
            />
          </div>
          <p className="text-sm leading-relaxed max-w-sm">
            {FOOTER_TEXT}
          </p>
        </div>
        <div className="md:text-right flex flex-col justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 md:mb-0 justify-start md:justify-end text-sm">
             <button 
                onClick={() => onNavigate('about')} 
                className="hover:text-white transition-colors"
             >
                Over ons
             </button>
             <button 
                onClick={() => onNavigate('contact')} 
                className="hover:text-white transition-colors"
             >
                Contact
             </button>
             <a
                href="mailto:info@spontiva.nl"
                className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
             >
                info@spontiva.nl
             </a>
             <button 
                onClick={() => onNavigate('privacy')} 
                className="hover:text-white transition-colors"
             >
                Privacy
             </button>
             <button 
                onClick={() => onNavigate('terms')} 
                className="hover:text-white transition-colors"
             >
                Voorwaarden
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