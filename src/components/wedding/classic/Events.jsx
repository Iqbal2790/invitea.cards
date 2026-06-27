"use client";
import { motion } from "framer-motion";
import { MapPin, CalendarHeart } from "lucide-react";

export default function Events({ data }) {
  const Card = ({ event, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.2, delay: index * 0.3, ease: "easeOut" }}
      className="bg-white/30 backdrop-blur-md rounded-[32px] p-8 shadow-xl border-[0.5px] border-white/60 text-center relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-2 bg-primary/30"></div>
      
      <h3 className="font-serif text-4xl italic text-primary mb-6">{event.nama}</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-center gap-2 text-text-main mb-2">
            <CalendarHeart className="w-5 h-5 opacity-70" />
            <p className="font-medium">{event.hari_tanggal}</p>
          </div>
          <p className="font-sans text-sm text-text-muted">{event.waktu}</p>
        </div>
        
        <div className="w-12 h-[1px] bg-primary/30 mx-auto"></div>
        
        <div>
          <div className="flex items-center justify-center gap-2 text-text-main mb-2">
            <MapPin className="w-5 h-5 opacity-70" />
            <p className="font-medium">{event.lokasi_nama}</p>
          </div>
          <p className="font-sans text-sm text-text-muted leading-relaxed">
            {event.lokasi_alamat}
          </p>
        </div>
      </div>
      
      <div className="mt-8">
        <a 
          href={event.google_maps_url}
          target="_blank"
          rel="noreferrer"
          className="inline-block px-8 py-3 rounded-full border-[0.5px] border-primary/50 text-primary font-sans text-sm tracking-wider hover:bg-primary hover:text-white transition-all"
        >
          Lihat Peta
        </a>
      </div>
    </motion.div>
  );

  return (
    <section className="py-20 px-6 relative z-10 overflow-hidden">
      {/* Background Section */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute inset-0 bg-[url('/images/backgrounds/bg_events.png')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px]"></div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center space-y-4 mb-12"
      >
        <h2 className="font-serif text-4xl text-primary">Detail Acara</h2>
        <p className="font-sans text-sm text-text-muted">Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir pada acara pernikahan kami.</p>
      </motion.div>

      <div className="space-y-8">
        <Card event={data.acara.akad} index={0} />
        <Card event={data.acara.resepsi} index={1} />
      </div>
    </section>
  );
}
