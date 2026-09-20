import { useState } from 'react';

export default function SummaryPanel() {
  const [userData, setUserData] = useState({
    githubUser: '',
    vercelProject: 'programacion-didactica-2026-2027',
    vercelDomain: '',
  });

  const [secretsConfigured, setSecretsConfigured] = useState({
    VERCEL_TOKEN: false,
    VERCEL_ORG_ID: false,
    VERCEL_PROJECT_ID: false,
  });

  const allSecrets = Object.values(secretsConfigured).every(Boolean);
  const hasUserData = userData.githubUser && userData.vercelDomain;

  const generateSummary = () => {
    const timestamp = new Date().toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });

    return `--- RESUMEN DE DESPLIEGUE ---
Repositorio: https://github.com/${userData.githubUser || '<USUARIO>'}/programacion-didactica-2026-2027
URL de producción: https://${userData.vercelDomain || '<proyecto>'}.vercel.app
Estado: ${allSecrets && hasUserData ? '✅ DESPLEGADO' : '⏳ PENDIENTE DE VERIFICACIÓN'}
Workflow CI/CD: ✅ ACTIVO (push a main → deploy automático)
Secretos configurados: ${Object.entries(secretsConfigured).filter(([,v]) => v).map(([k]) => k).join(', ') || 'NINGUNO'}
Archivo desplegado: index.html (Programación Didáctica 2026/2027)
Última verificación: ${timestamp}
--- FIN DEL RESUMEN ---`;
  };

  return (
    <div className="space-y-6">
      {/* Configuration Form */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-user-cog text-emerald-400"></i>
          Datos del despliegue
        </h3>
        <p className="text-sm text-slate-400 mb-6">
          Completa estos campos para generar el resumen personalizado de tu despliegue.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <i className="fab fa-github mr-2 text-slate-500"></i>
              Usuario de GitHub
            </label>
            <input
              type="text"
              value={userData.githubUser}
              onChange={(e) => setUserData(prev => ({ ...prev, githubUser: e.target.value }))}
              placeholder="tu-usuario"
              className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              <i className="fas fa-globe mr-2 text-slate-500"></i>
              Dominio Vercel
            </label>
            <div className="flex">
              <input
                type="text"
                value={userData.vercelDomain}
                onChange={(e) => setUserData(prev => ({ ...prev, vercelDomain: e.target.value }))}
                placeholder="programacion-didactica-2026-2027"
                className="flex-1 px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-l-lg text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all"
              />
              <span className="px-3 py-2.5 bg-slate-700/50 border border-l-0 border-slate-600/50 rounded-r-lg text-slate-400 text-sm">
                .vercel.app
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Secrets Checklist */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-key text-amber-400"></i>
          Secretos de GitHub
        </h3>
        <p className="text-sm text-slate-400 mb-4">
          Marca cada secreto cuando lo hayas configurado en el repositorio.
        </p>

        <div className="space-y-3">
          {Object.entries(secretsConfigured).map(([secret, configured]) => (
            <button
              key={secret}
              onClick={() => setSecretsConfigured(prev => ({ ...prev, [secret]: !configured }))}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border transition-all ${
                configured
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-slate-700/20 border-slate-600/30 text-slate-400 hover:border-slate-500/50'
              }`}
            >
              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                configured ? 'border-emerald-400 bg-emerald-500/20' : 'border-slate-500'
              }`}>
                {configured && <i className="fas fa-check text-[10px] text-emerald-400"></i>}
              </div>
              <span className="font-mono text-sm">{secret}</span>
              <span className="ml-auto text-xs">
                {configured ? '✅ Configurado' : '⬜ Pendiente'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Generated Summary */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
          <h3 className="text-sm font-medium text-white flex items-center gap-2">
            <i className="fas fa-clipboard-list text-emerald-400"></i>
            Resumen generado
          </h3>
          <button
            onClick={() => {
              navigator.clipboard.writeText(generateSummary());
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-700/50 text-slate-400 hover:text-white rounded-lg text-xs font-medium transition-colors"
          >
            <i className="fas fa-copy text-[10px]"></i>
            Copiar resumen
          </button>
        </div>
        <div className="p-5">
          <pre className="bg-slate-900/80 border border-slate-700/50 rounded-lg p-4 text-sm font-mono text-emerald-300 whitespace-pre-wrap overflow-x-auto">
            {generateSummary()}
          </pre>
        </div>
      </div>

      {/* Error Handling Reference */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-exclamation-triangle text-red-400"></i>
          Manejo de errores
        </h3>

        <div className="space-y-3">
          <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-4">
            <p className="text-sm font-medium text-red-400 mb-1">Repositorio duplicado</p>
            <p className="text-xs text-slate-400">Si <code className="text-red-300 bg-red-500/10 px-1 rounded">gh repo create</code> falla por nombre duplicado, usa un nombre alternativo o añade el remote manualmente.</p>
          </div>
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-lg p-4">
            <p className="text-sm font-medium text-amber-400 mb-1">vercel link falla</p>
            <p className="text-xs text-slate-400">Ejecuta <code className="text-amber-300 bg-amber-500/10 px-1 rounded">vercel login</code> de nuevo y reintenta el link.</p>
          </div>
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-lg p-4">
            <p className="text-sm font-medium text-blue-400 mb-1">Workflow falla</p>
            <p className="text-xs text-slate-400">Revisa que los secretos estén correctamente configurados y que el token de Vercel tenga permisos de deploy.</p>
          </div>
          <div className="bg-purple-500/5 border border-purple-500/20 rounded-lg p-4">
            <p className="text-sm font-medium text-purple-400 mb-1">Despliegue no aparece</p>
            <p className="text-xs text-slate-400">Ejecuta <code className="text-purple-300 bg-purple-500/10 px-1 rounded">vercel deploy --prod</code> manualmente y verifica el dominio en el dashboard.</p>
          </div>
        </div>
      </div>

      {/* Restrictions */}
      <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <i className="fas fa-shield-alt text-slate-400"></i>
          Restricciones de seguridad
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm text-slate-400">
            <i className="fas fa-times-circle text-red-400 mt-0.5 shrink-0"></i>
            <span>No expongas tokens en logs ni en archivos versionados.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-slate-400">
            <i className="fas fa-times-circle text-red-400 mt-0.5 shrink-0"></i>
            <span>No modifiques el contenido del archivo index.html durante el despliegue.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-slate-400">
            <i className="fas fa-times-circle text-red-400 mt-0.5 shrink-0"></i>
            <span>No elimines el repositorio ni el proyecto de Vercel sin confirmación explícita.</span>
          </li>
          <li className="flex items-start gap-2 text-sm text-slate-400">
            <i className="fas fa-exclamation-circle text-amber-400 mt-0.5 shrink-0"></i>
            <span>Si el usuario no proporciona un token de Vercel, detente y solicítalo.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
