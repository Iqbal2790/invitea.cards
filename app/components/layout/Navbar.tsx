import { useState } from "react";
import { useRouteLoaderData } from "react-router";
import { Menu, X, ArrowUpRight, LogOut, LayoutDashboard } from "lucide-react";
import { buildSubdomainUrl, type HostContext } from "../../lib/host";

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Fitur & Layanan", href: "#layanan" },
  { label: "Paket & Harga", href: "#pricing" },
  { label: "Tanya Jawab", href: "#faq" },
  { label: "Template Instan", href: "https://create.invitea.cards", isExternal: true },
  { label: "Wedding Planner", href: "https://plan.invitea.cards", isExternal: true },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

  const rootData = useRouteLoaderData("root") as
    | {
        hostContext?: HostContext;
        user?: { id: string; email?: string; fullName?: string; avatarUrl?: string } | null;
      }
    | undefined;

  const user = rootData?.user;
  const hostContext = rootData?.hostContext;
  const plannerUrl = buildSubdomainUrl("planner", "/", hostContext);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[oklch(96%_0.02_75/0.88)] border-b border-[oklch(85%_0.03_25/0.6)] transition-all duration-300">
      <div className="w-full px-6 sm:px-8 lg:px-12">
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
            {user ? (
              <div className="flex items-center gap-2">
                <a
                  href={plannerUrl}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-black/15 bg-white text-ink text-xs font-semibold hover:border-black/30 hover:bg-[#FAF8F5] transition-all shadow-2xs"
                >
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt=""
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[oklch(38%_0.14_15)] text-white text-[10px] font-bold flex items-center justify-center">
                      {user.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <span>{user.fullName?.split(" ")[0]}</span>
                  <span className="text-[10px] text-[oklch(38%_0.14_15)] font-mono uppercase bg-[oklch(38%_0.14_15)]/10 px-1.5 py-0.5 rounded">
                    Planner ↗
                  </span>
                </a>

                <a
                  href="/auth/logout"
                  title="Keluar dari akun"
                  className="p-2 rounded-full text-[oklch(23%_0.03_40)]/60 hover:text-[oklch(38%_0.14_15)] hover:bg-black/5 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </a>
              </div>
            ) : (
              <a
                href="/auth/login"
                data-ink-btn
                style={{
                  "--ink-bg": "var(--color-berry)",
                  "--ink-text": "var(--color-cream-text)",
                  "--ink-border": "var(--color-berry)",
                } as React.CSSProperties}
                className="ink-btn border border-black text-black bg-transparent rounded-full px-5 py-2 text-sm font-medium tracking-wide active:scale-95"
              >
                <span>Login</span>
              </a>
            )}
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
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 px-3 py-2 bg-white/70 rounded-xl border border-black/10">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt=""
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-[oklch(38%_0.14_15)] text-white text-xs font-bold flex items-center justify-center">
                      {user.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <div className="overflow-hidden">
                    <div className="text-xs font-semibold text-ink truncate">
                      {user.fullName}
                    </div>
                    <div className="text-[10px] text-ink/60 font-mono truncate">
                      {user.email}
                    </div>
                  </div>
                </div>

                <a
                  href={plannerUrl}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[oklch(38%_0.14_15)] text-white text-xs font-semibold shadow-xs"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Buka Wedding Planner</span>
                </a>

                <a
                  href="/auth/logout"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-full border border-black/15 text-ink text-xs font-medium hover:bg-black/5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar dari Akun</span>
                </a>
              </div>
            ) : (
              <a
                href="/auth/login"
                onClick={closeMenu}
                data-ink-btn
                style={{
                  "--ink-bg": "var(--color-berry)",
                  "--ink-text": "var(--color-cream-text)",
                  "--ink-border": "var(--color-berry)",
                } as React.CSSProperties}
                className="ink-btn block w-full text-center border border-black text-black bg-transparent rounded-full py-2.5 text-sm font-medium tracking-wide active:scale-95"
              >
                <span>Login</span>
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
