import { ArrowUpRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(28%_0.11_15)] text-[oklch(94%_0.02_70)] border-t border-[oklch(38%_0.14_15)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-12">
          {/* Kolom 1: Brand */}
          <div className="space-y-4">
            <a
              href="#hero"
              className="inline-block font-serif text-2xl md:text-3xl font-bold tracking-tight text-[oklch(94%_0.02_70)] hover:text-[oklch(72%_0.09_16)] transition-colors"
            >
              Invitea.
            </a>
            <p className="text-sm leading-relaxed text-[oklch(94%_0.02_70)]/70 max-w-sm">
              Undangan Pernikahan dengan Website &amp; Domain Nama Sendiri. Dibuatkan khusus oleh tim desainer profesional untuk momen sekali seumur hidup.
            </p>
          </div>

          {/* Kolom 2: Fitur & Layanan */}
          <div>
            <h3 className="font-serif text-base font-semibold tracking-wider text-[oklch(72%_0.09_16)] uppercase mb-4">
              Fitur &amp; Layanan
            </h3>
            <ul className="space-y-3 text-sm text-[oklch(94%_0.02_70)]/80">
              <li>
                <a href="#portofolio" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
                  Contoh Undangan
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
                  Paket &amp; Harga
                </a>
              </li>
              <li>
                <a
                  href="https://create.invitea.cards"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[oklch(72%_0.09_16)] transition-colors inline-flex items-center gap-1"
                >
                  <span>Buat Undangan Instan</span>
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
                  <span>Aplikasi Wedding Planner</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a href="#ekosistem" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
                  Keamanan &amp; Tamu Privat
                </a>
              </li>
              <li>
                <a href="#inquiry" className="hover:text-[oklch(72%_0.09_16)] transition-colors">
                  Konsultasi Gratis
                </a>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Kontak & Bantuan */}
          <div>
            <h3 className="font-serif text-base font-semibold tracking-wider text-[oklch(72%_0.09_16)] uppercase mb-4">
              Kontak &amp; Bantuan
            </h3>
            <ul className="space-y-3 text-sm text-[oklch(94%_0.02_70)]/80">
              <li>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Invitea%2C%20saya%20tertarik%20bikin%20undangan%20pernikahan%20dengan%20domain%20sendiri."
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
            Momen istimewa, dirancang sempurna.
          </p>
        </div>
      </div>
    </footer>
  );
}
