import { useState, useRef } from 'react';
import CodeBlock from './CodeBlock';

interface Props {
  onDocumentLoaded: (content: string) => void;
  documentLoaded: boolean;
  documentContent: string;
}

export default function DocumentLoader({ onDocumentLoaded, documentLoaded, documentContent }: Props) {
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.md') && !file.name.endsWith('.txt')) {
      setError('Solo se aceptan archivos .md o .txt');
      return;
    }

    setError('');
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      onDocumentLoaded(content);
    };
    reader.onerror = () => setError('Error al leer el archivo');
    reader.readAsText(file);
  };

  const handlePaste = () => {
    const textarea = document.getElementById('paste-area') as HTMLTextAreaElement;
    if (textarea && textarea.value.trim()) {
      onDocumentLoaded(textarea.value);
      setFileName('Documento pegado manualmente');
    }
  };

  const wordCount = documentContent ? documentContent.split(/\s+/).filter(Boolean).length : 0;
  const lineCount = documentContent ? documentContent.split('\n').length : 0;
  const headingCount = documentContent ? (documentContent.match(/^#{1,6}\s/gm) || []).length : 0;

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
            <i className="fas fa-file-import text-emerald-400"></i>
          </div>
          FASE 1 — Carga del Documento Fuente
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Carga el archivo <code className="text-emerald-300 bg-emerald-500/10 px-1.5 py-0.5 rounded">PROGRAMACION_DIDACTICA_MUSICA_CAMARA_ORQUESTA_BANDA_2026_2027_DEPURADA.md</code> para iniciar el procesamiento.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              <i className="fas fa-upload mr-2 text-emerald-400"></i>
              Subir archivo Markdown
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-600/50 rounded-xl p-8 text-center cursor-pointer hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all group"
            >
              <i className="fas fa-cloud-upload-alt text-4xl text-slate-500 group-hover:text-emerald-400 transition-colors mb-3"></i>
              <p className="text-slate-400 text-sm">
                {fileName || 'Haz clic o arrastra el archivo aquí'}
              </p>
              <p className="text-slate-600 text-xs mt-1">Formatos: .md, .txt</p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".md,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>

          {/* Paste Area */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-3">
              <i className="fas fa-paste mr-2 text-emerald-400"></i>
              O pega el contenido directamente
            </label>
            <textarea
              id="paste-area"
              placeholder="Pega aquí el contenido del documento Markdown..."
              className="w-full h-44 px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-slate-300 text-sm placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 resize-none transition-all"
            ></textarea>
            <button
              onClick={handlePaste}
              className="mt-3 px-5 py-2.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/20"
            >
              <i className="fas fa-check mr-2"></i>Cargar contenido pegado
            </button>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            <i className="fas fa-exclamation-circle mr-2"></i>{error}
          </div>
        )}
      </div>

      {/* Document Status */}
      {documentLoaded && (
        <div className="bg-slate-800/60 backdrop-blur-sm border border-emerald-500/30 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-emerald-400 mb-4 flex items-center gap-2">
            <i className="fas fa-check-circle"></i>
            Documento cargado correctamente
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{wordCount.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mt-1">Palabras</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{lineCount.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mt-1">Líneas</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-white">{headingCount}</div>
              <div className="text-xs text-slate-400 mt-1">Encabezados</div>
            </div>
            <div className="bg-slate-900/50 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-emerald-400">
                {(documentContent.length / 1024).toFixed(1)} KB
              </div>
              <div className="text-xs text-slate-400 mt-1">Tamaño</div>
            </div>
          </div>

          {/* Preview */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-slate-300 mb-2">
              <i className="fas fa-eye mr-2 text-slate-500"></i>Vista previa (primeras 30 líneas)
            </h4>
            <div className="bg-slate-900/80 border border-slate-700/50 rounded-lg p-4 max-h-64 overflow-y-auto">
              <pre className="text-xs text-slate-400 font-mono whitespace-pre-wrap">
                {documentContent.split('\n').slice(0, 30).join('\n')}
                {lineCount > 30 && '\n\n[...]'}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-info-circle text-blue-400"></i>
          Instrucciones de uso
        </h3>
        <div className="space-y-3 text-sm text-slate-400">
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">1</span>
            <p>Carga el documento fuente <code className="text-emerald-300 bg-emerald-500/10 px-1 rounded">.md</code> usando el selector de archivos o pegando el contenido.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">2</span>
            <p>Revisa los <strong className="text-white">Bloques I–XXI</strong> extraídos automáticamente del documento.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">3</span>
            <p>Registra los elementos <strong className="text-amber-400">HOLD</strong> que no pueden acreditarse.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">4</span>
            <p>Ejecuta los <strong className="text-white">12 checks de auditoría</strong> para verificar integridad.</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">5</span>
            <p>Genera los <strong className="text-white">artefactos</strong> (HTML, README, vercel.json, etc.).</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-6 h-6 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center text-xs font-bold shrink-0">6</span>
            <p>Sigue la <strong className="text-white">guía de despliegue</strong> con los comandos copiables para GitHub + Vercel.</p>
          </div>
        </div>
      </div>

      {/* Classification Legend */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-tags text-purple-400"></i>
          Clasificación interna del fuente
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { label: 'NORMA VIGENTE', color: 'emerald', icon: 'fa-gavel', desc: 'Legislación educativa aplicable' },
            { label: 'TEXTO OFICIAL', color: 'blue', icon: 'fa-scroll', desc: 'Textos de boletines oficiales' },
            { label: 'DOCUMENTO INSTITUCIONAL', color: 'indigo', icon: 'fa-building', desc: 'Documentos del centro educativo' },
            { label: 'DESARROLLO PROPIO', color: 'teal', icon: 'fa-pen-fancy', desc: 'Elaboración del autor' },
            { label: 'EVIDENCIA', color: 'cyan', icon: 'fa-search', desc: 'Datos verificables' },
            { label: 'HOLD', color: 'amber', icon: 'fa-pause-circle', desc: 'Pendiente de verificación' },
          ].map((item) => (
            <div key={item.label} className={`flex items-center gap-3 p-3 bg-${item.color}-500/5 border border-${item.color}-500/20 rounded-lg`}>
              <i className={`fas ${item.icon} text-${item.color}-400`}></i>
              <div>
                <div className={`text-xs font-bold text-${item.color}-400`}>{item.label}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
