"use client";

import Link from "next/link";
import { AlertCircle, ArrowRight, RotateCcw } from "lucide-react";

export default function FailedPage() {
  return (
    <div className="min-h-screen bg-bg-base font-sans flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-lg bg-white rounded-[2rem] p-8 md:p-12 border border-border-subtle shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center">
        
        {/* Animated Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 rounded-full animate-pulse opacity-75"></div>
            <div className="relative bg-red-50 text-red-500 p-4 rounded-full border border-red-200 shadow-sm">
              <AlertCircle className="w-12 h-12" />
            </div>
          </div>
        </div>

        <h1 className="font-serif text-3xl font-semibold text-text-main mb-2">
          Pembayaran Gagal
        </h1>
        <p className="text-text-muted mb-8 text-sm md:text-base">
          Maaf, kami tidak dapat memproses pembayaran Anda. Waktu mungkin telah habis atau transaksi dibatalkan.
        </p>

        <div className="bg-bg-base p-6 rounded-2xl border border-border-subtle/50 mb-8 space-y-4 text-left">
          <div className="flex items-start gap-4">
            <div className="bg-gray-100 p-2.5 rounded-xl border border-border-subtle shrink-0 mt-0.5">
              <RotateCcw className="w-5 h-5 text-text-muted" />
            </div>
            <div>
              <h3 className="font-medium text-text-main text-sm mb-1">Jangan Khawatir!</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Pesanan Anda (beserta data formulir yang sudah diisi) aman bersama kami. Anda bisa mencoba melakukan pembayaran kembali menggunakan metode lain.
              </p>
            </div>
          </div>
        </div>

        {/* PILL SHAPED BUTTON - PRIMARY (Brand Color) */}
        <Link 
          href="/checkout/dummy-order-123"
          className="w-full group inline-flex items-center justify-center gap-2 bg-brand text-white py-4 px-8 rounded-full text-base font-medium hover:bg-brand/90 transition-all duration-300 shadow-md shadow-brand/20 hover:shadow-lg hover:-translate-y-0.5 mb-4"
        >
          Coba Bayar Lagi
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        
        {/* SECONDARY OUTLINE BUTTON */}
        <Link 
          href="/"
          className="inline-flex items-center justify-center text-sm font-medium text-text-muted hover:text-text-main transition-colors py-2"
        >
          Batal & Kembali ke Beranda
        </Link>

      </div>
      
    </div>
  );
}
