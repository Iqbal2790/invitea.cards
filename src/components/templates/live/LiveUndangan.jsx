"use client";

import { motion } from "framer-motion";
import { Calendar, MapPin, Heart, ExternalLink } from "lucide-react";
import Image from "next/image";
import Countdown from "@/components/invitation/Countdown";
import MapsEmbed from "@/components/invitation/MapsEmbed";
import MusicPlayer from "@/components/invitation/MusicPlayer";

export default function LiveUndangan({ dataContent, fotoUrls }) {
  const { 
    nama_pria = "Pria", 
    nama_wanita = "Wanita", 
    acara1_nama = "Akad Nikah",
    acara1_tanggal = "", 
    acara1_jam = "", 
    acara1_lokasi = "", 
    acara1_maps_url = "",
    acara2_nama = "Resepsi",
    acara2_tanggal = "", 
    acara2_jam = "", 
    acara2_lokasi = "",
    acara2_maps_url = "",
    youtube_url = ""
  } = dataContent || {};

  const heroImage = fotoUrls?.[0] || "/placeholder-wedding.jpg";
  const galleryImages = fotoUrls?.slice(1) || [];

  return (
    <div className="min-h-screen bg-bg-base overflow-x-hidden selection:bg-brand selection:text-white pb-24">
      {youtube_url && <MusicPlayer youtube_url={youtube_url} />}
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image 
            src={heroImage} 
            alt="Hero Background" 
            fill 
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-bg-base"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-white/80 uppercase tracking-[0.3em] text-sm mb-6 font-medium"
          >
            Pernikahan
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
            className="font-serif text-5xl md:text-7xl text-white mb-8 drop-shadow-lg"
          >
            {nama_pria}
            <span className="block text-3xl md:text-5xl text-brand my-2 italic">&</span>
            {nama_wanita}
          </motion.h1>
          
          <motion.div
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 2, duration: 1 }}
          >
             <div className="w-px h-24 bg-gradient-to-b from-brand to-transparent mx-auto"></div>
          </motion.div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <Heart className="w-8 h-8 text-brand mx-auto mb-4 opacity-50" />
          <h2 className="font-serif text-3xl md:text-4xl text-text-main mb-6">Acara Bahagia Kami</h2>
          <p className="text-text-muted leading-relaxed max-w-2xl mx-auto mb-10">
            Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.
          </p>
          {(acara1_tanggal || acara2_tanggal) && (
             <div className="mb-10">
               <Countdown 
                 tanggal_acara={acara1_tanggal || acara2_tanggal} 
                 jam_acara={acara1_tanggal ? acara1_jam : acara2_jam} 
               />
             </div>
          )}
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Acara 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="bg-white p-8 rounded-3xl border border-border-subtle shadow-sm text-center relative overflow-hidden group flex flex-col h-full"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-brand transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            <h3 className="font-serif text-2xl text-text-main mb-6">{acara1_nama}</h3>
            <div className="flex items-center justify-center gap-3 text-text-muted mb-4">
              <Calendar className="w-5 h-5 text-brand shrink-0" />
              <p>{acara1_tanggal ? new Date(acara1_tanggal).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "TBA"} {acara1_jam && `• ${acara1_jam}`}</p>
            </div>
            <div className="flex items-center justify-center gap-3 text-text-muted mb-6 flex-1">
              <MapPin className="w-5 h-5 text-brand shrink-0" />
              <p>{acara1_lokasi || "TBA"}</p>
            </div>
            {acara1_maps_url && (
              <div className="w-full mt-4 space-y-4">
                <a href={acara1_maps_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-brand hover:text-brand-dark font-medium transition-colors">
                  <ExternalLink className="w-4 h-4" /> Buka di Maps
                </a>
                <div className="w-full h-48 rounded-xl overflow-hidden shadow-inner">
                  <MapsEmbed url={acara1_maps_url} />
                </div>
              </div>
            )}
          </motion.div>

          {/* Acara 2 */}
          {acara2_nama && (
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="bg-brand-dark p-8 rounded-3xl shadow-lg text-center text-white relative overflow-hidden flex flex-col h-full"
            >
              <h3 className="font-serif text-2xl mb-6 text-brand">{acara2_nama}</h3>
              <div className="flex items-center justify-center gap-3 text-white/80 mb-4">
                <Calendar className="w-5 h-5 text-brand shrink-0" />
                <p>{acara2_tanggal ? new Date(acara2_tanggal).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "TBA"} {acara2_jam && `• ${acara2_jam}`}</p>
              </div>
              <div className="flex items-center justify-center gap-3 text-white/80 mb-6 flex-1">
                <MapPin className="w-5 h-5 text-brand shrink-0" />
                <p>{acara2_lokasi || "TBA"}</p>
              </div>
              {acara2_maps_url && (
                <div className="w-full mt-4 space-y-4">
                  <a href={acara2_maps_url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-brand hover:text-white font-medium transition-colors">
                    <ExternalLink className="w-4 h-4" /> Buka di Maps
                  </a>
                  <div className="w-full h-48 rounded-xl overflow-hidden shadow-inner bg-white/10">
                    <MapsEmbed url={acara2_maps_url} />
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      {galleryImages.length > 0 && (
        <section className="py-24 bg-white px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-text-main mb-12 text-center">Galeri Momen</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Footer */}
      <footer className="py-12 text-center bg-brand-dark text-white/60 text-sm">
        <p>Made with ❤️ by <a href="https://invitea.cards" className="text-brand hover:text-white transition-colors">Invitea</a></p>
      </footer>
    </div>
  );
}
