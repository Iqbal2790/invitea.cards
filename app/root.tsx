import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { SmoothScroll } from "./components/common/SmoothScroll";
import { InkHover } from "./components/common/InkHover";
import { resolveHostContext, type HostContext } from "./lib/host";
import { getAuthUser } from "./lib/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const hostContext = resolveHostContext(hostHeader, url.searchParams);
  const { user } = await getAuthUser(request);

  const isMockDev =
    (url.hostname === "localhost" || url.hostname === "127.0.0.1") &&
    url.searchParams.has("__mock_user");

  const effectiveUser = isMockDev
    ? {
        id: "mock-iqbal-123",
        email: "iqbal.muhammad1040@gmail.com",
        fullName: "Iqbal Muhammad",
        avatarUrl: undefined,
      }
    : user
    ? {
        id: user.id,
        email: user.email,
        fullName:
          (user.user_metadata?.full_name as string) ||
          (user.user_metadata?.name as string) ||
          (user.identities?.[0]?.identity_data?.full_name as string) ||
          (user.identities?.[0]?.identity_data?.name as string) ||
          user.email?.split("@")[0] ||
          "User",
        avatarUrl:
          (user.user_metadata?.avatar_url as string) ||
          (user.user_metadata?.picture as string) ||
          (user.identities?.[0]?.identity_data?.avatar_url as string) ||
          (user.identities?.[0]?.identity_data?.picture as string) ||
          undefined,
      }
    : null;

  return {
    hostContext,
    user: effectiveUser,
  };
}

export const links: Route.LinksFunction = () => [
  { rel: "preload", href: "/images/phone-mockup.webp", as: "image", type: "image/webp" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Google+Sans+Flex:opsz,wght@6..72,400..700&family=Google+Sans+Text:wght@400;500;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("invitea-theme")||"system";var d=t==="dark"||(t==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark");document.documentElement.setAttribute("data-theme","dark");}else{document.documentElement.classList.remove("dark");document.documentElement.setAttribute("data-theme","light");}}catch(e){}})();`,
          }}
        />
        <Meta />
        <Links />
      </head>
      <body className="overflow-x-clip">
        <SmoothScroll />
        <InkHover />
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "Terjadi kendala yang tidak terduga.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "Halaman yang Anda tuju tidak ditemukan."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-24 p-6 container mx-auto text-center">
      <h1 className="font-serif text-4xl font-bold text-black mb-2">{message}</h1>
      <p className="text-black/60 mb-6">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto text-left text-xs bg-black text-white rounded-lg">
          <code>{stack}</code>
        </pre>
      )}
      <a
        href="/"
        className="inline-block mt-4 px-6 py-2 rounded-full bg-[#DE7272] text-white text-sm font-medium hover:bg-[#C85E5E] transition-colors"
      >
        Kembali ke Beranda
      </a>
    </main>
  );
}
