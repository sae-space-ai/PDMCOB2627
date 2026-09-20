# PDMCOB2627

**Programación Didáctica 2026/2027 — Música de Cámara · Orquesta · Banda**

Enseñanzas Profesionales de Música — Extremadura

---

## 🎯 Descripción

Repositorio oficial de la Programación Didáctica del curso 2026/2027 para las asignaturas de Música de Cámara, Orquesta y Banda de las Enseñanzas Profesionales de Música en Extremadura.

## 🔗 Enlaces

- **Repositorio:** [github.com/PDMCOB2627/PDMCOB2627](https://github.com/PDMCOB2627/PDMCOB2627)
- **Despliegue:** [pdm-cob-2627.vercel.app](https://pdm-cob-2627.vercel.app)

## 📁 Estructura

```
PDMCOB2627/
├── src/                          ← Código fuente React (herramienta de gestión)
│   ├── App.tsx                   ← Componente principal
│   ├── components/               ← Componentes React
│   │   ├── Header.tsx
│   │   ├── DocumentLoader.tsx
│   │   ├── BlockViewer.tsx
│   │   ├── HoldRegistry.tsx
│   │   ├── AuditChecks.tsx
│   │   ├── ArtifactGenerator.tsx
│   │   ├── DeployGuide.tsx
│   │   ├── SummaryPanel.tsx
│   │   ├── CodeBlock.tsx
│   │   └── SecretConfigurator.tsx
│   ├── types.ts                  ← Tipos TypeScript
│   ├── index.css                 ← Estilos Tailwind
│   └── main.tsx                  ← Punto de entrada
├── deploy/                       ← Archivos para despliegue en Vercel
│   ├── index.html                ← Documento HTML principal (visión continua)
│   ├── README.md                 ← Documentación del despliegue
│   ├── vercel.json               ← Configuración Vercel
│   ├── .gitignore
│   ├── HOLD_REGISTRY.md          ← Registro de elementos pendientes
│   ├── CHANGELOG.md              ← Historial de cambios
│   ├── DEPLOY_INSTRUCTIONS.md    ← Instrucciones de despliegue
│   ├── deploy.sh                 ← Script Linux/Mac
│   └── deploy.ps1                ← Script Windows
├── index.html                    ← HTML base de la app React
├── package.json                  ← Dependencias
├── vite.config.js                ← Configuración Vite
├── tsconfig.json                 ← Configuración TypeScript
└── README.md                     ← Este archivo
```

## 🚀 Despliegue

### Opción 1: Script automático

```bash
cd deploy
chmod +x deploy.sh
./deploy.sh
```

### Opción 2: Manual

```bash
cd deploy
git init
git branch -M main
git add .
git commit -m "Initial deploy: PDMCOB2627"
gh repo create PDMCOB2627/PDMCOB2627 --public --source=. --remote=origin --push
vercel link --yes
vercel deploy --prod
```

## 🛠️ Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000)

## 📋 Build producción

```bash
npm run build
```

## ⏳ Estado de HOLD

Consultar [deploy/HOLD_REGISTRY.md](./deploy/HOLD_REGISTRY.md) para la lista actualizada de elementos pendientes de verificación.

## 🔒 Principios

- **Veracidad normativa:** Solo contenido acreditado con fuentes verificables
- **Disciplina HOLD:** No se cierra un HOLD sin fuente verificable
- **CI/CD:** Push a `main` → deploy automático en Vercel

## 📄 Licencia

Documento educativo de uso institucional.
