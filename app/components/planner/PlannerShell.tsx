import {
  Users,
  CheckSquare,
  Calculator,
  ExternalLink,
  Heart,
  ShieldCheck,
  ArrowLeft,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import type { HostContext } from "../../lib/host";
import { buildSubdomainUrl } from "../../lib/host";

interface PlannerShellProps {
  hostContext: HostContext;
  user?: {
    id: string;
    email?: string;
    fullName?: string;
    avatarUrl?: string;
  } | null;
}

export function PlannerShell({ hostContext, user }: PlannerShellProps) {
  const marketingHomeUrl = buildSubdomainUrl("marketing", "/", hostContext);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2D2424] flex flex-col font-sans selection:bg-pink-200">
      {/* Top Bar / Subdomain Indicator Banner */}
      <div className="bg-[#2D1E1E] text-[#FAF5E9] text-xs py-2 px-4 sm:px-6 flex items-center justify-between border-b border-black/10">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono uppercase tracking-wider text-[11px] text-cream-text/80">
            Subdomain Dispatcher:
          </span>
          <code className="font-mono bg-white/10 px-2 py-0.5 rounded text-amber-200 text-[11px]">
            plan.invitea.cards
          </code>
        </div>
        <a
          href={marketingHomeUrl}
          className="inline-flex items-center gap-1 text-[11px] text-cream-text/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Kembali ke Website Utama</span>
        </a>
      </div>

      {/* Main Planner Header */}
      <header className="sticky top-0 z-40 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#2D1E1E]/10 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#6E182A] text-[#FAF5E9] flex items-center justify-center font-serif text-lg font-bold shadow-xs">
              I.
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2D1E1E]">
                  Wedding Planner
                </h1>
                <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#6E182A]/10 text-[#6E182A]">
                  Pro Suite
                </span>
              </div>
              <p className="text-xs text-[#2D1E1E]/60 -mt-0.5">
                Pusat kontrol persiapan hari bahagiamu
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#2D1E1E]/12 text-xs">
                  {user.avatarUrl ? (
                    <img
                      src={user.avatarUrl}
                      alt=""
                      className="w-5 h-5 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-[#6E182A] text-white text-[10px] font-bold flex items-center justify-center">
                      {user.fullName?.charAt(0).toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="font-semibold text-[#2D1E1E] max-w-[120px] truncate">
                    {user.fullName}
                  </span>
                </div>

                <a
                  href="/auth/logout"
                  title="Keluar dari akun"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#2D1E1E]/20 text-xs font-semibold text-[#2D1E1E]/80 hover:text-red-700 hover:border-red-300 transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Keluar</span>
                </a>
              </div>
            ) : (
              <a
                href="/auth/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#2D1E1E]/20 text-xs font-semibold text-[#2D1E1E] hover:bg-[#2D1E1E] hover:text-[#FAF5E9] transition-all shadow-2xs"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Masuk via Google</span>
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {/* Welcome Card */}
        <div className="rounded-3xl border border-[#2D1E1E]/10 bg-white p-6 sm:p-8 mb-8 shadow-xs relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#6E182A]/10 text-[#6E182A] mb-3">
              <Heart className="w-3.5 h-3.5 fill-current" />
              <span>
                {user
                  ? `Halo, ${user.fullName}! Dashboard Siap Digunakan`
                  : "Selamat Datang di Wedding Planner Invitea"}
              </span>
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-[#2D1E1E] tracking-tight leading-tight mb-3">
              {user
                ? "Semua data tamu, checklist, dan anggaran telah tersinkronisasi."
                : "Kelola daftar tamu, to-do list, dan kontrol anggaran dalam satu tempat."}
            </h2>
            <p className="text-sm sm:text-base text-[#2D1E1E]/70 leading-relaxed mb-5">
              {user
                ? `Akun kalian (${user.email}) aktif. Tamu yang mengisi buku tamu pada website undangan digital akan langsung muncul pada kartu di bawah.`
                : "Seluruh data tamu yang mengisi buku ucapan dan konfirmasi kehadiran di website undangan digitalmu akan tersinkronisasi otomatis ke dashboard ini secara realtime."}
            </p>
            {!user && (
              <div className="flex flex-wrap gap-3">
                <a
                  href="/auth/login"
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#6E182A] text-[#FAF5E9] text-xs sm:text-sm font-semibold hover:bg-[#521220] transition-colors shadow-sm"
                >
                  <span>Login untuk Buka Dashboard Lengkap</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        </div>

        {/* 3 Feature Module Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Guests & RSVP */}
          <div className="rounded-2xl border border-[#2D1E1E]/10 bg-white p-6 shadow-2xs hover:border-[#6E182A]/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#6E182A]/10 text-[#6E182A] flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2D1E1E] mb-1">
              Buku Tamu &amp; RSVP
            </h3>
            <p className="text-xs text-[#2D1E1E]/70 leading-relaxed mb-4">
              Manajemen daftar tamu tanpa batas, generate link personal (?to=Nama), dan pantau jumlah kehadiran live.
            </p>
            <div className="pt-3 border-t border-[#2D1E1E]/10 flex items-center justify-between text-xs text-[#2D1E1E]/60 font-mono">
              <span>Status: Siap Sinkron</span>
              <span className="text-emerald-700 font-semibold">
                {user ? "Aktif" : "Terkoneksi"}
              </span>
            </div>
          </div>

          {/* Card 2: Checklist */}
          <div className="rounded-2xl border border-[#2D1E1E]/10 bg-white p-6 shadow-2xs hover:border-[#6E182A]/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#6E182A]/10 text-[#6E182A] flex items-center justify-center mb-4">
              <CheckSquare className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2D1E1E] mb-1">
              Checklist Persiapan
            </h3>
            <p className="text-xs text-[#2D1E1E]/70 leading-relaxed mb-4">
              Panduan tugas terstruktur mulai H-12 bulan hingga hari-H agar tidak ada rincian penting yang terlewat.
            </p>
            <div className="pt-3 border-t border-[#2D1E1E]/10 flex items-center justify-between text-xs text-[#2D1E1E]/60 font-mono">
              <span>48 Poin Tugas</span>
              <span className="text-[#6E182A] font-semibold">Step-by-Step</span>
            </div>
          </div>

          {/* Card 3: Budget Calculator */}
          <div className="rounded-2xl border border-[#2D1E1E]/10 bg-white p-6 shadow-2xs hover:border-[#6E182A]/30 transition-all">
            <div className="w-10 h-10 rounded-xl bg-[#6E182A]/10 text-[#6E182A] flex items-center justify-center mb-4">
              <Calculator className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#2D1E1E] mb-1">
              Kontrol Anggaran Vendor
            </h3>
            <p className="text-xs text-[#2D1E1E]/70 leading-relaxed mb-4">
              Pencatatan uang muka (DP), sisa pelunasan vendor katering, venue, MUA, dan dokumentasi foto.
            </p>
            <div className="pt-3 border-t border-[#2D1E1E]/10 flex items-center justify-between text-xs text-[#2D1E1E]/60 font-mono">
              <span>Kalkulasi Otomatis</span>
              <span className="text-[#6E182A] font-semibold">Realtime</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
