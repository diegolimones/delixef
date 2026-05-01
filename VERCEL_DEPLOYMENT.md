# Guía de Despliegue en Vercel

## Prerrequisitos

- Repositorio GitHub creado y configurado con el código de Delixef
- Cuenta de Vercel (puedes crear una en https://vercel.com)
- Las siguientes claves de entorno configuradas:
  - Supabase API Key y URL
  - NextAuth Secret
  - Resend API Key
  - Google Calendar credentials

## Pasos de Despliegue

### 1. Conectar Repositorio a Vercel

1. Ve a https://vercel.com/new
2. Selecciona "Import Git Repository"
3. Pega la URL de tu repositorio GitHub
4. Vercel importará el proyecto automáticamente

### 2. Configurar Variables de Entorno

En la página de configuración del proyecto en Vercel:

1. Haz clic en "Environment Variables"
2. Añade las siguientes variables:

```
NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key

NEXTAUTH_SECRET=tu_nextauth_secret
NEXTAUTH_URL=https://tudominio.vercel.app

RESEND_API_KEY=tu_resend_api_key
ADMIN_EMAIL=admin@delixef.com

GOOGLE_CALENDAR_ID=tu_calendar_id
GOOGLE_CALENDAR_API_KEY=tu_google_api_key
```

3. Guarda los cambios

### 3. Configurar Opciones de Build

Vercel detectará automáticamente que es un proyecto Next.js.

**Build Command:** `next build` (por defecto)
**Output Directory:** `.next` (por defecto)

No necesitas cambiar nada si usas la configuración por defecto.

### 4. Desplegar

1. Una vez configuradas las variables de entorno, haz clic en "Deploy"
2. Vercel construirá y desplegará automáticamente el proyecto
3. Espera a que el despliegue se complete (normalmente 2-3 minutos)

### 5. Verificar el Despliegue

Después del despliegue:

1. Visita tu URL de Vercel (ej: https://delixef.vercel.app)
2. Verifica que todas las páginas carguen correctamente:
   - Página de inicio
   - Servicios
   - Reservar
   - Contacto
   - Catálogo
3. Prueba el formulario de contacto para verificar que Resend funciona
4. Intenta acceder a /admin/login para verificar que la autenticación funciona

### 6. Configurar Dominio Personalizado (Opcional)

1. En Vercel, ve a "Settings" → "Domains"
2. Añade tu dominio personalizado
3. Sigue las instrucciones para actualizar los registros DNS en tu proveedor de dominios

### 7. Configurar GitHub Auto-Deploy

Una vez conectado, Vercel desplegará automáticamente cada vez que hagas push a `main`:

```bash
# Para desplegar cambios
git add .
git commit -m "update: your changes"
git push origin main
```

## Solución de Problemas

### Error: "NEXT_PUBLIC_SUPABASE_URL is not defined"
- Verifica que las variables de entorno están configuradas correctamente en Vercel
- Recuerda que las variables que comienzan con `NEXT_PUBLIC_` son públicas y necesarias en el cliente

### Error: "Supabase connection failed"
- Verifica que la URL de Supabase es correcta
- Verifica que la clave anon está habilitada en Supabase
- Comprueba que el proyecto de Supabase está activo

### Error en el formulario de contacto
- Verifica que RESEND_API_KEY está configurada
- Verifica que ADMIN_EMAIL está configurada correctamente
- Comprueba los logs en Vercel para más detalles

### Error de autenticación del admin
- Verifica que NEXTAUTH_SECRET está configurada
- Verifica que NEXTAUTH_URL es correcto
- Comprueba que el usuario admin existe en Supabase

## Monitoreo Posterior al Despliegue

Después del despliegue, puedes:

1. **Ver logs:** En Vercel Dashboard → Project → Deployments → View Logs
2. **Monitorear tráfico:** En Vercel Analytics
3. **Configurar notificaciones:** En Settings para alertas de errores
4. **Ver rendimiento:** En Vercel Web Analytics

## Actualizar Después del Despliegue

Para actualizar el código en producción:

```bash
# Realiza cambios locales
nano archivo.tsx

# Commit y push
git add archivo.tsx
git commit -m "fix: descripción del cambio"
git push origin main
```

Vercel desplegará automáticamente los cambios en ~2 minutos.

## Rollback a Versión Anterior

Si necesitas volver a una versión anterior:

1. En Vercel Dashboard → Deployments
2. Encuentra el despliegue anterior que funciona
3. Haz clic en los tres puntos y selecciona "Promote to Production"

## Integración Continua

El proyecto está configurado con:
- Linting automático
- Type checking con TypeScript
- Tests básicos (npm test)

Para añadir checks antes del despliegue, Vercel puede ejecutar comandos personalizados.
