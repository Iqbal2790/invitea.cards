import { supabase } from "@/lib/supabase";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, MapPin, Image as ImageIcon, Music, Clock, MessageSquareHeart, Eye } from "lucide-react";

import { DUMMY_TEMPLATES } from "@/lib/templates-data";

// Fallback dummy data if Supabase is empty


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
                alt={template.nama || template.name || 'Template Image'}
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
                {template.category || template.kategori || 'Template'}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-serif text-text-main leading-tight">
                {template.nama || template.name}
              </h1>
              <p className="text-2xl font-serif text-brand">
                Rp {(template.price || template.harga || 0).toLocaleString('id-ID')}
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
                <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-border-subtle/50 shadow-sm">
                  <div className="shrink-0 bg-brand-light/30 p-2 rounded-lg">
                    <ImageIcon size={20} className="text-brand" />
                  </div>
                  <span className="text-sm font-medium text-text-main">Galeri Foto Eksklusif</span>
                </li>
                {template.fitur_maps && (
                  <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-border-subtle/50 shadow-sm">
                    <div className="shrink-0 bg-brand-light/30 p-2 rounded-lg">
                      <MapPin size={20} className="text-brand" />
                    </div>
                    <span className="text-sm font-medium text-text-main">Integrasi Google Maps</span>
                  </li>
                )}
                {template.fitur_countdown && (
                  <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-border-subtle/50 shadow-sm">
                    <div className="shrink-0 bg-brand-light/30 p-2 rounded-lg">
                      <Clock size={20} className="text-brand" />
                    </div>
                    <span className="text-sm font-medium text-text-main">Penghitung Waktu Mundur</span>
                  </li>
                )}
                {template.fitur_rsvp && (
                  <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-border-subtle/50 shadow-sm">
                    <div className="shrink-0 bg-brand-light/30 p-2 rounded-lg">
                      <MessageSquareHeart size={20} className="text-brand" />
                    </div>
                    <span className="text-sm font-medium text-text-main">Sistem RSVP & Buku Tamu</span>
                  </li>
                )}
                <li className="flex items-center gap-3 bg-white p-3 rounded-xl border border-border-subtle/50 shadow-sm">
                  <div className="shrink-0 bg-brand-light/30 p-2 rounded-lg">
                    <Music size={20} className="text-brand" />
                  </div>
                  <span className="text-sm font-medium text-text-main">Latar Belakang Musik Romantis</span>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-6 space-y-4">
              <Link href={`/buat/${template.id}`} className="block">
                <Button size="lg" className="w-full h-14 text-lg rounded-xl shadow-md hover:-translate-y-1 transition-transform duration-300">
                  Buat dengan Template Ini
                </Button>
              </Link>
              <Link href={template.preview_url || DUMMY_TEMPLATES.find(t => t.id === template.id)?.preview_url || `/preview/${template.id}`} className="block" target="_blank">
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
