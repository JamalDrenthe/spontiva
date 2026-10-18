import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { DashboardTab } from '../../types';
import { 
  LayoutDashboard, 
  FileSearch, 
  Zap, 
  Receipt, 
  BookOpen, 
  Calculator, 
  FolderLock, 
  Settings, 
  ShieldAlert, 
  LogOut, 
  ExternalLink, 
  Menu, 
  X, 
  ChevronRight, 
  Sparkles, 
  Users,
  Building2,
  Clock
} from 'lucide-react';

import OverviewTab from './OverviewTab';
import AnalysesTab from './AnalysesTab';
import DossiersTab from './DossiersTab';
import InvoicesTab from './InvoicesTab';
import MethodsCatalogTab from './MethodsCatalogTab';
import NewApplicationTab from './NewApplicationTab';
import SimulatorTab from './SimulatorTab';
import DocumentsTab from './DocumentsTab';
import SettingsTab from './SettingsTab';
import AdminTab from './AdminTab';
import { DEMO_ACCOUNTS } from '../../demoData';
import { SpontivaLogo } from '../SpontivaLogo';

interface DashboardLayoutProps {
  onBackToHome: () => void;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ onBackToHome }) => {
  const { 
    currentUser, 
    logout, 
    isAdmin, 
    loginWithDemo, 
    applications, 
    userApplications,
    userInvoices,
    userReports 
  } = useAuth();

  const [activeTab, setActiveTab] = useState<DashboardTab>(isAdmin ? 'admin' : 'overzicht');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const [preselectedMethodCode, setPreselectedMethodCode] = useState<string>('');
  const [initialAppType, setInitialAppType] = useState<'analyse' | 'aanvraag'>('aanvraag');

  // Count pending items for admin
  const pendingCount = applications.filter(a => a.status === 'nieuw' || a.status === 'in_behandeling' || a.status === 'in_analyse').length;
  const activeInterventionsCount = userApplications.filter(a => a.status === 'actief' || a.status === 'goedgekeurd').length;
  const openInvoicesCount = userInvoices.filter(i => i.status === 'openstaand').length;

  const handleTabSelect = (tab: DashboardTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  const handleDeployMethod = (methodCode: string) => {
    setPreselectedMethodCode(methodCode);
    setInitialAppType('aanvraag');
    setActiveTab('nieuwe-aanvraag');
  };

  const handleStartAnalysis = () => {
    setInitialAppType('analyse');
    setActiveTab('nieuwe-aanvraag');
  };

  const navSections = [
    {
      title: 'Cockpit',
      items: [
        { id: 'overzicht' as DashboardTab, label: 'Overzicht (Cockpit)', icon: LayoutDashboard }
      ]
    },
    {
      title: 'De 2 Spontiva Routes',
      items: [
        { 
          id: 'analyses' as DashboardTab, 
          label: 'Route 1: TGC-Analyses', 
          icon: FileSearch, 
          badge: userReports.length > 0 ? userReports.length : undefined 
        },
        { 
          id: 'interventies' as DashboardTab, 
          label: 'Route 2: TGC-Interventies', 
          icon: Zap, 
          badge: userApplications.length > 0 ? userApplications.length : undefined 
        }
      ]
    },
    {
      title: 'Kasstroom & Methodes',
      items: [
        { 
          id: 'facturen' as DashboardTab, 
          label: 'Facturen & Gap Kalender', 
          icon: Receipt, 
          badge: openInvoicesCount > 0 ? openInvoicesCount : undefined 
        },
        { 
          id: 'methodes' as DashboardTab, 
          label: '60+ TGC-Methodes', 
          icon: BookOpen,
          badge: 64
        },
        { 
          id: 'simulator' as DashboardTab, 
          label: 'Scenario Simulator', 
          icon: Calculator 
        }
      ]
    },
    {
      title: 'Dossier & Bedrijf',
      items: [
        { id: 'documenten' as DashboardTab, label: 'Documentenkluis', icon: FolderLock },
        { id: 'instellingen' as DashboardTab, label: 'Bedrijfsprofiel', icon: Settings }
      ]
    }
  ];

  if (isAdmin) {
    navSections.push({
      title: 'Directie Toezicht',
      items: [
        { 
          id: 'admin' as DashboardTab, 
          label: 'Beheerderspaneel', 
          icon: ShieldAlert, 
          badge: pendingCount 
        }
      ]
    });
  }

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
              className="cursor-pointer flex items-center space-x-2.5 group"
            >
              <SpontivaLogo variant="badge" size={32} />
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">
                Spontiva<span className="text-emerald-500">.</span>
              </span>
              <span className="text-xs bg-slate-100 text-slate-700 font-semibold px-2.5 py-0.5 rounded-full border border-slate-200 hidden sm:inline-block">
                Time Gap Cashflow Platform
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
              <span>Wissel Segment / Rol</span>
            </button>

            {demoDropdownOpen && (
              <div 
                className="absolute left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2.5 z-50 animate-in fade-in zoom-in-95"
                onMouseLeave={() => setDemoDropdownOpen(false)}
              >
                <div className="px-3.5 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                  Test met realistische bedrijfsprofielen
                </div>
                {DEMO_ACCOUNTS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => {
                      loginWithDemo(d.id);
                      setDemoDropdownOpen(false);
                      if (d.isAdmin) setActiveTab('admin');
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs hover:bg-slate-50 flex items-center justify-between transition-colors ${
                      currentUser?.email === d.email ? 'bg-teal-50/60' : ''
                    }`}
                  >
                    <div>
                      <p className="font-bold text-slate-900">{d.name}</p>
                      <p className="text-[11px] text-slate-500">{d.companyName} • {d.roleLabel}</p>
                    </div>
                    {d.isAdmin ? (
                      <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-bold">Admin</span>
                    ) : (
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">Klant</span>
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-900 to-teal-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">
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
                    <span className="truncate max-w-[120px]">{currentUser?.companyName || 'Mijn Bedrijf'}</span>
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
          <div className="bg-white rounded-2xl border border-slate-200/80 p-3 shadow-sm sticky top-24 space-y-4">
            
            {navSections.map((sec, sIdx) => (
              <div key={sIdx} className="space-y-1">
                <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {sec.title}
                </div>
                {sec.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  const isSpecialAdmin = item.id === 'admin';

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabSelect(item.id)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
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
                        <Icon size={15} className={isActive ? 'text-white' : (isSpecialAdmin ? 'text-purple-600' : 'text-slate-500')} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
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
              </div>
            ))}

            {/* Quick Demo Switcher in sidebar */}
            <div className="pt-3 border-t border-slate-100">
              <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Users size={11} />
                <span>Snelle Segment Wissel</span>
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
                    <span className="truncate max-w-[130px]">{d.name}</span>
                    <span className="text-[10px] text-slate-400">{d.roleLabel.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm flex">
            <div className="bg-white w-72 max-w-full p-4 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <span className="text-lg font-bold text-slate-900">Spontiva Menu</span>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-md text-slate-400">
                    <X size={20} />
                  </button>
                </div>
                <div className="space-y-4 mt-4">
                  {navSections.map((sec, sIdx) => (
                    <div key={sIdx} className="space-y-1">
                      <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        {sec.title}
                      </div>
                      {sec.items.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleTabSelect(item.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold ${
                              isActive ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <div className="flex items-center space-x-2.5">
                              <Icon size={16} />
                              <span>{item.label}</span>
                            </div>
                            {item.badge !== undefined && (
                              <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded-full font-bold">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-6">
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
            <OverviewTab 
              onNavigate={setActiveTab} 
              onDeployMethod={handleDeployMethod} 
            />
          )}
          {activeTab === 'analyses' && (
            <AnalysesTab 
              onStartNewAnalysis={handleStartAnalysis}
              onDeployMethod={handleDeployMethod}
              onNavigate={setActiveTab}
            />
          )}
          {activeTab === 'interventies' && (
            <DossiersTab onNavigate={setActiveTab} />
          )}
          {activeTab === 'facturen' && (
            <InvoicesTab onNavigate={setActiveTab} />
          )}
          {activeTab === 'methodes' && (
            <MethodsCatalogTab 
              onSelectMethod={handleDeployMethod} 
              onNavigate={setActiveTab} 
            />
          )}
          {activeTab === 'nieuwe-aanvraag' && (
            <NewApplicationTab 
              initialType={initialAppType}
              initialMethodCode={preselectedMethodCode}
              onSuccess={() => setActiveTab('interventies')} 
            />
          )}
          {activeTab === 'simulator' && (
            <SimulatorTab 
              onApply={(type) => {
                setInitialAppType(type);
                setActiveTab('nieuwe-aanvraag');
              }}
              onNavigate={setActiveTab}
            />
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
