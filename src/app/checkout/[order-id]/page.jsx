"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { dummyTemplates } from "@/lib/dummy-data";
import { useRouter } from "next/navigation";
import { Clock, ShieldCheck, Mail, ArrowRight, ChevronLeft } from "lucide-react";

export default function CheckoutPage({ params }) {
  const resolvedParams = use(params);
  const { "order-id": orderId } = resolvedParams;
  const router = useRouter();
  
  // Dummy order data since we don't have a backend yet
  const template = dummyTemplates.find(t => t.id === "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11") || dummyTemplates[0];
  
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    try {
      // 1. Memanggil API Orders kita
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          template_id: template.id // menggunakan UUID template
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Terjadi kesalahan saat memproses pesanan");
      }
      
      // 2. Memunculkan Popup Midtrans Snap
      // snap.js dari script tag akan menyediakan window.snap
      if (window.snap) {
        window.snap.pay(data.snap_token, {
          onSuccess: function(result) {
            // Berhasil bayar, pindah ke halaman status
            router.push(`/status/${data.order_id}`);
          },
          onPending: function(result) {
            // Pending bayar, pindah ke halaman status
            router.push(`/status/${data.order_id}`);
          },
          onError: function(result) {
            alert("Pembayaran gagal. Silakan coba lagi.");
            setIsSubmitting(false);
          },
          onClose: function() {
            // Jika user menutup popup tanpa bayar
            setIsSubmitting(false);
          }
        });
      } else {
        throw new Error("Sistem pembayaran belum siap, muat ulang halaman.");
      }
      
    } catch (error) {
      alert(error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-bg-base font-sans pb-20">
      <Script 
        src="https://app.sandbox.midtrans.com/snap/snap.js"
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      {/* Simple Header */}
      <header className="bg-white border-b border-border-subtle py-4 px-6 sticky top-0 z-20">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href={`/buat/${template.id}`} className="inline-flex items-center text-sm font-medium text-text-muted hover:text-brand transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Batal
          </Link>
          <span className="font-serif text-2xl font-bold text-brand">Invitea.</span>
          <div className="flex items-center gap-1.5 text-xs font-medium text-green-600 bg-green-50 px-3 py-1.5 rounded-full border border-green-200">
            <ShieldCheck className="w-3.5 h-3.5" /> Pembayaran Aman
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-8 lg:mt-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Column - Order Summary */}
          <div className="w-full lg:w-[55%] space-y-6">
            <div>
              <h1 className="font-serif text-3xl font-semibold text-text-main mb-2">Selesaikan Pesanan Anda</h1>
              <p className="text-text-muted">Periksa kembali ringkasan pesanan Anda sebelum melakukan pembayaran.</p>
            </div>

            <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-border-subtle shadow-sm space-y-6">
              
              <div className="flex gap-4 md:gap-6 pb-6 border-b border-border-subtle/50">
                <div className="relative w-24 h-32 md:w-32 md:h-44 rounded-2xl overflow-hidden bg-brand-light/30 shrink-0 shadow-sm border border-border-subtle/50">
                  <Image src={template.image} alt={template.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-between py-1">
                  <div>
                    <div className="inline-flex items-center rounded-lg border px-2.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-brand-light/50 text-brand border-brand/20 mb-2">
                      {template.category === 'undangan' ? 'Undangan Pernikahan' : 'Kartu Ucapan'}
                    </div>
                    <h2 className="font-serif text-xl md:text-2xl font-medium text-text-main leading-tight">{template.title}</h2>
                  </div>
                  <div>
                    <p className="text-brand font-semibold text-lg md:text-xl">Rp {template.price.toLocaleString("id-ID")}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-medium text-text-main text-sm">Informasi Acara (Dummy)</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-bg-base p-4 rounded-2xl border border-border-subtle/50">
                    <span className="block text-xs text-text-muted mb-1">Mempelai</span>
                    <span className="font-medium text-text-main text-sm">Romeo & Juliet</span>
                  </div>
                  <div className="bg-bg-base p-4 rounded-2xl border border-border-subtle/50">
                    <span className="block text-xs text-text-muted mb-1">Tanggal</span>
                    <span className="font-medium text-text-main text-sm">24 Desember 2026</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="w-full lg:w-[45%]">
            <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-border-subtle shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-24">
              
              <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 text-orange-700 rounded-2xl mb-8">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs font-medium text-orange-800/80 mb-0.5">Selesaikan pembayaran dalam</p>
                  <p className="text-lg font-bold">24:00:00</p>
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-medium text-text-main mb-4">Informasi Pembeli</h3>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-text-main">Alamat Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        className="w-full pl-11 pr-4 py-3.5 bg-bg-base border border-border-subtle rounded-2xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
                      />
                    </div>
                    <p className="text-xs text-text-muted ml-1">Kwitansi dan akses undangan akan dikirim ke email ini.</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border-subtle/50">
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-base font-medium text-text-main">Total Tagihan</span>
                    <span className="text-2xl font-bold text-brand">Rp {template.price.toLocaleString("id-ID")}</span>
                  </div>
                  
                  {/* USING NEW PILL-SHAPED BUTTON STYLE AS INSTRUCTED IN AGENTS.MD */}
                  <button 
                    type="submit" 
                    disabled={!email || isSubmitting}
                    className="w-full group flex items-center justify-center gap-2 bg-brand text-white py-4 rounded-full text-base font-medium hover:bg-brand/90 transition-all duration-300 shadow-md shadow-brand/20 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-md"
                  >
                    {isSubmitting ? 'Memproses...' : 'Bayar Sekarang'}
                    {!isSubmitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>
                </div>
              </form>
              
            </div>
          </div>
          
        </div>
      </main>
      
    </div>
  );
}
