"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Image as ImageIcon, MapPin, Clock, MessageSquareHeart, Music, Eye, ArrowLeft, Loader2 } from "lucide-react";
import { supabaseClient } from "@/lib/supabase";

const iconMap = {
  "image": ImageIcon,
  "map-pin": MapPin,
  "clock": Clock,
  "message-square-heart": MessageSquareHeart,
  "music": Music,
};

export default function TemplateDetailPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const { data, error } = await supabaseClient
          .from("templates")
          .select("*")
          .eq("id", id)
          .single();

        if (error || !data) {
          setError(true);
        } else {
          setTemplate(data);
        }
      } catch (err) {
        console.error("Failed to fetch template:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchTemplate();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg transition-colors duration-400 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-berry dark:text-pink" />
      </div>
    );
  }

  if (error || !template) {
    notFound();
  }

  const categoryLabel = template.kategori === "undangan" ? "Undangan Pernikahan" : "Kartu Ucapan";

  // Dynamic fallback for description since Supabase might not have it
  const description = template.kategori === "ucapan" 
    ? "Desain kartu ucapan interaktif untuk menyampaikan pesan hangat Anda."
    : "Desain undangan pernikahan digital yang elegan dan mudah dibagikan.";

  // Dynamic fallback for features based on fields_config or default
  const defaultFeatures = template.kategori === "ucapan" ? [
    { id: 1, label: "Pesan & Harapan", icon: "message-square-heart" },
    { id: 2, label: "Galeri Foto", icon: "image" },
    { id: 3, label: "Background Music", icon: "music" }
  ] : [
    { id: 1, label: "Galeri Foto & Video", icon: "image" },
    { id: 2, label: "Navigasi Lokasi (Maps)", icon: "map-pin" },
    { id: 3, label: "Hitung Mundur", icon: "clock" },
    { id: 4, label: "Buku Tamu / RSVP", icon: "message-square-heart" },
  ];

  return (
    <div className="min-h-screen bg-bg transition-colors duration-400 pt-[clamp(32px,6vw,56px)] pb-[clamp(72px,10vw,132px)]">
      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)]">
        
        {/* Back Link */}
        <div className="mb-[clamp(32px,5vw,48px)]">
          <Link href="/templates" className="inline-flex items-center gap-[8px] text-ink-soft hover:text-ink transition-colors text-[14.5px] font-medium group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Kembali ke Galeri
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-[clamp(40px,7vw,80px)] items-start">
          
          {/* Left Column - Image */}
          <div className="w-full lg:w-1/2 lg:sticky lg:top-32 relative">
            <div className="relative w-full aspect-[3/4] rounded-[4px_60px_4px_4px] overflow-hidden shadow-[var(--shadow-photo)] border-[6px] border-photo-frame bg-photo-frame">
              {template.thumbnail_url ? (
                <Image 
                  src={template.thumbnail_url} 
                  alt={template.nama} 
                  fill 
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-ink-soft/50 font-sans text-sm bg-bg">
                  <ImageIcon className="w-12 h-12 mb-2 opacity-30" />
                  No Thumbnail
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column - Details */}
          <div className="w-full lg:w-1/2 space-y-[clamp(32px,5vw,48px)]">
            
            <div className="space-y-[16px]">
              <div className="inline-flex items-center px-[10px] py-[6px] bg-bg-alt text-[10.5px] font-bold tracking-[0.06em] text-berry uppercase dark:bg-pink/10 dark:text-pink border border-hairline/50 rounded-[4px]">
                {template.fields_config?.subCategory || categoryLabel}
              </div>
              <h1 className="text-[clamp(2.6rem,5vw,3.6rem)] font-serif italic text-ink leading-[1.08]">
                {template.nama}
              </h1>
              <p className="text-[1.8rem] font-sans font-semibold text-berry dark:text-pink">
                Rp {Number(template.harga).toLocaleString("id-ID")}
              </p>
            </div>
            
            <div className="text-ink-soft leading-[1.6] text-[16.5px] max-w-[50ch]">
              <p>{description}</p>
            </div>
            
            <hr className="border-hairline" />
            
            <div className="space-y-[24px]">
              <h3 className="font-serif text-[1.6rem] text-ink font-medium">Yang Akan Anda Dapatkan:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                {defaultFeatures.map((feature) => {
                  const Icon = iconMap[feature.icon] || ImageIcon;
                  return (
                    <li key={feature.id} className="flex items-center gap-[14px] bg-bg-alt p-[16px] rounded-[6px] border border-hairline shadow-sm">
                      <div className="shrink-0 text-berry dark:text-pink">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[14.5px] font-medium text-ink leading-[1.4]">
                        {feature.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="pt-[16px] flex flex-col sm:flex-row gap-[16px]">
              <Link href={`/buat/${template.id}`} className="w-full sm:w-auto">
                <button className="flex items-center justify-center gap-[10px] w-full px-[36px] py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] bg-pink-btn-bg text-cream-text shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)]">
                  Buat dengan Template Ini
                </button>
              </Link>
              <a href={`/preview/${template.id}`} target="_blank" rel="noreferrer" className="w-full sm:w-auto">
                <button className="flex items-center justify-center gap-[10px] w-full px-[36px] py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] bg-transparent text-berry dark:text-ink border-[1.5px] border-berry dark:border-ink-soft transition-all duration-350 hover:bg-berry hover:text-cream-text dark:hover:bg-pink dark:hover:text-pink-btn-text dark:hover:border-pink">
                  <Eye className="w-4 h-4" /> Lihat Preview
                </button>
              </a>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
