"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-bg-base/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-3xl font-serif font-semibold tracking-wide text-brand">Invitea.</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link href="/templates?kategori=undangan" className="text-sm font-sans font-medium text-text-main hover:text-brand transition-colors">Undangan</Link>
          <Link href="/templates?kategori=ucapan" className="text-sm font-sans font-medium text-text-main hover:text-brand transition-colors">Ucapan</Link>
          <Link href="/#cara-kerja" className="text-sm font-sans font-medium text-text-main hover:text-brand transition-colors">Cara Kerja</Link>
        </nav>
        
        {/* Desktop CTA & Mobile Toggle */}
        <div className="flex items-center space-x-2 md:space-x-4">
          <Link 
            href="/templates" 
            className="hidden md:block px-6 py-2.5 text-sm font-medium bg-brand text-white rounded-full hover:bg-brand/90 transition-all duration-300 shadow-md shadow-brand/20 hover:shadow-lg hover:-translate-y-0.5"
          >
            Buat Sekarang
          </Link>
          
          <button 
            className="md:hidden p-2 text-brand bg-brand-light/10 rounded-lg hover:bg-brand-light/30 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-20 left-0 w-full bg-bg-base shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-6 space-y-6">
          <Link 
            href="/templates?kategori=undangan" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-lg font-sans font-medium text-text-main hover:text-brand transition-colors"
          >
            Undangan
          </Link>
          <Link 
            href="/templates?kategori=ucapan" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-lg font-sans font-medium text-text-main hover:text-brand transition-colors"
          >
            Ucapan
          </Link>
          <Link 
            href="/#cara-kerja" 
            onClick={() => setIsMobileMenuOpen(false)} 
            className="text-lg font-sans font-medium text-text-main hover:text-brand transition-colors"
          >
            Cara Kerja
          </Link>
          
          <div className="pt-4 border-t border-border-subtle">
            <Link 
              href="/templates" 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="flex justify-center w-full px-6 py-3.5 text-base font-medium bg-brand text-white rounded-full hover:bg-brand/90 transition-all duration-300 shadow-md shadow-brand/20"
            >
              Buat Sekarang
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
