import { createClient } from "@supabase/supabase-js";

// Helper client untuk browser & edge loader
export function getSupabaseClient(env?: {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_ANON_KEY?: string;
  SUPABASE_URL?: string;
  SUPABASE_ANON_KEY?: string;
}) {
  const url =
    env?.VITE_SUPABASE_URL ||
    env?.SUPABASE_URL ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_URL) ||
    "";

  const key =
    env?.VITE_SUPABASE_ANON_KEY ||
    env?.SUPABASE_ANON_KEY ||
    (typeof import.meta !== "undefined" && import.meta.env?.VITE_SUPABASE_ANON_KEY) ||
    "";

  if (!url || !key) {
    console.warn("Supabase URL atau Anon Key belum dikonfigurasikan di environment.");
  }

  return createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
}

// Client singleton untuk penggunaan di browser
export const supabase = getSupabaseClient();
