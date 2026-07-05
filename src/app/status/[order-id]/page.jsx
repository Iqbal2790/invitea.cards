"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";

export default function StatusPage() {
  const router = useRouter();
  const [progress, setProgress] = useState("Menghubungi server bank...");

  useEffect(() => {
    // Simulasi proses verifikasi pembayaran (untuk dummy/testing)
    const steps = [
      { text: "Mengecek status transaksi Midtrans...", time: 1000 },
      { text: "Memverifikasi data pesanan...", time: 2000 },
      { text: "Menyiapkan tautan sakti (Magic Link)...", time: 3000 }
    ];

    steps.forEach(step => {
      setTimeout(() => setProgress(step.text), step.time);
    });

    // Setelah 4 detik, arahkan ke halaman sukses (atau gagal jika logic backend sudah ada)
    const timer = setTimeout(() => {
      router.push("/success");
    }, 4500);

    return () => clearTimeout(timer);
  }, [router]);

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
