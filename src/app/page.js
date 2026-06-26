import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { LayoutTemplate, PenLine, CreditCard, Send, Star, Quote } from "lucide-react";
import { supabase } from "@/lib/supabase";
import TemplateCard from "@/components/templates/TemplateCard";

// Fallback dummy data if Supabase is empty (Phase 2 was skipped)
const DUMMY_TEMPLATES = [
  {
    id: 'dummy-1',
    name: 'Elegance Rose',
    category: 'Undangan Pernikahan',
    price: 149000,
    thumbnail_url: '/template-dummy.png',
  },
  {
    id: 'dummy-2',
    name: 'Classic Minimalist',
    category: 'Undangan Pernikahan',
    price: 129000,
    thumbnail_url: '/template-dummy.png',
  },
  {
    id: 'dummy-3',
    name: 'Warm Floral',
    category: 'Kartu Ucapan',
    price: 49000,
    thumbnail_url: '/template-dummy.png',
  },
  {
    id: 'dummy-4',
    name: 'Rustic Earth',
    category: 'Undangan Pernikahan',
    price: 139000,
    thumbnail_url: '/template-dummy.png',
  }
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Amanda & Reza",
    text: "Desainnya sangat cantik dan mudah digunakan. Banyak tamu undangan kami yang memuji betapa elegannya undangan digital kami!",
  },
  {
    id: 2,
    name: "Sarah Wijaya",
    text: "Proses pembuatannya benar-benar instan. Saya bisa langsung menyebarkan undangan ke grup keluarga tanpa harus menunggu lama.",
  },
  {
    id: 3,
    name: "Dinda & Bima",
    text: "Sangat membantu untuk merekap RSVP dari tamu. Tampilannya manis dan harganya sangat terjangkau untuk kualitas sebagus ini.",
  }
];

export default async function Home() {
  // Fetch real data from Supabase, fallback to dummy if empty
  let templates = [];
  try {
    const { data } = await supabase
      .from('templates')
      .select('*')
      .eq('is_active', true)
      .limit(4);
    templates = data || [];
  } catch (error) {
    console.error("Error fetching templates:", error);
  }

  const displayTemplates = templates.length > 0 ? templates : DUMMY_TEMPLATES;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center px-4 py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image 
            src="/hero-bg.png" 
            alt="Hero Background" 
            fill 
            className="object-cover" 
            priority
          />
        </div>
        <div className="absolute inset-0 bg-white/60 -z-10"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-light/20 rounded-full blur-3xl -z-10 opacity-50"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-sand/60 rounded-full blur-3xl -z-10 opacity-60"></div>
        
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <HeroBadge>Kini Hadir untuk Momen Spesialmu</HeroBadge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-text-main leading-tight md:leading-tight">
            Sampaikan Kabar Bahagiamu dengan Sepenuh Hati.
          </h1>
          
          <p className="text-base md:text-xl text-text-muted max-w-2xl mx-auto leading-relaxed">
            Rangkai undangan digital dan kartu ucapan yang menawan dalam hitungan menit. Didesain dengan cinta, mudah disesuaikan, dan praktis dibagikan ke semua kerabat tanpa repot.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/templates?kategori=undangan">
              <Button size="lg" className="w-full sm:w-auto">
                Buat Undangan
              </Button>
            </Link>
            <Link href="/templates?kategori=ucapan">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Buat Kartu Ucapan
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cara Kerja Section */}
      <section id="cara-kerja" className="px-4 py-24 md:py-32 bg-white/50 border-t border-border-subtle">
        <div className="container mx-auto max-w-6xl text-center space-y-16">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif text-text-main">
              Sesederhana Itu
            </h2>
            <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto">
              Tidak perlu keahlian teknis. Hanya dengan 4 langkah mudah, undangan cantik Anda siap dibagikan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-left">
            <StepCard icon={<LayoutTemplate strokeWidth={1.5} size={24} />} title="1. Pilih Desain" desc="Temukan variasi desain menawan yang paling cocok dengan nuansa acaramu." />
            <StepCard icon={<PenLine strokeWidth={1.5} size={24} />} title="2. Isi Detail Acara" desc="Masukkan informasi mempelai, waktu, lokasi peta, dan pesan singkat Anda." />
            <StepCard icon={<CreditCard strokeWidth={1.5} size={24} />} title="3. Aktivasi" desc="Selesaikan pembayaran ringan dengan mudah untuk mengaktifkan tautan undanganmu." />
            <StepCard icon={<Send strokeWidth={1.5} size={24} />} title="4. Bagikan" desc="Tautan eksklusif siap dibagikan ke seluruh orang terkasih melalui WhatsApp atau media sosial." />
          </div>
        </div>
      </section>

      {/* Contoh Template Section (Task 3.4) */}
      <section className="px-4 py-24 md:py-32 bg-accent-sand/30 border-t border-border-subtle">
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif text-text-main">
              Desain Spesial untuk Anda
            </h2>
            <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto">
              Pilihan karya terbaik yang dirancang untuk mewakili cantiknya momen bahagia Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/templates">
              <Button size="lg" className="rounded-full px-8">Lihat Semua Koleksi</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimoni Section (Task 3.4) */}
      <section className="px-4 py-24 md:py-32 bg-white border-t border-border-subtle relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light/20 rounded-full blur-3xl -z-10"></div>
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif text-text-main">
              Cerita Bahagia Mereka
            </h2>
            <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto">
              Menjadi bagian dari ribuan momen berkesan adalah sebuah kehormatan bagi kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testi) => (
              <Card key={testi.id} className="bg-bg-base/50">
                <CardContent className="p-8 space-y-6">
                  <Quote className="text-brand-light w-10 h-10" />
                  <p className="text-text-main leading-relaxed italic">
                    "{testi.text}"
                  </p>
                  <div className="pt-4 border-t border-border-subtle">
                    <p className="font-serif font-medium text-lg text-text-main">{testi.name}</p>
                    <div className="flex text-yellow-400 mt-1">
                      {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section (Task 3.4) */}
      <section className="px-4 py-24 bg-brand text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/5"></div>
        <div className="container mx-auto max-w-3xl relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif text-white leading-tight">
            Mulai Rangkai Undangan Impian Anda Hari Ini
          </h2>
          <p className="text-brand-light text-base md:text-lg max-w-xl mx-auto">
            Jadikan momen perayaan Anda lebih bermakna dengan desain yang merepresentasikan cinta Anda berdua.
          </p>
          <div className="pt-4">
            <Link href="/templates">
              <Button size="lg" className="bg-white text-brand hover:bg-bg-base">
                Mulai Buat Sekarang
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// Components
function HeroBadge({ children }) {
  return (
    <span className="inline-block py-1.5 px-4 rounded-full bg-brand-light/50 border border-brand/20 text-brand text-xs font-semibold tracking-widest uppercase mb-4">
      {children}
    </span>
  );
}

function StepCard({ icon, title, desc }) {
  return (
    <div className="flex flex-col space-y-4 p-6 rounded-3xl hover:bg-brand-light/20 transition-colors duration-300">
      <div className="w-12 h-12 rounded-2xl bg-brand-light flex items-center justify-center text-brand mb-2">
        {icon}
      </div>
      <h3 className="text-xl font-medium font-serif text-text-main">
        {title}
      </h3>
      <p className="text-sm text-text-muted leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
