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

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Manrope:wght@300;400;500;600;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="overflow-x-clip">
        <SmoothScroll />
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
      <h1 className="font-serif text-4xl font-bold text-[oklch(23%_0.03_40)] mb-2">{message}</h1>
      <p className="text-[oklch(40%_0.03_35)] mb-6">{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto text-left text-xs bg-[oklch(28%_0.11_15)] text-[oklch(94%_0.02_70)] rounded-lg">
          <code>{stack}</code>
        </pre>
      )}
      <a
        href="/"
        className="inline-block mt-4 px-6 py-2 rounded-full bg-[oklch(58%_0.13_15)] text-[oklch(94%_0.02_70)] text-sm font-medium hover:bg-[oklch(38%_0.14_15)] transition-colors"
      >
        Kembali ke Beranda
      </a>
    </main>
  );
}
