'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, Calendar, MapPin, 
  Send, CheckCircle, Copy, ExternalLink, UserCheck, Users, MessageSquare,
  ChevronLeft, ChevronRight
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';

function getGoogleMapsEmbedUrl(url, fallbackAddress = '') {
  if (url && url.includes('<iframe')) {
    const match = url.match(/src=["']([^"']+)["']/);
    if (match && match[1]) return match[1];
  }
  if (url && url.includes('/maps/embed')) {
    return url;
  }
  if (url && (url.includes('google.com/maps') || url.includes('maps.google.com'))) {
    const qMatch = url.match(/[?&]q=([^&]+)/);
    const query = qMatch ? decodeURIComponent(qMatch[1]) : (fallbackAddress || 'Jakarta');
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }
  const query = fallbackAddress || url || 'Jakarta';
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
}

// Framer Motion Animation Variants for Scroll Reveal
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const popIn = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12
    }
  }
};

export default function RetroVintageTemplate({ data = {}, isPreview = false, isBuilder = false }) {
  const [isOpened, setIsOpened] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  
  // Section Navigation Controller for Live Preview / Builder Mode
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  const sectionsList = [
    { id: 'section-hero', title: 'Hero' },
    { id: 'section-quote', title: 'Quote' },
    { id: 'section-couple', title: 'Mempelai' },
    { id: 'section-gallery', title: 'Galeri' },
    { id: 'section-story', title: 'Kisah Cinta' },
    { id: 'section-event', title: 'Acara' },
    { id: 'section-countdown', title: 'Countdown' },
    { id: 'section-stream', title: 'Live Stream' },
    { id: 'section-dresscode', title: 'Dress Code' },
    { id: 'section-gift', title: 'Amplop Digital' },
    { id: 'section-rsvp', title: 'RSVP' },
    { id: 'section-closing', title: 'Penutup' }
  ];

  const handleNavigateSection = (direction) => {
    if (!isOpened) {
      if (direction > 0) {
        setIsOpened(true);
        setActiveSectionIndex(0);
        setTimeout(() => {
          const el = document.getElementById('section-hero');
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
      return;
    }

    const nextIndex = activeSectionIndex + direction;
    if (nextIndex < 0) {
      setIsOpened(false);
      return;
    }

    if (nextIndex < sectionsList.length) {
      setActiveSectionIndex(nextIndex);
      const targetSec = sectionsList[nextIndex];
      setTimeout(() => {
        const el = document.getElementById(targetSec.id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  };
  
  // RSVP Form State
  const [rsvpForm, setRsvpForm] = useState({
    nama: '',
    kehadiran: 'hadir',
    jumlah_tamu: '1',
    pesan: ''
  });
  const [submittedWishes, setSubmittedWishes] = useState([]);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  let guestName = isPreview ? "Tamu Undangan" : "";
  try {
    const searchParams = useSearchParams();
    if (searchParams) {
      guestName = searchParams.get('to') || guestName;
    }
  } catch (e) {
    // Safe fallback if useSearchParams is called outside Suspense
  }

  const {
    nama_panggilan_pria = (isPreview ? "Bagus" : ""),
    nama_panggilan_wanita = (isPreview ? "Kartika" : ""),
    nama_lengkap_pria = (isPreview ? "Bagus Setyawan, S.T." : ""),
    nama_ayah_pria = (isPreview ? "Bapak Hendra Setyawan" : ""),
    nama_ibu_pria = (isPreview ? "Ibu Sari Wulandari" : ""),
    nama_lengkap_wanita = (isPreview ? "Kartika Ayu, S.E." : ""),
    nama_ayah_wanita = (isPreview ? "Bapak Bambang Prasetyo" : ""),
    nama_ibu_wanita = (isPreview ? "Ibu Ratna Kusuma" : ""),
    foto_cover = "/foto-dummy-undangan2/cover.jpeg",
    foto_hero = "/foto-dummy-undangan2/loveisall.film_1784906403191.jpeg",
    foto_pria = "/foto-dummy-undangan2/loveisall.film_1784906406087.jpeg",
    foto_wanita = "/foto-dummy-undangan2/loveisall.film_1784906406488.jpeg",
    foto_urls = [],
    tanggal_acara = (isPreview ? "2026-12-12" : ""),
    waktu_acara = "08:00",
    quote_text = (isPreview ? "Cinta bukan tentang mencari seseorang yang sempurna, tetapi belajar melihat ketidaksempurnaan dengan cara yang sempurna." : ""),
    quote_author = (isPreview ? "Doa & Harapan Kami" : ""),
    acara_akad_nama = (isPreview ? "Akad Nikah" : ""),
    acara_akad_tanggal = (isPreview ? "Sabtu, 12 Desember 2026" : ""),
    acara_akad_jam = (isPreview ? "08:00 - 10:00 WIB" : ""),
    acara_akad_lokasi = (isPreview ? "Masjid Agung Kota, Jl. Merdeka No. 45" : ""),
    acara_akad_maps_url = (isPreview ? "https://maps.google.com" : ""),
    acara_resepsi_nama = (isPreview ? "Resepsi Nikah" : ""),
    acara_resepsi_tanggal = (isPreview ? "Sabtu, 12 Desember 2026" : ""),
    acara_resepsi_jam = (isPreview ? "11:00 - 14:00 WIB" : ""),
    acara_resepsi_lokasi = (isPreview ? "Gedung Serbaguna Utama, Jl. Ahmad Yani No. 100" : ""),
    acara_resepsi_maps_url = (isPreview ? "https://maps.google.com" : ""),
    love_story = [],
    live_youtube_url = "",
    live_zoom_url = "",
    live_meet_url = "",
    rekening_pria = [],
    rekening_wanita = [],
    dresscode_warna = (isPreview ? ["#F5F5F5", "#76ABAE", "#303841", "#303841"] : []),
    dresscode_desc = (isPreview ? "Disarankan mengenakan pakaian bernuansa Retro / Earthy Tone." : ""),
    ucapan_terima_kasih = (isPreview ? "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu." : ""),
    wishes = [],
    id: order_id
  } = data || {};

  // Lock body scrolling when cover overlay is active (removed to prevent touch scroll locking on mobile browsers)
  useEffect(() => {
    // Body overflow is kept natural so mobile touch scroll listeners remain 100% fluid
  }, [isOpened, isBuilder, isPreview]);

  // Combine initial wishes with submitted wishes
  const allWishes = [...submittedWishes, ...(wishes && wishes.length > 0 ? wishes : (isPreview ? [
    { nama: "Budi & Keluarga", pesan: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah." },
    { nama: "Siska Maharani", pesan: "Happy Wedding Bagus & Kartika! Bahagia dan langgeng selalu." },
    { nama: "Rendi & Nisa", pesan: "Selamat kawan! Semoga lancar dan sukses semua acaranya." }
  ] : []))];

  const defaultLoveStory = love_story && love_story.length > 0 ? love_story : (isPreview ? [
    { tanggal: "2021", judul: "Awal Pertemuan", deskripsi: "Pertama kali bertemu saat kegiatan organisasi dan mulai menjalin komunikasi hangat." },
    { tanggal: "2023", judul: "Menjalin Hubungan", deskripsi: "Memutuskan untuk saling mengikat komitmen dalam ikatan kasih yang lebih serius." },
    { tanggal: "2026", judul: "Lamaran & Niat Baik", deskripsi: "Mengutarakan niat suci di hadapan kedua keluarga besar untuk melangkah ke jenjang pernikahan." }
  ] : []);

  const defaultGallery = foto_urls && foto_urls.length > 0 ? foto_urls : (isPreview ? [
    "/foto-dummy-undangan2/loveisall.film_1784906423202.jpeg",
    "/foto-dummy-undangan2/loveisall.film_1784906423611.jpeg",
    "/foto-dummy-undangan2/loveisall.film_1784906434619.jpeg",
    "/foto-dummy-undangan2/loveisall.film_1784906435010.jpeg",
    "/foto-dummy-undangan2/loveisall.film_1784906447931.jpeg",
    "/foto-dummy-undangan2/loveisall.film_1784906403191.jpeg"
  ] : []);

  const defaultRekeningPria = rekening_pria && rekening_pria.length > 0 ? rekening_pria : (isPreview ? [
    { bank: "BCA", nomor: "1234567890", atas_nama: nama_lengkap_pria || "Bagus Setyawan" }
  ] : []);

  const defaultRekeningWanita = rekening_wanita && rekening_wanita.length > 0 ? rekening_wanita : (isPreview ? [
    { bank: "Mandiri", nomor: "0987654321", atas_nama: nama_lengkap_wanita || "Kartika Ayu" }
  ] : []);

  useEffect(() => {
    if (!tanggal_acara) return;
    const targetDateStr = String(tanggal_acara).includes('T') ? tanggal_acara : `${tanggal_acara}T${waktu_acara || '08:00'}:00`;
    const parsedTarget = new Date(targetDateStr).getTime();
    const target = isNaN(parsedTarget) ? new Date('2026-12-12T08:00:00').getTime() : parsedTarget;

    const tick = () => {
      const distance = Math.max(0, target - Date.now());
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tanggal_acara, waktu_acara]);

  const handleCopyRekening = (nomor, key) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(nomor);
    }
    setCopiedIndex(key);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRsvpSubmit = async (e) => {
    e.preventDefault();
    if (!rsvpForm.nama || !rsvpForm.pesan) return;
    setIsSubmitting(true);

    try {
      if (order_id && !isPreview) {
        await fetch(`/api/u/${order_id}/rsvp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(rsvpForm)
        });
      }
      setSubmittedWishes(prev => [{ nama: rsvpForm.nama, pesan: rsvpForm.pesan }, ...prev]);
      setRsvpSubmitted(true);
      setRsvpForm({ nama: '', kehadiran: 'hadir', jumlah_tamu: '1', pesan: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDesktopSplit = !isBuilder && !isPreview;
  const handleOpenInvitation = () => {
    setIsOpened(true);
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <div className={`w-full text-[#303841] font-sans touch-pan-y ${isDesktopSplit ? 'min-h-screen flex' : 'min-h-screen relative bg-[#F5F5F5]'} selection:bg-[#303841] selection:text-white`}>
      
      {/* FLOATING SECTION CONTROLLER (PORTALED DIRECTLY TO BODY SO IT NEVER SCROLLS - BUILDER ONLY) */}
      {mounted && isBuilder && typeof document !== 'undefined' && createPortal(
        <div className="fixed top-6 right-6 z-[9999] flex items-center gap-2 bg-black/75 backdrop-blur-md p-1.5 rounded-full border border-white/20 shadow-2xl pointer-events-auto text-white">
          <button 
            type="button"
            onClick={() => handleNavigateSection(-1)} 
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer" 
            title="Bagian Sebelumnya"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center px-2 text-white text-[11px] uppercase tracking-wider font-semibold">
            {!isOpened ? 'Cover' : `Bagian ${activeSectionIndex + 1} / ${sectionsList.length}`}
          </div>
          <button 
            type="button"
            onClick={() => handleNavigateSection(1)} 
            disabled={isOpened && activeSectionIndex >= sectionsList.length - 1}
            className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer" 
            title="Bagian Selanjutnya"
          >
            <ChevronRight size={18} />
          </button>
        </div>,
        document.body
      )}
      
      {/* DESKTOP LEFT PANEL (STATIC FIXED SIDEBAR VISIBLE ONLY ON LIVE ORDER `!isBuilder && !isPreview`) */}
      {isDesktopSplit && (
        <div 
          className="hidden lg:flex fixed left-0 top-0 bottom-0 h-screen lg:w-[calc(100%-460px)] xl:w-[calc(100%-480px)] z-20 flex-col items-center justify-between p-12 text-center text-[#F5F5F5] border-r-4 border-[#303841] shadow-2xl overflow-hidden pointer-events-none select-none"
        >
          {/* Background Image with Sepia Filter & Gradient Overlay */}
          <img 
            src={foto_cover} 
            alt="Cover Desktop" 
            className="absolute inset-0 w-full h-full object-cover sepia z-0 pointer-events-none" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/75 z-0 pointer-events-none" />

          {/* Decorative Vintage Border Ornament */}
          <div className="absolute inset-6 border-2 border-[#FFFFFF]/30 rounded-3xl pointer-events-none z-10" />
          
          {/* Header */}
          <div className="pt-6 relative z-10 space-y-2">
            <span className="text-xs uppercase tracking-[0.4em] font-bold text-[#FFFFFF] drop-shadow">Pernikahan Dari</span>
            <div className="w-16 h-0.5 bg-[#303841] mx-auto rounded-full" />
          </div>

          {/* Center Couple Names & Info */}
          <div className="my-auto relative z-10 space-y-5 max-w-lg px-4">
            <h1 className="text-5xl xl:text-6xl font-bold tracking-tight text-white font-serif leading-tight drop-shadow-xl">
              {nama_panggilan_pria || "Pria"} & {nama_panggilan_wanita || "Wanita"}
            </h1>
            {tanggal_acara && (
              <div className="inline-block px-6 py-2 bg-[#303841]/85 backdrop-blur-md rounded-full border border-white/20 shadow-md">
                <p className="text-xs font-bold text-[#F5F5F5] uppercase tracking-[0.3em]">{tanggal_acara}</p>
              </div>
            )}
            {quote_text && quote_text.trim() !== '' && (
              <p className="text-xs md:text-sm italic font-serif text-[#F5F5F5]/90 leading-relaxed max-w-md mx-auto pt-2 drop-shadow">
                "{quote_text}"
              </p>
            )}
          </div>

          {/* Footer Branding */}
          <div className="pb-4 relative z-10">
            <p className="text-[10px] uppercase tracking-[0.25em] text-[#FFFFFF]/70 font-semibold">Invitea Cards — Retro Vintage Romance</p>
          </div>
        </div>
      )}

      {/* RIGHT INVITATION PANEL */}
      <div className={`w-full ${isDesktopSplit ? 'lg:w-[460px] xl:w-[480px] lg:ml-auto flex-shrink-0 border-l-2 border-[#303841]/30 min-h-screen' : 'min-h-screen'} bg-[#F5F5F5] relative flex flex-col overflow-x-clip`}>

      {/* 1. COVER OVERLAY */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            key="cover-overlay"
            initial={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ 
              opacity: 0, 
              filter: "blur(20px)",
              pointerEvents: "none",
              transition: { duration: 0.5, ease: "easeOut" }
            }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-between p-5 text-center overflow-hidden transform-gpu will-change-transform"
          >
            {/* Background Image with Sepia Filter & Gradient Overlay */}
            <img 
              src={foto_cover} 
              alt="Cover Overlay" 
              className="absolute inset-0 w-full h-full object-cover sepia z-0 pointer-events-none" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/75 z-0 pointer-events-none" />

            <div className="w-full mx-auto flex flex-col h-full justify-between pt-3 pb-8 md:pb-10 relative z-10">
              
              {/* Top Subtitle */}
              <div className="pt-2">
                <span className="text-xs uppercase tracking-[0.35em] font-bold text-white/90 drop-shadow">Pernikahan Dari</span>
              </div>

              {/* Center Floating Overlay Text */}
              <div className="my-auto py-2 space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white font-serif leading-tight drop-shadow-lg px-2">
                  {nama_panggilan_pria || "Pria"} & {nama_panggilan_wanita || "Wanita"}
                </h1>
                {tanggal_acara && <p className="text-xs font-bold text-[#F5F5F5] uppercase tracking-[0.25em] drop-shadow">{tanggal_acara}</p>}

                {guestName && (
                  <div className="max-w-xs mx-auto mt-4 text-white space-y-0.5 drop-shadow-md">
                    <p className="text-[10px] uppercase font-semibold tracking-widest text-white/80">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
                    <p className="text-base font-bold text-white tracking-wide">{guestName}</p>
                  </div>
                )}
              </div>

              {/* Bottom Area: Glassmorphic Countdown Timer + CTA Button */}
              <div className="pb-2 md:pb-4 space-y-3 w-full max-w-xs mx-auto">
                {/* Countdown Timer Grid directly above Buka Undangan button */}
                {tanggal_acara && (
                  <div className="grid grid-cols-4 gap-2 text-center w-full">
                    <div className="bg-[#F5F5F5]/90 backdrop-blur-md p-2 rounded-2xl border border-white/30 shadow-md">
                      <span className="block text-base font-bold text-[#303841]">{timeLeft.days}</span>
                      <span className="text-[8px] uppercase font-bold text-stone-700">Hari</span>
                    </div>
                    <div className="bg-[#F5F5F5]/90 backdrop-blur-md p-2 rounded-2xl border border-white/30 shadow-md">
                      <span className="block text-base font-bold text-[#303841]">{timeLeft.hours}</span>
                      <span className="text-[8px] uppercase font-bold text-stone-700">Jam</span>
                    </div>
                    <div className="bg-[#F5F5F5]/90 backdrop-blur-md p-2 rounded-2xl border border-white/30 shadow-md">
                      <span className="block text-base font-bold text-[#303841]">{timeLeft.minutes}</span>
                      <span className="text-[8px] uppercase font-bold text-stone-700">Menit</span>
                    </div>
                    <div className="bg-[#F5F5F5]/90 backdrop-blur-md p-2 rounded-2xl border border-white/30 shadow-md">
                      <span className="block text-base font-bold text-[#303841]">{timeLeft.seconds}</span>
                      <span className="text-[8px] uppercase font-bold text-stone-700">Detik</span>
                    </div>
                  </div>
                )}

                <button 
                  type="button"
                  onClick={handleOpenInvitation}
                  className="w-full py-3.5 px-6 bg-[#303841] hover:bg-[#222831] active:bg-[#1A2027] text-white font-bold rounded-2xl shadow-2xl transition-all transform active:scale-95 uppercase tracking-wider text-xs flex items-center justify-center cursor-pointer relative z-10 border border-white/20"
                >
                  <span>Buka Undangan</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. INVITATION CONTENT (REVEALED AFTER BUKA UNDANGAN) */}
      {isOpened && (
        <div className="w-full">
        
        {/* SECTION 1: HERO CONTENT (USES FOTO_HERO - DIFFERENT PREWEDDING PHOTO) */}
        <section 
          id="section-hero"
          className="min-h-screen flex flex-col justify-end p-4 md:p-6 text-center relative overflow-hidden border-b-4 border-[#303841]"
        >
          {/* Background Image with Sepia Filter & Gradient Overlay */}
          <img 
            src={foto_hero || (foto_urls && foto_urls[0]) || '/foto-dummy-undangan2/loveisall.film_1784906403191.jpeg'} 
            alt="Hero Photo" 
            className="absolute inset-0 w-full h-full object-cover object-top sepia z-0 pointer-events-none" 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/35 to-black/75 z-0 pointer-events-none" />

          <div className="bg-[#F5F5F5]/85 backdrop-blur-md border-4 border-[#303841] p-6 rounded-3xl w-full max-w-sm mx-auto space-y-3 shadow-2xl mb-4 relative z-10">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-stone-600 mb-0.5">Pernikahan Dari</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#FF5722] font-serif leading-tight">
              {nama_panggilan_pria || "Pria"} & {nama_panggilan_wanita || "Wanita"}
            </h1>
            {tanggal_acara && <p className="text-xs font-semibold text-[#76ABAE] uppercase tracking-widest">{tanggal_acara}</p>}
          </div>
        </section>

            {/* 2. SUMMARY / SALAM PEMBUKA */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="py-10 px-6 text-center space-y-3 bg-[#F5F5F5]"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-[#303841]">Assalamu’alaikum Wr. Wb.</span>
              <p className="text-xs md:text-sm text-stone-700 leading-relaxed max-w-sm mx-auto">
                Maha Suci Allah SWT yang telah menciptakan makhluk-Nya berpasang-pasangan. Dengan memohon rahmat dan ridho-Nya, kami bermaksud menyelenggarakan syukuran pernikahan kami.
              </p>
            </motion.section>

            {/* 3. VINTAGE POEM / QUOTE SECTION (OPTIONAL) */}
            {quote_text && quote_text.trim() !== '' && (
              <motion.section 
                id="section-quote"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={popIn}
                className="px-5 py-6"
              >
                <div className="bg-[#FFFFFF] p-6 rounded-3xl border-2 border-[#303841]/40 shadow-md text-center space-y-3 relative">
                  <div className="w-10 h-1 bg-[#303841] mx-auto rounded-full" />
                  <p className="font-serif italic text-sm md:text-base text-[#303841] leading-relaxed">
                    "{quote_text}"
                  </p>
                  {quote_author && <p className="text-[11px] font-bold uppercase tracking-wider text-[#76ABAE]">— {quote_author}</p>}
                </div>
              </motion.section>
            )}

            {/* 4. COUPLE PROFILES SECTION */}
            <motion.section 
              id="section-couple"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="px-5 py-8 space-y-6"
            >
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#303841]">Mempelai Wanita & Pria</span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#303841]">Pasangan Bahagia</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
                {/* Groom */}
                {(nama_lengkap_pria || foto_pria) && (
                  <motion.div variants={fadeInUp} className="bg-[#FFFFFF] p-6 rounded-3xl border-2 border-[#303841]/30 text-center space-y-3 shadow-sm hover:shadow-md transition">
                    {foto_pria && (
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#303841] shadow-inner">
                        <img src={foto_pria} alt={nama_lengkap_pria} className="w-full h-full object-cover sepia hover:sepia-0 transition duration-500" />
                      </div>
                    )}
                    <div className="px-2">
                      <h3 className="text-xl font-bold font-serif text-[#303841] leading-tight">{nama_lengkap_pria || nama_panggilan_pria}</h3>
                      {nama_panggilan_pria && <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-wider mt-1">{nama_panggilan_pria}</p>}
                    </div>
                    {(nama_ayah_pria || nama_ibu_pria) && (
                      <div className="text-xs text-stone-600 space-y-0.5 border-t border-[#303841]/15 pt-3">
                        <p className="font-medium text-[11px]">Putra dari Pasangan:</p>
                        {nama_ayah_pria && <p className="font-bold text-stone-800">{nama_ayah_pria}</p>}
                        {nama_ibu_pria && <p className="font-bold text-stone-800">& {nama_ibu_pria}</p>}
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Bride */}
                {(nama_lengkap_wanita || foto_wanita) && (
                  <motion.div variants={fadeInUp} className="bg-[#FFFFFF] p-6 rounded-3xl border-2 border-[#303841]/30 text-center space-y-3 shadow-sm hover:shadow-md transition">
                    {foto_wanita && (
                      <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-[#303841] shadow-inner">
                        <img src={foto_wanita} alt={nama_lengkap_wanita} className="w-full h-full object-cover sepia hover:sepia-0 transition duration-500" />
                      </div>
                    )}
                    <div className="px-2">
                      <h3 className="text-xl font-bold font-serif text-[#303841] leading-tight">{nama_lengkap_wanita || nama_panggilan_wanita}</h3>
                      {nama_panggilan_wanita && <p className="text-xs font-semibold text-[#FF5722] uppercase tracking-wider mt-1">{nama_panggilan_wanita}</p>}
                    </div>
                    {(nama_ayah_wanita || nama_ibu_wanita) && (
                      <div className="text-xs text-stone-600 space-y-0.5 border-t border-[#303841]/15 pt-3">
                        <p className="font-medium text-[11px]">Putri dari Pasangan:</p>
                        {nama_ayah_wanita && <p className="font-bold text-[#303841]">{nama_ayah_wanita}</p>}
                        {nama_ibu_wanita && <p className="font-bold text-[#303841]">& {nama_ibu_wanita}</p>}
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.section>

            {/* 5. PREWEDDING SEPIA PHOTO GALLERY (OPTIONAL) */}
            {defaultGallery && defaultGallery.length > 0 && (
              <motion.section 
                id="section-gallery"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="px-5 py-8 space-y-5"
              >
                <div className="text-center space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#303841]">Galeri Kenangan</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#303841]">Momen Bahagia Kami</h2>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {defaultGallery.map((url, idx) => (
                    <motion.div key={idx} variants={popIn} className="bg-[#FFFFFF] p-2 rounded-2xl border border-[#303841]/30 shadow-sm overflow-hidden group">
                      <div className="aspect-square rounded-xl overflow-hidden">
                        <img 
                          src={url} 
                          alt={`Galeri ${idx + 1}`} 
                          className="w-full h-full object-cover sepia group-hover:sepia-0 group-hover:scale-105 transition duration-500" 
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* 6. LOVE STORY TIMELINE (OPTIONAL) */}
            {defaultLoveStory && defaultLoveStory.length > 0 && (
              <motion.section 
                id="section-story"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="px-5 py-8 space-y-6"
              >
                <div className="text-center space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#303841]">Kisah Cinta</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#303841]">Perjalanan Kami</h2>
                </div>

                <div className="space-y-6 max-w-sm mx-auto">
                  {defaultLoveStory.map((item, idx) => (
                    <motion.div key={idx} variants={fadeInUp} className="relative">
                      {/* Connecting Line between cards */}
                      {idx < defaultLoveStory.length - 1 && (
                        <div className="absolute left-1/2 -bottom-6 w-0.5 h-6 border-l-2 border-dashed border-[#303841]/40 z-0 -translate-x-1/2" />
                      )}

                      <div className="bg-[#FFFFFF] p-5 rounded-3xl border-2 border-[#303841]/30 text-center space-y-2 shadow-sm relative z-10 hover:shadow-md transition">
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-[#303841] text-white text-[11px] font-bold rounded-full uppercase tracking-wider shadow-sm">
                          <Heart className="w-3.5 h-3.5 fill-current flex-shrink-0" />
                          <span>{item.tanggal}</span>
                        </div>
                        <h4 className="text-lg font-bold text-[#303841] font-serif">{item.judul}</h4>
                        <p className="text-xs text-stone-700 leading-relaxed max-w-xs mx-auto">{item.deskripsi}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* 7. EVENT SCHEDULE (AKAD & RESEPSI WITH EMBEDDED GOOGLE MAPS) */}
            <motion.section 
              id="section-event"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
              className="px-5 py-8 space-y-6"
            >
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#303841]">Rangkaian Acara</span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#303841]">Waktu & Lokasi</h2>
              </div>

              <div className="grid grid-cols-1 gap-6 max-w-sm mx-auto">
                {/* Akad (Always shown if specified or preview) */}
                {(acara_akad_nama || acara_akad_tanggal || acara_akad_lokasi) && (
                  <motion.div variants={fadeInUp} className="bg-[#FFFFFF] p-5 md:p-6 rounded-3xl border-2 border-[#303841]/40 space-y-4 shadow-sm text-center flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-10 h-10 mx-auto rounded-full bg-[#303841] text-white flex items-center justify-center shadow-sm">
                        <Calendar className="w-5 h-5 flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-serif text-[#303841]">{acara_akad_nama || "Akad Nikah"}</h3>
                        {acara_akad_tanggal && <p className="text-xs font-bold text-[#303841] mt-1">{acara_akad_tanggal}</p>}
                        {acara_akad_jam && <p className="text-xs text-stone-600 font-semibold mt-0.5">{acara_akad_jam}</p>}
                      </div>
                      {acara_akad_lokasi && <p className="text-xs text-stone-700 leading-relaxed border-t border-b border-[#303841]/20 py-3">{acara_akad_lokasi}</p>}
                    </div>

                    {/* Embedded Interactive Google Map */}
                    {acara_akad_lokasi && (
                      <div className="w-full h-44 rounded-2xl overflow-hidden border-2 border-[#303841]/30 shadow-inner my-2 bg-[#F5F5F5]">
                        <iframe
                          src={getGoogleMapsEmbedUrl(acara_akad_maps_url, acara_akad_lokasi)}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Peta Lokasi Akad"
                          className="w-full h-full grayscale hover:grayscale-0 transition duration-500"
                        />
                      </div>
                    )}

                    {acara_akad_maps_url && (
                      <a 
                        href={acara_akad_maps_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#303841] text-[#F5F5F5] font-bold text-xs rounded-2xl hover:bg-[#222831] transition uppercase tracking-wider shadow-sm"
                      >
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>Buka di Google Maps</span>
                      </a>
                    )}
                  </motion.div>
                )}

                {/* Resepsi (OPTIONAL) */}
                {(acara_resepsi_nama || acara_resepsi_tanggal || acara_resepsi_lokasi) && (
                  <motion.div variants={fadeInUp} className="bg-[#FFFFFF] p-5 md:p-6 rounded-3xl border-2 border-[#303841]/40 space-y-4 shadow-sm text-center flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="w-10 h-10 mx-auto rounded-full bg-[#303841] text-white flex items-center justify-center shadow-sm">
                        <Heart className="w-5 h-5 flex-shrink-0" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold font-serif text-[#303841]">{acara_resepsi_nama || "Resepsi Nikah"}</h3>
                        {acara_resepsi_tanggal && <p className="text-xs font-bold text-[#303841] mt-1">{acara_resepsi_tanggal}</p>}
                        {acara_resepsi_jam && <p className="text-xs text-stone-600 font-semibold mt-0.5">{acara_resepsi_jam}</p>}
                      </div>
                      {acara_resepsi_lokasi && <p className="text-xs text-stone-700 leading-relaxed border-t border-b border-[#303841]/20 py-3">{acara_resepsi_lokasi}</p>}
                    </div>

                    {/* Embedded Interactive Google Map */}
                    {acara_resepsi_lokasi && (
                      <div className="w-full h-44 rounded-2xl overflow-hidden border-2 border-[#303841]/30 shadow-inner my-2 bg-[#F5F5F5]">
                        <iframe
                          src={getGoogleMapsEmbedUrl(acara_resepsi_maps_url, acara_resepsi_lokasi)}
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen=""
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Peta Lokasi Resepsi"
                          className="w-full h-full grayscale hover:grayscale-0 transition duration-500"
                        />
                      </div>
                    )}

                    {acara_resepsi_maps_url && (
                      <a 
                        href={acara_resepsi_maps_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#303841] text-[#F5F5F5] font-bold text-xs rounded-2xl hover:bg-[#222831] transition uppercase tracking-wider shadow-sm"
                      >
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>Buka di Google Maps</span>
                      </a>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.section>

            {/* 8. COUNTDOWN TIMER */}
            {tanggal_acara && (
              <motion.section 
                id="section-countdown"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={popIn}
                className="px-5 py-6"
              >
                <div className="bg-[#FFFFFF] p-6 rounded-3xl border-2 border-[#303841]/40 shadow-md text-center space-y-5">
                  <h3 className="text-xl font-bold font-serif text-[#303841]">Hitung Mundur Waktu Bahagia</h3>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-[#F5F5F5] p-2.5 rounded-2xl border border-[#303841]/20 shadow-sm">
                      <span className="block text-xl md:text-2xl font-bold text-[#303841]">{timeLeft.days}</span>
                      <span className="text-[9px] uppercase font-bold text-stone-600">Hari</span>
                    </div>
                    <div className="bg-[#F5F5F5] p-2.5 rounded-2xl border border-[#303841]/20 shadow-sm">
                      <span className="block text-xl md:text-2xl font-bold text-[#303841]">{timeLeft.hours}</span>
                      <span className="text-[9px] uppercase font-bold text-stone-600">Jam</span>
                    </div>
                    <div className="bg-[#F5F5F5] p-2.5 rounded-2xl border border-[#303841]/20 shadow-sm">
                      <span className="block text-xl md:text-2xl font-bold text-[#303841]">{timeLeft.minutes}</span>
                      <span className="text-[9px] uppercase font-bold text-stone-600">Menit</span>
                    </div>
                    <div className="bg-[#F5F5F5] p-2.5 rounded-2xl border border-[#303841]/20 shadow-sm">
                      <span className="block text-xl md:text-2xl font-bold text-[#303841]">{timeLeft.seconds}</span>
                      <span className="text-[9px] uppercase font-bold text-stone-600">Detik</span>
                    </div>
                  </div>
                </div>
              </motion.section>
            )}

            {/* 11. LIVE STREAMING (OPTIONAL) */}
            {(live_youtube_url || live_zoom_url || live_meet_url) && (
              <motion.section 
                id="section-stream"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                className="px-5 py-6"
              >
                <div className="bg-[#FFFFFF] p-6 rounded-3xl border-2 border-[#303841]/30 text-center space-y-3 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#303841]">Siaran Virtual</span>
                  <h3 className="text-xl font-serif font-bold text-[#303841]">Live Streaming</h3>
                  <div className="flex flex-col gap-2 pt-1">
                    {live_youtube_url && (
                      <a href={live_youtube_url} target="_blank" rel="noreferrer" className="w-full py-2.5 bg-red-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-red-700 transition">
                        <ExternalLink className="w-4 h-4 flex-shrink-0" /> <span>YouTube Live</span>
                      </a>
                    )}
                    {live_zoom_url && (
                      <a href={live_zoom_url} target="_blank" rel="noreferrer" className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition">
                        <ExternalLink className="w-4 h-4 flex-shrink-0" /> <span>Zoom Meeting</span>
                      </a>
                    )}
                    {live_meet_url && (
                      <a href={live_meet_url} target="_blank" rel="noreferrer" className="w-full py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition">
                        <ExternalLink className="w-4 h-4 flex-shrink-0" /> <span>Google Meet</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.section>
            )}

            {/* 12. DRESS CODE GUIDE (OPTIONAL) */}
            {(dresscode_desc || (dresscode_warna && dresscode_warna.length > 0)) && (
              <motion.section 
                id="section-dresscode"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                className="px-5 py-6"
              >
                <div className="bg-[#FFFFFF] p-6 rounded-3xl border-2 border-[#303841]/30 text-center space-y-3 shadow-sm">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#303841]">Panduan Busana</span>
                  <h3 className="text-xl font-serif font-bold text-[#303841]">Dress Code Tamu</h3>
                  {dresscode_desc && <p className="text-xs text-stone-700 leading-relaxed">{dresscode_desc}</p>}
                  {dresscode_warna && dresscode_warna.length > 0 && (
                    <div className="flex items-center justify-center gap-3 pt-1">
                      {dresscode_warna.map((color, idx) => (
                        <div key={idx} className="w-7 h-7 rounded-full border-2 border-[#303841]/40 shadow-sm" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  )}
                </div>
              </motion.section>
            )}

            {/* 13. WEDDING GIFT / AMPLOP DIGITAL (OPTIONAL) */}
            {((defaultRekeningPria && defaultRekeningPria.length > 0) || (defaultRekeningWanita && defaultRekeningWanita.length > 0)) && (
              <motion.section 
                id="section-gift"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className="px-5 py-8 space-y-6"
              >
                <div className="text-center space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#303841]">Tanda Kasih</span>
                  <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#303841]">Amplop Digital</h2>
                  <p className="text-xs text-stone-600 max-w-xs mx-auto">Doa restu Anda merupakan karunia yang paling berharga bagi kami. Bagi yang ingin memberikan tanda kasih:</p>
                </div>

                <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                  {/* Rekening Pria */}
                  {defaultRekeningPria.map((item, idx) => (
                    <motion.div key={`pria-${idx}`} variants={fadeInUp} className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#303841]/30 text-center space-y-2 shadow-sm">
                      <span className="text-[10px] uppercase font-bold text-[#76ABAE] tracking-wider block">Rekening Mempelai Pria</span>
                      <p className="text-lg font-bold text-[#303841] font-serif">{item.bank}</p>
                      <p className="text-xl font-mono font-bold text-[#303841] tracking-wider my-1">{item.nomor}</p>
                      {item.atas_nama && <p className="text-xs text-stone-600 font-medium">a.n. {item.atas_nama}</p>}
                      {item.nomor && (
                        <button 
                          onClick={() => handleCopyRekening(item.nomor, `pria-${idx}`)}
                          className="w-full py-3 px-4 bg-[#303841] text-[#F5F5F5] font-bold text-xs rounded-2xl flex items-center justify-center gap-2 hover:bg-[#222831] transition uppercase tracking-wider shadow-sm cursor-pointer"
                        >
                          {copiedIndex === `pria-${idx}` ? (
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                          ) : (
                            <Copy className="w-4 h-4 flex-shrink-0" />
                          )}
                          <span>{copiedIndex === `pria-${idx}` ? "Tersalin!" : "Salin No. Rekening"}</span>
                        </button>
                      )}
                    </motion.div>
                  ))}

                  {/* Rekening Wanita */}
                  {defaultRekeningWanita.map((item, idx) => (
                    <motion.div key={`wanita-${idx}`} variants={fadeInUp} className="bg-[#FFFFFF] p-6 rounded-3xl border border-[#303841]/30 text-center space-y-2 shadow-sm">
                      <span className="text-[10px] uppercase font-bold text-[#76ABAE] tracking-wider block">Rekening Mempelai Wanita</span>
                      <p className="text-lg font-bold text-[#303841] font-serif">{item.bank}</p>
                      <p className="text-xl font-mono font-bold text-[#303841] tracking-wider my-1">{item.nomor}</p>
                      {item.atas_nama && <p className="text-xs text-stone-600 font-medium">a.n. {item.atas_nama}</p>}
                      {item.nomor && (
                        <button 
                          onClick={() => handleCopyRekening(item.nomor, `wanita-${idx}`)}
                          className="w-full py-3 px-4 bg-[#303841] text-[#F5F5F5] font-bold text-xs rounded-xl flex items-center justify-center gap-2 hover:bg-[#222831] transition uppercase tracking-wider shadow-sm cursor-pointer"
                        >
                          {copiedIndex === `wanita-${idx}` ? (
                            <CheckCircle className="w-4 h-4 flex-shrink-0" />
                          ) : (
                            <Copy className="w-4 h-4 flex-shrink-0" />
                          )}
                          <span>{copiedIndex === `wanita-${idx}` ? "Tersalin!" : "Salin No. Rekening"}</span>
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            )}

            {/* 10. RSVP & GUESTBOOK SECTION */}
            <motion.section 
              id="section-rsvp"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeInUp}
              className="px-5 py-8 space-y-6"
            >
              <div className="text-center space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#303841]">Konfirmasi & Ucapan</span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#303841]">RSVP & Buku Tamu</h2>
              </div>

              <div className="bg-[#FFFFFF] p-6 rounded-3xl border-2 border-[#303841]/40 space-y-5 shadow-md">
                {rsvpSubmitted ? (
                  <div className="text-center py-6 space-y-2">
                    <CheckCircle className="w-12 h-12 text-[#303841] mx-auto" />
                    <h4 className="text-lg font-bold text-[#303841] font-serif">Terima Kasih!</h4>
                    <p className="text-xs text-stone-700">Konfirmasi kehadiran & ucapan Anda telah tersimpan.</p>
                  </div>
                ) : (
                  <form onSubmit={handleRsvpSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="rsvp_nama" className="block text-xs font-bold text-[#303841] mb-1.5 flex items-center gap-1.5 cursor-pointer">
                        <UserCheck className="w-3.5 h-3.5 text-[#303841]" /> <span>Nama Lengkap</span>
                      </label>
                      <input 
                        id="rsvp_nama"
                        type="text" 
                        value={rsvpForm.nama}
                        onChange={(e) => setRsvpForm(prev => ({ ...prev, nama: e.target.value }))}
                        required 
                        placeholder="Masukkan nama lengkap Anda..."
                        className="w-full px-4 py-3 bg-[#F5F5F5] rounded-2xl border-2 border-[#303841]/30 text-xs text-[#303841] font-medium focus:outline-none focus:border-[#303841] focus:ring-2 focus:ring-[#303841]/20 transition placeholder:text-stone-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#303841] mb-1.5">Konfirmasi Kehadiran</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setRsvpForm(prev => ({ ...prev, kehadiran: 'hadir' }))}
                          className={`py-3 px-4 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                            rsvpForm.kehadiran === 'hadir'
                              ? 'bg-[#303841] text-white border-[#303841] shadow-md'
                              : 'bg-[#F5F5F5] text-stone-700 border-[#303841]/30 hover:border-[#303841]/60'
                          }`}
                        >
                          <CheckCircle className="w-4 h-4 flex-shrink-0" />
                          <span>Saya Hadir</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => setRsvpForm(prev => ({ ...prev, kehadiran: 'tidak_hadir' }))}
                          className={`py-3 px-4 rounded-2xl border-2 font-bold text-xs flex items-center justify-center gap-2 transition cursor-pointer ${
                            rsvpForm.kehadiran === 'tidak_hadir'
                              ? 'bg-[#303841] text-white border-[#303841] shadow-md'
                              : 'bg-[#F5F5F5] text-stone-700 border-[#303841]/30 hover:border-[#303841]/60'
                          }`}
                        >
                          <span>Maaf, Tidak Hadir</span>
                        </button>
                      </div>
                    </div>

                    {rsvpForm.kehadiran === 'hadir' && (
                      <div>
                        <label className="block text-xs font-bold text-[#303841] mb-1.5 flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-[#303841]" /> <span>Jumlah Tamu Yang Hadir</span>
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {['1', '2', '3'].map((count) => (
                            <button
                              key={count}
                              type="button"
                              onClick={() => setRsvpForm(prev => ({ ...prev, jumlah_tamu: count }))}
                              className={`py-2.5 px-3 rounded-xl border-2 font-bold text-xs transition cursor-pointer text-center ${
                                rsvpForm.jumlah_tamu === count
                                  ? 'bg-[#303841] text-white border-[#303841] shadow-sm'
                                  : 'bg-[#F5F5F5] text-[#303841] border-[#303841]/20 hover:border-[#303841]/50'
                              }`}
                            >
                              {count} Orang
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <label htmlFor="rsvp_pesan" className="block text-xs font-bold text-[#303841] mb-1.5 flex items-center gap-1.5 cursor-pointer">
                        <MessageSquare className="w-3.5 h-3.5 text-[#303841]" /> <span>Ucapan & Doa Restu</span>
                      </label>
                      <textarea 
                        id="rsvp_pesan"
                        rows={3}
                        value={rsvpForm.pesan}
                        onChange={(e) => setRsvpForm(prev => ({ ...prev, pesan: e.target.value }))}
                        required 
                        placeholder="Tuliskan pesan, ucapan selamat & doa untuk kedua mempelai..."
                        className="w-full px-4 py-3 bg-[#F5F5F5] rounded-2xl border-2 border-[#303841]/30 text-xs text-[#303841] font-medium focus:outline-none focus:border-[#303841] focus:ring-2 focus:ring-[#303841]/20 transition placeholder:text-stone-500 resize-none"
                      />
                    </div>

                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full py-3.5 bg-[#303841] hover:bg-[#222831] active:bg-[#1A2027] text-white text-xs font-bold rounded-2xl flex items-center justify-center gap-2 transition uppercase tracking-wider shadow-lg transform active:scale-95 cursor-pointer"
                    >
                      <Send className="w-4 h-4 flex-shrink-0" /> <span>{isSubmitting ? "Mengirim..." : "Kirim RSVP & Ucapan"}</span>
                    </button>
                  </form>
                )}

                {allWishes && allWishes.length > 0 && (
                  <div className="border-t-2 border-dashed border-[#303841]/20 pt-5 space-y-3">
                    <h4 className="text-xs font-bold text-[#303841] font-serif uppercase tracking-wider text-center flex items-center justify-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-[#303841] fill-current" />
                      <span>Ucapan Dari Sahabat & Kerabat</span>
                    </h4>
                    <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                      {allWishes.map((item, idx) => (
                        <div key={idx} className="bg-[#F5F5F5] p-3.5 rounded-2xl border border-[#303841]/20 text-xs space-y-1 shadow-sm">
                          <p className="font-bold text-[#303841]">{item.nama}</p>
                          <p className="text-stone-700 leading-relaxed italic">"{item.pesan}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.section>

            {/* 14. CLOSING GRATITUDE (OPTIONAL) */}
            {ucapan_terima_kasih && ucapan_terima_kasih.trim() !== '' && (
              <motion.section 
                id="section-closing"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                className="py-14 px-6 text-center space-y-4 bg-[#F5F5F5] border-t-2 border-[#303841]/30"
              >
                <p className="text-xs text-stone-700 leading-relaxed max-w-xs mx-auto italic">
                  "{ucapan_terima_kasih}"
                </p>
                <div className="pt-3">
                  <span className="text-xs uppercase tracking-widest text-[#76ABAE] font-bold block mb-1">Salam Hangat Dari Kami</span>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-[#FF5722]">
                    {nama_panggilan_pria || "Pria"} & {nama_panggilan_wanita || "Wanita"}
                  </h3>
                </div>
              </motion.section>
            )}

          </div>
          )}

        </div>

    </div>
  );
}
