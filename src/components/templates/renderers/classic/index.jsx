"use client";

import { motion } from "framer-motion";
import { MapPin, CalendarHeart, Clock, Mail } from "lucide-react";
import Image from "next/image";

export default function ClassicTemplate({ data, isPreview = false }) {
  // Safe fallback data
  const groom = data?.groom || "Romeo";
  const bride = data?.bride || "Juliet";
  const eventDate = data?.eventDate || "2026-12-24T08:00";
  const locationName = data?.locationName || "Gedung Pernikahan Klasik";
  const locationAddress = data?.locationAddress || "Jl. Sudirman No. 1, Jakarta";
  
  // Parse date
  const dateObj = new Date(eventDate);
  const dayName = dateObj.toLocaleDateString("id-ID", { weekday: 'long' });
  const day = dateObj.getDate();
  const monthName = dateObj.toLocaleDateString("id-ID", { month: 'long' });
  const year = dateObj.getFullYear();
  const time = dateObj.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' });

  const handleRSVP = (e) => {
    e.preventDefault();
    if (isPreview) {
      alert("Mode Preview: Fitur RSVP dinonaktifkan.");
    } else {
      alert("Terima kasih atas konfirmasi Anda!");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-stone-50 min-h-screen shadow-2xl relative overflow-hidden font-serif">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[85vh] flex flex-col items-center justify-center text-white overflow-hidden">
        {/* Background Image / Placeholder */}
        <div className="absolute inset-0 bg-stone-800">
          <Image 
            src="/template-dummy.png" 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-60"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/20 to-transparent"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative z-10 text-center px-6 mt-20"
        >
          <p className="text-sm tracking-[0.3em] uppercase mb-6 text-stone-200">The Wedding Of</p>
          <h1 className="text-5xl md:text-6xl font-medium mb-4 leading-tight">{groom} <br/> <span className="text-3xl italic text-stone-300">&amp;</span> <br/> {bride}</h1>
          <p className="text-base tracking-widest mt-8 text-stone-300">
            {day} . {dateObj.getMonth() + 1} . {year}
          </p>
        </motion.div>
      </section>

      {/* 2. EVENT DETAILS */}
      <section className="py-20 px-8 text-center bg-white">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl text-stone-800 mb-2">Akad & Resepsi</h2>
          <div className="w-12 h-0.5 bg-stone-300 mx-auto mb-10"></div>

          <div className="space-y-8">
            <div className="flex flex-col items-center">
              <CalendarHeart className="w-6 h-6 text-stone-400 mb-3" />
              <p className="text-lg font-medium text-stone-700">{dayName}, {day} {monthName} {year}</p>
            </div>
            
            <div className="flex flex-col items-center">
              <Clock className="w-6 h-6 text-stone-400 mb-3" />
              <p className="text-lg font-medium text-stone-700">{time} WIB - Selesai</p>
            </div>

            <div className="flex flex-col items-center pt-4">
              <MapPin className="w-6 h-6 text-stone-400 mb-3" />
              <p className="text-lg font-medium text-stone-800 mb-1">{locationName}</p>
              <p className="text-sm text-stone-500 leading-relaxed mb-6">
                {locationAddress}
              </p>
              
              <button 
                onClick={() => {
                  if(isPreview) alert("Mode Preview: Peta tidak aktif.");
                }}
                className="bg-stone-800 text-white px-6 py-3 rounded-full text-sm font-sans tracking-wide hover:bg-stone-700 transition-colors shadow-lg"
              >
                Buka Google Maps
              </button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. RSVP FORM */}
      <section className="py-20 px-8 bg-stone-100">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 rounded-3xl shadow-sm border border-stone-200 text-center"
        >
          <Mail className="w-8 h-8 text-stone-300 mx-auto mb-4" />
          <h2 className="text-2xl text-stone-800 mb-2">Konfirmasi Kehadiran</h2>
          <p className="text-sm text-stone-500 mb-8 font-sans">
            Bantu kami mempersiapkan acara dengan lebih baik dengan mengkonfirmasi kehadiran Anda.
          </p>

          <form onSubmit={handleRSVP} className="space-y-4 font-sans text-left">
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Nama Tamu</label>
              <input 
                type="text" 
                required
                placeholder="Masukkan nama Anda"
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-sm"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-stone-600 mb-1">Kehadiran</label>
              <select 
                required
                className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:border-stone-400 text-sm"
              >
                <option value="">Pilih status kehadiran</option>
                <option value="hadir">Ya, Saya akan hadir</option>
                <option value="tidak">Maaf, tidak bisa hadir</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="w-full bg-stone-800 text-white py-3.5 rounded-full text-sm font-medium hover:bg-stone-700 transition-colors mt-2"
            >
              Kirim Konfirmasi
            </button>
          </form>
        </motion.div>
      </section>

      {/* Footer Branding */}
      <footer className="py-8 text-center bg-stone-900 text-stone-400 font-sans text-xs">
        Dibuat dengan <br/>
        <span className="font-serif text-lg font-bold text-white mt-1 block">Invitea.</span>
      </footer>

    </div>
  );
}
