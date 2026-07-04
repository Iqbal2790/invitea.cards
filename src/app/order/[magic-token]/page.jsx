"use client";

import { use, useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  MessageSquare, 
  Clock, 
  Users, 
  Check, 
  X, 
  CalendarDays
} from "lucide-react";

export default function OrderDashboardPage({ params }) {
  const resolvedParams = use(params);
  const { "magic-token": magicToken } = resolvedParams;

  const [copied, setCopied] = useState(false);

  // --- DUMMY DATA ---
  // Nantinya data ini akan diambil dari Supabase berdasarkan magicToken
  const orderData = {
    status_payment: "paid", // 'pending' | 'paid' | 'failed'
    expired_at: "2026-12-31T23:59:00",
    slug: "romeo-and-juliet-2026",
    template_name: "Classic Wedding",
  };

  const rsvpData = [
    { id: 1, name: "Iqbal & Pasangan", isAttending: true, message: "Selamat menempuh hidup baru! Semoga selalu bahagia dan langgeng selamanya.", time: "2 jam yang lalu" },
    { id: 2, name: "Budi Santoso", isAttending: false, message: "Maaf ya nggak bisa hadir, kebetulan lagi di luar kota. Doa terbaik buat kalian berdua!", time: "5 jam yang lalu" },
    { id: 3, name: "Siti Aminah", isAttending: true, message: "Wahhh akhirnya! Nggak sabar buat dateng ke acaranya.", time: "1 hari yang lalu" },
  ];

  const totalHadir = rsvpData.filter(r => r.isAttending).length;
  const totalTidakHadir = rsvpData.filter(r => !r.isAttending).length;

  const liveLink = `https://invitea.cards/u/${orderData.slug}`;

  // --- HANDLERS ---
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(liveLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base font-sans pb-20">
      
      {/* 1. HEADER */}
      <header className="bg-white border-b border-border-subtle sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-bold text-text-main">Manajemen Undangan</h1>
            <p className="text-xs text-text-muted mt-0.5 font-medium tracking-wide">
              TOKEN: <span className="text-text-main font-mono">{magicToken.substring(0, 8)}***</span>
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center border border-brand/20">
            <span className="font-serif font-bold text-brand text-xs">IV</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        
        {/* 2. STATUS & INFO KARTU */}
        <section className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-subtle flex flex-col md:flex-row justify-between gap-6">
          <div className="space-y-1">
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Template Aktif</p>
            <h2 className="text-lg font-semibold text-text-main">{orderData.template_name}</h2>
            
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border-subtle/50">
              <CalendarDays className="w-4 h-4 text-text-muted" />
              <span className="text-sm text-text-muted">
                Berlaku s/d: <strong className="text-text-main font-medium">31 Des 2026</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col md:items-end justify-center gap-2">
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Status Pembayaran</p>
            {orderData.status_payment === "paid" ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" /> Lunas
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-medium">
                <Clock className="w-4 h-4" /> Menunggu Pembayaran
              </div>
            )}
          </div>
        </section>

        {/* 3. TAUTAN UNDANGAN */}
        <section>
          <h3 className="font-serif text-lg font-semibold text-text-main mb-3">Sebar Undangan Anda</h3>
          <div className="bg-white rounded-3xl p-2 pl-4 md:pl-6 shadow-sm border border-border-subtle flex flex-col md:flex-row md:items-center gap-3">
            <div className="flex-1 overflow-hidden">
              <p className="text-sm text-text-main font-medium truncate pt-2 md:pt-0 pb-1 md:pb-0">
                {liveLink}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1 md:mt-0">
              <button 
                onClick={handleCopy}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-bg-base border border-border-subtle text-text-main text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Tersalin!" : "Salin"}
              </button>
              
              <Link
                href={`/u/${orderData.slug}`}
                target="_blank"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-brand text-white text-sm font-medium hover:bg-brand/90 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <ExternalLink className="w-4 h-4" /> Buka
              </Link>
            </div>
          </div>
        </section>

        {/* 4. DAFTAR RSVP & BUKU TAMU */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-semibold text-text-main">Buku Tamu & RSVP</h3>
            <div className="flex items-center gap-1 text-sm text-text-muted bg-white px-3 py-1 rounded-full border border-border-subtle shadow-sm">
              <Users className="w-4 h-4" /> {rsvpData.length} Total
            </div>
          </div>

          {/* Statistik Mini */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-green-50/50 border border-green-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <p className="text-3xl font-bold text-green-600 mb-1">{totalHadir}</p>
              <p className="text-xs font-medium text-green-800 uppercase tracking-wide">Akan Hadir</p>
            </div>
            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-4 flex flex-col items-center justify-center text-center">
              <p className="text-3xl font-bold text-red-500 mb-1">{totalTidakHadir}</p>
              <p className="text-xs font-medium text-red-800 uppercase tracking-wide">Tidak Hadir</p>
            </div>
          </div>

          {/* Grid Kartu Tamu (Nyaman untuk Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {rsvpData.map((guest) => (
              <div key={guest.id} className="bg-white p-5 rounded-2xl border border-border-subtle shadow-sm flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-text-main">{guest.name}</h4>
                    <p className="text-xs text-text-muted mt-0.5">{guest.time}</p>
                  </div>
                  {guest.isAttending ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      <Check className="w-3 h-3" /> Hadir
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 text-red-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                      <X className="w-3 h-3" /> Tidak
                    </span>
                  )}
                </div>
                
                {/* Pesan Tamu */}
                <div className="flex-1 bg-bg-base/50 p-3 rounded-xl border border-border-subtle/50 relative mt-2">
                  <MessageSquare className="w-4 h-4 text-text-muted/30 absolute top-3 right-3" />
                  <p className="text-sm text-text-muted italic pr-6 leading-relaxed">
                    "{guest.message}"
                  </p>
                </div>
              </div>
            ))}
          </div>

        </section>

      </main>
    </div>
  );
}
