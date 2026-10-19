import { useState } from "react";
import {
  LayoutTemplate,
  PenLine,
  Share2,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  MessageCircle,
} from "lucide-react";

interface StepItem {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: typeof LayoutTemplate;
  linkText?: string;
  linkHref?: string;
  isExternal?: boolean;
}

const STEPS: StepItem[] = [
  {
    id: "step-1",
    step: "Langkah 1 · Pilih",
    title: "Pilih template",
    description: "Lihat dulu semua template undangan, lalu pilih yang paling cocok buat acaramu.",
    icon: LayoutTemplate,
    linkText: "Lihat contoh undangan",
    linkHref: "#katalog",
    isExternal: false,
  },
  {
    id: "step-2",
    step: "Langkah 2 · Isi",
    title: "Isi data",
    description: "Isi data acaramu, seperti nama, tanggal, dan lokasi. Bisa langsung mulai tanpa login.",
    icon: PenLine,
    linkText: "Mulai bikin undangan",
    linkHref: "https://create.invitea.cards",
    isExternal: true,
  },
  {
    id: "step-3",
    step: "Langkah 3 · Sebar",
    title: "Undangan siap disebar",
    description: "Link undangan tinggal kamu salin dan kirim lewat WhatsApp. Kamu yang pilih mau kirim ke siapa dan kapan.",
    icon: Share2,
  },
];

