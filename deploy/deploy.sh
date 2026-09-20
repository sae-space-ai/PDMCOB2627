#!/bin/bash

# ============================================
# Script de Despliegue — PDMCOB2627
# Programación Didáctica 2026/2027
# ============================================
# Este script automatiza el despliegue en GitHub + Vercel
# Repositorio: github.com/PDMCOB2627/PDMCOB2627
# Ejecutar desde el directorio deploy/
# ============================================

set -e  # Detener en caso de error

echo "🚀 Iniciando despliegue de PDMCOB2627"
echo "============================================================"
echo "Repositorio: github.com/PDMCOB2627/PDMCOB2627"
echo "Producción:  pdm-cob-2627.vercel.app"
echo "============================================================"
echo ""

# Verificar herramientas
echo "📋 Verificando herramientas..."
command -v git >/dev/null 2>&1 || { echo "❌ git no está instalado"; exit 1; }
command -v gh >/dev/null 2>&1 || { echo "❌ gh (GitHub CLI) no está instalado"; exit 1; }
command -v vercel >/dev/null 2>&1 || { echo "❌ vercel no está instalado. Ejecuta: npm install -g vercel@latest"; exit 1; }
echo "✅ Todas las herramientas están instaladas"
echo ""

# Verificar autenticación
echo "🔐 Verificando autenticación..."
gh auth status >/dev/null 2>&1 || { echo "❌ No estás autenticado en GitHub. Ejecuta: gh auth login"; exit 1; }
echo "✅ Autenticado en GitHub"
echo ""

# Inicializar Git
echo "📦 Inicializando repositorio Git..."
git init
git branch -M main
echo "✅ Repositorio inicializado"
echo ""

# Añadir archivos
echo "📝 Añadiendo archivos..."
git add .
git commit -m "Initial deploy: PDMCOB2627 — Programación Didáctica 2026/2027"
echo "✅ Archivos añadidos y commit realizado"
echo ""

# Crear repositorio en GitHub
echo "🌐 Creando repositorio en GitHub..."
echo "⚠️  Este comando creará un repositorio PÚBLICO"
echo "   Si prefieres privado, edita el script y cambia --public por --private"
echo ""
read -p "¿Continuar? (s/n): " confirm
if [[ ! "$confirm" =~ ^[sS]$ ]]; then
    echo "❌ Operación cancelada"
    exit 0
fi

gh repo create PDMCOB2627/PDMCOB2627 --public --source=. --remote=origin --push
echo "✅ Repositorio creado y push realizado"
echo ""

# Vincular con Vercel
echo "🔗 Vinculando con Vercel..."
vercel link --yes
echo "✅ Proyecto vinculado con Vercel"
echo ""

# Desplegar
echo "🚀 Desplegando en producción..."
vercel deploy --prod
echo ""

echo "============================================================"
echo "✅ DESPLIEGUE COMPLETADO — PDMCOB2627"
echo "============================================================"
echo ""
echo "📍 URLs:"
echo "   GitHub: https://github.com/PDMCOB2627/PDMCOB2627"
echo "   Producción: https://pdm-cob-2627.vercel.app"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Configura los secretos en GitHub:"
echo "      gh secret set VERCEL_TOKEN --body \"<TU_TOKEN>\""
echo "      gh secret set VERCEL_ORG_ID --body \"<ORG_ID>\""
echo "      gh secret set VERCEL_PROJECT_ID --body \"<PROJECT_ID>\""
echo ""
echo "   2. Obtén los IDs de Vercel:"
echo "      cat .vercel/project.json"
echo ""
echo "   3. Verifica el despliegue:"
echo "      vercel ls"
echo ""
echo "============================================================"
