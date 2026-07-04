"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Library, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const menuItems = [
    {
      name: "Pesanan",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Kelola Template",
      href: "/admin/templates",
      icon: Library,
    },
    {
      name: "Pengaturan",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-bg-base overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-border-subtle flex flex-col hidden md:flex">
        <div className="h-16 flex items-center px-6 border-b border-border-subtle">
          <span className="font-serif font-bold text-2xl tracking-widest text-brand">Invitea</span>
          <span className="ml-2 text-xs font-semibold text-text-muted uppercase tracking-wider">Admin</span>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
                  isActive 
                    ? "bg-brand/10 text-brand" 
                    : "text-text-muted hover:bg-bg-base hover:text-text-main"
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </div>

        <div className="p-4 border-t border-border-subtle">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl transition-all font-medium text-sm text-red-500 hover:bg-red-50">
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-border-subtle flex items-center px-6 md:hidden">
          <span className="font-serif font-bold text-xl tracking-widest text-brand">Invitea</span>
          <span className="ml-2 text-[10px] font-semibold text-text-muted uppercase tracking-wider">Admin</span>
        </header>

        {/* Content Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          {children}
        </div>
      </main>
    </div>
  );
}
