"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Smartphone } from "lucide-react";
import ClassicTemplate from "@/components/templates/renderers/classic";

export default function PreviewPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  // Dummy data specifically for Preview Mode
  const previewData = {
    groom: "Romeo",
    bride: "Juliet",
    eventDate: "2026-12-24T08:00",
    locationName: "Gedung Pernikahan Klasik",
    locationAddress: "Jl. Sudirman No. 1, Jakarta Pusat"
  };

  return (
    <div className="min-h-screen bg-stone-900 flex flex-col font-sans">
      
      {/* Floating Preview Bar (Desktop/Tablet mostly) */}
      <div className="bg-header-bg backdrop-blur-[10px] border-b border-header-border px-4 py-3 flex items-center justify-between sticky top-0 z-50 transition-colors duration-400">
        <Link 
          href={`/templates/${id}`}
          className="inline-flex items-center text-[14.5px] font-medium text-ink-soft hover:text-ink transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Kembali
        </Link>
        
        <div className="hidden md:flex items-center gap-2 text-[14px] font-medium text-ink-soft">
          <Smartphone className="w-4 h-4" /> Mode Pratinjau (Mobile View)
        </div>

        <Link 
          href={`/buat/${id}`}
          className="inline-flex items-center justify-center px-[24px] py-[10px] rounded-full font-sans font-semibold text-[14px] tracking-[0.01em] bg-pink-btn-bg text-cream-text shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)]"
        >
          Gunakan Template Ini
        </Link>
      </div>

      {/* Template Container (Simulating Mobile Screen on Desktop) */}
      <div className="flex-1 w-full flex justify-center bg-stone-900 py-0 md:py-8 overflow-y-auto">
        <div className="w-full md:w-[414px] md:h-[896px] bg-white md:rounded-[3rem] md:border-[8px] border-stone-800 md:shadow-2xl overflow-hidden overflow-y-auto relative custom-scrollbar">
          <ClassicTemplate data={previewData} isPreview={true} />
        </div>
      </div>
      
      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera in the mobile mockup */
        .custom-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .custom-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
      `}</style>
    </div>
  );
}
