import { useState } from 'react';
import CodeBlock from './CodeBlock';

interface Props {
  documentLoaded: boolean;
}

interface Artifact {
  nombre: string;
  ruta: string;
  descripcion: string;
  contenido: string;
  lenguaje: string;
  icono: string;
}

const artifacts: Artifact[] = [
  {
    nombre: 'index.html',
    ruta: 'deploy/index.html',
    descripcion: 'Documento HTML de visión continua autocontenido — Portada institucional, índice navegable, bloques I-XXI, etiquetas HOLD, CSS de impresión',
    lenguaje: 'html',
    icono: 'fas fa-file-code',
    contenido: `<!-- ARCHIVO: deploy/index.html -->
<!-- Este es el documento HTML completo de la Programación Didáctica -->
<!-- Incluye: portada institucional, índice navegable, 21 bloques, -->
<!-- etiquetas HOLD, tablas de trazabilidad, rúbricas, CSS de impresión -->
<!-- y botón de descarga del propio HTML -->

<!-- El archivo completo está en: deploy/index.html -->
<!-- Tamaño: ~45KB autocontenido (CSS + JS embebidos, sin dependencias) -->

<!-- Para verlo completo, abre el archivo deploy/index.html en tu navegador -->`
  },
  {
    nombre: 'vercel.json',
    ruta: 'deploy/vercel.json',
    descripcion: 'Configuración de Vercel para despliegue estático',
    lenguaje: 'json',
    icono: 'fas fa-cog',
    contenido: `{
  "version": 2,
  "name": "programacion-didactica-2026-2027",
  "builds": [
    { "src": "index.html", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}`
  },
  {
    nombre: 'README.md',
    ruta: 'deploy/README.md',
    descripcion: 'Documentación del repositorio con estructura de bloques y estado de HOLD',
    lenguaje: 'markdown',
    icono: 'fas fa-book',
    contenido: `# Programación Didáctica 2026/2027

## Música de Cámara · Orquesta · Banda

**Enseñanzas Profesionales de Música — Extremadura**  
**Conservatorio Oficial de Música "Tomás Bote Lavado" de Almendralejo**

---

## Descripción

Documento HTML de visión continua correspondiente a la Programación Didáctica del curso 2026/2027 para las asignaturas de Música de Cámara, Orquesta y Banda de las Enseñanzas Profesionales de Música en Extremadura.

## Estructura del documento

| Bloque | Contenido |
|--------|-----------|
| I | Marco normativo |
| II | Contexto institucional |
| III | Competencias clave y perfil de salida |
| IV | Objetivos generales |
| V | Contenidos |
| VI | Criterios de evaluación |
| VII | Metodología |
| VIII | Repertorio — Banda |
| IX | Repertorio — Orquesta |
| X | Repertorio — Música de Cámara |
| XI | Secuenciación por cursos — Cámara |
| XII | Niveles funcionales — Orquesta y Banda |
| XIII | Unidades didácticas — Cámara |
| XIV | Unidades didácticas — Orquesta |
| XV | Unidades didácticas — Banda |
| XVI | Evaluación |
| XVII | Instrumentos de evaluación |
| XVIII | Pruebas extraordinarias |
| XIX | Actividades complementarias |
| XX | Recursos y bibliografía |
| XXI | Anexos I–X |

## Estado de HOLD

Consultar [HOLD_REGISTRY.md](./HOLD_REGISTRY.md) para la lista actualizada de elementos pendientes de verificación.

### Elementos en HOLD

- ⏳ Ponderaciones de calificación
- ⏳ Porcentaje mínimo de asistencia
- ⏳ Requisitos de pruebas extraordinarias
- ⏳ Repertorio definitivo
- ⏳ Calendario de conciertos
- ⏳ Número de sesiones

## Despliegue

Automático en Vercel al hacer push a \`main\`.

## Principio de veracidad normativa

Este documento respeta estrictamente el principio de veracidad normativa y la disciplina HOLD.

## Licencia

Documento educativo de uso institucional.`
  },
  {
    nombre: '.gitignore',
    ruta: 'deploy/.gitignore',
    descripcion: 'Archivos y directorios ignorados por Git',
    lenguaje: 'text',
    icono: 'fas fa-eye-slash',
    contenido: `.vercel
node_modules
.DS_Store
*.log`
  },
  {
    nombre: 'HOLD_REGISTRY.md',
    ruta: 'deploy/HOLD_REGISTRY.md',
    descripcion: 'Registro completo de elementos en HOLD con motivo, fuente necesaria y responsable',
    lenguaje: 'markdown',
    icono: 'fas fa-pause-circle',
    contenido: `# Registro de HOLD

> **Principio rector:** No se cierra un HOLD sin fuente verificable. No se decide por inferencia.

---

## Elementos en HOLD

| ID | Elemento | Motivo | Fuente necesaria | Responsable | Estado |
|---|---|---|---|---|---|
| H-001 | Normativa específica EP música Extremadura | Decreto/orden no proporcionado | Decreto/Orden Consejería Educación | Inspección educativa | ⏳ ABIERTO |
| H-002 | Datos del centro educativo | No proporcionados | Documento institucional / PGA | Equipo directivo | ⏳ ABIERTO |
| H-003 | Horas lectivas y distribución semanal | No acreditadas | Horario oficial del centro | Jefatura de estudios | ⏳ ABIERTO |
| H-004 | Porcentajes de calificación | No verificados | Normativa de evaluación | Claustro | ⏳ ABIERTO |
| H-005 | Repertorio definitivo — Banda | No confirmado | Acuerdo departamental | Director/a Banda | ⏳ ABIERTO |
| H-006 | Repertorio definitivo — Orquesta | No confirmado | Acuerdo departamental | Director/a Orquesta | ⏳ ABIERTO |
| H-007 | Porcentaje mínimo de asistencia | No acreditado | Normativa de evaluación | Jefatura de estudios | ⏳ ABIERTO |
| H-008 | Fechas de audiciones y conciertos | No programadas | Calendario oficial / PGA | Equipo directivo | ⏳ ABIERTO |
| H-009 | Requisitos de pruebas extraordinarias | No verificados | Normativa de evaluación | Inspección educativa | ⏳ ABIERTO |
| H-010 | Cursos exactos de Orquesta y Banda | No verificados | Decreto de currículo | Departamento | ⏳ ABIERTO |
| H-011 | Redondeo de calificaciones | No verificado | Normativa de evaluación | Centro | ⏳ ABIERTO |
| H-012 | Número de sesiones por unidad | No verificado | Horario 2026/2027 | Centro | ⏳ ABIERTO |

---

## Procedimiento de cierre

1. Identificar la fuente verificable necesaria
2. Obtener la fuente del responsable indicado
3. Verificar que la fuente es oficial y vigente
4. Actualizar el documento con el dato acreditado
5. Mover el elemento a "Historial de cierres"
6. Indicar fecha, fuente y persona que cerró`
  },
  {
    nombre: 'CHANGELOG.md',
    ruta: 'deploy/CHANGELOG.md',
    descripcion: 'Registro de versiones y cambios del documento',
    lenguaje: 'markdown',
    icono: 'fas fa-history',
    contenido: `# Changelog

## [1.0.0] — 2026-09-21

### Añadido
- Versión inicial de la programación didáctica depurada
- Bloques I–XXI completos con estructura navegable
- Matrices de objetivos (OG, MC, ORQ, BAN)
- Matrices de contenidos comunes y específicos
- Matrices de criterios de evaluación (CE-01 a CE-15)
- Sistema de clasificación interna
- Registro de HOLD con 12 elementos pendientes
- HTML autocontenido con CSS y JS embebidos
- Optimización para impresión PDF
- Índice navegable con anclas internas

### HOLD activos
- 12 elementos pendientes de verificación

### Eliminado (depuración)
- Duplicidades entre bloques de objetivos
- Contradicciones normativas no verificables
- Datos no acreditados
- Porcentajes de calificación no verificados
- Repertorio no confirmado`
  },
  {
    nombre: 'deploy.yml',
    ruta: 'deploy/.github/workflows/deploy.yml',
    descripcion: 'Workflow de GitHub Actions para CI/CD — pull → build → deploy --prebuilt',
    lenguaje: 'yaml',
    icono: 'fas fa-code-branch',
    contenido: `name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  deploy:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install Vercel CLI
        run: npm install --global vercel@latest

      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=\${{ secrets.VERCEL_TOKEN }}

      - name: Build Project
        run: vercel build --prod --token=\${{ secrets.VERCEL_TOKEN }}

      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=\${{ secrets.VERCEL_TOKEN }}`
  },
];

