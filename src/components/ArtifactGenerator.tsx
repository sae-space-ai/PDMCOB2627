import { useState } from 'react';
import CodeBlock from './CodeBlock';
import type { Artifact } from '../types';

interface Props {
  documentLoaded: boolean;
}

const artifacts: Artifact[] = [
  {
    nombre: 'index.html',
    ruta: 'index.html',
    descripcion: 'Documento HTML de visión continua autocontenido con CSS y JS embebidos',
    lenguaje: 'html',
    icono: 'fas fa-file-code',
    generado: false,
    contenido: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Programación Didáctica 2026/2027 — Música de Cámara · Orquesta · Banda</title>
    <style>
        /* CSS autocontenido optimizado para impresión PDF */
        :root {
            --color-primary: #059669;
            --color-hold: #d97706;
            --color-bg: #ffffff;
            --color-text: #1e293b;
        }
        body { font-family: 'Georgia', serif; line-height: 1.6; max-width: 900px; margin: 0 auto; padding: 2rem; }
        h1, h2, h3 { color: var(--color-primary); }
        .hold-tag { background: #fef3c7; border: 1px solid #f59e0b; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; }
        table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
        th, td { border: 1px solid #e2e8f0; padding: 0.5rem; text-align: left; }
        th { background: #f1f5f9; }
        @media print { body { max-width: 100%; padding: 0; } .no-print { display: none; } }
        .download-btn { position: fixed; bottom: 2rem; right: 2rem; background: var(--color-primary); color: white; border: none; padding: 1rem; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
    </style>
</head>
<body>
    <!-- Portada institucional -->
    <header>
        <h1>Programación Didáctica 2026/2027</h1>
        <h2>Música de Cámara · Orquesta · Banda</h2>
        <p>Enseñanzas Profesionales de Música</p>
    </header>
    
    <!-- Índice navegable -->
    <nav id="indice">
        <h2>Índice</h2>
        <ol>
            <li><a href="#bloque-1">Bloque I — Marco normativo</a></li>
            <li><a href="#bloque-2">Bloque II — Contexto institucional</a></li>
            <!-- ... Bloques III a XXI ... -->
        </ol>
    </nav>
    
    <!-- Contenido de bloques I-XXI -->
    <!-- Se genera a partir del documento fuente ampliado -->
    
    <button class="download-btn no-print" onclick="window.print()" title="Descargar como PDF">
        📄
    </button>
</body>
</html>`
  },
  {
    nombre: 'README.md',
    ruta: 'README.md',
    descripcion: 'Documentación del repositorio con estructura y estado',
    lenguaje: 'markdown',
    icono: 'fas fa-book',
    generado: false,
    contenido: `# Programación Didáctica 2026/2027

**Música de Cámara · Orquesta · Banda**  
Enseñanzas Profesionales de Música — Extremadura

---

## Descripción

Programación didáctica del curso 2026/2027 para las asignaturas de Música de Cámara, Orquesta y Banda.

## Estructura de bloques

| Bloque | Contenido |
|--------|-----------|
| I | Marco normativo |
| II | Contexto institucional |
| III–VII | Objetivos, contenidos, criterios |
| VIII–X | Repertorio y secuenciación |
| XI–XV | Metodología y evaluación |
| XVI–XX | Unidades didácticas y anexos |
| XXI | Bibliografía |

## Estado de HOLD

Consultar [HOLD_REGISTRY.md](./HOLD_REGISTRY.md) para la lista actualizada de elementos pendientes de verificación.

## Uso

- Abrir \`index.html\` en el navegador para visualización continua
- Usar Ctrl+P para exportar a PDF
- El documento es autocontenido (CSS y JS embebidos)

## Actualización

1. Modificar el contenido en el documento fuente
2. Regenerar el HTML
3. Commit y push → despliegue automático en Vercel`
  },
  {
    nombre: 'vercel.json',
    ruta: 'vercel.json',
    descripcion: 'Configuración de Vercel para despliegue estático',
    lenguaje: 'json',
    icono: 'fas fa-cog',
    generado: false,
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
    nombre: '.gitignore',
    ruta: '.gitignore',
    descripcion: 'Archivos ignorados por Git',
    lenguaje: 'text',
    icono: 'fas fa-eye-slash',
    generado: false,
    contenido: `.vercel
node_modules
.DS_Store
*.log`
  },
  {
    nombre: 'CHANGELOG.md',
    ruta: 'CHANGELOG.md',
    descripcion: 'Registro de versiones y cambios',
    lenguaje: 'markdown',
    icono: 'fas fa-history',
    generado: false,
    contenido: `# Changelog

## [1.0.0] — 2026-09-21

### Añadido
- Versión inicial de la programación didáctica depurada
- Bloques I–XXI completos
- Matrices de objetivos, contenidos y criterios
- Sistema de clasificación interna (NORMA/TEXTO/INSTITUCIONAL/DESARROLLO/EVIDENCIA/HOLD)

### HOLD activos
- 10 elementos pendientes de verificación
- Ver HOLD_REGISTRY.md para detalle

### Eliminado
- Duplicidades entre bloques de objetivos
- Contradicciones normativas no verificables`
  },
  {
    nombre: 'HOLD_REGISTRY.md',
    ruta: 'HOLD_REGISTRY.md',
    descripcion: 'Registro completo de elementos en HOLD',
    lenguaje: 'markdown',
    icono: 'fas fa-pause-circle',
    generado: false,
    contenido: `# HOLD Registry

## Elementos pendientes de verificación

| ID | Bloque | Elemento | Motivo | Fuente necesaria | Responsable | Estado |
|----|--------|----------|--------|-----------------|-------------|--------|
| H-001 | I | Normativa EP música Extremadura | No acreditada | Decreto/Orden consejería | Inspección | ABIERTO |
| H-002 | II | Datos del centro | No proporcionados | PGA / Documento institucional | Equipo directivo | ABIERTO |
| H-003 | III | Horas lectivas | No acreditadas | Horario oficial | Jefatura estudios | ABIERTO |
| H-004 | V | Porcentajes calificación | No verificados | Normativa evaluación | Claustro | ABIERTO |
| H-005 | VIII | Repertorio Banda | No confirmado | Acuerdo departamento | Dir. Banda | ABIERTO |
| H-006 | IX | Repertorio Orquesta | No confirmado | Acuerdo departamento | Dir. Orquesta | ABIERTO |
| H-007 | XII | % asistencia mínimo | No acreditado | Normativa evaluación | Jefatura estudios | ABIERTO |
| H-008 | XV | Fechas conciertos | No programadas | Calendario centro | Equipo directivo | ABIERTO |
| H-009 | XVIII | Requisitos pruebas extra. | No verificados | Normativa evaluación | Inspección | ABIERTO |
| H-010 | XX | Cursos Orquesta/Banda | No verificados | Decreto currículo | Departamento | ABIERTO |

## Principio

> No se cierra un HOLD sin fuente verificable.
> No se decide por inferencia.`
  },
  {
    nombre: 'deploy.yml',
    ruta: '.github/workflows/deploy.yml',
    descripcion: 'Workflow de GitHub Actions para CI/CD',
    lenguaje: 'yaml',
    icono: 'fas fa-code-branch',
    generado: false,
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
      - name: Checkout
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
  const [generated, setGenerated] = useState<Set<number>>(new Set());

  const handleGenerate = (index: number) => {
    setGenerated(prev => new Set([...prev, index]));
  };

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
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <i className="fas fa-file-export text-emerald-400"></i>
            Artefactos del proyecto
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            {generated.size}/{artifacts.length} artefactos generados
          </p>
        </div>
        <button
          onClick={handleDownloadAll}
          className="px-5 py-2.5 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors shadow-lg shadow-emerald-500/20"
        >
          <i className="fas fa-download mr-2"></i>Descargar todos
        </button>
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
                  {generated.has(index) && (
                    <i className="fas fa-check-circle text-emerald-400 text-xs"></i>
                  )}
                </button>
              ))}
            </div>
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
              <div className="flex gap-2">
                <button
                  onClick={() => handleGenerate(activeArtifact)}
                  className="px-3 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-medium hover:bg-emerald-500/30 transition-colors"
                >
                  <i className="fas fa-magic mr-1"></i>Generar
                </button>
                <button
                  onClick={() => handleDownload(artifacts[activeArtifact])}
                  className="px-3 py-1.5 bg-slate-700/50 text-slate-400 rounded-lg text-xs font-medium hover:text-white transition-colors"
                >
                  <i className="fas fa-download mr-1"></i>Descargar
                </button>
              </div>
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
