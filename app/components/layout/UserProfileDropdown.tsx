import { useState, useRef, useEffect } from "react";
import { flushSync } from "react-dom";
import { ChevronDown, LayoutDashboard, PlusCircle, LogOut } from "lucide-react";

interface UserProfileDropdownProps {
  user: {
    id: string;
    email?: string;
    fullName?: string;
    avatarUrl?: string;
  };
  plannerUrl: string;
  builderUrl?: string;
}

type Theme = "light" | "dark" | "system";

function useTheme() {
  const [theme, setThemeState] = useState<Theme>("system");

  useEffect(() => {
    try {
      const saved = (localStorage.getItem("invitea-theme") as Theme) || "system";
      setThemeState(saved);
    } catch {
      // Ignore in restricted environments
    }
  }, []);

  const setTheme = (newTheme: Theme, event?: React.MouseEvent) => {
    if (newTheme === theme) return;

    const applyTheme = () => {
      try {
        flushSync(() => {
          setThemeState(newTheme);
        });
      } catch {
        setThemeState(newTheme);
      }
      try {
        localStorage.setItem("invitea-theme", newTheme);
        const isDark =
          newTheme === "dark" ||
          (newTheme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
        document.documentElement.classList.toggle("dark", isDark);
        document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
      } catch {
        // Ignore
      }
    };

    const doc = document as unknown as {
      startViewTransition?: (cb: () => void) => {
        ready: Promise<void>;
        finished: Promise<void>;
      };
    };

    if (!doc.startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      applyTheme();
      return;
    }

    const rect = event?.currentTarget?.getBoundingClientRect();
    const x = event?.clientX || (rect ? rect.left + rect.width / 2 : window.innerWidth / 2);
    const y = event?.clientY || (rect ? rect.top + rect.height / 2 : window.innerHeight / 2);

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    document.documentElement.style.setProperty("--vt-x", `${x}px`);
    document.documentElement.style.setProperty("--vt-y", `${y}px`);
    document.documentElement.style.setProperty("--vt-r", `${endRadius}px`);
    document.documentElement.classList.add("theme-transitioning");

    const transition = doc.startViewTransition(applyTheme);

    transition.finished.finally(() => {
      document.documentElement.classList.remove("theme-transitioning");
      document.documentElement.style.removeProperty("--vt-x");
      document.documentElement.style.removeProperty("--vt-y");
      document.documentElement.style.removeProperty("--vt-r");
    });
  };

  useEffect(() => {
    if (theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle("dark", e.matches);
      document.documentElement.setAttribute("data-theme", e.matches ? "dark" : "light");
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [theme]);

  return { theme, setTheme };
}

export function UserProfileDropdown({
  user,
  plannerUrl,
  builderUrl = "https://create.invitea.cards",
}: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { theme, setTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside or pressing Escape
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const firstName = user.fullName?.split(" ")[0] || "Akun";
  const initial = user.fullName?.charAt(0).toUpperCase() || "U";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Header Profile Trigger Button (h-11) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menu profil akun"
        className="h-11 pl-2 pr-3.5 py-1.5 rounded-full border border-black/12 dark:border-white/15 bg-white/95 dark:bg-neutral-900 hover:bg-white dark:hover:bg-neutral-800 hover:border-black/25 dark:hover:border-white/25 text-[#2D1E1E] dark:text-white transition-all flex items-center gap-2.5 shadow-2xs cursor-pointer group focus:outline-none focus:ring-2 focus:ring-black/10 dark:focus:ring-white/20"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-black/10 dark:border-white/15 shrink-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
          {user.avatarUrl && !imageError ? (
            <img
              src={user.avatarUrl}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs font-bold text-black dark:text-white font-sans">{initial}</span>
          )}
        </div>

        {/* User Name */}
        <span className="text-sm font-medium text-black dark:text-white max-w-[140px] truncate">
          {firstName}
        </span>

        {/* Caret Chevron */}
        <ChevronDown
          className={`w-4 h-4 text-black/50 dark:text-white/60 group-hover:text-black dark:group-hover:text-white transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-white dark:bg-neutral-900 border border-black/10 dark:border-neutral-800 shadow-xl p-3 z-50 text-black dark:text-white animate-in fade-in zoom-in-95 duration-150">
          {/* User Identity Header */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-black/5 dark:border-white/5 mb-1.5">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-black/10 dark:border-white/10 shrink-0 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              {user.avatarUrl && !imageError ? (
                <img
                  src={user.avatarUrl}
                  alt=""
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-bold text-black dark:text-white font-sans">{initial}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-black dark:text-white truncate">
                {user.fullName || "Pengguna Invitea"}
              </h4>
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono truncate mt-0.5">
                {user.email || ""}
              </p>
            </div>
          </div>

          {/* Core Functional Destinations */}
          <div className="space-y-1 py-1">
            <a
              href={plannerUrl}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-black dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                <span>Wedding Planner</span>
              </div>
              <span className="text-[10px] font-mono text-black dark:text-white bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-semibold">
                Buka ↗
              </span>
            </a>

            <a
              href={builderUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-black dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-4 h-4 text-neutral-500 group-hover:text-black dark:group-hover:text-white transition-colors" />
                <span>Buat Undangan Baru</span>
              </div>
            </a>
          </div>

          {/* Theme Switcher (Hostinger Segmented Control) */}
          <div className="pt-2 pb-1 border-t border-black/8 dark:border-neutral-800">
            <div className="px-3 mb-1.5 flex items-center justify-between">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Tema
              </span>
            </div>
            <div className="mx-1 p-1 bg-neutral-100 dark:bg-neutral-800 rounded-xl grid grid-cols-3 gap-1 text-xs">
              {(["light", "dark", "system"] as const).map((t) => {
                const label = t === "light" ? "Terang" : t === "dark" ? "Gelap" : "Sistem";
                const isActive = theme === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={(e) => setTheme(t, e)}
                    className={`py-1.5 px-2 rounded-lg font-medium transition-all text-center cursor-pointer ${
                      isActive
                        ? "bg-white dark:bg-neutral-700 text-black dark:text-white shadow-xs font-semibold"
                        : "text-neutral-500 dark:text-neutral-400 hover:text-black dark:hover:text-white"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logout Action */}
          <div className="pt-1.5 mt-1 border-t border-black/8 dark:border-neutral-800">
            <a
              href="/auth/logout"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Keluar Akun</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
