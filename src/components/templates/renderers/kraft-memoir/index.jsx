'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, VolumeX, MapPin, Calendar, Copy, Check, Send, Instagram, Play } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function KraftMemoirTemplate({ data = {}, isPreview = false, isBuilder = false }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const searchParams = useSearchParams();

  // Data mapping with robust fallbacks
  const guestName = searchParams?.get('to') || data?.nama_tamu || data?.guest_name || 'Dimas & Partner';

  const groomShort = data?.nama_panggilan_pria || data?.nama_pria || 'Rangga';
  const brideShort = data?.nama_panggilan_wanita || data?.nama_wanita || 'Salsabila';
  const groomFull = data?.nama_lengkap_pria || 'Rangga Pratama';
  const brideFull = data?.nama_lengkap_wanita || 'Salsabila Putri';
  
  const groomFather = data?.nama_ayah_pria || 'Bpk. Bambang Hermawan';
  const groomMother = data?.nama_ibu_pria || 'Ibu Sri Wahyuni';
  const brideFather = data?.nama_ayah_wanita || 'Bpk. Hendra Gunawan';
  const brideMother = data?.nama_ibu_wanita || 'Ibu Ratna Dewi';

  const groomIg = data?.instagram_pria || 'ranggapratama';
  const brideIg = data?.instagram_wanita || 'salsabilaputri';

  const weddingDateStr = data?.tanggal_acara || data?.acara1_tanggal || data?.acara_akad_tanggal || '2027-11-27';
  const targetCountdown = data?.countdown_target || '2027-11-27T08:00:00';

  // Photo URLs
  const coverPhoto = data?.foto_cover || data?.foto_urls?.[0] || '/templates/kraft-memoir/photos/loveisall.film_1784906406087.jpeg';
  const groomPhoto = data?.foto_pria || data?.foto_urls?.[1] || '/templates/kraft-memoir/photos/groom.jpg';
  const bridePhoto = data?.foto_wanita || data?.foto_urls?.[2] || '/templates/kraft-memoir/photos/bride.jpg';
  const galleryPhoto1 = data?.foto_urls?.[0] || coverPhoto;
  const galleryPhoto2 = data?.foto_urls?.[1] || groomPhoto;
  const galleryPhoto3 = data?.foto_urls?.[2] || bridePhoto;
  const galleryPhoto4 = data?.foto_urls?.[3] || '/templates/kraft-memoir/photos/cover.jpg';

  // Quotes
  const quoteText = data?.quote_text || data?.quote_teks || `Dan di antara tanda-tanda 
kekuasaan-Nya ialah Dia
menciptakan untukmu pasangan
hidup dari jenismu sendiri,
supaya kamu merasa tenteram
kepadanya, dan dijadikan-Nya di
antaramu rasa kasih dan sayang.`;
  const quoteSource = data?.quote_author || data?.quote_sumber || '— QS. Ar-Rum: 21';

  // Love Story
  const loveStoryList = data?.love_story || [
    {
      tanggal: '2021',
      judul: 'First Met',
      deskripsi: 'Pertama kali kami saling menyapa dan bertukar cerita di sebuah kedai kopi kecil di Bandung. Percakapan sederhana yang perlahan menjadi awal rasa nyaman.'
    },
    {
      tanggal: '2023',
      judul: 'In A Relationship',
      deskripsi: 'Setelah melewati banyak hari bersama dan saling memahami, kami memutuskan untuk melangkah bersama mengikat komitmen cinta.'
    },
    {
      tanggal: '2027',
      judul: 'The Proposal',
      deskripsi: 'Di bawah langit sore yang hangat, sebuah cincin tersemat dan jawaban "Yes, I will" menjadi awal janji suci kami menuju pelaminan.'
    }
  ];

  // Events Data
  const akadTitle = data?.acara_akad_nama || 'Akad Nikah';
  const akadDate = data?.acara_akad_tanggal_format || 'Sabtu, 27 November 2027';
  const akadTime = data?.acara_akad_jam || '08.00 - 10.00 WIB';
  const akadVenue = data?.acara_akad_lokasi || 'Masjid Raya Al-Jabbar';
  const akadAddress = data?.acara_akad_alamat || 'Jl. Cimincrang No.14, Gedebage, Kec. Gedebage, Kota Bandung, Jawa Barat 40294';
  const akadMapsUrl = data?.acara_akad_maps_url || 'https://maps.google.com/?q=Masjid+Raya+Al+Jabbar+Bandung';
  const akadEmbedUrl = data?.acara_akad_embed_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5587783935293!2d107.70119857587635!3d-6.943208567963384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c3143c7b2cc3%3A0x6b18544a42b101c5!2sMasjid%20Raya%20Al-Jabbar!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid';

  const resepsiTitle = data?.acara_resepsi_nama || 'Resepsi';
  const resepsiDate = data?.acara_resepsi_tanggal_format || 'Sabtu, 27 November 2027';
  const resepsiTime = data?.acara_resepsi_jam || '11.00 - 14.00 WIB';
  const resepsiVenue = data?.acara_resepsi_lokasi || 'Grand Ballroom Al-Jabbar';
  const resepsiAddress = data?.acara_resepsi_alamat || 'Jl. Cimincrang No.14, Gedebage, Kec. Gedebage, Kota Bandung, Jawa Barat 40294';
  const resepsiMapsUrl = data?.acara_resepsi_maps_url || 'https://maps.google.com/?q=Masjid+Raya+Al+Jabbar+Bandung';
  const resepsiEmbedUrl = data?.acara_resepsi_embed_url || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.5587783935293!2d107.70119857587635!3d-6.943208567963384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68c3143c7b2cc3%3A0x6b18544a42b101c5!2sMasjid%20Raya%20Al-Jabbar!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid';

  // Dresscode
  const dresscodeSwatches = data?.dresscode_warna || [
    { name: 'Terra', hex: '#8B4513' },
    { name: 'Olive', hex: '#6B705C' },
    { name: 'Beige', hex: '#DDBEA9' },
    { name: 'Kraft', hex: '#CFA86C' }
  ];
  const dresscodeBadge = data?.dresscode_badge || 'Batik / Formal / Earth Tone Attire';
  const dresscodeNote = data?.dresscode_desc || '"Your presence with our color palette will make our day even more memorable."';

  // Live Stream
  const streamEventTitle = data?.live_stream_title || 'Akad Nikah Virtual';
  const streamTime = data?.live_stream_time || 'Sabtu, 27 November 2027 • 08.00 WIB';
  const streamYoutubeUrl = data?.live_youtube_url || data?.youtube_url || 'https://youtube.com';
  const streamIgUrl = data?.live_instagram_url || `https://instagram.com/${brideIg}`;

  // Digital Envelope / Gifts
  const bankAccounts = data?.bank_accounts || [
    {
      bank: 'BANK BCA',
      number: '1234 5678 90',
      cleanNumber: '1234567890',
      name: `a.n ${groomFull}`
    },
    {
      bank: 'BANK MANDIRI',
      number: '9876 5432 1098',
      cleanNumber: '987654321098',
      name: `a.n ${brideFull}`
    }
  ];
  const giftAddress = data?.alamat_kado || 'Jl. Cimincrang No. 14, Gedebage, Kota Bandung, Jawa Barat 40294 (Up: Rangga & Salsa)';

  // Closing
  const closingQuote = data?.ucapan_penutup || `Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu kepada kami.\n\nAtas kehadiran dan doa restu yang diberikan, kami ucapkan terima kasih yang sebesar-besarnya.`;

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const target = new Date(targetCountdown).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        setTimeLeft({
          days: String(days).padStart(2, '0'),
          hours: String(hours).padStart(2, '0'),
          minutes: String(minutes).padStart(2, '0'),
          seconds: String(seconds).padStart(2, '0')
        });
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [targetCountdown]);

  // RSVP & Wishes State
  const [wishesList, setWishesList] = useState(data?.wishes || [
    {
      name: 'Dimas Setiawan',
      status: 'hadir',
      message: 'Selamat Rangga dan Salsabila! Semoga lancar sampai hari H dan senantiasa menjadi keluarga yang sakinah, mawaddah, warrahmah. Aamiin!',
      time: 'Baru saja'
    },
    {
      name: 'Annisa Larasati',
      status: 'hadir',
      message: 'Happy wedding Salsa & Rangga! Cant wait to celebrate your special day! Langgeng terus sampai kakek nenek yaaa.',
      time: '2 jam yang lalu'
    },
    {
      name: 'Rizky Maulana',
      status: 'tidak',
      message: 'Barakallahu lakum wa baraka alaikum. Mohon maaf belum bisa hadir langsung di Bandung, doa terbaik dari jauh untuk kalian berdua!',
      time: '5 jam yang lalu'
    }
  ]);

  const [rsvpForm, setRsvpForm] = useState({ name: '', status: 'hadir', guests: '1', message: '' });
  const [copyFeedback, setCopyFeedback] = useState({});

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyFeedback(prev => ({ ...prev, [key]: true }));
      setTimeout(() => {
        setCopyFeedback(prev => ({ ...prev, [key]: false }));
      }, 2000);
    });
  };

  const handleRSVPSubmit = (e) => {
    e.preventDefault();
    if (!rsvpForm.name.trim() || !rsvpForm.message.trim()) return;

    const newWish = {
      name: rsvpForm.name,
      status: rsvpForm.status,
      message: rsvpForm.message,
      time: 'Baru saja'
    };

    setWishesList([newWish, ...wishesList]);
    setRsvpForm({ name: '', status: 'hadir', guests: '1', message: '' });
    alert('Terima kasih! Konfirmasi kehadiran dan ucapan Anda telah berhasil dikirim.');
  };

  const handleOpenInvitation = () => {
    setIsOpened(true);
    setIsPlaying(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-[#1a1817] flex justify-center items-center font-['Intel_One_Mono',monospace]">
      
      {/* Audio element */}
      {data?.musik_url && (
        <audio ref={audioRef} src={data.musik_url} loop preload="auto" />
      )}

      {/* Embedded Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Intel+One+Mono:wght@400;700&family=Lacquer&display=swap" rel="stylesheet" />

      {/* Main Viewport Container */}
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#453B37] shadow-2xl overflow-x-hidden flex flex-col">
        
        {/* ========================================================
            1. COVER SCREEN (SLIDE OVERLAY)
            ======================================================== */}
        <AnimatePresence>
          {!isOpened && (
            <motion.div
              key="cover-layer"
              initial={{ y: 0, opacity: 1 }}
              exit={{ y: '-100%', opacity: 0, transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] } }}
              className="absolute inset-0 z-50 w-full min-h-screen bg-[#453B37] flex flex-col justify-between overflow-hidden"
            >
              {/* Paper Background */}
              <img 
                src="/templates/kraft-memoir/Cover/kerta.svg" 
                alt="Paper Background" 
                className="w-full h-[55%] object-cover object-top block" 
              />

              {/* Headline (Lacquer) */}
              <div 
                className="absolute top-[calc(15.5%-10px)] left-[calc(5%-4px)] w-[50%] font-['Lacquer',cursive] text-[46px] leading-[1.05] text-[#461616] text-center -rotate-3 select-none z-10"
              >
                we’re<br />getting<br />married
              </div>

              {/* Top Polaroid Group */}
              <div 
                className="absolute top-[calc(16.5%-10px)] right-[7.5%] w-[46.5%] aspect-square rotate-[6.23deg] flex justify-center items-center drop-shadow-[4px_3px_8px_rgba(0,0,0,0.3)] z-8"
              >
                <img src="/templates/kraft-memoir/Cover/polaroid.svg" alt="Frame" className="absolute inset-0 w-full h-full pointer-events-none z-1" />
                <img src={coverPhoto} alt="Cover Moment" className="relative w-[88%] aspect-square object-cover block z-2 rounded-[1px]" />
              </div>

              {/* Top Kraft Tape */}
              <div 
                className="absolute top-[calc(15%-10px)] right-[20%] w-[21%] aspect-[247/82] bg-[rgba(207,168,108,0.85)] shadow-[3px_4px_5.4px_rgba(0,0,0,0.25)] rotate-4 z-12"
              />

              {/* Save The Date Text */}
              <div 
                className="absolute top-[calc(38%+10px)] left-[calc(7%+3px)] max-w-[46%] font-['Caveat',cursive] text-[18px] font-bold leading-[1.25] text-[#461616] -rotate-2 z-10"
              >
                save the date for {groomShort} & {brideShort}’s wedding day
              </div>

              {/* Guest Box */}
              <div 
                className="absolute top-[calc(37.5%+33px)] right-[7%] w-[42%] text-right rotate-2 z-10"
              >
                <span className="font-['Intel_One_Mono',monospace] text-[9.5px] uppercase tracking-[0.12em] text-[#461616] opacity-85 block">
                  Special Guest
                </span>
                <span className="font-['Caveat',cursive] text-[20px] font-bold text-[#461616] leading-[1.15] mt-[1px] block">
                  {guestName}
                </span>
              </div>

              {/* Washi Tape Date Banner */}
              <div 
                className="absolute top-[calc(44.5%+12px)] left-[9%] w-[46%] -rotate-2 z-15 flex items-center justify-center"
              >
                <img src="/templates/kraft-memoir/Cover/tape 1.svg" alt="Tape Date" className="w-full h-auto block" />
                <span className="absolute font-['Intel_One_Mono',monospace] font-bold text-[18px] text-[#461616] tracking-[0.05em] text-center pointer-events-none">
                  {weddingDateStr}
                </span>
              </div>

              {/* Groom Polaroid */}
              <div 
                className="absolute top-[calc(56.5%+5px)] left-[7%] w-[44%] aspect-square -rotate-[7.64deg] flex justify-center items-center drop-shadow-[4px_4px_10px_rgba(0,0,0,0.35)] z-20"
              >
                <div className="absolute -top-3 -left-3.5 w-[48%] aspect-[247/82] bg-[rgba(207,168,108,0.85)] shadow-[3px_4px_5.4px_rgba(0,0,0,0.25)] -rotate-35 z-10" />
                <img src="/templates/kraft-memoir/Cover/polaroid.svg" alt="Frame" className="absolute inset-0 w-full h-full pointer-events-none z-1" />
                <img src={groomPhoto} alt={groomShort} className="relative w-[88%] aspect-square object-cover block z-2 rounded-[1px]" />
                <div className="absolute -bottom-3.5 left-1 w-[74%] flex items-center justify-center rotate-2 z-15">
                  <img src="/templates/kraft-memoir/Cover/sobekan kertas.svg" alt="Scrap" className="w-full h-auto block drop-shadow-[2px_3px_4px_rgba(0,0,0,0.3)]" />
                  <span className="absolute font-['Intel_One_Mono',monospace] text-[14px] font-bold text-[#461616] tracking-[0.04em] pointer-events-none">
                    {groomShort}
                  </span>
                </div>
              </div>

              {/* Bride Polaroid */}
              <div 
                className="absolute top-[calc(59%+5px)] right-[7%] w-[44%] aspect-square rotate-[7.64deg] flex justify-center items-center drop-shadow-[4px_4px_10px_rgba(0,0,0,0.35)] z-21"
              >
                <div className="absolute -top-3 -right-3 w-[48%] aspect-[247/82] bg-[rgba(207,168,108,0.85)] shadow-[3px_4px_5.4px_rgba(0,0,0,0.25)] rotate-30 z-10" />
                <img src="/templates/kraft-memoir/Cover/polaroid.svg" alt="Frame" className="absolute inset-0 w-full h-full pointer-events-none z-1" />
                <img src={bridePhoto} alt={brideShort} className="relative w-[88%] aspect-square object-cover block z-2 rounded-[1px]" />
                <div className="absolute -bottom-3.5 right-1 w-[84%] flex items-center justify-center -rotate-2 z-15">
                  <img src="/templates/kraft-memoir/Cover/sobekan kertas.svg" alt="Scrap" className="w-full h-auto block drop-shadow-[2px_3px_4px_rgba(0,0,0,0.3)]" />
                  <span className="absolute font-['Intel_One_Mono',monospace] text-[14px] font-bold text-[#461616] tracking-[0.04em] pointer-events-none">
                    {brideShort}
                  </span>
                </div>
              </div>

              {/* Real-time Countdown */}
              <div 
                className="absolute bottom-[92px] left-1/2 -translate-x-1/2 flex items-center justify-center gap-1.5 z-25 w-[84%]"
              >
                <div className="bg-[#FAF5E9] px-2 py-1 rounded-[2px] min-w-[50px] text-center shadow-[2px_3px_6px_rgba(0,0,0,0.3)] border border-dashed border-[#461616]/20">
                  <span className="font-['Intel_One_Mono',monospace] text-[15px] font-bold text-[#461616] leading-[1.1] block">{timeLeft.days}</span>
                  <span className="font-['Intel_One_Mono',monospace] text-[8px] uppercase text-[#453B37] opacity-85 tracking-[0.08em] block mt-0.5">Hari</span>
                </div>
                <span className="font-bold text-[14px] text-[#FAF5E9] opacity-60">:</span>
                <div className="bg-[#FAF5E9] px-2 py-1 rounded-[2px] min-w-[50px] text-center shadow-[2px_3px_6px_rgba(0,0,0,0.3)] border border-dashed border-[#461616]/20">
                  <span className="font-['Intel_One_Mono',monospace] text-[15px] font-bold text-[#461616] leading-[1.1] block">{timeLeft.hours}</span>
                  <span className="font-['Intel_One_Mono',monospace] text-[8px] uppercase text-[#453B37] opacity-85 tracking-[0.08em] block mt-0.5">Jam</span>
                </div>
                <span className="font-bold text-[14px] text-[#FAF5E9] opacity-60">:</span>
                <div className="bg-[#FAF5E9] px-2 py-1 rounded-[2px] min-w-[50px] text-center shadow-[2px_3px_6px_rgba(0,0,0,0.3)] border border-dashed border-[#461616]/20">
                  <span className="font-['Intel_One_Mono',monospace] text-[15px] font-bold text-[#461616] leading-[1.1] block">{timeLeft.minutes}</span>
                  <span className="font-['Intel_One_Mono',monospace] text-[8px] uppercase text-[#453B37] opacity-85 tracking-[0.08em] block mt-0.5">Menit</span>
                </div>
                <span className="font-bold text-[14px] text-[#FAF5E9] opacity-60">:</span>
                <div className="bg-[#FAF5E9] px-2 py-1 rounded-[2px] min-w-[50px] text-center shadow-[2px_3px_6px_rgba(0,0,0,0.3)] border border-dashed border-[#461616]/20">
                  <span className="font-['Intel_One_Mono',monospace] text-[15px] font-bold text-[#461616] leading-[1.1] block">{timeLeft.seconds}</span>
                  <span className="font-['Intel_One_Mono',monospace] text-[8px] uppercase text-[#453B37] opacity-85 tracking-[0.08em] block mt-0.5">Detik</span>
                </div>
              </div>

              {/* Open Button */}
              <button 
                onClick={handleOpenInvitation}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[72%] max-w-[290px] py-3.5 px-6 bg-[#FAF5E9] text-[#461616] font-['Intel_One_Mono',monospace] text-[14px] font-bold tracking-[0.05em] text-center border border-[#461616]/25 rounded-[6px] shadow-[0_4px_14px_rgba(0,0,0,0.35)] cursor-pointer z-30 transition-all hover:bg-white hover:-translate-y-0.5 active:translate-y-0.5 flex items-center justify-center"
              >
                Open Invitation
              </button>
            </motion.div>
          )}
        </AnimatePresence>


        {/* ========================================================
            2. SECTION 1: MAIN CANVAS (NOTEBOOK SPIRAL)
            ======================================================== */}
        <section className="relative w-full h-[840px] bg-[#453B37] flex flex-col items-center overflow-hidden">
          <img 
            src="/templates/kraft-memoir/Undangan/Section 1/Asset 4@10x.png" 
            alt="Notebook Sheet" 
            className="absolute -top-[30px] left-0 w-full h-[calc(100%+30px)] object-cover object-top block z-1" 
          />

          <div className="relative z-10 mt-20 text-center w-full px-5">
            <span className="font-['Intel_One_Mono',monospace] text-[13px] font-bold uppercase tracking-[0.22em] text-[#000000] block">
              THE WEDDING OF
            </span>
            <h1 className="font-['Caveat',cursive] text-[44px] font-bold text-[#000000] leading-[1.1] mt-1 block">
              {groomShort} & {brideShort}
            </h1>
          </div>

          <div className="relative z-10 mt-8 w-[82%] max-w-[350px] -rotate-[1.41deg] origin-center drop-shadow-[4px_5px_12px_rgba(0,0,0,0.3)] flex justify-center">
            <div className="absolute -top-[22px] left-1/2 -translate-x-1/2 rotate-2 w-[43%] aspect-[247/82] bg-[rgba(207,168,108,0.85)] shadow-[3px_4px_5.4px_rgba(0,0,0,0.25)] z-12" />
            <img src={coverPhoto} alt="Couple Main" className="w-full h-auto block rounded-[2px]" />
          </div>
        </section>


        {/* ========================================================
            3. SECTION 2: QUOTES (LINED PAPER SCRAP)
            ======================================================== */}
        <section className="relative w-full bg-[#453B37] flex flex-col items-center -mt-[30px] pb-10 z-20">
          <div className="relative w-[133%] max-w-none flex justify-center items-center">
            {/* Top Left Tape */}
            <div className="absolute top-[9%] left-[15%] w-[23%] aspect-[247/82] bg-[rgba(207,168,108,0.85)] shadow-[3px_4px_5.4px_rgba(0,0,0,0.25)] -rotate-35 z-25" />
            
            {/* Paper Scrap */}
            <img 
              src="/templates/kraft-memoir/Undangan/Section 2/kertas 3@10x.png" 
              alt="Lined Paper" 
              className="w-full h-auto block shrink-0 drop-shadow-[0_6px_14px_rgba(0,0,0,0.3)]" 
            />

            {/* Quote Content */}
            <div className="absolute top-[calc(15%+60px)] left-[calc(20%+16px)] w-[60%] rotate-[2.49deg] origin-center z-20 flex flex-col">
              <p className="font-['Intel_One_Mono',monospace] text-[16px] leading-[1.72] text-[#000000] text-left whitespace-pre-line tracking-[0.01em]">
                {quoteText}
              </p>
              <span className="font-['Intel_One_Mono',monospace] text-[13.5px] font-bold text-[#000000] text-right mt-3.5 mr-10 tracking-[0.02em]">
                {quoteSource}
              </span>
            </div>

            {/* Bottom Right Tape */}
            <div className="absolute bottom-[16%] right-[14%] w-[23%] aspect-[247/82] bg-[rgba(207,168,108,0.85)] shadow-[3px_4px_5.4px_rgba(0,0,0,0.25)] -rotate-25 z-25" />
          </div>
        </section>


        {/* ========================================================
            4. SECTION 3: GROOM & BRIDE PROFILE
            ======================================================== */}
        <section className="relative w-full bg-[#453B37] flex flex-col items-center mt-2.5 pb-10 z-30">
          <div className="text-center mb-12 z-10">
            <span className="font-['Intel_One_Mono',monospace] text-[12px] font-bold uppercase tracking-[0.25em] text-[#FAF5E9] opacity-85 block">
              THE HAPPY COUPLE
            </span>
            <h2 className="font-['Caveat',cursive] text-[38px] font-bold text-[#FAF5E9] leading-[1.1] mt-0.5 block">
              Groom & Bride
            </h2>
          </div>

          {/* Groom Card */}
          <div className="relative w-[86%] max-w-[360px] bg-[#FAF5E9] p-6 pb-5 shadow-[4px_6px_18px_rgba(0,0,0,0.4)] flex flex-col items-center mb-14 border border-dashed border-[#461616]/15 -rotate-[1.5deg]">
            <div className="absolute -top-[34px] left-1/2 -translate-x-1/2 -rotate-1 w-[38%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_6px_rgba(0,0,0,0.25)] z-5" />
            
            <div className="relative w-[175px] aspect-square flex justify-center items-center drop-shadow-[3px_4px_10px_rgba(0,0,0,0.25)] mb-4">
              <img src={groomPhoto} alt={groomFull} className="w-full h-full object-cover block rounded-[2px] border-2 border-[#FAF5E9]" />
            </div>

            <div className="relative w-[220px] flex items-center justify-center mb-3">
              <img src="/templates/kraft-memoir/Cover/sobekan kertas.svg" alt="Tag" className="w-full h-auto block drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]" />
              <span className="absolute font-['Caveat',cursive] text-[26px] font-bold text-[#461616] tracking-[0.02em]">
                {groomFull}
              </span>
            </div>

            <div className="text-center w-full font-['Intel_One_Mono',monospace]">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#461616] mb-1 block">The Groom</span>
              <p className="text-[12px] leading-[1.45] text-[#333333] mb-3 block">
                Putra pertama dari pasangan<br />
                <strong>{groomFather}</strong><br />&<br /><strong>{groomMother}</strong>
              </p>
              {groomIg && (
                <a 
                  href={`https://instagram.com/${groomIg}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 py-1.5 px-3.5 bg-[#461616] text-[#FAF5E9] text-[11px] font-bold tracking-[0.05em] rounded-[4px] shadow-[0_2px_6px_rgba(70,22,22,0.3)] transition-transform hover:-translate-y-0.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{groomIg}</span>
                </a>
              )}
            </div>
          </div>

          {/* Bride Card */}
          <div className="relative w-[86%] max-w-[360px] bg-[#FAF5E9] p-6 pb-5 shadow-[4px_6px_18px_rgba(0,0,0,0.4)] flex flex-col items-center mb-14 border border-dashed border-[#461616]/15 rotate-[1.8deg]">
            <div className="absolute -top-[34px] left-1/2 -translate-x-1/2 -rotate-1 w-[38%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_6px_rgba(0,0,0,0.25)] z-5" />
            
            <div className="relative w-[175px] aspect-square flex justify-center items-center drop-shadow-[3px_4px_10px_rgba(0,0,0,0.25)] mb-4">
              <img src={bridePhoto} alt={brideFull} className="w-full h-full object-cover block rounded-[2px] border-2 border-[#FAF5E9]" />
            </div>

            <div className="relative w-[220px] flex items-center justify-center mb-3">
              <img src="/templates/kraft-memoir/Cover/sobekan kertas.svg" alt="Tag" className="w-full h-auto block drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]" />
              <span className="absolute font-['Caveat',cursive] text-[26px] font-bold text-[#461616] tracking-[0.02em]">
                {brideFull}
              </span>
            </div>

            <div className="text-center w-full font-['Intel_One_Mono',monospace]">
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#461616] mb-1 block">The Bride</span>
              <p className="text-[12px] leading-[1.45] text-[#333333] mb-3 block">
                Putri kedua dari pasangan<br />
                <strong>{brideFather}</strong><br />&<br /><strong>{brideMother}</strong>
              </p>
              {brideIg && (
                <a 
                  href={`https://instagram.com/${brideIg}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 py-1.5 px-3.5 bg-[#461616] text-[#FAF5E9] text-[11px] font-bold tracking-[0.05em] rounded-[4px] shadow-[0_2px_6px_rgba(70,22,22,0.3)] transition-transform hover:-translate-y-0.5"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{brideIg}</span>
                </a>
              )}
            </div>
          </div>
        </section>


        {/* ========================================================
            5. SECTION 4: PHOTO GALLERY COLLAGE
            ======================================================== */}
        <section className="relative w-full bg-[#453B37] flex flex-col items-center py-5 px-4 pb-16 z-40">
          <div className="text-center mb-9 z-10">
            <span className="font-['Intel_One_Mono',monospace] text-[12px] font-bold uppercase tracking-[0.25em] text-[#FAF5E9] opacity-85 block">
              OUR SWEET MOMENTS
            </span>
            <h2 className="font-['Caveat',cursive] text-[38px] font-bold text-[#FAF5E9] leading-[1.1] mt-0.5 block">
              Gallery of Love
            </h2>
          </div>

          <div className="w-full max-w-[390px] flex flex-col gap-7">
            {/* Top Featured Photo */}
            <div className="relative w-[96%] mx-auto bg-[#FAF5E9] p-2.5 pb-9 shadow-[4px_6px_18px_rgba(0,0,0,0.4)] -rotate-[1.5deg] rounded-[2px]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rotate-2 w-[36%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_6px_rgba(0,0,0,0.25)] z-5" />
              <img src={galleryPhoto1} alt="Moment 1" className="w-full h-[240px] object-cover block rounded-[1px]" />
              <span className="absolute bottom-2 left-0 w-full text-center font-['Caveat',cursive] text-[20px] font-bold text-[#461616]">
                where our forever begins
              </span>
            </div>

            {/* Side-by-side duo polaroids */}
            <div className="flex justify-between w-full gap-3.5">
              <div className="relative w-[48%] bg-[#FAF5E9] p-2 pb-7 shadow-[3px_5px_14px_rgba(0,0,0,0.35)] -rotate-3 rounded-[2px]">
                <div className="absolute -top-3 -left-2 w-[46%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_5px_rgba(0,0,0,0.25)] -rotate-35 z-5" />
                <img src={galleryPhoto2} alt="Groom Moment" className="w-full h-[140px] object-cover block rounded-[1px]" />
                <span className="absolute bottom-1.5 left-0 w-full text-center font-['Caveat',cursive] text-[16px] font-bold text-[#461616]">
                  his laugh
                </span>
              </div>

              <div className="relative w-[48%] bg-[#FAF5E9] p-2 pb-7 shadow-[3px_5px_14px_rgba(0,0,0,0.35)] rotate-[3.2deg] rounded-[2px]">
                <div className="absolute -top-3 -right-2 w-[46%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_5px_rgba(0,0,0,0.25)] rotate-30 z-5" />
                <img src={galleryPhoto3} alt="Bride Moment" className="w-full h-[140px] object-cover block rounded-[1px]" />
                <span className="absolute bottom-1.5 left-0 w-full text-center font-['Caveat',cursive] text-[16px] font-bold text-[#461616]">
                  her smile
                </span>
              </div>
            </div>

            {/* Bottom Polaroid */}
            <div className="relative w-[94%] mx-auto mt-2.5 bg-[#FAF5E9] p-2.5 pb-9 shadow-[4px_6px_18px_rgba(0,0,0,0.4)] rotate-[1.2deg] rounded-[2px]">
              <div className="absolute -top-4 right-[20%] -rotate-3 w-[34%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_6px_rgba(0,0,0,0.25)] z-5" />
              <img src={galleryPhoto4} alt="Moment 4" className="w-full h-[200px] object-cover block rounded-[1px]" />
              <span className="absolute bottom-2 left-0 w-full text-center font-['Caveat',cursive] text-[19px] font-bold text-[#461616]">
                two souls, one heart
              </span>
            </div>
          </div>
        </section>


        {/* ========================================================
            6. SECTION 5: LOVE STORY TIMELINE
            ======================================================== */}
        <section className="relative w-full bg-[#453B37] flex flex-col items-center py-5 px-4 pb-16 z-50">
          <div className="text-center mb-10 z-10">
            <span className="font-['Intel_One_Mono',monospace] text-[12px] font-bold uppercase tracking-[0.25em] text-[#FAF5E9] opacity-85 block">
              CHAPTERS OF US
            </span>
            <h2 className="font-['Caveat',cursive] text-[38px] font-bold text-[#FAF5E9] leading-[1.1] mt-0.5 block">
              Our Love Story
            </h2>
          </div>

          <div className="relative w-full max-w-[380px] flex flex-col gap-9">
            <div className="absolute top-4 bottom-6 left-1/2 w-0.5 border-l-2 border-dashed border-[#CFA86C]/45 -translate-x-1/2 z-1" />

            {loveStoryList.map((story, idx) => {
              const rotation = idx % 2 === 0 ? '-rotate-[1.5deg]' : 'rotate-[2deg]';
              return (
                <div 
                  key={idx} 
                  className={`relative z-2 bg-[#FAF5E9] p-5 pb-4 shadow-[4px_6px_16px_rgba(0,0,0,0.35)] rounded-[2px] border border-dashed border-[#461616]/20 ${rotation}`}
                >
                  <div className="absolute -top-[22px] left-1/2 -translate-x-1/2 rotate-1 w-[32%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_5px_rgba(0,0,0,0.2)] z-5" />
                  
                  <div className="flex justify-between items-baseline border-b border-[#461616]/15 pb-1.5 mb-2.5">
                    <h3 className="font-['Caveat',cursive] text-[22px] font-bold text-[#461616]">{story.judul}</h3>
                    <span className="font-['Intel_One_Mono',monospace] text-[13px] font-bold text-[#461616] bg-[#461616]/10 px-2 py-0.5 rounded-[2px]">
                      {story.tanggal}
                    </span>
                  </div>
                  
                  <p className="font-['Intel_One_Mono',monospace] text-[12.5px] leading-[1.6] text-[#333333] text-left">
                    {story.deskripsi}
                  </p>
                </div>
              );
            })}
          </div>
        </section>


        {/* ========================================================
            7. SECTION 6: EVENT DETAILS WITH EMBED MAPS PER EVENT
            ======================================================== */}
        <section className="relative w-full bg-[#453B37] flex flex-col items-center py-5 px-4 pb-16 z-60">
          <div className="text-center mb-10 z-10">
            <span className="font-['Intel_One_Mono',monospace] text-[12px] font-bold uppercase tracking-[0.25em] text-[#FAF5E9] opacity-85 block">
              SAVE THE DATE
            </span>
            <h2 className="font-['Caveat',cursive] text-[38px] font-bold text-[#FAF5E9] leading-[1.1] mt-0.5 block">
              Wedding Events
            </h2>
          </div>

          <div className="w-full max-w-[380px] flex flex-col gap-12">
            {/* Card 1: Akad Nikah */}
            <div className="relative bg-[#FAF5E9] p-7 pb-5 shadow-[4px_6px_18px_rgba(0,0,0,0.4)] rounded-[2px] border border-dashed border-[#461616]/20 flex flex-col items-center text-center -rotate-[1.5deg]">
              <div className="absolute -top-[28px] left-1/2 -translate-x-1/2 -rotate-1 w-[36%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_6px_rgba(0,0,0,0.25)] z-5" />
              
              <div className="relative w-[220px] flex items-center justify-center mb-3.5">
                <img src="/templates/kraft-memoir/Cover/sobekan kertas.svg" alt="Tag" className="w-full h-auto block drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]" />
                <span className="absolute font-['Intel_One_Mono',monospace] text-[13.5px] font-bold text-[#461616] tracking-[0.1em] uppercase">
                  {akadTitle}
                </span>
              </div>

              <div className="font-['Caveat',cursive] text-[26px] font-bold text-[#461616] leading-[1.1] mb-1.5">
                {akadDate}
              </div>
              <div className="inline-block font-['Intel_One_Mono',monospace] text-[13px] font-bold text-[#461616] bg-[#461616]/10 py-1 px-3 rounded-[2px] mb-3">
                {akadTime}
              </div>

              <div className="font-['Intel_One_Mono',monospace] text-[14px] font-bold text-[#000000] mb-1">
                {akadVenue}
              </div>
              <p className="font-['Intel_One_Mono',monospace] text-[11.5px] leading-[1.5] text-[#453B37] mb-4 max-w-[290px]">
                {akadAddress}
              </p>

              {/* Embedded Google Maps */}
              <div className="w-full h-[160px] border border-[#461616]/20 rounded-[2px] overflow-hidden mb-4 shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]">
                <iframe 
                  src={akadEmbedUrl} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Akad"
                  className="w-full h-full border-0 block"
                />
              </div>

              <div className="flex gap-2 w-full justify-center flex-wrap">
                <a 
                  href={akadMapsUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 font-['Intel_One_Mono',monospace] text-[11px] font-bold tracking-[0.04em] rounded-[4px] bg-[#461616] text-[#FAF5E9] border border-[#461616] shadow-[0_2px_6px_rgba(70,22,22,0.3)] transition-transform hover:-translate-y-0.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
                <a 
                  href="https://calendar.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 font-['Intel_One_Mono',monospace] text-[11px] font-bold tracking-[0.04em] rounded-[4px] bg-transparent text-[#461616] border border-[#461616]/40 transition-transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </a>
              </div>
            </div>

            {/* Card 2: Resepsi */}
            <div className="relative bg-[#FAF5E9] p-7 pb-5 shadow-[4px_6px_18px_rgba(0,0,0,0.4)] rounded-[2px] border border-dashed border-[#461616]/20 flex flex-col items-center text-center rotate-[1.8deg]">
              <div className="absolute -top-[28px] left-1/2 -translate-x-1/2 -rotate-1 w-[36%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_6px_rgba(0,0,0,0.25)] z-5" />
              
              <div className="relative w-[220px] flex items-center justify-center mb-3.5">
                <img src="/templates/kraft-memoir/Cover/sobekan kertas.svg" alt="Tag" className="w-full h-auto block drop-shadow-[2px_3px_4px_rgba(0,0,0,0.25)]" />
                <span className="absolute font-['Intel_One_Mono',monospace] text-[13.5px] font-bold text-[#461616] tracking-[0.1em] uppercase">
                  {resepsiTitle}
                </span>
              </div>

              <div className="font-['Caveat',cursive] text-[26px] font-bold text-[#461616] leading-[1.1] mb-1.5">
                {resepsiDate}
              </div>
              <div className="inline-block font-['Intel_One_Mono',monospace] text-[13px] font-bold text-[#461616] bg-[#461616]/10 py-1 px-3 rounded-[2px] mb-3">
                {resepsiTime}
              </div>

              <div className="font-['Intel_One_Mono',monospace] text-[14px] font-bold text-[#000000] mb-1">
                {resepsiVenue}
              </div>
              <p className="font-['Intel_One_Mono',monospace] text-[11.5px] leading-[1.5] text-[#453B37] mb-4 max-w-[290px]">
                {resepsiAddress}
              </p>

              {/* Embedded Google Maps */}
              <div className="w-full h-[160px] border border-[#461616]/20 rounded-[2px] overflow-hidden mb-4 shadow-[inset_0_1px_4px_rgba(0,0,0,0.1)]">
                <iframe 
                  src={resepsiEmbedUrl} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Peta Lokasi Resepsi"
                  className="w-full h-full border-0 block"
                />
              </div>

              <div className="flex gap-2 w-full justify-center flex-wrap">
                <a 
                  href={resepsiMapsUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 font-['Intel_One_Mono',monospace] text-[11px] font-bold tracking-[0.04em] rounded-[4px] bg-[#461616] text-[#FAF5E9] border border-[#461616] shadow-[0_2px_6px_rgba(70,22,22,0.3)] transition-transform hover:-translate-y-0.5"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                </a>
                <a 
                  href="https://calendar.google.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3.5 font-['Intel_One_Mono',monospace] text-[11px] font-bold tracking-[0.04em] rounded-[4px] bg-transparent text-[#461616] border border-[#461616]/40 transition-transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Add to Calendar</span>
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* ========================================================
            8. SECTION 7: RSVP & GUESTBOOK WISHES
            ======================================================== */}
        <section className="relative w-full bg-[#453B37] flex flex-col items-center py-5 px-4 pb-16 z-70">
          <div className="text-center mb-10 z-10">
            <span className="font-['Intel_One_Mono',monospace] text-[12px] font-bold uppercase tracking-[0.25em] text-[#FAF5E9] opacity-85 block">
              ATTENDANCE & WISHES
            </span>
            <h2 className="font-['Caveat',cursive] text-[38px] font-bold text-[#FAF5E9] leading-[1.1] mt-0.5 block">
              RSVP & Guestbook
            </h2>
          </div>

          {/* Form RSVP */}
          <div className="relative w-full max-w-[380px] bg-[#FAF5E9] p-7 pb-6 shadow-[4px_6px_18px_rgba(0,0,0,0.4)] rounded-[2px] border border-dashed border-[#461616]/20 -rotate-[1.2deg] mb-11">
            <div className="absolute -top-[28px] left-1/2 -translate-x-1/2 rotate-1 w-[36%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_6px_rgba(0,0,0,0.25)] z-5" />

            <form onSubmit={handleRSVPSubmit} className="flex flex-col gap-4 text-left">
              <div className="flex flex-col">
                <label className="font-['Intel_One_Mono',monospace] text-[11.5px] font-bold text-[#461616] uppercase tracking-[0.05em] mb-1.5">
                  Nama Lengkap
                </label>
                <input 
                  type="text" 
                  value={rsvpForm.name} 
                  onChange={(e) => setRsvpForm({ ...rsvpForm, name: e.target.value })}
                  placeholder="Masukkan nama Anda..."
                  required
                  className="font-['Intel_One_Mono',monospace] text-[13px] text-[#333333] bg-white border border-[#461616]/25 rounded-[3px] p-2.5 outline-none focus:border-[#461616] focus:ring-1 focus:ring-[#461616]"
                />
              </div>

              <div className="flex flex-col">
                <label className="font-['Intel_One_Mono',monospace] text-[11.5px] font-bold text-[#461616] uppercase tracking-[0.05em] mb-1.5">
                  Konfirmasi Kehadiran
                </label>
                <select 
                  value={rsvpForm.status} 
                  onChange={(e) => setRsvpForm({ ...rsvpForm, status: e.target.value })}
                  className="font-['Intel_One_Mono',monospace] text-[13px] text-[#333333] bg-white border border-[#461616]/25 rounded-[3px] p-2.5 outline-none focus:border-[#461616]"
                >
                  <option value="hadir">Hadir</option>
                  <option value="tidak">Tidak Dapat Hadir</option>
                  <option value="ragu">Masih Ragu</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-['Intel_One_Mono',monospace] text-[11.5px] font-bold text-[#461616] uppercase tracking-[0.05em] mb-1.5">
                  Jumlah Tamu
                </label>
                <select 
                  value={rsvpForm.guests} 
                  onChange={(e) => setRsvpForm({ ...rsvpForm, guests: e.target.value })}
                  className="font-['Intel_One_Mono',monospace] text-[13px] text-[#333333] bg-white border border-[#461616]/25 rounded-[3px] p-2.5 outline-none focus:border-[#461616]"
                >
                  <option value="1">1 Orang</option>
                  <option value="2">2 Orang</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label className="font-['Intel_One_Mono',monospace] text-[11.5px] font-bold text-[#461616] uppercase tracking-[0.05em] mb-1.5">
                  Ucapan & Doa
                </label>
                <textarea 
                  rows={3}
                  value={rsvpForm.message} 
                  onChange={(e) => setRsvpForm({ ...rsvpForm, message: e.target.value })}
                  placeholder="Tuliskan ucapan & doa restu untuk kedua mempelai..."
                  required
                  className="font-['Intel_One_Mono',monospace] text-[13px] text-[#333333] bg-white border border-[#461616]/25 rounded-[3px] p-2.5 outline-none focus:border-[#461616] resize-y min-h-[80px]"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-3 px-5 bg-[#461616] text-[#FAF5E9] font-['Intel_One_Mono',monospace] text-[13px] font-bold tracking-[0.06em] rounded-[4px] shadow-[0_3px_8px_rgba(70,22,22,0.3)] cursor-pointer transition-all hover:bg-[#5c1e1e] hover:-translate-y-0.5 flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Kirim RSVP & Ucapan</span>
              </button>
            </form>
          </div>

          {/* Wishes List Stream */}
          <div className="w-full max-w-[380px] flex flex-col gap-4">
            <div className="font-['Intel_One_Mono',monospace] text-[12px] font-bold text-[#FAF5E9] opacity-90 text-left mb-1">
              {wishesList.length} Ucapan Doa Restu
            </div>

            <div className="flex flex-col gap-3.5">
              {wishesList.map((w, idx) => {
                const isHadir = w.status === 'hadir';
                return (
                  <div key={idx} className="bg-[#FAF5E9] p-4 pb-3.5 rounded-[2px] shadow-[3px_4px_12px_rgba(0,0,0,0.3)] border border-dashed border-[#461616]/15 text-left">
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="font-['Caveat',cursive] text-[22px] font-bold text-[#461616] leading-none">
                        {w.name}
                      </span>
                      <span className={`font-['Intel_One_Mono',monospace] text-[10px] font-bold px-1.5 py-0.5 rounded-[2px] uppercase tracking-[0.05em] ${
                        isHadir ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {isHadir ? 'Hadir' : (w.status === 'tidak' ? 'Tidak Hadir' : 'Ragu-ragu')}
                      </span>
                    </div>
                    <p className="font-['Intel_One_Mono',monospace] text-[12px] leading-[1.55] text-[#333333] mb-1.5">
                      {w.message}
                    </p>
                    <span className="font-['Intel_One_Mono',monospace] text-[10px] text-[#888888] block">
                      {w.time || 'Baru saja'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* ========================================================
            9. SECTION 8: DRESSCODE
            ======================================================== */}
        <section className="relative w-full bg-[#453B37] flex flex-col items-center py-5 px-4 pb-16 z-80">
          <div className="text-center mb-10 z-10">
            <span className="font-['Intel_One_Mono',monospace] text-[12px] font-bold uppercase tracking-[0.25em] text-[#FAF5E9] opacity-85 block">
              ATTIRE GUIDE
            </span>
            <h2 className="font-['Caveat',cursive] text-[38px] font-bold text-[#FAF5E9] leading-[1.1] mt-0.5 block">
              Wedding Dresscode
            </h2>
          </div>

          <div className="relative w-full max-w-[380px] bg-[#FAF5E9] p-7 pb-6 shadow-[4px_6px_18px_rgba(0,0,0,0.4)] rounded-[2px] border border-dashed border-[#461616]/20 rotate-[1.2deg] text-center">
            <div className="absolute -top-[28px] left-1/2 -translate-x-1/2 -rotate-[1.5deg] w-[36%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_6px_rgba(0,0,0,0.25)] z-5" />

            <p className="font-['Intel_One_Mono',monospace] text-[12px] leading-[1.6] text-[#453B37] mb-5">
              Untuk melengkapi keindahan dan keharmonisan momen bahagia kami, para tamu undangan dipersilakan mengenakan busana dengan nuansa warna:
            </p>

            <div className="flex justify-center gap-3.5 mb-5">
              {dresscodeSwatches.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1.5">
                  <div 
                    className="w-11 h-11 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.2),0_2px_6px_rgba(0,0,0,0.15)] border-2 border-[#FAF5E9]" 
                    style={{ backgroundColor: typeof item === 'string' ? item : item.hex }}
                  />
                  <span className="font-['Intel_One_Mono',monospace] text-[10px] font-bold text-[#461616] uppercase tracking-[0.05em]">
                    {typeof item === 'string' ? `Color ${idx+1}` : item.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="inline-block font-['Intel_One_Mono',monospace] text-[12px] font-bold text-[#461616] bg-[#461616]/10 py-1 px-3.5 rounded-[2px] mb-3 tracking-[0.04em]">
              {dresscodeBadge}
            </div>

            <p className="font-['Caveat',cursive] text-[18px] font-bold text-[#461616] leading-[1.25]">
              {dresscodeNote}
            </p>
          </div>
        </section>


        {/* ========================================================
            10. SECTION 9: LIVE STREAMING
            ======================================================== */}
        <section className="relative w-full bg-[#453B37] flex flex-col items-center py-5 px-4 pb-16 z-90">
          <div className="text-center mb-10 z-10">
            <span className="font-['Intel_One_Mono',monospace] text-[12px] font-bold uppercase tracking-[0.25em] text-[#FAF5E9] opacity-85 block">
              VIRTUAL WEDDING
            </span>
            <h2 className="font-['Caveat',cursive] text-[38px] font-bold text-[#FAF5E9] leading-[1.1] mt-0.5 block">
              Live Streaming
            </h2>
          </div>

          <div className="relative w-full max-w-[380px] bg-[#FAF5E9] p-7 pb-6 shadow-[4px_6px_18px_rgba(0,0,0,0.4)] rounded-[2px] border border-dashed border-[#461616]/20 -rotate-[1.5deg] text-center">
            <div className="absolute -top-[28px] left-1/2 -translate-x-1/2 rotate-[1.2deg] w-[36%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_6px_rgba(0,0,0,0.25)] z-5" />

            <p className="font-['Intel_One_Mono',monospace] text-[12px] leading-[1.6] text-[#453B37] mb-5">
              Bagi keluarga, sahabat, dan kerabat yang berhalangan hadir secara langsung, Anda tetap dapat menyaksikan prosesi akad nikah kami secara virtual:
            </p>

            <div className="bg-[#461616]/10 p-3 rounded-[4px] mb-5 border border-dashed border-[#461616]/20">
              <div className="font-['Caveat',cursive] text-[22px] font-bold text-[#461616] mb-0.5">
                {streamEventTitle}
              </div>
              <div className="font-['Intel_One_Mono',monospace] text-[11.5px] font-bold text-[#333333]">
                {streamTime}
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mb-4.5">
              <a 
                href={streamYoutubeUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4.5 font-['Intel_One_Mono',monospace] text-[12px] font-bold tracking-[0.05em] rounded-[4px] bg-[#461616] text-[#FAF5E9] shadow-[0_3px_8px_rgba(70,22,22,0.3)] transition-all hover:bg-[#5c1e1e] hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Tonton di YouTube Live</span>
              </a>

              <a 
                href={streamIgUrl} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4.5 font-['Intel_One_Mono',monospace] text-[12px] font-bold tracking-[0.05em] rounded-[4px] bg-transparent text-[#461616] border border-[#461616]/40 transition-all hover:bg-[#461616]/5 hover:-translate-y-0.5"
              >
                <Instagram className="w-4 h-4" />
                <span>Instagram Live (@{brideIg})</span>
              </a>
            </div>

            <p className="font-['Caveat',cursive] text-[18px] font-bold text-[#461616] leading-[1.25]">
              "Kehadiran dan doa restu Anda secara virtual sangat berarti bagi kami."
            </p>
          </div>
        </section>


        {/* ========================================================
            11. SECTION 10: WEDDING GIFT / DIGITAL ENVELOPE
            ======================================================== */}
        <section className="relative w-full bg-[#453B37] flex flex-col items-center py-5 px-4 pb-16 z-100">
          <div className="text-center mb-10 z-10">
            <span className="font-['Intel_One_Mono',monospace] text-[12px] font-bold uppercase tracking-[0.25em] text-[#FAF5E9] opacity-85 block">
              SHARE THE LOVE
            </span>
            <h2 className="font-['Caveat',cursive] text-[38px] font-bold text-[#FAF5E9] leading-[1.1] mt-0.5 block">
              Wedding Gift
            </h2>
          </div>

          <div className="w-full max-w-[380px] flex flex-col gap-10">
            <p className="text-center font-['Intel_One_Mono',monospace] text-[12px] leading-[1.6] text-[#FAF5E9] opacity-90 -mb-2.5 px-2.5">
              Doa restu Anda merupakan karunia terindah bagi kami. Namun jika berkenan memberikan tanda kasih, Anda dapat mengirimkannya melalui:
            </p>

            {/* Bank Cards */}
            {bankAccounts.map((acc, idx) => {
              const rotation = idx % 2 === 0 ? '-rotate-[1.5deg]' : 'rotate-[1.8deg]';
              const cleanNum = acc.cleanNumber || acc.number.replace(/\s+/g, '');
              const key = `bank-${idx}`;
              const isCopied = copyFeedback[key];

              return (
                <div 
                  key={idx} 
                  className={`relative bg-[#FAF5E9] p-6 pb-5 shadow-[4px_6px_18px_rgba(0,0,0,0.4)] rounded-[2px] border border-dashed border-[#461616]/20 flex flex-col items-center text-center ${rotation}`}
                >
                  <div className="absolute -top-[28px] left-1/2 -translate-x-1/2 rotate-1 w-[36%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_6px_rgba(0,0,0,0.25)] z-5" />
                  
                  <span className="font-['Intel_One_Mono',monospace] text-[16px] font-bold text-[#461616] tracking-[0.15em] mb-1.5 border-b-2 border-[#461616]/20 pb-1 inline-block">
                    {acc.bank}
                  </span>

                  <div className="font-['Intel_One_Mono',monospace] text-[20px] font-bold tracking-[0.1em] text-[#000000] my-2">
                    {acc.number}
                  </div>

                  <span className="font-['Caveat',cursive] text-[22px] font-bold text-[#461616] mb-4">
                    {acc.name}
                  </span>

                  <button 
                    onClick={() => handleCopy(cleanNum, key)}
                    className={`inline-flex items-center justify-center gap-1.5 py-2 px-4 text-[#FAF5E9] font-['Intel_One_Mono',monospace] text-[11.5px] font-bold tracking-[0.05em] rounded-[4px] shadow-[0_3px_8px_rgba(70,22,22,0.3)] cursor-pointer transition-all hover:-translate-y-0.5 ${
                      isCopied ? 'bg-emerald-700' : 'bg-[#461616] hover:bg-[#5c1e1e]'
                    }`}
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'Tersalin! ✓' : 'Salin No. Rekening'}</span>
                  </button>
                </div>
              );
            })}

            {/* Physical Gift Card */}
            <div className="relative bg-[#FAF5E9] p-6 pb-5 shadow-[4px_6px_18px_rgba(0,0,0,0.4)] rounded-[2px] border border-dashed border-[#461616]/20 flex flex-col items-center text-center -rotate-1">
              <div className="absolute -top-[28px] left-1/2 -translate-x-1/2 rotate-1 w-[36%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_6px_rgba(0,0,0,0.25)] z-5" />
              
              <span className="font-['Intel_One_Mono',monospace] text-[16px] font-bold text-[#461616] tracking-[0.15em] mb-1.5 border-b-2 border-[#461616]/20 pb-1 inline-block">
                KIRIM KADO FISIK
              </span>

              <div className="font-['Caveat',cursive] text-[22px] font-bold text-[#461616] mt-1.5 mb-1.5">
                Kediaman Mempelai
              </div>

              <p className="font-['Intel_One_Mono',monospace] text-[12px] leading-[1.55] text-[#333333] mb-4 max-w-[290px]">
                {giftAddress}
              </p>

              <button 
                onClick={() => handleCopy(giftAddress, 'address')}
                className={`inline-flex items-center justify-center gap-1.5 py-2 px-4 text-[#FAF5E9] font-['Intel_One_Mono',monospace] text-[11.5px] font-bold tracking-[0.05em] rounded-[4px] shadow-[0_3px_8px_rgba(70,22,22,0.3)] cursor-pointer transition-all hover:-translate-y-0.5 ${
                  copyFeedback['address'] ? 'bg-emerald-700' : 'bg-[#461616] hover:bg-[#5c1e1e]'
                }`}
              >
                {copyFeedback['address'] ? <Check className="w-3.5 h-3.5" /> : <MapPin className="w-3.5 h-3.5" />}
                <span>{copyFeedback['address'] ? 'Tersalin! ✓' : 'Salin Alamat'}</span>
              </button>
            </div>
          </div>
        </section>


        {/* ========================================================
            12. SECTION 11: CLOSING & THANK YOU NOTE
            ======================================================== */}
        <section className="relative w-full bg-[#453B37] flex flex-col items-center py-5 px-4 pb-20 z-110">
          <div className="relative w-full max-w-[380px] bg-[#FAF5E9] p-8 pb-7 shadow-[4px_6px_18px_rgba(0,0,0,0.4)] rounded-[2px] border border-dashed border-[#461616]/20 rotate-1 text-center flex flex-col items-center">
            <div className="absolute -top-[28px] left-1/2 -translate-x-1/2 -rotate-2 w-[36%] aspect-[247/82] bg-[rgba(207,168,108,0.88)] shadow-[2px_3px_6px_rgba(0,0,0,0.25)] z-5" />

            <div className="relative w-[140px] aspect-square mb-5 drop-shadow-[3px_4px_10px_rgba(0,0,0,0.25)]">
              <img src={coverPhoto} alt="Closing Couple" className="w-full h-full object-cover block rounded-[2px] border-2 border-[#FAF5E9]" />
            </div>

            <p className="font-['Intel_One_Mono',monospace] text-[12.5px] leading-[1.65] text-[#333333] mb-5 whitespace-pre-line">
              {closingQuote}
            </p>

            <span className="font-['Intel_One_Mono',monospace] text-[11px] font-bold uppercase tracking-[0.2em] text-[#461616] opacity-85 mb-0.5">
              KAMI YANG BERBAHAGIA
            </span>
            <h2 className="font-['Caveat',cursive] text-[40px] font-bold text-[#461616] leading-[1.1] mb-1.5">
              {groomShort} & {brideShort}
            </h2>
            <span className="font-['Intel_One_Mono',monospace] text-[11px] text-[#666666]">
              {data?.keluarga_besar || 'Beserta Keluarga Besar Kedua Mempelai'}
            </span>
          </div>
        </section>

      </div>

      {/* Floating Audio Control Button */}
      {isOpened && (
        <button
          onClick={toggleAudio}
          className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-[#FAF5E9] border-2 border-[#3d3532] shadow-xl flex items-center justify-center text-[#453B37] hover:scale-110 active:scale-95 transition-transform z-50 cursor-pointer"
          title="Toggle Music"
        >
          {isPlaying ? (
            <Music className="w-5 h-5 animate-spin" style={{ animationDuration: '4s' }} />
          ) : (
            <VolumeX className="w-5 h-5 text-stone-500" />
          )}
        </button>
      )}

    </div>
  );
}
