"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Music4 } from "lucide-react";

export default function IvoryLineTemplate({ data, isPreview = false, isBuilder = false }) {
  const [stage, setStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  
  // Destructure with fallbacks
  const {
    nama_panggilan_pria = "Romeo",
    nama_panggilan_wanita = "Juliet",
    nama_lengkap_pria = "Romeo Montague",
    nama_lengkap_wanita = "Juliet Capulet",
    foto_pria = "",
    foto_wanita = "",
    foto_urls = [],
    foto_cover = "",
    quote_text = "",
    acara1_nama = "Akad Nikah",
    acara1_tanggal = "2026-12-12",
    acara1_jam = "08:00",
    acara1_lokasi = "Masjid Raya",
    acara1_maps_url = "",
    acara2_nama = "",
    acara2_tanggal = "",
    acara2_jam = "",
    acara2_lokasi = "",
    acara2_maps_url = "",
    cerita_cinta = "",
    bank_accounts = [],
    youtube_url = "",
    ucapan_penutup = "",
    wishes = [],
    rsvps = [],
    id: order_id
  } = data || {};

  const heroPhoto = foto_cover || (foto_urls.length > 0 ? foto_urls[0] : "https://placehold.co/800x1200/F3EDE1/161512?text=Hero+Photo");


  const defaultQuote = "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu istri-istri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.";
  const displayQuote = quote_text || defaultQuote;
  const defaultClosing = "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.";
  const displayClosing = ucapan_penutup || defaultClosing;

  const handleOpen = () => {
    setStage(1);
    setIsPlaying(true);
  };

  const toggleMusic = () => {
    setIsPlaying(!isPlaying);
  };

  // Extract YouTube ID safely
  const getYouTubeId = (url) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com')) {
        return urlObj.searchParams.get('v');
      } else if (urlObj.hostname.includes('youtu.be')) {
        return urlObj.pathname.slice(1);
      }
    } catch (e) {
      return null;
    }
    return null;
  };

  const youtubeId = getYouTubeId(youtube_url);

  // Form States
  const [rsvpForm, setRsvpForm] = useState({ nama_tamu: "", status_kehadiran: "", jumlah_tamu: "", pesan: "" });
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [liveWishes, setLiveWishes] = useState(rsvps.filter(r => r.pesan) || wishes || []);

  const handleRSVP = async (e) => {
    e.preventDefault();
    if (isPreview) {
      alert("Mode Preview: Fitur RSVP dinonaktifkan.");
      return;
    }
    if (!rsvpForm.nama_tamu || !rsvpForm.status_kehadiran) {
      alert("Mohon isi Nama dan Kehadiran");
      return;
    }

    setIsSubmittingRsvp(true);
    try {
      const res = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id,
          nama_tamu: rsvpForm.nama_tamu,
          status_kehadiran: rsvpForm.status_kehadiran,
          jumlah_tamu: rsvpForm.jumlah_tamu,
          pesan: rsvpForm.pesan
        })
      });
      if (res.ok) {
        const { data: newWish } = await res.json();
        alert("Terima kasih atas konfirmasi dan ucapan Anda!");
        if (newWish && newWish.pesan) {
          setLiveWishes([newWish, ...liveWishes]);
        }
        setRsvpForm({ nama_tamu: "", status_kehadiran: "", jumlah_tamu: "", pesan: "" });
      } else {
        alert("Gagal mengirim konfirmasi. Silakan coba lagi.");
      }
    } catch (error) {
      alert("Gagal mengirim konfirmasi.");
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  // Setup countdown
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });
  useEffect(() => {
    if (!acara1_tanggal) return;
    const target = new Date(`${acara1_tanggal}T${acara1_jam || '00:00'}:00`).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      setTimeLeft({
        d: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        h: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
        m: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
        s: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [acara1_tanggal, acara1_jam]);

  return (
    <div className={`w-full relative bg-[#FAF6EF] text-[#161512] font-sans ${isPreview ? 'h-full overflow-y-auto' : 'h-[100dvh] overflow-y-auto overflow-x-hidden'}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;1,9..144,300&family=Jost:wght@400;500&display=swap');
        .ivory-font-serif { font-family: 'Fraunces', serif; letter-spacing: -0.01em; }
        .ivory-font-sans { font-family: 'Jost', sans-serif; }
      `}} />

      {/* Hidden Youtube iframe for Background Music */}
      {youtubeId && stage > 0 && isPlaying && (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&playlist=${youtubeId}&enablejsapi=1`}
          allow="autoplay"
          className="hidden"
        />
      )}

      {/* Floating Music Button */}
      <button 
        onClick={toggleMusic}
        className="fixed bottom-[24px] right-[24px] z-50 w-[44px] h-[44px] rounded-full bg-[#FAF6EF] border border-[#161512] flex items-center justify-center text-[#161512] shadow-sm hover:scale-105 transition-transform"
      >
        {isPlaying ? <Music className="w-5 h-5" strokeWidth={1.5} /> : <Music4 className="w-5 h-5" strokeWidth={1.5} opacity={0.5} />}
      </button>

      <AnimatePresence mode="wait">
        {/* STAGE 0: Cover */}
        {stage === 0 && (
          <motion.div 
            key="cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-40 bg-[#161512] flex flex-col items-center justify-center min-h-[100dvh]"
          >
            <div className="absolute inset-0 z-0">
              <img src={heroPhoto} alt="Cover" className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 bg-[#161512]/50" />
            </div>

            <div className="text-center relative z-10 text-[#FAF6EF]">
              <p className="ivory-font-sans text-[12px] uppercase tracking-[0.1em] text-[#FAF6EF]/80 mb-[24px]">Undangan Pernikahan</p>
              <h1 className="ivory-font-serif text-[48px] md:text-[64px] font-light leading-tight mb-[40px]">
                {nama_panggilan_pria} <br/> <span className="italic text-[40px] md:text-[56px]">&amp;</span> <br/> {nama_panggilan_wanita}
              </h1>
              <button 
                onClick={handleOpen}
                className="px-[32px] py-[12px] border border-[#FAF6EF] text-[#FAF6EF] hover:bg-[#FAF6EF] hover:text-[#161512] transition-colors duration-500 ivory-font-sans text-[14px] uppercase tracking-[0.05em]"
              >
                Buka Undangan
              </button>
            </div>
          </motion.div>
        )}

        {/* STAGE 1: Main Content (Scrollable) */}
        {stage === 1 && (
          <motion.div 
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative w-full"
          >
            {/* 2. Hero */}
            <section className="relative w-full h-[100dvh] min-h-[600px] flex items-end">
              <div className="absolute inset-0">
                <img src={heroPhoto} alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161512]/60 to-transparent" />
              </div>
              <div className="relative z-10 w-full p-[32px] md:p-[48px] text-[#FAF6EF] text-center mb-[40px]">
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="ivory-font-sans text-[12px] uppercase tracking-[0.1em] mb-[16px]"
                >
                  The Wedding Of
                </motion.p>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="ivory-font-serif text-[40px] md:text-[56px] font-light"
                >
                  {nama_panggilan_pria} & {nama_panggilan_wanita}
                </motion.h2>
              </div>
            </section>

            {/* 3. Nama Lengkap */}
            <section className="bg-[#F3EDE1] py-[80px] md:py-[120px] px-[24px]">
              <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-[40px] md:gap-0 relative">
                
                {/* Mempelai Pria */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                  className="flex-1 text-center"
                >
                  {foto_pria && (
                    <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] mx-auto rounded-full overflow-hidden mb-[24px]">
                      <img src={foto_pria} alt={nama_panggilan_pria} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                  )}
                  <h3 className="ivory-font-serif text-[28px] md:text-[32px] font-medium mb-[16px]">{nama_lengkap_pria}</h3>
                </motion.div>

                {/* Garis Pembatas (Desktop Vertical, Mobile Horizontal) */}
                <div className="hidden md:block w-[1px] h-[100px] bg-[#D8D0C0]" />
                <div className="md:hidden w-[100px] h-[1px] bg-[#D8D0C0]" />

                {/* Mempelai Wanita */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex-1 text-center"
                >
                  {foto_wanita && (
                    <div className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] mx-auto rounded-full overflow-hidden mb-[24px]">
                      <img src={foto_wanita} alt={nama_panggilan_wanita} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                  )}
                  <h3 className="ivory-font-serif text-[28px] md:text-[32px] font-medium mb-[16px]">{nama_lengkap_wanita}</h3>
                </motion.div>

              </div>
            </section>



            {/* 5. Quote */}
            <section className="py-[100px] px-[32px] bg-[#FAF6EF]">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl mx-auto text-center"
              >
                <p className="ivory-font-serif italic text-[20px] md:text-[24px] text-[#161512] leading-relaxed">
                  "{displayQuote}"
                </p>
              </motion.div>
            </section>

            {/* 5. Detail Acara & 6. Countdown */}
            <section className="py-[80px] px-[24px] border-t border-b border-[#D8D0C0] bg-[#FAF6EF]">
              <div className="max-w-3xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-[64px]"
                >
                  <h2 className="ivory-font-serif text-[32px] mb-[32px]">Save The Date</h2>
                  
                  {/* Countdown */}
                  <div className="flex items-center justify-center gap-[16px] md:gap-[32px]">
                    {Object.entries({ Hari: timeLeft.d, Jam: timeLeft.h, Menit: timeLeft.m, Detik: timeLeft.s }).map(([label, value], idx, arr) => (
                      <div key={label} className="flex items-center">
                        <div className="text-center">
                          <div className="ivory-font-serif text-[28px] md:text-[40px] font-light leading-none">{value}</div>
                          <div className="ivory-font-sans text-[10px] uppercase tracking-[0.1em] text-[#6B6558] mt-[8px]">{label}</div>
                        </div>
                        {idx !== arr.length - 1 && <div className="ml-[16px] md:ml-[32px] w-[1px] h-[32px] bg-[#D8D0C0]" />}
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Acara Cards */}
                <div className="grid md:grid-cols-2 gap-[32px]">
                  {/* Acara 1 */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="border border-[#D8D0C0] p-[32px] text-left"
                  >
                    <h3 className="ivory-font-sans text-[14px] uppercase tracking-[0.1em] font-medium mb-[16px] pb-[16px] border-b border-[#D8D0C0]">{acara1_nama}</h3>
                    <p className="ivory-font-sans text-[15px] mb-[8px]">{acara1_tanggal} <br/> Pukul {acara1_jam} WIB</p>
                    <p className="ivory-font-sans text-[15px] text-[#6B6558] leading-relaxed">{acara1_lokasi}</p>
                    {acara1_maps_url && (
                      <a href={acara1_maps_url} target="_blank" rel="noreferrer" className="inline-block mt-[24px] text-[12px] uppercase tracking-[0.05em] border-b border-[#161512] pb-[2px]">Lihat Peta</a>
                    )}
                  </motion.div>

                  {/* Acara 2 (Opsional) */}
                  {acara2_nama && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="border border-[#D8D0C0] p-[32px] text-left"
                    >
                      <h3 className="ivory-font-sans text-[14px] uppercase tracking-[0.1em] font-medium mb-[16px] pb-[16px] border-b border-[#D8D0C0]">{acara2_nama}</h3>
                      <p className="ivory-font-sans text-[15px] mb-[8px]">{acara2_tanggal} <br/> Pukul {acara2_jam} WIB</p>
                      <p className="ivory-font-sans text-[15px] text-[#6B6558] leading-relaxed">{acara2_lokasi}</p>
                      {acara2_maps_url && (
                        <a href={acara2_maps_url} target="_blank" rel="noreferrer" className="inline-block mt-[24px] text-[12px] uppercase tracking-[0.05em] border-b border-[#161512] pb-[2px]">Lihat Peta</a>
                      )}
                    </motion.div>
                  )}
                </div>
              </div>
            </section>

            {/* 7. Galeri Foto */}
            {foto_urls.length > 0 && (
              <section className="py-[100px] px-[24px] bg-[#FAF6EF]">
                <div className="max-w-4xl mx-auto">
                  <h2 className="ivory-font-serif text-[32px] text-center mb-[48px]">Galeri</h2>
                  <div className="flex flex-col md:grid md:grid-cols-2 gap-[24px]">
                    {foto_urls.map((url, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        className="w-full aspect-[4/5] overflow-hidden"
                      >
                        <img src={url} alt={`Gallery ${i+1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* 9. RSVP & 10. Penutup */}
            <section className="bg-[#10192B] text-[#FAF6EF] py-[100px] px-[24px]">
              <div className="max-w-2xl mx-auto text-center">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <p className="ivory-font-serif text-[20px] md:text-[24px] font-light leading-relaxed mb-[64px]">
                    {displayClosing}
                  </p>

                  {/* RSVP Form */}
                  <div className="border border-[#FAF6EF]/20 p-[32px] max-w-md mx-auto text-left">
                    <h3 className="ivory-font-sans text-[14px] uppercase tracking-[0.1em] font-medium mb-[24px] text-center border-b border-[#FAF6EF]/20 pb-[16px]">Konfirmasi Kehadiran</h3>
                    <form onSubmit={handleRSVP} className="space-y-[16px]">
                      <div>
                        <input type="text" placeholder="Nama Anda" value={rsvpForm.nama_tamu} onChange={(e) => setRsvpForm({...rsvpForm, nama_tamu: e.target.value})} className="w-full bg-transparent border-b border-[#FAF6EF]/30 focus:border-[#FAF6EF] focus:outline-none rounded-none px-0 py-[12px] text-[15px] text-[#FAF6EF] placeholder:text-[#FAF6EF]/50 transition-colors" />
                      </div>
                      <div>
                        <select value={rsvpForm.status_kehadiran} onChange={(e) => setRsvpForm({...rsvpForm, status_kehadiran: e.target.value})} className="w-full bg-transparent border-b border-[#FAF6EF]/30 focus:border-[#FAF6EF] focus:outline-none rounded-none px-0 py-[12px] text-[15px] text-[#FAF6EF] transition-colors appearance-none cursor-pointer">
                          <option value="" className="bg-[#10192B]">Apakah Anda akan hadir?</option>
                          <option value="hadir" className="bg-[#10192B]">Ya, saya akan hadir</option>
                          <option value="tidak_hadir" className="bg-[#10192B]">Maaf, saya tidak bisa hadir</option>
                        </select>
                      </div>
                      <div>
                        <input type="number" placeholder="Jumlah Tamu (Maks. 2)" min="1" max="2" value={rsvpForm.jumlah_tamu} onChange={(e) => setRsvpForm({...rsvpForm, jumlah_tamu: e.target.value})} className="w-full bg-transparent border-b border-[#FAF6EF]/30 focus:border-[#FAF6EF] focus:outline-none rounded-none px-0 py-[12px] text-[15px] text-[#FAF6EF] placeholder:text-[#FAF6EF]/50 transition-colors" />
                      </div>
                      <div>
                        <textarea rows="3" placeholder="Tulis ucapan atau doa untuk mempelai... (Opsional)" value={rsvpForm.pesan} onChange={(e) => setRsvpForm({...rsvpForm, pesan: e.target.value})} className="w-full bg-transparent border-b border-[#FAF6EF]/30 focus:border-[#FAF6EF] focus:outline-none rounded-none px-0 py-[12px] text-[15px] text-[#FAF6EF] placeholder:text-[#FAF6EF]/50 transition-colors resize-none"></textarea>
                      </div>
                      <div className="pt-[16px]">
                        <button type="submit" disabled={isSubmittingRsvp} className="w-full bg-[#FAF6EF] text-[#10192B] py-[16px] font-sans font-medium text-[14px] uppercase tracking-[0.05em] transition-all duration-300 hover:bg-[#F3EDE1] disabled:opacity-50">
                          {isSubmittingRsvp ? "Mengirim..." : "Kirim RSVP & Ucapan"}
                        </button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* 11. Guestbook / Wishes */}
            {wishes && (
              <section className="py-[100px] px-[24px] bg-[#FAF6EF]">
                <div className="max-w-4xl mx-auto">
                  <h2 className="ivory-font-serif text-[32px] text-center mb-[48px]">Wishes</h2>
                  
                  {liveWishes && liveWishes.length > 0 ? (
                    <div className="grid md:grid-cols-2 gap-[24px]">
                      {liveWishes.map((wish, i) => (
                        <motion.div 
                          key={wish.id || i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: i * 0.1 }}
                          className="bg-white p-[24px] border border-[#D8D0C0] relative"
                        >
                          <p className="ivory-font-sans text-[15px] italic text-[#6B6558] mb-[16px]">"{wish.pesan || wish.message}"</p>
                          <p className="ivory-font-sans text-[12px] uppercase tracking-[0.1em] text-[#161512] font-medium">
                            - {wish.nama_tamu || wish.name || wish.nama || "Tamu"} 
                            <span className="ml-2 font-normal text-gray-400 normal-case tracking-normal">
                              {wish.created_at ? new Date(wish.created_at).toLocaleDateString('id-ID') : ''}
                            </span>
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-[#6B6558] ivory-font-sans">Belum ada ucapan. Jadilah yang pertama memberikan ucapan!</p>
                  )}
                </div>
              </section>
            )}

            {/* 12. Wedding Gift (Angpao) */}
            {bank_accounts && bank_accounts.length > 0 && (
              <section className="py-[100px] px-[24px] bg-[#F3EDE1] border-y border-[#D8D0C0]">
                <div className="max-w-xl mx-auto text-center">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                  >
                    <h2 className="ivory-font-serif text-[32px] mb-[16px]">Wedding Gift</h2>
                    <p className="ivory-font-sans text-[14px] text-[#6B6558] mb-[40px] leading-relaxed">
                      Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun, jika Anda ingin memberikan tanda kasih, dapat mengirimkan melalui:
                    </p>
                    <div className="grid gap-[24px] md:grid-cols-2">
                      {bank_accounts.map((account, idx) => (
                        <div key={idx} className="bg-white p-[32px] border border-[#D8D0C0] relative h-full flex flex-col justify-between">
                          <div>
                            <h3 className="ivory-font-sans font-medium uppercase tracking-[0.1em] text-[16px] mb-[8px]">{account.bank}</h3>
                            <p className="ivory-font-sans text-[20px] tracking-widest text-[#161512] mb-[16px]">{account.nomor}</p>
                            <p className="ivory-font-sans text-[14px] uppercase tracking-[0.05em] text-[#6B6558] mb-[24px]">a.n {account.nama}</p>
                          </div>
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(account.nomor);
                              alert('Nomor rekening berhasil disalin!');
                            }}
                            className="w-full px-[24px] py-[12px] border border-[#161512] text-[#161512] hover:bg-[#161512] hover:text-[#FAF6EF] transition-colors duration-500 ivory-font-sans text-[12px] uppercase tracking-[0.05em]"
                          >
                            Salin Rekening
                          </button>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </section>
            )}

            {/* 13. RSVP & Penutup */}
            <section className="bg-[#10192B] text-[#FAF6EF] py-[100px] px-[24px]">
              <div className="max-w-2xl mx-auto text-center">
                <div className="mb-[40px]">
                  <h2 className="ivory-font-serif text-[40px] md:text-[64px] font-light opacity-90">
                    {nama_panggilan_pria} & {nama_panggilan_wanita}
                  </h2>
                </div>
                <p className="ivory-font-sans text-[12px] uppercase tracking-[0.2em] opacity-50 mt-[24px]">
                  Thank You
                </p>
              </div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
