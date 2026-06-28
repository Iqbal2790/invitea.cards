import { createClient } from "@supabase/supabase-js";
import WeddingClassicWrapper from "@/components/templates/live/WeddingClassicWrapper";
import GreetingMinimalistWrapper from "@/components/templates/live/GreetingMinimalistWrapper";
import LiveUndangan from "@/components/templates/live/LiveUndangan";
import LiveUcapan from "@/components/templates/live/LiveUcapan";
import CoverOverlay from "@/components/templates/live/CoverOverlay";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Peta Template ID ke Komponen Premium
const TEMPLATE_MAP = {
  'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11': 'wedding-classic',    // Elegance Rose
  'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22': 'greeting-minimalist', // Midnight Magic
};

// Gunakan supabase server client sederhana
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const revalidate = 60; // Cache halaman selama 60 detik

export async function generateMetadata({ params }) {
  const { slug } = await params;
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: order } = await supabase
    .from('orders')
    .select('*, templates(category, name)')
    .eq('slug', slug)
    .single();

  if (!order) return { title: 'Not Found | Invitea' };

  const isUcapan = order.templates?.category?.toLowerCase().includes("ucapan");
  
  if (isUcapan) {
    const penerima = order.data_content?.nama_penerima || "Seseorang";
    return {
      title: `Sebuah Pesan Untuk ${penerima} | Invitea`,
      description: 'Ada pesan spesial menanti untuk Anda.'
    };
  } else {
    const pria = order.data_content?.nama_pria || "Pria";
    const wanita = order.data_content?.nama_wanita || "Wanita";
    return {
      title: `Undangan Pernikahan: ${pria} & ${wanita} | Invitea`,
      description: 'Kami mengundang Anda untuk merayakan momen bahagia kami.'
    };
  }
}

export default async function LivePage({ params }) {
  const { slug } = await params;
  
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data: order, error } = await supabase
    .from('orders')
    .select('*, templates(*)')
    .eq('slug', slug)
    .single();

  if (error || !order || order.status_payment !== 'success') {
    // Tampilkan 404 Estetik jika tidak ditemukan atau belum lunas
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-[2rem] p-12 shadow-sm text-center max-w-md w-full border border-border-subtle">
          <h1 className="font-serif text-6xl text-brand mb-4">404</h1>
          <h2 className="font-serif text-2xl text-text-main mb-4">Tautan Tidak Ditemukan</h2>
          <p className="text-text-muted mb-8">
            Maaf, undangan yang Anda tuju mungkin sudah kedaluwarsa, belum dilunasi, atau tautannya salah.
          </p>
          <Link href="/">
            <Button className="w-full">Buat Undangan Sendiri</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Tentukan template mana yang harus dirender berdasarkan template_id
  const templateSlug = TEMPLATE_MAP[order.template_id];

  // Render template premium yang sesuai
  switch (templateSlug) {
    case 'wedding-classic':
      // Elegance Rose: Segel lilin, animasi amplop, galeri, countdown, maps
      return <WeddingClassicWrapper orderData={order} />;

    case 'greeting-minimalist':
      // Midnight Magic: Lilin tiup, konfeti, surat, memory reel
      return <GreetingMinimalistWrapper orderData={order} />;

    default: {
      // Fallback generik jika template_id belum dipetakan
      const isUcapan = order.templates?.category?.toLowerCase().includes("ucapan");
      return (
        <main className="relative">
          <CoverOverlay>
             <h1 className="font-serif text-3xl text-brand-dark mb-2">
                {isUcapan ? "Surat Untukmu" : "Undangan Pernikahan"}
             </h1>
             <p className="text-sm text-brand-dark/70 uppercase tracking-widest font-medium">
                {isUcapan ? (order.data_content?.nama_penerima || "Seseorang") : `${order.data_content?.nama_pria || "Pria"} & ${order.data_content?.nama_wanita || "Wanita"}`}
             </p>
          </CoverOverlay>
          {isUcapan ? (
            <LiveUcapan dataContent={order.data_content} fotoUrls={order.foto_urls} />
          ) : (
            <LiveUndangan dataContent={order.data_content} fotoUrls={order.foto_urls} />
          )}
        </main>
      );
    }
  }
}
