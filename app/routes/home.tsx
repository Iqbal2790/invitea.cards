import type { Route } from "./+types/home";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Invitea.cards — Undangan Pernikahan Mewah dengan Domain Sendiri" },
    {
      name: "description",
      content:
        "Bikin website undangan pernikahan mewah dengan domain nama sendiri. Dibuatkan langsung oleh tim desainer, bukan template pasaran.",
    },
  ];
}

export function loader() {
  return {};
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[oklch(96%_0.02_75)] text-[oklch(23%_0.03_40)] selection:bg-[oklch(72%_0.09_16)]/30 selection:text-[oklch(23%_0.03_40)]">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[oklch(84%_0.05_18)] bg-[oklch(91%_0.03_20)] text-[oklch(38%_0.14_15)] text-xs font-medium tracking-widest uppercase">
            <span>Fase 4.1 — Layout Shell</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[oklch(23%_0.03_40)]">
            Undangan Pernikahan Mewah dengan Website &amp; Domain Nama Sendiri
          </h1>
          <p className="text-sm sm:text-base text-[oklch(40%_0.03_35)] max-w-lg mx-auto leading-relaxed">
            Fondasi desain dan navigasi aktif. Siap untuk integrasi modul konten Hero &amp; Penawaran (Fase 4.2).
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
