import { createClient } from "@supabase/supabase-js";

// Klien publik (dengan anon key) - Tunduk pada RLS
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

// Klien admin (dengan service role key) - Mem-bypass RLS (Khusus Server)
// PENTING: Jangan pernah import `supabaseAdmin` di komponen client-side!
export const supabaseAdmin = typeof window === 'undefined'
  ? createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || "",
      process.env.SUPABASE_SERVICE_ROLE_KEY || "",
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  : null;
