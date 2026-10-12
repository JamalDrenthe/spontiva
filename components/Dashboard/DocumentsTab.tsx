import React, { useState } from 'react';
import { useAuth } from '../../AuthContext';
import { FolderLock, Upload, FileText, CheckCircle2, Clock, Trash2, Download } from 'lucide-react';

const DocumentsTab: React.FC = () => {
  const { documents, addDocument } = useAuth();
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState('Factuur');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName) return;

    addDocument(
      docName.endsWith('.pdf') ? docName : `${docName}.pdf`,
      docType,
      `${Math.floor(200 + Math.random() * 1500)} KB`
    );

    setDocName('');
    setUploadSuccess(true);
    setTimeout(() => setUploadSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Documentenkluis</h1>
        <p className="text-xs text-slate-500">
          Upload en beheer facturen, jaarcijfers en contracten voor je TGC-beoordeling.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Form */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Upload size={16} className="text-teal-600" />
            <span>Nieuw Document Toevoegen</span>
          </h2>

          {uploadSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-600" />
              <span>Document succesvol geüpload!</span>
            </div>
          )}

          <form onSubmit={handleUpload} className="space-y-3.5 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Type Document</label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              >
                <option value="Factuur">Factuur</option>
                <option value="Jaarcijfers">Jaarrekening / Cijfers</option>
                <option value="KvK Uittreksel">KvK Uittreksel</option>
                <option value="Debiteurenlijst">Debiteurenlijst</option>
                <option value="Overeenkomst">Contract / Inkooporder</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bestandsnaam / Omschrijving</label>
              <input
                type="text"
                required
                placeholder="Bijv. Factuur_Oktober_2026.pdf"
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="p-4 border-2 border-dashed border-slate-200 rounded-xl text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer">
              <FolderLock size={24} className="mx-auto text-slate-400 mb-1" />
              <p className="font-semibold text-slate-700">Sleep bestanden hierheen of klik om te bladeren</p>
              <p className="text-[10px] text-slate-400 mt-0.5">PDF, XLSX, PNG (max. 20MB)</p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all shadow-sm"
            >
              Document Opslaan
            </button>
          </form>
        </div>

        {/* Documents Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-slate-100">
            <h2 className="text-sm font-bold text-slate-900">Geüploade Bestanden ({documents.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
                  <th className="p-3.5">Bestand</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Grootte</th>
                  <th className="p-3.5">Datum</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {documents.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3.5 font-bold text-slate-900 flex items-center gap-2">
                      <FileText size={15} className="text-teal-600 flex-shrink-0" />
                      <span className="truncate max-w-[180px]">{doc.name}</span>
                    </td>
                    <td className="p-3.5 text-slate-600">{doc.type}</td>
                    <td className="p-3.5 text-slate-500">{doc.size}</td>
                    <td className="p-3.5 text-slate-500">{doc.uploadedAt}</td>
                    <td className="p-3.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        doc.status === 'geverifieerd'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {doc.status === 'geverifieerd' ? 'Geverifieerd' : 'In beoordeling'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button 
                        onClick={() => alert(`Bestand "${doc.name}" downloaden...`)}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded transition-colors"
                        title="Downloaden"
                      >
                        <Download size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
};

export default DocumentsTab;
