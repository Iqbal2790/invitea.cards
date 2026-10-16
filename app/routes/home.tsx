import type { Route } from "./+types/home";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/landing/HeroSection";
import { SocialProofSection } from "../components/landing/SocialProofSection";
import { ShowcaseSection } from "../components/landing/ShowcaseSection";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Invitea.cards — Undangan Pernikahan dengan Website & Domain Sendiri" },
    {
      name: "description",
      content:
        "Rayakan hari bahagiamu dengan undangan pernikahan digital yang indah dan bermakna. Setiap detail disiapkan untuk mengabadikan awal perjalanan cinta kalian berdua.",
    },
  ];
}

export function loader() {
  return {};
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-bg text-ink selection:bg-pink/30 selection:text-ink overflow-x-clip">
      <Navbar />

      <main className="flex-1 w-full">
        <HeroSection />
        <SocialProofSection />
        <ShowcaseSection />
      </main>

      <Footer />
    </div>
  );
}
