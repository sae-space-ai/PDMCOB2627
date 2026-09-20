# PDMCOB2627 — Instrucciones de Despliegue

**Repositorio:** [github.com/PDMCOB2627/PDMCOB2627](https://github.com/PDMCOB2627/PDMCOB2627)  
**Producción:** [pdm-cob-2627.vercel.app](https://pdm-cob-2627.vercel.app)

## Requisitos previos

Antes de comenzar, asegúrate de tener instaladas las siguientes herramientas:

```bash
git --version
gh --version
vercel --version
node --version
```

Si falta alguna:

```bash
# Instalar Vercel CLI
npm install -g vercel@latest

# Instalar GitHub CLI
# Visita: https://cli.github.com/
```

## Autenticación

```bash
# Verificar autenticación en GitHub
gh auth status

# Si no estás autenticado:
gh auth login

# Verificar autenticación en Vercel
vercel login
```

## Paso 1: Preparar el directorio de despliegue

Los archivos de despliegue están en el directorio `deploy/`. Cópialos a un nuevo directorio:

```bash
# Crear directorio de trabajo
mkdir PDMCOB2627
cd PDMCOB2627

# Copiar archivos de despliegue
cp -r ../deploy/* .
cp ../deploy/.gitignore .
cp -r ../deploy/.github .

# Verificar estructura
ls -la
```

Deberías ver:
- `index.html`
- `README.md`
- `vercel.json`
- `.gitignore`
- `HOLD_REGISTRY.md`
- `CHANGELOG.md`
- `.github/workflows/deploy.yml`

## Paso 2: Inicializar Git

```bash
git init
git branch -M main
git add .
git commit -m "Initial deploy: PDMCOB2627 — Programación Didáctica 2026/2027 (versión depurada)"
```

## Paso 3: Crear repositorio en GitHub

```bash
# Crear repositorio público bajo la organización PDMCOB2627
gh repo create PDMCOB2627/PDMCOB2627 --public --source=. --remote=origin --push

# O si prefieres privado:
gh repo create PDMCOB2627/PDMCOB2627 --private --source=. --remote=origin --push
```

## Paso 4: Vincular con Vercel

```bash
vercel link --yes
```

Este comando creará el proyecto en Vercel y generará el archivo `.vercel/project.json`.

Verifica la vinculación:

```bash
cat .vercel/project.json
```

Anota los valores de `projectId` y `orgId`.

## Paso 5: Configurar secretos en GitHub

Primero, obtén un token de Vercel:

```bash
vercel tokens create pdm-cob-2627-deploy
```

O crea uno manualmente en: https://vercel.com/account/tokens

Luego, añade los secretos al repositorio:

```bash
# Reemplaza <TOKEN> con tu token de Vercel
gh secret set VERCEL_TOKEN --body "<TOKEN>"

# Reemplaza <ORG_ID> y <PROJECT_ID> con los valores de .vercel/project.json
gh secret set VERCEL_ORG_ID --body "<ORG_ID>"
gh secret set VERCEL_PROJECT_ID --body "<PROJECT_ID>"
```

Verifica que los secretos están configurados:

```bash
gh secret list
```

Deberías ver:
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID

## Paso 6: Desplegar manualmente (primera vez)

```bash
vercel deploy --prod
```

Este comando desplegará el sitio en producción.

## Paso 7: Verificar el despliegue

```bash
# Ver lista de despliegues
vercel ls

# Inspeccionar el último despliegue
vercel inspect

# Verificar que la URL responde
curl -I https://pdm-cob-2627.vercel.app
```

## Paso 8: Verificar CI/CD

El workflow de GitHub Actions está configurado para desplegarse automáticamente cada vez que hagas push a la rama `main`.

Para probarlo:

```bash
# Hacer un cambio de prueba
echo "# Test" >> test.md
git add test.md
git commit -m "Test CI/CD"
git push origin main

# Verificar en GitHub Actions
gh run list
```

## Paso 9: Verificar logs (si hay errores)

```bash
# Ver logs de producción
vercel logs --environment production

# Ver logs con nivel de error
vercel logs --environment production --level error --since 5m
```

## Estructura final

```
PDMCOB2627/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
├── CHANGELOG.md
├── HOLD_REGISTRY.md
├── README.md
├── index.html
└── vercel.json
```

## URLs finales

- **Repositorio GitHub:** https://github.com/PDMCOB2627/PDMCOB2627
- **Producción Vercel:** https://pdm-cob-2627.vercel.app

## Mantenimiento

Para actualizar el documento:

1. Modifica `index.html` localmente
2. Commit y push:
   ```bash
   git add index.html
   git commit -m "Update: [descripción del cambio]"
   git push origin main
   ```
3. Vercel desplegará automáticamente

## Solución de problemas

### Error: "Repository not found"
```bash
git remote -v
git remote set-url origin https://github.com/PDMCOB2627/PDMCOB2627.git
```

### Error: "vercel link failed"
```bash
vercel logout
vercel login
vercel link --yes
```

### Error: "Workflow failed"
Verifica que los secretos están configurados:
```bash
gh secret list
```

### Error: "Deployment not found"
Despliega manualmente:
```bash
vercel deploy --prod
```

## Restricciones de seguridad

- ❌ No expongas tokens en logs ni archivos versionados
- ❌ No modifiques el contenido del fuente sin trazabilidad
- ❌ No cierres un HOLD sin fuente verificable
- ❌ No inventes URL, IDs ni tokens
- ❌ No ejecutes operaciones destructivas sin confirmación
- ⚠️ Si falta información crítica, detente y solicítala

## Soporte

Si encuentras problemas:
1. Revisa los logs de Vercel: `vercel logs`
2. Revisa los logs de GitHub Actions: https://github.com/PDMCOB2627/PDMCOB2627/actions
3. Consulta la documentación de Vercel: https://vercel.com/docs
4. Consulta la documentación de GitHub Actions: https://docs.github.com/en/actions

---
