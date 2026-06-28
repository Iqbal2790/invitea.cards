"use client";
import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WaxSealInteraction from "@/components/wedding/classic/WaxSealInteraction";
import Cover from "@/components/wedding/classic/Cover";
import Quote from "@/components/wedding/classic/Quote";
import Profiles from "@/components/wedding/classic/Profiles";
import Events from "@/components/wedding/classic/Events";
import Gallery from "@/components/wedding/classic/Gallery";
import RSVP from "@/components/wedding/classic/RSVP";
import Footer from "@/components/wedding/classic/Footer";
import AudioPlayer from "@/components/wedding/classic/AudioPlayer";

export default function WeddingClassicWrapper({ orderData }) {
  const content = orderData.data_content || {};
  const fotos = orderData.foto_urls || [];
  
  const formatDate = (dateString) => {
    if (!dateString) return "TBA";
    return new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  const data = {
    mempelai: {
      pria: { 
        nama_lengkap: content.nama_pria || "Mempelai Pria", 
        nama_panggilan: (content.nama_pria || "Pria").split(' ')[0], 
        nama_ayah: "Keluarga Bapak", 
        nama_ibu: "Keluarga Ibu", 
        ig_username: "", 
        foto: fotos[0] || "/placeholder-wedding.jpg" 
      },
      wanita: { 
        nama_lengkap: content.nama_wanita || "Mempelai Wanita", 
        nama_panggilan: (content.nama_wanita || "Wanita").split(' ')[0], 
        nama_ayah: "Keluarga Bapak", 
        nama_ibu: "Keluarga Ibu", 
        ig_username: "", 
        foto: fotos[1] || fotos[0] || "/placeholder-wedding.jpg" 
      }
    },
    acara: {
      akad: {
        nama: content.acara1_nama || "Akad Nikah",
        hari_tanggal: formatDate(content.acara1_tanggal),
        waktu: content.acara1_jam ? `${content.acara1_jam} WIB` : "TBA",
        lokasi_nama: content.acara1_lokasi || "TBA",
        lokasi_alamat: "",
        google_maps_url: content.acara1_maps_url || ""
      },
      resepsi: content.acara2_nama ? {
        nama: content.acara2_nama,
        hari_tanggal: formatDate(content.acara2_tanggal),
        waktu: content.acara2_jam ? `${content.acara2_jam} WIB` : "TBA",
        lokasi_nama: content.acara2_lokasi || "TBA",
        lokasi_alamat: "",
        google_maps_url: content.acara2_maps_url || ""
      } : null
    },
    kutipan: {
      teks: "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang.",
      sumber: "QS. Ar-Rum: 21"
    },
    galeri: fotos.slice(2).length > 0 ? fotos.slice(2) : (fotos.length > 0 ? fotos : []),
    musik_url: content.youtube_url || "https://www.youtube.com/watch?v=2d_r8CEmrIc&list=PLU-xxn6VuPbq_CIx4OQvOZWN7ztHmRwSE&index=2",
    tema: {
      warna_utama: "#B76E79",
      warna_aksen: "#F4E1E1",
      warna_background: "#FAFAFA",
      font_heading: "Cormorant Garamond",
      font_body: "Montserrat"
    }
  };

  const [isUnsealed, setIsUnsealed] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!isUnsealed) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isUnsealed]);

  const handleUnseal = () => {
    setIsUnsealed(true);
    if (audioRef.current) {
      audioRef.current.play();
    }
  };

  return (
    <div className="bg-[#E5E5E5] min-h-screen">
      <div className="w-full max-w-md mx-auto min-h-screen shadow-2xl relative overflow-x-hidden bg-[#fafafa]">
        
        <AudioPlayer ref={audioRef} src={data.musik_url} isPlaying={isUnsealed} />

        <AnimatePresence>
          {!isUnsealed && (
            <motion.section 
              key="slide-seal"
              className="absolute top-0 inset-x-0 h-[100dvh] z-50 flex flex-col items-center justify-center bg-[#E5E5E5]"
              exit={{ opacity: 0, scale: 1.1, filter: "blur(5px)", transition: { duration: 1 } }}
            >
              <div className="absolute inset-x-0 top-0 h-[50dvh] bg-[#fafafa] rounded-b-[50%] shadow-lg border-b border-gray-200" />
              <div className="relative z-10 w-full flex justify-center">
                <WaxSealInteraction onBreak={handleUnseal} isBroken={isUnsealed} />
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        <Cover data={data} onOpen={() => {}} hideButton />
        
        <div className="relative z-10">
          <Quote data={data} />
          <Profiles data={data} />
          <Events data={data} />
          <Gallery data={data} />
          <RSVP />
          <Footer />
        </div>

      </div>
    </div>
  );
}
