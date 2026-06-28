"use client";

import { motion } from "framer-motion";
import { MailOpen } from "lucide-react";
import Image from "next/image";

import MusicPlayer from "@/components/invitation/MusicPlayer";

export default function LiveUcapan({ dataContent, fotoUrls }) {
  const { 
    nama_penerima = "Seseorang", 
    pesan_ucapan = "Semoga hari ini dan seterusnya selalu dipenuhi dengan kebahagiaan.",
    nama_pengirim = "Teman",
    momen = "",
    youtube_url = ""
  } = dataContent || {};

  const heroImage = fotoUrls?.[0] || "/placeholder-greeting.jpg";
  const galleryImages = fotoUrls?.slice(1) || [];

  return (
    <div className="min-h-screen bg-[#fdfbf7] overflow-x-hidden selection:bg-brand selection:text-white pb-24">
      {youtube_url && <MusicPlayer youtube_url={youtube_url} />}
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src={heroImage} 
            alt="Hero Background" 
            fill 
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-[#fdfbf7]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
            className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 border border-white/30 text-white"
          >
            <MailOpen className="w-8 h-8" />
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="font-serif text-4xl md:text-6xl text-white drop-shadow-lg max-w-2xl"
          >
            {momen ? momen : "A Special Message"}
          </motion.h1>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-24 px-4 max-w-3xl mx-auto -mt-20 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="bg-white p-8 md:p-16 rounded-[2rem] shadow-xl border border-brand/10 text-center"
        >
          <p className="text-brand uppercase tracking-[0.2em] text-sm font-semibold mb-8">Dear, {nama_penerima}</p>
          
          <div className="relative">
            <span className="absolute -top-10 -left-6 text-6xl text-brand/10 font-serif">"</span>
            <p className="font-serif text-xl md:text-3xl text-text-main leading-relaxed mb-12 relative z-10 whitespace-pre-wrap">
              {pesan_ucapan}
            </p>
            <span className="absolute -bottom-10 -right-6 text-6xl text-brand/10 font-serif">"</span>
          </div>

          <div className="w-16 h-px bg-border-subtle mx-auto mb-8"></div>
          
          <p className="text-text-muted text-sm tracking-wider uppercase mb-2">Warm Regards,</p>
          <p className="font-serif text-xl text-brand-dark">{nama_pengirim}</p>
        </motion.div>
      </section>

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="py-16 px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {galleryImages.map((src, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative aspect-square rounded-2xl overflow-hidden group shadow-sm"
                >
                  <Image 
                    src={src} 
                    alt={`Gallery ${idx + 1}`} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors duration-500"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 text-center text-text-muted text-sm">
        <p>Made with ❤️ by <a href="https://invitea.cards" className="text-brand hover:text-brand-dark transition-colors">Invitea</a></p>
      </footer>
    </div>
  );
}
