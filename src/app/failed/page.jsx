"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, RotateCcw } from "lucide-react";

export default function FailedPage() {
  return (
    <div className="min-h-screen bg-bg transition-colors duration-400 font-sans flex flex-col items-center justify-center p-[24px]">
      
      <div className="w-full max-w-[540px] bg-bg-alt rounded-[6px] p-[clamp(32px,5vw,64px)] border border-hairline shadow-sm text-center">
        
        {/* Animated Error Icon */}
        <div className="flex justify-center mb-[24px]">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse opacity-75"></div>
            <div className="relative bg-red-50 text-red-600 p-[20px] rounded-full border border-red-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <AlertCircle className="w-[48px] h-[48px]" />
            </div>
          </div>
        </div>

        <h1 className="font-serif italic text-[2.6rem] md:text-[3rem] font-semibold text-ink mb-[12px] leading-tight">
          Pembayaran Gagal
        </h1>
        <p className="text-ink-soft mb-[32px] text-[15px] max-w-[40ch] mx-auto leading-relaxed">
          Maaf, kami tidak dapat memproses pembayaran Anda. Waktu mungkin telah habis atau transaksi dibatalkan.
        </p>

        <div className="bg-bg p-[24px] rounded-[6px] border border-hairline mb-[32px] text-left">
          <div className="flex items-start gap-[16px]">
            <div className="bg-bg-alt p-[12px] rounded-full border border-hairline shrink-0">
              <RotateCcw className="w-[20px] h-[20px] text-ink-soft" />
            </div>
            <div>
              <h3 className="font-medium text-ink text-[15px] mb-[6px]">Jangan Khawatir!</h3>
              <p className="text-[13.5px] text-ink-soft leading-[1.6]">
                Pesanan Anda (beserta data formulir yang sudah diisi) aman bersama kami. Anda bisa mencoba melakukan pembayaran kembali menggunakan metode lain.
              </p>
            </div>
          </div>
        </div>

        {/* PILL SHAPED BUTTON - PRIMARY */}
        <Link 
          href="/checkout/dummy-order-123"
          className="w-full group inline-flex items-center justify-center gap-[10px] bg-pink-btn-bg text-cream-text py-[18px] px-[32px] rounded-full font-sans font-semibold text-[16px] tracking-[0.01em] shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)] mb-[16px]"
        >
          Coba Bayar Lagi
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
        
        {/* SECONDARY OUTLINE BUTTON */}
        <Link 
          href="/"
          className="inline-flex items-center justify-center text-[14.5px] font-medium text-ink-soft hover:text-ink transition-colors py-[8px]"
        >
          Batal & Kembali ke Beranda
        </Link>

      </div>
      
    </div>
  );
}
