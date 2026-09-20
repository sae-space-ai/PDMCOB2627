import type { HoldItem, AuditCheck } from '../types';

interface Props {
  documentLoaded: boolean;
  holdItems: HoldItem[];
  auditChecks: AuditCheck[];
}

export default function SummaryPanel({ documentLoaded, holdItems, auditChecks }: Props) {
  const holdAbiertos = holdItems.filter(i => i.estado === 'abierto').length;
  const holdCerrados = holdItems.filter(i => i.estado === 'cerrado').length;
  const checksSuperados = auditChecks.filter(c => c.estado === 'superado').length;
  const checksFallo = auditChecks.filter(c => c.estado === 'fallo').length;

  const summary = `--- RESUMEN DE OPERACIÓN ---
Repositorio: https://github.com/<USUARIO>/programacion-didactica-2026-2027
Producción: https://programacion-didactica-2026-2027.vercel.app
CI/CD: ${documentLoaded ? '✅ LISTO PARA ACTIVAR' : '❌ PENDIENTE (documento no cargado)'}
Artefactos generados: index.html, README.md, vercel.json, CHANGELOG.md, HOLD_REGISTRY.md
Bloques procesados: I–XXI + auditoría
HOLD abiertos: ${holdAbiertos}
HOLD cerrados: ${holdCerrados}
Checks auditoría: ${checksSuperados}/12 superados, ${checksFallo} fallos
Estado de auditoría: ${checksSuperados}/12
--- FIN DEL RESUMEN ---`;

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
  };

  return (
    <div className="space-y-6">
      {/* Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className={`rounded-xl p-5 text-center border ${documentLoaded ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-slate-800/60 border-slate-700/50'}`}>
          <i className={`fas ${documentLoaded ? 'fa-check-circle text-emerald-400' : 'fa-clock text-slate-500'} text-2xl mb-2`}></i>
          <div className={`text-lg font-bold ${documentLoaded ? 'text-emerald-400' : 'text-slate-500'}`}>
            {documentLoaded ? 'SÍ' : 'NO'}
          </div>
          <div className="text-xs text-slate-400 mt-1">Documento cargado</div>
        </div>
        <div className="bg-amber-500/5 border border-amber-500/30 rounded-xl p-5 text-center">
          <i className="fas fa-pause-circle text-amber-400 text-2xl mb-2"></i>
          <div className="text-lg font-bold text-amber-400">{holdAbiertos}</div>
          <div className="text-xs text-slate-400 mt-1">HOLD abiertos</div>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/30 rounded-xl p-5 text-center">
          <i className="fas fa-check-circle text-emerald-400 text-2xl mb-2"></i>
          <div className="text-lg font-bold text-emerald-400">{checksSuperados}</div>
          <div className="text-xs text-slate-400 mt-1">Checks superados</div>
        </div>
        <div className={`rounded-xl p-5 text-center border ${checksFallo > 0 ? 'bg-red-500/5 border-red-500/30' : 'bg-slate-800/60 border-slate-700/50'}`}>
          <i className={`fas ${checksFallo > 0 ? 'fa-times-circle text-red-400' : 'fa-shield-alt text-slate-500'} text-2xl mb-2`}></i>
          <div className={`text-lg font-bold ${checksFallo > 0 ? 'text-red-400' : 'text-slate-500'}`}>{checksFallo}</div>
          <div className="text-xs text-slate-400 mt-1">Fallos detectados</div>
        </div>
      </div>

      {/* Summary Text */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
          <h3 className="text-sm font-medium text-white flex items-center gap-2">
            <i className="fas fa-flag-checkered text-emerald-400"></i>
            Resumen de operación
          </h3>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 bg-slate-700/50 text-slate-400 hover:text-white rounded-lg text-xs font-medium transition-colors"
          >
            <i className="fas fa-copy mr-1"></i>Copiar
          </button>
        </div>
        <div className="p-5">
          <pre className="bg-slate-900/80 border border-slate-700/50 rounded-lg p-4 text-sm font-mono text-emerald-300 whitespace-pre-wrap overflow-x-auto">
            {summary}
          </pre>
        </div>
      </div>

      {/* Deliverables Checklist */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-clipboard-list text-indigo-400"></i>
          Entregables (Fase 6)
        </h3>
        <div className="space-y-3">
          {[
            { label: 'A. Repositorio GitHub', desc: 'https://github.com/<USUARIO>/programacion-didactica-2026-2027', done: false },
            { label: 'B. URL de producción en Vercel', desc: 'https://programacion-didactica-2026-2027.vercel.app', done: false },
            { label: 'C. CI/CD activo', desc: 'Push a main → deploy automático', done: false },
            { label: 'D. HOLD_REGISTRY.md', desc: `${holdAbiertos} elementos abiertos, ${holdCerrados} cerrados`, done: holdAbiertos === 0 },
            { label: 'E. Ampliaciones realizadas', desc: 'Desarrollos propios con trazabilidad', done: documentLoaded },
            { label: 'F. Depuración de duplicidades', desc: 'Sin contradicciones ni duplicados', done: documentLoaded },
            { label: 'G. Identidad HTML = MD', desc: 'Contenido verificado', done: false },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-slate-900/30 rounded-lg">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                item.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-700 text-slate-500'
              }`}>
                <i className={`fas ${item.done ? 'fa-check' : 'fa-circle'} text-[10px]`}></i>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white">{item.label}</div>
                <div className="text-xs text-slate-500">{item.desc}</div>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${item.done ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-700/50 text-slate-500'}`}>
                {item.done ? '✅' : '⬜'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Restrictions */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-shield-alt text-slate-400"></i>
          Restricciones finales
        </h3>
        <ul className="space-y-2">
          {[
            'No expongas tokens en logs ni archivos versionados.',
            'No modifiques el contenido del fuente sin dejar trazabilidad.',
            'No cierres un HOLD sin fuente verificable.',
            'No inventes URL, IDs ni tokens.',
            'No ejecutes operaciones destructivas sin confirmación.',
            'Si falta información crítica, detente y solicítala.',
          ].map((rule, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-slate-400">
              <i className="fas fa-times-circle text-red-400 mt-0.5 shrink-0"></i>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
