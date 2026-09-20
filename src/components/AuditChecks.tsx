import { useState } from 'react';
import type { AuditCheck } from '../types';

interface Props {
  auditChecks: AuditCheck[];
  setAuditChecks: (checks: AuditCheck[]) => void;
}

const defaultChecks: AuditCheck[] = [
  { id: 1, titulo: 'Requisitos legales acreditados', descripcion: '¿Existe algún requisito legal no acreditado? Si sí: HOLD.', categoria: 'normativa', estado: 'pendiente', notas: '' },
  { id: 2, titulo: 'Porcentajes de calificación verificados', descripcion: '¿Existe algún porcentaje de calificación no verificado? Si sí: HOLD.', categoria: 'normativa', estado: 'pendiente', notas: '' },
  { id: 3, titulo: 'Condiciones de asistencia verificadas', descripcion: '¿Existe alguna condición de asistencia no verificada? Si sí: HOLD.', categoria: 'normativa', estado: 'pendiente', notas: '' },
  { id: 4, titulo: 'Separación Cámara/Orquesta/Banda', descripcion: '¿Se ha mezclado Música de Cámara con Orquesta o Banda? Corregir.', categoria: 'estructural', estado: 'pendiente', notas: '' },
  { id: 5, titulo: 'Cámara solo en 4.º–6.º EP', descripcion: '¿Se ha introducido Música de Cámara en 1.º–3.º EP? Eliminar salvo acreditación.', categoria: 'estructural', estado: 'pendiente', notas: '' },
  { id: 6, titulo: 'Sin duplicidades', descripcion: '¿Se han duplicado objetivos y contenidos? Depurar.', categoria: 'contenido', estado: 'pendiente', notas: '' },
  { id: 7, titulo: 'Trazabilidad de objetivos', descripcion: '¿Cada objetivo tiene trazabilidad completa? Objetivo → contenido → actividad → evidencia → instrumento → criterio.', categoria: 'contenido', estado: 'pendiente', notas: '' },
  { id: 8, titulo: 'Norma vs. desarrollo propio', descripcion: '¿Se ha distinguido norma vigente de desarrollo propio? Corregir si no.', categoria: 'contenido', estado: 'pendiente', notas: '' },
  { id: 9, titulo: 'Sin datos inventados', descripcion: '¿Se ha inventado algún dato del centro, alumnado, horario, repertorio o calendario? Eliminar o marcar HOLD.', categoria: 'contenido', estado: 'pendiente', notas: '' },
  { id: 10, titulo: 'Documento coherente', descripcion: '¿La programación puede leerse como un documento único y coherente? Corregir rupturas.', categoria: 'estructural', estado: 'pendiente', notas: '' },
  { id: 11, titulo: 'HOLD registrados', descripcion: '¿Los HOLD están correctamente registrados en HOLD_REGISTRY.md? Completar.', categoria: 'despliegue', estado: 'pendiente', notas: '' },
  { id: 12, titulo: 'HTML = Markdown fuente', descripcion: '¿El HTML desplegado contiene exactamente el mismo contenido que el Markdown fuente ampliado? Verificar.', categoria: 'despliegue', estado: 'pendiente', notas: '' },
];

const categoriaColors: Record<string, { bg: string; text: string; icon: string }> = {
  'normativa': { bg: 'bg-red-500/10', text: 'text-red-400', icon: 'fa-gavel' },
  'estructural': { bg: 'bg-blue-500/10', text: 'text-blue-400', icon: 'fa-sitemap' },
  'contenido': { bg: 'bg-purple-500/10', text: 'text-purple-400', icon: 'fa-file-alt' },
  'despliegue': { bg: 'bg-teal-500/10', text: 'text-teal-400', icon: 'fa-rocket' },
};

export default function AuditChecks({ auditChecks, setAuditChecks }: Props) {
  const checks = auditChecks.length > 0 ? auditChecks : defaultChecks;

  const setEstado = (id: number, estado: AuditCheck['estado']) => {
    const updated = checks.map(c => c.id === id ? { ...c, estado } : c);
    setAuditChecks(updated);
  };

  const setNotas = (id: number, notas: string) => {
    const updated = checks.map(c => c.id === id ? { ...c, notas } : c);
    setAuditChecks(updated);
  };

  const superados = checks.filter(c => c.estado === 'superado').length;
  const fallos = checks.filter(c => c.estado === 'fallo').length;
  const holds = checks.filter(c => c.estado === 'hold').length;
  const porcentaje = Math.round((superados / checks.length) * 100);

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-medium text-slate-300">Progreso de auditoría</h3>
          <span className="text-sm font-mono text-emerald-400">{superados}/{checks.length} checks superados</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500"
            style={{ width: `${porcentaje}%` }}
          ></div>
        </div>
        <div className="flex gap-4 mt-3 text-xs">
          <span className="text-emerald-400"><i className="fas fa-check-circle mr-1"></i>{superados} superados</span>
          <span className="text-red-400"><i className="fas fa-times-circle mr-1"></i>{fallos} fallos</span>
          <span className="text-amber-400"><i className="fas fa-pause-circle mr-1"></i>{holds} en HOLD</span>
          <span className="text-slate-500"><i className="fas fa-clock mr-1"></i>{checks.length - superados - fallos - holds} pendientes</span>
        </div>
      </div>

      {/* Checks */}
      <div className="space-y-3">
        {checks.map((check) => {
          const catColors = categoriaColors[check.categoria];
          return (
            <div key={check.id} className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg ${catColors.bg} flex items-center justify-center shrink-0`}>
                    <span className={`text-sm font-bold ${catColors.text}`}>{check.id}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-medium text-white">{check.titulo}</h4>
                      <span className={`px-2 py-0.5 ${catColors.bg} ${catColors.text} rounded-full text-[10px] font-medium`}>
                        <i className={`fas ${catColors.icon} mr-1`}></i>
                        {check.categoria}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{check.descripcion}</p>

                    {/* Notes */}
                    <textarea
                      placeholder="Notas de auditoría..."
                      value={check.notas}
                      onChange={(e) => setNotas(check.id, e.target.value)}
                      className="w-full mt-2 px-3 py-2 bg-slate-900/50 border border-slate-600/30 rounded-lg text-xs text-slate-300 placeholder-slate-600 focus:outline-none focus:border-emerald-500/50 resize-none h-16"
                    />
                  </div>
                </div>

                {/* Status Buttons */}
                <div className="flex gap-2 mt-3 ml-11">
                  <button
                    onClick={() => setEstado(check.id, 'superado')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      check.estado === 'superado'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                    }`}
                  >
                    <i className="fas fa-check mr-1"></i>Superado
                  </button>
                  <button
                    onClick={() => setEstado(check.id, 'fallo')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      check.estado === 'fallo'
                        ? 'bg-red-500 text-white'
                        : 'bg-red-500/10 text-red-400 hover:bg-red-500/20'
                    }`}
                  >
                    <i className="fas fa-times mr-1"></i>Fallo
                  </button>
                  <button
                    onClick={() => setEstado(check.id, 'hold')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      check.estado === 'hold'
                        ? 'bg-amber-500 text-white'
                        : 'bg-amber-500/10 text-amber-400 hover:bg-amber-500/20'
                    }`}
                  >
                    <i className="fas fa-pause mr-1"></i>HOLD
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
