import { Globe, ChevronDown, ArrowUpRight } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Undangan Kustom",
    links: [
      { label: "Contoh Undangan", href: "#portofolio" },
      { label: "Konsultasi Gratis", href: "#inquiry" },
      { label: "Domain Nama Sendiri", href: "#fitur" },
      { label: "Protokol Tamu VIP", href: "#ekosistem" },
    ],
  },
  {
    title: "Ekosistem & Aplikasi",
    links: [
      { label: "Buat Undangan Instan", href: "https://create.invitea.cards", isExternal: true },
      { label: "Aplikasi Wedding Planner", href: "https://plan.invitea.cards", isExternal: true },
      { label: "Private Gatekeeper WA", href: "#ekosistem" },
      { label: "Paket & Harga", href: "#pricing" },
    ],
  },
  {
    title: "Bantuan & Panduan",
    links: [
      { label: "Pusat Bantuan", href: "#inquiry" },
      { label: "Tanya Jawab (FAQ)", href: "#inquiry" },
      { label: "Panduan Format Undangan", href: "#panduan" },
      { label: "Panduan Memilih Paket", href: "#pricing" },
    ],
  },
  {
    title: "Hubungi Kami",
    links: [
      {
        label: "WhatsApp Desainer",
        href: "https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20tertarik%20konsultasi%20undangan%20pernikahan.",
        isExternal: true,
      },
      { label: "Jadwal Konsultasi", href: "#inquiry" },
      { label: "Kemitraan Wedding Organizer", href: "#kemitraan" },
    ],
  },
];

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.32a6.34 6.34 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.6a6.34 6.34 0 0 0 10.82 4.48c1.69-1.69 1.69-4.2 1.69-6.41V8.5a8.27 8.27 0 0 0 4.08 1.19V6.69z" />
    </svg>
  );
}

function WhatsAppIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function YouTubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[oklch(28%_0.11_15)] text-[oklch(94%_0.02_70)] border-t border-[oklch(38%_0.14_15)]">
      {/* Tier 1 & 2: Wrapper Konten Solid */}
      <div className="relative z-10 w-full bg-[oklch(28%_0.11_15)] px-6 sm:px-8 lg:px-12 shadow-2xl pt-10 sm:pt-12">
        {/* Tier 1: Navigasi Multi-Kolom */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 pb-8 sm:pb-10">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="font-serif text-xs font-semibold uppercase tracking-wider text-[oklch(72%_0.09_16)]">
                {column.title}
              </h3>
              <ul className="space-y-3 text-sm text-[oklch(94%_0.02_70)]/80">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className="hover:text-[oklch(72%_0.09_16)] transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>{link.label}</span>
                      {link.isExternal && (
                        <ArrowUpRight
                          className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                          aria-hidden="true"
                        />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Tier 2: Options & Legal Bar */}
        <div className="py-5 sm:py-6 border-t border-[oklch(38%_0.14_15)] flex flex-col xl:flex-row items-center justify-between gap-6 text-xs text-[oklch(94%_0.02_70)]/80">
          {/* Kiri: Selector Wilayah */}
          <div className="flex items-center gap-2 text-xs font-medium text-[oklch(94%_0.02_70)]/90 hover:text-[oklch(72%_0.09_16)] cursor-pointer transition-colors group">
            <Globe className="w-4 h-4 text-[oklch(72%_0.09_16)]" aria-hidden="true" />
            <span>Indonesia (ID)</span>
            <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:translate-y-0.5 transition-transform" aria-hidden="true" />
          </div>

          {/* Tengah: Baris Copyright & Tautan Hukum */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-1.5 text-center text-xs text-[oklch(94%_0.02_70)]/75">
            <span>© {currentYear} Invitea. Hak cipta dilindungi undang-undang.</span>
            <span className="hidden sm:inline opacity-40">/</span>
            <a href="#privasi" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
              Kebijakan Privasi
            </a>
            <span className="opacity-40">/</span>
            <a href="#syarat" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
              Syarat &amp; Ketentuan
            </a>
            <span className="opacity-40">/</span>
            <a href="#sitemap" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
              Peta Situs
            </a>
            <span className="opacity-40">/</span>
            <a href="#cookies" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
              Pengaturan Cookie
            </a>
          </div>

          {/* Kanan: Tautan Ikon Media Sosial */}
          <div className="flex items-center gap-4 text-[oklch(94%_0.02_70)]/80">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-[oklch(72%_0.09_16)] transition-colors p-1"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="hover:text-[oklch(72%_0.09_16)] transition-colors p-1"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20tertarik%20konsultasi%20undangan%20pernikahan."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-[oklch(72%_0.09_16)] transition-colors p-1"
            >
              <WhatsAppIcon className="w-4 h-4" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="hover:text-[oklch(72%_0.09_16)] transition-colors p-1"
            >
              <YouTubeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Tier 3: Wordmark Container */}
      <div
        className="relative z-0 w-full bg-[oklch(28%_0.11_15)] border-t border-[oklch(38%_0.14_15)]/40 flex items-center justify-center select-none pointer-events-none pt-4 sm:pt-6 pb-6 sm:pb-8"
        aria-hidden="true"
      >
        <svg
          viewBox="0 -700 2750 740"
          className="w-full h-auto block select-none pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <text
            x="0"
            y="0"
            className="font-serif font-bold fill-[oklch(94%_0.02_70)] tracking-tight"
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              letterSpacing: "-0.025em",
              fontSize: "1000px",
            }}
          >
            Invitea.
          </text>
        </svg>
      </div>
    </footer>
  );
}
