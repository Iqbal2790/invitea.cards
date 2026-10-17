import type { Route } from "./+types/callback";
import { redirect, useSubmit } from "react-router";
import { useEffect, useState } from "react";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import {
  createServerSupabase,
  createSessionCookieHeaders,
  parseCookies,
  RETURN_TO_COOKIE_NAME,
  getGoogleOAuthCredentials,
  exchangeGoogleCodeForTokens,
} from "../../lib/auth.server";

export function meta() {
  return [{ title: "Memverifikasi Masuk — Invitea" }];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const errorDescription =
    url.searchParams.get("error_description") || url.searchParams.get("error");

  if (errorDescription) {
    return { error: errorDescription };
  }

  if (code) {
    const { clientId, clientSecret } = getGoogleOAuthCredentials();
    let callbackOrigin = url.origin;
    if (
      url.hostname === "127.0.0.1" ||
      url.hostname === "localhost" ||
      url.hostname === "::1" ||
      url.hostname === "[::1]"
    ) {
      callbackOrigin = `http://localhost:${url.port || "5173"}`;
    }
    const redirectToUrl = `${callbackOrigin}/auth/callback`;

    let accessToken: string | null = null;
    let refreshToken: string | null = null;

    // 1. Try Native Edge direct exchange with Google Token API
    const googleTokens = await exchangeGoogleCodeForTokens({
      code,
      clientId,
      clientSecret,
      redirectUri: redirectToUrl,
    });

    if (googleTokens.id_token) {
      // Authenticate with Supabase via verified Google ID token
      const supabase = createServerSupabase();
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: googleTokens.id_token,
        access_token: googleTokens.access_token,
      });

      if (error || !data?.session) {
        return {
          error: error?.message || "Gagal memvalidasi token Google dengan Supabase.",
        };
      }

      accessToken = data.session.access_token;
      refreshToken = data.session.refresh_token;
    } else {
      // 2. Fallback: Check if code was issued directly by Supabase PKCE flow
      const supabase = createServerSupabase();
      const { data, error } = await supabase.auth.exchangeCodeForSession(code);

      if (error || !data?.session) {
        return {
          error:
            googleTokens.error ||
            error?.message ||
            "Gagal menukar kode otentikasi dengan sesi aktif.",
        };
      }

      accessToken = data.session.access_token;
      refreshToken = data.session.refresh_token;
    }

    const state = url.searchParams.get("state");
    const cookies = parseCookies(request);
    const returnTo = state || cookies[RETURN_TO_COOKIE_NAME] || "/";

    const sessionHeaders = createSessionCookieHeaders(
      {
        access_token: accessToken,
        refresh_token: refreshToken,
      },
      request,
    );

    // Clear the temporary return_to cookie
    const hostname = url.hostname.toLowerCase();
    const isProd = hostname.endsWith("invitea.cards");
    const domainFlag = isProd ? "; Domain=.invitea.cards" : "";
    sessionHeaders.append(
      "Set-Cookie",
      `${RETURN_TO_COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0${domainFlag}`,
    );

    return redirect(returnTo, { headers: sessionHeaders });
  }

  // If no code in query params, it might be in URL hash fragment (handled client-side)
  return { waitingHash: true };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const accessToken = formData.get("access_token") as string;
  const refreshToken = formData.get("refresh_token") as string;
  const returnTo = (formData.get("return_to") as string) || "/";

  if (!accessToken || !refreshToken) {
    return { error: "Token tidak lengkap pada respons otentikasi." };
  }

  const sessionHeaders = createSessionCookieHeaders(
    {
      access_token: accessToken,
      refresh_token: refreshToken,
    },
    request,
  );

  return redirect(returnTo, { headers: sessionHeaders });
}

export default function CallbackPage({ loaderData, actionData }: Route.ComponentProps) {
  const [clientError, setClientError] = useState<string | null>(null);
  const error = actionData?.error || loaderData?.error || clientError;

  useEffect(() => {
    if (typeof window === "undefined" || error) return;

    // 1. Check for hash parameters (#access_token=... or #error=...)
    if (window.location.hash) {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);

      const errorDesc = params.get("error_description") || params.get("error");
      if (errorDesc) {
        setClientError(decodeURIComponent(errorDesc.replace(/\+/g, " ")));
        return;
      }

      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (accessToken && refreshToken) {
        const formData = new FormData();
        formData.append("access_token", accessToken);
        formData.append("refresh_token", refreshToken);
        formData.append("return_to", "/");

        fetch("/auth/callback", {
          method: "POST",
          body: formData,
        })
          .then(() => {
            // Once the cookies are set via Set-Cookie headers, replace URL to clear JWT from address bar
            window.location.replace("/");
          })
          .catch((err) => {
            setClientError(err?.message || "Koneksi terputus saat verifikasi sesi.");
          });
        return;
      }
    }
  }, [error]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] text-[#2D1E1E] flex flex-col justify-center items-center px-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#2D1E1E]/10 p-8 shadow-xs text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-[#2D1E1E] mb-2">
            Gagal Masuk
          </h1>
          <p className="text-xs sm:text-sm text-[#2D1E1E]/70 leading-relaxed mb-6">
            {error}
          </p>
          <a
            href="/auth/login"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#6E182A] text-[#FAF5E9] text-xs font-semibold hover:bg-[#521220] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Halaman Masuk</span>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D1E1E] flex flex-col justify-center items-center px-4 py-12">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-[#6E182A] animate-spin" />
        <span className="font-serif text-lg font-bold text-[#2D1E1E]">
          Menghubungkan Akun Google...
        </span>
        <span className="text-xs text-[#2D1E1E]/60">
          Mohon tunggu sebentar selagi kami menyiapkan sesi aman kalian.
        </span>
      </div>
    </div>
  );
}
