import type { Route } from "./+types/logout";
import { redirect } from "react-router";
import { createClearSessionHeaders } from "../../lib/auth.server";

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") || "/";
  const headers = createClearSessionHeaders(request);
  return redirect(redirectTo, { headers });
}

export async function action({ request }: Route.ActionArgs) {
  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") || "/";
  const headers = createClearSessionHeaders(request);
  return redirect(redirectTo, { headers });
}
