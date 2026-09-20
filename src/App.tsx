import { useState } from 'react';
import DeployGuide from './components/DeployGuide';
import Header from './components/Header';
import FileViewer from './components/FileViewer';
import SummaryPanel from './components/SummaryPanel';

function App() {
  const [activeTab, setActiveTab] = useState<'guide' | 'files' | 'summary'>('guide');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <Header />
      
      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 pt-6">
        <div className="flex gap-2 bg-slate-800/50 p-1.5 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === 'guide'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <i className="fas fa-list-ol mr-2"></i>Guía de Despliegue
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === 'files'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <i className="fas fa-file-code mr-2"></i>Archivos
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
              activeTab === 'summary'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <i className="fas fa-clipboard-check mr-2"></i>Resumen Final
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'guide' && <DeployGuide />}
        {activeTab === 'files' && <FileViewer />}
        {activeTab === 'summary' && <SummaryPanel />}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-16 py-6 text-center text-slate-500 text-sm">
        <p>Deploy Guide — Programación Didáctica 2026/2027 — Música de Cámara · Orquesta · Banda</p>
        <p className="mt-1">Generado como herramienta de apoyo para el despliegue en GitHub + Vercel</p>
      </footer>
    </div>
  );
}

export default App;
