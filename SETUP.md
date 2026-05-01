# Delixef - Setup Guide

## Supabase Setup

1. Create a new project at https://supabase.com
2. Get your URL and API keys from Project Settings
3. Copy the SQL from `database.sql` and paste it into the SQL Editor in Supabase
4. Execute the SQL to create tables, indexes, and RLS policies
5. Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

## Development Environment

1. Install dependencies: `npm install`
2. Create `.env.local` with your configuration (see `.env.local` file)
3. Start dev server: `npm run dev`
4. Open http://localhost:3000

## Database Tables

- **admin_users**: Admin account credentials and info
- **menus**: Available menu items for different meal types
- **disponibilidad**: Available dates/times for reservations
- **reservas**: Client reservations

All tables have RLS policies for security.

## Environment Variables

Required in `.env.local`:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `RESEND_API_KEY`
- `GOOGLE_CALENDAR_API_KEY`
- `GOOGLE_CALENDAR_ID`
