import { useState } from 'react';
import type { HoldItem } from '../types';

interface Props {
  holdItems: HoldItem[];
  setHoldItems: (items: HoldItem[]) => void;
}

const defaultHoldItems = [
  {
    id: 'hold-001',
    bloque: 'Bloque I',
    elemento: 'Normativa específica de enseñanzas profesionales de música en Extremadura',
    motivo: 'No se ha proporcionado el decreto u orden vigente que regula el currículo',
    fuenteNecesaria: 'Decreto u Orden de la Consejería de Educación de la Junta de Extremadura',
    responsable: 'Dirección del centro / Inspección educativa',
    estado: 'abierto' as const,
  },
  {
    id: 'hold-002',
    bloque: 'Bloque II',
    elemento: 'Datos del centro educativo (nombre, código, ubicación)',
    motivo: 'No se han proporcionado datos institucionales del centro',
    fuenteNecesaria: 'Documento institucional del centro o PGA',
    responsable: 'Equipo directivo',
    estado: 'abierto',
  },
  {
    id: 'hold-003',
    bloque: 'Bloque III',
    elemento: 'Horas lectivas y distribución semanal por materia',
    motivo: 'No se ha acreditado la carga horaria oficial',
    fuenteNecesaria: 'Horario oficial del centro validado por la administración',
    responsable: 'Jefatura de estudios',
    estado: 'abierto',
  },
  {
    id: 'hold-004',
    bloque: 'Bloque V',
    elemento: 'Porcentajes de calificación por criterios de evaluación',
    motivo: 'No se han proporcionado los criterios de ponderación oficiales',
    fuenteNecesaria: 'Normativa de evaluación vigente o acuerdo del claustro',
    responsable: 'Departamento didáctico / Claustro',
    estado: 'abierto',
  },
  {
    id: 'hold-005',
    bloque: 'Bloque VIII',
    elemento: 'Repertorio definitivo para Banda del curso 2026/2027',
    motivo: 'El repertorio depende de disponibilidad de partituras y plantilla',
    fuenteNecesaria: 'Acuerdo del departamento y disponibilidad real',
    responsable: 'Director/a de Banda',
    estado: 'abierto',
  },
  {
    id: 'hold-006',
    bloque: 'Bloque IX',
    elemento: 'Repertorio definitivo para Orquesta del curso 2026/2027',
    motivo: 'El repertorio depende de plantilla instrumental disponible',
    fuenteNecesaria: 'Acuerdo del departamento y disponibilidad real',
    responsable: 'Director/a de Orquesta',
    estado: 'abierto',
  },
  {
    id: 'hold-007',
    bloque: 'Bloque XII',
    elemento: 'Porcentaje mínimo de asistencia para evaluación continua',
    motivo: 'No se ha acreditado el umbral oficial aplicable',
    fuenteNecesaria: 'Normativa de evaluación o regulación del centro',
    responsable: 'Jefatura de estudios',
    estado: 'abierto',
  },
  {
    id: 'hold-008',
    bloque: 'Bloque XV',
    elemento: 'Fechas de audiciones y conciertos programados',
    motivo: 'No se han confirmado fechas ni eventos del curso 2026/2027',
    fuenteNecesaria: 'Calendario oficial del centro / PGA',
    responsable: 'Equipo directivo / Departamento',
    estado: 'abierto',
  },
  {
    id: 'hold-009',
    bloque: 'Bloque XVIII',
    elemento: 'Requisitos de pruebas extraordinarias',
    motivo: 'No se ha verificado la normativa específica de evaluación extraordinaria',
    fuenteNecesaria: 'Normativa de evaluación vigente',
    responsable: 'Inspección educativa',
    estado: 'abierto',
  },
  {
    id: 'hold-010',
    bloque: 'Bloque XX',
    elemento: 'Cursos exactos de Orquesta y Banda en el currículo',
    motivo: 'Necesario verificar en el decreto curricular aplicable',
    fuenteNecesaria: 'Decreto de currículo de enseñanzas profesionales',
    responsable: 'Departamento didáctico',
    estado: 'abierto',
  },
];

