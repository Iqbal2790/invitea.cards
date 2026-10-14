import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(28%_0.11_15)] text-[oklch(94%_0.02_70)] border-t border-[oklch(38%_0.14_15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-12">
          {/* Kolom 1: Brand (Spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <a
              href="#hero"
              className="inline-block font-serif text-2xl md:text-3xl font-bold tracking-tight text-[oklch(94%_0.02_70)] hover:text-[oklch(72%_0.09_16)] transition-colors"
            >
              Invitea.
            </a>
            <p className="text-sm leading-relaxed text-[oklch(94%_0.02_70)]/70 max-w-sm">
              Bespoke Wedding Invitation &amp; Digital Experience. Merancang undangan pernikahan kustom
              eksklusif dengan domain pribadi dan integrasi ekosistem wedding planner.
            </p>
          </div>

          {/* Kolom 2: Layanan Bespoke */}
          <div>
            <h3 className="font-serif text-base font-semibold tracking-wider text-[oklch(72%_0.09_16)] uppercase mb-4">
              Layanan Bespoke
            </h3>
            <ul className="space-y-3 text-sm text-[oklch(94%_0.02_70)]/80">
              <li>
                <a href="#portofolio" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
                  Portofolio Kustom
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
                  Paket Domain Bundling
                </a>
              </li>
              <li>
                <a href="#inquiry" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
                  Form Konsultasi Desain
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Ekosistem Invitea */}
          <div>
            <h3 className="font-serif text-base font-semibold tracking-wider text-[oklch(72%_0.09_16)] uppercase mb-4">
              Ekosistem Invitea
            </h3>
            <ul className="space-y-3 text-sm text-[oklch(94%_0.02_70)]/80">
              <li>
                <a
                  href="https://create.invitea.cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[oklch(72%_0.09_16)] transition-colors inline-flex items-center gap-1"
                >
                  <span>Instant Template Builder</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://plan.invitea.cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[oklch(72%_0.09_16)] transition-colors inline-flex items-center gap-1"
                >
                  <span>Wedding Planner Hub</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="#ekosistem" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
                  Guest List &amp; RSVP Sync
                </a>
              </li>
              <li>
                <a href="#ekosistem" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
                  Private Gatekeeper
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Kontak & Bantuan */}
          <div>
            <h3 className="font-serif text-base font-semibold tracking-wider text-[oklch(72%_0.09_16)] uppercase mb-4">
              Kontak &amp; Bantuan
            </h3>
            <ul className="space-y-3 text-sm text-[oklch(94%_0.02_70)]/80">
              <li>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20tertarik%20dengan%20undangan%20bespoke."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[oklch(72%_0.09_16)] transition-colors inline-flex items-center gap-1"
                >
                  <span>WhatsApp Official Invitea</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="#inquiry" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
                  Panduan &amp; Pertanyaan Umum (FAQ)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[oklch(38%_0.14_15)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[oklch(94%_0.02_70)]/60">
          <p>© {currentYear} Invitea.cards. All rights reserved.</p>
          <p className="font-serif italic tracking-wide text-[oklch(94%_0.02_70)]/70">
            Crafted for unforgettable moments.
          </p>
        </div>
      </div>
    </footer>
  );
}
