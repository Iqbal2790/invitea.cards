import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("pricing", "routes/pricing.tsx"),
  route("plan/:section?", "routes/plan.tsx"),
  route("auth/login", "routes/auth/login.tsx"),
  route("auth/callback", "routes/auth/callback.tsx"),
  route("auth/logout", "routes/auth/logout.ts"),
] satisfies RouteConfig;
