import { useState } from 'react';

interface Props {
  className?: string;
}

export default function SecretConfigurator({ className = '' }: Props) {
  const [secrets, setSecrets] = useState({
    VERCEL_TOKEN: '',
    VERCEL_ORG_ID: '',
    VERCEL_PROJECT_ID: '',
  });
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [showToken, setShowToken] = useState(false);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const allFilled = Object.values(secrets).every(v => v.trim() !== '');

  const commands = [
    {
      name: 'VERCEL_TOKEN',
      label: 'Token de Vercel',
      value: secrets.VERCEL_TOKEN,
      description: 'Token de API de Vercel para despliegue',
      whereToGet: 'https://vercel.com/account/tokens',
      command: `gh secret set VERCEL_TOKEN --body "${secrets.VERCEL_TOKEN || '<TU_TOKEN>'}"`,
      icon: 'fa-key',
      color: 'purple',
    },
    {
      name: 'VERCEL_ORG_ID',
      label: 'Organization ID',
      value: secrets.VERCEL_ORG_ID,
      description: 'ID de tu organización en Vercel',
      whereToGet: 'Archivo .vercel/project.json → campo "orgId"',
      command: `gh secret set VERCEL_ORG_ID --body "${secrets.VERCEL_ORG_ID || '<ORG_ID>'}"`,
      icon: 'fa-building',
      color: 'blue',
    },
    {
      name: 'VERCEL_PROJECT_ID',
      label: 'Project ID',
      value: secrets.VERCEL_PROJECT_ID,
      description: 'ID del proyecto en Vercel',
      whereToGet: 'Archivo .vercel/project.json → campo "projectId"',
      command: `gh secret set VERCEL_PROJECT_ID --body "${secrets.VERCEL_PROJECT_ID || '<PROJECT_ID>'}"`,
      icon: 'fa-cube',
      color: 'teal',
    },
  ];

  const colorClasses: Record<string, { bg: string; text: string; border: string; bgLight: string }> = {
    purple: { bg: 'bg-purple-500', text: 'text-purple-400', border: 'border-purple-500/30', bgLight: 'bg-purple-500/10' },
    blue: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500/30', bgLight: 'bg-blue-500/10' },
    teal: { bg: 'bg-teal-500', text: 'text-teal-400', border: 'border-teal-500/30', bgLight: 'bg-teal-500/10' },
  };

  const copyAllCommands = () => {
    const allCommands = commands.map(c => c.command).join('\n');
    handleCopy(allCommands, 'all');
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-amber-500/20 rounded-lg flex items-center justify-center shrink-0">
            <i className="fas fa-key text-amber-400"></i>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Configuración de Secretos</h3>
            <p className="text-sm text-slate-400 mt-1">
              Introduce tus valores reales y copia los comandos generados automáticamente a tu terminal.
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 flex items-center gap-3">
          <div className={`flex-1 h-2 rounded-full bg-slate-700 overflow-hidden`}>
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
              style={{ width: `${(Object.values(secrets).filter(v => v.trim()).length / 3) * 100}%` }}
            ></div>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {Object.values(secrets).filter(v => v.trim()).length}/3
          </span>
        </div>
      </div>

      {/* Secret Fields */}
      {commands.map((secret) => {
        const colors = colorClasses[secret.color];
        const isFilled = secret.value.trim() !== '';
        return (
          <div key={secret.name} className={`bg-slate-800/60 border ${isFilled ? colors.border : 'border-slate-700/50'} rounded-xl overflow-hidden`}>
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 ${colors.bgLight} rounded-lg flex items-center justify-center`}>
                  <i className={`fas ${secret.icon} ${colors.text} text-sm`}></i>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-white">{secret.label}</h4>
                    <code className="text-xs font-mono text-slate-500">{secret.name}</code>
                    {isFilled && (
                      <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold">
                        ✓ LISTO
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{secret.description}</p>
                </div>
              </div>

              {/* Input */}
              <div className="relative mb-3">
                <input
                  type={secret.name === 'VERCEL_TOKEN' && !showToken ? 'password' : 'text'}
                  value={secret.value}
                  onChange={(e) => setSecrets(prev => ({ ...prev, [secret.name]: e.target.value }))}
                  placeholder={`Introduce tu ${secret.label}...`}
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white text-sm font-mono placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/25 transition-all pr-10"
                />
                {secret.name === 'VERCEL_TOKEN' && (
                  <button
                    onClick={() => setShowToken(!showToken)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                    title={showToken ? 'Ocultar' : 'Mostrar'}
                  >
                    <i className={`fas ${showToken ? 'fa-eye-slash' : 'fa-eye'} text-sm`}></i>
                  </button>
                )}
              </div>

              {/* Where to get */}
              <div className="flex items-start gap-2 text-xs text-slate-400 bg-slate-700/30 rounded-lg px-3 py-2 mb-4">
                <i className="fas fa-info-circle text-blue-400 mt-0.5 shrink-0"></i>
                <span>
                  Dónde obtenerlo: <span className="text-slate-300">{secret.whereToGet}</span>
                </span>
              </div>

              {/* Generated Command */}
              <div className="bg-slate-900/80 border border-slate-700/50 rounded-lg overflow-hidden">
                <div className="flex items-center justify-between px-3 py-2 bg-slate-800/50 border-b border-slate-700/50">
                  <span className="text-[10px] font-mono text-slate-500 uppercase">Comando generado</span>
                  <button
                    onClick={() => handleCopy(secret.command, secret.name)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium transition-all ${
                      copiedField === secret.name
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-700/50 text-slate-400 hover:text-white hover:bg-slate-600/50'
                    }`}
                  >
                    {copiedField === secret.name ? (
                      <><i className="fas fa-check text-[10px]"></i><span>Copiado</span></>
                    ) : (
                      <><i className="fas fa-copy text-[10px]"></i><span>Copiar</span></>
                    )}
                  </button>
                </div>
                <pre className="p-3 text-xs font-mono overflow-x-auto">
                  <code className={isFilled ? 'text-emerald-300' : 'text-slate-500'}>
                    {secret.command}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        );
      })}

      {/* Copy All */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium text-white">Copiar todos los comandos</h4>
            <p className="text-xs text-slate-500 mt-1">
              {allFilled
                ? '✅ Todos los secretos configurados — comandos listos para ejecutar'
                : '⚠️ Completa todos los campos para generar los comandos finales'}
            </p>
          </div>
          <button
            onClick={copyAllCommands}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              allFilled
                ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-700/50 text-slate-400 hover:text-white'
            }`}
          >
            <i className={`fas ${copiedField === 'all' ? 'fa-check' : 'fa-copy'} mr-2`}></i>
            {copiedField === 'all' ? '¡Copiado!' : 'Copiar todo'}
          </button>
        </div>

        {/* All Commands Preview */}
        {allFilled && (
          <div className="mt-4 bg-slate-900/80 border border-slate-700/50 rounded-lg p-3">
            <pre className="text-xs font-mono text-emerald-300 whitespace-pre-wrap">
              {commands.map(c => c.command).join('\n')}
            </pre>
          </div>
        )}
      </div>

      {/* Verification */}
      {allFilled && (
        <div className="bg-emerald-500/5 border border-emerald-500/30 rounded-xl p-5">
          <h4 className="text-sm font-semibold text-emerald-400 flex items-center gap-2 mb-3">
            <i className="fas fa-check-circle"></i>
            Verificación
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            Después de ejecutar los comandos, verifica que los secretos están configurados:
          </p>
          <div className="bg-slate-900/80 border border-slate-700/50 rounded-lg p-3 flex items-center justify-between">
            <code className="text-xs font-mono text-emerald-300">gh secret list</code>
            <button
              onClick={() => handleCopy('gh secret list', 'verify')}
              className={`px-2 py-1 rounded text-xs transition-all ${
                copiedField === 'verify'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : 'bg-slate-700/50 text-slate-400 hover:text-white'
              }`}
            >
              {copiedField === 'verify' ? '✓' : '📋'}
            </button>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Deberías ver: VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID
          </p>
        </div>
      )}

      {/* Security Warning */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
        <i className="fas fa-shield-alt text-red-400 mt-0.5 shrink-0"></i>
        <div>
          <p className="text-sm font-medium text-red-400">Seguridad</p>
          <ul className="text-xs text-slate-400 mt-1 space-y-1">
            <li>• Los valores se almacenan solo en tu navegador (localStorage NO se usa)</li>
            <li>• No se envían a ningún servidor externo</li>
            <li>• Los tokens nunca se versionan en Git</li>
            <li>• Al recargar la página, los valores se pierden</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
