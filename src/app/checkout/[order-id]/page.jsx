"use client";

import { useState, use, useEffect } from "react";
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
  
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pendingSnapToken, setPendingSnapToken] = useState(null);
  const [pendingOrderId, setPendingOrderId] = useState(null);

  useEffect(() => {
    // Check if we are handling a custom order via sessionStorage
    if (orderId === "custom") {
      const stored = sessionStorage.getItem("checkoutData");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setTemplate(parsed.template);
          setFormData(parsed.formData);
        } catch (e) {
          console.error("Failed to parse checkoutData");
        }
      }
      
      // Restore pending token if exists so user can retry without creating duplicate
      // const storedToken = sessionStorage.getItem("pendingSnapToken");
      // const storedOrderId = sessionStorage.getItem("pendingOrderId");
      // if (storedToken && storedOrderId) {
      //   setPendingSnapToken(storedToken);
      //   setPendingOrderId(storedOrderId);
      // }
    } else {
      // Dummy fallback
      setTemplate(dummyTemplates.find(t => t.id === "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11") || dummyTemplates[0]);
    }
    setLoading(false);
  }, [orderId]);

  const handlePayment = async (e) => {
    e.preventDefault();
    if (!email || !template) return;
    
    setIsSubmitting(true);
    
    try {
      let snapToken = pendingSnapToken;
      let dbOrderId = pendingOrderId;

      if (!snapToken) {
        // 1. Memanggil API Orders kita
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            template_id: template.id,
            data_content: formData // Send the customized data!
          })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || "Terjadi kesalahan saat memproses pesanan");
        }
        
        snapToken = data.snap_token;
        dbOrderId = data.order_id;
        
        setPendingSnapToken(snapToken);
        setPendingOrderId(dbOrderId);
        sessionStorage.setItem("pendingSnapToken", snapToken);
        sessionStorage.setItem("pendingOrderId", dbOrderId);
      }
      
      // 2. Memunculkan Popup Midtrans Snap
      // snap.js dari script tag akan menyediakan window.snap
      if (window.snap) {
        window.snap.pay(snapToken, {
          onSuccess: function(result) {
            router.push(`/status/${dbOrderId}`);
          },
          onPending: function(result) {
            router.push(`/status/${dbOrderId}`);
          },
          onError: function(result) {
            alert("Pembayaran gagal. Silakan coba lagi.");
            setIsSubmitting(false);
          },
          onClose: function() {
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

  if (loading || !template) {
    return <div className="min-h-screen bg-bg flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-bg transition-colors duration-400 font-sans pb-[clamp(60px,8vw,100px)]">
      <Script 
        src={
          process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true" || (process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === undefined && process.env.NODE_ENV === "production")
            ? "https://app.midtrans.com/snap/snap.js"
            : "https://app.sandbox.midtrans.com/snap/snap.js"
        }
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      {/* Elegant Header */}
      <header className="bg-header-bg backdrop-blur-[10px] border-b border-header-border py-[16px] px-[24px] sticky top-0 z-20 transition-colors duration-400">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          <Link href={`/buat/${template.id}`} className="inline-flex items-center text-[14.5px] font-medium text-ink-soft hover:text-ink transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Batal
          </Link>
          <span className="font-serif text-[28px] font-bold text-ink italic leading-none">Invitea.</span>
          <div className="flex items-center gap-[6px] text-[12px] font-semibold tracking-wide text-green-700 bg-green-50/80 px-[14px] py-[6px] rounded-[4px] border border-green-200/50 uppercase">
            <ShieldCheck className="w-4 h-4" /> Pembayaran Aman
          </div>
        </div>
      </header>

      <main className="max-w-[1000px] mx-auto px-[clamp(20px,5vw,32px)] mt-[clamp(32px,5vw,64px)]">
        <div className="flex flex-col lg:flex-row gap-[clamp(32px,5vw,64px)]">
          
          {/* Left Column - Order Summary */}
          <div className="w-full lg:w-[55%] space-y-[32px]">
            <div>
              <h1 className="font-serif italic text-[2.8rem] font-semibold text-ink mb-[8px] leading-tight">Selesaikan Pesanan Anda</h1>
              <p className="text-ink-soft text-[15px]">Periksa kembali ringkasan pesanan Anda sebelum melakukan pembayaran.</p>
            </div>

            <div className="bg-bg-alt rounded-[6px] p-[clamp(24px,4vw,40px)] border border-hairline shadow-sm space-y-[32px]">
              
              <div className="flex gap-[24px] pb-[32px] border-b border-hairline/50">
                <div className="relative w-[90px] h-[120px] md:w-[120px] md:h-[160px] rounded-[4px_24px_4px_4px] overflow-hidden bg-photo-frame shrink-0 shadow-[var(--shadow-photo)] border-[3px] border-photo-frame">
                  <Image src={template.thumbnail || template.image || '/placeholder.jpg'} alt={template.nama || template.title} fill className="object-cover" />
                </div>
                <div className="flex flex-col justify-between py-[4px]">
                  <div>
                    <div className="inline-flex items-center rounded-[4px] border border-hairline/50 px-[10px] py-[4px] text-[10px] uppercase tracking-[0.06em] font-bold bg-bg-alt text-berry dark:bg-pink/10 dark:text-pink mb-[12px]">
                      {(template.kategori || template.category) === 'undangan' ? 'Undangan Pernikahan' : 'Kartu Ucapan'}
                    </div>
                    <h2 className="font-serif italic text-[22px] md:text-[26px] font-medium text-ink leading-tight">{template.nama || template.title}</h2>
                  </div>
                  <div>
                    <p className="font-sans font-semibold text-[20px] md:text-[24px] text-berry dark:text-pink">Rp {Number(template.harga || template.price || 0).toLocaleString("id-ID")}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-[16px]">
                <h3 className="font-semibold text-ink text-[15px]">Detail Pesanan</h3>
                <div className="grid grid-cols-2 gap-[16px]">
                  {(template.kategori || template.category) === 'undangan' ? (
                    <>
                      <div className="bg-bg p-[16px] rounded-[6px] border border-hairline/80">
                        <span className="block text-[12px] font-medium uppercase tracking-wider text-ink-soft mb-[4px]">Mempelai</span>
                        <span className="font-medium text-ink text-[14.5px]">{formData?.groomName || formData?.nama_panggilan_pria || 'Romeo'} & {formData?.brideName || formData?.nama_panggilan_wanita || 'Juliet'}</span>
                      </div>
                      <div className="bg-bg p-[16px] rounded-[6px] border border-hairline/80">
                        <span className="block text-[12px] font-medium uppercase tracking-wider text-ink-soft mb-[4px]">Tanggal</span>
                        <span className="font-medium text-ink text-[14.5px]">{formData?.date || formData?.acara1_tanggal || '24 Desember 2026'}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="bg-bg p-[16px] rounded-[6px] border border-hairline/80">
                        <span className="block text-[12px] font-medium uppercase tracking-wider text-ink-soft mb-[4px]">Pengirim</span>
                        <span className="font-medium text-ink text-[14.5px]">{formData?.nama_pengirim || formData?.senderName || 'Romeo'}</span>
                      </div>
                      <div className="bg-bg p-[16px] rounded-[6px] border border-hairline/80">
                        <span className="block text-[12px] font-medium uppercase tracking-wider text-ink-soft mb-[4px]">Penerima</span>
                        <span className="font-medium text-ink text-[14.5px]">{formData?.nama_penerima || formData?.receiverName || 'Juliet'}</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="w-full lg:w-[45%]">
            <div className="bg-bg-alt rounded-[6px] p-[clamp(24px,4vw,40px)] border border-hairline shadow-sm lg:sticky lg:top-32">
              
              <div className="flex items-center gap-[16px] p-[16px] bg-orange-50/80 border border-orange-200/60 text-orange-800 rounded-[6px] mb-[32px]">
                <div className="bg-orange-100/80 p-[10px] rounded-full text-orange-600">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[12.5px] font-medium text-orange-800/70 mb-[2px]">Selesaikan pembayaran dalam</p>
                  <p className="text-[18px] font-bold tracking-tight text-orange-900">05:00</p>
                </div>
              </div>

              <form onSubmit={handlePayment} className="space-y-[32px]">
                <div>
                  <h3 className="font-serif italic text-[24px] font-medium text-ink mb-[16px]">Informasi Pembeli</h3>
                  
                  <div className="space-y-[12px]">
                    <label className="text-[14px] font-semibold text-ink">Alamat Email</label>
                    <div className="relative">
                      <Mail className="absolute left-[16px] top-1/2 -translate-y-1/2 w-[20px] h-[20px] text-ink-soft" />
                      <input 
                        type="email" 
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@email.com"
                        className="w-full pl-[46px] pr-[16px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50"
                      />
                    </div>
                    <p className="text-[12.5px] text-ink-soft ml-[2px]">Kwitansi dan akses undangan akan dikirim ke email ini.</p>
                  </div>
                </div>

                <div className="pt-[24px] border-t border-hairline/50">
                  <div className="flex items-center justify-between mb-[24px]">
                    <span className="text-[16px] font-medium text-ink">Total Tagihan</span>
                    <span className="text-[26px] font-bold text-berry dark:text-pink">Rp {Number(template.harga || template.price || 0).toLocaleString("id-ID")}</span>
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={!email || isSubmitting}
                    className="w-full group flex items-center justify-center gap-[10px] bg-pink-btn-bg text-cream-text py-[18px] rounded-full font-sans font-semibold text-[16px] tracking-[0.01em] shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)] disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  >
                    {isSubmitting ? 'Memproses...' : 'Bayar Sekarang'}
                    {!isSubmitting && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
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
