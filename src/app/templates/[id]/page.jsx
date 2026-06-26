import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, MapPin, Image as ImageIcon, Music, Clock, MessageSquareHeart, Eye } from "lucide-react";

// Fallback dummy data if Supabase is empty
const DUMMY_TEMPLATES = [
  { id: 'd1', name: 'Elegance Rose', category: 'Undangan Pernikahan', price: 149000, thumbnail_url: '/template-dummy.png', description: 'Desain menawan dengan sentuhan mawar merah muda yang lembut. Sempurna untuk pernikahan bernuansa romantis dan intim.' },
  { id: 'd2', name: 'Classic Minimalist', category: 'Undangan Pernikahan', price: 129000, thumbnail_url: '/template-dummy.png', description: 'Kesederhanaan yang berbicara banyak. Desain minimalis tanpa ornamen berlebih, menonjolkan tipografi serif yang elegan.' },
  { id: 'd3', name: 'Warm Floral', category: 'Kartu Ucapan', price: 49000, thumbnail_url: '/template-dummy.png', description: 'Sampaikan rasa syukur dan bahagiamu melalui kartu ucapan berhias bunga-bunga musim semi yang hangat.' },
  { id: 'd4', name: 'Rustic Earth', category: 'Undangan Pernikahan', price: 139000, thumbnail_url: '/template-dummy.png', description: 'Nuansa membumi dengan palet warna terakota dan daun kering. Sangat pas untuk perayaan bertema rustic outdoor.' },
  { id: 'd5', name: 'Ocean Breeze', category: 'Undangan Pernikahan', price: 159000, thumbnail_url: '/template-dummy.png', description: 'Kesejukan angin laut tertuang dalam palet warna biru pucat dan elemen air.' },
  { id: 'd6', name: 'Simple Joy', category: 'Kartu Ucapan', price: 39000, thumbnail_url: '/template-dummy.png', description: 'Desain ceria yang mudah dibaca untuk berbagi kebahagiaan momen-momen kecil.' },
  { id: 'd7', name: 'Royal Gold', category: 'Undangan Pernikahan', price: 199000, thumbnail_url: '/template-dummy.png', description: 'Kemewahan paripurna dengan ornamen daun emas (gold foil effect) dan latar belakang gelap yang sangat kontras.' },
  { id: 'd8', name: 'Sweet Peach', category: 'Kartu Ucapan', price: 49000, thumbnail_url: '/template-dummy.png', description: 'Lembut, manis, dan bersahaja dengan dominasi warna peach pastel.' },
];

const FEATURES = [
  { label: 'Galeri Foto Pasangan', icon: <ImageIcon size={20} className="text-brand" /> },
  { label: 'Integrasi Google Maps', icon: <MapPin size={20} className="text-brand" /> },
  { label: 'Penghitung Waktu Mundur (Countdown)', icon: <Clock size={20} className="text-brand" /> },
  { label: 'Sistem RSVP & Buku Tamu', icon: <MessageSquareHeart size={20} className="text-brand" /> },
  { label: 'Latar Belakang Musik Romantis', icon: <Music size={20} className="text-brand" /> },
];

export async function generateMetadata(props) {
  const params = await props.params;
  return {
    title: `Detail Template - Invitea`,
  };
}

export default async function TemplateDetail(props) {
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
  } catch (error) {
    // Ignore error if not found in supabase, fallback to dummy
  }

  // Fallback to dummy data
  if (!template) {
    template = DUMMY_TEMPLATES.find(t => t.id === id);
  }

  if (!template) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-bg-base pt-24 pb-16">
      <div className="container mx-auto max-w-6xl px-4">
        
        {/* Breadcrumb Nav */}
        <div className="mb-8">
          <Link href="/templates" className="text-text-muted hover:text-brand transition-colors text-sm font-medium">
            &larr; Kembali ke Galeri
          </Link>
        </div>

        {/* 
          Main Layout: 
          Mobile: flex-col (bertumpuk atas-bawah)
          Desktop (lg): flex-row (split screen)
        */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Preview (Image) */}
          <div className="w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] bg-white lg:sticky lg:top-28">
            <div className="relative aspect-[3/4] w-full bg-accent-sand/20">
              <Image
                src={template.thumbnail_url || '/template-dummy.png'}
                alt={template.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Column: Information */}
          <div className="w-full lg:w-1/2 space-y-8">
            
            {/* Header Info */}
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-brand-light/50 text-brand border-brand/20">
                {template.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif text-text-main leading-tight">
                {template.name}
              </h1>
              <p className="text-2xl font-serif text-brand">
                Rp {template.price?.toLocaleString('id-ID')}
              </p>
            </div>

            {/* Description */}
            <div className="text-text-muted leading-relaxed">
              <p>{template.description || 'Desain elegan yang dirancang khusus untuk mewakili indahnya momen bahagia Anda. Template ini sangat mudah disesuaikan dengan informasi Anda.'}</p>
            </div>

            <hr className="border-border-subtle" />

            {/* Features List */}
            <div className="space-y-6">
              <h3 className="font-serif text-xl text-text-main font-medium">Yang Akan Anda Dapatkan:</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {FEATURES.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-border-subtle/50 shadow-sm">
                    <div className="shrink-0 bg-brand-light/30 p-2 rounded-lg">
                      {feat.icon}
                    </div>
                    <span className="text-sm font-medium text-text-main">{feat.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-6 space-y-4">
              <Link href={`/buat/${template.id}`} className="block">
                <Button size="lg" className="w-full h-14 text-lg rounded-xl shadow-md hover:-translate-y-1 transition-transform duration-300">
                  Buat dengan Template Ini
                </Button>
              </Link>
              <Link href={`/preview/${template.id}`} className="block" target="_blank">
                <Button variant="outline" size="lg" className="w-full h-14 text-lg rounded-xl border-2 border-brand/20 hover:border-brand/50 hover:bg-brand-light/10 hover:-translate-y-1 transition-all duration-300 text-brand">
                  <Eye className="mr-2 h-5 w-5" /> Lihat Preview
                </Button>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
