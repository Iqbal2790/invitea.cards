import type { Route } from "./+types/home";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/landing/HeroSection";
import { SocialProofSection } from "../components/landing/SocialProofSection";
import { ShowcaseSection } from "../components/landing/ShowcaseSection";
import { ServicesSection } from "../components/landing/ServicesSection";
import { PricingSection } from "../components/landing/PricingSection";
import { TestimonialsSection } from "../components/landing/TestimonialsSection";
import { FaqSection } from "../components/landing/FaqSection";
import { CtaSection } from "../components/landing/CtaSection";
import { resolveHostContext, type HostContext } from "../lib/host";
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
    { title: "Invitea.cards — Undangan Pernikahan dengan Website & Domain Sendiri" },
    {
      name: "description",
      content:
        "Rayakan hari bahagiamu dengan undangan pernikahan digital yang indah dan bermakna. Setiap detail disiapkan untuk mengabadikan awal perjalanan cinta kalian berdua.",
    },
  ];
}

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const hostContext = resolveHostContext(hostHeader, url.searchParams);
  return { hostContext };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { hostContext } = loaderData;

  if (hostContext.type === "planner") {
    return <PlannerShell hostContext={hostContext} />;
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
        <SocialProofSection />
        <ShowcaseSection />
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
