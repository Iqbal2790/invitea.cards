import type { Route } from "./+types/home";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/landing/HeroSection";
import { WorkflowSection } from "../components/landing/WorkflowSection";
import { ShowcaseSection } from "../components/landing/ShowcaseSection";
import { ComparisonSection } from "../components/landing/ComparisonSection";
import { ServicesSection } from "../components/landing/ServicesSection";
import { PricingSection } from "../components/landing/PricingSection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { FaqSection } from "../components/landing/FaqSection";
import { CtaSection } from "../components/landing/CtaSection";
import { resolveHostContext, type HostContext } from "../lib/host";
import { getAuthUser } from "../lib/auth.server";
import { PlannerShell } from "../components/planner/PlannerShell";
import { BuilderShell } from "../components/builder/BuilderShell";
import { CustomDomainShell } from "../components/custom/CustomDomainShell";

export function meta({ matches }: Route.MetaArgs) {
  const homeMatch = matches?.find((m) => m?.id === "routes/home") as
    | { data?: { hostContext?: HostContext } }
    | undefined;
  const type = homeMatch?.data?.hostContext?.type;

  if (type === "planner") {
    return [
      { title: "Wedding Planner Dashboard — Invitea" },
      { name: "description", content: "Pusat kendali persiapan pernikahan: buku tamu, checklist, dan anggaran." },
    ];
  }

  if (type === "builder") {
    return [
      { title: "Template Builder Studio — Invitea" },
      { name: "description", content: "Pilih template dan terbitkan undangan pernikahan digital kalian sekarang." },
    ];
  }

  if (type === "custom") {
    return [
      { title: `Undangan Pernikahan — ${homeMatch?.data?.hostContext?.hostname || "Invitea"}` },
      { name: "description", content: "Undangan pernikahan digital bespoke eksklusif dari Invitea." },
    ];
  }

  return [
    { title: "Undangan Nikah Digital Gratis, Tanpa Login | Invitea" },
    {
      name: "description",
      content:
        "Bikin undangan nikah digital sendiri: pilih template, isi data, salin link, kirim lewat WhatsApp. Gratis, tanpa login. Ada RSVP dan Wedding Planner.",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const hostContext = resolveHostContext(hostHeader, url.searchParams);
  const { user } = await getAuthUser(request);

  return {
    hostContext,
    user: user
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
      : null,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { hostContext, user } = loaderData;

  if (hostContext.type === "planner") {
    return <PlannerShell hostContext={hostContext} user={user} />;
  }

  if (hostContext.type === "builder") {
    return <BuilderShell hostContext={hostContext} />;
  }

  if (hostContext.type === "custom") {
    return <CustomDomainShell hostContext={hostContext} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink selection:bg-pink/30 selection:text-ink overflow-x-clip">
      <Navbar />

      <main className="flex-1 w-full">
        <HeroSection />
        <WorkflowSection />
        <ShowcaseSection />
        <ComparisonSection />
        <ServicesSection />
        <PricingSection />
        <TestimonialsSection />
        <CtaSection />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
