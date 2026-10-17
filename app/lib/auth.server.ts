import { createClient, type User } from "@supabase/supabase-js";
import { redirect } from "react-router";

export const ACCESS_COOKIE_NAME = "sb_at";
export const REFRESH_COOKIE_NAME = "sb_rt";
export const RETURN_TO_COOKIE_NAME = "sb_return_to";

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface AuthSession {
  user: User;
  tokens: AuthTokens;
}

/**
 * Parses raw Cookie header into key-value pairs
 */
export function parseCookies(request: Request): Record<string, string> {
  const cookieHeader = request.headers.get("Cookie") || "";
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  for (const part of cookieHeader.split(";")) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx > 0) {
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim();
      try {
        cookies[key] = decodeURIComponent(val);
      } catch {
        cookies[key] = val;
      }
    }
  }
  return cookies;
}

/**
 * Builds Set-Cookie headers for session tokens.
 * In production (`invitea.cards`), sets Domain=.invitea.cards so session is shared across subdomains.
 */
export function createSessionCookieHeaders(
  tokens: AuthTokens,
  request: Request,
): Headers {
  const headers = new Headers();
  const url = new URL(request.url);
  const isHttps = url.protocol === "https:";
  const hostname = url.hostname.toLowerCase();
  const isProductionDomain = hostname.endsWith("invitea.cards");

  const domainFlag = isProductionDomain ? "; Domain=.invitea.cards" : "";
  const secureFlag = isHttps || isProductionDomain ? "; Secure" : "";
  // 30 days expiry
  const baseFlags = `Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000${domainFlag}${secureFlag}`;

  headers.append(
    "Set-Cookie",
    `${ACCESS_COOKIE_NAME}=${encodeURIComponent(tokens.access_token)}; ${baseFlags}`,
  );
  headers.append(
    "Set-Cookie",
    `${REFRESH_COOKIE_NAME}=${encodeURIComponent(tokens.refresh_token)}; ${baseFlags}`,
  );

  return headers;
}

/**
 * Builds Set-Cookie headers to clear the session cookies upon logout
 */
export function createClearSessionHeaders(request: Request): Headers {
  const headers = new Headers();
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();
  const isProductionDomain = hostname.endsWith("invitea.cards");

  const domainFlag = isProductionDomain ? "; Domain=.invitea.cards" : "";
  const baseFlags = `Path=/; HttpOnly; SameSite=Lax; Max-Age=0${domainFlag}`;

  headers.append("Set-Cookie", `${ACCESS_COOKIE_NAME}=; ${baseFlags}`);
  headers.append("Set-Cookie", `${REFRESH_COOKIE_NAME}=; ${baseFlags}`);
  headers.append("Set-Cookie", `${RETURN_TO_COOKIE_NAME}=; ${baseFlags}`);

  return headers;
}

/**
 * Builds Set-Cookie header for temporary oauth return_to destination (10 mins expiry)
 */
export function createReturnToCookieHeader(returnTo: string, request: Request): Headers {
  const headers = new Headers();
  const url = new URL(request.url);
  const hostname = url.hostname.toLowerCase();
  const isProductionDomain = hostname.endsWith("invitea.cards");
  const domainFlag = isProductionDomain ? "; Domain=.invitea.cards" : "";
  const baseFlags = `Path=/; HttpOnly; SameSite=Lax; Max-Age=600${domainFlag}`;

  headers.append("Set-Cookie", `${RETURN_TO_COOKIE_NAME}=${encodeURIComponent(returnTo)}; ${baseFlags}`);
  return headers;
}

/**
 * Creates an edge-compatible stateless Supabase server client
 */
export function createServerSupabase(
  accessToken?: string,
  env?: Record<string, string | undefined>,
) {
  const supabaseUrl =
    env?.VITE_SUPABASE_URL ||
    env?.SUPABASE_URL ||
    (typeof import.meta !== "undefined" ? import.meta.env?.VITE_SUPABASE_URL : undefined) ||
    "https://uldbknkgnpisayqweklt.supabase.co";

  const supabaseAnonKey =
    env?.VITE_SUPABASE_ANON_KEY ||
    env?.SUPABASE_ANON_KEY ||
    (typeof import.meta !== "undefined" ? import.meta.env?.VITE_SUPABASE_ANON_KEY : undefined) ||
    "";

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
    global: {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    },
  });
}

/**
 * Retrieves the currently authenticated user by reading and validating the HttpOnly cookie.
 * Automatically refreshes the session if the access token has expired.
 */
export async function getAuthUser(
  request: Request,
  env?: Record<string, string | undefined>,
): Promise<{
  user: User | null;
  tokens: AuthTokens | null;
  headers?: Headers;
}> {
  const cookies = parseCookies(request);
  const accessToken = cookies[ACCESS_COOKIE_NAME];
  const refreshToken = cookies[REFRESH_COOKIE_NAME];

  if (!accessToken && !refreshToken) {
    return { user: null, tokens: null };
  }

  const supabase = createServerSupabase(accessToken, env);

  // Attempt 1: Validate active access token
  if (accessToken) {
    try {
      const { data, error } = await supabase.auth.getUser(accessToken);
      if (data?.user && !error) {
        return {
          user: data.user,
          tokens: {
            access_token: accessToken,
            refresh_token: refreshToken || "",
          },
        };
      }
    } catch {
      // Continue to refresh token fallback
    }
  }

  // Attempt 2: Token expired, attempt refresh via refresh token
  if (refreshToken) {
    try {
      const { data: refreshData, error: refreshError } =
        await supabase.auth.refreshSession({
          refresh_token: refreshToken,
        });

      if (refreshData?.session && refreshData?.user && !refreshError) {
        const newTokens: AuthTokens = {
          access_token: refreshData.session.access_token,
          refresh_token: refreshData.session.refresh_token,
        };
        const headers = createSessionCookieHeaders(newTokens, request);
        return {
          user: refreshData.user,
          tokens: newTokens,
          headers,
        };
      }
    } catch {
      // Refresh failed
    }
  }

  return { user: null, tokens: null };
}

/**
 * Route Guard helper: Throws redirect to login if unauthenticated
 */
export async function requireAuthUser(
  request: Request,
  env?: Record<string, string | undefined>,
  redirectTo?: string,
): Promise<{ user: User; tokens: AuthTokens }> {
  const { user, tokens } = await getAuthUser(request, env);

  if (!user || !tokens) {
    const url = new URL(request.url);
    const destination = redirectTo || `${url.pathname}${url.search}`;
    const loginUrl = `/auth/login?redirectTo=${encodeURIComponent(destination)}`;
    throw redirect(loginUrl);
  }

  return { user, tokens };
}