export default function ArtifactGenerator({ documentLoaded }: Props) {
  const [activeArtifact, setActiveArtifact] = useState(0);

  const handleDownload = (artifact: Artifact) => {
    const blob = new Blob([artifact.contenido], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = artifact.nombre;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    artifacts.forEach((artifact, index) => {
      setTimeout(() => handleDownload(artifact), index * 300);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <i className="fas fa-file-export text-emerald-400"></i>
            Artefactos de despliegue
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            {artifacts.length} archivos listos para copiar al repositorio
          </p>
        </div>
        <button
          onClick={handleDownloadAll}
          className="px-5 py-2.5 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20 shrink-0"
        >
          <i className="fas fa-download mr-2"></i>Descargar todos
        </button>
      </div>

      {/* Warning */}
      <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3">
        <i className="fas fa-info-circle text-blue-400 mt-0.5"></i>
        <div>
          <p className="text-sm font-medium text-blue-400">Cómo usar estos archivos</p>
          <p className="text-xs text-slate-400 mt-1">
            Los archivos están en el directorio <code className="bg-blue-500/10 px-1 rounded">deploy/</code> de este proyecto. 
            Copia todo el contenido de <code className="bg-blue-500/10 px-1 rounded">deploy/</code> a tu repositorio GitHub. 
            Consulta <code className="bg-blue-500/10 px-1 rounded">INSTRUCCIONES_DESPLIEGUE.md</code> para los pasos detallados.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Artifact List */}
        <div className="lg:col-span-1">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="p-3 border-b border-slate-700/50">
              <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider">Archivos</h4>
            </div>
            <div className="p-2 space-y-1">
              {artifacts.map((artifact, index) => (
                <button
                  key={index}
                  onClick={() => setActiveArtifact(index)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all ${
                    activeArtifact === index
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-200 border border-transparent'
                  }`}
                >
                  <i className={`${artifact.icono} text-sm w-4`}></i>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{artifact.nombre}</div>
                    <div className="text-[10px] text-slate-500 truncate">{artifact.ruta}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* File Structure */}
          <div className="mt-4 bg-slate-800/60 border border-slate-700/50 rounded-xl p-4">
            <h4 className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-3">Estructura del repositorio</h4>
            <pre className="text-xs text-slate-400 font-mono">
{`programacion-didactica-2026-2027/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── CHANGELOG.md
├── HOLD_REGISTRY.md
├── README.md
├── index.html
└── vercel.json`}
            </pre>
          </div>
        </div>

        {/* Artifact Content */}
        <div className="lg:col-span-3">
          <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl overflow-hidden">
            <div className="px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <i className={`${artifacts[activeArtifact].icono} text-emerald-400`}></i>
                <div>
                  <h3 className="text-sm font-medium text-white">{artifacts[activeArtifact].nombre}</h3>
                  <p className="text-xs text-slate-500">{artifacts[activeArtifact].descripcion}</p>
                </div>
              </div>
              <button
                onClick={() => handleDownload(artifacts[activeArtifact])}
                className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium hover:bg-emerald-500/30 transition-colors shrink-0"
              >
                <i className="fas fa-download mr-1"></i>Descargar
              </button>
            </div>
            <div className="p-4">
              <CodeBlock code={artifacts[activeArtifact].contenido} language={artifacts[activeArtifact].lenguaje} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
