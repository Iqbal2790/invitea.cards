"use client";

import React, { useState, useEffect, useRef } from "react";
import HTMLFlipBook from "react-pageflip";
import { 
  TbMail, TbHeartFilled, TbCalendar, 
  TbFeather, TbGift, TbLock, TbLockOpen, TbPhoto, 
  TbBookmark, TbSparkles
} from "react-icons/tb";
import { 
  GiScrollUnfurled, GiRibbonMedal, GiSpellBook,
  GiMouse, GiCow, GiTigerHead, GiRabbit, GiDragonHead, GiSnake, 
  GiHorseHead, GiGoat, GiMonkey, GiRooster, GiWolfHead, GiPig 
} from "react-icons/gi";

// Map Icon Zodiac & Shio Persis Sama Dengan Kisahtanggalku
import { 
  TbZodiacAries, TbZodiacTaurus, TbZodiacGemini, TbZodiacCancer, 
  TbZodiacLeo, TbZodiacVirgo, TbZodiacLibra, TbZodiacScorpio, 
  TbZodiacSagittarius, TbZodiacCapricorn, TbZodiacAquarius, TbZodiacPisces 
} from "react-icons/tb";

const zodiacIconsMap = {
  "Aries": TbZodiacAries, "Taurus": TbZodiacTaurus, "Gemini": TbZodiacGemini,
  "Cancer": TbZodiacCancer, "Leo": TbZodiacLeo, "Virgo": TbZodiacVirgo,
  "Libra": TbZodiacLibra, "Scorpio": TbZodiacScorpio, "Sagittarius": TbZodiacSagittarius,
  "Capricorn": TbZodiacCapricorn, "Aquarius": TbZodiacAquarius, "Pisces": TbZodiacPisces
};

const shioIconsMap = {
  "Tikus": GiMouse, "Kerbau": GiCow, "Macan": GiTigerHead, "Kelinci": GiRabbit,
  "Naga": GiDragonHead, "Ular": GiSnake, "Kuda": GiHorseHead, "Kambing": GiGoat,
  "Monyet": GiMonkey, "Ayam": GiRooster, "Anjing": GiWolfHead, "Babi": GiPig
};

function getZodiacIcon(text) {
  for (const name of Object.keys(zodiacIconsMap)) {
    if (text?.toLowerCase().includes(name.toLowerCase())) {
      return zodiacIconsMap[name];
    }
  }
  return TbZodiacLibra;
}

function getShioIcon(text) {
  for (const name of Object.keys(shioIconsMap)) {
    if (text?.toLowerCase().includes(name.toLowerCase())) {
      return shioIconsMap[name];
    }
  }
  return GiDragonHead;
}

// Safely extract YouTube ID from any YouTube URL format (watch?v=, youtu.be/, embed/)
function getYouTubeId(url) {
  if (!url) return null;
  try {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = String(url).trim().match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  } catch (e) {
    return null;
  }
}

