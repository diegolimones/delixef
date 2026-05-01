import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables are not configured');
}

// Client for browser-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Client for server-side operations (with service role)
export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

// Types for database
export interface Reserva {
  id: string;
  client_name: string;
  client_email: string;
  client_phone?: string;
  reservation_date: string;
  time_slot: 'desayuno' | 'comida' | 'cena';
  number_of_people: number;
  menu_preference?: string;
  dietary_restrictions?: string;
  special_requests?: string;
  status: 'pendiente' | 'confirmada' | 'cancelada';
  event_type?: string;
  google_calendar_event_id?: string;
  confirmation_token?: string;
  confirmed: boolean;
  confirmed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Menu {
  id: string;
  name: string;
  description?: string;
  category: 'desayuno' | 'comida' | 'cena' | 'evento';
  price?: number;
  image_url?: string;
  ingredients?: string;
  dietary_restrictions?: string;
  available: boolean;
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface Disponibilidad {
  id: string;
  date: string;
  time_slot: 'desayuno' | 'comida' | 'cena';
  max_reservas: number;
  current_reservas: number;
  available: boolean;
  created_at: string;
  updated_at: string;
}

export interface AdminUser {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
  updated_at: string;
}
