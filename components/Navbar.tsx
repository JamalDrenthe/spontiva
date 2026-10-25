import React, { useState, useEffect } from 'react';
import { Menu, X, LogIn, UserPlus, LayoutDashboard, LogOut, ShieldAlert, Sparkles } from 'lucide-react';
import { PageView } from '../types';
import { useAuth } from '../AuthContext';


interface NavbarProps {
  currentPage?: PageView;
  onNavigate: (page: PageView) => void;
  onSectionClick: (id: string) => void;
  onOpenAuth: (mode: 'login' | 'register' | 'demo') => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  currentPage = 'home',
  onNavigate, 
  onSectionClick, 
  onOpenAuth 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { currentUser, logout, isAdmin } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith('#')) {
      onSectionClick(href.substring(1));
    }
  };

  const handleLogoClick = () => {
    setIsOpen(false);
    onNavigate('home');
  };

  const menuItems = [
    { label: 'Home', action: () => onNavigate('home'), active: currentPage === 'home' },
    { label: 'Diensten', action: () => handleNavClick('#diensten'), active: false },
    { label: 'Hoe het werkt', action: () => handleNavClick('#werkwijze'), active: false },
    { label: 'Kosten', action: () => handleNavClick('#kosten'), active: false },
    { label: 'Over ons', action: () => onNavigate('about'), active: currentPage === 'about' },
    { label: 'Contact', action: () => onNavigate('contact'), active: currentPage === 'contact' },
  ];

  return (
    <nav className={`fixed w-full z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm' 
        : 'bg-white/50 backdrop-blur-sm border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={handleLogoClick}>
            <img 
              src="/spontiva-full-logo.svg" 
              alt="Spontiva - TIME GAP CASHFLOW" 
              className="h-10 sm:h-11 w-auto transition-transform group-hover:scale-105"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`px-2.5 py-2 text-xs sm:text-sm font-semibold transition-all hover:-translate-y-0.5 rounded-lg ${
                  item.active
                    ? 'text-teal-700 bg-teal-50/80 font-bold'
                    : 'text-slate-600 hover:text-teal-600'
                }`}
              >
                {item.label}
              </button>
            ))}

            {/* Auth Buttons */}
            <div className="flex items-center space-x-2 pl-3 border-l border-slate-200">
              {currentUser ? (
                <>
                  <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center space-x-2 bg-teal-50 hover:bg-teal-100 text-teal-800 px-3.5 py-2 rounded-xl text-xs font-bold border border-teal-200 transition-all hover:-translate-y-0.5 shadow-sm"
                  >
                    <LayoutDashboard size={15} className="text-teal-600" />
                    <span>Dashboard</span>
                    {isAdmin && (
                      <span className="bg-purple-600 text-white text-[10px] px-1.5 py-0.2 rounded-full font-bold ml-1">
                        Admin
                      </span>
                    )}
                  </button>

                  <button
                    onClick={logout}
                    title="Uitloggen"
                    className="text-slate-400 hover:text-rose-600 p-2 rounded-lg hover:bg-rose-50 transition-colors"
                  >
                    <LogOut size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => onOpenAuth('login')}
                    className="text-slate-700 hover:text-slate-900 font-semibold px-3 py-2 text-xs rounded-xl hover:bg-slate-100 transition-colors flex items-center space-x-1.5"
                  >
                    <LogIn size={14} className="text-slate-500" />
                    <span>Inloggen</span>
                  </button>

                  <button
                    onClick={() => onOpenAuth('register')}
                    className="bg-slate-900 text-white font-semibold px-4 py-2 rounded-xl text-xs hover:bg-slate-800 transition-all shadow-md shadow-slate-900/10 hover:-translate-y-0.5 flex items-center space-x-1.5"
                  >
                    <UserPlus size={14} />
                    <span>Registreren</span>
                  </button>

                  <button
                    onClick={() => onOpenAuth('demo')}
                    className="bg-teal-500/15 hover:bg-teal-500/25 text-teal-800 border border-teal-200 font-bold px-3 py-2 rounded-xl text-xs transition-colors flex items-center space-x-1"
                    title="Probeer direct een demo account"
                  >
                    <Sparkles size={13} className="text-teal-600" />
                    <span>Demo</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden space-x-2">
            {!currentUser && (
              <button
                onClick={() => onOpenAuth('login')}
                className="text-xs font-bold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg"
              >
                Inloggen
              </button>
            )}
            {currentUser && (
              <button
                onClick={() => onNavigate('dashboard')}
                className="text-xs font-bold text-teal-800 bg-teal-100 px-3 py-1.5 rounded-lg flex items-center gap-1"
              >
                <LayoutDashboard size={13} />
                <span>Portal</span>
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none transition-colors"
              aria-label="Menu openen"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1.5">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setIsOpen(false);
                  item.action();
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-xl text-base font-semibold transition-colors ${
                  item.active 
                    ? 'text-teal-700 bg-teal-50 font-bold'
                    : 'text-slate-600 hover:text-teal-600 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            ))}

            <div className="pt-4 border-t border-slate-100 space-y-2">
              {currentUser ? (
                <>
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      onNavigate('dashboard');
                    }}
                    className="w-full text-center bg-teal-600 text-white px-4 py-2.5 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-md"
                  >
                    <LayoutDashboard size={16} />
                    <span>Naar Dashboard</span>
                  </button>
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      logout();
                    }}
                    className="w-full text-center text-rose-600 py-2 text-xs font-semibold"
                  >
                    Uitloggen
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenAuth('login');
                    }}
                    className="text-center py-2.5 border border-slate-200 rounded-xl text-xs font-bold text-slate-800"
                  >
                    Inloggen
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenAuth('register');
                    }}
                    className="text-center py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold"
                  >
                    Registreren
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenAuth('demo');
                    }}
                    className="col-span-2 text-center py-2 bg-teal-50 text-teal-800 border border-teal-200 rounded-xl text-xs font-bold flex items-center justify-center space-x-1"
                  >
                    <Sparkles size={13} className="text-teal-600" />
                    <span>Demo Accounts voor normale gebruikers</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;