import { useState } from "react";
import { Link, Form } from "react-router";
import {
  LayoutDashboard,
  Users,
  CheckSquare,
  Wallet,
  Settings,
  Sparkles,
  ChevronRight,
  Clock,
  ExternalLink,
  Plus,
  Info,
  ArrowRight,
  ArrowUp,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  BarChart2,
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
    { id: "", label: "Dashboard", href: "/plan", icon: LayoutDashboard },
    { id: "guests", label: "Orders", href: "/plan/guests", icon: Users, badge: "14" },
    { id: "checklist", label: "Products", href: "/plan/checklist", icon: CheckSquare },
    { id: "customers", label: "Customers", href: "/plan/guests", icon: Users },
    { id: "messages", label: "Messages", href: "/plan/messages", icon: Users, badge: "3" },
    { id: "budget", label: "Analytics", href: "/plan/budget", icon: Wallet },
    { id: "settings", label: "Automations", href: "/plan/settings", icon: Settings },
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
              <span className="brand__mark">
                <span style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "16px" }}>I.</span>
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
                  <span>Buka Dashboard Corbel</span>
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
  // STATE 2: 100% PERSIS DASHBOARD CORBEL (SUB-FASE 5.1 FOUNDATION)
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
    return (
      <line
        key={t}
        x1={x1.toFixed(1)}
        y1={y1.toFixed(1)}
        x2={x2.toFixed(1)}
        y2={y2.toFixed(1)}
        stroke="currentColor"
        strokeWidth="1.5"
        style={{ opacity: 0.3 }}
      />
    );
  });

  const initialsGroom = project.groom_name ? project.groom_name.slice(0, 2).toUpperCase() : "MR";
  const initialsBride = project.bride_name ? project.bride_name.slice(0, 2).toUpperCase() : "JO";

  return (
    <div className="corbel-body" style={{ minHeight: "100vh", position: "relative" }}>
      {/* 1. Ambient Background Mesh */}
      <div className="mesh" aria-hidden="true">
        <i className="mesh__a"></i>
        <i className="mesh__b"></i>
        <i className="mesh__c"></i>
      </div>

      <div className="app">
        {/* 2. Corbel Top Header (.top) */}
        <header className="top">
          {/* Brand Mark */}
          <Link to="/plan" className="brand" aria-label="Invitea Planner Dashboard">
            <span className="brand__mark">
              <span style={{ fontFamily: "var(--font)", fontWeight: 800, fontSize: "16px" }}>I.</span>
            </span>
            <span className="brand__txt">
              <b>Corbel Supply Co.</b>
              <small>Pro trial, 9 days left</small>
            </span>
          </Link>

          {/* Centered Segmented Navigation Pill Tabs (.tabs) */}
          <nav className="tabs" aria-label="Primary sections">
            <div className="tabs__track">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <Link
                    key={item.id}
                    to={item.href}
                    className="tab"
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{item.label}</span>
                    {item.badge && <span className="tab__count">{item.badge}</span>}
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Right Tools (.top__tools) */}
          <div className="top__tools">
            <button className="ibtn ibtn--glass" type="button" aria-label="Notifikasi">
              <Bell className="ico" />
            </button>
            <div className="team" aria-label="Pengantin online">
              <span className="av av--sm" style={{ "--h": 206 } as any}>MR</span>
              <span className="av av--sm" style={{ "--h": 162 } as any}>JO</span>
              <span className="av av--sm" style={{ "--h": 12 } as any}>AP</span>
              <span className="av av--sm av--more">+2</span>
            </div>
            <div className="me" title={user.fullName || "Akun Saya"}>
              <span className="av" style={{ "--h": 206 } as any}>
                MR
              </span>
            </div>
          </div>
        </header>

        {/* 3. Corbel Floating Black Capsule Dock (.dock) */}
        <nav className="dock" aria-label="Workspace and tools">
          <Link to="/plan" className="dock__btn" aria-label="Cari Cepat">
            <Search className="ico" />
            <span className="dock__tip">Search <kbd>⌘K</kbd></span>
          </Link>
          <span className="dock__sep" aria-hidden="true"></span>
          <Link to="/plan" className="dock__btn" aria-current={activeSection === "" ? "page" : undefined} aria-label="Dashboard">
            <LayoutDashboard className="ico" />
            <span className="dock__tip">Dashboard</span>
          </Link>
          <Link to="/plan/guests" className="dock__btn" aria-current={activeSection === "guests" ? "page" : undefined} aria-label="Buku Tamu">
            <Users className="ico" />
            <span className="dock__count">14</span>
            <span className="dock__tip">Orders</span>
          </Link>
          <Link to="/plan/checklist" className="dock__btn" aria-current={activeSection === "checklist" ? "page" : undefined} aria-label="Checklist">
            <CheckSquare className="ico" />
            <span className="dock__tip">Products</span>
          </Link>
          <Link to="/plan/budget" className="dock__btn" aria-current={activeSection === "budget" ? "page" : undefined} aria-label="Anggaran">
            <Wallet className="ico" />
            <span className="dock__tip">Analytics</span>
          </Link>
          <Link to="/plan/settings" className="dock__btn" aria-current={activeSection === "settings" ? "page" : undefined} aria-label="Pengaturan">
            <Settings className="ico" />
            <span className="dock__tip">Settings</span>
          </Link>
          <span className="dock__sep" aria-hidden="true"></span>
          <button className="dock__btn dock__upgrade" type="button" aria-label="Fitur Pro">
            <Sparkles className="ico" />
            <span className="dock__tip">Upgrade to Corbel Plus</span>
          </button>
          <button className="dock__btn" type="button" onClick={toggleTheme} aria-label="Ganti Tema">
            {isDark ? <Sun className="ico theme-ico" /> : <Moon className="ico theme-ico" />}
            <span className="dock__tip">Theme</span>
          </button>
          <a href="/auth/logout" className="dock__btn" aria-label="Keluar">
            <LogOut className="ico" />
            <span className="dock__tip">Logout</span>
          </a>
        </nav>

        {/* 4. Corbel Page Head (.head) with Live Pill */}
        <div className="head">
          <h1 className="head__title">Dashboard</h1>
          <div className="live">
            <span className="live__dot"></span>
            <span className="live__n"><strong>1,284</strong></span>
            <span className="live__label">live now</span>
          </div>
        </div>

        {/* 5. Sub-Header Toolbar (.toolbar.db-bar) */}
        <div className="toolbar db-bar" style={{ marginBottom: "20px" }}>
          <div className="seg" role="group" aria-label="Acara">
            <button type="button" aria-selected="true">Overview</button>
            <button type="button" aria-selected="false">Online</button>
            <button type="button" aria-selected="false">In store</button>
          </div>

          <div className="db-asof">
            <Clock className="ico" />
            <span>October 2026, month to date</span>
          </div>

          <div className="toolbar__end">
            <a href={marketingHomeUrl} className="btn" title="Lihat Web Undangan" target="_blank" rel="noreferrer">
              <BarChart2 className="ico" />
              <span>Full analytics</span>
            </a>
            <button type="button" className="btn btn--primary">
              <Plus className="ico" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* 6. Corbel 12-Column Grid Workspace (.db) */}
        {children ? (
          children
        ) : (
          <div className="db">
            {/* 4 KPI Cards (.db-kpis span 12) */}
            <section className="card db-kpis" aria-label="Key figures">
              {/* Card 1: Active sales / Tamu (tile--sky) */}
              <article className="db-kpi tile--sky" data-k="active">
                <h2 className="stat__label">
                  <span>Active sales</span>
                  <span className="db-info" title="Value of orders placed but not yet delivered."><Info className="ico" /></span>
                </h2>
                <div className="db-kpi__row">
                  <div className="db-kpi__fig">
                    <p className="stat__val">$48,290</p>
                    <p className="stat__meta">
                      <span className="delta"><ArrowUp className="ico delta__arrow" /><span>14.2%</span></span>
                      <span>vs last month</span>
                    </p>
                  </div>
                  <div className="db-kpi__mini">
                    <span className="db-mbars" aria-hidden="true">
                      <span className="db-mt"><span className="db-mf" style={{ height: "60%" }}></span></span>
                      <span className="db-mt"><span className="db-mf" style={{ height: "85%" }}></span></span>
                      <span className="db-mt"><span className="db-mf" style={{ height: "100%" }}></span></span>
                    </span>
                  </div>
                </div>
                <Link className="more-link" to="/plan/guests">
                  <span>See orders</span> <ArrowRight className="ico" />
                </Link>
              </article>

              {/* Card 2: Revenue / RSVP (tile--mint) */}
              <article className="db-kpi tile--mint" data-k="revenue">
                <h2 className="stat__label">
                  <span>Revenue</span>
                  <span className="db-info" title="Revenue this month across the channels shown."><Info className="ico" /></span>
                </h2>
                <div className="db-kpi__row">
                  <div className="db-kpi__fig">
                    <p className="stat__val">$352,480</p>
                    <p className="stat__meta">
                      <span className="delta"><ArrowUp className="ico delta__arrow" /><span>8.6%</span></span>
                      <span>vs last month</span>
                    </p>
                  </div>
                  <div className="db-kpi__mini">
                    <svg className="db-spark" viewBox="0 0 84 40" aria-hidden="true">
                      <defs>
                        <linearGradient id="db-spark-g" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0" stopColor="var(--c1)" stopOpacity="0.28" />
                          <stop offset="1" stopColor="var(--c1)" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path className="db-spark__area" fill="url(#db-spark-g)" d="M4 28 C20 26, 30 18, 50 14 C65 10, 75 6, 80 4 L80 40 L4 40 Z" />
                      <path className="db-spark__line" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" d="M4 28 C20 26, 30 18, 50 14 C65 10, 75 6, 80 4" />
                      <circle className="db-spark__dot" cx="80" cy="4" r="3.2" fill="var(--surface)" stroke="currentColor" strokeWidth="2.2" />
                    </svg>
                  </div>
                </div>
                <Link className="more-link" to="/plan/guests">
                  <span>See analytics</span> <ArrowRight className="ico" />
                </Link>
              </article>

              {/* Card 3: Units sold / Checklist (tile--lemon) */}
              <article className="db-kpi tile--lemon" data-k="units">
                <h2 className="stat__label">
                  <span>Units sold</span>
                  <span className="db-info" title="Items sold this month against the monthly target."><Info className="ico" /></span>
                </h2>
                <div className="db-kpi__row">
                  <div className="db-kpi__fig">
                    <p className="stat__val">3,812</p>
                    <p className="stat__meta">
                      <span className="delta"><ArrowUp className="ico delta__arrow" /><span>76%</span></span>
                      <span>of monthly target</span>
                    </p>
                  </div>
                  <div className="db-kpi__mini">
                    <span className="db-ring" aria-hidden="true" style={{ position: "relative", display: "inline-block", width: "44px", height: "44px" }}>
                      <svg viewBox="0 0 44 44" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                        <circle cx="22" cy="22" r="17" fill="none" stroke="currentColor" strokeWidth="3.5" opacity="0.2" />
                        <circle cx="22" cy="22" r="17" fill="none" stroke="currentColor" strokeWidth="3.5" strokeDasharray="107" strokeDashoffset="26" strokeLinecap="round" />
                      </svg>
                      <b style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 700 }}>76%</b>
                    </span>
                  </div>
                </div>
                <Link className="more-link" to="/plan/checklist">
                  <span>See products</span> <ArrowRight className="ico" />
                </Link>
              </article>

              {/* Card 4: Conversion / Anggaran (tile--coral) */}
              <article className="db-kpi tile--coral" data-k="conv">
                <h2 className="stat__label">
                  <span>Conversion rate</span>
                  <span className="db-info" title="Share of visits that end in an order."><Info className="ico" /></span>
                </h2>
                <div className="db-kpi__row">
                  <div className="db-kpi__fig">
                    <p className="stat__val">3.2%</p>
                    <p className="stat__meta">
                      <span className="delta" style={{ color: "var(--down)" }}><span>-0.2 pt</span></span>
                      <span>vs last month</span>
                    </p>
                  </div>
                  <div className="db-kpi__mini">
                    <span className="db-eq" aria-hidden="true" style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: "32px" }}>
                      <span style={{ width: "4px", height: "30%", background: "currentColor", borderRadius: "999px" }}></span>
                      <span style={{ width: "4px", height: "60%", background: "currentColor", borderRadius: "999px" }}></span>
                      <span style={{ width: "4px", height: "90%", background: "currentColor", borderRadius: "999px" }}></span>
                      <span style={{ width: "4px", height: "50%", background: "currentColor", borderRadius: "999px" }}></span>
                      <span style={{ width: "4px", height: "75%", background: "currentColor", borderRadius: "999px" }}></span>
                      <span style={{ width: "4px", height: "40%", background: "currentColor", borderRadius: "999px" }}></span>
                    </span>
                  </div>
                </div>
                <Link className="more-link" to="/plan/budget">
                  <span>See funnel</span> <ArrowRight className="ico" />
                </Link>
              </article>
            </section>

            {/* Middle Section: Ocean Radial Gauge Card (Span 4) + Bar Chart (Span 8) */}
            <section className="card tile--ocean db-perf" aria-labelledby="db-perf-h">
              <header className="card__head">
                <h2 className="card__title" id="db-perf-h">
                  <span>Sales performance</span>
                  <span className="db-info" title="A score out of 100 from revenue, orders and conversion against plan."><Info className="ico" /></span>
                </h2>
              </header>
              <div className="db-gauge">
                <svg viewBox="0 0 240 136" role="img" aria-labelledby="db-gauge-sr">
                  <title id="db-gauge-sr">Sales score</title>
                  <defs>
                    <linearGradient id="db-gauge-g" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0" stopColor="var(--c2)" />
                      <stop offset="0.55" stopColor="var(--c1)" />
                      <stop offset="1" stopColor="var(--c4)" />
                    </linearGradient>
                  </defs>
                  <g className="db-ticks">{gaugeTicks}</g>
                  <path className="db-g-track" d="M30 125 A90 90 0 0 1 210 125" />
                  <path className="db-g-arc" d="M30 125 A90 90 0 0 1 210 125" style={{ strokeDasharray: "283", strokeDashoffset: "65" }} />
                  <g className="db-g-knob" transform="translate(152, 48)">
                    <circle cx="0" cy="0" r="10" />
                    <circle cx="0" cy="0" r="4" />
                  </g>
                </svg>
                <div className="db-gauge__c">
                  <p>
                    <b data-score>64</b>
                    <span className="delta" data-score-d><ArrowUp className="ico delta__arrow" /><span>+4.2%</span></span>
                  </p>
                  <small>of 100 points</small>
                </div>
              </div>
              <div className="db-note" aria-live="polite">
                <h3>Steady pace toward target</h3>
                <p>Conversion dipped slightly this week, but higher average order value kept revenue on track.</p>
              </div>
              <Link className="more-link db-perf__more" to="/plan/checklist">
                <span>Improve your score</span> <ArrowRight className="ico" />
              </Link>
            </section>

            {/* Middle Section: Revenue Bar Chart (Span 8) */}
            <section className="card db-an" aria-labelledby="db-an-h">
              <header className="card__head">
                <h2 className="card__title" id="db-an-h">
                  <span>Revenue</span>
                  <span className="db-info" title="Monthly revenue. November and December this year are the forecast."><Info className="ico" /></span>
                </h2>
                <span className="db-an__sum" style={{ marginLeft: "12px", fontSize: "var(--fs-xl)", fontWeight: 700 }}>
                  $352,480
                </span>
                <div className="card__actions">
                  <div className="seg seg--sm" role="group" aria-label="Year">
                    <button type="button" aria-selected="false">2025</button>
                    <button type="button" aria-selected="true">2026</button>
                  </div>
                </div>
              </header>

              {/* Chart Mockup with Diagonal Hatching and Monthly Pillars */}
              <div className="db-chart" style={{ height: "240px", position: "relative", marginTop: "14px" }}>
                <div className="db-grid" style={{ position: "absolute", inset: 0, display: "grid", gridTemplateRows: "repeat(4, 1fr)" }} aria-hidden="true">
                  <div style={{ borderBottom: "1px dashed var(--line-2)" }}></div>
                  <div style={{ borderBottom: "1px dashed var(--line-2)" }}></div>
                  <div style={{ borderBottom: "1px dashed var(--line-2)" }}></div>
                  <div style={{ borderBottom: "1px dashed var(--line-2)" }}></div>
                </div>

                <div style={{ position: "relative", zIndex: 1, height: "100%", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "8px", paddingBottom: "24px" }}>
                  {[
                    { m: "Jan", h: 45 }, { m: "Feb", h: 58 }, { m: "Mar", h: 52 },
                    { m: "Apr", h: 68 }, { m: "May", h: 62 }, { m: "Jun", h: 78 },
                    { m: "Jul", h: 72 }, { m: "Aug", h: 86 }, { m: "Sep", h: 80 },
                    { m: "Oct", h: 94, active: true }, { m: "Nov", h: 88, forecast: true }, { m: "Dec", h: 100, forecast: true }
                  ].map((col, idx) => (
                    <div key={idx} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", height: "100%", justifyContent: "flex-end" }}>
                      <div
                        style={{
                          width: "100%",
                          maxWidth: "28px",
                          height: `${col.h}%`,
                          borderRadius: "999px",
                          background: col.active ? "var(--primary)" : col.forecast ? "repeating-linear-gradient(45deg, var(--c2) 0, var(--c2) 4px, transparent 4px, transparent 8px)" : "var(--well)",
                          border: col.forecast ? "1px dashed var(--c1)" : "none",
                          transition: "all 0.2s",
                        }}
                      />
                      <span style={{ fontSize: "11px", fontWeight: 600, color: col.active ? "var(--text)" : "var(--faint)" }}>
                        {col.m}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Bottom Section: Visits by time Matrix Heatmap (Span 7) */}
            <section className="card db-heatc" aria-labelledby="db-heat-h">
              <header className="card__head">
                <h2 className="card__title" id="db-heat-h">
                  <span>Visits by time</span>
                  <span className="db-info" title="Visits grouped by day of week and 4-hour window."><Info className="ico" /></span>
                </h2>
                <div className="card__actions">
                  <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--faint)" }}>
                    <span>0</span>
                    <span style={{ width: "40px", height: "6px", borderRadius: "999px", background: "linear-gradient(90deg, var(--heat-0), var(--heat-4))" }}></span>
                    <span>11k+</span>
                  </div>
                </div>
              </header>

              <div style={{ display: "grid", gap: "6px", marginTop: "12px" }}>
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, dIdx) => (
                  <div key={dIdx} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span style={{ width: "28px", fontSize: "11px", fontWeight: 600, color: "var(--faint)" }}>{day}</span>
                    <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: "4px" }}>
                      {Array.from({ length: 12 }, (_, bIdx) => {
                        const level = ((dIdx * 3 + bIdx) % 5);
                        return (
                          <div
                            key={bIdx}
                            style={{
                              height: "18px",
                              borderRadius: "4px",
                              background: `var(--heat-${level})`,
                            }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Bottom Section: Total Visits Donut Chart (Span 5) */}
            <section className="card db-vis" aria-labelledby="db-vis-h">
              <header className="card__head">
                <h2 className="card__title" id="db-vis-h">
                  <span>Total visits</span>
                  <span className="db-info" title="Share of visits by channel this month."><Info className="ico" /></span>
                </h2>
              </header>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginTop: "12px" }}>
                <div style={{ display: "grid", gap: "12px", flex: 1 }}>
                  {[
                    { label: "Online shop", pct: "64%", val: "24,820", color: "var(--c1)" },
                    { label: "In store (POS)", pct: "26%", val: "10,080", color: "var(--c3)" },
                    { label: "Social checkout", pct: "10%", val: "3,880", color: "var(--c5)" },
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

                <div style={{ position: "relative", width: "110px", height: "110px", flexShrink: 0 }}>
                  <svg viewBox="0 0 44 44" style={{ width: "100%", height: "100%", transform: "rotate(-90deg)" }}>
                    <circle cx="22" cy="22" r="16" fill="none" stroke="var(--c1)" strokeWidth="6" strokeDasharray="64 100" strokeDashoffset="0" />
                    <circle cx="22" cy="22" r="16" fill="none" stroke="var(--c3)" strokeWidth="6" strokeDasharray="26 100" strokeDashoffset="-64" />
                    <circle cx="22" cy="22" r="16" fill="none" stroke="var(--c5)" strokeWidth="6" strokeDasharray="10 100" strokeDashoffset="-90" />
                  </svg>
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    <b style={{ fontSize: "14px", fontWeight: 700, lineHeight: 1 }}>38.7k</b>
                    <small style={{ fontSize: "9px", color: "var(--faint)" }}>total</small>
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
