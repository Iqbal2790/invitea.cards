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
      <div className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <Link 
          href={`/templates/${id}`}
          className="inline-flex items-center text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Kembali
        </Link>
        
        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-stone-400">
          <Smartphone className="w-4 h-4" /> Mode Pratinjau (Mobile View)
        </div>

        <Link 
          href={`/buat/${id}`}
          className="bg-brand text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-brand/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
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
