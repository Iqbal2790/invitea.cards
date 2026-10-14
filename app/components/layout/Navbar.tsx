import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Portofolio Bespoke", href: "#portofolio" },
  { label: "Paket & Harga", href: "#pricing" },
  { label: "Fitur Ekosistem", href: "#ekosistem" },
  { label: "Template Instan", href: "https://create.invitea.cards", isExternal: true },
  { label: "Wedding Planner", href: "https://plan.invitea.cards", isExternal: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(96%_0.02_75/0.88)] border-b border-[oklch(85%_0.03_25/0.6)] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Mark */}
          <a
            href="#hero"
            className="font-serif text-2xl md:text-3xl font-bold tracking-tight text-[oklch(23%_0.03_40)] hover:text-[oklch(38%_0.14_15)] transition-colors"
          >
            Invitea.
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                className="text-sm font-medium text-[oklch(40%_0.03_35)] hover:text-[oklch(23%_0.03_40)] transition-colors inline-flex items-center gap-1"
              >
                <span>{item.label}</span>
                {item.isExternal && (
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                )}
              </a>
            ))}
          </nav>

          {/* Right Action Button (Desktop CTA) */}
          <div className="hidden md:flex items-center">
            <a
              href="#inquiry"
              className="bg-[oklch(58%_0.13_15)] text-[oklch(94%_0.02_70)] hover:bg-[oklch(38%_0.14_15)] transition-colors rounded-full px-5 py-2 text-sm font-medium tracking-wide shadow-xs"
            >
              Konsultasi Desain
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Tutup menu" : "Buka menu"}
              className="p-2 rounded-lg text-[oklch(23%_0.03_40)] hover:bg-[oklch(84%_0.05_18)]/30 focus:outline-none transition-colors"
            >
              {isOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer / Dropdown */}
      {isOpen && (
        <div className="md:hidden border-t border-[oklch(84%_0.05_18)] bg-[oklch(96%_0.02_75)] px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                onClick={closeMenu}
                className="flex items-center justify-between py-2.5 px-3 rounded-md text-base font-medium text-[oklch(23%_0.03_40)] hover:bg-[oklch(84%_0.05_18)]/25 transition-colors"
              >
                <span>{item.label}</span>
                {item.isExternal && (
                  <ArrowUpRight className="w-4 h-4 text-[oklch(40%_0.03_35)]" aria-hidden="true" />
                )}
              </a>
            ))}
          </nav>
          <div className="pt-2 border-t border-[oklch(84%_0.05_18)]/40">
            <a
              href="#inquiry"
              onClick={closeMenu}
              className="block w-full text-center bg-[oklch(58%_0.13_15)] text-[oklch(94%_0.02_70)] hover:bg-[oklch(38%_0.14_15)] transition-colors rounded-full py-2.5 text-sm font-medium tracking-wide shadow-xs"
            >
              Konsultasi Desain
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
