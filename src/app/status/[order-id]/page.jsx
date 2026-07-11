"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, XCircle, CreditCard } from "lucide-react";
import Link from "next/link";
import Script from "next/script";

export default function StatusPage({ params }) {
  const resolvedParams = use(params);
  const { "order-id": orderId } = resolvedParams;
  const router = useRouter();
  
  const [progress, setProgress] = useState("Mengecek status transaksi Midtrans...");
  const [status, setStatus] = useState("pending");
  const [snapToken, setSnapToken] = useState(null);

  useEffect(() => {
    // Load snap token from session storage if available
    const token = sessionStorage.getItem("pendingSnapToken");
    if (token) setSnapToken(token);
    
    if (!orderId) return;
    
    let isPolling = true;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();
        
        if (data.status) {
          if (data.status === "paid" || data.status === "settlement" || data.status === "capture") {
            // Remove token when success
            sessionStorage.removeItem("pendingSnapToken");
            sessionStorage.removeItem("pendingOrderId");
            router.push(`/success?order_id=${orderId}`);
            isPolling = false;
          } else if (data.status === "failed" || data.status === "cancel" || data.status === "expire" || data.status === "deny") {
            setStatus("failed");
            setProgress("Pembayaran dibatalkan atau gagal.");
            isPolling = false;
          }
        }
      } catch (error) {
        console.error("Error checking status:", error);
      }
      
      if (isPolling) {
        setTimeout(checkStatus, 3000); // poll every 3 seconds
      }
    };

    checkStatus();

    return () => {
      isPolling = false;
    };
  }, [orderId, router]);

  const handleReopenPayment = () => {
    if (window.snap && snapToken) {
      window.snap.pay(snapToken, {
        onSuccess: function(result) {
          // It will poll and redirect automatically
        },
        onPending: function(result) {
          // Do nothing, just let it keep polling
        },
        onError: function(result) {
          alert("Pembayaran gagal. Silakan coba lagi.");
        },
        onClose: function() {
          // Do nothing
        }
      });
    } else {
      alert("Sistem pembayaran belum siap. Silakan muat ulang halaman.");
    }
  };

  if (status === "failed") {
    return (
      <div className="min-h-screen bg-bg transition-colors duration-400 font-sans flex flex-col items-center justify-center p-[24px]">
        <div className="w-full max-w-[480px] bg-bg-alt p-[clamp(32px,5vw,64px)] rounded-[6px] border border-hairline shadow-sm text-center space-y-[32px]">
          <div className="relative inline-flex items-center justify-center">
            <div className="relative bg-red-50 p-[24px] rounded-full border border-red-100 z-10">
              <XCircle className="w-12 h-12 text-red-500" />
            </div>
          </div>
          <div>
            <h1 className="font-serif italic text-[2.4rem] md:text-[2.8rem] font-semibold text-ink mb-[12px] leading-tight">
              Pembayaran Gagal
            </h1>
            <p className="text-ink-soft text-[15px] font-medium">
              Transaksi Anda telah dibatalkan atau waktu pembayaran sudah habis.
            </p>
          </div>
          <div className="pt-[16px] border-t border-hairline/50">
            <Link 
              href={`/checkout/custom`}
              className="w-full group flex items-center justify-center gap-[10px] bg-ink text-bg-alt py-[18px] rounded-full font-sans font-semibold text-[16px] tracking-[0.01em] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_rgba(0,0,0,0.15)]"
            >
              Kembali ke Checkout
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg transition-colors duration-400 font-sans flex flex-col items-center justify-center p-[24px]">
      <Script 
        src={
          process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === "true" || (process.env.NEXT_PUBLIC_MIDTRANS_IS_PRODUCTION === undefined && process.env.NODE_ENV === "production")
            ? "https://app.midtrans.com/snap/snap.js"
            : "https://app.sandbox.midtrans.com/snap/snap.js"
        }
        data-client-key={process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY}
        strategy="lazyOnload"
      />
      <div className="w-full max-w-[480px] bg-bg-alt p-[clamp(32px,5vw,64px)] rounded-[6px] border border-hairline shadow-sm text-center space-y-[32px]">
        
        {/* Animated Security/Loading Icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-pink-soft/80 rounded-full animate-ping opacity-75"></div>
          <div className="relative bg-bg p-[24px] rounded-full shadow-[var(--shadow-pink)] border border-hairline z-10">
            <Loader2 className="w-12 h-12 text-berry dark:text-pink animate-spin" />
            <ShieldCheck className="w-6 h-6 text-green-600 absolute bottom-3 right-3 bg-green-50 rounded-full p-0.5" />
          </div>
        </div>

        <div>
          <h1 className="font-serif italic text-[2.4rem] md:text-[2.8rem] font-semibold text-ink mb-[12px] leading-tight">
            Memverifikasi Pembayaran
          </h1>
          <p className="text-ink-soft text-[15px] font-medium animate-pulse">
            {progress}
          </p>
        </div>

        {snapToken && (
          <div className="pt-[24px]">
            <button 
              onClick={handleReopenPayment}
              className="w-full group flex items-center justify-center gap-[10px] bg-pink-btn-bg text-cream-text py-[18px] rounded-full font-sans font-semibold text-[16px] tracking-[0.01em] shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)]"
            >
              <CreditCard className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
              Buka Instruksi Pembayaran
            </button>
          </div>
        )}

        <div className="pt-[16px] border-t border-hairline/50">
          <p className="text-[12px] text-ink-soft">
            Mohon jangan tutup atau menyegarkan (refresh) halaman ini.
          </p>
        </div>

      </div>
    </div>
  );
}
