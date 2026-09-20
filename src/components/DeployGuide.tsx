import { useState } from 'react';
import CodeBlock from './CodeBlock';

interface Props {
  documentLoaded: boolean;
}

interface Phase {
  numero: number;
  nombre: string;
  descripcion: string;
  comandos: { etiqueta: string; codigo: string; nota?: string }[];
}

const phases: Phase[] = [
  {
    numero: 1,
    nombre: 'Verificación de entorno',
    descripcion: 'Comprueba que todas las herramientas están instaladas.',
    comandos: [
      { etiqueta: 'Verificar herramientas', codigo: 'git --version\ngh --version\nvercel --version\nnode --version' },
      { etiqueta: 'Estado GitHub CLI', codigo: 'gh auth status', nota: 'Si no estás autenticado: gh auth login' },
      { etiqueta: 'Login Vercel', codigo: 'vercel login', nota: 'Detente si no puedes autenticarte.' },
    ],
  },
  {
    numero: 2,
    nombre: 'Creación del repositorio',
    descripcion: 'Inicializa Git, copia artefactos y crea el repo en GitHub.',
    comandos: [
      { etiqueta: 'Inicializar repositorio', codigo: 'mkdir programacion-didactica-2026-2027\ncd programacion-didactica-2026-2027\ngit init\ngit branch -M main' },
      { etiqueta: 'Copiar artefactos', codigo: '# Copia aquí los archivos generados:\n# index.html, README.md, vercel.json\n# .gitignore, CHANGELOG.md, HOLD_REGISTRY.md\n# .github/workflows/deploy.yml' },
      { etiqueta: 'Crear repo remoto', codigo: 'gh repo create programacion-didactica-2026-2027 --public --source=. --remote=origin --push' },
    ],
  },
  {
    numero: 3,
    nombre: 'Vinculación con Vercel',
    descripcion: 'Vincula el proyecto con Vercel.',
    comandos: [
      { etiqueta: 'Link proyecto', codigo: 'vercel link --yes' },
      { etiqueta: 'Verificar', codigo: 'cat .vercel/project.json', nota: 'Anota projectId y orgId.' },
    ],
  },
  {
    numero: 4,
    nombre: 'Configuración de secretos',
    descripcion: 'Añade los tokens necesarios como secretos en GitHub.',
    comandos: [
      { etiqueta: 'Crear token Vercel', codigo: 'vercel tokens create programacion-didactica-deploy', nota: 'O usa uno existente en vercel.com/account/tokens' },
      { etiqueta: 'Añadir secretos', codigo: 'gh secret set VERCEL_TOKEN --body "<TOKEN>"\ngh secret set VERCEL_ORG_ID --body "<ORG_ID>"\ngh secret set VERCEL_PROJECT_ID --body "<PROJECT_ID>"', nota: '⚠️ Sustituye los valores. No expongas tokens.' },
      { etiqueta: 'Verificar', codigo: 'gh secret list' },
    ],
  },
  {
    numero: 5,
    nombre: 'Despliegue inicial',
    descripcion: 'Primer commit, push y deploy.',
    comandos: [
      { etiqueta: 'Commit y push', codigo: 'git add .\ngit commit -m "Initial deploy: Programación Didáctica 2026/2027 (versión depurada)"\ngit push origin main' },
      { etiqueta: 'Deploy manual', codigo: 'vercel deploy --prod' },
      { etiqueta: 'Verificar', codigo: 'vercel ls' },
    ],
  },
  {
    numero: 6,
    nombre: 'Verificación final',
    descripcion: 'Comprueba que la URL responde correctamente.',
    comandos: [
      { etiqueta: 'Test URL', codigo: 'curl -I https://<proyecto>.vercel.app' },
      { etiqueta: 'Revisar logs', codigo: 'vercel logs --environment production --level error --since 5m' },
    ],
  },
];

export default function DeployGuide({ documentLoaded }: Props) {
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [completedPhases, setCompletedPhases] = useState<Set<number>>(new Set());

  const togglePhase = (index: number) => {
    setExpandedPhase(expandedPhase === index ? null : index);
  };

  const markComplete = (index: number) => {
    setCompletedPhases(prev => new Set([...prev, index + 1]));
  };

  const progress = (completedPhases.size / phases.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-300">Progreso del despliegue</span>
          <span className="text-sm font-mono text-emerald-400">{completedPhases.size}/{phases.length} fases</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
      </div>

      {/* Warning */}
      {!documentLoaded && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
          <i className="fas fa-exclamation-triangle text-amber-400 mt-0.5"></i>
          <div>
            <p className="text-sm font-medium text-amber-400">Documento no cargado</p>
            <p className="text-xs text-slate-400 mt-1">Antes de desplegar, carga el documento fuente en la pestaña "Documento" y genera los artefactos en "Artefactos".</p>
          </div>
        </div>
      )}

      {/* Phases */}
      <div className="space-y-3">
        {phases.map((phase, index) => (
          <div
            key={index}
            className={`bg-slate-800/60 border rounded-xl overflow-hidden transition-all ${
              completedPhases.has(phase.numero)
                ? 'border-emerald-500/30'
                : 'border-slate-700/50'
            }`}
          >
            <button
              onClick={() => togglePhase(index)}
              className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-slate-700/20 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                completedPhases.has(phase.numero)
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-slate-700 text-slate-400'
              }`}>
                {completedPhases.has(phase.numero) ? <i className="fas fa-check"></i> : phase.numero}
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-medium text-white">{phase.nombre}</span>
                <p className="text-xs text-slate-400 mt-0.5">{phase.descripcion}</p>
              </div>
              <i className={`fas fa-chevron-down text-slate-500 text-xs transition-transform ${expandedPhase === index ? 'rotate-180' : ''}`}></i>
            </button>

            {expandedPhase === index && (
              <div className="px-5 pb-5 border-t border-slate-700/30 pt-4 space-y-4">
                {phase.comandos.map((cmd, cmdIndex) => (
                  <div key={cmdIndex} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-terminal text-emerald-400 text-xs"></i>
                      <span className="text-sm font-medium text-slate-200">{cmd.etiqueta}</span>
                    </div>
                    <CodeBlock code={cmd.codigo} />
                    {cmd.nota && (
                      <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-700/30 rounded-lg px-3 py-2">
                        <i className="fas fa-info-circle text-blue-400 mt-0.5 shrink-0"></i>
                        <span>{cmd.nota}</span>
                      </div>
                    )}
                  </div>
                ))}

                {!completedPhases.has(phase.numero) && (
                  <button
                    onClick={() => markComplete(index)}
                    className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/30 transition-colors border border-emerald-500/20"
                  >
                    <i className="fas fa-check mr-2"></i>Marcar fase como completada
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Error Handling */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-exclamation-triangle text-red-400"></i>
          Manejo de errores
        </h3>
        <div className="space-y-3">
          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-3">
            <p className="text-sm font-medium text-red-400">Repo duplicado</p>
            <p className="text-xs text-slate-400 mt-1">Usa <code className="bg-red-500/10 px-1 rounded">git remote add origin</code> si el repo ya existe.</p>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-3">
            <p className="text-sm font-medium text-amber-400">vercel link falla</p>
            <p className="text-xs text-slate-400 mt-1">Ejecuta <code className="bg-amber-500/10 px-1 rounded">vercel login</code> de nuevo.</p>
          </div>
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-3">
            <p className="text-sm font-medium text-blue-400">Workflow falla</p>
            <p className="text-xs text-slate-400 mt-1">Verifica que los secretos estén configurados correctamente.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
