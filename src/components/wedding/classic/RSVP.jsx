"use client";
import { motion } from "framer-motion";

export default function RSVP() {
  return (
    <section className="py-20 px-6 pb-32 relative z-10 overflow-hidden">
      {/* Background Section */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/bg_rsvp.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="bg-white/30 backdrop-blur-md rounded-[32px] p-8 shadow-xl border-[0.5px] border-white/60 relative overflow-hidden"
      >
        <h2 className="font-serif text-3xl text-primary mb-6">Konfirmasi Kehadiran</h2>
        <p className="font-sans text-sm text-text-muted mb-8 leading-relaxed">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
        </p>
        
        <form className="space-y-4 font-sans text-sm" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="text" 
            placeholder="Nama Lengkap" 
            className="w-full bg-white border border-secondary/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main"
          />
          <select className="w-full bg-white border border-secondary/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main">
            <option value="">Apakah Anda akan hadir?</option>
            <option value="hadir">Ya, saya akan hadir</option>
            <option value="tidak">Maaf, saya tidak bisa hadir</option>
          </select>
          <input 
            type="number" 
            placeholder="Jumlah Kehadiran (Orang)" 
            className="w-full bg-white border border-secondary/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main"
          />
          <textarea 
            placeholder="Kirim ucapan & doa..." 
            rows="3"
            className="w-full bg-white border border-secondary/50 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 text-text-main"
          ></textarea>
          
          <button className="w-full bg-primary text-white rounded-xl py-4 font-semibold hover:bg-opacity-90 transition-all shadow-md mt-4">
            Kirim RSVP
          </button>
        </form>
      </motion.div>
    </section>
  );
}
