import { createRequestHandler } from "react-router";
import { resolveHostContext } from "../app/lib/host";

const requestHandler = createRequestHandler(
  () => import("virtual:react-router/server-build"),
  import.meta.env.MODE,
);

export default {
  async fetch(request, env, ctx) {
    try {
      const url = new URL(request.url);
      const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host");
      const hostContext = resolveHostContext(hostHeader, url.searchParams);

      // Enrich headers with detected subdomain and host context
      const forwardHeaders = new Headers(request.headers);
      forwardHeaders.set("x-subdomain-type", hostContext.type);
      forwardHeaders.set("x-forwarded-host", hostContext.hostname);

      const hasBody = request.method !== "GET" && request.method !== "HEAD";
      const enrichedRequest = new Request(request.url, {
        method: request.method,
        headers: forwardHeaders,
        body: hasBody ? request.body : undefined,
        // @ts-expect-error duplex is valid in fetch standard
        duplex: hasBody && request.body ? "half" : undefined,
      });

      const response = await requestHandler(enrichedRequest);

      // Defensive Security Headers & Edge Subdomain Dispatch metadata
      const headers = new Headers(response.headers);
      headers.set("X-Content-Type-Options", "nosniff");
      headers.set("X-Frame-Options", "SAMEORIGIN");
      headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
      headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
      headers.set("x-subdomain-type", hostContext.type);

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers,
      });
    } catch (err) {
      console.error("Worker fetch error:", err);
      const message = err instanceof Error ? `${err.name}: ${err.message}\n${err.stack}` : String(err);
      return new Response(`Server Error:\n${message}`, {
        status: 500,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }
  },
} satisfies ExportedHandler<Env>;
