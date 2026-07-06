"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabase";
import { ChevronLeft, Loader2 } from "lucide-react";
import WeddingForm from "@/components/forms/WeddingForm";
import MagicalLanternsForm from "@/components/forms/MagicalLanternsForm";
import MagicalLanternsTemplate from "@/components/templates/renderers/magical-lanterns";
import ClassicTemplate from "@/components/templates/renderers/classic";

export default function BuilderPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    senderName: "",
    receiverName: "",
    greetingText: "",
    photos: [null, null, null],
    wishes: [
      { message: "" },
      { message: "" },
      { message: "" },
      { message: "" },
      { message: "" }
    ],
    finalQuote: "",
    finalGreeting: ""
  });

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

  const isMagicalLanterns = id === "b61395f5-c1ad-486f-add9-cac4bb13d314";

  // Handlers for generic changes
  const handleLanternsChange = (e) => {
    const { name, value } = e.target;
    setLanternsFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWeddingChange = (e) => {
    const { name, value } = e.target;
    setWeddingFormData(prev => ({ ...prev, [name]: value }));
  };

  // Map MagicalLanterns form data to the shape expected by the template
  const mappedLanternsData = {
    id: "live-preview",
    receiverName: lanternsFormData.receiverName || "Penerima",
    greetingText: lanternsFormData.greetingText || "Ketik pesan pembuka di form...",
    photos: lanternsFormData.photos.filter(p => p !== null).length > 0 
      ? lanternsFormData.photos.filter(p => p !== null) 
      : undefined,
    wishes: lanternsFormData.wishes.some(w => w.message) 
      ? lanternsFormData.wishes.filter(w => w.message).map(w => ({ text: w.message }))
      : undefined,
    finalQuote: lanternsFormData.finalQuote || `"To the world you may be one person,\nbut to one person you are the world."`,
    finalGreeting: lanternsFormData.finalGreeting || "Ketik pesan penutup di form...",
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

  return (
    <div className="flex min-h-screen bg-bg transition-colors duration-400 font-sans overflow-hidden">
      
      {/* Left Column - Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col h-screen overflow-y-auto relative bg-bg-alt shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-10 border-r border-hairline">
        
        {/* Back Button Overlay */}
        <div className="absolute top-[24px] left-[24px] z-50">
          <Link href={`/templates/${id}`} className="inline-flex items-center text-[14.5px] font-medium text-ink-soft hover:text-ink transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Kembali
          </Link>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-[clamp(24px,5vw,48px)] flex flex-col justify-center relative">
          {isMagicalLanterns ? (
            <MagicalLanternsForm 
              template={template} 
              formData={lanternsFormData} 
              setFormData={setLanternsFormData} 
              handleChange={handleLanternsChange} 
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
      <div className="hidden lg:flex w-1/2 relative bg-black overflow-hidden border-l border-hairline">
        
        {/* Render actual template in full width/height */}
        <div className="w-full h-full relative overflow-hidden mx-auto max-w-[480px]">
          {isMagicalLanterns ? (
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
