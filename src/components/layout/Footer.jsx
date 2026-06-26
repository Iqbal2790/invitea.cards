import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t border-border-subtle bg-accent-sand">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand & Tagline */}
          <div className="md:col-span-1 space-y-6">
            <Link href="/" className="inline-block">
              <span className="text-3xl font-serif font-semibold tracking-wide text-brand">
                Invitea.
              </span>
            </Link>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs font-sans">
              Sebarkan momen bahagiamu dengan undangan digital yang cantik, penuh makna, dan mudah dibagikan ke seluruh orang terkasih.
            </p>
          </div>

          {/* Links: Kategori */}
          <div className="space-y-6">
            <h4 className="text-sm font-sans font-semibold tracking-widest text-text-main uppercase">Kategori</h4>
            <ul className="space-y-3 font-sans">
              <li>
                <Link href="/templates?kategori=undangan" className="text-sm text-text-muted hover:text-brand transition-colors">
                  Undangan Pernikahan
                </Link>
              </li>
              <li>
                <Link href="/templates?kategori=ucapan" className="text-sm text-text-muted hover:text-brand transition-colors">
                  Kartu Ucapan
                </Link>
              </li>
            </ul>
          </div>

          {/* Links: Bantuan */}
          <div className="space-y-6">
            <h4 className="text-sm font-sans font-semibold tracking-widest text-text-main uppercase">Bantuan</h4>
            <ul className="space-y-3 font-sans">
              <li>
                <Link href="/#cara-kerja" className="text-sm text-text-muted hover:text-brand transition-colors">
                  Cara Kerja
                </Link>
              </li>
              <li>
                <Link href="/#harga" className="text-sm text-text-muted hover:text-brand transition-colors">
                  Harga
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="text-sm text-text-muted hover:text-brand transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div className="space-y-6">
            <h4 className="text-sm font-sans font-semibold tracking-widest text-text-main uppercase">Hubungi Kami</h4>
            <ul className="space-y-3 font-sans">
              <li className="text-sm text-text-muted">
                WhatsApp: <a href="#" className="hover:text-brand transition-colors">+62 812 3456 7890</a>
              </li>
              <li className="text-sm text-text-muted">
                Email: <a href="mailto:hello@invitea.cards" className="hover:text-brand transition-colors">hello@invitea.cards</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between font-sans">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Invitea. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/admin" className="text-xs text-text-muted hover:text-brand transition-colors">
              Admin Area
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
