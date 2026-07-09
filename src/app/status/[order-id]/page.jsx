"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck, XCircle } from "lucide-react";
import Link from "next/link";

export default function StatusPage({ params }) {
  const resolvedParams = use(params);
  const { "order-id": orderId } = resolvedParams;
  const router = useRouter();
  
  const [progress, setProgress] = useState("Mengecek status transaksi Midtrans...");
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    if (!orderId) return;
    
    let isPolling = true;

    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();
        
        if (data.status) {
          if (data.status === "settlement" || data.status === "capture") {
            router.push("/success");
            isPolling = false;
          } else if (data.status === "cancel" || data.status === "expire" || data.status === "deny") {
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
              className="inline-flex w-full justify-center items-center h-[54px] rounded-[6px] font-sans font-semibold text-[15px] text-bg-alt bg-ink hover:bg-ink/90 transition-colors"
            >
              Coba Bayar Lagi
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg transition-colors duration-400 font-sans flex flex-col items-center justify-center p-[24px]">
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

        <div className="pt-[16px] border-t border-hairline/50">
          <p className="text-[12px] text-ink-soft">
            Mohon jangan tutup atau menyegarkan (refresh) halaman ini.
          </p>
        </div>

      </div>
    </div>
  );
}
