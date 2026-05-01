# Delixef - Chef Privado en Ibiza

Plataforma web profesional para Delixef, servicio de chef privado en Ibiza. Permite a clientes reservar servicios de gastronomía personalizada (desayunos, comidas, cenas, eventos) y al propietario gestionar reservas, disponibilidad y menús.

## 🎯 Características

- **Reservas Online**: Los clientes pueden reservar servicios de chef privado
- **Panel de Admin**: Gestión de reservas, disponibilidad, menús e integración con Google Calendar
- **Múltiples Servicios**: Desayunos, comidas, cenas y eventos personalizados
- **Notificaciones por Email**: Confirmaciones y recordatorios automáticos
- **Sincronización Google Calendar**: Las reservas se sincronizan automáticamente
- **Diseño Responsivo**: Interfaz optimizada para móvil y escritorio
- **Lujo Minimalista**: Estética elegante con calidez gastronómica
- **SEO Optimizado**: Metadatos completos, Open Graph, JSON-LD structured data
- **Suite de Tests**: Tests unitarios e integración con Jest y React Testing Library
- **Autenticación Segura**: NextAuth.js con gestión de sesiones

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 con TypeScript y App Router
- **Estilos**: Tailwind CSS con tipografía Playfair Display
- **Base de Datos**: Supabase (PostgreSQL)
- **Autenticación**: NextAuth.js
- **Email**: Resend API
- **Calendario**: Google Calendar API
- **Hosting**: Vercel

## 📦 Requisitos Previos

- Node.js 18+
- npm o yarn
- Cuenta en Supabase
- Cuenta en Google Cloud (para Calendar API)
- Cuenta en Resend (para emails)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/tuusuario/delixef.git
cd delixef
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar Supabase
- Crear proyecto en [Supabase](https://supabase.com)
- Ejecutar el SQL de `database.sql` en el editor SQL de Supabase
- Copiar URL y API keys a `.env.local`

### 4. Configurar variables de entorno
```bash
cp .env.local.example .env.local
```

Editar `.env.local` con:
- Credenciales de Supabase
- NextAuth secret y URL
- API keys de Resend y Google Calendar

### 5. Ejecutar desarrollo
```bash
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

### 6. Ejecutar tests
```bash
npm test
```

Para watch mode:
```bash
npm test -- --watch
```

## 📁 Estructura del Proyecto

```
delixef/
├── app/
│   ├── layout.tsx          # Root layout con metadatos
│   ├── page.tsx            # Home page
│   ├── servicios/          # Página de servicios
│   ├── reservar/           # Formulario de reserva
│   ├── admin/              # Panel de administración protegido
│   │   ├── page.tsx        # Dashboard admin
│   │   ├── reservas/       # Gestión de reservas
│   │   ├── disponibilidad/ # Gestión de disponibilidad
│   │   └── menus/          # Gestión de menús
│   └── api/                # API routes
│       ├── auth/           # Autenticación NextAuth
│       ├── reservas.ts     # CRUD reservas
│       ├── menus.ts        # CRUD menús
│       ├── disponibilidad/ # Gestión disponibilidad
│       ├── email.ts        # Envío de emails
│       └── calendar.ts     # Sincronización Google Calendar
├── components/             # Componentes reutilizables
├── lib/                    # Funciones utilitarias
├── styles/                 # CSS global y configuración
├── public/                 # Assets estáticos
└── database.sql            # Schema Supabase

```

## 🔧 Configuración de Supabase

### Crear Tablas
Ejecutar el contenido de `database.sql` en el SQL Editor de Supabase:
1. Ir a SQL Editor
2. Crear nueva consulta
3. Pegar contenido de `database.sql`
4. Ejecutar

### Habilitar RLS
Las políticas RLS se crean automáticamente con el SQL. Verificar en:
- Authentication → Policies

## 📧 Configuración de Email (Resend)

1. Crear cuenta en [Resend](https://resend.com)
2. Obtener API key
3. Configurar dominio personalizado
4. Agregar a `.env.local`

## 🔐 Configuración de Google Calendar

1. Ir a [Google Cloud Console](https://console.cloud.google.com)
2. Crear proyecto
3. Habilitar Google Calendar API
4. Crear credenciales (Service Account)
5. Descargar JSON y extraer datos
6. Crear Google Calendar compartido
7. Agregar a `.env.local`

## 🚢 Deployment

### En Vercel (Recomendado)

1. Pushear código a GitHub
2. Conectar repo a Vercel
3. Configurar variables de entorno
4. Deploy automático en cada push

```bash
# Crear repo GitHub y pushear
git remote add origin https://github.com/tuusuario/delixef.git
git branch -M main
git push -u origin main
```

**Ver guía completa:** Consulta `VERCEL_DEPLOYMENT.md` para instrucciones detalladas de despliegue en Vercel, incluyendo:
- Configuración de variables de entorno
- Solución de problemas
- Monitoreo y actualizaciones
- Rollback a versiones anteriores

## 📋 Variables de Entorno Requeridas

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# NextAuth
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# Resend
RESEND_API_KEY=

# Google Calendar
GOOGLE_CALENDAR_API_KEY=
GOOGLE_CALENDAR_ID=

# Admin
ADMIN_EMAIL=
```

## 📱 Páginas Principales

- **Home** (`/`): Página de bienvenida con hero section
- **Servicios** (`/servicios`): Descripción de servicios
- **Reservar** (`/reservar`): Formulario de reserva con calendario
- **Admin** (`/admin`): Dashboard (requiere login)

## 🔒 Autenticación

- **Clientes**: Sin autenticación necesaria para reservar
- **Admin**: NextAuth.js con credenciales almacenados en Supabase

## 🎨 Diseño

- **Colores**: Gold (#D4AF37), Terracotta (#C85A3A), Blanco, Gris oscuro
- **Tipografía**: Playfair Display (títulos), Inter (body)
- **Enfoque**: Lujo minimalista con warmth gastronómico

## 📈 Roadmap Futuro

- [ ] Pagos online integrados
- [ ] Sistema de reviews/testimonios
- [ ] Blog de recetas
- [ ] Galería de fotos
- [ ] Notificaciones SMS
- [ ] Aplicación móvil

## 📝 Licencia

Privado - Proyecto Delixef

## 👤 Autor

Desarrollado para Delixef - Chef Privado en Ibiza

---

**¿Preguntas o sugerencias?** Contacta al equipo de desarrollo.
