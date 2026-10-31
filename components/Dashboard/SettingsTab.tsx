import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { AccountType } from '../../types';
import { 
  Settings, 
  Save, 
  CheckCircle2, 
  Building, 
  Mail, 
  Phone, 
  CreditCard, 
  Shield, 
  Briefcase, 
  Store, 
  Users,
  Database,
  CloudCheck
} from 'lucide-react';

const SettingsTab: React.FC = () => {
  const { currentUser, isAdmin, updateUserProfile, syncStatus } = useAuth();

  const [companyName, setCompanyName] = useState(currentUser?.companyName || '');
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [accountType, setAccountType] = useState<AccountType>(currentUser?.accountType || (isAdmin ? 'admin' : 'mkb'));
  const [kvkNumber, setKvkNumber] = useState(currentUser?.kvkNumber || '84920194');
  const [iban, setIban] = useState(currentUser?.iban || 'NL91 ABNA 0412 3456 78');
  const [phone, setPhone] = useState(currentUser?.phone || '+31 6 12345678');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateUserProfile({
        companyName,
        displayName,
        accountType,
        kvkNumber,
        iban,
        phone
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bedrijfsprofiel & Instellingen</h1>
          <p className="text-xs text-slate-500">
            Beheer je bedrijfs- en verificatiegegevens. Alle wijzigingen synchroniseren direct met Google Firebase.
          </p>
        </div>

        {/* Live Firebase Sync Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 w-fit">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Firebase Firestore: {syncStatus === 'synced' ? 'Realtime Verbonden' : syncStatus}</span>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
        
        {saved && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            <span>Instellingen en accounttype succesvol opgeslagen in Firebase!</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div className="flex items-center space-x-2 text-slate-900 font-bold border-b border-slate-100 pb-2">
            <Building size={16} className="text-teal-600" />
            <span>Bedrijfsidentificatie & Account Type</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bedrijfsnaam</label>
              <input
                type="text"
                required
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Type Account / Segment</label>
              <select
                value={accountType}
                onChange={(e) => setAccountType(e.target.value as AccountType)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-semibold text-slate-800"
              >
                <option value="zzp">ZZP Ondernemer / Freelance Specialist (tot € 25k)</option>
                <option value="mkb">MKB Bedrijf / Transport / Bouw / IT (tot € 250k)</option>
                <option value="corporate">Grootzakelijk / Retail / Groothandel (€ 250k+)</option>
                <option value="partner">Financieel Intermediair / Accountant</option>
                {isAdmin && <option value="admin">Spontiva Administrator / Directie</option>}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">KvK Nummer</label>
              <input
                type="text"
                value={kvkNumber}
                onChange={(e) => setKvkNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">IBAN Rekeningnummer</label>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-slate-900 font-bold border-b border-slate-100 pb-2 pt-4">
            <Mail size={16} className="text-teal-600" />
            <span>Contactgegevens & Authenticatie</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contactpersoon (Naam)</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">E-mailadres (Geverifieerd)</label>
              <input
                type="email"
                disabled
                value={currentUser?.email || ''}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed font-medium"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Telefoonnummer</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Gebruikersrol</label>
              <div className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-600 font-semibold flex items-center justify-between">
                <span>{isAdmin ? 'Platform Beheerder (Admin)' : 'Geverifieerde Gebruiker (B2B)'}</span>
                <Shield size={14} className={isAdmin ? 'text-purple-600' : 'text-teal-600'} />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs flex items-center space-x-2 transition-all shadow-md active:scale-[0.99] disabled:opacity-60"
          >
            <Save size={15} />
            <span>{saving ? 'Opslaan in Firebase...' : 'Wijzigingen Opslaan'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SettingsTab;