// Dedicated Secret Note Box Component with local state & event isolation
function SecretNoteBox({ catatanRahasia, namaPengirim }) {
  const [unlocked, setUnlocked] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (e.nativeEvent) {
      e.nativeEvent.stopImmediatePropagation();
    }
    setUnlocked(prev => !prev);
  };

  return (
    <div 
      onClick={handleToggle}
      onMouseDown={(e) => e.stopPropagation()}
      onTouchStart={(e) => e.stopPropagation()}
      className={`p-4 rounded-xl border-2 transition-all cursor-pointer relative z-50 pointer-events-auto select-none ${
        unlocked 
          ? "bg-[#ebdcb9] border-[#633a17] shadow-md" 
          : "bg-[#2c1d11]/5 border-dashed border-[#2c1d11]/30 hover:bg-[#2c1d11]/10"
      }`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold text-[#2c1d11] uppercase tracking-wider flex items-center gap-1.5">
          {unlocked ? <TbLockOpen className="w-4 h-4 text-amber-800" /> : <TbLock className="w-4 h-4 text-[#633a17]" />}
          Catatan Rahasia
        </span>
        <span className="text-[10px] font-bold text-[#2c1d11] bg-[#e6d3a8] px-2.5 py-0.5 rounded-full border border-[#2c1d11]/20">
          {unlocked ? "Terbuka" : "Klik Untuk Membuka"}
        </span>
      </div>

      {unlocked ? (
        <p className="font-serif italic text-[13px] text-[#2c1d11] leading-relaxed font-semibold">
          "{catatanRahasia}"
        </p>
      ) : (
        <p className="text-[12px] text-[#633a17] italic font-medium">
          Tekan di sini untuk membuka ucapan rahasia dari {namaPengirim}...
        </p>
      )}
    </div>
  );
}

// Individual Page Component with ForwardRef & backfaceVisibility: hidden
const Page = React.forwardRef((props, ref) => {
  return (
    <div 
      ref={ref} 
      className="w-full h-full p-6 pl-8 flex flex-col justify-between overflow-hidden shadow-md select-none relative bg-[#fcf8ee]"
      style={{ 
        backgroundColor: "#fcf8ee", 
        color: "#2c1d11",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden"
      }}
    >
      {/* Solid Paper Backing */}
      <div className="absolute inset-0 bg-[#fcf8ee] pointer-events-none -z-10" />

      {/* Subtle Spine Crease Shadow */}
      <div className="absolute left-0 top-0 bottom-0 w-4 bg-gradient-to-r from-amber-950/15 to-transparent border-r border-amber-950/10 z-2 pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col justify-between h-full text-[#2c1d11]">
        {props.children}
      </div>
    </div>
  );
});

Page.displayName = "Page";

export default function KisahtanggalkuTemplate({ data, isPreview = false }) {
  const bookRef = useRef(null);
  const audioRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const totalPages = 6;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Fallback / Dummy Data
  const namaPenerima = data?.nama_penerima || "Nisa Maharani";
  const namaPengirim = data?.nama_pengirim || "Kevin Pratama";
  const tanggalLahir = data?.tanggal_lahir || "2000-09-27";
  const zodiakNama = data?.zodiak_nama || "Libra — Karismatik & Penuh Kasih";
  const shioNama = data?.shio_nama || "Naga (Elemen Logam)";
  const sejarahSingkat = data?.sejarah_singkat || "Di hari yang istimewa ini, bumi menyambut hadirnya sosok paling berharga yang selalu membawa kehangatan bagi orang-orang di sekitarnya.";
  const pesanUtama = data?.pesan_utama || "Selamat ulang tahun untuk sosok terbaik dalam hidupku. Terima kasih sudah selalu menjadi alasan di balik senyumku, tempat pulang yang paling tenang, dan teman berbagi setiap kisah. Semoga tahun ini membawa sejuta kebahagiaan untukmu.";
  const catatanRahasia = data?.catatan_rahasia || "Aku sudah menyiapkan kejutan spesial untukmu hari ini. Sampai bertemu nanti malam ya! ❤️";
  const musikUrl = data?.musik_url || "https://www.youtube.com/watch?v=rtOvBOTyX00";
  const fotoUrls = Array.isArray(data?.foto_urls) && data.foto_urls.length > 0 
    ? data.foto_urls 
    : [
        "/foto-dummy-ucapan/Anh%20(1).jpg",
        "/foto-dummy-ucapan/Anh%20(2).jpg",
        "/foto-dummy-ucapan/Anh%20(3).jpg"
      ];

  const ZodiacIcon = getZodiacIcon(zodiakNama);
  const ShioIcon = getShioIcon(shioNama);
  const youtubeId = getYouTubeId(musikUrl);

  const toggleMusic = () => {
    if (youtubeId) {
      setIsPlayingMusic(prev => !prev);
    } else if (audioRef.current) {
      if (isPlayingMusic) {
        audioRef.current.pause();
        setIsPlayingMusic(false);
      } else {
        audioRef.current.volume = 0.5;
        audioRef.current.play().catch(err => console.log("Audio play error:", err));
        setIsPlayingMusic(true);
      }
    }
  };

  const startMusicAndFlip = () => {
    if (youtubeId) {
      setIsPlayingMusic(true);
    } else if (audioRef.current && !isPlayingMusic) {
      audioRef.current.volume = 0.5;
      audioRef.current.play().then(() => setIsPlayingMusic(true)).catch(() => {});
    }
    handleFlipNext();
  };

  const handleFlipPrev = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  const handleFlipNext = () => {
    if (bookRef.current) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const onPageChange = (e) => {
    setCurrentPage(e.data);
  };

  return (
    <div className="w-full h-full min-h-[600px] flex flex-col justify-between items-center relative overflow-hidden p-4 select-none font-sans"
      style={{ backgroundColor: "#1c1917" }} // Stone 900
    >
      {/* YouTube Music Embed (If YouTube Link Provided) */}
      {youtubeId && isPlayingMusic && (
        <iframe
          width="1"
          height="1"
          src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&loop=1&playlist=${youtubeId}&enablejsapi=1`}
          title="Background Music YouTube"
          allow="autoplay"
          className="hidden absolute -top-9999px -left-9999px opacity-0 pointer-events-none"
        />
      )}

      {/* HTML5 Direct Audio Player (If Direct MP3 Link Provided) */}
      {!youtubeId && (
        <audio ref={audioRef} src={musikUrl} loop />
      )}

      {/* Floating Music Controller Button */}
      <button
        onClick={toggleMusic}
        aria-label="Toggle Musik Background"
        className="absolute top-4 right-4 z-50 p-2.5 rounded-full bg-[#fcf8ee]/90 text-[#2c1d11] shadow-lg border border-[#2c1d11]/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
      >
        <TbSparkles className={`w-4 h-4 ${isPlayingMusic ? "animate-spin text-amber-700" : "text-[#2c1d11]"}`} />
        <span className="text-[11px] font-bold uppercase tracking-wider pr-1">
          {isPlayingMusic ? "Musik On" : "Musik Off"}
        </span>
      </button>

      {/* Inject CSS for solid backface-visibility */}
      <style jsx global>{`
        .stf__item {
          background-color: #fcf8ee !important;
          backface-visibility: hidden !important;
          -webkit-backface-visibility: hidden !important;
        }
        .stf__wrapper {
          background-color: transparent !important;
        }
      `}</style>

      {/* Background Subtle Gradient & Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/30 via-stone-900 to-black pointer-events-none" />

      {/* Main Real HTML5 Flip Book Container */}
      <div className="w-full max-w-[420px] flex-1 flex flex-col justify-center items-center my-auto relative z-10">
        
        {isMounted ? (
          <div className="w-full aspect-[4/5] min-h-[520px] rounded-2xl overflow-hidden shadow-2xl relative flex justify-center items-center bg-[#fcf8ee]">
            
            {/* Narrow Invisible Left Tap Zone (Pinggir Paling Kiri Card) */}
            {currentPage > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlipPrev();
                }}
                aria-label="Halaman Sebelumnya"
                className="absolute left-0 top-0 bottom-0 w-10 z-30 cursor-pointer bg-transparent outline-none border-none"
              />
            )}

            {/* Narrow Invisible Right Tap Zone (Pinggir Paling Kanan Card) */}
            {currentPage < totalPages - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlipNext();
                }}
                aria-label="Halaman Selanjutnya"
                className="absolute right-0 top-0 bottom-0 w-10 z-30 cursor-pointer bg-transparent outline-none border-none"
              />
            )}

            {/* @ts-ignore */}
            <HTMLFlipBook
              width={360}
              height={500}
              size="stretch"
              minWidth={300}
              maxWidth={420}
              minHeight={450}
              maxHeight={600}
              maxShadowOpacity={0.3}
              showCover={true}
              usePortrait={true}
              flippingTime={900}
              useMouseEvents={false}
              clickEventForward={false}
              swipeDistance={30}
              mobileScrollSupport={true}
              onFlip={onPageChange}
              ref={bookRef}
              className="w-full h-full"
            >
              {/* PAGE 1: COVER / ENVELOPE */}
              <Page number={1}>
                <div className="w-full flex justify-between items-center border-b border-[#2c1d11]/20 pb-3">
                  <span className="font-serif text-[10px] tracking-[0.25em] text-[#2c1d11] uppercase font-bold flex items-center gap-1.5">
                    <GiSpellBook className="w-4 h-4 text-[#633a17]" /> Vintage Chronicle
                  </span>
                  <span className="font-serif text-[10px] tracking-[0.2em] text-[#633a17] uppercase font-semibold">
                    Edisi Spesial
                  </span>
                </div>

                <div className="my-auto space-y-4 text-center py-4">
                  <div className="w-20 h-20 mx-auto rounded-full border-2 border-dashed border-[#2c1d11]/30 flex items-center justify-center p-2 relative rotate-6 shadow-sm bg-[#f4ebd7]">
                    <TbMail className="w-9 h-9 text-[#633a17]" />
                    <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[#633a17] text-[#fcf8ee] text-[9px] flex items-center justify-center font-bold shadow">
                      <TbHeartFilled className="w-3.5 h-3.5 text-[#fcf8ee]" />
                    </div>
                  </div>

                  <div>
                    <span className="text-[12px] uppercase tracking-widest text-[#633a17] font-semibold block mb-1">
                      Lembaran Jurnal Untuk
                    </span>
                    <h1 className="font-serif italic text-4xl text-[#2c1d11] font-bold leading-tight">
                      {namaPenerima}
                    </h1>
                  </div>

                  <p className="text-[13px] text-[#4a3b2c] italic font-serif max-w-[260px] mx-auto leading-relaxed">
                    "Diabadikan khusus oleh seseorang yang paling mengasihimu."
                  </p>
                </div>

                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    startMusicAndFlip();
                  }}
                  className="w-full py-3.5 px-6 rounded-full bg-[#2c1d11] text-[#fcf8ee] font-semibold text-xs tracking-wider uppercase shadow-md flex items-center justify-center gap-2 cursor-pointer relative z-40"
                >
                  Tap Di Sini Untuk Membuka
                </div>
              </Page>

              {/* PAGE 2: HISTORICAL BIRTHDATE ARCHIVE */}
              <Page number={2}>
                <div className="border-b border-[#2c1d11]/20 pb-2 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#2c1d11] uppercase tracking-wider flex items-center gap-1.5">
                    <GiScrollUnfurled className="w-4 h-4 text-[#633a17]" /> Hal 2 — Arsip Kelahiran
                  </span>
                  <TbCalendar className="w-4 h-4 text-[#633a17]" />
                </div>

                <div className="my-auto space-y-4 py-2">
                  <div className="text-center">
                    <span className="text-[11px] uppercase tracking-widest text-[#633a17] font-bold block">Tanggal Bersejarah</span>
                    <h2 className="font-serif italic text-3xl text-[#2c1d11] font-bold my-1">
                      {tanggalLahir}
                    </h2>
                  </div>

                  {/* Zodiak & Shio Badges */}
                  <div className="grid grid-cols-2 gap-3 bg-[#f2e8d5] p-3 rounded-xl border border-[#2c1d11]/15 text-center">
                    <div className="border-r border-[#2c1d11]/15 pr-2 flex flex-col items-center">
                      <ZodiacIcon className="w-7 h-7 text-[#633a17] mb-1" />
                      <span className="text-[10px] uppercase font-bold text-[#2c1d11] block">Zodiak</span>
                      <p className="text-[11px] font-semibold text-[#2c1d11] mt-0.5">{zodiakNama}</p>
                    </div>
                    <div className="pl-2 flex flex-col items-center">
                      <ShioIcon className="w-7 h-7 text-[#633a17] mb-1" />
                      <span className="text-[10px] uppercase font-bold text-[#2c1d11] block">Shio</span>
                      <p className="text-[11px] font-semibold text-[#2c1d11] mt-0.5">{shioNama}</p>
                    </div>
                  </div>

                  {/* Peristiwa Sejarah */}
                  <div className="bg-[#f2e8d5] p-3 rounded-lg border border-dashed border-[#2c1d11]/20">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-[#2c1d11] block mb-1 flex items-center gap-1">
                      <GiRibbonMedal className="w-4 h-4 text-[#633a17]" /> Catatan Peristiwa
                    </span>
                    <p className="text-[12px] text-[#2c1d11] italic leading-relaxed">
                      "{sejarahSingkat}"
                    </p>
                  </div>
                </div>

                <div className="text-right text-[11px] text-[#633a17] font-serif italic">
                  ~ Tersimpan hangat dalam kenangan ~
                </div>
              </Page>

              {/* PAGE 3: POLAROID PHOTO GALLERY */}
              <Page number={3}>
                <div className="border-b border-[#2c1d11]/20 pb-2 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#2c1d11] uppercase tracking-wider flex items-center gap-1.5">
                    <TbPhoto className="w-4 h-4 text-[#633a17]" /> Hal 3 — Galeri Polaroid
                  </span>
                  <TbSparkles className="w-4 h-4 text-[#633a17]" />
                </div>

                <div className="my-auto space-y-3 py-2">
                  <div className="grid grid-cols-2 gap-3">
                    {fotoUrls.slice(0, 2).map((url, i) => (
                      <div key={i} className="bg-white p-2 pb-5 rounded shadow-md border border-stone-300 transform rotate-[-2deg] hover:rotate-0 transition-transform">
                        <div className="aspect-square bg-stone-200 overflow-hidden rounded-sm mb-1">
                          <img src={url} alt={`Polaroid ${i+1}`} className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[9px] font-serif text-[#2c1d11] block text-center italic font-semibold">Momen Indah #{i+1}</span>
                      </div>
                    ))}
                  </div>

                  {fotoUrls.length > 2 && (
                    <div className="bg-white p-2 pb-4 rounded shadow-md border border-stone-300 w-3/4 mx-auto transform rotate-[3deg]">
                      <div className="aspect-[16/9] bg-stone-200 overflow-hidden rounded-sm mb-1">
                        <img src={fotoUrls[2]} alt="Polaroid 3" className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[9px] font-serif text-[#2c1d11] block text-center italic font-semibold">Kebersamaan Manis</span>
                    </div>
                  )}
                </div>

                <p className="text-center text-[11px] text-[#4a3b2c] italic font-serif">
                  Setiap momen bersamamu adalah bagian favoritku.
                </p>
              </Page>

              {/* PAGE 4: PERSONAL LETTER */}
              <Page number={4}>
                <div className="border-b border-[#2c1d11]/20 pb-2 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#2c1d11] uppercase tracking-wider flex items-center gap-1.5">
                    <TbFeather className="w-4 h-4 text-[#633a17]" /> Hal 4 — Surat Dari Hati
                  </span>
                  <TbHeartFilled className="w-4 h-4 text-red-700" />
                </div>

                <div className="my-auto py-2">
                  <div className="bg-[#f4ebd7] p-4 rounded-xl border border-[#2c1d11]/20 shadow-inner">
                    <p className="font-serif italic text-[14px] text-[#2c1d11] leading-relaxed whitespace-pre-line">
                      "{pesanUtama}"
                    </p>
                    <div className="mt-4 text-right">
                      <span className="text-[11px] text-[#633a17] font-semibold block uppercase">Dengan Sepenuh Cinta,</span>
                      <span className="font-serif italic text-lg font-bold text-[#2c1d11]">{namaPengirim}</span>
                    </div>
                  </div>
                </div>

                <div className="text-center text-[10px] text-[#633a17] uppercase tracking-widest font-bold">
                  Dibuat Khusus Untukmu
                </div>
              </Page>

              {/* PAGE 5: SECRET NOTE & WISHES */}
              <Page number={5}>
                <div className="border-b border-[#2c1d11]/20 pb-2 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-[#2c1d11] uppercase tracking-wider flex items-center gap-1.5">
                    <TbGift className="w-4 h-4 text-[#633a17]" /> Hal 5 — Secret Note & Doa
                  </span>
                  <TbSparkles className="w-4 h-4 text-[#633a17]" />
                </div>

                <div className="my-auto space-y-4 py-2">
                  {/* Secret Note Interactive Box Component (Fully Isolated State & Click Event) */}
                  <SecretNoteBox catatanRahasia={catatanRahasia} namaPengirim={namaPengirim} />

                  <div className="text-center pt-2">
                    <h4 className="font-serif italic text-2xl text-[#2c1d11] font-bold mb-1">
                      Selamat Ulang Tahun!
                    </h4>
                    <p className="text-[12px] text-[#4a3b2c] font-serif italic">
                      Semoga setiap harapan dan impianmu menjadi kenyataan.
                    </p>
                  </div>
                </div>

                <div className="text-center border-t border-[#2c1d11]/20 pt-2 text-[10px] text-[#633a17] font-bold uppercase tracking-wider">
                  Invitea Cards × Kisah Tanggalku
                </div>
              </Page>

              {/* PAGE 6: BACK COVER */}
              <Page number={6}>
                <div className="w-full flex justify-between items-center border-b border-[#2c1d11]/20 pb-3">
                  <span className="font-serif text-[10px] tracking-[0.25em] text-[#2c1d11] uppercase font-bold flex items-center gap-1.5">
                    <TbBookmark className="w-4 h-4 text-[#633a17]" /> Penutup Jurnal
                  </span>
                  <span className="font-serif text-[10px] tracking-[0.2em] text-[#633a17] uppercase font-semibold">
                    Akhir Lembaran
                  </span>
                </div>

                <div className="my-auto space-y-4 text-center py-6">
                  <div className="w-16 h-16 mx-auto rounded-full border border-dashed border-[#2c1d11]/30 flex items-center justify-center p-2 relative shadow-sm bg-[#f4ebd7]">
                    <TbSparkles className="w-8 h-8 text-[#633a17]" />
                  </div>

                  <div>
                    <h3 className="font-serif italic text-2xl text-[#2c1d11] font-bold leading-tight mb-2">
                      Terima Kasih
                    </h3>
                    <p className="text-[12px] text-[#4a3b2c] italic font-serif max-w-[240px] mx-auto leading-relaxed">
                      "Semoga kenangan ini selalu abadi di dalam hatimu."
                    </p>
                  </div>
                </div>

                <div className="text-center border-t border-[#2c1d11]/20 pt-3 text-[10px] text-[#633a17] font-bold uppercase tracking-widest">
                  Invitea Cards • Vintage Chronicle
                </div>
              </Page>
            </HTMLFlipBook>
          </div>
        ) : (
          <div className="w-full aspect-[4/5] min-h-[520px] rounded-2xl bg-[#fcf8ee] flex items-center justify-center text-[#2c1d11] font-serif italic">
            Memuat Jurnal...
          </div>
        )}
      </div>
    </div>
  );
}
