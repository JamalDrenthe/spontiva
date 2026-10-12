import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { DEMO_ACCOUNTS } from '../demoData';
import { X, ShieldCheck, UserCheck, Sparkles, AlertCircle, ArrowRight, CheckCircle2, Lock } from 'lucide-react';
import { ADMIN_EMAIL } from '../firebaseConfig';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'register' | 'demo';
  onLoginSuccess?: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  initialMode = 'login',
  onLoginSuccess
}) => {
  const { loginWithGoogle, loginWithEmail, registerWithEmail, loginWithDemo } = useAuth();
  
  const [activeTab, setActiveTab] = useState<'login' | 'register' | 'demo'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
      await loginWithGoogle();
      if (onLoginSuccess) onLoginSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/popup-closed-by-user') {
        setError('Inlogvenster werd gesloten voor afronding.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('Dit domein is nog niet toegevoegd aan authorized domains in Firebase. Gebruik voor nu een van onze Demo accounts om alle functies direct te testen!');
      } else {
        setError(err.message || 'Er is een fout opgetreden bij het inloggen via Google.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (activeTab === 'login') {
        await loginWithEmail(email, password);
      } else {
        if (!name || !company) {
          setError('Vul a.u.b. alle velden in.');
          setLoading(false);
          return;
        }
        await registerWithEmail(email, password, name, company);
      }
      if (onLoginSuccess) onLoginSuccess();
      onClose();
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Onjuist e-mailadres of wachtwoord.');
      } else if (err.code === 'auth/email-already-in-use') {
        setError('Dit e-mailadres is al in gebruik. Probeer in te loggen.');
      } else if (err.code === 'auth/weak-password') {
        setError('Wachtwoord moet minimaal 6 tekens bevatten.');
      } else {
        setError(err.message || 'Authenticatie mislukt. Probeer het opnieuw of gebruik een demo-account.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelectDemo = (demoId: string) => {
    loginWithDemo(demoId);
    if (onLoginSuccess) onLoginSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div 
        className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-100 overflow-hidden transition-all animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Sluiten"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center space-x-2 text-teal-400 mb-1 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} />
            <span>Spontiva Account Portal</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {activeTab === 'login' && 'Welkom terug'}
            {activeTab === 'register' && 'Account aanmaken'}
            {activeTab === 'demo' && 'Kies een Demo Account'}
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Krijg direct inzicht in Time Gap Cashflow analyses en beheer je bedrijfskrediet.
          </p>

          {/* Tab Selector */}
          <div className="flex space-x-1 mt-5 bg-white/10 p-1 rounded-xl">
            <button
              onClick={() => { setActiveTab('login'); setError(null); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Inloggen
            </button>
            <button
              onClick={() => { setActiveTab('register'); setError(null); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'register' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-300 hover:text-white'
              }`}
            >
              Registreren
            </button>
            <button
              onClick={() => { setActiveTab('demo'); setError(null); }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center justify-center space-x-1 ${
                activeTab === 'demo' ? 'bg-teal-500 text-white shadow-sm' : 'text-teal-300 hover:text-white'
              }`}
            >
              <UserCheck size={13} />
              <span>Demo Accounts</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {error && (
            <div className="mb-5 p-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start space-x-3 text-rose-700 text-xs">
              <AlertCircle size={16} className="flex-shrink-0 mt-0.5 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {activeTab === 'demo' ? (
            /* Demo Accounts View */
            <div className="space-y-4">
              <div className="bg-teal-50/70 border border-teal-200 rounded-xl p-3.5 text-xs text-teal-900">
                <p className="font-semibold text-teal-800 mb-1 flex items-center gap-1.5">
                  <CheckCircle2 size={15} className="text-teal-600" />
                  Kies een rol om direct als normale gebruiker of beheerder in te loggen:
                </p>
                <p className="text-teal-700 leading-relaxed">
                  Geen wachtwoord vereist. Direct toegang tot dossiers, facturen, kasstroomsimulaties en het dashboard.
                </p>
              </div>

              <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
                {DEMO_ACCOUNTS.map((demo) => (
                  <button
                    key={demo.id}
                    onClick={() => handleSelectDemo(demo.id)}
                    className="w-full text-left p-3.5 rounded-xl border border-slate-200 hover:border-teal-500 hover:bg-slate-50 transition-all flex items-center justify-between group cursor-pointer shadow-sm hover:shadow"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${demo.avatarBg} shadow-inner`}>
                        {demo.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-900 text-sm">{demo.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                            demo.isAdmin 
                              ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {demo.roleLabel}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{demo.companyName}</p>
                        <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{demo.description}</p>
                      </div>
                    </div>
                    <div className="text-slate-400 group-hover:text-teal-600 transition-colors pl-2">
                      <ArrowRight size={18} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Login & Register View */
            <div className="space-y-4">
              {/* Google OAuth Login Button */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center space-x-3 py-3 px-4 border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-700 font-medium text-sm transition-all shadow-sm hover:shadow active:scale-[0.99] disabled:opacity-60"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Inloggen met Google</span>
              </button>

              {/* Admin Note regarding info@jamaldrenthe.com */}
              <div className="p-2.5 bg-purple-50/70 border border-purple-100 rounded-lg flex items-center space-x-2 text-[11px] text-purple-900">
                <ShieldCheck size={14} className="text-purple-600 flex-shrink-0" />
                <span>
                  Inloggen met <strong>{ADMIN_EMAIL}</strong> activeert automatisch het volledige <strong>Admin Beheerderspaneel</strong>.
                </span>
              </div>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-3 text-slate-400 font-medium">of met e-mail</span>
                </div>
              </div>

              {/* Email Form */}
              <form onSubmit={handleEmailSubmit} className="space-y-3.5">
                {activeTab === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Volledige Naam</label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Bijv. Jamal Drenthe"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Bedrijfsnaam</label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Bijv. Spontiva B.V."
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">E-mailadres</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="naam@bedrijf.nl"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Wachtwoord</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimaal 6 tekens"
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-semibold shadow-md transition-all active:scale-[0.99] disabled:opacity-60 flex items-center justify-center space-x-2"
                >
                  <Lock size={15} />
                  <span>
                    {loading ? 'Bezig met verwerken...' : (activeTab === 'login' ? 'Inloggen op Dashboard' : 'Account Registreren')}
                  </span>
                </button>
              </form>

              {/* Demo accounts quick jump */}
              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setActiveTab('demo')}
                  className="text-xs text-teal-600 hover:text-teal-700 font-semibold inline-flex items-center space-x-1 hover:underline"
                >
                  <Sparkles size={13} />
                  <span>Geen account? Test direct met een demo account voor normale gebruikers</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
