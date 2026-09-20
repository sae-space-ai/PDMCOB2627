import { useState } from 'react';
import CodeBlock from './CodeBlock';

interface FileItem {
  name: string;
  path: string;
  language: string;
  icon: string;
  description: string;
  content: string;
}

const files: FileItem[] = [
  {
    name: 'index.html',
    path: 'index.html',
    language: 'html',
    icon: 'fas fa-file-code',
    description: 'Archivo principal de la programación didáctica (copiar desde el archivo original)',
    content: `<!-- Copiar el contenido de: -->
<!-- Programacion_Didactica_2026_2027_MusicaCamara_Orquesta_Banda.html -->
<!-- Renombrar a index.html en la raíz del repositorio -->

<!-- Comando para copiar: -->
<!-- cp Programacion_Didactica_2026_2027_MusicaCamara_Orquesta_Banda.html index.html -->

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Programación Didáctica 2026/2027 — Música de Cámara · Orquesta · Banda</title>
</head>
<body>
    <!-- Contenido del documento original -->
</body>
</html>`
  },
  {
    name: 'vercel.json',
    path: 'vercel.json',
    language: 'json',
    icon: 'fas fa-cog',
    description: 'Configuración de Vercel para el despliegue estático',
    content: `{
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
    name: 'README.md',
    path: 'README.md',
    language: 'markdown',
    icon: 'fas fa-book',
    description: 'Documentación del repositorio',
    content: `# Programación Didáctica 2026/2027

**Música de Cámara · Orquesta · Banda**  
Enseñanzas Profesionales de Música — Extremadura

---

## Descripción

Documento HTML de visión continua correspondiente a la Programación Didáctica del curso 2026/2027 para las asignaturas de Música de Cámara, Orquesta y Banda de las Enseñanzas Profesionales de Música en Extremadura.

## Despliegue

Este proyecto se despliega automáticamente en Vercel mediante GitHub Actions.

- **Framework:** HTML estático (sin build step)
- **Hosting:** Vercel
- **CI/CD:** GitHub Actions

### URLs

- **Producción:** https://programacion-didactica-2026-2027.vercel.app
- **Repositorio:** https://github.com/<USUARIO>/programacion-didactica-2026-2027

## Estructura

\`\`\`
├── index.html          # Documento principal
├── vercel.json         # Configuración Vercel
├── .gitignore          # Archivos ignorados
├── README.md           # Este archivo
└── .github/
    └── workflows/
        └── deploy.yml  # CI/CD pipeline
\`\`\`

## Desarrollo Local

1. Clona el repositorio
2. Abre \`index.html\` en tu navegador
3. No requiere servidor ni build step

## Licencia

Documento educativo de uso institucional.`
  },
  {
    name: '.gitignore',
    path: '.gitignore',
    language: 'text',
    icon: 'fas fa-eye-slash',
    description: 'Archivos y directorios ignorados por Git',
    content: `.vercel
node_modules
.DS_Store
*.log`
  },
  {
    name: 'deploy.yml',
    path: '.github/workflows/deploy.yml',
    language: 'yaml',
    icon: 'fas fa-code-branch',
    description: 'Workflow de GitHub Actions para despliegue automático en Vercel',
    content: `name: Deploy to Vercel

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

export default function FileViewer() {
  const [activeFile, setActiveFile] = useState(0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* File List */}
      <div className="lg:col-span-1">
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-700/50">
            <h3 className="text-sm font-medium text-slate-300">
              <i className="fas fa-folder-open mr-2 text-amber-400"></i>
              Archivos del proyecto
            </h3>
          </div>
          <div className="p-2">
            {files.map((file, index) => (
              <button
                key={index}
                onClick={() => setActiveFile(index)}
                className={`w-full text-left px-3 py-2.5 rounded-lg flex items-center gap-3 transition-all ${
                  activeFile === index
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-200 border border-transparent'
                }`}
              >
                <i className={`${file.icon} text-sm w-4`}></i>
                <div className="min-w-0">
                  <div className="text-sm font-medium truncate">{file.name}</div>
                  <div className="text-xs text-slate-500 truncate">{file.path}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* File Content */}
      <div className="lg:col-span-3">
        <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-slate-700/50 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <i className={`${files[activeFile].icon} text-emerald-400`}></i>
              <div>
                <h3 className="text-sm font-medium text-white">{files[activeFile].name}</h3>
                <p className="text-xs text-slate-500">{files[activeFile].description}</p>
              </div>
            </div>
            <span className="px-2 py-0.5 bg-slate-700/50 rounded text-xs font-mono text-slate-400">
              {files[activeFile].language}
            </span>
          </div>
          <div className="p-4">
            <CodeBlock code={files[activeFile].content} language={files[activeFile].language} />
          </div>
        </div>
      </div>
    </div>
  );
}
