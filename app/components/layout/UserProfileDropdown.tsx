import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  LayoutDashboard,
  PlusCircle,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Heart,
  FolderKanban,
  Check,
} from "lucide-react";

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
  const [activeRole, setActiveRole] = useState<"planner" | "pengantin">("planner");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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
      {/* Profile Trigger Button — Proportional to Header (h-11) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Menu profil akun"
        className="h-11 pl-2 pr-3 py-1.5 rounded-full border border-black/12 bg-white/90 hover:bg-white hover:border-black/25 text-[#2D1E1E] transition-all flex items-center gap-2.5 shadow-2xs cursor-pointer group focus:outline-none focus:ring-2 focus:ring-[#6E182A]/20"
      >
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full overflow-hidden border border-black/10 shrink-0 bg-[#FAF5E9] flex items-center justify-center">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.fullName || "Avatar"}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-xs font-bold text-[#6E182A] font-sans">{initial}</span>
          )}
        </div>

        {/* User Name */}
        <span className="text-sm font-medium text-[#2D1E1E] max-w-[120px] lg:max-w-[160px] truncate">
          {firstName}
        </span>

        {/* Role Icon Mini Badge */}
        <div className="w-5 h-5 rounded-full bg-[#2D1E1E]/5 border border-[#2D1E1E]/10 flex items-center justify-center text-[#2D1E1E]/70 shrink-0">
          {activeRole === "planner" ? (
            <FolderKanban className="w-2.5 h-2.5" />
          ) : (
            <Heart className="w-2.5 h-2.5" />
          )}
        </div>

        {/* Caret Chevron */}
        <ChevronDown
          className={`w-4 h-4 text-[#2D1E1E]/50 group-hover:text-[#2D1E1E] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Popover Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-2xl bg-white border border-black/10 shadow-xl p-4 z-50 text-[#2D1E1E] animate-in fade-in zoom-in-95 duration-150">
          {/* 1. Identity Header */}
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-black/8">
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-semibold text-[#2D1E1E] truncate">
                {user.fullName || "Pengguna Invitea"}
              </h4>
              <p className="text-xs text-[#2D1E1E]/60 font-mono truncate mt-0.5">
                {user.email || ""}
              </p>
            </div>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-black/10 shrink-0 bg-[#FAF5E9] flex items-center justify-center">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-bold text-[#6E182A]">{initial}</span>
              )}
            </div>
          </div>

          {/* 2. Role Status & Switcher (Karir Banua Style) */}
          <div className="py-3 border-b border-black/8">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-[#2D1E1E]/60 font-medium">Peran Akun</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#2D1E1E]/5 text-[#2D1E1E] border border-black/10">
                {activeRole === "planner" ? (
                  <>
                    <FolderKanban className="w-3 h-3 text-[#6E182A]" />
                    <span>Planner</span>
                  </>
                ) : (
                  <>
                    <Heart className="w-3 h-3 text-[#6E182A]" />
                    <span>Pengantin</span>
                  </>
                )}
              </span>
            </div>

            {/* Segmented Control Tray */}
            <div className="grid grid-cols-2 p-1 rounded-xl bg-[#2D1E1E]/5 border border-black/5 gap-1">
              <button
                type="button"
                onClick={() => setActiveRole("pengantin")}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeRole === "pengantin"
                    ? "bg-white text-[#2D1E1E] shadow-2xs font-semibold"
                    : "text-[#2D1E1E]/60 hover:text-[#2D1E1E]"
                }`}
              >
                <Heart className="w-3 h-3" />
                <span>Pengantin</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveRole("planner")}
                className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium transition-all ${
                  activeRole === "planner"
                    ? "bg-white text-[#2D1E1E] shadow-2xs font-semibold"
                    : "text-[#2D1E1E]/60 hover:text-[#2D1E1E]"
                }`}
              >
                <FolderKanban className="w-3 h-3" />
                <span>Planner</span>
              </button>
            </div>
          </div>

          {/* 3. Menu Items Navigation */}
          <div className="py-2 space-y-1">
            <a
              href={plannerUrl}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#2D1E1E] hover:bg-[#FAF5E9]/60 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-[#2D1E1E]/60 group-hover:text-[#6E182A] transition-colors" />
                <span>Dashboard Planner</span>
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
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#2D1E1E] hover:bg-[#FAF5E9]/60 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <PlusCircle className="w-4 h-4 text-[#2D1E1E]/60 group-hover:text-[#6E182A] transition-colors" />
                <span>Buat Undangan Baru</span>
              </div>
            </a>

            <a
              href={`${plannerUrl}?tab=guestbook`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#2D1E1E] hover:bg-[#FAF5E9]/60 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-4 h-4 text-[#2D1E1E]/60 group-hover:text-[#6E182A] transition-colors" />
                <span>Buku Tamu Digital</span>
              </div>
            </a>

            <a
              href={`${plannerUrl}?tab=rsvp`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#2D1E1E] hover:bg-[#FAF5E9]/60 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#2D1E1E]/60 group-hover:text-[#6E182A] transition-colors" />
                <span>Daftar RSVP &amp; Tamu</span>
              </div>
            </a>

            <a
              href={`${plannerUrl}?tab=settings`}
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium text-[#2D1E1E] hover:bg-[#FAF5E9]/60 transition-colors group"
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-[#2D1E1E]/60 group-hover:text-[#6E182A] transition-colors" />
                <span>Pengaturan Akun</span>
              </div>
            </a>
          </div>

          {/* 4. Logout Action (Red / Rose) */}
          <div className="pt-2 mt-1 border-t border-black/8">
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
