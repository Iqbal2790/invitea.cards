"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PaymentStatusPage(props) {
  // Gunakan React.use() untuk mendapatkan param di client component modern Next 15
  const params = use(props.params);
  const orderId = params["order-id"];

  const [status, setStatus] = useState("loading"); // loading, success, failed, timeout
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!orderId) return;

    let pollInterval;
    const MAX_TIMEOUT = 5 * 60 * 1000; // 5 menit
    const startTime = Date.now();

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const data = await res.json();

        if (res.ok) {
          const paymentStatus = data.status;
          
          if (paymentStatus === "success" || paymentStatus === "settlement") {
            setStatus("success");
            clearInterval(pollInterval);
          } else if (paymentStatus === "failed" || paymentStatus === "cancel" || paymentStatus === "expire" || paymentStatus === "deny") {
            setStatus("failed");
            setErrorMsg("Pembayaran gagal, ditolak, atau telah kedaluwarsa.");
            clearInterval(pollInterval);
          }
          // Jika pending, biarkan loading lanjut
        } else {
          // Jika order tidak ditemukan atau error
          console.error(data.error);
        }
      } catch (err) {
        console.error("Error fetching status:", err);
      }

      // Check timeout
      if (Date.now() - startTime > MAX_TIMEOUT) {
        setStatus("timeout");
        clearInterval(pollInterval);
      }
    };

    // Langsung cek saat komponen dimuat
    checkStatus();

    // Set polling tiap 3 detik
    pollInterval = setInterval(checkStatus, 3000);

    return () => clearInterval(pollInterval);
  }, [orderId]);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-4 pt-24 pb-16">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] max-w-md w-full text-center border border-border-subtle">
        
        {status === "loading" && (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-brand/20 blur-xl rounded-full"></div>
              <Loader2 className="w-20 h-20 text-brand animate-spin relative" />
            </div>
            <div>
              <h2 className="text-2xl font-serif text-text-main mb-2">Memverifikasi Pembayaran...</h2>
              <p className="text-text-muted text-sm leading-relaxed">
                Harap jangan tutup halaman ini. Kami sedang menunggu konfirmasi pembayaran dari sistem bank Anda.
              </p>
            </div>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative animate-in zoom-in duration-500">
              <div className="absolute inset-0 bg-green-500/20 blur-xl rounded-full"></div>
              <CheckCircle2 className="w-20 h-20 text-green-500 relative" />
            </div>
            <div>
              <h2 className="text-2xl font-serif text-text-main mb-2">Pembayaran Berhasil!</h2>
              <p className="text-text-muted text-sm leading-relaxed">
                Undangan eksklusif Anda telah lunas dan masa tenggang telah dinonaktifkan.
              </p>
            </div>
            
            {/* TODO: Ganti ke URL undangan live (Fase 6) */}
            <div className="pt-4 w-full">
              <p className="text-xs text-text-muted mb-3 uppercase tracking-wider font-semibold">Selanjutnya</p>
              <Link href="/" className="block">
                <Button className="w-full h-12 text-base rounded-xl shadow-md hover:-translate-y-1 transition-transform">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </div>
        )}

        {(status === "failed" || status === "timeout") && (
          <div className="flex flex-col items-center space-y-6">
            <div className="relative animate-in zoom-in duration-500">
              <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full"></div>
              <XCircle className="w-20 h-20 text-red-500 relative" />
            </div>
            <div>
              <h2 className="text-2xl font-serif text-text-main mb-2">
                {status === "timeout" ? "Waktu Tunggu Habis" : "Pembayaran Gagal"}
              </h2>
              <p className="text-text-muted text-sm leading-relaxed">
                {status === "timeout" 
                  ? "Kami belum menerima konfirmasi pembayaran Anda dalam waktu 5 menit terakhir."
                  : (errorMsg || "Terjadi kesalahan atau pembayaran Anda ditolak oleh bank.")
                }
              </p>
            </div>
            
            <div className="pt-4 w-full space-y-3">
              <Link href={`/checkout/${orderId}`} className="block">
                <Button className="w-full h-12 text-base rounded-xl shadow-md hover:-translate-y-1 transition-transform">
                  Coba Bayar Lagi
                </Button>
              </Link>
              <Link href="/" className="block">
                <Button variant="outline" className="w-full h-12 text-base rounded-xl text-text-muted hover:text-text-main">
                  Kembali ke Beranda
                </Button>
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
