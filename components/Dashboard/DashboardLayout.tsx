import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { 
  LayoutDashboard, 
  FileText, 
  PlusCircle, 
  Calculator, 
  FolderLock, 
  Settings, 
  ShieldAlert, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ChevronRight,
  Bell,
  Sparkles,
  Users
} from 'lucide-react';
import OverviewTab from './OverviewTab';
import DossiersTab from './DossiersTab';
import NewApplicationTab from './NewApplicationTab';
import SimulatorTab from './SimulatorTab';
import DocumentsTab from './DocumentsTab';
import SettingsTab from './SettingsTab';
import AdminTab from './AdminTab';
import { DEMO_ACCOUNTS } from '../../demoData';

interface DashboardLayoutProps {
  onBackToHome: () => void;
}

export type DashboardTab = 
  | 'overzicht' 
  | 'dossiers' 
  | 'nieuwe-aanvraag' 
  | 'simulator' 
  | 'documenten' 
  | 'instellingen' 
  | 'admin';

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onBackToHome }) => {
  const { currentUser, logout, isAdmin, loginWithDemo, applications } = useAuth();
  const [activeTab, setActiveTab] = useState<DashboardTab>(isAdmin ? 'admin' : 'overzicht');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  // Count pending items for badges
  const pendingCount = applications.filter(a => a.status === 'nieuw' || a.status === 'in_behandeling').length;

  const navItems = [
    { id: 'overzicht' as DashboardTab, label: 'Overzicht', icon: LayoutDashboard },
    { id: 'dossiers' as DashboardTab, label: 'TGC Dossiers', icon: FileText, badge: applications.length },
    { id: 'nieuwe-aanvraag' as DashboardTab, label: 'Nieuwe Aanvraag', icon: PlusCircle },
    { id: 'simulator' as DashboardTab, label: 'Cashflow Simulator', icon: Calculator },
    { id: 'documenten' as DashboardTab, label: 'Documentenkluis', icon: FolderLock },
    { id: 'instellingen' as DashboardTab, label: 'Bedrijfsprofiel', icon: Settings },
  ];

  // If user is admin (e.g. info@jamaldrenthe.com), add Admin Tab
  if (isAdmin) {
    navItems.push({
      id: 'admin' as DashboardTab,
      label: 'Beheerderspaneel',
      icon: ShieldAlert,
      badge: pendingCount
    });
  }

  const handleTabSelect = (tab: DashboardTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Mobile hamburger + Brand */}
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Menu openen"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div 
              onClick={onBackToHome} 
              className="cursor-pointer flex items-center space-x-2 group"
            >
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                Spontiva<span className="text-teal-500">.</span>
              </span>
              <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded-full border border-slate-200 hidden sm:inline-block">
                TGC Portal
              </span>
            </div>
          </div>

          {/* Center: Demo Account Switcher */}
          <div className="relative">
            <button
              onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
              className="hidden md:flex items-center space-x-2 px-3 py-1.5 text-xs font-medium rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors"
            >
              <Sparkles size={13} className="text-teal-600" />
              <span>Wissel Demo / Rol</span>
            </button>

            {demoDropdownOpen && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95"
                onMouseLeave={() => setDemoDropdownOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Test met demo accounts
                </div>
                {DEMO_ACCOUNTS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      loginWithDemo(d.id);
                      setDemoDropdownOpen(false);
                      if (d.isAdmin) setActiveTab('admin');
                    }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-50 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-slate-800">{d.name}</p>
                      <p className="text-[11px] text-slate-500">{d.roleLabel}</p>
                    </div>
                    {d.isAdmin && (
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-bold">Admin</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: User profile pill & controls */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onBackToHome}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors flex items-center space-x-1"
            >
              <span>Website</span>
              <ExternalLink size={13} />
            </button>

            {/* User status pill */}
            <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-teal-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                {currentUser?.displayName?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {currentUser?.displayName || 'Gebruiker'}
                </p>
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  {isAdmin ? (
                    <span className="text-purple-600 font-semibold flex items-center gap-0.5">
                      <ShieldAlert size={10} /> Admin
                    </span>
                  ) : (
                    <span>{currentUser?.companyName || 'Klant'}</span>
                  )}
                  {currentUser?.isDemo && (
                    <span className="text-[10px] bg-amber-100 text-amber-800 px-1 rounded font-medium">Demo</span>
                  )}
                </p>
              </div>

              <button
                onClick={logout}
                title="Uitloggen"
                className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors ml-1"
                aria-label="Uitloggen"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex gap-6">
        
        {/* Desktop Sidebar */}
        <aside className="w-64 flex-shrink-0 hidden lg:block">
          <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-sm sticky top-24 space-y-1">
            <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Menu Navigatie
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              const isSpecialAdmin = item.id === 'admin';

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabSelect(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? (isSpecialAdmin 
                          ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' 
                          : 'bg-slate-900 text-white shadow-md shadow-slate-900/15')
                      : (isSpecialAdmin
                          ? 'text-purple-700 hover:bg-purple-50 hover:text-purple-900'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon size={16} className={isActive ? 'text-white' : (isSpecialAdmin ? 'text-purple-600' : 'text-slate-500')} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : (isSpecialAdmin ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-700')
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            {/* Quick Demo Switcher in sidebar */}
            <div className="pt-4 mt-4 border-t border-slate-100">
              <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Users size={12} />
                <span>Demo Accounts</span>
              </div>
              <div className="space-y-1 mt-1">
                {DEMO_ACCOUNTS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      loginWithDemo(d.id);
                      if (d.isAdmin) setActiveTab('admin');
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-[11px] transition-colors flex items-center justify-between ${
                      currentUser?.email === d.email 
                        ? 'bg-teal-50 text-teal-800 font-bold border border-teal-200' 
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate">{d.name}</span>
                    <span className="text-[10px] text-slate-400">{d.isAdmin ? 'Admin' : 'Klant'}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm flex">
            <div className="bg-white w-72 max-w-full p-4 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-lg font-bold text-slate-900">Spontiva Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-md text-slate-400">
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-1.5 mt-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTabSelect(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                          isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center space-x-2.5">
                          <Icon size={16} />
                          <span>{item.label}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={logout}
                  className="w-full flex items-center justify-center space-x-2 py-2 text-xs font-semibold text-rose-600 bg-rose-50 rounded-xl"
                >
                  <LogOut size={14} />
                  <span>Uitloggen</span>
                </button>
              </div>
            </div>
            <div className="flex-1" onClick={() => setMobileMenuOpen(false)}></div>
          </div>
        )}

        {/* Tab View Content */}
        <main className="flex-1 min-w-0">
          {activeTab === 'overzicht' && (
            <OverviewTab onNavigate={setActiveTab} />
          )}
          {activeTab === 'dossiers' && (
            <DossiersTab onNavigate={setActiveTab} />
          )}
          {activeTab === 'nieuwe-aanvraag' && (
            <NewApplicationTab onSuccess={() => setActiveTab('dossiers')} />
          )}
          {activeTab === 'simulator' && (
            <SimulatorTab onApply={() => setActiveTab('nieuwe-aanvraag')} />
          )}
          {activeTab === 'documenten' && (
            <DocumentsTab />
          )}
          {activeTab === 'instellingen' && (
            <SettingsTab />
          )}
          {activeTab === 'admin' && (
            <AdminTab />
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
