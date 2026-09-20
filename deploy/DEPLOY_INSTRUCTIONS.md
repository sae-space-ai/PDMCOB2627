# 🚀 Despliegue — Instrucciones Rápidas

## ⚠️ IMPORTANTE

**No puedo ejecutar comandos de terminal.** Mi entorno solo permite crear archivos y construir aplicaciones web.

**Tú debes ejecutar los comandos en tu máquina local.**

---

## 📦 Archivos Generados

Todos los archivos necesarios están en el directorio `deploy/`:

```
deploy/
├── index.html              ← Documento HTML principal
├── README.md               ← Documentación
├── vercel.json             ← Configuración Vercel
├── .gitignore              ← Archivos ignorados
├── HOLD_REGISTRY.md        ← Registro de elementos pendientes
├── CHANGELOG.md            ← Historial de cambios
├── .github/
│   └── workflows/
│       └── deploy.yml      ← CI/CD automático
├── deploy.sh               ← Script para Linux/Mac
└── deploy.ps1              ← Script para Windows
```

---

## 🔧 Opción 1: Usar Script Automático (Recomendado)

### Linux / Mac

```bash
cd deploy
chmod +x deploy.sh
./deploy.sh
```

### Windows (PowerShell)

```powershell
cd deploy
.\deploy.ps1
```

El script ejecutará todos los comandos automáticamente y te guiará paso a paso.

---

## 🔧 Opción 2: Ejecutar Comandos Manualmente

Si prefieres ejecutar los comandos uno por uno:

### Paso 1: Entrar al directorio

```bash
cd deploy
```

### Paso 2: Inicializar Git

```bash
git init
git branch -M main
```

### Paso 3: Añadir archivos y hacer commit

```bash
git add .
git commit -m "Initial deploy: Programación Didáctica 2026/2027"
```

### Paso 4: Crear repositorio en GitHub

```bash
gh repo create programacion-didactica-2026-2027 --public --source=. --remote=origin --push
```

**Nota:** Si prefieres privado, cambia `--public` por `--private`

### Paso 5: Vincular con Vercel

```bash
vercel link --yes
```

### Paso 6: Desplegar

```bash
vercel deploy --prod
```

---

## 🔐 Configurar CI/CD (Después del despliegue inicial)

Para que GitHub Actions despliegue automáticamente en cada push:

### Paso 1: Obtener token de Vercel

```bash
vercel tokens create programacion-didactica-deploy
```

O crea uno en: https://vercel.com/account/tokens

### Paso 2: Obtener IDs del proyecto

```bash
cat .vercel/project.json
```

Anota `projectId` y `orgId`.

### Paso 3: Configurar secretos en GitHub

```bash
gh secret set VERCEL_TOKEN --body "<TU_TOKEN_VERCEL>"
gh secret set VERCEL_ORG_ID --body "<TU_ORG_ID>"
gh secret set VERCEL_PROJECT_ID --body "<TU_PROJECT_ID>"
```

**⚠️ IMPORTANTE:** Sustituye los valores entre comillas por tus datos reales.

### Paso 4: Verificar secretos

```bash
gh secret list
```

Deberías ver:
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID

---

## ✅ Verificar Despliegue

```bash
# Ver lista de despliegues
vercel ls

# Ver URL de producción
vercel inspect

# Probar URL
curl -I https://programacion-didactica-2026-2027.vercel.app
```

---

## 📍 URLs Finales

- **GitHub:** https://github.com/<TU_USUARIO>/programacion-didactica-2026-2027
- **Producción:** https://programacion-didactica-2026-2027.vercel.app

---

## 🐛 Solución de Problemas

### Error: "Repository not found"

```bash
git remote -v
git remote set-url origin https://github.com/<TU_USUARIO>/programacion-didactica-2026-2027.git
```

### Error: "vercel link failed"

```bash
vercel logout
vercel login
vercel link --yes
```

### Error: "Workflow failed" en GitHub Actions

Verifica que los secretos están configurados:

```bash
gh secret list
```

### Error: "Deployment not found"

Despliega manualmente:

```bash
vercel deploy --prod
```

---

## 📋 Requisitos Previos

Antes de ejecutar el script, asegúrate de tener:

```bash
# Verificar versiones
git --version
gh --version
vercel --version
node --version
```

Si falta alguna herramienta:

```bash
# Instalar Vercel CLI
npm install -g vercel@latest

# Instalar GitHub CLI
# Visita: https://cli.github.com/
```

---

## 🔒 Restricciones de Seguridad

- ❌ No expongas tokens en logs ni archivos versionados
- ❌ No modifiques el contenido del fuente sin trazabilidad
- ❌ No cierres un HOLD sin fuente verificable
- ❌ No inventes URL, IDs ni tokens
- ❌ No ejecutes operaciones destructivas sin confirmación
- ⚠️ Si falta información crítica, detente y solicítala

---

## 📞 Soporte

Si encuentras problemas:

1. Revisa los logs de Vercel: `vercel logs`
2. Revisa GitHub Actions: https://github.com/<TU_USUARIO>/programacion-didactica-2026-2027/actions
3. Documentación Vercel: https://vercel.com/docs
4. Documentación GitHub Actions: https://docs.github.com/en/actions

---

**¿Necesitas ayuda?** Revisa el archivo `INSTRUCCIONES_DESPLIEGUE.md` en la raíz del proyecto para una guía más detallada.
