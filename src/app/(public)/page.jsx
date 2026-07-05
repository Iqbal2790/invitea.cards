import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { supabaseAdmin } from "@/lib/supabase";

import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";

// Next.js Server Components can be async
export default async function LandingPage() {
  // Fetch featured templates
  let featuredTemplates = [];
  try {
    const { data: templates, error } = await supabaseAdmin
      .from("templates")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });
      
    if (!error && templates) {
      featuredTemplates = templates.filter(t => t.fields_config?.isFeatured === true);
    }
  } catch (err) {
    console.error("Failed to fetch templates:", err);
  }

  // Fetch testimonials
  let testimonials = [];
  try {
    const { data, error } = await supabaseAdmin
      .from("testimonials")
      .select("id, nama, pesan")
      .eq("is_active", true)
      .order("created_at", { ascending: false });
      
    if (!error && data) {
      testimonials = data;
    }
  } catch (err) {
    console.error("Failed to fetch testimonials:", err);
  }

  return (
    <div className="flex flex-col items-center w-full">
      <HeroSection />

      <HowItWorksSection />

      {/* Featured Templates */}
      <section className="w-full py-24 bg-white relative overflow-hidden border-t border-border-subtle">
        <div className="absolute top-0 left-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto px-4 max-w-6xl space-y-12">
          <div className="text-center space-y-4">
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-text-main">Desain Spesial untuk Anda</h2>
            <p className="text-text-muted text-lg max-w-xl mx-auto">
              Eksplorasi ragam pilihan desain eksklusif yang siap disesuaikan dengan cerita manis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-4">
            {featuredTemplates.map((template) => (
              <div
                key={template.id}
                className="rounded-3xl border border-border-subtle bg-white text-text-main shadow-[0_8px_30px_rgb(0,0,0,0.04)] group overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-light/20 flex items-center justify-center">
                  {template.thumbnail_url ? (
                    <Image
                      src={template.thumbnail_url}
                      alt={template.nama}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="text-text-muted text-sm font-medium">No Thumbnail</span>
                  )}
                  <div className="absolute top-4 left-4 z-10">
                    <div className="inline-flex items-center rounded-xl border border-transparent bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-brand shadow-sm">
                      {template.fields_config?.subCategory || template.kategori}
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between bg-white z-10 relative">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-text-main mb-1 truncate">{template.nama}</h3>
                    <p className="text-brand font-medium">Rp {Number(template.harga).toLocaleString("id-ID")}</p>
                  </div>
                  <div className="mt-6">
                    <Link 
                      href={`/templates/${template.id}`}
                      className="w-full inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all border border-border-subtle bg-transparent text-text-main hover:bg-brand hover:text-white hover:border-brand h-11 px-6 py-2"
                    >
                      Lihat Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center pt-8">
            <Link 
              href="/templates"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-white text-text-main border border-border-subtle rounded-full hover:border-brand hover:text-brand transition-all duration-300 text-sm font-medium shadow-sm"
            >
              Lihat Semua Desain
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      {/* CTA Bottom */}
      <section className="w-full px-4 py-24 bg-brand text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto max-w-3xl relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-serif text-white font-semibold leading-tight">
            Mulai Rangkai Undangan Impian Anda Hari Ini
          </h2>
          <p className="text-brand-light text-base md:text-lg max-w-xl mx-auto">
            Jadikan momen perayaan Anda lebih bermakna dengan desain yang merepresentasikan cinta Anda berdua.
          </p>
          <div className="pt-4">
            <Link 
              href="/templates"
              className="inline-flex items-center justify-center font-medium tracking-wide shadow-xl shadow-black/10 transition-all h-14 rounded-full px-10 text-base bg-white text-brand hover:bg-brand-light hover:scale-105 duration-300"
            >
              Mulai Buat Sekarang
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
