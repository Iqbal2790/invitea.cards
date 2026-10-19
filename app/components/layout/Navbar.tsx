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
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-black/8 transition-all duration-300">
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
                  className="text-sm font-medium text-ink/75 hover:text-ink transition-colors inline-flex items-center gap-1"
                >
                  <span>{item.label}</span>
                  {item.isExternal && (
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                  )}
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
                className="inline-flex items-center justify-center rounded-full border border-black/20 text-black hover:bg-black hover:text-white px-5 py-2 text-sm font-medium tracking-wide transition-all duration-150 active:scale-95"
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
              className="p-2 rounded-lg text-black hover:bg-black/5 focus:outline-none transition-colors"
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
        <div className="md:hidden border-t border-black/8 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-1">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.isExternal ? "_blank" : undefined}
                rel={item.isExternal ? "noopener noreferrer" : undefined}
                onClick={closeMenu}
                className="flex items-center justify-between py-2.5 px-3 rounded-md text-base font-medium text-ink hover:bg-black/5 transition-colors"
              >
                <span>{item.label}</span>
                {item.isExternal && (
                  <ArrowUpRight className="w-4 h-4 text-ink/60" aria-hidden="true" />
                )}
              </a>
            ))}
          </nav>

          <div className="pt-2 border-t border-black/8">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-black/10 shadow-2xs">
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-black/10 shrink-0 bg-[#FAF5E9] flex items-center justify-center">
                    {user.avatarUrl ? (
                      <img
                        src={user.avatarUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm font-bold text-[#9929EA]">
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
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-black text-white text-xs font-semibold shadow-xs hover:bg-neutral-800 transition-colors"
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Buka Wedding Planner</span>
                </a>

                <a
                  href="/auth/logout"
                  onClick={closeMenu}
                  className="flex items-center justify-center gap-1.5 w-full py-2 rounded-full border border-rose-200 text-rose-600 text-xs font-medium hover:bg-rose-50 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar Akun</span>
                </a>
              </div>
            ) : (
              <a
                href="/auth/login"
                onClick={closeMenu}
                className="block w-full text-center border border-black/20 text-black hover:bg-black hover:text-white rounded-full py-2.5 text-sm font-medium tracking-wide transition-all duration-150 active:scale-95"
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
