"use client";

import { motion } from "framer-motion";
import { PenLine, CreditCard, Send, LayoutTemplate } from "lucide-react";

export default function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="w-full py-24 bg-bg-base border-t border-border-subtle">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-serif text-3xl md:text-5xl font-semibold text-text-main">Sesederhana Itu</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">Tidak perlu keahlian teknis. Hanya dengan 4 langkah mudah, undangan cantik Anda siap dibagikan.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-subtle flex flex-col items-start">
            <div className="w-14 h-14 bg-brand-light/50 rounded-2xl flex items-center justify-center text-brand mb-6">
              <LayoutTemplate className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-text-main mb-3">1. Pilih Desain</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Temukan variasi desain menawan yang paling cocok dengan nuansa acaramu.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-subtle flex flex-col items-start">
            <div className="w-14 h-14 bg-brand-light/50 rounded-2xl flex items-center justify-center text-brand mb-6">
              <PenLine className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-text-main mb-3">2. Isi Detail Acara</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Masukkan informasi mempelai, waktu, lokasi peta, dan pesan singkat Anda.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-subtle flex flex-col items-start">
            <div className="w-14 h-14 bg-brand-light/50 rounded-2xl flex items-center justify-center text-brand mb-6">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-text-main mb-3">3. Aktivasi</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Selesaikan pembayaran ringan dengan mudah untuk mengaktifkan tautan undanganmu.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-subtle flex flex-col items-start">
            <div className="w-14 h-14 bg-brand-light/50 rounded-2xl flex items-center justify-center text-brand mb-6">
              <Send className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-medium text-text-main mb-3">4. Bagikan</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              Tautan eksklusif siap dibagikan ke seluruh orang terkasih melalui WhatsApp atau media sosial.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
