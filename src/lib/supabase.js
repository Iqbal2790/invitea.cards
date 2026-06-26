import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase env vars are missing. Please ensure .env.local is configured.');
}

// 1. Supabase Client (untuk Browser/Client-side)
// Ini aman terekspos ke publik dan mengikuti aturan Row Level Security (RLS) di database.
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
);

// 2. Supabase Admin (untuk Server/API Routes)
// Memiliki akses penuh dan mengabaikan RLS. JANGAN PERNAH panggil ini dari client/browser.
export const supabaseAdmin = supabaseServiceKey
  ? createClient(supabaseUrl || '', supabaseServiceKey)
  : null;
