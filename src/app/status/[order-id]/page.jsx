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
    <div className="min-h-screen bg-bg-base font-sans flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center space-y-6">
        
        {/* Animated Security/Loading Icon */}
        <div className="relative inline-flex items-center justify-center">
          <div className="absolute inset-0 bg-brand-light/50 rounded-full animate-ping opacity-75"></div>
          <div className="relative bg-white p-5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-border-subtle z-10">
            <Loader2 className="w-12 h-12 text-brand animate-spin" />
            <ShieldCheck className="w-5 h-5 text-green-500 absolute bottom-3 right-3 bg-white rounded-full" />
          </div>
        </div>

        <div>
          <h1 className="font-serif text-2xl font-bold text-text-main mb-2">
            Memverifikasi Pembayaran
          </h1>
          <p className="text-text-muted text-sm font-medium animate-pulse">
            {progress}
          </p>
        </div>

        <div className="pt-8">
          <p className="text-xs text-text-muted">
            Mohon jangan tutup atau menyegarkan (refresh) halaman ini.
          </p>
        </div>

      </div>
    </div>
  );
}
