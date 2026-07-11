"use client";

import { useState, use, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabase";
import { dummyWeddingPhotos } from "@/lib/dummy-data";
import { ChevronLeft, Loader2 } from "lucide-react";
import WeddingForm from "@/components/forms/WeddingForm";
import MagicalLanternsForm from "@/components/forms/MagicalLanternsForm";
import MagicalLanternsTemplate from "@/components/templates/renderers/magical-lanterns";
import ClassicTemplate from "@/components/templates/renderers/classic";
import IvoryLineForm from "@/components/forms/IvoryLineForm";
import IvoryLineTemplate from "@/components/templates/renderers/ivory-line";

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

  // Lifted state for WeddingForm
  const [weddingFormData, setWeddingFormData] = useState({
    groomName: "",
    brideName: "",
    date: "",
    time: "",
    location: "",
    message: ""
  });

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

  const isMagicalLanterns = id === "b61395f5-c1ad-486f-add9-cac4bb13d314" || template?.nama === "Magical Lanterns";
  const isIvoryLine = id === "8fd87cbb-3273-442b-b9cd-de875f3415ad" || template?.nama === "Ivory Line";

  // Handlers for generic changes
  const handleLanternsChange = (e) => {
    const { name, value } = e.target;
    setLanternsFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWeddingChange = (e) => {
    const { name, value } = e.target;
    setWeddingFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIvoryLineChange = (e) => {
    const { name, value } = e.target;
    setIvoryLineFormData(prev => ({ ...prev, [name]: value }));
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

  // Map Wedding form data to the shape expected by the classic template
  const mappedWeddingData = {
    id: "live-preview",
    nama_pengantin: `${weddingFormData.groomName || "Romeo"} & ${weddingFormData.brideName || "Juliet"}`,
    tanggal: weddingFormData.date || new Date().toISOString(),
    waktu: weddingFormData.time || "09:00",
    lokasi: weddingFormData.location || "Lokasi Acara",
    pesan: weddingFormData.message || "Pesan undangan..."
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
          ) : isMagicalLanterns ? (
            <MagicalLanternsForm 
              template={template} 
              formData={lanternsFormData} 
              setFormData={setLanternsFormData} 
              handleChange={handleLanternsChange}
              sessionId={sessionId}
            />
          ) : (
            <WeddingForm 
              template={template} 
              formData={weddingFormData} 
              setFormData={setWeddingFormData} 
              handleChange={handleWeddingChange} 
            />
          )}
        </div>
      </div>

      {/* Right Column - Preview Area (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-black overflow-hidden border-l border-hairline h-full">
        
        {/* Render actual template in full width/height */}
        <div className="w-full h-full relative overflow-y-auto overscroll-contain mx-auto max-w-[480px]">
          {isIvoryLine ? (
            <IvoryLineTemplate data={mappedIvoryLineData} isPreview={true} isBuilder={true} />
          ) : isMagicalLanterns ? (
            <MagicalLanternsTemplate data={mappedLanternsData} isPreview={true} isBuilder={true} />
          ) : (
            <ClassicTemplate data={mappedWeddingData} isPreview={true} />
          )}
        </div>
        
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-[32px] pt-[100px] pointer-events-none z-20">
          <h3 className="font-serif italic text-cream-text text-[2rem] font-medium mb-[4px] leading-none">{template.nama}</h3>
          <p className="text-cream-text/70 text-[13px] uppercase tracking-wider font-semibold">Live Preview</p>
        </div>
      </div>
      
    </div>
  );
}
