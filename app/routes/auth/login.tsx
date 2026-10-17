import type { Route } from "./+types/login";
import { redirect, Form } from "react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import {
  getAuthUser,
  createServerSupabase,
  createReturnToCookieHeader,
} from "../../lib/auth.server";
import { resolveHostContext, buildSubdomainUrl } from "../../lib/host";

export function meta() {
  return [
    { title: "Masuk ke Invitea — Akun & Wedding Planner" },
    {
      name: "description",
      content: "Masuk dengan akun Google untuk mengelola Wedding Planner dan undangan pernikahan digital Invitea.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const hostContext = resolveHostContext(hostHeader, url.searchParams);

  // 1. If already logged in, redirect straight to intended destination or planner
  const { user } = await getAuthUser(request);
  const returnTo =
    url.searchParams.get("redirectTo") ||
    buildSubdomainUrl("planner", "/", hostContext);

  if (user) {
    throw redirect(returnTo);
  }

  // 2. Direct redirect if ?direct=google is provided
  if (url.searchParams.get("direct") === "google") {
    const callbackOrigin = url.origin;
    const redirectToUrl = `${callbackOrigin}/auth/callback`;

    const supabase = createServerSupabase();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: redirectToUrl,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error || !data?.url) {
      return { error: error?.message || "Gagal memulai sesi Google OAuth" };
    }

    const headers = createReturnToCookieHeader(returnTo, request);
    return redirect(data.url, { headers });
  }

  return { returnTo };
}

export async function action({ request }: Route.ActionArgs) {
  const url = new URL(request.url);
  const formData = await request.formData();
  const returnTo =
    (formData.get("redirectTo") as string) ||
    url.searchParams.get("redirectTo") ||
    "/";

  const callbackOrigin = url.origin;
  const redirectToUrl = `${callbackOrigin}/auth/callback`;

  const supabase = createServerSupabase();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectToUrl,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });

  if (error || !data?.url) {
    return { error: error?.message || "Gagal memulai autentikasi Google" };
  }

  const headers = createReturnToCookieHeader(returnTo, request);
  return redirect(data.url, { headers });
}

export default function LoginPage({ loaderData, actionData }: Route.ComponentProps) {
  const error = actionData?.error;
  const returnTo = loaderData?.returnTo || "/";

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D1E1E] flex flex-col justify-center items-center px-4 py-12 selection:bg-pink-200">
      <div className="w-full max-w-md">
        {/* Top Back Link */}
        <div className="mb-6">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-[#2D1E1E]/70 hover:text-[#2D1E1E] font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Kembali ke Website Utama</span>
          </a>
        </div>

        {/* Login Box */}
        <div className="bg-white rounded-3xl border border-[#2D1E1E]/12 p-8 sm:p-10 shadow-sm">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#6E182A] text-[#FAF5E9] flex items-center justify-center font-serif text-xl font-bold shadow-xs">
              I.
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#2D1E1E] tracking-tight block">
                Invitea.cards
              </span>
              <span className="text-[11px] font-mono text-[#2D1E1E]/60 uppercase tracking-wider block -mt-0.5">
                Akun &amp; Ekosistem
              </span>
            </div>
          </div>

          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D1E1E] tracking-tight mb-2">
            Selamat Datang
          </h1>
          <p className="text-xs sm:text-sm text-[#2D1E1E]/75 leading-relaxed mb-6">
            Masuk dengan akun Google untuk mengakses kontrol Wedding Planner dan mengelola undangan digital kalian.
          </p>

          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 leading-relaxed">
              {error}
            </div>
          )}

          {/* Google Sign-in Action */}
          <Form method="post">
            <input type="hidden" name="redirectTo" value={returnTo} />
            <button
              type="submit"
              data-ink-btn
              className="ink-btn w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl border border-[#2D1E1E]/20 bg-white hover:bg-[#FAF8F5] text-xs sm:text-sm font-semibold text-[#2D1E1E] shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
              style={{ "--ink-bg": "var(--color-berry)" } as React.CSSProperties}
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span className="group-hover:text-cream-text transition-colors">
                Lanjutkan dengan Google
              </span>
            </button>
          </Form>

          {/* Privacy & Trust note */}
          <div className="mt-6 pt-5 border-t border-[#2D1E1E]/10 flex items-center justify-center gap-1.5 text-xs text-[#2D1E1E]/70 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Koneksi aman terenkripsi &amp; tanpa password</span>
          </div>
        </div>
      </div>
    </div>
  );
}
