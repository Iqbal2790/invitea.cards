"use client";

import Link from "next/link";
import { CheckCircle2, MailOpen, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-bg-base font-sans flex flex-col items-center justify-center p-4">
      
      <div className="w-full max-w-lg bg-white rounded-[2rem] p-8 md:p-12 border border-border-subtle shadow-[0_8px_30px_rgb(0,0,0,0.04)] text-center">
        
        {/* Animated Check Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-green-50 text-green-500 p-4 rounded-full border border-green-200 shadow-sm">
              <CheckCircle2 className="w-12 h-12" />
            </div>
          </div>
        </div>

        <h1 className="font-serif text-3xl font-semibold text-text-main mb-2">
          Pembayaran Berhasil!
        </h1>
        <p className="text-text-muted mb-8 text-sm md:text-base">
          Terima kasih telah mempercayakan momen spesial Anda bersama Invitea. Pesanan Anda telah kami terima.
        </p>

        <div className="bg-bg-base p-6 rounded-2xl border border-border-subtle/50 mb-8 space-y-4 text-left">
          <div className="flex items-start gap-4">
            <div className="bg-brand-light/50 p-2.5 rounded-xl border border-brand/20 shrink-0 mt-0.5">
              <MailOpen className="w-5 h-5 text-brand" />
            </div>
            <div>
              <h3 className="font-medium text-text-main text-sm mb-1">Cek Kotak Masuk Anda</h3>
              <p className="text-xs text-text-muted leading-relaxed">
                Kwitansi dan <strong className="text-text-main">Magic Link</strong> (tautan rahasia) untuk mengelola undangan telah dikirimkan ke email Anda. Gunakan tautan tersebut untuk mengedit isi undangan kapan saja.
              </p>
            </div>
          </div>
        </div>

        {/* PILL SHAPED BUTTON */}
        <Link 
          href="/"
          className="w-full group inline-flex items-center justify-center gap-2 bg-brand text-white py-4 px-8 rounded-full text-base font-medium hover:bg-brand/90 transition-all duration-300 shadow-md shadow-brand/20 hover:shadow-lg hover:-translate-y-0.5"
        >
          Kembali ke Beranda
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <p className="text-[11px] text-text-muted mt-6">
          Tidak menerima email? Periksa folder Spam Anda atau hubungi dukungan pelanggan kami.
        </p>

      </div>
      
    </div>
  );
}
