import Link from "next/link";
import Image from "next/image";
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

  const primaryTemplate = featuredTemplates[0];
  const secondaryTemplates = featuredTemplates.slice(1, 3);

  return (
    <main className="flex flex-col w-full">
      <HeroSection />

      <HowItWorksSection />

      {/* Featured Templates (Showcase) */}
      <section className="py-[clamp(64px,9vw,120px)] w-full bg-bg-alt transition-colors duration-400">
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)]">
          <div className="max-w-[640px] mb-[clamp(40px,6vw,68px)]">
            <h2 className="font-serif font-medium text-[clamp(2rem,4vw,2.9rem)] leading-[1.08] text-ink">
              Desain Spesial untuk Anda
            </h2>
            <p className="mt-[16px] text-ink-soft text-[16px]">
              Eksplorasi ragam pilihan desain eksklusif yang siap disesuaikan dengan cerita manis Anda.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-[clamp(20px,3vw,32px)]">
            
            {/* Primary (Tall) */}
            {primaryTemplate ? (
              <Link href={`/templates/${primaryTemplate.id}`} className="relative rounded-[6px] overflow-hidden bg-berry-deep group block" style={{ height: "560px" }}>
                {primaryTemplate.thumbnail_url ? (
                  <Image 
                    src={primaryTemplate.thumbnail_url}
                    alt={primaryTemplate.nama}
                    fill
                    className="object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-cream-text/50">No Thumbnail</div>
                )}
                <div className="absolute left-[24px] bottom-[22px] text-cream-text z-10">
                  <div className="text-[12.5px] font-semibold tracking-[0.04em] opacity-85 uppercase">
                    {primaryTemplate.kategori}
                  </div>
                  <div className="font-serif italic text-[1.9rem] mt-[4px]">
                    {primaryTemplate.nama}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
              </Link>
            ) : (
              <div className="rounded-[6px] bg-berry-deep/10 h-[560px] flex items-center justify-center text-ink-soft">
                Belum ada template
              </div>
            )}

            {/* Secondary Stack (Short) */}
            <div className="flex flex-col gap-[clamp(20px,3vw,32px)] h-full">
              {secondaryTemplates.map((template) => (
                <Link key={template.id} href={`/templates/${template.id}`} className="relative rounded-[6px] overflow-hidden bg-berry-deep group block flex-1 min-h-[264px]">
                  {template.thumbnail_url ? (
                    <Image 
                      src={template.thumbnail_url}
                      alt={template.nama}
                      fill
                      className="object-cover opacity-85 transition-opacity duration-500 group-hover:opacity-100"
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-cream-text/50">No Thumbnail</div>
                  )}
                  <div className="absolute left-[24px] bottom-[22px] text-cream-text z-10">
                    <div className="text-[12.5px] font-semibold tracking-[0.04em] opacity-85 uppercase">
                      {template.kategori}
                    </div>
                    <div className="font-serif italic text-[1.9rem] mt-[4px]">
                      {template.nama}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
                </Link>
              ))}

              {/* Pad with empty placeholders if less than 2 secondary templates exist */}
              {Array.from({ length: Math.max(0, 2 - secondaryTemplates.length) }).map((_, i) => (
                <div key={`empty-${i}`} className="rounded-[6px] bg-berry-deep/10 flex-1 min-h-[264px] flex items-center justify-center text-ink-soft">
                  Belum ada template
                </div>
              ))}
            </div>
          </div>

          <div className="mt-[40px] text-center">
            <Link 
              href="/templates" 
              className="inline-flex items-center gap-[10px] px-[30px] py-[15px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] bg-transparent text-berry dark:text-ink border-[1.5px] border-berry dark:border-ink-soft transition-all duration-350 hover:bg-berry hover:text-cream-text dark:hover:bg-pink dark:hover:text-pink-btn-text dark:hover:border-pink"
            >
              Lihat Semua Desain
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection testimonials={testimonials} />

      {/* CTA Bottom */}
      <section className="py-[clamp(64px,9vw,120px)] w-full">
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)]">
          <div className="bg-berry text-cream-text rounded-[14px] p-[clamp(48px,7vw,84px)_clamp(28px,6vw,80px)] relative overflow-hidden grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-[32px] items-center transition-colors duration-400">
            <svg className="absolute -right-[30px] -bottom-[40px] w-[260px] opacity-20 z-0" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M75 140C75 140 20 120 20 75C20 45 45 30 65 40C80 47 80 65 68 70C58 74 48 65 55 55" stroke="oklch(94% 0.02 70)" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="75" cy="30" r="9" stroke="oklch(94% 0.02 70)" strokeWidth="1.4"/>
            </svg>
            <div className="relative z-10 text-left">
              <h2 className="text-cream-text font-serif font-medium text-[clamp(2.1rem,4.4vw,3.2rem)] max-w-[14ch] leading-[1.08]">
                Mulai Rangkai Undangan Impian Anda Hari Ini
              </h2>
              <p className="mt-[14px] text-[oklch(94%_0.02_70/0.8)] max-w-[42ch] text-[16px]">
                Jadikan momen perayaan Anda lebih bermakna dengan desain yang merepresentasikan cinta Anda berdua.
              </p>
            </div>
            <div className="relative z-10 flex md:justify-end">
              <Link 
                href="/templates"
                className="inline-flex items-center gap-[10px] px-[30px] py-[15px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] bg-cream-text text-berry-deep transition-all duration-350 hover:-translate-y-[2px]"
              >
                Mulai Buat Sekarang
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
