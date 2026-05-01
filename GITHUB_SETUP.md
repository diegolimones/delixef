# Configurar Delixef en GitHub

## Paso 1: Crear Repositorio en GitHub

1. Ir a https://github.com/new
2. Nombre del repositorio: `delixef`
3. Descripción: `Plataforma web para chef privado en Ibiza`
4. Seleccionar "Private" (privado)
5. NO inicializar con README (ya existe)
6. Crear repositorio

## Paso 2: Conectar Repositorio Local a GitHub

Una vez creado el repositorio, GitHub te mostrará instrucciones. O ejecutar en tu terminal:

```bash
# Navegar al directorio del proyecto
cd "C:\Users\Diego\OneDrive - Case On It\Documentos\Desarrollo negocio - Proyectos\Delixef"

# Agregar el repositorio remoto (reemplazar USERNAME con tu usuario)
git remote add origin https://github.com/USERNAME/delixef.git

# Verificar que se agregó correctamente
git remote -v

# Si necesitas cambiar la rama principal a 'main'
git branch -M main

# Pushear el código a GitHub
git push -u origin main
```

## Paso 3: Configurar Secretos en GitHub (para CI/CD)

1. Ir a Settings → Secrets and variables → Actions
2. Crear los siguientes secretos (opcionales para CI/CD):
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

```bash
# Para generar NEXTAUTH_SECRET desde terminal:
openssl rand -base64 32
```

## Paso 4: Crear Ramas Principales

```bash
# Crear rama develop
git checkout -b develop
git push -u origin develop

# Volver a main
git checkout main
```

## Paso 5: Proteger Ramas en GitHub

1. Settings → Branches
2. Agregar regla de protección para `main`:
   - ✓ Require pull request reviews before merging (1 review)
   - ✓ Require branches to be up to date before merging
   - ✓ Require status checks to pass
3. Agregar regla de protección para `develop`:
   - ✓ Require pull request reviews before merging

## Paso 6: Configurar Vercel para Deployment

1. Ir a https://vercel.com
2. Conectar cuenta de GitHub
3. Seleccionar repositorio `delixef`
4. Configurar variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (production URL)
   - `RESEND_API_KEY`
   - `GOOGLE_CALENDAR_API_KEY`
   - `GOOGLE_CALENDAR_ID`
5. Deploy

## Paso 7: Verificar Workflow de GitHub Actions

1. Ir a Actions en el repositorio
2. Verificar que los workflows se ejecuten correctamente en cada push

## Comandos Útiles

```bash
# Ver historial de commits
git log --oneline

# Ver estado del repositorio
git status

# Ver configuración de remotes
git remote -v

# Hacer pull de cambios remotos
git pull origin main

# Sincronizar fork (si haciste fork)
git fetch upstream
git merge upstream/main
```

## Estructura de Ramas Recomendada

```
main (producción)
  ↑
  ├─ develop (integración)
       ↑
       ├─ feature/componentes
       ├─ feature/admin-panel
       ├─ feature/google-calendar
       └─ fix/email-validation
```

## Flujo de Trabajo Típico

1. Crear rama desde `develop`: `git checkout -b feature/nombre develop`
2. Hacer cambios y commits
3. Pushear rama: `git push -u origin feature/nombre`
4. Crear Pull Request en GitHub
5. Esperar revisión y merge a `develop`
6. Cuando esté listo para producción, crear PR de `develop` a `main`

## Troubleshooting

### "Permission denied (publickey)"
```bash
# Generar nuevas claves SSH
ssh-keygen -t ed25519 -C "diego.l.b20@gmail.com"

# Agregar a GitHub en Settings → SSH and GPG keys
```

### "fatal: 'origin' does not appear to be a 'git' repository"
```bash
# Verificar remotes
git remote -v

# Si no hay, agregar:
git remote add origin https://github.com/USERNAME/delixef.git
```

### Merge conflicts
```bash
# Actualizar desde main
git fetch origin
git merge origin/main

# Resolver conflictos en VS Code, luego:
git add .
git commit -m "fix: resolve merge conflicts"
git push
```

---

## Próximos Pasos

Una vez que el repositorio esté en GitHub:
1. Continuar con Task 3: Crear componentes base (Header, Footer)
2. Implementar las páginas según el plan
3. Hacer deploy a Vercel

¡El proyecto está listo para colaboración!
