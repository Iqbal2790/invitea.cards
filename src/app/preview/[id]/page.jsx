"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Smartphone } from "lucide-react";
import { dummyWeddingPhotos } from "@/lib/dummy-data";
import ClassicTemplate from "@/components/templates/renderers/classic";
import MagicalLanternsTemplate from "@/components/templates/renderers/magical-lanterns";
import IvoryLineTemplate from "@/components/templates/renderers/ivory-line";

export default function PreviewPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  // Dummy data specifically for Preview Mode
  const previewData = {
    groom: "Romeo",
    bride: "Juliet",
    eventDate: "2026-12-24T08:00",
    locationName: "Gedung Pernikahan Klasik",
    locationAddress: "Jl. Sudirman No. 1, Jakarta Pusat",
    lanternsCount: 30,
    wishLanternsCount: 15,
    wishes: [
      { message: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah.", name: "Budi & Keluarga" },
      { message: "Happy Wedding Romeo & Juliet! Wishing you a lifetime of love and happiness.", name: "Siska" },
      { message: "Lancar sampai hari H ya! Gak nyangka akhirnya nikah juga kalian.", name: "Rendi" }
    ],
    gallery: [
      { src: "/template-dummy.png" }
    ],
    // Ivory Line specific
    nama_panggilan_pria: "Romeo",
    nama_panggilan_wanita: "Juliet",
    nama_lengkap_pria: "Romeo Montague",
    nama_lengkap_wanita: "Juliet Capulet",
    acara1_nama: "Akad Nikah",
    acara1_tanggal: "2026-12-24",
    acara1_jam: "08:00",
    acara1_lokasi: "Masjid Raya Jakarta",
    foto_urls: dummyWeddingPhotos.foto_urls,
    foto_cover: dummyWeddingPhotos.foto_cover,
    foto_pria: dummyWeddingPhotos.foto_pria,
    foto_wanita: dummyWeddingPhotos.foto_wanita,
    bank_accounts: [{ bank: "BCA", nomor: "1234567890", nama: "Romeo Montague" }],
    youtube_url: "",
    cerita_cinta: "Pertemuan kami berawal dari sebuah kebetulan sederhana di musim hujan lima tahun yang lalu. Dari perbincangan singkat tentang buku favorit, berlanjut menjadi diskusi panjang, hingga akhirnya kami menyadari bahwa kami saling melengkapi. Setelah melewati berbagai musim kehidupan bersama, hari ini kami memutuskan untuk mengikat janji suci dan memulai babak baru dalam cerita cinta kami.",
    acara1_maps_url: "https://maps.google.com/?q=Jakarta",
    acara2_nama: "Resepsi",
    acara2_tanggal: "2026-12-24",
    acara2_jam: "11:00",
    acara2_lokasi: "Gedung Serbaguna, Jakarta",
    acara2_maps_url: "https://maps.google.com/?q=Jakarta"
  };

  const isMagicalLanterns = id === "b61395f5-c1ad-486f-add9-cac4bb13d314";
  const isIvoryLine = id === "8fd87cbb-3273-442b-b9cd-de875f3415ad";

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
          {isIvoryLine ? (
            <IvoryLineTemplate data={previewData} isPreview={true} />
          ) : isMagicalLanterns ? (
            <MagicalLanternsTemplate data={previewData} isPreview={true} />
          ) : (
            <ClassicTemplate data={previewData} isPreview={true} />
          )}
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
