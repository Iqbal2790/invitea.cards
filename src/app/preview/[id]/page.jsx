import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";
import LiveUndangan from "@/components/templates/live/LiveUndangan";
import LiveUcapan from "@/components/templates/live/LiveUcapan";
import { DUMMY_TEMPLATES } from "@/lib/templates-data";

export async function generateMetadata(props) {
  const params = await props.params;
  return {
    title: `Preview Template - Invitea`,
  };
}

export default async function PreviewPage(props) {
  const params = await props.params;
  const { id } = params;

  let template = null;

  try {
    const { data } = await supabase
      .from('templates')
      .select('*')
      .eq('id', id)
      .single();
    if (data) template = data;
  } catch (error) {}

  if (!template) {
    template = DUMMY_TEMPLATES.find(t => t.id === id);
  }

  if (!template) {
    notFound();
  }

  const isUcapan = (template.kategori || template.category || "").toLowerCase().includes("ucapan");

  // Siapkan dummy data untuk preview agar terlihat cantik
  const dummyDataContent = isUcapan ? {
    nama_pengirim: "Budi & Keluarga",
    nama_penerima: "Tamu Undangan Terhormat",
    momen: "Hari Raya Idul Fitri",
    pesan_ucapan: "Taqabbalallahu minna wa minkum. Mohon maaf lahir dan batin atas segala khilaf dan salah.",
    youtube_url: "https://www.youtube.com/watch?v=1y6smkh6c-0"
  } : {
    pria_lengkap: "Romeo Montague",
    pria_panggilan: "Romeo",
    pria_orangtua: "Bapak Montague & Ibu Montague",
    wanita_lengkap: "Juliet Capulet",
    wanita_panggilan: "Juliet",
    wanita_orangtua: "Bapak Capulet & Ibu Capulet",
    tanggal_pernikahan: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0], // 1 bulan dari sekarang
    acara1_nama: "Akad Nikah",
    acara1_tanggal: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    acara1_jam: "08:00 - 10:00",
    acara1_lokasi: "Masjid Raya Indah, Jakarta",
    acara1_maps_url: "https://maps.google.com",
    acara2_nama: "Resepsi",
    acara2_tanggal: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString().split('T')[0],
    acara2_jam: "11:00 - Selesai",
    acara2_lokasi: "Gedung Serbaguna Mewah, Jakarta",
    acara2_maps_url: "https://maps.google.com",
    cerita_cinta: "Berawal dari pandangan pertama di bangku sekolah, hingga akhirnya kami memutuskan untuk mengikat janji suci ini bersama.",
    youtube_url: "https://www.youtube.com/watch?v=1y6smkh6c-0"
  };

  const dummyFotoUrls = [
    "/template-dummy.png",
    "/template-dummy.png",
    "/template-dummy.png",
    "/template-dummy.png"
  ];

  return (
    <main className="w-full min-h-screen relative">
      <div className="absolute top-4 left-4 z-50 bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-medium shadow-xl border border-white/20">
        Mode Pratinjau (Preview)
      </div>
      
      {isUcapan ? (
        <LiveUcapan 
          template={template} 
          dataContent={dummyDataContent} 
          fotoUrls={dummyFotoUrls} 
        />
      ) : (
        <LiveUndangan 
          template={template} 
          dataContent={dummyDataContent} 
          fotoUrls={dummyFotoUrls} 
        />
      )}
    </main>
  );
}
