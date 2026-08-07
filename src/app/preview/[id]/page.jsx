"use client";

import { use } from "react";
import Link from "next/link";
import { ChevronLeft, Smartphone } from "lucide-react";
import { dummyWeddingPhotos } from "@/lib/dummy-data";
import MagicalLanternsTemplate from "@/components/templates/renderers/magical-lanterns";
import IvoryLineTemplate from "@/components/templates/renderers/ivory-line";
import MemoryLaneTemplate from "@/components/templates/renderers/memory-lane";
import FolioBloomTemplate from "@/components/templates/renderers/folio-bloom";
import CelestialJourneyTemplate from "@/components/templates/renderers/celestial-journey";
import KisahtanggalkuTemplate from "@/components/templates/renderers/kisahtanggalku";
import SunnySlabTemplate from "@/components/templates/renderers/sunny-slab";

export default function PreviewPage({ params }) {
  const resolvedParams = use(params);
  const { id } = resolvedParams;

  const isMagicalLanterns = id === "b61395f5-c1ad-486f-add9-cac4bb13d314" || id === "cosmic-hearts";
  const isIvoryLine = id === "8fd87cbb-3273-442b-b9cd-de875f3415ad";
  const isMemoryLane = id === "45f4eb4d-ddab-410d-9104-401e2147f24e";
  const isFolioBloomActual = id === "50e18d6a-5c21-4f18-a6d1-123456789abc";
  const isCelestialJourney = id === "12345678-abcd-ef00-1234-567890abcdef";
  const isKisahtanggalku = id === "99999999-9999-9999-9999-999999999999";
  const isSunnySlab = id === "123e4567-e89b-12d3-a456-426614174000" || id === "sunny-slab";

  let previewData = {};

  if (isMagicalLanterns) {
    previewData = {
      receiverName: "Juliet",
      senderName: "Romeo",
      greetingText: "Happy Birthday, Juliet! Wishing you all the love and happiness in the world.",
      photos: [
        "/foto-dummy-ucapan/Anh%20(1).jpg",
        "/foto-dummy-ucapan/Anh%20(2).jpg",
        "/foto-dummy-ucapan/Anh%20(3).jpg"
      ],
      wishes: [
        { text: "Dari Romeo yang selalu menyayangimu." },
        { text: "Wishing you health and happiness." },
        { text: "Another year of amazing adventures." },
        { text: "Happy birthday to someone special." },
        { text: "Let's celebrate this wonderful day!" },
      ],
      finalQuote: `"To the world you may be one person,\nbut to one person you are the world."`,
      finalGreeting: "Once again, Happy Birthday! Enjoy your special day.",
      closingRemark: "With lots of love,"
    };
  } else if (isMemoryLane) {
    previewData = {
      nama_pasangan: "Ardi & Nisa",
      pesan_pembuka: "Di bawah langit malam yang tenang, kami mengikat janji untuk melangkah bersama.",
      foto_galeri: [
        "/foto-dummy-undangan/10467.jpg",
        "/foto-dummy-undangan/11212.jpg",
        "/foto-dummy-undangan/11597.jpg",
        "/foto-dummy-undangan/16666.jpg",
        "/foto-dummy-undangan/338.jpg",
        "/foto-dummy-undangan/9877.jpg"
      ],
      ucapan_penutup: "Terima kasih atas doa dan restu yang telah diberikan.",
      kutipan: "Cinta bukan tentang menatap satu sama lain, tetapi melihat ke arah yang sama bersama-sama.",
      musik_url: "https://www.youtube.com/watch?v=YOUR_AUDIO_ID",
    };
  } else if (isCelestialJourney) {
    previewData = {
      nama_penerima: "Nisa Maharani",
      nama_pengirim: "Kevin Pratama",
      pesan: "Terima kasih sudah selalu menjadi pendengar yang baik.\nPerjalanan kita masih panjang, mari kita ukir lebih banyak kenangan indah.\nSemoga setiap langkahmu selalu dipenuhi dengan kebahagiaan.",
      foto_urls: [
        "/foto-dummy-ucapan/Anh%20(1).jpg",
        "/foto-dummy-ucapan/Anh%20(2).jpg",
        "/foto-dummy-ucapan/Anh%20(3).jpg"
      ]
    };
  } else {
    // Default dummy data for older templates
    previewData = {
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
      // Wedding specific
      nama_panggilan_pria: "Bima",
      nama_panggilan_wanita: "Ayu",
      nama_lengkap_pria: "Bima Aryasetya, S.T.",
      nama_ayah_pria: "Bapak Budi Santoso",
      nama_ibu_pria: "Ibu Siti Aminah",
      nama_lengkap_wanita: "Ayu Lestari, S.E.",
      nama_ayah_wanita: "Bapak Joko Widodo",
      nama_ibu_wanita: "Ibu Iriana",
      foto_urls: dummyWeddingPhotos.foto_urls,
      foto_cover: dummyWeddingPhotos.foto_cover,
      foto_pria: dummyWeddingPhotos.foto_pria,
      foto_wanita: dummyWeddingPhotos.foto_wanita,
      tanggal_acara: "2027-02-14",
      waktu_acara: "08:00",
      quote_text: "Cinta yang tumbuh dari niat baik akan selalu menemukan jalan untuk saling menguatkan, dalam suka maupun duka.",
      quote_author: "Doa & Harapan Kami",
      acara_akad_nama: "Akad Nikah",
      acara_akad_tanggal: "Sabtu, 14 Februari 2027",
      acara_akad_jam: "08:00 - 10:00 WIB",
      acara_akad_lokasi: "Masjid Raya Jakarta, Jl. Sudirman No. 1",
      acara_akad_maps_url: "https://maps.google.com/?q=Jakarta",
      acara_resepsi_nama: "Resepsi",
      acara_resepsi_tanggal: "Sabtu, 14 Februari 2027",
      acara_resepsi_jam: "11:00 - 14:00 WIB",
      acara_resepsi_lokasi: "Gedung Serbaguna Jakarta",
      acara_resepsi_maps_url: "https://maps.google.com/?q=Jakarta",
      youtube_url: "rtOvBOTyX00",
      live_youtube_url: "https://youtube.com/live/dummy_link",
      live_zoom_url: "https://zoom.us/j/123456789",
      live_meet_url: "https://meet.google.com/abc-defg-hij",
      dresscode_warna: ["#F7F2E9", "#C9D9E8", "#111111"],
      dresscode_desc: "Mohon kenakan pakaian dengan warna yang senada dengan tema kami.",
      ucapan_terima_kasih: "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu untuk kami.",
      love_story: [
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
      wishes: [
        {
          nama: "Andi & Keluarga",
          pesan: "Selamat menempuh hidup baru! Semoga menjadi keluarga yang sakinah, mawaddah, warahmah."
        },
        {
          nama: "Siska",
          pesan: "Lancar sampai hari H yaa! Bahagia selalu untuk kalian berdua."
        },
        {
          nama: "Budi",
          pesan: "Congrats bro! Akhirnya melepas masa lajang juga. Doa terbaik buat kalian."
        }
      ],
      rekening_pria: [
        {
          bank: "BCA",
          nomor: "1234567890",
          atas_nama: "Bima Aryasetya"
        }
      ],
      rekening_wanita: [
        {
          bank: "Mandiri",
          nomor: "0987654321",
          atas_nama: "Ayu Lestari"
        }
      ]
    };
  }


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
        <div className="w-full md:w-[414px] md:h-[896px] bg-white md:rounded-[3rem] md:border-[8px] border-stone-800 md:shadow-2xl overflow-hidden overflow-y-auto relative custom-scrollbar transform-gpu">
          {isIvoryLine ? (
            <IvoryLineTemplate data={previewData} isPreview={true} />
          ) : isMemoryLane ? (
            <MemoryLaneTemplate data={previewData} />
          ) : isFolioBloomActual ? (
            <FolioBloomTemplate data={previewData} />
          ) : isCelestialJourney ? (
            <CelestialJourneyTemplate data={previewData} />
          ) : isKisahtanggalku ? (
            <KisahtanggalkuTemplate data={previewData} isPreview={true} />
          ) : isSunnySlab ? (
            <SunnySlabTemplate data={previewData} isPreview={true} />
          ) : isMagicalLanterns ? (
            <MagicalLanternsTemplate data={previewData} isPreview={true} />
          ) : (
            <div className="flex items-center justify-center h-full bg-stone-900 text-white">Template tidak ditemukan</div>
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
