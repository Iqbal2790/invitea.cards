import { useState, useRef, useEffect } from "react";
import { Link, Form } from "react-router";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Wallet,
  Settings,
  Sparkles,
  Clock,
  Plus,
  Info,
  ArrowRight,
  ArrowUp,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  Calendar,
  Heart,
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
  if (!dateStr) return { label: "H-? Hari", days: 0, isPast: false };
  const target = new Date(`${dateStr}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const diff = target.getTime() - today.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

  if (days > 0) return { label: `H-${days}`, days, isPast: false };
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

  const [activeTab, setActiveTab] = useState(activeSection);
  const [activeEventFilter, setActiveEventFilter] = useState("all");
  const [activeYear, setActiveYear] = useState("2026");

  // Track pill position for .tabs
  const tabRefs = useRef<{ [key: string]: HTMLAnchorElement | null }>({});
  const [pillStyle, setPillStyle] = useState({ left: 4, width: 0, opacity: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeTab || ""];
    if (el) {
      setPillStyle({
        left: el.offsetLeft,
        width: el.offsetWidth,
        opacity: 1,
      });
    }
  }, [activeTab]);

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
    { id: "guests", label: "Tamu & RSVP", href: "/plan/guests", icon: Users, badge: "350" },
    { id: "checklist", label: "Checklist", href: "/plan/checklist", icon: CheckSquare, badge: "18/32" },
    { id: "budget", label: "Anggaran", href: "/plan/budget", icon: Wallet },
    { id: "vendors", label: "Vendor", href: "/plan/vendors", icon: Heart },
    { id: "settings", label: "Pengaturan", href: "/plan/settings", icon: Settings },
  ];

  // =========================================================================
  // STATE 1: ONBOARDING FORM JIKA BELUM ADA PROJECT (CORBEL GLASS PANEL)
  // =========================================================================
  if (!project) {
    return (
      <div className="corbel-body" style={{ minHeight: "100vh", position: "relative" }}>
        {/* Corbel Ambient Mesh */}
        <div className="mesh" aria-hidden="true">
          <i className="mesh__a"></i>
          <i className="mesh__b"></i>
          <i className="mesh__c"></i>
        </div>

        <div className="app" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <header className="top">
            <Link to="/" className="brand">
              <span className="brand__mark" style={{ background: "var(--primary)" }}>
                <span style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "16px", color: "#fff" }}>I.</span>
              </span>
              <span className="brand__txt">
                <b>Invitea.</b>
                <small>Wedding Planner Pro</small>
              </span>
            </Link>

            <div className="top__tools">
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Switch theme"
                className="ibtn ibtn--glass"
              >
                {isDark ? <Sun className="ico" /> : <Moon className="ico" />}
              </button>
              <a href="/auth/logout" className="btn btn--sm">
                <span>Keluar</span>
              </a>
            </div>
          </header>

          <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 0" }}>
            <div className="card" style={{ maxWidth: "580px", width: "100%", padding: "32px", borderRadius: "var(--r-lg)" }}>
              <div className="pill pill--mint" style={{ marginBottom: "16px" }}>
                <span>Inisialisasi Wedding Planner</span>
              </div>

              <h1 className="head__title" style={{ fontSize: "28px", marginBottom: "8px" }}>
                Selamat Datang, {user.fullName || "Pengantin"}!
              </h1>
              <p style={{ color: "var(--muted)", fontSize: "var(--fs-base)", lineHeight: 1.5, marginBottom: "24px" }}>
                Masukkan data dasar pernikahan untuk mengaktifkan dashboard perencana, RSVP real-time, dan kalkulator anggaran.
              </p>

              <Form method="post" style={{ display: "grid", gap: "16px" }}>
                <input type="hidden" name="_action" value="create_project" />

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div style={{ display: "grid", gap: "6px" }}>
                    <label htmlFor="groom_name" style={{ fontSize: "var(--fs-xs)", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>
                      Mempelai Pria *
                    </label>
                    <input
                      id="groom_name"
                      name="groom_name"
                      type="text"
                      required
                      placeholder="Nama Pria"
                      style={{
                        background: "var(--well)",
                        border: "1px solid var(--line-2)",
                        borderRadius: "12px",
                        padding: "10px 14px",
                        color: "var(--text)",
                        fontSize: "var(--fs-base)",
                        fontFamily: "var(--font)",
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gap: "6px" }}>
                    <label htmlFor="bride_name" style={{ fontSize: "var(--fs-xs)", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>
                      Mempelai Wanita *
                    </label>
                    <input
                      id="bride_name"
                      name="bride_name"
                      type="text"
                      required
                      placeholder="Nama Wanita"
                      style={{
                        background: "var(--well)",
                        border: "1px solid var(--line-2)",
                        borderRadius: "12px",
                        padding: "10px 14px",
                        color: "var(--text)",
                        fontSize: "var(--fs-base)",
                        fontFamily: "var(--font)",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                  <div style={{ display: "grid", gap: "6px" }}>
                    <label htmlFor="wedding_date" style={{ fontSize: "var(--fs-xs)", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>
                      Tanggal Acara *
                    </label>
                    <input
                      id="wedding_date"
                      name="wedding_date"
                      type="date"
                      required
                      style={{
                        background: "var(--well)",
                        border: "1px solid var(--line-2)",
                        borderRadius: "12px",
                        padding: "10px 14px",
                        color: "var(--text)",
                        fontSize: "var(--fs-base)",
                        fontFamily: "var(--font)",
                      }}
                    />
                  </div>

                  <div style={{ display: "grid", gap: "6px" }}>
                    <label htmlFor="wedding_city" style={{ fontSize: "var(--fs-xs)", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>
                      Kota Penyelenggaraan
                    </label>
                    <input
                      id="wedding_city"
                      name="wedding_city"
                      type="text"
                      placeholder="Kota"
                      style={{
                        background: "var(--well)",
                        border: "1px solid var(--line-2)",
                        borderRadius: "12px",
                        padding: "10px 14px",
                        color: "var(--text)",
                        fontSize: "var(--fs-base)",
                        fontFamily: "var(--font)",
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gap: "6px" }}>
                  <label htmlFor="total_budget" style={{ fontSize: "var(--fs-xs)", fontWeight: 700, color: "var(--muted)", textTransform: "uppercase" }}>
                    Estimasi Pagu Anggaran
                  </label>
                  <input
                    id="total_budget"
                    name="total_budget"
                    type="number"
                    step="1000000"
                    placeholder="Contoh: 75000000"
                    style={{
                      background: "var(--well)",
                      border: "1px solid var(--line-2)",
                      borderRadius: "12px",
                      padding: "10px 14px",
                      color: "var(--text)",
                      fontSize: "var(--fs-base)",
                      fontFamily: "var(--font)",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn--primary"
                  style={{ width: "100%", height: "46px", marginTop: "12px" }}
                >
                  <span>Buka Dashboard Planner</span>
                  <ArrowRight className="ico" />
                </button>
              </Form>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // =========================================================================
  // STATE 2: 100% CORBEL ARCHITECTURE DISESUAIKAN UNTUK WEDDING PLANNER
  // =========================================================================
  const countdown = calculateCountdown(project.wedding_date);
  const formattedDate = project.wedding_date
    ? new Date(`${project.wedding_date}T00:00:00`).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Tanggal Belum Diatur";

  // Corbel exact SVG 31 radial ticks for Semi-circle Needle Gauge
  const gaugeTicksCount = 31;
  const gaugeTicks = Array.from({ length: gaugeTicksCount }, (_, t) => {
    const angle = Math.PI - (t / (gaugeTicksCount - 1)) * Math.PI;
    const rInner = t % 5 === 0 ? 113 : 109;
    const x1 = 120 + 104 * Math.cos(angle);
    const y1 = 125 - 104 * Math.sin(angle);
    const x2 = 120 + rInner * Math.cos(angle);
    const y2 = 125 - rInner * Math.sin(angle);
    const isLit = t <= 24; // 78% of 31 ticks
    return (
      <line
        key={t}
        x1={x1.toFixed(1)}
        y1={y1.toFixed(1)}
        x2={x2.toFixed(1)}
        y2={y2.toFixed(1)}
        stroke="currentColor"
        strokeWidth="1.5"
        className={isLit ? "is-lit" : undefined}
        style={{ opacity: isLit ? 0.85 : 0.2 }}
      />
    );
  });

  const initialsGroom = project.groom_name ? project.groom_name.slice(0, 2).toUpperCase() : "IQ";
  const initialsBride = project.bride_name ? project.bride_name.slice(0, 2).toUpperCase() : "AI";

  return (
    <div className="corbel-body" style={{ minHeight: "100vh", position: "relative" }}>
      {/* 1. Ambient Background Mesh with Slow Drift Animation */}
      <div className="mesh" aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
        <i className="mesh__a"></i>
        <i className="mesh__b"></i>
        <i className="mesh__c"></i>
      </div>

      <div className="app" style={{ position: "relative", zIndex: 1 }}>
        {/* 2. Corbel Top Header (.top) */}
        <header className="top">
          {/* Brand Mark */}
          <Link to="/plan" className="brand" aria-label="Invitea Wedding Planner">
            <span className="brand__mark" style={{ background: "var(--primary)" }}>
              <span style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "16px", color: "#fff" }}>I.</span>
            </span>
            <span className="brand__txt">
              <b>{project.groom_name} &amp; {project.bride_name}</b>
              <small>Wedding Planner Pro · {project.wedding_city || "Indonesia"}</small>
            </span>
          </Link>

          {/* Centered Segmented Navigation Pill Tabs (.tabs) with Smooth Sliding Indicator */}
          <nav className="tabs" aria-label="Navigasi Planner">
            <div className="tabs__track">
              {/* Elastic Sliding Pill */}
              <span
                className="tabs__pill"
                style={{
                  position: "absolute",
                  top: "4px",
                  bottom: "4px",
                  left: `${pillStyle.left}px`,
                  width: `${pillStyle.width}px`,
                  opacity: pillStyle.opacity,
                  background: "var(--pill)",
                  borderRadius: "999px",
                  zIndex: 0,
                  transition: "all 0.28s cubic-bezier(0.2, 0.8, 0.2, 1)",
                }}
              />

              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <Link
                    key={item.id}
                    ref={(el) => { tabRefs.current[item.id] = el; }}
                    to={item.href}
                    onClick={() => setActiveTab(item.id)}
                    className="tab"
                    style={{
                      position: "relative",
                      zIndex: 1,
                      color: isActive ? "var(--on-pill)" : "var(--text)",
                      transition: "color 0.2s ease",
                    }}
                  >
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className="tab__count"
                        style={{
                          background: isActive ? "rgba(255,255,255,0.22)" : "var(--well)",
                          color: "inherit",
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Tools (.top__tools) */}
          <div className="top__tools">
            <button className="ibtn ibtn--glass" type="button" aria-label="Notifikasi Acara">
              <Bell className="ico" />
              <span className="bell__dot" style={{ background: "var(--primary)" }}></span>
            </button>
            <div className="team" aria-label="Pengantin Terhubung">
              <span className="av av--sm" style={{ "--h": 350, background: "var(--primary-soft)", color: "var(--primary-ink)" } as any} title="Mempelai Pria: {project.groom_name}">{initialsGroom}</span>
              <span className="av av--sm" style={{ "--h": 340, background: "var(--primary-2)", color: "#fff" } as any} title="Mempelai Wanita: {project.bride_name}">{initialsBride}</span>
              <span className="av av--sm av--more" title="Wedding Organizer Terhubung">+WO</span>
            </div>
          </div>
        </header>

        {/* 3. Corbel Floating Vertical Dock (.dock) with Micro-hover */}
        <nav className="dock" aria-label="Alat Cepat">
          <Link to="/plan" className="dock__btn" aria-label="Pencarian Cepat">
            <Search className="ico" />
            <span className="dock__tip">Cari Tamu / Tugas <kbd>⌘K</kbd></span>
          </Link>
          <span className="dock__sep" aria-hidden="true"></span>
          <Link to="/plan" className="dock__btn" aria-current={activeTab === "" ? "page" : undefined} aria-label="Dashboard">
            <LayoutDashboard className="ico" />
            <span className="dock__tip">Ringkasan</span>
          </Link>
          <Link to="/plan/guests" className="dock__btn" aria-current={activeTab === "guests" ? "page" : undefined} aria-label="Buku Tamu & RSVP">
            <Users className="ico" />
            <span className="dock__count" style={{ background: "var(--primary)" }}>350</span>
            <span className="dock__tip">Buku Tamu &amp; RSVP</span>
          </Link>
          <Link to="/plan/checklist" className="dock__btn" aria-current={activeTab === "checklist" ? "page" : undefined} aria-label="Checklist Tugas">
            <CheckSquare className="ico" />
            <span className="dock__tip">Checklist Kesiapan</span>
          </Link>
          <Link to="/plan/budget" className="dock__btn" aria-current={activeTab === "budget" ? "page" : undefined} aria-label="Kalkulator Anggaran">
            <Wallet className="ico" />
            <span className="dock__tip">Kalkulator Anggaran</span>
          </Link>
          <Link to="/plan/settings" className="dock__btn" aria-current={activeTab === "settings" ? "page" : undefined} aria-label="Pengaturan Acara">
            <Settings className="ico" />
            <span className="dock__tip">Pengaturan Acara</span>
          </Link>
          <span className="dock__sep" aria-hidden="true"></span>
          <button className="dock__btn dock__upgrade" type="button" aria-label="Fitur Premium">
            <Sparkles className="ico" />
            <span className="dock__tip">Upgrade Paket Pro</span>
          </button>
          <button className="dock__btn" type="button" onClick={toggleTheme} aria-label="Ganti Tema">
            {isDark ? <Sun className="ico theme-ico" /> : <Moon className="ico theme-ico" />}
            <span className="dock__tip">Ganti Tema (Light/Dark)</span>
          </button>
          <a href="/auth/logout" className="dock__btn" aria-label="Keluar">
            <LogOut className="ico" />
            <span className="dock__tip">Keluar</span>
          </a>
        </nav>

        {/* 4. Corbel Page Head (.head) with Live Countdown Pill */}
        <div className="head">
          <h1 className="head__title">Ringkasan Pernikahan</h1>
          <div className="live" style={{ background: "var(--mint)", color: "var(--text)" }}>
            <span className="live__dot" style={{ background: "var(--primary)" }}></span>
            <span className="live__n"><strong>{countdown.label}</strong></span>
            <span className="live__label">Menuju Hari Bahagia</span>
          </div>
        </div>

        {/* 5. Sub-Header Toolbar (.toolbar.db-bar) */}
        <div className="toolbar db-bar" style={{ marginBottom: "20px" }}>
          {/* Segmented Filter Control */}
          <div className="seg" role="group" aria-label="Filter Acara">
            <button
              type="button"
              aria-selected={activeEventFilter === "all"}
              onClick={() => setActiveEventFilter("all")}
            >
              Semua Sesi
            </button>
            <button
              type="button"
              aria-selected={activeEventFilter === "akad"}
              onClick={() => setActiveEventFilter("akad")}
            >
              Akad Nikah
            </button>
            <button
              type="button"
              aria-selected={activeEventFilter === "resepsi"}
              onClick={() => setActiveEventFilter("resepsi")}
            >
              Resepsi
            </button>
          </div>

          <div className="db-asof">
            <Calendar className="ico" style={{ width: "15px", height: "15px", color: "var(--primary)" }} />
            <span>{formattedDate} · {project.wedding_city || "Kota Belum Diatur"}</span>
          </div>

          <div className="toolbar__end">
            <a href={marketingHomeUrl} className="btn" title="Buka Landing Page Web Undangan" target="_blank" rel="noreferrer">
              <TrendingUp className="ico" />
              <span>Lihat Web Undangan</span>
            </a>
            <button type="button" className="btn btn--primary" style={{ background: "var(--primary)", color: "#fff" }}>
              <Plus className="ico" />
              <span>Tambah Tamu</span>
            </button>
          </div>
        </div>

        {/* 6. Corbel 12-Column Grid Workspace (.db) Diselaraskan untuk Wedding Planner */}
        {children ? (
          children
        ) : (
          <div className="db" style={{ gap: "18px" }}>
            {/* 4 KPI Cards (.db-kpis span 12) dengan Palet Harmoni Invitea */}
            <section className="card db-kpis" aria-label="Metrik Utama Acara">
              {/* Card 1: Total Tamu (Rose Blush .tile--sky) */}
              <article className="db-kpi tile--sky" data-k="active">
                <h2 className="stat__label">
                  <span>Total Tamu Undangan</span>
                  <span className="db-info" title="Estimasi total tamu dari pihak pria dan wanita"><Info className="ico" /></span>
                </h2>
                <div className="db-kpi__row">
                  <div className="db-kpi__fig">
                    <p className="stat__val">350</p>
                    <p className="stat__meta">
                      <span className="delta" style={{ background: "rgba(42, 117, 96, 0.15)", color: "#2A7560" }}>
                        <ArrowUp className="ico delta__arrow" /><span>+24</span>
                      </span>
                      <span>120 Kel · 145 Teman · 85 VIP</span>
                    </p>
                  </div>
                  <div className="db-kpi__mini">
                    <span className="db-mbars" aria-hidden="true">
                      <span className="db-mt"><span className="db-mf" style={{ height: "60%", background: "var(--primary-2)" }}></span></span>
                      <span className="db-mt"><span className="db-mf" style={{ height: "85%", background: "var(--primary-2)" }}></span></span>
                      <span className="db-mt"><span className="db-mf" style={{ height: "100%", background: "var(--primary)" }}></span></span>
                    </span>
                  </div>
                </div>
                <Link className="more-link" to="/plan/guests">
                  <span>Kelola Buku Tamu</span> <ArrowRight className="ico" />
                </Link>
              </article>

              {/* Card 2: Konfirmasi Hadir RSVP (Sage Harmony .tile--mint) */}
              <article className="db-kpi tile--mint" data-k="revenue">
                <h2 className="stat__label">
                  <span>Konfirmasi Hadir (RSVP)</span>
                  <span className="db-info" title="Persentase respon hadir live dari formulir online"><Info className="ico" /></span>
                </h2>
                <div className="db-kpi__row">
                  <div className="db-kpi__fig">
                    <p className="stat__val">84%</p>
                    <p className="stat__meta">
                      <span className="delta" style={{ background: "rgba(42, 117, 96, 0.15)", color: "#2A7560" }}>
                        <ArrowUp className="ico delta__arrow" /><span>210 Hadir</span>
                      </span>
                      <span>40 Berhalangan</span>
                    </p>
                  </div>
                  <div className="db-kpi__mini">
                    <svg className="db-spark" viewBox="0 0 84 40" aria-hidden="true">
                      <defs>
                        <linearGradient id="db-spark-g" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0" stopColor="var(--primary)" stopOpacity="0.32" />
                          <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path className="db-spark__area" fill="url(#db-spark-g)" d="M4 28 C20 26, 30 18, 50 14 C65 10, 75 6, 80 4 L80 40 L4 40 Z" />
                      <path className="db-spark__line" fill="none" stroke="var(--primary)" strokeWidth="2.2" strokeLinecap="round" d="M4 28 C20 26, 30 18, 50 14 C65 10, 75 6, 80 4" />
                      <circle className="db-spark__dot" cx="80" cy="4" r="3.2" fill="var(--surface)" stroke="var(--primary)" strokeWidth="2.2" />
                    </svg>
                  </div>
                </div>
                <Link className="more-link" to="/plan/guests">
                  <span>Lihat Respon RSVP</span> <ArrowRight className="ico" />
                </Link>
              </article>

              {/* Card 3: Checklist Persiapan (Champagne Gold .tile--lemon) */}
              <article className="db-kpi tile--lemon" data-k="units">
                <h2 className="stat__label">
                  <span>Checklist Kesiapan</span>
                  <span className="db-info" title="Item persiapan yang sudah terselesaikan"><Info className="ico" /></span>
                </h2>
                <div className="db-kpi__row">
                  <div className="db-kpi__fig">
                    <p className="stat__val">18 / 32</p>
                    <p className="stat__meta">
                      <span className="delta" style={{ background: "rgba(133, 88, 10, 0.15)", color: "#85580A" }}>
                        <ArrowUp className="ico delta__arrow" /><span>56%</span>
                      </span>
                      <span>14 tersisa</span>
                    </p>
                  </div>
                  <div className="db-kpi__mini">
                    <span className="db-ring" aria-hidden="true" style={{ position: "relative", display: "inline-block", width: "44px", height: "44px" }}>
                      <svg viewBox="0 0 44 44" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                        <circle cx="22" cy="22" r="17" fill="none" stroke="currentColor" strokeWidth="3.5" opacity="0.2" />
                        <circle cx="22" cy="22" r="17" fill="none" stroke="var(--primary)" strokeWidth="3.5" strokeDasharray="107" strokeDashoffset="47" strokeLinecap="round" />
                      </svg>
                      <b style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700 }}>56%</b>
                    </span>
                  </div>
                </div>
                <Link className="more-link" to="/plan/checklist">
                  <span>Buka Checklist</span> <ArrowRight className="ico" />
                </Link>
              </article>

              {/* Card 4: Realisasi Anggaran (Warm Coral .tile--coral) */}
              <article className="db-kpi tile--coral" data-k="conv">
                <h2 className="stat__label">
                  <span>Realisasi Anggaran</span>
                  <span className="db-info" title="Total pengeluaran terbayar terhadap pagu anggaran"><Info className="ico" /></span>
                </h2>
                <div className="db-kpi__row">
                  <div className="db-kpi__fig">
                    <p className="stat__val">Rp 42,5 Jt</p>
                    <p className="stat__meta">
                      <span className="delta" style={{ background: "rgba(42, 117, 96, 0.15)", color: "#2A7560" }}>
                        <span>57%</span>
                      </span>
                      <span>dari {project.total_budget > 0 ? formatRupiah(project.total_budget) : "Rp 75.000.000"}</span>
                    </p>
                  </div>
                  <div className="db-kpi__mini">
                    <span className="db-eq" aria-hidden="true" style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: "32px" }}>
                      <span style={{ width: "4px", height: "35%", background: "currentColor", borderRadius: "999px" }}></span>
                      <span style={{ width: "4px", height: "65%", background: "currentColor", borderRadius: "999px" }}></span>
                      <span style={{ width: "4px", height: "95%", background: "var(--primary)", borderRadius: "999px" }}></span>
                      <span style={{ width: "4px", height: "55%", background: "currentColor", borderRadius: "999px" }}></span>
                      <span style={{ width: "4px", height: "80%", background: "currentColor", borderRadius: "999px" }}></span>
                      <span style={{ width: "4px", height: "45%", background: "currentColor", borderRadius: "999px" }}></span>
                    </span>
                  </div>
                </div>
                <Link className="more-link" to="/plan/budget">
                  <span>Rincian Pengeluaran</span> <ArrowRight className="ico" />
                </Link>
              </article>
            </section>

            {/* Middle Section: Ocean Velvet Wine Radial Gauge Card (Span 4) + Bar Chart Pengeluaran (Span 8) */}
            <section className="card tile--ocean db-perf" aria-labelledby="db-perf-h">
              <header className="card__head">
                <h2 className="card__title" id="db-perf-h">
                  <span>Indeks Kesiapan Acara</span>
                  <span className="db-info" title="Skor kalkulasi otomatis dari kelengkapan checklist, konfirmasi vendor, dan pembayaran DP"><Info className="ico" /></span>
                </h2>
              </header>

              <div className="db-gauge">
                <svg viewBox="0 0 240 136" role="img" aria-labelledby="db-gauge-sr">
                  <title id="db-gauge-sr">Skor Kesiapan Acara</title>
                  <defs>
                    <linearGradient id="db-gauge-g" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0" stopColor="var(--primary-2)" />
                      <stop offset="0.55" stopColor="var(--primary)" />
                      <stop offset="1" stopColor="var(--c4)" />
                    </linearGradient>
                  </defs>
                  <g className="db-ticks">{gaugeTicks}</g>
                  <path className="db-g-track" d="M30 125 A90 90 0 0 1 210 125" />
                  <path className="db-g-arc" d="M30 125 A90 90 0 0 1 210 125" style={{ strokeDasharray: "283", strokeDashoffset: "62" }} />
                  {/* Gauge Needle animated at 78% */}
                  <g className="db-g-knob" transform="translate(162, 53)">
                    <circle cx="0" cy="0" r="10" />
                    <circle cx="0" cy="0" r="4" />
                  </g>
                </svg>
                <div className="db-gauge__c">
                  <p>
                    <b data-score style={{ color: "#fff" }}>78</b>
                    <span className="delta" data-score-d style={{ background: "rgba(42, 117, 96, 0.25)", color: "#8FE3C4" }}>
                      <ArrowUp className="ico delta__arrow" /><span>+8.4%</span>
                    </span>
                  </p>
                  <small style={{ color: "rgba(255,255,255,0.7)" }}>dari 100 poin indeks</small>
                </div>
              </div>

              <div className="db-note" aria-live="polite">
                <h3 style={{ color: "#fff" }}>Fase 5.1: Fondasi Shell Siap</h3>
                <p style={{ color: "rgba(255,255,255,0.75)" }}>
                  Vendor gedung, katering utama, dan busana telah diverifikasi. Langkah berikutnya: sinkronisasi buku tamu &amp; souvenir.
                </p>
              </div>

              <Link className="more-link db-perf__more" to="/plan/checklist" style={{ color: "var(--primary-2)", textDecorationColor: "var(--primary-2)" }}>
                <span>Optimalkan Persiapan Acara</span> <ArrowRight className="ico" />
              </Link>
            </section>

            {/* Middle Section: Bar Chart Pengeluaran per Kategori (Span 8) */}
            <section className="card db-an" aria-labelledby="db-an-h">
              <header className="card__head">
                <div>
                  <h2 className="card__title" id="db-an-h">
                    <span>Pengeluaran per Kategori Vendor</span>
                    <span className="db-info" title="Perbandingan realisasi biaya vs pagu anggaran per pos vendor"><Info className="ico" /></span>
                  </h2>
                  <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "4px" }}>
                    <span className="db-an__sum" style={{ fontSize: "var(--fs-xl)", fontWeight: 700, color: "var(--text)" }}>
                      Total Terpakai: Rp 42.500.000
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "11px", color: "var(--faint)" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--primary)" }}></span>
                        Aktif / Terbayar
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--well)" }}></span>
                        Pagu Belum Terpakai
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "2px", border: "1px dashed var(--primary)" }}></span>
                        Estimasi Kontrak
                      </span>
                    </div>
                  </div>
                </div>

                <div className="card__actions">
                  <div className="seg seg--sm" role="group" aria-label="Tahun">
                    <button
                      type="button"
                      aria-selected={activeYear === "2026"}
                      onClick={() => setActiveYear("2026")}
                    >
                      Pagu 2026
                    </button>
                    <button
                      type="button"
                      aria-selected={activeYear === "all"}
                      onClick={() => setActiveYear("all")}
                    >
                      Semua
                    </button>
                  </div>
                </div>
              </header>

              {/* Chart Pillars dengan Hatching Pattern Corbel Asli */}
              <div className="db-chart" style={{ height: "230px", position: "relative", marginTop: "14px" }}>
                <div className="db-grid" style={{ position: "absolute", inset: 0, display: "grid", gridTemplateRows: "repeat(4, 1fr)" }} aria-hidden="true">
                  <div style={{ borderBottom: "1px dashed var(--line-2)" }}></div>
                  <div style={{ borderBottom: "1px dashed var(--line-2)" }}></div>
                  <div style={{ borderBottom: "1px dashed var(--line-2)" }}></div>
                  <div style={{ borderBottom: "1px dashed var(--line-2)" }}></div>
                </div>

                <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "10px", paddingBottom: "24px" }}>
                  {[
                    { label: "Venue", h: 90, val: "18 Jt", active: true },
                    { label: "Katering", h: 78, val: "14 Jt" },
                    { label: "Dekorasi", h: 62, val: "5 Jt" },
                    { label: "Busana", h: 54, val: "3 Jt" },
                    { label: "Dokumentasi", h: 46, val: "2,5 Jt" },
                    { label: "Undangan", h: 40, val: "1,5 Jt", forecast: true },
                    { label: "Souvenir", h: 32, val: "1 Jt", forecast: true },
                    { label: "Lainnya", h: 25, val: "500 Rb", forecast: true },
                  ].map((col, idx) => (
                    <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", height: "100%", justifyContent: "flex-end" }}>
                      <span style={{ fontSize: "10px", fontWeight: 700, color: "var(--faint)" }}>{col.val}</span>
                      <div
                        style={{
                          width: "100%",
                          maxWidth: "34px",
                          height: `${col.h}%`,
                          borderRadius: "999px",
                          background: col.active
                            ? "var(--primary)"
                            : col.forecast
                            ? "repeating-linear-gradient(45deg, var(--c2) 0, var(--c2) 4px, transparent 4px, transparent 8px)"
                            : "var(--well)",
                          border: col.forecast ? "1.5px dashed var(--primary)" : "none",
                          transition: "all 0.25s ease",
                        }}
                      />
                      <span style={{ fontSize: "11px", fontWeight: 600, color: col.active ? "var(--text)" : "var(--faint)" }}>
                        {col.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Bottom Section: Aktivitas Konfirmasi RSVP Masuk (Span 7) */}
            <section className="card db-heatc" aria-labelledby="db-heat-h">
              <header className="card__head">
                <h2 className="card__title" id="db-heat-h">
                  <span>Aktivitas Konfirmasi RSVP Masuk</span>
                  <span className="db-info" title="Pola jam tamu mengisi konfirmasi kehadiran pada formulir undangan online"><Info className="ico" /></span>
                </h2>
                <div className="card__actions">
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--faint)" }}>
                    <span>0</span>
                    <span style={{ width: "40px", height: "6px", borderRadius: "999px", background: "linear-gradient(90deg, var(--heat-0), var(--heat-4))" }}></span>
                    <span>20+ RSVP</span>
                  </div>
                </div>
              </header>

              <div style={{ display: "grid", gap: "6px", marginTop: "12px" }}>
                {["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"].map((day, dIdx) => (
                  <div key={dIdx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "28px", fontSize: "11px", fontWeight: 600, color: "var(--faint)" }}>{day}</span>
                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "4px" }}>
                      {Array.from({ length: 12 }, (_, bIdx) => {
                        const level = ((dIdx * 3 + bIdx) % 5);
                        return (
                          <div
                            key={bIdx}
                            title={`${day} jam ${bIdx * 2}:00 - Level ${level}`}
                            style={{
                              height: "18px",
                              borderRadius: "4px",
                              background: `var(--heat-${level})`,
                              transition: "transform 0.15s ease",
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Section: Komposisi Kategori Tamu (Span 5) */}
            <section className="card db-vis" aria-labelledby="db-vis-h">
              <header className="card__head">
                <h2 className="card__title" id="db-vis-h">
                  <span>Komposisi Kategori Tamu</span>
                  <span className="db-info" title="Distribusi undangan berdasarkan relasi keluarga dan teman"><Info className="ico" /></span>
                </h2>
              </header>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginTop: "14px" }}>
                <div style={{ display: "grid", gap: "12px", flex: 1 }}>
                  {[
                    { label: "Keluarga & Kerabat", pct: "34%", val: "120 Tamu", color: "var(--primary)" },
                    { label: "Teman & Sahabat", pct: "41%", val: "145 Tamu", color: "var(--c3)" },
                    { label: "Kolega Kerja & VIP", pct: "25%", val: "85 Tamu", color: "var(--c4)" },
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: item.color }}></span>
                        <span style={{ fontSize: "var(--fs-sm)", fontWeight: 600 }}>{item.label}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ fontSize: "var(--fs-xs)", color: "var(--muted)" }}>{item.val}</span>
                        <span style={{ fontSize: "var(--fs-sm)", fontWeight: 700 }}>{item.pct}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ position: "relative", width: "112px", height: "112px", flexShrink: 0 }}>
                  <svg viewBox="0 0 44 44" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                    <circle cx="22" cy="22" r="16" fill="none" stroke="var(--primary)" strokeWidth="6" strokeDasharray="34 100" strokeDashoffset="0" />
                    <circle cx="22" cy="22" r="16" fill="none" stroke="var(--c3)" strokeWidth="6" strokeDasharray="41 100" strokeDashoffset="-34" />
                    <circle cx="22" cy="22" r="16" fill="none" stroke="var(--c4)" strokeWidth="6" strokeDasharray="25 100" strokeDashoffset="-75" />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <b style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1 }}>350</b>
                    <small style={{ fontSize: "9px", color: "var(--faint)" }}>tamu</small>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
