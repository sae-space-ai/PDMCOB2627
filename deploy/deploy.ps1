# ============================================
# Script de Despliegue — PDMCOB2627
# Programación Didáctica 2026/2027
# ============================================
# Este script automatiza el despliegue en GitHub + Vercel
# Repositorio: github.com/PDMCOB2627/PDMCOB2627
# Ejecutar desde el directorio deploy/ en PowerShell
# ============================================

$ErrorActionPreference = "Stop"

Write-Host "🚀 Iniciando despliegue de PDMCOB2627" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "Repositorio: github.com/PDMCOB2627/PDMCOB2627" -ForegroundColor Cyan
Write-Host "Producción:  pdm-cob-2627.vercel.app" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""

# Verificar herramientas
Write-Host "📋 Verificando herramientas..." -ForegroundColor Yellow
try {
    $null = Get-Command git -ErrorAction Stop
    $null = Get-Command gh -ErrorAction Stop
    $null = Get-Command vercel -ErrorAction Stop
    Write-Host "✅ Todas las herramientas están instaladas" -ForegroundColor Green
} catch {
    Write-Host "❌ Falta alguna herramienta:" -ForegroundColor Red
    Write-Host "   git: https://git-scm.com/" -ForegroundColor Yellow
    Write-Host "   gh: https://cli.github.com/" -ForegroundColor Yellow
    Write-Host "   vercel: npm install -g vercel@latest" -ForegroundColor Yellow
    exit 1
}
Write-Host ""

# Verificar autenticación
Write-Host "🔐 Verificando autenticación..." -ForegroundColor Yellow
try {
    $null = gh auth status 2>&1
    Write-Host "✅ Autenticado en GitHub" -ForegroundColor Green
} catch {
    Write-Host "❌ No estás autenticado en GitHub. Ejecuta: gh auth login" -ForegroundColor Red
    exit 1
}
Write-Host ""

# Inicializar Git
Write-Host "📦 Inicializando repositorio Git..." -ForegroundColor Yellow
git init
git branch -M main
Write-Host "✅ Repositorio inicializado" -ForegroundColor Green
Write-Host ""

# Añadir archivos
Write-Host "📝 Añadiendo archivos..." -ForegroundColor Yellow
git add .
git commit -m "Initial deploy: PDMCOB2627 — Programación Didáctica 2026/2027"
Write-Host "✅ Archivos añadidos y commit realizado" -ForegroundColor Green
Write-Host ""

# Crear repositorio en GitHub
Write-Host "🌐 Creando repositorio en GitHub..." -ForegroundColor Yellow
Write-Host "⚠️  Este comando creará un repositorio PÚBLICO" -ForegroundColor Yellow
Write-Host "   Si prefieres privado, edita el script y cambia --public por --private" -ForegroundColor Yellow
Write-Host ""
$confirm = Read-Host "¿Continuar? (s/n)"
if ($confirm -ne "s" -and $confirm -ne "S") {
    Write-Host "❌ Operación cancelada" -ForegroundColor Red
    exit 0
}

gh repo create PDMCOB2627/PDMCOB2627 --public --source=. --remote=origin --push
Write-Host "✅ Repositorio creado y push realizado" -ForegroundColor Green
Write-Host ""

# Vincular con Vercel
Write-Host "🔗 Vinculando con Vercel..." -ForegroundColor Yellow
vercel link --yes
Write-Host "✅ Proyecto vinculado con Vercel" -ForegroundColor Green
Write-Host ""

# Desplegar
Write-Host "🚀 Desplegando en producción..." -ForegroundColor Yellow
vercel deploy --prod
Write-Host ""

Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "✅ DESPLIEGUE COMPLETADO — PDMCOB2627" -ForegroundColor Green
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📍 URLs:" -ForegroundColor Cyan
Write-Host "   GitHub: https://github.com/PDMCOB2627/PDMCOB2627" -ForegroundColor White
Write-Host "   Producción: https://pdm-cob-2627.vercel.app" -ForegroundColor White
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "   1. Configura los secretos en GitHub:" -ForegroundColor White
Write-Host "      gh secret set VERCEL_TOKEN --body `"<TU_TOKEN>`"" -ForegroundColor Gray
Write-Host "      gh secret set VERCEL_ORG_ID --body `"<ORG_ID>`"" -ForegroundColor Gray
Write-Host "      gh secret set VERCEL_PROJECT_ID --body `"<PROJECT_ID>`"" -ForegroundColor Gray
Write-Host ""
Write-Host "   2. Obtén los IDs de Vercel:" -ForegroundColor White
Write-Host "      cat .vercel/project.json" -ForegroundColor Gray
Write-Host ""
Write-Host "   3. Verifica el despliegue:" -ForegroundColor White
Write-Host "      vercel ls" -ForegroundColor Gray
Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
