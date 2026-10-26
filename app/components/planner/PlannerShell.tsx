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

  if (days > 0) return { label: `H-${days} Hari Menuju Hari H`, days, isPast: false };
  if (days === 0) return { label: "Hari H Pernikahan Bahagia! 🎉", days: 0, isPast: false };
  return { label: "Acara Telah Berlangsung", days: Math.abs(days), isPast: true };
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
  // STATE 1: JIKA USER BELUM MEMILIKI WEDDING PROJECT -> ONBOARDING FLOW
  // =========================================================================
  if (!project) {
    return (
      <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#000000] text-black dark:text-white flex flex-col font-sans transition-colors duration-200">
        {/* Top Header Ringkas */}
        <header className="border-b border-black/8 dark:border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between bg-white dark:bg-[#0A0A0A]">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-logo text-2xl font-bold tracking-tight text-black dark:text-white hover:opacity-80 transition-opacity">
              Invitea<span className="text-[#DE7272] dark:text-[#FFCED8]">.</span>
            </Link>
            <span className="hidden sm:inline-block text-[11px] uppercase font-mono px-2.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-300 font-medium">
              Wedding Planner
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Ganti mode tampilan"
              className="w-8 h-8 rounded-full border border-black/10 dark:border-white/15 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href="/auth/logout"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/15 text-xs text-neutral-600 dark:text-neutral-300 hover:text-red-500 hover:border-red-500/30 transition-colors font-medium"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </a>
          </div>
        </header>

        {/* Card Onboarding Tengah (Anti-Slop: Flat Surface, Clean Elevation) */}
        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
          <div className="w-full max-w-xl rounded-3xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#121212] p-6 sm:p-8 md:p-10 shadow-sm">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#DE7272]/10 dark:bg-[#FFCED8]/15 text-[#DE7272] dark:text-[#FFCED8] w-fit text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Inisialisasi Proyek Pernikahan</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight">
              Selamat Datang, {user.fullName || "Pengantin"}!
            </h1>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Sebelum mulai mengelola buku tamu dan anggaran, masukkan detail dasar acara pernikahan kalian.
            </p>

            <Form method="post" className="mt-6 flex flex-col gap-4 sm:gap-5">
              <input type="hidden" name="_action" value="create_project" />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="groom_name" className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                    Nama Mempelai Pria *
                  </label>
                  <input
                    id="groom_name"
                    name="groom_name"
                    type="text"
                    required
                    placeholder="Contoh: Andi"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-[#FAFAFA] dark:bg-[#1A1A1A] text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DE7272] dark:focus:ring-[#FFCED8] transition-all text-sm"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="bride_name" className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                    Nama Mempelai Wanita *
                  </label>
                  <input
                    id="bride_name"
                    name="bride_name"
                    type="text"
                    required
                    placeholder="Contoh: Maya"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-[#FAFAFA] dark:bg-[#1A1A1A] text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DE7272] dark:focus:ring-[#FFCED8] transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wedding_date" className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                    Tanggal Pernikahan *
                  </label>
                  <input
                    id="wedding_date"
                    name="wedding_date"
                    type="date"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-[#FAFAFA] dark:bg-[#1A1A1A] text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-[#DE7272] dark:focus:ring-[#FFCED8] transition-all text-sm [color-scheme:light] dark:[color-scheme:dark]"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wedding_city" className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                    Kota Penyelenggaraan
                  </label>
                  <input
                    id="wedding_city"
                    name="wedding_city"
                    type="text"
                    placeholder="Contoh: Banjarmasin"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-[#FAFAFA] dark:bg-[#1A1A1A] text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DE7272] dark:focus:ring-[#FFCED8] transition-all text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="total_budget" className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                  Target Alokasi Anggaran (Opsional)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-neutral-500 dark:text-neutral-400">
                    Rp
                  </span>
                  <input
                    id="total_budget"
                    name="total_budget"
                    type="number"
                    step="1000000"
                    placeholder="50.000.000"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-black/15 dark:border-white/15 bg-[#FAFAFA] dark:bg-[#1A1A1A] text-black dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DE7272] dark:focus:ring-[#FFCED8] transition-all text-sm"
                  />
                </div>
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Dapat disesuaikan kapan saja di modul kontrol anggaran.
                </span>
              </div>

              <button
                type="submit"
                className="mt-2 w-full py-3 px-6 rounded-full bg-[#DE7272] dark:bg-[#FFCED8] text-white dark:text-black font-semibold text-sm sm:text-base hover:bg-[#C85E5E] dark:hover:bg-[#E8B4C0] transition-colors shadow-xs active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer"
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
  // STATE 2: PROJECT SUDAH ADA -> FULL PLANNER SHELL
  // =========================================================================
  const countdown = calculateCountdown(project.wedding_date);
  const formattedDate = project.wedding_date
    ? new Date(`${project.wedding_date}T00:00:00`).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Tanggal Belum Diatur";

  return (
    <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#000000] text-black dark:text-white flex flex-col font-sans transition-colors duration-200">
      {/* 1. Global Top Banner: Subdomain context & Back to main web */}
      <div className="bg-neutral-950 text-neutral-300 text-xs py-2 px-4 sm:px-6 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono uppercase tracking-wider text-[11px] text-neutral-400">
            Wedding Planner:
          </span>
          <span className="font-mono bg-white/10 px-2 py-0.5 rounded text-white text-[11px] font-semibold">
            {project.groom_name} &amp; {project.bride_name}
          </span>
        </div>

        <a
          href={marketingHomeUrl}
          className="inline-flex items-center gap-1.5 text-[11px] text-neutral-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Kembali ke Website Utama</span>
        </a>
      </div>

      {/* 2. Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-black/8 dark:border-white/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-[1580px] mx-auto flex items-center justify-between gap-4">
          {/* Sisi Kiri: Brand + Pasangan + Countdown */}
          <div className="flex items-center gap-4 sm:gap-6 min-w-0">
            <Link
              to="/plan"
              className="flex items-center gap-2 shrink-0 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-serif text-lg font-bold shadow-xs group-hover:scale-105 transition-transform">
                I.
              </div>
              <div className="hidden md:block">
                <span className="font-logo text-xl font-bold tracking-tight text-black dark:text-white">
                  Invitea<span className="text-[#DE7272] dark:text-[#FFCED8]">.</span>
                </span>
                <span className="block text-[10px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400 -mt-1">
                  Planner Pro
                </span>
              </div>
            </Link>

            <div className="h-6 w-px bg-black/10 dark:bg-white/15 hidden md:block shrink-0" />

            {/* Couple & Date Info */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-sm sm:text-lg font-bold text-black dark:text-white leading-tight">
                  {project.groom_name} &amp; {project.bride_name}
                </h1>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold bg-[#DE7272]/15 dark:bg-[#FFCED8]/20 text-[#DE7272] dark:text-[#FFCED8] border border-[#DE7272]/20 dark:border-[#FFCED8]/30">
                  <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" />
                  <span>{countdown.label}</span>
                </span>
              </div>

              <div className="flex items-center gap-3 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 opacity-70" />
                  <span>{formattedDate}</span>
                </span>
                {project.wedding_city && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 opacity-70" />
                    <span>{project.wedding_city}</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Action Buttons & Profil */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Ganti mode tampilan"
              className="w-9 h-9 rounded-full border border-black/10 dark:border-white/15 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Avatar & User pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-black/5 dark:bg-white/5 text-xs">
              {user.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt=""
                  className="w-5 h-5 rounded-full object-cover"
                />
              ) : (
                <div className="w-5 h-5 rounded-full bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold flex items-center justify-center">
                  {user.fullName?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <span className="font-semibold text-black dark:text-white max-w-[160px] truncate hidden sm:inline">
                {user.fullName}
              </span>
            </div>

            <a
              href="/auth/logout"
              title="Keluar dari akun"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/15 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-red-500 hover:border-red-500/30 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </a>
          </div>
        </div>
      </header>

      {/* 3. Main Workspace Grid: Sidebar Desktop + Content */}
      <div className="flex-1 max-w-[1580px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Navigasi Desktop */}
        <aside className="w-64 shrink-0 hidden md:flex flex-col gap-1 sticky top-24">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-widest text-neutral-500 dark:text-neutral-400">
            Menu Navigasi
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.id}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                    : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#DE7272] dark:text-[#E8B4C0]" : "opacity-70"}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* Card Info Anggaran Ringkas di Sidebar */}
          {project.total_budget > 0 && (
            <div className="mt-6 p-4 rounded-2xl border border-black/8 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] flex flex-col gap-1">
              <span className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400">
                Pagu Anggaran
              </span>
              <span className="text-sm font-bold text-black dark:text-white">
                {formatRupiah(project.total_budget)}
              </span>
            </div>
          )}
        </aside>

        {/* Content Area */}
        <main className="flex-1 w-full min-w-0 pb-28 md:pb-8">
          {children ? (
            children
          ) : (
            /* Default Shell Placeholder (Ready for 5.2 Overview) */
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-black/8 dark:border-white/10 bg-white dark:bg-[#121212] p-6 sm:p-8 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight">
                      Ruang Kerja Persiapan Pernikahan
                    </h2>
                    <p className="mt-1 text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Selamat datang di sistem manajemen pernikahan terpadu Invitea. Semua data tamu, checklist, dan anggaran tersinkronisasi otomatis.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      Sistem Aktif
                    </span>
                  </div>
                </div>

                {/* Sub-modul Quick Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                  <Link
                    to="/plan/guests"
                    className="p-5 rounded-2xl border border-black/8 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] hover:border-[#DE7272]/40 dark:hover:border-[#FFCED8]/40 transition-all flex flex-col justify-between gap-4 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#DE7272]/10 dark:bg-[#FFCED8]/15 text-[#DE7272] dark:text-[#FFCED8] flex items-center justify-center">
                        <Users className="w-5 h-5" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black dark:text-white text-base">Tamu &amp; RSVP</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Buku tamu, link personal &amp; blast WhatsApp</p>
                    </div>
                  </Link>

                  <Link
                    to="/plan/checklist"
                    className="p-5 rounded-2xl border border-black/8 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] hover:border-[#DE7272]/40 dark:hover:border-[#FFCED8]/40 transition-all flex flex-col justify-between gap-4 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#DE7272]/10 dark:bg-[#FFCED8]/15 text-[#DE7272] dark:text-[#FFCED8] flex items-center justify-center">
                        <CheckSquare className="w-5 h-5" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black dark:text-white text-base">Checklist</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Timeline persiapan H-6 bulan s.d. hari H</p>
                    </div>
                  </Link>

                  <Link
                    to="/plan/budget"
                    className="p-5 rounded-2xl border border-black/8 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] hover:border-[#DE7272]/40 dark:hover:border-[#FFCED8]/40 transition-all flex flex-col justify-between gap-4 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#DE7272]/10 dark:bg-[#FFCED8]/15 text-[#DE7272] dark:text-[#FFCED8] flex items-center justify-center">
                        <Wallet className="w-5 h-5" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black dark:text-white text-base">Anggaran</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Kontrol pengeluaran &amp; pelunasan vendor</p>
                    </div>
                  </Link>

                  <Link
                    to="/plan/settings"
                    className="p-5 rounded-2xl border border-black/8 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] hover:border-[#DE7272]/40 dark:hover:border-[#FFCED8]/40 transition-all flex flex-col justify-between gap-4 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-[#DE7272]/10 dark:bg-[#FFCED8]/15 text-[#DE7272] dark:text-[#FFCED8] flex items-center justify-center">
                        <Settings className="w-5 h-5" />
                      </div>
                      <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                    <div>
                      <h3 className="font-bold text-black dark:text-white text-base">Pengaturan</h3>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">Masa aktif &amp; proteksi private gate</p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* 4. Bottom Floating Dock Navigasi untuk Mobile */}
      <nav
        aria-label="Navigasi mobile planner"
        className="md:hidden fixed bottom-4 inset-x-4 z-40 bg-neutral-900/90 dark:bg-[#121212]/90 text-white backdrop-blur-xl border border-white/15 rounded-full px-2 py-1.5 shadow-2xl flex items-center justify-around"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          return (
            <Link
              key={item.id}
              to={item.href}
              className={`flex flex-col items-center gap-0.5 py-1.5 px-3 rounded-full transition-colors ${
                isActive ? "text-[#DE7272] dark:text-[#FFCED8] font-bold" : "text-white/70 hover:text-white"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
