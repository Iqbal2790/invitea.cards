import test from "node:test";
import assert from "node:assert/strict";

// 1. Test Host Resolution & Dispatcher
import { resolveHostContext, buildSubdomainUrl } from "../app/lib/host.ts";

test("Host Dispatcher: resolves production subdomains accurately", () => {
  const marketing = resolveHostContext("invitea.cards");
  assert.equal(marketing.type, "marketing");
  assert.equal(marketing.hostname, "invitea.cards");

  const planner = resolveHostContext("plan.invitea.cards");
  assert.equal(planner.type, "planner");
  assert.equal(planner.hostname, "plan.invitea.cards");

  const builder = resolveHostContext("create.invitea.cards");
  assert.equal(builder.type, "builder");
  assert.equal(builder.hostname, "create.invitea.cards");

  const custom = resolveHostContext("andi-maya.my.id");
  assert.equal(custom.type, "custom");
  assert.equal(custom.customDomain, "andi-maya.my.id");
});

test("Host Dispatcher: supports dev simulation via ?__host=", () => {
  const searchParams = new URLSearchParams("__host=plan.invitea.cards");
  const simulated = resolveHostContext("localhost:5173", searchParams);
  assert.equal(simulated.type, "planner");
  assert.equal(simulated.isSimulator, true);
  assert.equal(simulated.hostname, "plan.invitea.cards");
});

test("Subdomain URL Builder: constructs correct targets for prod & dev simulator", () => {
  const prodContext = {
    hostname: "invitea.cards",
    type: "marketing",
    isSimulator: false,
  };

  assert.equal(
    buildSubdomainUrl("planner", "/overview", prodContext),
    "https://plan.invitea.cards/overview",
  );

  const devContext = {
    hostname: "localhost",
    type: "marketing",
    isSimulator: true,
  };

  assert.equal(
    buildSubdomainUrl("planner", "/overview", devContext),
    "/overview?__host=plan.invitea.cards",
  );
});

// 2. Test Live HTTP Endpoints on Dev Server
test("HTTP Endpoints: /auth/login returns 200 with Google OAuth UI", async () => {
  const res = await fetch("http://localhost:5173/auth/login");
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(html.includes("Google"), "Login page must contain Google login action");
  assert.ok(html.includes("form"), "Login page must contain OAuth form");
});

test("HTTP Endpoints: /auth/login direct=google redirects to accounts.google.com with native callback", async () => {
  const res = await fetch("http://localhost:5173/auth/login?direct=google", {
    redirect: "manual",
  });
  assert.equal(res.status, 302);
  const location = res.headers.get("location") || "";
  assert.ok(
    location.startsWith("https://accounts.google.com/o/oauth2/v2/auth"),
    "Must redirect directly to Google OAuth consent",
  );
  assert.ok(
    location.includes("client_id=115720029459-nls4hrgvfh49d0jpl8uh4e3bec4oh48n"),
    "Must pass correct Google Client ID",
  );
  assert.ok(
    location.includes("redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fauth%2Fcallback"),
    "Must pass native callback endpoint to Google",
  );
});

test("HTTP Endpoints: /auth/logout clears session cookies and redirects", async () => {
  const res = await fetch("http://localhost:5173/auth/logout", {
    redirect: "manual",
  });
  assert.equal(res.status, 302);
  assert.equal(res.headers.get("location"), "/");

  const setCookie = res.headers.get("set-cookie") || "";
  assert.ok(setCookie.includes("sb_at="), "Must set sb_at clearing cookie");
  assert.ok(setCookie.includes("Max-Age=0"), "Must expire cookie immediately");
});

test("HTTP Endpoints: /auth/callback provides client hash listener when code omitted", async () => {
  const res = await fetch("http://localhost:5173/auth/callback");
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(
    html.includes("Menghubungkan akun Google") || html.includes("callback"),
    "Should render client listener UI for OAuth tokens",
  );
});

test("HTTP Endpoints: /auth/callback renders error banner when oauth error passed", async () => {
  const res = await fetch(
    "http://localhost:5173/auth/callback?error=access_denied&error_description=Akses+dibatalkan+oleh+pengguna",
  );
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(
    html.includes("Akses dibatalkan oleh pengguna") || html.includes("Gagal"),
    "Should display error description in error container",
  );
});

test("HTTP Endpoints: Multi-tenant host simulator renders Planner on ?__host=plan.invitea.cards", async () => {
  const res = await fetch("http://localhost:5173/?__host=plan.invitea.cards");
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(
    html.includes("Wedding Planner"),
    "Page must render Wedding Planner dashboard header",
  );
  assert.ok(
    html.includes("plan.invitea.cards"),
    "Page must indicate plan.invitea.cards dispatcher context",
  );
});

test("HTTP Endpoints: Multi-tenant host simulator renders Builder on ?__host=create.invitea.cards", async () => {
  const res = await fetch("http://localhost:5173/?__host=create.invitea.cards");
  assert.equal(res.status, 200);
  const html = await res.text();
  assert.ok(
    html.includes("Template Builder"),
    "Page must render Template Builder studio header",
  );
});
