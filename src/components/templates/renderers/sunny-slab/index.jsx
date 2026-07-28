"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Music4, Asterisk, ChevronLeft, ChevronRight } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function SunnySlabTemplate({ data, isPreview = false, isBuilder = false }) {
  const [stage, setStage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewSection, setPreviewSection] = useState(-1);
  const scrollContainerRef = useRef(null);

  const scrollToSection = (idx) => {
    if (idx < 0) {
      setStage(0);
      setPreviewSection(-1);
      return;
    }
    if (stage === 0) {
      setStage(1);
      if (youtube_url) setIsPlaying(true);
    }
    
    let targetIdx = idx;
    if (scrollContainerRef.current) {
      const sectionCount = scrollContainerRef.current.querySelectorAll('section').length;
      if (sectionCount > 0) {
        targetIdx = Math.min(idx, sectionCount - 1);
      }
    }
    
    setPreviewSection(targetIdx);
    
    setTimeout(() => {
      if (!scrollContainerRef.current) return;
      const sections = Array.from(scrollContainerRef.current.querySelectorAll('section'));
      if (sections[targetIdx]) {
        const scrollParent = scrollContainerRef.current.parentElement;
        if (scrollParent) {
          const parentRect = scrollParent.getBoundingClientRect();
          const targetRect = sections[targetIdx].getBoundingClientRect();
          const scrollTop = scrollParent.scrollTop + (targetRect.top - parentRect.top);
          scrollParent.scrollTo({ top: scrollTop, behavior: 'smooth' });
        } else {
          sections[targetIdx].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 100);
  };
  const searchParams = useSearchParams();
  const guestName = searchParams?.get('to') || (isPreview ? "Siska & Partner" : "");

  const {
    nama_panggilan_pria = "Bagas",
    nama_panggilan_wanita = "Dinda",
    nama_lengkap_pria = "Bagas Wirawan",
    nama_ayah_pria = "Bapak Hendra Wirawan",
    nama_ibu_pria = "Ibu Sari Wulandari",
    nama_lengkap_wanita = "Dinda Ayu Lestari",
    nama_ayah_wanita = "Bapak Somad Prasetyo",
    nama_ibu_wanita = "Ibu Ratna Kusuma",
    foto_pria,
    foto_wanita,
    foto_cover,
    foto_urls,
    tanggal_acara = "2027-02-14",
    waktu_acara = "08:00",
    quote_text = "Cinta yang tumbuh dari niat baik akan selalu menemukan jalan untuk saling menguatkan, dalam suka maupun duka.",
    quote_author = "Doa & Harapan Kami",
    acara_akad_nama = "Akad Nikah",
    acara_akad_tanggal = "Sabtu, 14 Februari 2027",
    acara_akad_jam = "08:00 - 10:00 WIB",
    acara_akad_lokasi = "Kediaman Mempelai Wanita, Jl. Melati No. 12",
    acara_akad_maps_url = "",
    acara_resepsi_nama = "Resepsi",
    acara_resepsi_tanggal = "Sabtu, 14 Februari 2027",
    acara_resepsi_jam = "11:00 - 14:00 WIB",
    acara_resepsi_lokasi = "Gedung Serbaguna",
    acara_resepsi_maps_url = "",
    love_story = [],
    youtube_url = "",
    live_meet_url = "",
    live_youtube_url = "",
    live_zoom_url = "",
    live_tiktok_url = "",
    rekening_wanita = [],
    rekening_pria = [],
    dresscode_warna = ["#F7F2E9", "#C9D9E8", "#111111"],
    dresscode_desc = "Mohon kenakan pakaian dengan warna yang senada dengan tema kami.",
    ucapan_terima_kasih = "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu untuk kami.",
    wishes = [],
    rsvps = [],
    id: order_id
  } = data || {};

  const displayFotoCover = foto_cover || "https://uldbknkgnpisayqweklt.supabase.co/storage/v1/object/public/orders/dummy/cover.jpeg";
  const displayFotoPria = foto_pria || "https://uldbknkgnpisayqweklt.supabase.co/storage/v1/object/public/orders/dummy/loveisall.film_1784906403191.jpeg";
  const displayFotoWanita = foto_wanita || "https://uldbknkgnpisayqweklt.supabase.co/storage/v1/object/public/orders/dummy/loveisall.film_1784906406087.jpeg";
  const displayFotoUrls = foto_urls && foto_urls.length > 0 ? foto_urls : [
    "https://uldbknkgnpisayqweklt.supabase.co/storage/v1/object/public/orders/dummy/loveisall.film_1784906406488.jpeg",
    "https://uldbknkgnpisayqweklt.supabase.co/storage/v1/object/public/orders/dummy/loveisall.film_1784906423202.jpeg",
    "https://uldbknkgnpisayqweklt.supabase.co/storage/v1/object/public/orders/dummy/loveisall.film_1784906423611.jpeg",
    "https://uldbknkgnpisayqweklt.supabase.co/storage/v1/object/public/orders/dummy/loveisall.film_1784906434619.jpeg",
    "https://uldbknkgnpisayqweklt.supabase.co/storage/v1/object/public/orders/dummy/loveisall.film_1784906435010.jpeg",
    "https://uldbknkgnpisayqweklt.supabase.co/storage/v1/object/public/orders/dummy/loveisall.film_1784906447931.jpeg"
  ];

  const handleOpen = () => {
    setStage(1);
    setPreviewSection(0);
    if (youtube_url) setIsPlaying(true);
  };

  const handleScroll = (e) => {
    if (stage === 0) return;
    if (!scrollContainerRef.current) return;
    const sections = Array.from(scrollContainerRef.current.querySelectorAll('section'));
    if (!sections.length) return;

    let activeIdx = 0;
    const scrollParent = scrollContainerRef.current.parentElement;
    if (!scrollParent) return;
    
    const parentRect = scrollParent.getBoundingClientRect();
    for (let i = 0; i < sections.length; i++) {
      const rect = sections[i].getBoundingClientRect();
      if (rect.top - parentRect.top <= 150) {
        activeIdx = i;
      }
    }
    setPreviewSection((prev) => (prev !== activeIdx ? activeIdx : prev));
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtube.com')) return urlObj.searchParams.get('v');
      if (urlObj.hostname.includes('youtu.be')) return urlObj.pathname.slice(1);
    } catch (e) { return null; }
    return null;
  };
  const youtubeId = getYouTubeId(youtube_url);

  // RSVP Form state
  const [rsvpForm, setRsvpForm] = useState({ nama_tamu: guestName || "", status_kehadiran: "", pesan: "" });
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [liveWishes, setLiveWishes] = useState(rsvps.filter(r => r.pesan).length > 0 ? rsvps.filter(r => r.pesan) : (wishes || []));

  const handleRSVP = async (e) => {
    e.preventDefault();
    if (isPreview || isBuilder) {
      alert("Mode Preview/Builder: Fitur RSVP dinonaktifkan.");
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
          pesan: rsvpForm.pesan
        })
      });
      if (res.ok) {
        const { data: newWish } = await res.json();
        alert("Terima kasih atas konfirmasi dan ucapan Anda!");
        if (newWish && newWish.pesan) {
          setLiveWishes([newWish, ...liveWishes]);
        }
        setRsvpForm({ ...rsvpForm, pesan: "" });
      } else {
        alert("Gagal mengirim konfirmasi. Silakan coba lagi.");
      }
    } catch (error) {
      alert("Gagal mengirim konfirmasi.");
    } finally {
      setIsSubmittingRsvp(false);
    }
  };

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });
  const [prevLeft, setPrevLeft] = useState({ d: '00', h: '00', m: '00', s: '00' });
  useEffect(() => {
    if (!tanggal_acara) return;
    const target = new Date(`${tanggal_acara}T${waktu_acara || '00:00'}:00`).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      if (distance < 0) {
        clearInterval(interval);
        return;
      }
      setPrevLeft(timeLeft); // Keep track of previous for bounce animation
      setTimeLeft({
        d: String(Math.floor(distance / (1000 * 60 * 60 * 24))).padStart(2, '0'),
        h: String(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0'),
        m: String(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0'),
        s: String(Math.floor((distance % (1000 * 60)) / 1000)).padStart(2, '0')
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [tanggal_acara, waktu_acara, timeLeft]);

  // Framer Motion variants for neobrutalism pop-in
  const popIn = {
    hidden: { opacity: 0, scale: 0.92, y: 16 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 20 }
    }
  };

  const hasLiveStreams = live_meet_url || live_youtube_url || live_zoom_url || live_tiktok_url;

  return (
    <div className={`w-full relative ${isPreview ? 'h-full overflow-hidden' : 'min-h-[100dvh] overflow-x-hidden'}`}>
      {/* Controller for Live Preview */}
      {isBuilder && (
        <div className="absolute top-6 right-6 z-[100] flex items-center gap-2 bg-black/60 backdrop-blur-md p-1.5 rounded-full border border-white/10 shadow-lg pointer-events-auto">
          <button 
            onClick={() => scrollToSection(previewSection - 1)} 
            disabled={previewSection === -1}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed" 
            title="Bagian Sebelumnya"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center px-2 text-[#FFD400] text-[11px] uppercase tracking-wider font-semibold">
            {previewSection === -1 ? 'Cover' : `Bagian ${previewSection + 1}`}
          </div>
          <button 
            onClick={() => scrollToSection(previewSection + 1)} 
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors" 
            title="Bagian Selanjutnya"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      <div onScroll={handleScroll} className={`w-full h-full relative bg-[#F7F2E9] text-[#111111] font-sans flex flex-col ${isPreview ? 'overflow-y-auto' : ''}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Manrope:wght@500;700;800&family=Shadows+Into+Light&family=Caveat:wght@400;700&family=Indie+Flower&display=swap');
        
        .slab-font-display { font-family: 'Baloo 2', sans-serif; font-weight: 800; line-height: 1.1; }
        .slab-font-body { font-family: 'Manrope', sans-serif; }
        .script-font-shadows { font-family: 'Shadows Into Light', cursive; font-weight: 400; }
        .script-font-caveat { font-family: 'Caveat', cursive; font-weight: 700; }
        .script-font-indie { font-family: 'Indie Flower', cursive; font-weight: 400; }
        
        .neo-card {
          border: 3px solid #111111;
          border-radius: 14px;
          box-shadow: 5px 5px 0 #111111;
          background: #FFFFFF;
        }
        
        .neo-btn {
          display: inline-flex; align-items: center; justify-content: center;
          border: 3px solid #111111;
          border-radius: 12px;
          box-shadow: 4px 4px 0 #111111;
          background: #FFD400;
          font-family: 'Manrope', sans-serif;
          font-weight: 800;
          font-size: 14px;
          letter-spacing: 0.03em;
          padding: 14px 30px;
          cursor: pointer;
          transition: transform .12s ease, box-shadow .12s ease;
          text-transform: uppercase;
          color: #111111;
          text-decoration: none;
        }
        .neo-btn:active {
          transform: translate(4px, 4px);
          box-shadow: 0 0 0 #111111;
        }
        .neo-btn.alt { background: #FFFFFF; }
        .neo-btn.green { background: #2ECC71; }
        .neo-btn.pink { background: #FF5D8F; }
        .neo-btn.selected { box-shadow: inset 4px 4px 0 rgba(0,0,0,0.2); transform: translate(2px, 2px); }
        
        .eyebrow {
          font-size: 12px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .underline-yellow {
          display: inline-block; width: 56px; height: 6px;
          background: #FFD400; border: 2px solid #111111; border-radius: 4px;
        }
        .asterisk {
          position: absolute; color: #FFD400; -webkit-text-stroke: 1.5px #111111;
          font-size: 34px; font-weight: 800; line-height: 1; user-select: none; pointer-events: none;
        }
        
        .section-padding { padding: 80px 24px; display: flex; flex-direction: column; align-items: center; width: 100%; position: relative; }
        .section-padding > * { max-width: 768px; width: 100%; }
        .section-padding > .asterisk { width: auto; max-width: none; }
        .bg-alt { background: #C9D9E8; }
        
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to { transform: translateX(calc(-50% - 8px)); }
        }
        .marquee-track {
          display: flex; gap: 16px; width: max-content; 
          animation: marqueeScroll 30s linear infinite;
        }
        .wish-card {
          background: #FFFFFF; color: #111111; border: 3px solid #111111; border-radius: 12px; 
          box-shadow: 4px 4px 0 #111111; padding: 16px 18px; width: 280px; flex-shrink: 0;
          white-space: normal;
        }
        
        details.gift-acc {
          background: #FFFFFF; color: #111111; border: 3px solid #111111; border-radius: 12px; 
          box-shadow: 4px 4px 0 #111111; padding: 18px 20px; margin-bottom: 16px;
        }
        details.gift-acc summary {
          cursor: pointer; font-weight: 800; font-size: 14px; text-transform: uppercase;
          list-style: none; display: flex; justify-content: space-between; align-items: center;
        }
        details.gift-acc summary::-webkit-details-marker { display: none; }
        details.gift-acc summary::after { content: '+'; font-size: 20px; font-weight: 800; }
        details.gift-acc[open] summary::after { content: '–'; }
      `}} />

      {/* Hidden Youtube iframe */}
      {youtubeId && stage > 0 && isPlaying && (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&playlist=${youtubeId}&enablejsapi=1`}
          allow="autoplay"
          className="hidden"
        />
      )}

      {/* Floating Music Button */}
      {youtubeId && stage > 0 && (
        <button 
          onClick={() => setIsPlaying(!isPlaying)}
          className="fixed bottom-[24px] right-[24px] w-[56px] h-[56px] rounded-full bg-[#FFD400] border-[3px] border-[#111111] shadow-[4px_4px_0_#111111] flex items-center justify-center text-[#111111] z-[60] transition-transform hover:scale-105 active:scale-95"
        >
          {isPlaying ? <Music className="w-6 h-6" strokeWidth={2.5} /> : <Music4 className="w-6 h-6" strokeWidth={2.5} opacity={0.5} />}
        </button>
      )}

      <AnimatePresence mode="wait">
        {/* STAGE 0: Cover */}
        {stage === 0 && (
          <motion.div 
            key="cover"
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.5, 0, 0.2, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#111111] overflow-hidden"
          >
            {/* Full Bleed Background */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${displayFotoCover}')` }} />
            {/* Dark Overlay for Text Readability */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Upper Section */}
            <div className="relative z-20 w-full flex flex-col items-center pt-[61px] px-[20px] max-w-[500px] mx-auto">
              {/* Asterisk top-left */}
              <Asterisk className="absolute left-[20px] top-[61px] text-[#FFD400]" size={36} strokeWidth={3} />
              {/* Asterisk mid-right */}
              <Asterisk className="absolute right-[20px] top-[181px] text-[#FFD400]" size={28} strokeWidth={3} />
                
                <h1 className="script-font-indie text-[28px] md:text-[34px] text-[#FFD400] text-center leading-[1.1] mb-[16px] max-w-[280px]">
                  getting married<br/>happily ever after
                </h1>

                {/* Countdown */}
                <div className="flex justify-center items-center gap-[6px]">
                  {[ 
                    { val: timeLeft.d, lbl: 'Hari', accent: false },
                    { val: timeLeft.h, lbl: 'Jam', accent: false },
                    { val: timeLeft.m, lbl: 'Menit', accent: false },
                    { val: timeLeft.s, lbl: 'Detik', accent: true }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center">
                      <div className={`w-[48px] py-[8px] border-[2px] border-[#111111] rounded-[8px] shadow-[2px_2px_0_#111111] text-[#111111] flex flex-col items-center justify-center ${item.accent ? 'bg-[#FFD400]' : 'bg-[#FFFFFF]'}`}>
                        <div className="font-[800] text-[18px] leading-none mb-[2px]">{item.val}</div>
                        <div className="text-[7px] uppercase tracking-[.05em] font-[800] slab-font-body">{item.lbl}</div>
                      </div>
                      {i < 3 && <div className="text-[#FFD400] font-[800] text-[18px] mx-[2px] mb-[12px]">:</div>}
                    </div>
                  ))}
                </div>

                {/* Guest Text (Moved up and card removed) */}
                {guestName && (
                  <div className="mt-[24px] text-center">
                    <span className="text-[10px] text-[#FFFFFF]/90 font-[600] uppercase tracking-[.15em] block mb-[4px] drop-shadow-md">Special Guest</span>
                    <span className="font-semibold text-[#FFFFFF] text-[20px] block drop-shadow-lg">{guestName}</span>
                  </div>
                )}
              </div>

            {/* Lower Section */}
            <div className="relative z-20 w-full flex flex-col px-[24px] pb-[52px] max-w-[500px] mx-auto">
              {/* Footer Text */}
              <div className="text-center w-full mb-[24px]">
                <span className="text-[11px] text-[#FFFFFF]/80 font-[600] uppercase tracking-[.15em] block mb-[4px]">The Wedding Of</span>
                <span className="font-medium text-[26px] text-[#FFD400] uppercase tracking-[.1em] block mt-[4px]">
                  {nama_panggilan_pria} &amp; {nama_panggilan_wanita}
                </span>
              </div>

              {/* Buka Undangan Button */}
              <button onClick={handleOpen} className="w-full bg-[#FFD400] border-[2px] border-[#111111] rounded-[8px] py-[16px] font-[800] text-[#111111] uppercase tracking-[.05em] text-[15px] shadow-[0_4px_0_#111111] active:shadow-[0_0_0_#111111] active:translate-y-[4px] transition-all">
                Buka Undangan
              </button>
            </div>

          </motion.div>
        )}

        {/* STAGE 1: Main Content */}
        {stage === 1 && (
          <motion.div 
            key="main"
            ref={scrollContainerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full flex flex-col"
          >
            {/* HERO */}
            <section className="section-padding bg-[#111111] text-[#FFFFFF] pt-[88px] text-center">
              <span className="asterisk" style={{ top: 20, right: 20 }}>*</span>
              <p className="eyebrow text-white/70">The Wedding Of</p>
              <h2 className="script-font-indie text-[30px] md:text-[36px] text-white mt-[10px] leading-[1.2]">{nama_lengkap_pria}<br/>&amp; {nama_lengkap_wanita}</h2>
              <div className="inline-block mt-[16px] text-[#FFFFFF] font-[800] text-[14px] uppercase tracking-[.05em]">
                {acara_akad_tanggal}
              </div>
            </section>

            {/* QUOTE */}
            <section className="section-padding text-center">
              <span className="asterisk" style={{ top: 24, left: 16 }}>*</span>
              <motion.div variants={popIn} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} className="neo-card max-w-[420px] mx-auto p-[32px_24px]">
                <blockquote className="font-semibold text-[18px] leading-[1.6]">
                  "{quote_text}"
                  <cite className="block mt-[16px] font-[700] text-[12px] uppercase text-[#4A4A4A] not-italic">— {quote_author}</cite>
                </blockquote>
              </motion.div>
            </section>

            {/* MEMPELAI */}
            <section className="section-padding bg-alt text-center">
              <h2 className="script-font-indie text-[42px] text-[#111111] mb-[36px]">the bride &amp; groom</h2>
              
              <div className="flex flex-col gap-[28px] items-center mx-auto w-full max-w-[400px]">
                {/* Groom */}
                <motion.div variants={popIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="neo-card w-full p-[24px_20px] text-center">
                  <div className="w-[120px] h-[120px] rounded-full border-[3px] border-[#111111] shadow-[4px_4px_0_#111111] mx-auto mb-[18px] overflow-hidden bg-[#e4d9c3]">
                    <img src={displayFotoPria} alt={nama_panggilan_pria} className="w-full h-full object-cover" />
                  </div>
                  <p className="eyebrow text-[#4A4A4A]">The Groom</p>
                  <h3 className="font-semibold text-[18px] mt-[4px] leading-[1.2]">{nama_lengkap_pria}</h3>
                  <p className="text-[13px] text-[#4A4A4A] mt-[10px] leading-[1.6]">
                    Putra dari<br/>{nama_ayah_pria} &amp; {nama_ibu_pria}
                  </p>
                </motion.div>
                
                {/* Bride */}
                <motion.div variants={popIn} initial="hidden" whileInView="visible" viewport={{ once: true, delay: 0.1 }} className="neo-card w-full p-[24px_20px] text-center">
                  <div className="w-[120px] h-[120px] rounded-full border-[3px] border-[#111111] shadow-[4px_4px_0_#111111] mx-auto mb-[18px] overflow-hidden bg-[#e4d9c3]">
                    <img src={displayFotoWanita} alt={nama_panggilan_wanita} className="w-full h-full object-cover" />
                  </div>
                  <p className="eyebrow text-[#4A4A4A]">The Bride</p>
                  <h3 className="font-semibold text-[18px] mt-[4px] leading-[1.2]">{nama_lengkap_wanita}</h3>
                  <p className="text-[13px] text-[#4A4A4A] mt-[10px] leading-[1.6]">
                    Putri dari<br/>{nama_ayah_wanita} &amp; {nama_ibu_wanita}
                  </p>
                </motion.div>
              </div>
            </section>

            {/* GALLERY */}
            {displayFotoUrls && displayFotoUrls.length > 0 && (
              <section className="section-padding bg-alt text-center">
                <span className="asterisk" style={{ top: 20, left: 16 }}>*</span>
                <h2 className="script-font-indie text-[42px] mb-[32px]">moments</h2>
                
                <div className="grid grid-cols-3 auto-rows-[100px] gap-[12px] max-w-[420px] mx-auto w-full">
                  {displayFotoUrls.slice(0, 6).map((url, i) => {
                    // Hanya menggunakan 2 ukuran (1x1 dan 2x2) untuk tampilan bento yang lebih rapi
                    let spanClass = "col-span-1 row-span-1";
                    const idx = i % 6;
                    
                    if (idx === 0 || idx === 3) {
                      spanClass = "col-span-2 row-span-2";
                    }

                    return (
                      <motion.div key={i} variants={popIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`w-full h-full overflow-hidden rounded-[12px] ${spanClass}`}>
                        <img src={url} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
                      </motion.div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* LOVE STORY */}
            {love_story && love_story.length > 0 && (
              <section className="section-padding bg-[#111111] text-[#FFFFFF]">
                <span className="asterisk" style={{ top: 20, right: 20 }}>*</span>
                <div className="w-full">
                  <h2 className="script-font-indie text-[42px] text-white">love story</h2>
                  <p className="eyebrow text-white/70 mt-[6px]">How It All Started</p>
                  
                  <div className="relative mt-[36px] pl-[26px]">
                    <div className="absolute left-[6.5px] top-[29px] bottom-[6px] w-[3px] bg-[#FFD400]" />
                    
                    {love_story.map((item, i) => (
                      <motion.div key={i} variants={popIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative mb-[22px]">
                        <div className="absolute left-[-26px] top-[21px] w-[16px] h-[16px] rounded-full bg-[#FFD400] border-[3px] border-[#111111]" />
                        <div className="bg-[#FFFFFF] text-[#111111] p-[18px_20px] rounded-[14px] border-[3px] border-[#111111] shadow-[5px_5px_0_#111111]">
                          <div className="text-[11px] font-[800] uppercase text-[#8B4513]">{item.tanggal}</div>
                          <h4 className="slab-font-display text-[16px] my-[6px]">{item.judul}</h4>
                          <p className="text-[13px] leading-[1.6] text-[#4A4A4A] slab-font-body">{item.deskripsi}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* ACARA */}
            <section className="section-padding bg-alt text-center">
              <h2 className="script-font-indie text-[42px] mb-[32px]">save the date</h2>
              
              <div className="flex flex-col gap-[20px] md:gap-[28px] items-center mx-auto w-full max-w-[420px]">
                {acara_akad_nama && (
                  <motion.div variants={popIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="neo-card p-[24px_20px] w-full text-left">
                    <span className="inline-block bg-[#111111] text-[#FFFFFF] text-[11px] font-[800] uppercase tracking-[.06em] p-[6px_12px] rounded-[6px] mb-[14px]">
                      {acara_akad_nama}
                    </span>
                    <div className="mb-[10px]">
                      <div className="font-[800] uppercase text-[11px] tracking-[.04em] text-[#4A4A4A] mb-[2px]">Tanggal</div>
                      <div className="text-[14px] font-[800] uppercase tracking-[.05em]">{acara_akad_tanggal}</div>
                    </div>
                    <div className="mb-[10px]">
                      <div className="font-[800] uppercase text-[11px] tracking-[.04em] text-[#4A4A4A] mb-[2px]">Waktu</div>
                      <div className="text-[14px]">{acara_akad_jam}</div>
                    </div>
                    <div className="mb-[10px]">
                      <div className="font-[800] uppercase text-[11px] tracking-[.04em] text-[#4A4A4A] mb-[2px]">Lokasi</div>
                      <div className="text-[14px] leading-[1.4]">{acara_akad_lokasi}</div>
                    </div>
                    {acara_akad_maps_url && <a href={acara_akad_maps_url} target="_blank" className="block w-max mx-auto bg-[#FFD400] text-[#111111] text-[11px] font-[800] uppercase tracking-[.06em] p-[6px_12px] rounded-[6px] mt-[16px] hover:bg-[#e5be00] transition-colors">BUKA MAPS</a>}
                  </motion.div>
                )}
                {acara_resepsi_nama && (
                  <motion.div variants={popIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="neo-card p-[24px_20px] w-full text-left">
                    <span className="inline-block bg-[#111111] text-[#FFFFFF] text-[11px] font-[800] uppercase tracking-[.06em] p-[6px_12px] rounded-[6px] mb-[14px]">
                      {acara_resepsi_nama}
                    </span>
                    <div className="mb-[10px]">
                      <div className="font-[800] uppercase text-[11px] tracking-[.04em] text-[#4A4A4A] mb-[2px]">Tanggal</div>
                      <div className="text-[14px] font-[800] uppercase tracking-[.05em]">{acara_resepsi_tanggal}</div>
                    </div>
                    <div className="mb-[10px]">
                      <div className="font-[800] uppercase text-[11px] tracking-[.04em] text-[#4A4A4A] mb-[2px]">Waktu</div>
                      <div className="text-[14px]">{acara_resepsi_jam}</div>
                    </div>
                    <div className="mb-[10px]">
                      <div className="font-[800] uppercase text-[11px] tracking-[.04em] text-[#4A4A4A] mb-[2px]">Lokasi</div>
                      <div className="text-[14px] leading-[1.4]">{acara_resepsi_lokasi}</div>
                    </div>
                    {acara_resepsi_maps_url && <a href={acara_resepsi_maps_url} target="_blank" className="block w-max mx-auto bg-[#FFD400] text-[#111111] text-[11px] font-[800] uppercase tracking-[.06em] p-[6px_12px] rounded-[6px] mt-[16px] hover:bg-[#e5be00] transition-colors">BUKA MAPS</a>}
                  </motion.div>
                )}
              </div>
            </section>

            {/* RSVP */}
            <section className="section-padding bg-[#111111] text-[#FFFFFF] overflow-hidden">
              <div className="w-full">
                <h2 className="script-font-indie text-[42px] text-white">rsvp &amp; wishes</h2>
                <p className="eyebrow text-white/70 mt-[6px]">Konfirmasi Kehadiran</p>
                
                <form onSubmit={handleRSVP} className="neo-card mt-[28px] p-[26px_22px] text-[#111111]">
                  <input type="text" placeholder="Nama Anda" value={rsvpForm.nama_tamu} onChange={e => setRsvpForm({...rsvpForm, nama_tamu: e.target.value})} required className="w-full border-[3px] border-[#111111] rounded-[10px] p-[12px_14px] font-sans text-[14px] mb-[14px] bg-[#FFFFFF] outline-none" />
                  <div className="flex gap-[10px] mb-[14px]">
                    <button type="button" onClick={() => setRsvpForm({...rsvpForm, status_kehadiran: 'hadir'})} className={`neo-btn green flex-1 py-[12px] text-[13px] ${rsvpForm.status_kehadiran === 'hadir' ? 'selected' : ''}`}>Hadir</button>
                    <button type="button" onClick={() => setRsvpForm({...rsvpForm, status_kehadiran: 'tidak hadir'})} className={`neo-btn pink flex-1 py-[12px] text-[13px] ${rsvpForm.status_kehadiran === 'tidak hadir' ? 'selected' : ''}`}>Tidak Hadir</button>
                  </div>
                  <textarea rows="3" placeholder="Tulis ucapan & doa untuk mempelai..." value={rsvpForm.pesan} onChange={e => setRsvpForm({...rsvpForm, pesan: e.target.value})} className="w-full border-[3px] border-[#111111] rounded-[10px] p-[12px_14px] font-sans text-[14px] mb-[14px] bg-[#FFFFFF] outline-none resize-none"></textarea>
                  <button type="submit" disabled={isSubmittingRsvp} className="neo-btn w-full">{isSubmittingRsvp ? "Mengirim..." : "Kirim RSVP & Ucapan"}</button>
                </form>

                {liveWishes.length > 0 && (
                  <div className="mt-[36px] overflow-hidden">
                    <div className="marquee-track">
                      {/* Double the array for smooth endless loop */}
                      {[...liveWishes, ...liveWishes].map((wish, i) => (
                        <div key={i} className="wish-card">
                          <p className="text-[13px] italic mb-[10px] leading-[1.5]">"{wish.pesan}"</p>
                          <div className="text-[11px] font-[800] uppercase">— {wish.nama_tamu || wish.nama}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* LIVE STREAMING */}
            {hasLiveStreams && (
              <section className="section-padding bg-alt text-center">
                <h2 className="script-font-indie text-[42px]">live streaming</h2>
                <p className="eyebrow text-[#4A4A4A] mt-[6px]">Bagi yang berhalangan hadir</p>
                <div className="flex flex-col gap-[14px] mt-[32px] w-full max-w-[400px]">
                  {live_meet_url && <a href={live_meet_url} target="_blank" className="neo-btn">Google Meet</a>}
                  {live_youtube_url && <a href={live_youtube_url} target="_blank" className="neo-btn">Youtube Live</a>}
                  {live_zoom_url && <a href={live_zoom_url} target="_blank" className="neo-btn">Zoom Meeting</a>}
                  {live_tiktok_url && <a href={live_tiktok_url} target="_blank" className="neo-btn">TikTok Live</a>}
                </div>
              </section>
            )}

            {/* WEDDING GIFT */}
            {(rekening_wanita.length > 0 || rekening_pria.length > 0) && (
              <section className="section-padding bg-[#111111] text-[#FFFFFF] text-center">
                <h2 className="script-font-indie text-[42px] text-white">wedding gift</h2>
                <p className="eyebrow text-white/70 mt-[6px]">Kirim Bingkisan</p>

                <div className="flex flex-col gap-[20px] mt-[20px] w-full max-w-[400px] mx-auto">
                  {rekening_wanita.length > 0 && (
                    <div className="flex-1 text-left">
                      {rekening_wanita.map((rek, i) => (
                        <details key={i} className="gift-acc">
                          <summary>Gift Untuk {nama_panggilan_wanita}</summary>
                          <div className="mt-[14px] pt-[14px] border-t-[2px] border-dashed border-[#111111]">
                            <div className="text-[13px] font-[800] uppercase">{rek.bank}</div>
                            <div className="text-[18px] tracking-[.05em] my-[4px]">{rek.nomor}</div>
                            <div className="text-[12px] text-[#4A4A4A]">a.n {rek.atas_nama}</div>
                            <button onClick={() => { navigator.clipboard.writeText(rek.nomor); alert('Nomor disalin!'); }} className="neo-btn alt mt-[10px] text-[11px] p-[8px_16px]">Salin Nomor</button>
                          </div>
                        </details>
                      ))}
                    </div>
                  )}
                  {rekening_pria.length > 0 && (
                    <div className="flex-1 text-left">
                      {rekening_pria.map((rek, i) => (
                        <details key={i} className="gift-acc">
                          <summary>Gift Untuk {nama_panggilan_pria}</summary>
                          <div className="mt-[14px] pt-[14px] border-t-[2px] border-dashed border-[#111111]">
                            <div className="text-[13px] font-[800] uppercase">{rek.bank}</div>
                            <div className="text-[18px] tracking-[.05em] my-[4px]">{rek.nomor}</div>
                            <div className="text-[12px] text-[#4A4A4A]">a.n {rek.atas_nama}</div>
                            <button onClick={() => { navigator.clipboard.writeText(rek.nomor); alert('Nomor disalin!'); }} className="neo-btn alt mt-[10px] text-[11px] p-[8px_16px]">Salin Nomor</button>
                          </div>
                        </details>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* DRESS CODE */}
            {dresscode_warna && dresscode_warna.length > 0 && (
              <section className="section-padding text-center">
                <h2 className="script-font-indie text-[42px] mb-[10px]">dress code</h2>
                <p className="text-[14px] text-[#4A4A4A] mt-[20px] max-w-[400px] mx-auto">{dresscode_desc}</p>
                <div className="flex justify-center gap-[16px] my-[28px]">
                  {dresscode_warna.map((color, i) => (
                    <div key={i} className="w-[52px] h-[52px] rounded-full border-[3px] border-[#111111] shadow-[3px_3px_0_#111111]" style={{ backgroundColor: color }} />
                  ))}
                </div>
                <p className="eyebrow text-[#4A4A4A]">Warna dipilih oleh mempelai</p>
              </section>
            )}

            {/* THANKS */}
            <section className="section-padding bg-[#FFD400] text-center pb-[100px]">
              <span className="asterisk" style={{ top: 24, left: 16, WebkitTextStroke: '1.5px #111111', color: '#FFFFFF' }}>*</span>
              <h2 className="script-font-indie text-[42px]">thank you</h2>
              <p className="text-[14px] max-w-[340px] mx-auto mt-[18px] leading-[1.7]">{ucapan_terima_kasih}</p>
              <div className="font-semibold text-[20px] mt-[26px]">{nama_panggilan_pria} &amp; {nama_panggilan_wanita}</div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
    </div>
  );
}
