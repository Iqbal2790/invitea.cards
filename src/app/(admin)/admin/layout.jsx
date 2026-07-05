"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Library, Settings, LogOut, Sun, Moon } from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") document.documentElement.classList.add("dark");
      else document.documentElement.classList.remove("dark");
    } else {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const menuItems = [
    {
      name: "Pesanan",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Kelola Landing Page",
      href: "/admin/landing-page",
      icon: Library,
    },
    {
      name: "Pengaturan",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-bg overflow-hidden transition-colors duration-400">
      {/* Sidebar */}
      <aside className="w-[260px] bg-bg-alt border-r border-hairline flex-col hidden md:flex">
        <div className="h-[72px] flex items-center justify-between px-[24px] border-b border-hairline">
          <div className="flex items-center">
            <span className="font-serif italic font-semibold text-[26px] tracking-wide text-ink">Invitea.</span>
            <span className="ml-[6px] text-[10px] font-bold text-ink-soft uppercase tracking-[0.1em] mt-[6px]">Admin</span>
          </div>
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-hairline text-ink-soft hover:text-ink transition-colors"
            title="Ganti Tema"
          >
            {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
        
        <div className="flex-1 py-[24px] px-[16px] space-y-[4px]">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-[12px] px-[16px] py-[12px] rounded-[6px] transition-all font-semibold text-[13.5px] ${
                  isActive 
                    ? "bg-pink-soft text-berry dark:bg-berry/20 dark:text-pink" 
                    : "text-ink-soft hover:bg-bg hover:text-ink"
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-[16px] border-t border-hairline">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-[12px] px-[16px] py-[12px] w-full text-left rounded-[6px] transition-all font-semibold text-[13.5px] text-red-600 hover:bg-red-50/50 hover:text-red-700"
          >
            <LogOut className="w-[18px] h-[18px]" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="h-[64px] bg-bg-alt border-b border-hairline flex items-center justify-between px-[20px] md:hidden">
          <div className="flex items-center">
            <span className="font-serif italic font-semibold text-[22px] tracking-wide text-ink">Invitea.</span>
            <span className="ml-[6px] text-[9px] font-bold text-ink-soft uppercase tracking-[0.1em] mt-[4px]">Admin</span>
          </div>
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-hairline text-ink-soft hover:text-ink transition-colors"
          >
            {theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </header>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-[clamp(24px,4vw,40px)]">
          {children}
        </div>
      </main>
    </div>
  );
}
