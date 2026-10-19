import { useState, useRef, useEffect } from "react";
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

export function UserProfileDropdown({
  user,
  plannerUrl,
  builderUrl = "https://create.invitea.cards",
}: UserProfileDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
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
        className="h-11 pl-2 pr-3.5 py-1.5 rounded-full border border-black/12 bg-white/95 hover:bg-white hover:border-black/25 text-[#2D1E1E] transition-all flex items-center gap-2.5 shadow-2xs cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#6E182A]/20"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-black/10 shrink-0 bg-neutral-100 flex items-center justify-center">
          {user.avatarUrl && !imageError ? (
            <img
              src={user.avatarUrl}
              alt=""
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs font-bold text-black font-sans">{initial}</span>
          )}
        </div>

        {/* User Name */}
        <span className="text-sm font-medium text-black max-w-[140px] truncate">
          {firstName}
        </span>

        {/* Caret Chevron */}
        <ChevronDown
          className={`w-4 h-4 text-black/50 group-hover:text-black transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-2xl bg-white border border-black/10 shadow-xl p-3 z-50 text-black animate-in fade-in zoom-in-95 duration-150">
          {/* User Identity Header */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-neutral-50 border border-black/5 mb-1.5">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-black/10 shrink-0 bg-neutral-100 flex items-center justify-center">
              {user.avatarUrl && !imageError ? (
                <img
                  src={user.avatarUrl}
                  alt=""
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-bold text-black font-sans">{initial}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-[#2D1E1E] truncate">
                {user.fullName || "Pengguna Invitea"}
              </h4>
              <p className="text-[11px] text-[#2D1E1E]/60 font-mono truncate mt-0.5">
                {user.email || ""}
              </p>
            </div>
          </div>

          {/* Core Functional Destinations */}
          <div className="space-y-1 py-1">
            <a
              href={plannerUrl}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[#2D1E1E] hover:bg-[#FAF5E9]/80 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-[#2D1E1E]/60 group-hover:text-[#6E182A] transition-colors" />
                <span>Wedding Planner</span>
              </div>
              <span className="text-[10px] font-mono text-[#6E182A] bg-[#6E182A]/10 px-1.5 py-0.5 rounded font-semibold">
                Buka ↗
              </span>
            </a>

            <a
              href={builderUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-[#2D1E1E] hover:bg-[#FAF5E9]/80 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-4 h-4 text-[#2D1E1E]/60 group-hover:text-[#6E182A] transition-colors" />
                <span>Buat Undangan Baru</span>
              </div>
            </a>
          </div>

          {/* Logout Action */}
          <div className="pt-1.5 mt-1 border-t border-black/8">
            <a
              href="/auth/logout"
              className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium text-rose-600 hover:bg-rose-50 transition-colors"
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
