import { redirect } from "react-router";
import type { Route } from "./+types/plan";
import { resolveHostContext } from "../lib/host";
import { requireAuthUser, createServerSupabase } from "../lib/auth.server";
import { PlannerShell, type WeddingProject } from "../components/planner/PlannerShell";

export function meta({ data }: Route.MetaArgs) {
  const project = data?.project;
  const title = project
    ? `Planner ${project.groom_name} & ${project.bride_name} — Invitea`
    : "Wedding Planner Dashboard — Invitea";

  return [
    { title },
    {
      name: "description",
      content:
        "Kelola buku tamu, RSVP real-time, checklist persiapan, dan kalkulator anggaran pernikahan kalian di Invitea Wedding Planner.",
    },
  ];
}

export async function loader({ request, params }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const hostContext = resolveHostContext(hostHeader, url.searchParams);

  // Auth Guard: Throws redirect to /auth/login?redirectTo=/plan if unauthenticated
  const { user, tokens } = await requireAuthUser(request, undefined, url.pathname);

  // Initialize server Supabase with user auth context
  const supabase = createServerSupabase(tokens.access_token);

  // Query wedding project for this user
  const { data: project, error: projectError } = await supabase
    .from("wedding_projects")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (projectError) {
    console.error("Error fetching wedding project:", projectError);
  }

  return {
    hostContext,
    user: {
      id: user.id,
      email: user.email,
      fullName:
        (user.user_metadata?.full_name as string) ||
        (user.user_metadata?.name as string) ||
        (user.identities?.[0]?.identity_data?.full_name as string) ||
        (user.identities?.[0]?.identity_data?.name as string) ||
        user.email?.split("@")[0] ||
        "Pengantin",
      avatarUrl:
        (user.user_metadata?.avatar_url as string) ||
        (user.user_metadata?.picture as string) ||
        (user.identities?.[0]?.identity_data?.avatar_url as string) ||
        (user.identities?.[0]?.identity_data?.picture as string) ||
        undefined,
    },
    project: (project as WeddingProject) || null,
    activeSection: params.section || "",
  };
}

export async function action({ request }: Route.ActionArgs) {
  const url = new URL(request.url);
  const { user, tokens } = await requireAuthUser(request, undefined, url.pathname);
  const formData = await request.formData();
  const actionType = formData.get("_action");

  if (actionType === "create_project") {
    const groom_name = String(formData.get("groom_name") || "").trim();
    const bride_name = String(formData.get("bride_name") || "").trim();
    const wedding_date = String(formData.get("wedding_date") || "").trim() || null;
    const wedding_city = String(formData.get("wedding_city") || "").trim();
    const total_budget = Number(formData.get("total_budget")) || 0;

    if (!groom_name || !bride_name) {
      return { error: "Nama pengantin pria dan wanita wajib diisi." };
    }

    const supabase = createServerSupabase(tokens.access_token);
    const { data, error } = await supabase
      .from("wedding_projects")
      .insert({
        user_id: user.id,
        groom_name,
        bride_name,
        wedding_date,
        wedding_city,
        total_budget,
        tier: "paid_template",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating wedding project:", error);
      return { error: error.message };
    }

    return redirect("/plan");
  }

  return { error: "Aksi tidak dikenali." };
}

export default function PlanRoute({ loaderData }: Route.ComponentProps) {
  const { hostContext, user, project, activeSection } = loaderData;

  return (
    <PlannerShell
      hostContext={hostContext}
      user={user}
      project={project}
      activeSection={activeSection}
    />
  );
}