export default function HoldRegistry({ holdItems, setHoldItems }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState<Partial<HoldItem>>({
    bloque: '',
    elemento: '',
    motivo: '',
    fuenteNecesaria: '',
    responsable: '',
    estado: 'abierto',
  });

  const items: HoldItem[] = holdItems.length > 0 ? holdItems : (defaultHoldItems as HoldItem[]);

  const toggleEstado = (id: string) => {
    const updated: HoldItem[] = items.map(item => {
      if (item.id === id) {
        const nextEstado: HoldItem['estado'] = item.estado === 'abierto' ? 'en-verificacion' : item.estado === 'en-verificacion' ? 'cerrado' : 'abierto';
        return { ...item, estado: nextEstado };
      }
      return item;
    });
    setHoldItems(updated);
  };

  const addItem = () => {
    if (!newItem.elemento || !newItem.bloque) return;
    const item: HoldItem = {
      id: `hold-${Date.now()}`,
      bloque: newItem.bloque || '',
      elemento: newItem.elemento || '',
      motivo: newItem.motivo || '',
      fuenteNecesaria: newItem.fuenteNecesaria || '',
      responsable: newItem.responsable || '',
      estado: 'abierto' as const,
    };
    setHoldItems([...items, item]);
    setNewItem({ bloque: '', elemento: '', motivo: '', fuenteNecesaria: '', responsable: '', estado: 'abierto' as const });
    setShowAddForm(false);
  };

  const estadoColors = {
    'abierto': { bg: 'bg-amber-500/15', text: 'text-amber-400', border: 'border-amber-500/30', label: 'ABIERTO' },
    'en-verificacion': { bg: 'bg-blue-500/15', text: 'text-blue-400', border: 'border-blue-500/30', label: 'EN VERIFICACIÓN' },
    'cerrado': { bg: 'bg-emerald-500/15', text: 'text-emerald-400', border: 'border-emerald-500/30', label: 'CERRADO' },
  };

  const abiertoCount = items.filter(i => i.estado === 'abierto').length;
  const verificacionCount = items.filter(i => i.estado === 'en-verificacion').length;
  const cerradoCount = items.filter(i => i.estado === 'cerrado').length;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-amber-400">{abiertoCount}</div>
          <div className="text-xs text-slate-400 mt-1">Abiertos</div>
        </div>
        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-blue-400">{verificacionCount}</div>
          <div className="text-xs text-slate-400 mt-1">En verificación</div>
        </div>
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 text-center">
          <div className="text-3xl font-bold text-emerald-400">{cerradoCount}</div>
          <div className="text-xs text-slate-400 mt-1">Cerrados</div>
        </div>
      </div>

      {/* Add Button */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="px-5 py-2.5 bg-amber-500/20 text-amber-400 rounded-lg text-sm font-medium hover:bg-amber-500/30 transition-colors border border-amber-500/20"
      >
        <i className="fas fa-plus mr-2"></i>
        {showAddForm ? 'Cancelar' : 'Añadir elemento HOLD'}
      </button>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-slate-800/60 border border-amber-500/30 rounded-xl p-5 space-y-3">
          <h4 className="text-sm font-medium text-amber-400">Nuevo elemento HOLD</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Bloque (ej: Bloque IV)"
              value={newItem.bloque}
              onChange={(e) => setNewItem(prev => ({ ...prev, bloque: e.target.value }))}
              className="px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
            <input
              type="text"
              placeholder="Elemento a verificar"
              value={newItem.elemento}
              onChange={(e) => setNewItem(prev => ({ ...prev, elemento: e.target.value }))}
              className="px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
            <input
              type="text"
              placeholder="Motivo del HOLD"
              value={newItem.motivo}
              onChange={(e) => setNewItem(prev => ({ ...prev, motivo: e.target.value }))}
              className="px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
            <input
              type="text"
              placeholder="Fuente necesaria para cerrarlo"
              value={newItem.fuenteNecesaria}
              onChange={(e) => setNewItem(prev => ({ ...prev, fuenteNecesaria: e.target.value }))}
              className="px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50"
            />
            <input
              type="text"
              placeholder="Responsable de verificación"
              value={newItem.responsable}
              onChange={(e) => setNewItem(prev => ({ ...prev, responsable: e.target.value }))}
              className="px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500/50 md:col-span-2"
            />
          </div>
          <button
            onClick={addItem}
            className="px-4 py-2 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition-colors"
          >
            <i className="fas fa-save mr-2"></i>Guardar HOLD
          </button>
        </div>
      )}

      {/* Hold Items */}
      <div className="space-y-3">
        {items.map((item) => {
          const colors = estadoColors[item.estado];
          return (
            <div key={item.id} className={`bg-slate-800/60 border ${colors.border} rounded-xl overflow-hidden`}>
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-slate-700/50 rounded text-xs font-mono text-slate-400">
                        {item.bloque}
                      </span>
                      <span className={`px-2 py-0.5 ${colors.bg} ${colors.text} rounded-full text-[10px] font-bold`}>
                        {colors.label}
                      </span>
                    </div>
                    <h4 className="text-sm font-medium text-white">{item.elemento}</h4>
                  </div>
                  <button
                    onClick={() => toggleEstado(item.id)}
                    className="shrink-0 px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-lg text-xs hover:bg-slate-600/50 hover:text-white transition-colors"
                  >
                    <i className="fas fa-sync-alt mr-1"></i>Cambiar estado
                  </button>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div className="bg-slate-900/30 rounded-lg p-2">
                    <span className="text-slate-500">Motivo:</span>
                    <p className="text-slate-300 mt-0.5">{item.motivo}</p>
                  </div>
                  <div className="bg-slate-900/30 rounded-lg p-2">
                    <span className="text-slate-500">Fuente necesaria:</span>
                    <p className="text-slate-300 mt-0.5">{item.fuenteNecesaria}</p>
                  </div>
                  <div className="bg-slate-900/30 rounded-lg p-2">
                    <span className="text-slate-500">Responsable:</span>
                    <p className="text-slate-300 mt-0.5">{item.responsable}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
