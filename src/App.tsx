import { useState } from 'react';
import Header from './components/Header';
import DocumentLoader from './components/DocumentLoader';
import BlockViewer from './components/BlockViewer';
import HoldRegistry from './components/HoldRegistry';
import AuditChecks from './components/AuditChecks';
import ArtifactGenerator from './components/ArtifactGenerator';
import DeployGuide from './components/DeployGuide';
import SummaryPanel from './components/SummaryPanel';
import type { TabId, HoldItem, AuditCheck } from './types';

const tabs: { id: TabId; label: string; icon: string }[] = [
  { id: 'documento', label: 'Documento', icon: 'fa-file-lines' },
  { id: 'bloques', label: 'Bloques I–XXI', icon: 'fa-layer-group' },
  { id: 'hold', label: 'HOLD', icon: 'fa-pause-circle' },
  { id: 'auditoria', label: 'Auditoría', icon: 'fa-clipboard-check' },
  { id: 'artefactos', label: 'Artefactos', icon: 'fa-file-code' },
  { id: 'despliegue', label: 'Despliegue', icon: 'fa-rocket' },
  { id: 'resumen', label: 'Resumen', icon: 'fa-flag-checkered' },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('documento');
  const [documentLoaded, setDocumentLoaded] = useState(false);
  const [documentContent, setDocumentContent] = useState('');
  const [holdItems, setHoldItems] = useState<HoldItem[]>([]);
  const [auditChecks, setAuditChecks] = useState<AuditCheck[]>([]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white">
      <Header />

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <i className={`fas ${tab.icon} text-xs`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'documento' && (
          <DocumentLoader
            onDocumentLoaded={(content) => {
              setDocumentContent(content);
              setDocumentLoaded(true);
            }}
            documentLoaded={documentLoaded}
            documentContent={documentContent}
          />
        )}
        {activeTab === 'bloques' && (
          <BlockViewer documentContent={documentContent} documentLoaded={documentLoaded} />
        )}
        {activeTab === 'hold' && (
          <HoldRegistry holdItems={holdItems} setHoldItems={setHoldItems} />
        )}
        {activeTab === 'auditoria' && (
          <AuditChecks auditChecks={auditChecks} setAuditChecks={setAuditChecks} />
        )}
        {activeTab === 'artefactos' && (
          <ArtifactGenerator documentLoaded={documentLoaded} />
        )}
        {activeTab === 'despliegue' && (
          <DeployGuide documentLoaded={documentLoaded} />
        )}
        {activeTab === 'resumen' && (
          <SummaryPanel
            documentLoaded={documentLoaded}
            holdItems={holdItems}
            auditChecks={auditChecks}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 mt-16 py-8 text-center text-slate-500 text-sm">
        <p className="font-medium text-slate-400">PDMCOB2627 — Programación Didáctica 2026/2027</p>
        <p className="mt-1">Música de Cámara · Orquesta · Banda — Enseñanzas Profesionales de Música</p>
        <p className="mt-2">
          <a href="https://github.com/PDMCOB2627/PDMCOB2627" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            <i className="fab fa-github mr-1"></i>github.com/PDMCOB2627/PDMCOB2627
          </a>
        </p>
        <p className="mt-2 text-xs text-slate-600">
          Herramienta de gestión documental y despliegue · Principio de veracidad normativa · Disciplina HOLD
        </p>
      </footer>
    </div>
  );
}

export default App;
