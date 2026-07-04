"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Image as ImageIcon, MapPin, Clock, MessageSquareHeart, Music, Eye } from "lucide-react";
import { dummyTemplates } from "@/lib/dummy-data";

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
  
  const template = dummyTemplates.find((t) => t.id === id);

  if (!template) {
    notFound();
  }

  const categoryLabel = template.category === "undangan" ? "Undangan Pernikahan" : "Kartu Ucapan";

  return (
    <div className="min-h-screen bg-bg-base pt-24 pb-16">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/templates" className="text-text-muted hover:text-brand transition-colors text-sm font-medium">
            ← Kembali ke Galeri
          </Link>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Image */}
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white lg:sticky lg:top-28">
            <div className="relative aspect-[3/4] w-full bg-brand-light/20">
              <Image 
                src={template.image} 
                alt={template.title} 
                fill 
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
          
          {/* Right Column - Details */}
          <div className="w-full lg:w-1/2 space-y-8">
            
            <div className="space-y-4">
              <div className="inline-flex items-center rounded-xl border px-3 py-1 text-[10px] uppercase tracking-wider font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 bg-brand-light/50 text-brand border-brand/20">
                {categoryLabel}
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-text-main leading-tight">
                {template.title}
              </h1>
              <p className="text-2xl font-serif text-brand">
                Rp {template.price.toLocaleString("id-ID")}
              </p>
            </div>
            
            <div className="text-text-muted leading-relaxed">
              <p>{template.description}</p>
            </div>
            
            <hr className="border-border-subtle" />
            
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-text-main font-medium">Yang Akan Anda Dapatkan:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {template.features && template.features.map((feature) => {
                  const Icon = iconMap[feature.icon] || ImageIcon; // Fallback to Image icon
                  return (
                    <li key={feature.id} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-border-subtle/50 shadow-sm">
                      <div className="shrink-0 bg-brand-light/30 p-2 rounded-lg">
                        <Icon className="w-5 h-5 text-brand" />
                      </div>
                      <span className="text-sm font-medium text-text-main">
                        {feature.label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            <div className="pt-6 space-y-4">
              <Link href={`/buat/${template.id}`} className="block">
                <button className="group flex items-center justify-center gap-2 bg-brand text-white px-10 w-full h-14 rounded-full text-base font-medium hover:bg-brand/90 transition-all duration-300 shadow-md shadow-brand/20 hover:shadow-lg hover:-translate-y-0.5">
                  Buat dengan Template Ini
                </button>
              </Link>
              <a href={`/preview/${template.id}`} target="_blank" rel="noreferrer" className="block">
                <button className="flex items-center justify-center gap-2 px-10 w-full h-14 bg-white/80 backdrop-blur-sm border border-border-subtle text-brand rounded-full hover:bg-brand-light/50 transition-all duration-300 text-base font-medium shadow-sm hover:-translate-y-0.5">
                  <Eye className="w-5 h-5" /> Lihat Preview
                </button>
              </a>
            </div>
            
          </div>
          
        </div>
      </div>
    </div>
  );
}
