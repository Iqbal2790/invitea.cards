"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-40 w-full bg-header-bg backdrop-blur-[10px] border-b border-header-border transition-colors duration-400">
      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] flex items-center justify-between py-5">
        
        {/* Logo */}
        <Link href="/" className="font-serif text-[28px] font-semibold text-berry-deep dark:text-ink">
          Invitea.
        </Link>
        
        {/* Nav Right */}
        <div className="flex items-center gap-[clamp(18px,3vw,36px)]">
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-9 text-[15px] font-medium text-ink-soft">
            <Link href="/templates?kategori=undangan" className="hover:text-berry dark:hover:text-pink transition-colors">Undangan</Link>
            <Link href="/templates?kategori=ucapan" className="hover:text-berry dark:hover:text-pink transition-colors">Ucapan</Link>
            <Link href="/#cara-kerja" className="hover:text-berry dark:hover:text-pink transition-colors">Cara Kerja</Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Theme Toggle */}
            <button 
              className="inline-flex items-center justify-center w-10 h-10 rounded-full border-[1.5px] border-header-border bg-transparent text-ink flex-shrink-0 transition-colors"
              onClick={toggleTheme}
              aria-label="Ganti tampilan terang/gelap"
              type="button"
            >
              {theme === "dark" ? <Moon className="w-[18px] h-[18px]" /> : <Sun className="w-[18px] h-[18px]" />}
            </button>

            {/* Mobile Toggle */}
            <button 
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-bg-alt text-ink transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-[100%] left-0 w-full bg-header-bg backdrop-blur-[10px] border-b border-header-border shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-[clamp(20px,5vw,64px)] space-y-6">
          <Link 
            href="/templates?kategori=undangan" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-lg font-sans font-medium text-ink-soft hover:text-berry dark:hover:text-pink transition-colors"
          >
            Undangan
          </Link>
          <Link 
            href="/templates?kategori=ucapan" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-lg font-sans font-medium text-ink-soft hover:text-berry dark:hover:text-pink transition-colors"
          >
            Ucapan
          </Link>
          <Link 
            href="/#cara-kerja" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-lg font-sans font-medium text-ink-soft hover:text-berry dark:hover:text-pink transition-colors"
          >
            Cara Kerja
          </Link>
        </nav>
      </div>
    </header>
  );
}
