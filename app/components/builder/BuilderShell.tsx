import { Palette, Sparkles, ArrowRight, ArrowLeft, Check, Layers } from "lucide-react";
import type { HostContext } from "../../lib/host";
import { buildSubdomainUrl } from "../../lib/host";

interface BuilderShellProps {
  hostContext: HostContext;
}

const TEMPLATES = [
  {
    slug: "retro-vintage",
    name: "Retro Vintage",
    category: "Vintage",
    tag: "Paling Populer",
    description: "Nuansa hangat memori analog dengan frame polaroid dan tipografi klasik.",
  },
  {
    slug: "ivory-line",
    name: "Ivory Line",
    category: "Minimalist",
    tag: "Elegan",
    description: "Garis struktural bersih dengan palet warm cream dan aksen emas understated.",
  },
  {
    slug: "folia-bloom",
    name: "Folia Bloom",
    category: "Floral",
    tag: "Romantis",
    description: "Ilustrasi botani cat air mawar dan dedaunan lembut untuk momen sakral.",
  },
];

export function BuilderShell({ hostContext }: BuilderShellProps) {
  const marketingHomeUrl = buildSubdomainUrl("marketing", "/", hostContext);

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#2D1E1E] flex flex-col font-sans selection:bg-pink-200">
      {/* Top Bar / Subdomain Indicator Banner */}
      <div className="bg-[#2D1E1E] text-[#FAF5E9] text-xs py-2 px-4 sm:px-6 flex items-center justify-between border-b border-black/10">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono uppercase tracking-wider text-[11px] text-cream-text/80">
            Subdomain Dispatcher:
          </span>
          <code className="font-mono bg-white/10 px-2 py-0.5 rounded text-amber-200 text-[11px]">
            create.invitea.cards
          </code>
        </div>
        <a
          href={marketingHomeUrl}
          className="inline-flex items-center gap-1 text-[11px] text-cream-text/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Kembali ke Website Utama</span>
        </a>
      </div>

      {/* Main Builder Header */}
      <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#2D1E1E]/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#6E182A] text-[#FAF5E9] flex items-center justify-center font-serif text-lg font-bold shadow-xs">
              I.
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2D1E1E]">
                  Template Builder
                </h1>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#6E182A]/10 text-[#6E182A]">
                  Studio
                </span>
              </div>
              <p className="text-xs text-[#2D1E1E]/60 -mt-0.5">
                Pilih desain dan terbitkan undanganmu dalam hitungan menit
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-10">
        <div className="mb-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#6E182A]/10 text-[#6E182A] mb-3">
            <Palette className="w-3.5 h-3.5" />
            <span>Katalog Desain Siap Pakai</span>
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D1E1E] tracking-tight">
            Pilih Konsep Undangan Favorit Kalian
          </h2>
          <p className="text-xs sm:text-sm text-[#2D1E1E]/70 mt-1 max-w-2xl">
            Seluruh template sudah dilengkapi audio player musik latar, integrasi Google Maps, hitung mundur hari-H, dan buku tamu RSVP otomatis.
          </p>
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.slug}
              className="rounded-3xl border border-[#2D1E1E]/10 bg-white overflow-hidden shadow-2xs hover:shadow-md hover:border-[#6E182A]/40 transition-all flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#6E182A] bg-[#6E182A]/10 px-2.5 py-0.5 rounded-full">
                    {tmpl.tag}
                  </span>
                  <span className="text-xs text-[#2D1E1E]/50 font-mono">
                    {tmpl.category}
                  </span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#2D1E1E] mb-1.5">
                  {tmpl.name}
                </h3>
                <p className="text-xs text-[#2D1E1E]/70 leading-relaxed">
                  {tmpl.description}
                </p>
              </div>

              <div className="p-6 pt-0">
                <button
                  type="button"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-full bg-[#6E182A] text-[#FAF5E9] text-xs font-semibold hover:bg-[#521220] transition-colors"
                >
                  <span>Gunakan Template Ini</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