export function WorkflowSection() {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="alur" className="relative w-full py-16 sm:py-20 md:py-24 bg-[#FAF9F7] border-t border-black/8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header (OpenDesign-style Kicker + Headline) */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <p className="text-xs sm:text-sm font-mono font-semibold uppercase tracking-wider text-berry mb-2">
            Alur 3 Langkah · Mulai Gratis
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-ink tracking-tight leading-[1.15]">
            Dari pilih template, sampai undangan siap disebar.
          </h2>
        </div>

        {/* Two-Column Split Layout (OpenDesign Architecture) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: Interactive Step Selector Tabs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {STEPS.map((item, idx) => {
              const isActive = activeStep === idx;
              const Icon = item.icon;

              return (
                <div
                  key={item.id}
                  onClick={() => setActiveStep(idx)}
                  className={`relative rounded-2xl transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#2D1E1E] text-white p-6 sm:p-7 shadow-lg shadow-black/10 ring-1 ring-black/20"
                      : "bg-white/60 hover:bg-white text-ink border border-black/6 hover:border-black/15 p-5 sm:p-6"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className={`font-serif text-xl sm:text-2xl font-semibold tracking-tight ${
                        isActive ? "text-white" : "text-ink"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? "bg-white/10 text-white" : "bg-black/4 text-ink/60"
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                  </div>

                  {/* Expanded description on active state */}
                  {isActive && (
                    <div className="mt-3 text-sm text-white/80 leading-relaxed font-sans">
                      <p>{item.description}</p>

                      {item.linkText && item.linkHref && (
                        <div className="mt-4 pt-3 border-t border-white/15">
                          <a
                            href={item.linkHref}
                            target={item.isExternal ? "_blank" : undefined}
                            rel={item.isExternal ? "noopener noreferrer" : undefined}
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-pink hover:text-white transition-colors"
                          >
                            <span>{item.linkText}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Inactive collapsed subtle hint */}
                  {!isActive && (
                    <p className="mt-1 text-xs sm:text-sm text-ink-soft line-clamp-1 font-sans">
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Visual Preview Container (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative w-full rounded-3xl bg-[#FAF5E9]/60 border border-black/10 p-5 sm:p-8 shadow-sm overflow-hidden min-h-[420px] sm:min-h-[480px] flex flex-col justify-center">
              {/* Dummy Window Header */}
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-black/8 text-xs font-mono text-ink/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-black/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-black/15" />
                  <div className="w-2.5 h-2.5 rounded-full bg-black/15" />
                  <span className="ml-2 font-medium">create.invitea.cards</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded bg-black/5 text-ink/60">
                  Preview Studio (Dummy)
                </span>
              </div>

              {/* Step 1 Dummy: Template Gallery Preview */}
              {activeStep === 0 && (
                <div className="w-full space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-ink">
                        Pilih Desain Tema
                      </h4>
                      <p className="text-xs text-ink-soft">
                        10+ template siap pakai untuk berbagai konsep pernikahan
                      </p>
                    </div>
                    <span className="text-xs font-mono text-berry font-medium px-2 py-1 rounded bg-berry/10">
                      Kategori: Botanical
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {/* Dummy Template Cards */}
                    <div className="group relative rounded-xl border-2 border-berry bg-white p-3 shadow-xs">
                      <div className="aspect-3/4 rounded-lg bg-pink/20 border border-berry/20 flex flex-col items-center justify-center p-2 text-center">
                        <span className="text-[10px] font-mono text-berry font-bold uppercase">Terpilih</span>
                        <p className="font-serif text-sm font-semibold text-ink mt-1">Royal Flora</p>
                        <span className="text-[9px] text-ink-soft">Watercolor Maroon</span>
                      </div>
                      <p className="mt-2 text-xs font-medium text-ink truncate">Royal Flora</p>
                      <span className="text-[10px] text-berry font-semibold">Gratis</span>
                    </div>

                    <div className="rounded-xl border border-black/10 bg-white p-3 opacity-75 hover:opacity-100 transition-opacity">
                      <div className="aspect-3/4 rounded-lg bg-[#FAF9F7] border border-black/8 flex flex-col items-center justify-center p-2 text-center">
                        <p className="font-serif text-sm font-semibold text-ink">Minimalist Zinc</p>
                        <span className="text-[9px] text-ink-soft">Monochrome Clean</span>
                      </div>
                      <p className="mt-2 text-xs font-medium text-ink truncate">Minimalist Zinc</p>
                      <span className="text-[10px] text-ink-soft">Gratis</span>
                    </div>

                    <div className="hidden sm:block rounded-xl border border-black/10 bg-white p-3 opacity-75 hover:opacity-100 transition-opacity">
                      <div className="aspect-3/4 rounded-lg bg-[#F5EFEB] border border-black/8 flex flex-col items-center justify-center p-2 text-center">
                        <p className="font-serif text-sm font-semibold text-ink">Earthy Rust</p>
                        <span className="text-[9px] text-ink-soft">Warm Terracotta</span>
                      </div>
                      <p className="mt-2 text-xs font-medium text-ink truncate">Earthy Rust</p>
                      <span className="text-[10px] text-ink-soft">Gratis</span>
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setActiveStep(1)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-berry text-white text-xs font-semibold hover:bg-berry/90 transition-all shadow-2xs"
                    >
                      <span>Pakai Template Ini</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2 Dummy: Editor Form Builder Preview */}
              {activeStep === 1 && (
                <div className="w-full space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-lg font-semibold text-ink">
                        Editor Data Mempelai & Acara
                      </h4>
                      <p className="text-xs text-ink-soft">
                        Isi form sederhana, hasil undangan langsung ter-generate
                      </p>
                    </div>
                    <span className="text-[11px] font-mono text-emerald-700 font-semibold px-2 py-0.5 rounded bg-emerald-50 border border-emerald-200">
                      Auto-Save Aktif
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-black/10">
                    <div>
                      <label className="block text-[11px] font-semibold text-ink mb-1">
                        Nama Mempelai Pria
                      </label>
                      <div className="px-3 py-1.5 rounded-lg border border-black/15 bg-black/2 text-xs text-ink font-medium">
                        Aditya Pratama, S.T.
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-ink mb-1">
                        Nama Mempelai Wanita
                      </label>
                      <div className="px-3 py-1.5 rounded-lg border border-black/15 bg-black/2 text-xs text-ink font-medium">
                        Nadia Paramitha, S.Ked.
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-ink mb-1">
                        Tanggal Akad & Resepsi
                      </label>
                      <div className="px-3 py-1.5 rounded-lg border border-black/15 bg-black/2 text-xs text-ink font-medium">
                        Sabtu, 24 Oktober 2026
                      </div>
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-ink mb-1">
                        Lokasi Acara
                      </label>
                      <div className="px-3 py-1.5 rounded-lg border border-black/15 bg-black/2 text-xs text-ink font-medium">
                        Grand Ballroom Hotel Banjarmasin
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-ink-soft">
                      *Bisa revisi sewaktu-waktu tanpa batas
                    </span>
                    <button
                      type="button"
                      onClick={() => setActiveStep(2)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-berry text-white text-xs font-semibold hover:bg-berry/90 transition-all shadow-2xs"
                    >
                      <span>Simpan & Buat Tautan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 Dummy: Share & WhatsApp Distribution Preview */}
              {activeStep === 2 && (
                <div className="w-full space-y-4">
                  <div>
                    <h4 className="font-serif text-lg font-semibold text-ink">
                      Undangan Selesai & Siap Disebar
                    </h4>
                    <p className="text-xs text-ink-soft">
                      Salin tautan resmi atau bagikan langsung dengan teks WhatsApp terformat
                    </p>
                  </div>

                  {/* Copy Link Bar */}
                  <div className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-black/10">
                    <div className="flex-1 truncate font-mono text-xs text-ink px-2">
                      https://invitea.cards/adit-nadia
                    </div>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black text-white text-xs font-semibold hover:bg-black/80 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Tersalin!" : "Salin Link"}</span>
                    </button>
                  </div>

                  {/* WhatsApp Simulation Box */}
                  <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-3.5">
                    <div className="flex items-center gap-2 mb-2 text-emerald-800 text-xs font-semibold">
                      <MessageCircle className="w-4 h-4 text-emerald-600" />
                      <span>Format Pesan WhatsApp Siap Kirim</span>
                    </div>
                    <p className="text-xs text-emerald-950/80 leading-relaxed font-sans bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                      "Kepada Yth. Bapak/Ibu/Sahabat, tanpa mengurangi rasa hormat, kami bermaksud mengundang Anda ke pernikahan kami:
                      <br />
                      👉 <strong>invitea.cards/adit-nadia?to=NamaTamu</strong>
                      <br />
                      Terima kasih atas doa dan restunya."
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-ink-soft">
                      Support fitur nama tamu personal (?to=Nama)
                    </span>
                    <a
                      href="https://create.invitea.cards"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-berry text-white text-xs font-semibold hover:bg-berry/90 transition-all shadow-2xs"
                    >
                      <span>Bikin Undanganmu Sekarang</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
