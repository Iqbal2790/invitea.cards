import { useState } from "react";
import { Link, Form } from "react-router";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Wallet,
  Settings,
  Calendar,
  MapPin,
  Heart,
  ArrowLeft,
  LogOut,
  Moon,
  Sun,
  Sparkles,
  ChevronRight,
  Clock,
  ExternalLink,
  Plus,
  Info,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";
import type { HostContext } from "../../lib/host";
import { buildSubdomainUrl } from "../../lib/host";

export interface WeddingProject {
  id: string;
  user_id: string;
  groom_name: string;
  bride_name: string;
  wedding_date: string | null;
  wedding_city: string;
  tier: string;
  total_budget: number;
  created_at?: string;
  updated_at?: string;
}

export interface PlannerShellProps {
  hostContext: HostContext;
  user: {
    id: string;
    email?: string;
    fullName?: string;
    avatarUrl?: string;
  };
  project: WeddingProject | null;
  activeSection?: string;
  children?: React.ReactNode;
}

function calculateCountdown(dateStr: string | null | undefined): { label: string; days: number; isPast: boolean } {
  if (!dateStr) return { label: "Tanggal belum diatur", days: 0, isPast: false };
  const target = new Date(`${dateStr}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = target.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days > 0) return { label: `H-${days} Hari`, days, isPast: false };
  if (days === 0) return { label: "Hari H! 🎉", days: 0, isPast: false };
  return { label: "Selesai", days: Math.abs(days), isPast: true };
}

function formatRupiah(num: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(num);
}

export function PlannerShell({
  hostContext,
  user,
  project,
  activeSection = "",
  children,
}: PlannerShellProps) {
  const marketingHomeUrl = buildSubdomainUrl("marketing", "/", hostContext);
  const [isDark, setIsDark] = useState(() => {
    if (typeof document !== "undefined") {
      return document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", nextDark);
      document.documentElement.setAttribute("data-theme", nextDark ? "dark" : "light");
      try {
        localStorage.setItem("invitea-theme", nextDark ? "dark" : "light");
      } catch {
        // ignore
      }
    }
  };

  const navItems = [
    { id: "", label: "Ringkasan", href: "/plan", icon: LayoutDashboard },
    { id: "guests", label: "Tamu & RSVP", href: "/plan/guests", icon: Users },
    { id: "checklist", label: "Checklist", href: "/plan/checklist", icon: CheckSquare },
    { id: "budget", label: "Anggaran", href: "/plan/budget", icon: Wallet },
    { id: "settings", label: "Pengaturan", href: "/plan/settings", icon: Settings },
  ];

  // =========================================================================
  // STATE 1: ONBOARDING FORM JIKA BELUM ADA PROJECT
  // =========================================================================
  if (!project) {
    return (
      <div className="min-h-screen bg-[#EBEFF2] dark:bg-[#0B0E11] text-[#14202A] dark:text-[#E8EEF1] flex flex-col font-['Urbanist',sans-serif] relative overflow-hidden transition-colors duration-200">
        {/* Ambient Corbel Gradient Mesh */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
          <div className="absolute top-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full blur-[120px] bg-[#DE7272]/10 dark:bg-[#DE7272]/5" />
          <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[140px] bg-[#FFCED8]/25 dark:bg-[#FFCED8]/5" />
          <div className="absolute bottom-[-15%] left-[10%] w-[60vw] h-[60vw] rounded-full blur-[130px] bg-[#BCD9F2]/20 dark:bg-[#203240]/25" />
        </div>

        {/* Top Minimal Bar */}
        <header className="relative z-10 border-b border-[#14202A]/8 dark:border-white/10 px-4 sm:px-8 py-4 flex items-center justify-between backdrop-blur-md bg-white/70 dark:bg-[#12161A]/80">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-logo text-2xl font-bold tracking-tight text-[#14202A] dark:text-white hover:opacity-80 transition-opacity">
              Invitea<span className="text-[#DE7272] dark:text-[#FFCED8]">.</span>
            </Link>
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#14202A]/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-300">
              Wedding Planner
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Ganti mode tampilan"
              className="w-9 h-9 rounded-full border border-[#14202A]/10 dark:border-white/15 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white bg-white/80 dark:bg-white/5 transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href="/auth/logout"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#14202A]/10 dark:border-white/15 text-xs text-neutral-600 dark:text-neutral-300 hover:text-red-500 hover:border-red-500/30 bg-white/80 dark:bg-white/5 transition-colors font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Keluar</span>
            </a>
          </div>
        </header>

        {/* Center Glass Onboarding Card */}
        <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-xl rounded-[28px] border border-[#14202A]/10 dark:border-white/10 bg-[#FBFCFD]/90 dark:bg-[#161B20]/90 backdrop-blur-xl p-6 sm:p-8 md:p-10 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_24px_48px_-24px_rgba(20,32,42,0.15)] dark:shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_24px_48px_-24px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#DE7272]/10 dark:bg-[#FFCED8]/15 text-[#DE7272] dark:text-[#FFCED8] w-fit text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inisialisasi Wedding Planner</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#14202A] dark:text-white">
              Selamat Datang, {user.fullName || "Pengantin"}!
            </h1>
            <p className="mt-2 text-sm text-[#4C5A65] dark:text-[#A7B3BB] leading-relaxed">
              Masukkan detail dasar acara pernikahan untuk mulai mengelola buku tamu, pantau RSVP live, dan kalkulator anggaran.
            </p>

            <Form method="post" className="mt-6 flex flex-col gap-4 sm:gap-5">
              <input type="hidden" name="_action" value="create_project" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="groom_name" className="text-xs font-bold text-[#14202A] dark:text-neutral-200 uppercase tracking-wider">
                    Nama Mempelai Pria *
                  </label>
                  <input
                    id="groom_name"
                    name="groom_name"
                    type="text"
                    required
                    placeholder="Contoh: Andi"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#14202A]/12 dark:border-white/15 bg-white/70 dark:bg-[#12161A]/80 text-[#14202A] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DE7272] dark:focus:ring-[#FFCED8] transition-all text-sm font-medium"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bride_name" className="text-xs font-bold text-[#14202A] dark:text-neutral-200 uppercase tracking-wider">
                    Nama Mempelai Wanita *
                  </label>
                  <input
                    id="bride_name"
                    name="bride_name"
                    type="text"
                    required
                    placeholder="Contoh: Maya"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#14202A]/12 dark:border-white/15 bg-white/70 dark:bg-[#12161A]/80 text-[#14202A] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DE7272] dark:focus:ring-[#FFCED8] transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wedding_date" className="text-xs font-bold text-[#14202A] dark:text-neutral-200 uppercase tracking-wider">
                    Tanggal Pernikahan *
                  </label>
                  <input
                    id="wedding_date"
                    name="wedding_date"
                    type="date"
                    required
                    className="w-full px-4 py-2.5 rounded-xl border border-[#14202A]/12 dark:border-white/15 bg-white/70 dark:bg-[#12161A]/80 text-[#14202A] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#DE7272] dark:focus:ring-[#FFCED8] transition-all text-sm font-medium [color-scheme:light] dark:[color-scheme:dark]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wedding_city" className="text-xs font-bold text-[#14202A] dark:text-neutral-200 uppercase tracking-wider">
                    Kota Penyelenggaraan
                  </label>
                  <input
                    id="wedding_city"
                    name="wedding_city"
                    type="text"
                    placeholder="Contoh: Banjarmasin"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#14202A]/12 dark:border-white/15 bg-white/70 dark:bg-[#12161A]/80 text-[#14202A] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DE7272] dark:focus:ring-[#FFCED8] transition-all text-sm font-medium"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="total_budget" className="text-xs font-bold text-[#14202A] dark:text-neutral-200 uppercase tracking-wider">
                  Target Pagu Anggaran (Opsional)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs font-bold text-neutral-500 dark:text-neutral-400">
                    Rp
                  </span>
                  <input
                    id="total_budget"
                    name="total_budget"
                    type="number"
                    step="1000000"
                    placeholder="50.000.000"
                    className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-[#14202A]/12 dark:border-white/15 bg-white/70 dark:bg-[#12161A]/80 text-[#14202A] dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DE7272] dark:focus:ring-[#FFCED8] transition-all text-sm font-medium"
                  />
                </div>
                <span className="text-[11px] text-[#5F6D78] dark:text-[#8D9AA3]">
                  Pagu dapat disesuaikan kembali kapan saja di modul kalkulator anggaran.
                </span>
              </div>

              <button
                type="submit"
                className="mt-3 w-full py-3.5 px-6 rounded-full bg-[#14202A] dark:bg-white text-white dark:text-[#0C1216] font-bold text-sm sm:text-base hover:bg-black dark:hover:bg-neutral-100 transition-all shadow-[0_4px_16px_rgba(20,32,42,0.18)] dark:shadow-none active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Buka Dashboard Wedding Planner</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </Form>
          </div>
        </main>
      </div>
    );
  }

  // =========================================================================
  // STATE 2: FULL CORBEL DASHBOARD SHELL UNTUK WEDDING PLANNER
  // =========================================================================
  const countdown = calculateCountdown(project.wedding_date);
  const formattedDate = project.wedding_date
    ? new Date(`${project.wedding_date}T00:00:00`).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Tanggal Belum Diatur";

  // Dummy 31 ticks for Corbel semi-circle arc
  const gaugeTicksCount = 31;
  const gaugeTicks = Array.from({ length: gaugeTicksCount }, (_, t) => {
    const angle = Math.PI - (t / (gaugeTicksCount - 1)) * Math.PI;
    const rInner = t % 5 === 0 ? 113 : 109;
    const x1 = 120 + 104 * Math.cos(angle);
    const y1 = 125 - 104 * Math.sin(angle);
    const x2 = 120 + rInner * Math.cos(angle);
    const y2 = 125 - rInner * Math.sin(angle);
    return (
      <line
        key={t}
        x1={x1.toFixed(1)}
        y1={y1.toFixed(1)}
        x2={x2.toFixed(1)}
        y2={y2.toFixed(1)}
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-[#14202A]/20 dark:text-white/20"
      />
    );
  });

  return (
    <div className="min-h-screen bg-[#EBEFF2] dark:bg-[#0C1014] text-[#14202A] dark:text-[#E8EEF1] flex flex-col font-['Urbanist',sans-serif] relative overflow-x-clip transition-colors duration-200">
      {/* 1. Ambient Corbel Gradient Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[-10%] left-[20%] w-[55vw] h-[55vw] rounded-full blur-[120px] bg-[#DE7272]/10 dark:bg-[#DE7272]/5" />
        <div className="absolute top-[30%] right-[-10%] w-[50vw] h-[50vw] rounded-full blur-[140px] bg-[#FFCED8]/25 dark:bg-[#FFCED8]/5" />
        <div className="absolute bottom-[-15%] left-[10%] w-[60vw] h-[60vw] rounded-full blur-[130px] bg-[#BCD9F2]/20 dark:bg-[#1E2E3D]/30" />
      </div>

      {/* 2. Corbel Top Header Bar */}
      <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/75 dark:bg-[#12161A]/85 border-b border-[#14202A]/8 dark:border-white/10 px-4 sm:px-8 py-3 transition-colors">
        <div className="max-w-[1720px] mx-auto flex items-center justify-between gap-4">
          {/* Brand Mark & Project Info */}
          <div className="flex items-center gap-3 shrink-0">
            <Link to="/plan" className="flex items-center gap-2 group focus:outline-none">
              <div className="w-8 h-8 rounded-xl bg-[#14202A] dark:bg-white text-white dark:text-[#0C1216] flex items-center justify-center font-serif text-base font-bold shadow-xs group-hover:scale-105 transition-transform">
                I.
              </div>
              <div className="flex flex-col">
                <span className="font-logo text-lg font-bold tracking-tight text-[#14202A] dark:text-white leading-none">
                  Invitea<span className="text-[#DE7272] dark:text-[#FFCED8]">.</span>
                </span>
                <span className="text-[10px] font-semibold text-[#5F6D78] dark:text-[#8D9AA3] leading-tight">
                  {project.groom_name} &amp; {project.bride_name}
                </span>
              </div>
            </Link>
          </div>

          {/* Center Tabs with Glass Pill Track (Corbel Primary Navigation) */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center p-1 rounded-full bg-[#14202A]/5 dark:bg-white/10 border border-[#14202A]/6 dark:border-white/10">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#14202A] text-white dark:bg-white dark:text-[#0C1216] shadow-sm"
                        : "text-[#4C5A65] dark:text-[#A7B3BB] hover:text-[#14202A] dark:hover:text-white"
                    }`}
                  >
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Tools: Countdown Chip, Theme Switch, Avatar, Logout */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Live Countdown Badge */}
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DE7272]/12 dark:bg-[#FFCED8]/15 text-[#DE7272] dark:text-[#FFCED8] border border-[#DE7272]/20 dark:border-[#FFCED8]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#DE7272] dark:bg-[#FFCED8] animate-pulse" />
              <span>{countdown.label}</span>
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Ganti tema tampilan"
              className="w-8 h-8 rounded-full border border-[#14202A]/10 dark:border-white/15 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white bg-white/80 dark:bg-white/5 transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full border border-[#14202A]/10 dark:border-white/15 bg-white/80 dark:bg-white/5 text-xs">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt="" className="w-5 h-5 rounded-full object-cover" />
              ) : (
                <div className="w-5 h-5 rounded-full bg-[#14202A] dark:bg-white text-white dark:text-[#0C1216] text-[10px] font-bold flex items-center justify-center">
                  {user.fullName?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <span className="font-bold text-[#14202A] dark:text-white max-w-[120px] truncate hidden md:inline">
                {user.fullName}
              </span>
            </div>

            {/* Exit to Main Web */}
            <a
              href={marketingHomeUrl}
              title="Kembali ke web utama"
              className="w-8 h-8 rounded-full border border-[#14202A]/10 dark:border-white/15 flex items-center justify-center text-neutral-500 hover:text-black dark:hover:text-white bg-white/80 dark:bg-white/5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <a
              href="/auth/logout"
              title="Keluar akun"
              className="w-8 h-8 rounded-full border border-[#14202A]/10 dark:border-white/15 flex items-center justify-center text-neutral-500 hover:text-red-500 bg-white/80 dark:bg-white/5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      {/* 3. Corbel Left Floating Dock (Desktop Only) */}
      <aside
        aria-label="Akses cepat navigasi"
        className="hidden md:flex fixed left-5 top-28 z-30 flex-col gap-2 p-2 rounded-2xl border border-[#14202A]/8 dark:border-white/10 bg-[#FBFCFD]/85 dark:bg-[#161B20]/85 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_14px_30px_-16px_rgba(28,60,82,0.12)] dark:shadow-[0_1px_0_rgba(255,255,255,0.06)_inset,0_16px_36px_-18px_rgba(0,0,0,0.6)]"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <Link
              key={item.id}
              to={item.href}
              title={item.label}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                isActive
                  ? "bg-[#14202A] text-white dark:bg-white dark:text-[#0C1216] shadow-sm"
                  : "text-[#4C5A65] dark:text-[#A7B3BB] hover:text-[#14202A] dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              }`}
            >
              <Icon className="w-4 h-4" />
            </Link>
          );
        })}
      </aside>

      {/* 4. Main Body Workspace */}
      <main className="relative z-10 flex-1 max-w-[1720px] w-full mx-auto px-4 sm:px-8 md:pl-24 lg:pl-28 py-6 pb-28 md:pb-12">
        {/* Sub-header Toolbar (Corbel .db-bar) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#14202A] dark:text-white">
              {activeSection === "" && "Ringkasan Acara"}
              {activeSection === "guests" && "Buku Tamu & RSVP"}
              {activeSection === "checklist" && "Checklist Persiapan"}
              {activeSection === "budget" && "Kalkulator Anggaran"}
              {activeSection === "settings" && "Pengaturan Undangan"}
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#14202A]/6 dark:bg-white/10 text-[#4C5A65] dark:text-[#A7B3BB]">
              Fase 5.1
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#5F6D78] dark:text-[#8D9AA3]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#DE7272] dark:text-[#FFCED8]" />
              <span className="font-bold text-[#14202A] dark:text-neutral-200">{formattedDate}</span>
            </span>
            {project.wedding_city && (
              <>
                <span>•</span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{project.wedding_city}</span>
                </span>
              </>
            )}
            <span>•</span>
            <span className="inline-flex items-center gap-1 font-semibold text-[#22735C] dark:text-[#6FD3B0]">
              <span className="w-2 h-2 rounded-full bg-[#22735C] dark:bg-[#6FD3B0]" />
              <span>Sistem Siap</span>
            </span>
          </div>
        </div>

        {/* Content Area */}
        {children ? (
          children
        ) : (
          /* ===============================================================
             CORBEL GRID CARDS SHELL (SUB-FASE 5.1 FOUNDATION)
             =============================================================== */
          <div className="flex flex-col gap-6">
            {/* Top 4 KPI Cards (Corbel .db-kpis) */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" aria-label="Key wedding figures">
              {/* KPI 1: Tamu (Tile Sky) */}
              <article className="rounded-[22px] p-5 border border-[#D4E4F0]/80 dark:border-[#1E3040] bg-[#EEF5FA]/90 dark:bg-[#131F2A]/90 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_12px_28px_-16px_rgba(28,60,82,0.1)] flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#1D5578] dark:text-[#A9D2F1]">
                  <span>Total Tamu Undangan</span>
                  <Info className="w-3.5 h-3.5 opacity-60" />
                </div>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-3xl font-extrabold text-[#14202A] dark:text-white leading-none">350</p>
                    <p className="text-[11px] font-semibold text-[#4C5A65] dark:text-[#A7B3BB] mt-1">120 Keluarga · 230 Teman</p>
                  </div>
                  {/* Micro mini-bars visual */}
                  <div className="flex items-end gap-1 h-9">
                    <span className="w-2.5 h-4 rounded-xs bg-[#2A6F9A]/40 dark:bg-[#A9D2F1]/40" />
                    <span className="w-2.5 h-7 rounded-xs bg-[#2A6F9A]/70 dark:bg-[#A9D2F1]/70" />
                    <span className="w-2.5 h-9 rounded-xs bg-[#2A6F9A] dark:bg-[#A9D2F1]" />
                  </div>
                </div>
                <Link to="/plan/guests" className="pt-2 border-t border-dashed border-[#14202A]/10 dark:border-white/10 text-xs font-bold text-[#1D5578] dark:text-[#A9D2F1] hover:underline inline-flex items-center gap-1">
                  <span>Kelola Buku Tamu</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </article>

              {/* KPI 2: RSVP (Tile Mint) */}
              <article className="rounded-[22px] p-5 border border-[#D1ECE1]/80 dark:border-[#1C3A2E] bg-[#EDF8F4]/90 dark:bg-[#12241D]/90 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_12px_28px_-16px_rgba(28,60,82,0.1)] flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#22735C] dark:text-[#6FD3B0]">
                  <span>Konfirmasi Hadir (RSVP)</span>
                  <Info className="w-3.5 h-3.5 opacity-60" />
                </div>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-3xl font-extrabold text-[#14202A] dark:text-white leading-none">84%</p>
                    <p className="text-[11px] font-semibold text-[#4C5A65] dark:text-[#A7B3BB] mt-1">210 Hadir · 40 Berhalangan</p>
                  </div>
                  {/* Mini sparkline curve */}
                  <svg className="w-16 h-8 text-[#22735C] dark:text-[#6FD3B0]" viewBox="0 0 64 32" fill="none">
                    <path d="M2 28 C15 26, 20 18, 35 15 C45 12, 52 6, 62 4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="62" cy="4" r="3" fill="currentColor" />
                  </svg>
                </div>
                <Link to="/plan/guests" className="pt-2 border-t border-dashed border-[#14202A]/10 dark:border-white/10 text-xs font-bold text-[#22735C] dark:text-[#6FD3B0] hover:underline inline-flex items-center gap-1">
                  <span>Pantau Respon Live</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </article>

              {/* KPI 3: Checklist (Tile Lemon) */}
              <article className="rounded-[22px] p-5 border border-[#F6ECC0]/80 dark:border-[#38331B] bg-[#FDF9EA]/90 dark:bg-[#252213]/90 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_12px_28px_-16px_rgba(28,60,82,0.1)] flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#85580A] dark:text-[#E8BD62]">
                  <span>Checklist Persiapan</span>
                  <Info className="w-3.5 h-3.5 opacity-60" />
                </div>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-3xl font-extrabold text-[#14202A] dark:text-white leading-none">18 / 32</p>
                    <p className="text-[11px] font-semibold text-[#4C5A65] dark:text-[#A7B3BB] mt-1">56% Tahapan Selesai</p>
                  </div>
                  {/* Mini circular progress */}
                  <div className="relative w-9 h-9">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="currentColor" strokeWidth="3.5" className="text-black/10 dark:text-white/10" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#CF9426" strokeWidth="3.5" strokeDasharray="88" strokeDashoffset="38" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <Link to="/plan/checklist" className="pt-2 border-t border-dashed border-[#14202A]/10 dark:border-white/10 text-xs font-bold text-[#85580A] dark:text-[#E8BD62] hover:underline inline-flex items-center gap-1">
                  <span>Buka Timeline Checklist</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </article>

              {/* KPI 4: Anggaran (Tile Coral) */}
              <article className="rounded-[22px] p-5 border border-[#F7D8D1]/80 dark:border-[#3D2321] bg-[#FDF2EF]/90 dark:bg-[#281817]/90 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_12px_28px_-16px_rgba(28,60,82,0.1)] flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#B1412A] dark:text-[#F2937C]">
                  <span>Pagu Anggaran</span>
                  <Info className="w-3.5 h-3.5 opacity-60" />
                </div>
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <p className="text-2xl font-extrabold text-[#14202A] dark:text-white leading-none">
                      {project.total_budget > 0 ? formatRupiah(project.total_budget) : "Rp 75 Jt"}
                    </p>
                    <p className="text-[11px] font-semibold text-[#4C5A65] dark:text-[#A7B3BB] mt-1">Terpakai: Rp 42,5 Jt (57%)</p>
                  </div>
                  {/* Mini equalizer bars */}
                  <div className="flex items-end gap-1 h-8">
                    <span className="w-1.5 h-3 rounded-full bg-[#DF7659]" />
                    <span className="w-1.5 h-6 rounded-full bg-[#DF7659]" />
                    <span className="w-1.5 h-8 rounded-full bg-[#DF7659]" />
                    <span className="w-1.5 h-5 rounded-full bg-[#DF7659]" />
                  </div>
                </div>
                <Link to="/plan/budget" className="pt-2 border-t border-dashed border-[#14202A]/10 dark:border-white/10 text-xs font-bold text-[#B1412A] dark:text-[#F2937C] hover:underline inline-flex items-center gap-1">
                  <span>Rincian Pengeluaran</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </article>
            </section>

            {/* Mid Grid: Score Gauge Tile (Span 4) + Blueprint Card (Span 8) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Tile Ocean Contrast Card: Wedding Readiness Score (Span 4) */}
              <section className="lg:col-span-4 rounded-[28px] p-6 sm:p-7 border border-[#14202A]/10 dark:border-white/15 bg-[#1F4D6A] dark:bg-[#172129] text-white shadow-[0_1px_0_rgba(255,255,255,0.15)_inset,0_24px_48px_-20px_rgba(20,40,56,0.35)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-bold uppercase tracking-wider text-white/80">Indeks Kesiapan Acara</h2>
                    <span className="text-[11px] font-mono bg-white/15 px-2 py-0.5 rounded-full">Corbel Arc</span>
                  </div>

                  {/* Corbel SVG Needle Gauge */}
                  <div className="relative mt-4 flex flex-col items-center justify-center">
                    <svg viewBox="0 0 240 136" className="w-full max-w-[240px]" role="img" aria-label="Skor Kesiapan Acara">
                      <g>{gaugeTicks}</g>
                      {/* Track background */}
                      <path d="M30 125 A90 90 0 0 1 210 125" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" strokeLinecap="round" />
                      {/* Active score arc (78%) */}
                      <path d="M30 125 A90 90 0 0 1 210 125" fill="none" stroke="#FFCED8" strokeWidth="8" strokeDasharray="283" strokeDashoffset="65" strokeLinecap="round" />
                      {/* Center pivot knob */}
                      <circle cx="120" cy="125" r="8" fill="#FFFFFF" />
                      <circle cx="120" cy="125" r="3" fill="#1F4D6A" />
                    </svg>

                    <div className="text-center -mt-6">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="text-4xl font-extrabold text-white">78</span>
                        <span className="text-xs font-bold text-emerald-300 inline-flex items-center gap-0.5">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>+12%</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-white/70 font-medium">dari total 100 poin persiapan</p>
                    </div>
                  </div>

                  <div className="mt-4 p-3.5 rounded-2xl bg-white/10 border border-white/10 text-xs text-white/90 leading-relaxed">
                    <p className="font-bold text-white mb-0.5">Status: Berjalan Sesuai Jadwal</p>
                    <span>8 checklist H-60 dan konfirmasi vendor utama telah selesai tepat waktu.</span>
                  </div>
                </div>

                <Link
                  to="/plan/checklist"
                  className="mt-5 inline-flex items-center justify-between w-full text-xs font-bold text-white hover:text-[#FFCED8] pt-3 border-t border-white/10 transition-colors"
                >
                  <span>Tingkatkan Skor Kesiapan</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </section>

              {/* Blueprint Card Sub-Fase 5.1 (Span 8) */}
              <section className="lg:col-span-8 rounded-[28px] p-6 sm:p-7 border border-[#14202A]/8 dark:border-white/10 bg-[#FBFCFD]/80 dark:bg-[#161B20]/80 backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_16px_36px_-20px_rgba(28,60,82,0.1)] flex flex-col justify-between">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#14202A]/8 dark:border-white/10">
                    <div>
                      <h2 className="text-xl font-bold tracking-tight text-[#14202A] dark:text-white">
                        Fondasi Shell Planner (Sub-Fase 5.1)
                      </h2>
                      <p className="text-xs text-[#5F6D78] dark:text-[#8D9AA3] mt-0.5">
                        Estetika Corbel Glassmorphism + Responsive Navigation terpasang.
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#DE7272]/10 dark:bg-[#FFCED8]/15 text-[#DE7272] dark:text-[#FFCED8] border border-[#DE7272]/20 dark:border-[#FFCED8]/30 w-fit">
                      Sub-Fase 5.1 Aktif
                    </span>
                  </div>

                  {/* Roadmap Checklist 5.2 - 5.6 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                    <div className="p-3.5 rounded-2xl border border-[#14202A]/8 dark:border-white/10 bg-white/60 dark:bg-white/5 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#14202A] dark:text-white">5.1 Shell &amp; Navigasi</h3>
                        <p className="text-[11px] text-[#5F6D78] dark:text-[#8D9AA3]">Header, dock navigasi, dan onboarding.</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl border border-[#14202A]/8 dark:border-white/10 bg-white/60 dark:bg-white/5 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-[#DE7272]/10 text-[#DE7272] dark:text-[#FFCED8] flex items-center justify-center shrink-0">
                        <Clock className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#14202A] dark:text-white">5.2 Overview Dashboard</h3>
                        <p className="text-[11px] text-[#5F6D78] dark:text-[#8D9AA3]">Interactive chart, timeline &amp; activity log.</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl border border-[#14202A]/8 dark:border-white/10 bg-white/60 dark:bg-white/5 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-neutral-200/60 dark:bg-white/10 text-neutral-500 flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#14202A] dark:text-white">5.3 Manajemen Tamu</h3>
                        <p className="text-[11px] text-[#5F6D78] dark:text-[#8D9AA3]">Buku tamu, RSVP live, dan WA blast generator.</p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl border border-[#14202A]/8 dark:border-white/10 bg-white/60 dark:bg-white/5 flex items-start gap-3">
                      <div className="w-7 h-7 rounded-xl bg-neutral-200/60 dark:bg-white/10 text-neutral-500 flex items-center justify-center shrink-0">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-[#14202A] dark:text-white">5.4 &amp; 5.5 Checklist &amp; Anggaran</h3>
                        <p className="text-[11px] text-[#5F6D78] dark:text-[#8D9AA3]">Timeline H-6 bulan dan kontrol invoice vendor.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#14202A]/8 dark:border-white/10 flex items-center justify-between text-xs text-[#5F6D78] dark:text-[#8D9AA3]">
                  <span>Pagu Anggaran Terdaftar: <strong className="text-[#14202A] dark:text-white">{formatRupiah(project.total_budget)}</strong></span>
                  <Link to="/plan/settings" className="font-bold text-[#14202A] dark:text-white hover:underline inline-flex items-center gap-1">
                    <span>Pengaturan Proyek</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </section>
            </div>
          </div>
        )}
      </main>

      {/* 5. Bottom Floating Dock Navigasi untuk Mobile (Corbel Responsive) */}
      <nav
        aria-label="Navigasi mobile planner"
        className="md:hidden fixed bottom-4 inset-x-4 z-40 bg-[#FBFCFD]/90 dark:bg-[#161B20]/90 backdrop-blur-2xl border border-[#14202A]/10 dark:border-white/15 rounded-full px-3 py-2 shadow-[0_16px_36px_-12px_rgba(20,32,42,0.25)] dark:shadow-[0_16px_36px_-12px_rgba(0,0,0,0.8)] flex items-center justify-around"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <Link
              key={item.id}
              to={item.href}
              className={`flex flex-col items-center gap-0.5 py-1 px-3 rounded-full transition-all ${
                isActive
                  ? "text-[#14202A] dark:text-white font-extrabold"
                  : "text-[#5F6D78] dark:text-[#8D9AA3] hover:text-[#14202A] dark:hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-[#DE7272] dark:text-[#FFCED8]" : ""}`} />
              <span className="text-[9px] font-bold tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
