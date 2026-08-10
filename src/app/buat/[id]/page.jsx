"use client";

import { useState, use, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabase";
import { dummyWeddingPhotos } from "@/lib/dummy-data";
import { ChevronLeft, Loader2 } from "lucide-react";
import MagicalLanternsForm from "@/components/forms/MagicalLanternsForm";
import MagicalLanternsTemplate from "@/components/templates/renderers/magical-lanterns";
import IvoryLineForm from "@/components/forms/IvoryLineForm";
import IvoryLineTemplate from "@/components/templates/renderers/ivory-line";
import MemoryLaneForm from "@/components/forms/MemoryLaneForm";
import MemoryLaneTemplate from "@/components/templates/renderers/memory-lane";
import FolioBloomForm from "@/components/forms/FolioBloomForm";
import FolioBloomTemplate from "@/components/templates/renderers/folio-bloom";
import CelestialJourneyForm from "@/components/forms/CelestialJourneyForm";
import CelestialJourneyTemplate from "@/components/templates/renderers/celestial-journey";
import KisahtanggalkuForm from "@/components/forms/KisahtanggalkuForm";
import KisahtanggalkuTemplate from "@/components/templates/renderers/kisahtanggalku";
import SunnySlabForm from "@/components/forms/SunnySlabForm";
import SunnySlabTemplate from "@/components/templates/renderers/sunny-slab";
import RetroVintageForm from "@/components/forms/RetroVintageForm";
import RetroVintageTemplate from "@/components/templates/renderers/retro-vintage";

export default function BuilderPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Generate a unique session ID for this form visit (used as the photo folder in storage)
  const sessionId = useRef(
    typeof crypto !== "undefined" ? crypto.randomUUID() : Date.now().toString()
  ).current;

  // Lifted state for MagicalLanternsForm
  const [lanternsFormData, setLanternsFormData] = useState({
    receiverName: "",
    greetingText: "",
    photos: [null, null, null],
    wishes: [{ message: "" }],
    finalQuote: "",
    finalGreeting: "",
    closingRemark: "",
    senderName: "",
    email: ""
  });

  // Lifted state for IvoryLineForm
  const [ivoryLineFormData, setIvoryLineFormData] = useState({});

  // Lifted state for MemoryLaneForm
  const [memoryLaneFormData, setMemoryLaneFormData] = useState({
    receiverName: "",
    senderName: "",
    recipientAge: "",
    photo1: null,
    photo2: null,
    photo3: null,
    caption1: "",
    caption2: "",
    caption3: "",
    filmPhoto1: null,
    filmPhoto2: null,
    filmPhoto3: null,
    filmPhoto4: null,
    filmPhoto5: null,
    filmCaption1: "",
    filmCaption2: "",
    filmCaption3: "",
    filmCaption4: "",
    filmCaption5: "",
    mainMessage: "",
    reasons: ["", "", "", "", "", "", ""],
    songUrl: "",
    musicQuote: "",
  });

  const [folioBloomFormData, setFolioBloomFormData] = useState({
    mempelai_pria_nama: "",
    mempelai_pria_ortu: "",
    mempelai_wanita_nama: "",
    mempelai_wanita_ortu: "",
    acara_akad_nama: "",
    acara_akad_tanggal: "",
    acara_akad_jam: "",
    acara_akad_lokasi_nama: "",
    acara_akad_lokasi_alamat: "",
    acara_akad_lokasi_url: "",
    acara_resepsi_nama: "",
    acara_resepsi_tanggal: "",
    acara_resepsi_jam: "",
    acara_resepsi_lokasi_nama: "",
    acara_resepsi_lokasi_alamat: "",
    acara_resepsi_lokasi_url: "",
    foto_urls: [],
    music_youtube_url: "",
    music_quote: "",
  });
  
  const [celestialJourneyFormData, setCelestialJourneyFormData] = useState({});
  const [kisahtanggalkuFormData, setKisahtanggalkuFormData] = useState({});
  const [sunnySlabFormData, setSunnySlabFormData] = useState({});
  const [retroVintageFormData, setRetroVintageFormData] = useState({});

  useEffect(() => {
    async function init() {
      try {
        const res = await fetch(`/api/templates?id=${id}`);
        const result = await res.json();

        if (!res.ok || !result.data) {
          setError(true);
        } else {
          setTemplate(result.data);
        }
      } catch (err) {
        console.error("Failed to load template data", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg transition-colors duration-400">
        <Loader2 className="w-8 h-8 animate-spin text-berry dark:text-pink" />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg transition-colors duration-400">
        <div className="text-center">
          <h2 className="text-[2rem] font-serif italic text-ink mb-4">Template tidak ditemukan</h2>
          <Link href="/templates" className="text-berry dark:text-pink font-semibold hover:underline">Kembali ke Galeri</Link>
        </div>
      </div>
    );
  }

  const isMagicalLanterns = id === "b61395f5-c1ad-486f-add9-cac4bb13d314" || template?.nama === "Magical Lanterns" || template?.nama === "Cosmic Hearts" || template?.slug === "cosmic-hearts";
  const isIvoryLine = id === "8fd87cbb-3273-442b-b9cd-de875f3415ad" || template?.nama === "Ivory Line";
  const isMemoryLane = template?.nama === "Memory Lane";
  const isFolioBloom = id === "50e18d6a-5c21-4f18-a6d1-123456789abc" || template?.nama === "Folio Bloom";
  const isCelestialJourney = template?.nama === "Celestial Journey";
  const isKisahtanggalku = template?.nama === "Kisahtanggalku" || template?.nama === "Vintage Chronicle";
  const isSunnySlab = template?.nama === "Sunny Slab" || template?.slug === "sunny-slab";
  const isRetroVintage = id === "c084ae16-0b36-4ca7-a075-533d89a2f07c" || template?.nama === "Retro Vintage Romance" || template?.slug === "retro-vintage" || id === "retro-vintage";

  // Handlers for generic changes
  const handleLanternsChange = (e) => {
    const { name, value } = e.target;
    setLanternsFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIvoryLineChange = (e) => {
    const { name, value } = e.target;
    setIvoryLineFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMemoryLaneChange = (e) => {
    const { name, value } = e.target;
    setMemoryLaneFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFolioBloomChange = (e) => {
    const { name, value } = e.target;
    setFolioBloomFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCelestialJourneyChange = (e) => {
    const { name, value } = e.target;
    setCelestialJourneyFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleKisahtanggalkuChange = (e) => {
    const { name, value } = e.target;
    setKisahtanggalkuFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSunnySlabChange = (e) => {
    const { name, value } = e.target;
    setSunnySlabFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRetroVintageChange = (e) => {
    const { name, value } = e.target;
    setRetroVintageFormData(prev => ({ ...prev, [name]: value }));
  };

  // Map MagicalLanterns form data to the shape expected by the template
  const mappedLanternsData = {
    id: "live-preview",
    receiverName: lanternsFormData.receiverName || "Penerima",
    greetingText: lanternsFormData.greetingText || "Ketik pesan pembuka di form...",
    photos: lanternsFormData.photos,
    wishes: lanternsFormData.wishes.some(w => w.message) 
      ? lanternsFormData.wishes.filter(w => w.message).map(w => ({ text: w.message }))
      : undefined,
    finalQuote: lanternsFormData.finalQuote || `"To the world you may be one person,\nbut to one person you are the world."`,
    finalGreeting: lanternsFormData.finalGreeting || "Ketik pesan penutup di form...",
    closingRemark: lanternsFormData.closingRemark || "With lots of love,",
    senderName: lanternsFormData.senderName || "Pengirim"
  };

  const mappedIvoryLineData = {
    ...ivoryLineFormData,
    nama_panggilan_pria: ivoryLineFormData.nama_panggilan_pria || "Romeo",
    nama_panggilan_wanita: ivoryLineFormData.nama_panggilan_wanita || "Juliet",
    nama_lengkap_pria: ivoryLineFormData.nama_lengkap_pria || "Romeo Montague",
    nama_lengkap_wanita: ivoryLineFormData.nama_lengkap_wanita || "Juliet Capulet",
    acara1_nama: ivoryLineFormData.acara1_nama || "Akad Nikah",
    acara1_tanggal: ivoryLineFormData.acara1_tanggal || "2026-12-24",
    acara1_jam: ivoryLineFormData.acara1_jam || "08:00",
    acara1_lokasi: ivoryLineFormData.acara1_lokasi || "Masjid Raya Jakarta",
    foto_urls: ivoryLineFormData.foto_urls && ivoryLineFormData.foto_urls.length > 0 
      ? ivoryLineFormData.foto_urls 
      : dummyWeddingPhotos.foto_urls,
    foto_cover: ivoryLineFormData.foto_cover || dummyWeddingPhotos.foto_cover,
    foto_pria: ivoryLineFormData.foto_pria || dummyWeddingPhotos.foto_pria,
    foto_wanita: ivoryLineFormData.foto_wanita || dummyWeddingPhotos.foto_wanita,
    bank_accounts: ivoryLineFormData.bank_accounts && ivoryLineFormData.bank_accounts.length > 0 
      ? ivoryLineFormData.bank_accounts 
      : [{ bank: "BCA", nomor: "1234567890", nama: "Romeo Montague" }],
    youtube_url: ivoryLineFormData.youtube_url || "",
    wishes: [
      { message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.", name: "Budi & Keluarga" },
      { message: "Happy Wedding Romeo & Juliet! Wishing you a lifetime of love and happiness.", name: "Siska" }
    ]
  };

  const mappedSunnySlabData = {
    ...sunnySlabFormData,
    nama_panggilan_pria: sunnySlabFormData.nama_panggilan_pria || "Bima",
    nama_panggilan_wanita: sunnySlabFormData.nama_panggilan_wanita || "Ayu",
    nama_lengkap_pria: sunnySlabFormData.nama_lengkap_pria || "Bima Aryasetya, S.T.",
    nama_ayah_pria: sunnySlabFormData.nama_ayah_pria || "Bapak Budi Santoso",
    nama_ibu_pria: sunnySlabFormData.nama_ibu_pria || "Ibu Siti Aminah",
    nama_lengkap_wanita: sunnySlabFormData.nama_lengkap_wanita || "Ayu Lestari, S.E.",
    nama_ayah_wanita: sunnySlabFormData.nama_ayah_wanita || "Bapak Joko Widodo",
    nama_ibu_wanita: sunnySlabFormData.nama_ibu_wanita || "Ibu Iriana",
    foto_urls: sunnySlabFormData.foto_urls && sunnySlabFormData.foto_urls.length > 0 ? sunnySlabFormData.foto_urls : dummyWeddingPhotos.foto_urls,
    foto_cover: sunnySlabFormData.foto_cover || dummyWeddingPhotos.foto_cover,
    foto_pria: sunnySlabFormData.foto_pria || dummyWeddingPhotos.foto_pria,
    foto_wanita: sunnySlabFormData.foto_wanita || dummyWeddingPhotos.foto_wanita,
    tanggal_acara: sunnySlabFormData.tanggal_acara || "2027-02-14",
    waktu_acara: sunnySlabFormData.waktu_acara || "08:00",
    quote_text: sunnySlabFormData.quote_text || "Cinta yang tumbuh dari niat baik akan selalu menemukan jalan untuk saling menguatkan, dalam suka maupun duka.",
    quote_author: sunnySlabFormData.quote_author || "Doa & Harapan Kami",
    acara_akad_nama: sunnySlabFormData.acara_akad_nama || "Akad Nikah",
    acara_akad_tanggal: sunnySlabFormData.acara_akad_tanggal || "Sabtu, 14 Februari 2027",
    acara_akad_jam: sunnySlabFormData.acara_akad_jam || "08:00 - 10:00 WIB",
    acara_akad_lokasi: sunnySlabFormData.acara_akad_lokasi || "Masjid Raya Jakarta, Jl. Sudirman No. 1",
    acara_akad_maps_url: sunnySlabFormData.acara_akad_maps_url || "https://maps.google.com/?q=Jakarta",
    acara_resepsi_nama: sunnySlabFormData.acara_resepsi_nama || "Resepsi",
    acara_resepsi_tanggal: sunnySlabFormData.acara_resepsi_tanggal || "Sabtu, 14 Februari 2027",
    acara_resepsi_jam: sunnySlabFormData.acara_resepsi_jam || "11:00 - 14:00 WIB",
    acara_resepsi_lokasi: sunnySlabFormData.acara_resepsi_lokasi || "Gedung Serbaguna Jakarta",
    acara_resepsi_maps_url: sunnySlabFormData.acara_resepsi_maps_url || "https://maps.google.com/?q=Jakarta",
    youtube_url: sunnySlabFormData.youtube_url || "rtOvBOTyX00",
    live_youtube_url: sunnySlabFormData.live_youtube_url || "https://youtube.com/live/dummy_link",
    live_zoom_url: sunnySlabFormData.live_zoom_url || "https://zoom.us/j/123456789",
    live_meet_url: sunnySlabFormData.live_meet_url || "https://meet.google.com/abc-defg-hij",
    dresscode_warna: sunnySlabFormData.dresscode_warna && sunnySlabFormData.dresscode_warna.length > 0 ? sunnySlabFormData.dresscode_warna : ["#F7F2E9", "#C9D9E8", "#111111"],
    dresscode_desc: sunnySlabFormData.dresscode_desc || "Mohon kenakan pakaian dengan warna yang senada dengan tema kami.",
    ucapan_terima_kasih: sunnySlabFormData.ucapan_terima_kasih || "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu untuk kami.",
    love_story: sunnySlabFormData.love_story && sunnySlabFormData.love_story.length > 0 ? sunnySlabFormData.love_story : [
      {
        tanggal: "2020",
        judul: "Pertama Bertemu",
        deskripsi: "Berawal dari acara kampus, kami saling mengenal dan mulai berteman."
      },
      {
        tanggal: "2023",
        judul: "Menjalin Kasih",
        deskripsi: "Setelah bertahun-tahun bersahabat, kami memutuskan untuk membawa hubungan ini ke tahap yang lebih serius."
      },
      {
        tanggal: "2026",
        judul: "Lamaran",
        deskripsi: "Sebuah momen manis di mana dua keluarga besar bertemu untuk merestui niat baik kami."
      }
    ],
    wishes: sunnySlabFormData.wishes && sunnySlabFormData.wishes.length > 0 ? sunnySlabFormData.wishes : [
      { nama: "Andi & Keluarga", pesan: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah." },
      { nama: "Siska", pesan: "Lancar sampai hari H yaa! Bahagia selalu untuk kalian berdua." },
      { nama: "Budi", pesan: "Congrats bro! Akhirnya melepas masa lajang juga. Doa terbaik buat kalian." }
    ],
    rekening_pria: sunnySlabFormData.rekening_pria && sunnySlabFormData.rekening_pria.length > 0 ? sunnySlabFormData.rekening_pria : [
      { bank: "BCA", nomor: "1234567890", atas_nama: "Bima Aryasetya" }
    ],
    rekening_wanita: sunnySlabFormData.rekening_wanita && sunnySlabFormData.rekening_wanita.length > 0 ? sunnySlabFormData.rekening_wanita : [
      { bank: "Mandiri", nomor: "0987654321", atas_nama: "Ayu Lestari" }
    ]
  };

  const mappedRetroVintageData = {
    ...retroVintageFormData,
    nama_panggilan_pria: retroVintageFormData.nama_panggilan_pria || "Bagus",
    nama_panggilan_wanita: retroVintageFormData.nama_panggilan_wanita || "Kartika",
    nama_lengkap_pria: retroVintageFormData.nama_lengkap_pria || "Bagus Setyawan, S.T.",
    nama_ayah_pria: retroVintageFormData.nama_ayah_pria || "Bapak Hendra Setyawan",
    nama_ibu_pria: retroVintageFormData.nama_ibu_pria || "Ibu Sari Wulandari",
    nama_lengkap_wanita: retroVintageFormData.nama_lengkap_wanita || "Kartika Ayu, S.E.",
    nama_ayah_wanita: retroVintageFormData.nama_ayah_wanita || "Bapak Bambang Prasetyo",
    nama_ibu_wanita: retroVintageFormData.nama_ibu_wanita || "Ibu Ratna Kusuma",
    foto_urls: retroVintageFormData.foto_urls && retroVintageFormData.foto_urls.length > 0 ? retroVintageFormData.foto_urls : dummyWeddingPhotos.foto_urls,
    foto_cover: retroVintageFormData.foto_cover || dummyWeddingPhotos.foto_cover,
    foto_hero: retroVintageFormData.foto_hero || dummyWeddingPhotos.foto_hero,
    foto_pria: retroVintageFormData.foto_pria || dummyWeddingPhotos.foto_pria,
    foto_wanita: retroVintageFormData.foto_wanita || dummyWeddingPhotos.foto_wanita,
    tanggal_acara: retroVintageFormData.tanggal_acara || "2026-12-12",
    waktu_acara: retroVintageFormData.waktu_acara || "08:00",
    quote_text: retroVintageFormData.quote_text || "Cinta bukan tentang mencari seseorang yang sempurna, tetapi belajar melihat ketidaksempurnaan dengan cara yang sempurna.",
    quote_author: retroVintageFormData.quote_author || "Doa & Harapan Kami",
    acara_akad_nama: retroVintageFormData.acara_akad_nama || "Akad Nikah",
    acara_akad_tanggal: retroVintageFormData.acara_akad_tanggal || "Sabtu, 12 Desember 2026",
    acara_akad_jam: retroVintageFormData.acara_akad_jam || "08:00 - 10:00 WIB",
    acara_akad_lokasi: retroVintageFormData.acara_akad_lokasi || "Masjid Agung Kota, Jl. Merdeka No. 45",
    acara_akad_maps_url: retroVintageFormData.acara_akad_maps_url || "https://maps.google.com",
    acara_resepsi_nama: retroVintageFormData.acara_resepsi_nama || "Resepsi Nikah",
    acara_resepsi_tanggal: retroVintageFormData.acara_resepsi_tanggal || "Sabtu, 12 Desember 2026",
    acara_resepsi_jam: retroVintageFormData.acara_resepsi_jam || "11:00 - 14:00 WIB",
    acara_resepsi_lokasi: retroVintageFormData.acara_resepsi_lokasi || "Gedung Serbaguna Utama, Jl. Ahmad Yani No. 100",
    acara_resepsi_maps_url: retroVintageFormData.acara_resepsi_maps_url || "https://maps.google.com",
    love_story: retroVintageFormData.love_story && retroVintageFormData.love_story.length > 0 ? retroVintageFormData.love_story : [
      { tanggal: "2021", judul: "Awal Pertemuan", deskripsi: "Pertama kali bertemu saat kegiatan organisasi dan mulai menjalin komunikasi hangat." },
      { tanggal: "2023", judul: "Menjalin Hubungan", deskripsi: "Memutuskan untuk saling mengikat komitmen dalam ikatan kasih yang lebih serius." },
      { tanggal: "2026", judul: "Lamaran & Niat Baik", deskripsi: "Mengutarakan niat suci di hadapan kedua keluarga besar untuk melangkah ke jenjang pernikahan." }
    ],
    rekening_pria: retroVintageFormData.rekening_pria && retroVintageFormData.rekening_pria.length > 0 ? retroVintageFormData.rekening_pria : [
      { bank: "BCA", nomor: "1234567890", atas_nama: "Bagus Setyawan" }
    ],
    rekening_wanita: retroVintageFormData.rekening_wanita && retroVintageFormData.rekening_wanita.length > 0 ? retroVintageFormData.rekening_wanita : [
      { bank: "Mandiri", nomor: "0987654321", atas_nama: "Kartika Ayu" }
    ],
    dresscode_warna: retroVintageFormData.dresscode_warna && retroVintageFormData.dresscode_warna.length > 0 ? retroVintageFormData.dresscode_warna : ["#F4EAD4", "#EADCB9", "#8B263E", "#2C1E16"],
    dresscode_desc: retroVintageFormData.dresscode_desc || "Disarankan mengenakan pakaian bernuansa Retro / Earthy Tone.",
    ucapan_terima_kasih: retroVintageFormData.ucapan_terima_kasih || "Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu."
  };

  return (
    <div className="flex h-[100dvh] w-full bg-bg transition-colors duration-400 font-sans overflow-hidden">
      
      {/* Left Column - Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col h-full overflow-y-auto overscroll-contain relative bg-bg-alt shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-10 border-r border-hairline">
        
        {/* Back Button Overlay */}
        <div className="absolute top-[24px] left-[24px] z-50">
          <Link href={`/templates/${id}`} className="inline-flex items-center text-[14.5px] font-medium text-ink-soft hover:text-ink transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Kembali
          </Link>
        </div>

        <div className="flex-1 p-[clamp(24px,5vw,48px)] flex flex-col justify-center relative">
          {isIvoryLine ? (
            <IvoryLineForm 
              template={template} 
              formData={ivoryLineFormData} 
              setFormData={setIvoryLineFormData} 
              handleChange={handleIvoryLineChange}
              sessionId={sessionId}
            />
          ) : isMemoryLane ? (
            <MemoryLaneForm
              template={template}
              formData={memoryLaneFormData}
              setFormData={setMemoryLaneFormData}
              handleChange={handleMemoryLaneChange}
              sessionId={sessionId}
            />
          ) : isFolioBloom ? (
            <FolioBloomForm
              template={template}
              formData={folioBloomFormData}
              setFormData={setFolioBloomFormData}
              handleChange={handleFolioBloomChange}
              sessionId={sessionId}
            />
          ) : isCelestialJourney ? (
            <CelestialJourneyForm
              template={template}
              formData={celestialJourneyFormData}
              setFormData={setCelestialJourneyFormData}
              handleChange={handleCelestialJourneyChange}
              sessionId={sessionId}
            />
          ) : isKisahtanggalku ? (
            <KisahtanggalkuForm
              template={template}
              formData={kisahtanggalkuFormData}
              setFormData={setKisahtanggalkuFormData}
              handleChange={handleKisahtanggalkuChange}
              sessionId={sessionId}
            />
          ) : isSunnySlab ? (
            <SunnySlabForm
              template={template}
              formData={sunnySlabFormData}
              setFormData={setSunnySlabFormData}
              handleChange={handleSunnySlabChange}
              sessionId={sessionId}
            />
          ) : isRetroVintage ? (
            <RetroVintageForm
              template={template}
              formData={retroVintageFormData}
              setFormData={setRetroVintageFormData}
              handleChange={handleRetroVintageChange}
              sessionId={sessionId}
            />
          ) : isMagicalLanterns ? (
            <MagicalLanternsForm 
              template={template} 
              formData={lanternsFormData} 
              setFormData={setLanternsFormData} 
              handleChange={handleLanternsChange}
              sessionId={sessionId}
            />
          ) : (
            <div className="flex items-center justify-center h-full text-ink-soft">
              Form tidak ditemukan untuk template ini.
            </div>
          )}
        </div>
      </div>

      {/* Right Column - Preview Area (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-black overflow-hidden border-l border-hairline h-full items-center justify-center">
        
        {/* Render actual template in full width/height inside frame container */}
        <div className="w-full h-full relative overflow-y-auto overscroll-contain mx-auto max-w-[480px] transform-gpu">
          {isIvoryLine ? (
            <IvoryLineTemplate data={mappedIvoryLineData} isPreview={true} isBuilder={true} />
          ) : isMemoryLane ? (
            <MemoryLaneTemplate data={memoryLaneFormData} isPreview={true} isBuilder={true} />
          ) : isFolioBloom ? (
            <FolioBloomTemplate data={folioBloomFormData} isPreview={true} isBuilder={true} />
          ) : isCelestialJourney ? (
            <CelestialJourneyTemplate data={celestialJourneyFormData} isPreview={true} isBuilder={true} />
          ) : isKisahtanggalku ? (
            <KisahtanggalkuTemplate data={kisahtanggalkuFormData} isPreview={true} isBuilder={true} />
          ) : isSunnySlab ? (
            <SunnySlabTemplate data={mappedSunnySlabData} isPreview={true} isBuilder={true} />
          ) : isRetroVintage ? (
            <RetroVintageTemplate data={mappedRetroVintageData} isPreview={true} isBuilder={true} />
          ) : isMagicalLanterns ? (
            <MagicalLanternsTemplate data={mappedLanternsData} isPreview={true} isBuilder={true} />
          ) : (
            <div className="flex items-center justify-center h-full text-cream-text">
              Template tidak ditemukan
            </div>
          )}
        </div>
        
        {/* Clean pill badge for template title */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
          <p className="text-white text-[11px] font-bold uppercase tracking-widest">{template.nama} • Live Preview</p>
        </div>
      </div>
      
    </div>
  );
}
