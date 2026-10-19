import { useState } from "react";
import { useRouteLoaderData } from "react-router";
import { Menu, X, ArrowUpRight, LogOut, LayoutDashboard } from "lucide-react";
import { buildSubdomainUrl, type HostContext } from "../../lib/host";
import { UserProfileDropdown } from "./UserProfileDropdown";

interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Fitur & Layanan", href: "#layanan" },
  { label: "Paket & Harga", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-black/90 border-b border-black/8 dark:border-white/10 transition-all duration-300">
      <div className="w-full px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Brand Mark & Left-Aligned Desktop Navigation (Rata Kiri) */}
          <div className="flex items-center gap-8 lg:gap-10">
            <a
              href="#hero"
              className="font-logo text-2xl md:text-3xl font-bold tracking-tight text-ink hover:text-berry transition-colors"
            >
              Invitea.
            </a>

            {/* Desktop Navigation (Rata Kiri) */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-7">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.isExternal ? "_blank" : undefined}
                  rel={item.isExternal ? "noopener noreferrer" : undefined}
                  className="nav-link-underline text-black/75 dark:text-white/80 hover:text-black dark:hover:text-white"
                >
                  <span className="inline-flex items-center gap-1">
                    {item.label}
                    {item.isExternal && (
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                    )}
                  </span>
                </a>
              ))}
            </nav>
          </div>

          {/* Right Action Button (Desktop CTA) */}
          <div className="hidden md:flex items-center">
            {user ? (
              <UserProfileDropdown
                user={user}
                plannerUrl={plannerUrl}
                builderUrl="https://create.invitea.cards"
              />
            ) : (
              <a
                href="/auth/login"
                data-ink-btn
                style={{
                  "--ink-bg": "#000000",
                  "--ink-text": "#ffffff",
                  "--ink-border": "#000000",
                } as React.CSSProperties}
                className="ink-btn inline-flex items-center justify-center rounded-full border border-black dark:border-white text-black dark:text-white bg-transparent px-5 py-2 text-sm font-medium tracking-wide active:scale-95"
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
              className="p-2 rounded-lg text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 focus:outline-none transition-colors"
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
        <div className="md:hidden border-t border-black/8 dark:border-white/10 bg-white dark:bg-black px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                onClick={closeMenu}
                className="flex items-center justify-between py-2.5 px-3 rounded-md text-base font-medium text-ink hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
              >
                <span>{item.label}</span>
                {item.isExternal && (
                  <ArrowUpRight className="w-4 h-4 text-ink/60" aria-hidden="true" />
                )}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-black/8 dark:border-white/10">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-white dark:bg-neutral-900 rounded-2xl border border-black/10 dark:border-white/15 shadow-2xs">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-black/10 dark:border-white/15 shrink-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt=""
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-black dark:text-white">
                        {user.fullName?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-sm font-semibold text-ink block truncate">
                      {user.fullName}
                    </span>
                    <div className="text-xs text-ink/60 font-mono truncate mt-0.5">
                      {user.email}
                    </div>
                  </div>
                </div>

                <a
                  href={plannerUrl}
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black text-xs font-semibold shadow-xs hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Buka Wedding Planner</span>
                </a>

                <a
                  href="/auth/logout"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-full border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 text-xs font-medium hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar Akun</span>
                </a>
              </div>
            ) : (
              <a
                href="/auth/login"
                onClick={closeMenu}
                data-ink-btn
                style={{
                  "--ink-bg": "#000000",
                  "--ink-text": "#ffffff",
                  "--ink-border": "#000000",
                } as React.CSSProperties}
                className="ink-btn block w-full text-center border border-black dark:border-white text-black dark:text-white bg-transparent rounded-full py-2.5 text-sm font-medium tracking-wide active:scale-95"
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
