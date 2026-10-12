import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { Settings, Save, CheckCircle2, Building, Mail, Phone, CreditCard, Shield } from 'lucide-react';

const SettingsTab: React.FC = () => {
  const { currentUser, isAdmin } = useAuth();

  const [companyName, setCompanyName] = useState(currentUser?.companyName || '');
  const [displayName, setDisplayName] = useState(currentUser?.displayName || '');
  const [kvkNumber, setKvkNumber] = useState(currentUser?.kvkNumber || '84920194');
  const [iban, setIban] = useState(currentUser?.iban || 'NL91 ABNA 0412 3456 78');
  const [phone, setPhone] = useState(currentUser?.phone || '+31 6 12345678');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Bedrijfsprofiel & Instellingen</h1>
        <p className="text-xs text-slate-500">
          Beheer je bedrijfs- en verificatiegegevens voor soepele TGC-transacties.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
        
        {saved && (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-600" />
            <span>Instellingen succesvol bijgewerkt!</span>
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div className="flex items-center space-x-2 text-slate-900 font-bold border-b border-slate-100 pb-2">
            <Building size={16} className="text-teal-600" />
            <span>Bedrijfsidentificatie</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bedrijfsnaam</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">KvK Nummer</label>
              <input
                type="text"
                value={kvkNumber}
                onChange={(e) => setKvkNumber(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-slate-900 font-bold border-b border-slate-100 pb-2 pt-4">
            <Mail size={16} className="text-teal-600" />
            <span>Contactgegevens & Beheer</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Contactpersoon</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">E-mailadres</label>
              <input
                type="email"
                disabled
                value={currentUser?.email || ''}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-500 cursor-not-allowed"
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
              <label className="block font-semibold text-slate-700 mb-1">IBAN Rekeningnummer (Uitbetalingen)</label>
              <input
                type="text"
                value={iban}
                onChange={(e) => setIban(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>
          </div>

          {/* Account Role Badge */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield size={16} className={isAdmin ? 'text-purple-600' : 'text-teal-600'} />
              <span className="text-slate-600">
                Toegewezen Gebruikersrol: <strong className="text-slate-900">{currentUser?.role.toUpperCase()}</strong>
                {isAdmin && ' (Hoofdbeheerder)'}
              </span>
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl text-xs flex items-center space-x-1.5 transition-all shadow-sm"
            >
              <Save size={14} />
              <span>Opslaan</span>
            </button>
          </div>
        </div>
      </form>

    </div>
  );
};

export default SettingsTab;
