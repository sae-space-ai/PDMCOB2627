import { useState } from 'react';
import CodeBlock from './CodeBlock';

interface Step {
  phase: string;
  phaseNumber: number;
  title: string;
  description: string;
  commands: { label: string; code: string; note?: string }[];
  status: 'pending' | 'active' | 'done';
}

const initialSteps: Step[] = [
  {
    phase: 'FASE 1',
    phaseNumber: 1,
    title: 'Verificación de Entorno',
    description: 'Comprueba que todas las herramientas necesarias están instaladas y autenticadas.',
    commands: [
      { label: 'Verificar versiones', code: 'git --version\ngh --version\nvercel --version\nnode --version' },
      { label: 'Estado de GitHub CLI', code: 'gh auth status', note: 'Si no estás autenticado: gh auth login' },
      { label: 'Login en Vercel', code: 'vercel login', note: 'Si no estás autenticado, detente y ejecuta este comando.' },
    ],
    status: 'pending',
  },
  {
    phase: 'FASE 2',
    phaseNumber: 2,
    title: 'Creación del Repositorio',
    description: 'Inicializa el repositorio local, copia los archivos y crea el repo en GitHub.',
    commands: [
      { label: 'Crear directorio e inicializar Git', code: 'mkdir programacion-didactica-2026-2027\ncd programacion-didactica-2026-2027\ngit init\ngit branch -M main' },
      { label: 'Copiar archivo HTML como index.html', code: 'cp Programacion_Didactica_2026_2027_MusicaCamara_Orquesta_Banda.html index.html' },
      { label: 'Crear repositorio remoto y push', code: 'gh repo create programacion-didactica-2026-2027 --public --source=. --remote=origin --push', note: 'Si el repo ya existe: git remote add origin https://github.com/<USUARIO>/programacion-didactica-2026-2027.git && git push -u origin main' },
    ],
    status: 'pending',
  },
  {
    phase: 'FASE 3',
    phaseNumber: 3,
    title: 'Vinculación con Vercel',
    description: 'Vincula el proyecto local con Vercel para habilitar el despliegue.',
    commands: [
      { label: 'Vincular proyecto', code: 'vercel link --yes', note: 'Esto crea el proyecto en Vercel si no existe.' },
      { label: 'Verificar vinculación', code: 'cat .vercel/project.json', note: 'Anota projectId y orgId para los secretos.' },
    ],
    status: 'pending',
  },
  {
    phase: 'FASE 4',
    phaseNumber: 4,
    title: 'Configuración CI/CD (GitHub Actions)',
    description: 'Crea el workflow de GitHub Actions para despliegue automático.',
    commands: [
      { label: 'Crear directorio de workflows', code: 'mkdir -p .github/workflows' },
      { label: 'Crear archivo deploy.yml', code: '# Ver pestaña "Archivos" para el contenido completo de deploy.yml', note: 'Copia el archivo .github/workflows/deploy.yml desde la pestaña de Archivos.' },
    ],
    status: 'pending',
  },
  {
    phase: 'FASE 5',
    phaseNumber: 5,
    title: 'Configuración de Secretos',
    description: 'Añade los tokens y IDs necesarios como secretos en el repositorio de GitHub.',
    commands: [
      { label: 'Crear token de Vercel', code: 'vercel tokens create programacion-didactica-deploy', note: 'O usa un token existente desde https://vercel.com/account/tokens' },
      { label: 'Añadir secretos al repositorio', code: 'gh secret set VERCEL_TOKEN --body "<TU_TOKEN_VERCEL>"\ngh secret set VERCEL_ORG_ID --body "<ORG_ID>"\ngh secret set VERCEL_PROJECT_ID --body "<PROJECT_ID>"', note: '⚠️ Sustituye los valores por los reales. Los IDs están en .vercel/project.json' },
      { label: 'Verificar secretos', code: 'gh secret list' },
    ],
    status: 'pending',
  },
  {
    phase: 'FASE 6',
    phaseNumber: 6,
    title: 'Despliegue Inicial',
    description: 'Realiza el primer commit, push y despliegue de verificación.',
    commands: [
      { label: 'Commit y push inicial', code: 'git add .\ngit commit -m "Initial deploy: Programación Didáctica 2026/2027"\ngit push origin main' },
      { label: 'Despliegue manual de verificación', code: 'vercel deploy --prod' },
      { label: 'Verificar despliegue', code: 'vercel ls\nvercel inspect <deployment-url>' },
    ],
    status: 'pending',
  },
  {
    phase: 'FASE 7',
    phaseNumber: 7,
    title: 'Verificación Final',
    description: 'Comprueba que la URL de producción responde correctamente.',
    commands: [
      { label: 'Verificar URL de producción', code: 'curl -I https://<proyecto>.vercel.app' },
      { label: 'Revisar logs de producción', code: 'vercel logs --environment production --level error --since 5m' },
    ],
    status: 'pending',
  },
];

