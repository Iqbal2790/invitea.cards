"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, MapPin, Calendar, Clock, X, Heart, MessageCircle, Send, Image as ImageIcon, Sparkles } from "lucide-react";

// --- Helpers ---
const cn = (...classes) => classes.filter(Boolean).join(" ");
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("id-ID", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  } catch(e) {
    return dateStr;
  }
};
const formatTime = (timeStr) => {
  if (!timeStr) return "";
  return timeStr.includes("WIB") || timeStr.includes("WITA") || timeStr.includes("WIT") ? timeStr : `${timeStr} WIB`;
};

export default function FolioBloomRenderer({ data, isPreview = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  
  // Music state
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // RSVP & Guestbook State
  const [rsvpData, setRsvpData] = useState({ nama_tamu: "", hadir: true, jumlah_tamu: 1, pesan: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guestbook, setGuestbook] = useState(data.rsvps ? data.rsvps.filter(r => r.pesan) : []);

  // Setup Audio
  const extractYoutubeId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };
  const youtubeId = extractYoutubeId(data.music_youtube_url);

  const cards = [
    { id: "mempelai", label: "Mempelai", icon: Heart },
    { id: "acara", label: "Acara", icon: Calendar },
    { id: "galeri", label: "Galeri", icon: ImageIcon },
    { id: "musik", label: "Musik", icon: Play },
    { id: "rsvp", label: "RSVP & Ucapan", icon: MessageCircle },
    { id: "penutup", label: "Penutup", icon: Sparkles },
  ];

  // Fan-out animation configuration
  const fanOutVariants = {
    closed: { rotate: 0, x: 0, y: 0, scale: 0.9, opacity: 0 },
    open: (i) => {
      // Create a nice fan out effect (arc)
      const angle = -45 + (i * (90 / (cards.length - 1)));
      const rad = angle * (Math.PI / 180);
      const radius = 120; // Spread distance
      return {
        rotate: angle,
        x: Math.sin(rad) * radius,
        y: -Math.cos(rad) * radius + 50,
        scale: 1,
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay: i * 0.05,
        }
      };
    },
    hover: (i) => {
      const angle = -45 + (i * (90 / (cards.length - 1)));
      const rad = angle * (Math.PI / 180);
      const radius = 120;
      return {
        y: -Math.cos(rad) * radius + 40, // 10px higher
        scale: 1.05,
        transition: {
          duration: 0.2,
          ease: "easeOut"
        }
      };
    }
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (isPreview) {
      alert("Mode Preview: Fitur RSVP dinonaktifkan.");
      return;
    }

    if (!rsvpData.nama_tamu) {
      alert("Mohon isi nama Anda");
      return;
    }

    setIsSubmitting(true);
    try {
      const statusKehadiran = rsvpData.hadir ? "hadir" : "tidak_hadir";
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: data.id,
          nama_tamu: rsvpData.nama_tamu,
          status_kehadiran: statusKehadiran,
          jumlah_tamu: rsvpData.jumlah_tamu,
          pesan: rsvpData.pesan
        })
      });

      if (res.ok) {
        const { data: newWish } = await res.json();
        alert("Terima kasih atas konfirmasi dan ucapan Anda!");
        if (newWish && newWish.pesan) {
          setGuestbook([newWish, ...guestbook]);
        }
        setRsvpData({ nama_tamu: "", hadir: true, jumlah_tamu: 1, pesan: "" });
      } else {
        alert("Gagal mengirim konfirmasi. Silakan coba lagi.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Card Contents
  // ---------------------------------------------------------------------------
  const renderCardContent = (id) => {
    switch (id) {
      case "mempelai":
        const prewedPhoto = data.foto_cover || "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800";
        return (
          <div className="relative flex flex-col items-center justify-end text-center h-full pb-12">
            <div className="absolute inset-0 z-0">
              <img src={prewedPhoto} alt="Prewedding" className="w-full h-full object-cover rounded-2xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#FBF7EE] via-[#FBF7EE]/80 to-transparent rounded-2xl"></div>
            </div>
            
            <div className="relative z-10 space-y-8 px-6">
              <div>
                <h2 className="font-serif italic text-4xl text-[#2B2632] mb-2">{data.mempelai_pria_nama || "Romeo"}</h2>
                <p className="font-sans text-sm text-[#6B6577]">{data.mempelai_pria_ortu || "Putra dari Bpk. Montague & Ibu Montague"}</p>
              </div>
              <div className="text-2xl text-[#CC9C95]">&amp;</div>
              <div>
                <h2 className="font-serif italic text-4xl text-[#2B2632] mb-2">{data.mempelai_wanita_nama || "Juliet"}</h2>
                <p className="font-sans text-sm text-[#6B6577]">{data.mempelai_wanita_ortu || "Putri dari Bpk. Capulet & Ibu Capulet"}</p>
              </div>
            </div>
          </div>
        );
      
      case "acara":
        return (
          <div className="flex flex-col h-full space-y-10 py-6 overflow-y-auto">
            <h2 className="font-serif italic text-3xl text-center text-[#2B2632]">Rangkaian Acara</h2>
            
            {/* Akad */}
            <div className="text-center space-y-4">
              <h3 className="font-sans font-bold tracking-widest uppercase text-sm text-[#CC9C95]">{data.acara_akad_nama || "Akad Nikah"}</h3>
              <div className="font-sans text-[#2B2632] space-y-2">
                <p className="flex items-center justify-center gap-2"><Calendar className="w-4 h-4 text-[#B9A9D9]" /> {formatDate(data.acara_akad_tanggal) || "Sabtu, 12 Desember 2026"}</p>
                <p className="flex items-center justify-center gap-2"><Clock className="w-4 h-4 text-[#B9A9D9]" /> {formatTime(data.acara_akad_jam) || "08:00 WIB"}</p>
                <div className="pt-2">
                  <p className="font-semibold">{data.acara_akad_lokasi_nama || "Masjid Raya"}</p>
                  <p className="text-sm text-[#6B6577] mt-1 px-4">{data.acara_akad_lokasi_alamat || "Jl. Kemerdekaan No. 1, Jakarta"}</p>
                </div>
              </div>
              <a href={data.acara_akad_lokasi_url || "#"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#B9A9D9] text-[#14151F] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#A691C9] transition-colors mt-2">
                <MapPin className="w-4 h-4" /> Buka Peta
              </a>
            </div>

            {/* Resepsi (Conditionally rendered) */}
            {(data.acara_resepsi_nama || data.acara_resepsi_tanggal) && (
              <>
                <div className="flex justify-center"><div className="w-16 h-[1px] bg-[#B9A9D9]/40"></div></div>
                <div className="text-center space-y-4 pb-8">
                  <h3 className="font-sans font-bold tracking-widest uppercase text-sm text-[#CC9C95]">{data.acara_resepsi_nama || "Resepsi"}</h3>
                  <div className="font-sans text-[#2B2632] space-y-2">
                    <p className="flex items-center justify-center gap-2"><Calendar className="w-4 h-4 text-[#B9A9D9]" /> {formatDate(data.acara_resepsi_tanggal)}</p>
                    <p className="flex items-center justify-center gap-2"><Clock className="w-4 h-4 text-[#B9A9D9]" /> {formatTime(data.acara_resepsi_jam)}</p>
                    <div className="pt-2">
                      <p className="font-semibold">{data.acara_resepsi_lokasi_nama}</p>
                      <p className="text-sm text-[#6B6577] mt-1 px-4">{data.acara_resepsi_lokasi_alamat}</p>
                    </div>
                  </div>
                  <a href={data.acara_resepsi_lokasi_url || "#"} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#B9A9D9] text-[#14151F] px-6 py-2 rounded-full text-sm font-semibold hover:bg-[#A691C9] transition-colors mt-2">
                    <MapPin className="w-4 h-4" /> Buka Peta
                  </a>
                </div>
              </>
            )}
          </div>
        );

      case "galeri":
        const allPhotos = data.foto_urls?.filter(Boolean)?.length > 0 
          ? data.foto_urls.filter(Boolean) 
          : ["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800"];
        const coverPhoto = allPhotos[0];
        const remainingPhotos = allPhotos.slice(1);
        
        return (
          <div className="flex flex-col h-full">
            <h2 className="font-serif italic text-3xl text-center text-[#2B2632] mt-6 mb-6">Momen Kami</h2>
            <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-4">
              <img src={coverPhoto} alt="Cover" className="w-full h-64 object-cover rounded-xl shadow-md" />
              {remainingPhotos.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {remainingPhotos.map((photo, idx) => (
                    <img key={idx} src={photo} alt={`Gallery ${idx}`} className="w-full h-32 object-cover rounded-lg shadow-sm" />
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case "musik":
        return (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-24 h-24 rounded-full bg-[#1B1D2A] flex items-center justify-center shadow-lg mb-8 relative overflow-hidden group cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
              <div className={`absolute inset-0 bg-[#B9A9D9]/20 transition-opacity ${isPlaying ? 'opacity-100' : 'opacity-0'}`}></div>
              {isPlaying ? <Pause className="w-10 h-10 text-[#B9A9D9]" /> : <Play className="w-10 h-10 text-[#B9A9D9] ml-2" />}
            </div>
            {youtubeId && isPlaying && (
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&playlist=${youtubeId}&enablejsapi=1`}
                allow="autoplay"
                className="hidden"
              />
            )}
            <p className="font-serif italic text-2xl text-[#2B2632] mb-2">Lagu Spesial Kami</p>
            
            {/* Visualizer bars */}
            <div className="flex items-end justify-center gap-1 mt-10 h-8">
              {[1,2,3,4,5,6,7].map((bar) => (
                <motion.div
                  key={bar}
                  className="w-1.5 bg-[#CC9C95] rounded-t-sm"
                  animate={{ height: isPlaying ? [10, 30, 15, 32, 10] : 4 }}
                  transition={{ repeat: Infinity, duration: 1 + (bar * 0.2), ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>
        );

      case "rsvp":
        return (
          <div className="flex flex-col h-full pt-6 overflow-y-auto">
            <h2 className="font-serif italic text-3xl text-center text-[#2B2632] mb-6">Kehadiran & Doa</h2>
            
            {/* Form */}
            <form onSubmit={handleRsvpSubmit} className="px-6 space-y-4 mb-8">
              <div>
                <input type="text" placeholder="Nama Anda" required className="w-full bg-[#14151F]/5 border border-[#B9A9D9]/30 rounded-lg px-4 py-3 text-[#2B2632] placeholder:text-[#6B6577] focus:outline-none focus:border-[#B9A9D9]" value={rsvpData.nama_tamu} onChange={(e) => setRsvpData({...rsvpData, nama_tamu: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setRsvpData({...rsvpData, hadir: true})} className={`py-3 rounded-lg border text-sm font-semibold transition-colors ${rsvpData.hadir ? 'bg-[#14151F] text-[#F2EEE5] border-[#14151F]' : 'border-[#B9A9D9]/50 text-[#6B6577]'}`}>
                  Hadir
                </button>
                <button type="button" onClick={() => setRsvpData({...rsvpData, hadir: false})} className={`py-3 rounded-lg border text-sm font-semibold transition-colors ${!rsvpData.hadir ? 'bg-[#14151F] text-[#F2EEE5] border-[#14151F]' : 'border-[#B9A9D9]/50 text-[#6B6577]'}`}>
                  Maaf, Tidak
                </button>
              </div>

              {rsvpData.hadir && (
                <div>
                  <select className="w-full bg-[#14151F]/5 border border-[#B9A9D9]/30 rounded-lg px-4 py-3 text-[#2B2632] focus:outline-none focus:border-[#B9A9D9]" value={rsvpData.jumlah_tamu} onChange={(e) => setRsvpData({...rsvpData, jumlah_tamu: parseInt(e.target.value)})}>
                    <option value={1}>1 Orang</option>
                    <option value={2}>2 Orang</option>
                    <option value={3}>3 Orang</option>
                  </select>
                </div>
              )}

              <div>
                <textarea placeholder="Tulis doa dan harapan..." required className="w-full bg-[#14151F]/5 border border-[#B9A9D9]/30 rounded-lg px-4 py-3 text-[#2B2632] placeholder:text-[#6B6577] h-24 resize-none focus:outline-none focus:border-[#B9A9D9]" value={rsvpData.pesan} onChange={(e) => setRsvpData({...rsvpData, pesan: e.target.value})} />
              </div>

              <button type="submit" disabled={isSubmitting} className="w-full bg-[#B9A9D9] hover:bg-[#A691C9] text-[#14151F] font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                {isSubmitting ? "Mengirim..." : <><Send className="w-4 h-4" /> Kirim Pesan</>}
              </button>
            </form>

            {/* Guestbook List */}
            <div className="bg-[#14151F]/5 px-6 py-8 min-h-[200px]">
              <h3 className="font-serif italic text-xl text-[#2B2632] mb-4 text-center">Ucapan Manis</h3>
              <div className="space-y-4">
                {guestbook.map((g, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl shadow-sm border border-[#B9A9D9]/20">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-[#2B2632] text-sm">{g.nama_tamu}</span>
                      <span className="text-[10px] bg-[#CC9C95]/20 text-[#CC9C95] px-2 py-1 rounded-full uppercase font-bold">{g.hadir ? "Hadir" : "Tidak Hadir"}</span>
                    </div>
                    <p className="text-sm text-[#6B6577]">{g.pesan}</p>
                  </div>
                ))}
                {guestbook.length === 0 && (
                  <p className="text-center text-sm text-[#6B6577] italic">Jadilah yang pertama memberikan ucapan.</p>
                )}
              </div>
            </div>
          </div>
        );

      case "penutup":
        return (
          <div className="flex flex-col items-center justify-center text-center h-full px-8 relative">
            <svg className="absolute top-10 right-10 w-24 h-24 text-[#B9A9D9] opacity-30" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 0C50 27.6142 27.6142 50 0 50C27.6142 50 50 72.3858 50 100C50 72.3858 72.3858 50 100 50C72.3858 50 50 27.6142 50 0Z" fill="currentColor"/>
            </svg>
            
            <h2 className="font-serif italic text-3xl text-[#2B2632] mb-6 relative z-10">Terima Kasih</h2>
            <p className="font-sans text-sm text-[#6B6577] leading-relaxed mb-8 relative z-10">
              Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.
            </p>
            <div className="flex items-center gap-4 text-[#CC9C95]">
              <div className="w-12 h-[1px] bg-[#CC9C95]"></div>
              <Heart className="w-4 h-4 fill-current" />
              <div className="w-12 h-[1px] bg-[#CC9C95]"></div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="relative min-h-screen bg-[#14151F] text-[#F2EEE5] overflow-hidden flex items-center justify-center font-sans">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#B9A9D9] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-[#CC9C95] rounded-full mix-blend-screen filter blur-[150px] opacity-10"></div>
      </div>

      <AnimatePresence>
        {!isOpen && !activeCard && (
          <motion.div
            key="cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 flex flex-col items-center justify-center z-10 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            {/* Envelope Stack Graphic */}
            <div className="relative w-64 h-80 mb-8">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="absolute inset-0 bg-[#FBF7EE] rounded-xl shadow-lg border border-[#F2EEE5]/10"
                  style={{ transform: `rotate(${i * 4 - 6}deg) translateY(${i * -5}px)`, opacity: 1 - (3-i)*0.2 }}
                ></div>
              ))}
              <div className="absolute inset-0 bg-[#FBF7EE] rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.45)] border border-[#F2EEE5]/20 flex flex-col items-center justify-center p-6 text-center z-10">
                <p className="text-[#CC9C95] font-sans text-xs tracking-widest uppercase mb-4">Pernikahan</p>
                <h1 className="font-serif italic text-4xl text-[#2B2632] leading-tight">
                  {data.mempelai_pria_nama || "Romeo"} <br/><span className="text-2xl">&amp;</span><br/> {data.mempelai_wanita_nama || "Juliet"}
                </h1>
                
              </div>
            </div>
            
            <motion.p 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-[#A9A6B8] text-sm tracking-widest uppercase font-semibold"
            >
              Tap untuk membuka
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fan-Out View */}
      <AnimatePresence>
        {isOpen && !activeCard && (
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            {cards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.id}
                  custom={i}
                  variants={fanOutVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  whileHover="hover"
                  onClick={() => setActiveCard(card.id)}
                  className="absolute w-28 h-40 bg-[#FBF7EE] rounded-xl shadow-[0_15px_30px_rgba(0,0,0,0.4)] cursor-pointer flex flex-col items-center justify-center gap-3 border border-white/50 hover:bg-white transition-colors"
                  style={{ transformOrigin: "bottom center" }}
                >
                  <div className="w-10 h-10 rounded-full bg-[#B9A9D9]/20 flex items-center justify-center text-[#2B2632]">
                    {typeof Icon === "string" ? <span className="text-xl">{Icon}</span> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className="text-[#2B2632] text-xs font-bold uppercase tracking-wider">{card.label}</span>
                </motion.div>
              );
            })}
            
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => setIsOpen(false)}
              className="absolute bottom-12 px-6 py-2 bg-[#1B1D2A] text-[#A9A6B8] rounded-full text-sm font-semibold border border-[#F2EEE5]/10 shadow-lg"
            >
              Tutup Kartu
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Full Section View */}
      <AnimatePresence>
        {activeCard && (
          <motion.div
            key="full-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(5px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-4 sm:inset-auto sm:w-[400px] sm:h-[80vh] z-30"
          >
            <div className="w-full h-full bg-[#FBF7EE] rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden relative">
              
              {/* Back Button */}
              <div className="absolute top-4 left-4 z-10">
                <button 
                  onClick={() => setActiveCard(null)}
                  className="w-10 h-10 bg-[#14151F]/5 backdrop-blur-md rounded-full flex items-center justify-center text-[#2B2632] hover:bg-[#14151F]/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 w-full h-full relative">
                {renderCardContent(activeCard)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