export default function DeployGuide() {
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  const toggleStep = (index: number) => {
    setExpandedStep(expandedStep === index ? null : index);
  };

  const markDone = (index: number) => {
    setSteps(prev => prev.map((step, i) => 
      i === index ? { ...step, status: 'done' as const } : step
    ));
  };

  const markActive = (index: number) => {
    setSteps(prev => prev.map((step, i) => 
      i === index ? { ...step, status: 'active' as const } : step
    ));
  };

  const completedCount = steps.filter(s => s.status === 'done').length;
  const progress = (completedCount / steps.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-300">Progreso del despliegue</span>
          <span className="text-sm font-mono text-emerald-400">{completedCount}/{steps.length} fases completadas</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`bg-slate-800/60 backdrop-blur-sm border rounded-xl overflow-hidden transition-all ${
              step.status === 'done' 
                ? 'border-emerald-500/30' 
                : step.status === 'active'
                ? 'border-amber-500/30'
                : 'border-slate-700/50'
            }`}
          >
            {/* Step Header */}
            <button
              onClick={() => toggleStep(index)}
              className="w-full px-5 py-4 flex items-center gap-4 text-left hover:bg-slate-700/20 transition-colors"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm shrink-0 ${
                step.status === 'done'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : step.status === 'active'
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-slate-700 text-slate-400'
              }`}>
                {step.status === 'done' ? (
                  <i className="fas fa-check"></i>
                ) : (
                  step.phaseNumber
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-500">{step.phase}</span>
                  <span className="font-medium text-white">{step.title}</span>
                </div>
                <p className="text-sm text-slate-400 mt-0.5 truncate">{step.description}</p>
              </div>
              <i className={`fas fa-chevron-down text-slate-500 transition-transform ${expandedStep === index ? 'rotate-180' : ''}`}></i>
            </button>

            {/* Step Content */}
            {expandedStep === index && (
              <div className="px-5 pb-5 border-t border-slate-700/50 pt-4 space-y-4">
                <p className="text-slate-300 text-sm">{step.description}</p>
                
                {step.commands.map((cmd, cmdIndex) => (
                  <div key={cmdIndex} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <i className="fas fa-terminal text-emerald-400 text-xs"></i>
                      <span className="text-sm font-medium text-slate-200">{cmd.label}</span>
                    </div>
                    <CodeBlock code={cmd.code} />
                    {cmd.note && (
                      <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-700/30 rounded-lg px-3 py-2">
                        <i className="fas fa-info-circle text-blue-400 mt-0.5 shrink-0"></i>
                        <span>{cmd.note}</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Status Controls */}
                <div className="flex gap-2 pt-3 border-t border-slate-700/30">
                  {step.status !== 'done' && (
                    <button
                      onClick={() => markDone(index)}
                      className="px-4 py-2 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-500/30 transition-colors"
                    >
                      <i className="fas fa-check mr-2"></i>Marcar como completado
                    </button>
                  )}
                  {step.status === 'done' && (
                    <button
                      onClick={() => markActive(index)}
                      className="px-4 py-2 bg-amber-500/20 text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-500/30 transition-colors"
                    >
                      <i className="fas fa-undo mr-2"></i>Reabrir
                    </button>
                  )}
                  {step.status === 'pending' && (
                    <button
                      onClick={() => markActive(index)}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors"
                    >
                      <i className="fas fa-play mr-2"></i>En progreso
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
