import { supabase } from "@/lib/supabase";
import TemplateCard from "@/components/templates/TemplateCard";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { DUMMY_TEMPLATES } from "@/lib/templates-data";

export const metadata = {
  title: "Koleksi Template - Invitea",
  description: "Eksplorasi koleksi template undangan digital dan kartu ucapan eksklusif.",
};

export default async function TemplatesPage(props) {
  const searchParams = await props.searchParams;
  const categoryFilter = searchParams?.kategori || "semua";
  
  let templates = [];
  try {
    const { data } = await supabase
      .from('templates')
      .select('*')
      .eq('is_active', true);
    templates = data || [];
  } catch (error) {
    console.error("Error fetching templates:", error);
  }

  const allTemplates = templates.length > 0 ? templates : DUMMY_TEMPLATES;

  const filteredTemplates = allTemplates.filter((tpl) => {
    if (categoryFilter === "semua") return true;
    return tpl.category.toLowerCase().includes(categoryFilter.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen bg-bg-base pt-20">
      <section className="px-4 py-16 md:py-24 text-center border-b border-border-subtle bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-light/30 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-sand/50 rounded-full blur-3xl -z-10 -translate-x-1/3 translate-y-1/3"></div>
        
        <div className="container mx-auto max-w-4xl space-y-6">
          <h1 className="text-4xl md:text-5xl font-serif text-text-main">
            Koleksi Template
          </h1>
          <p className="text-text-muted text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Temukan desain sempurna yang paling merepresentasikan cerita Anda. Pilih dari ragam koleksi undangan dan ucapan digital kami.
          </p>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24 flex-1">
        <div className="container mx-auto max-w-6xl space-y-12">
          
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/templates?kategori=semua">
              <Button variant={categoryFilter === "semua" ? "default" : "outline"} className="rounded-full">
                Semua Desain
              </Button>
            </Link>
            <Link href="/templates?kategori=undangan">
              <Button variant={categoryFilter === "undangan" ? "default" : "outline"} className="rounded-full">
                Undangan Pernikahan
              </Button>
            </Link>
            <Link href="/templates?kategori=ucapan">
              <Button variant={categoryFilter === "ucapan" ? "default" : "outline"} className="rounded-full">
                Kartu Ucapan
              </Button>
            </Link>
          </div>

          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTemplates.map((template) => (
                <TemplateCard key={template.id} template={template} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 space-y-4">
              <p className="text-text-muted text-lg">Belum ada template untuk kategori ini.</p>
              <Link href="/templates?kategori=semua">
                <Button variant="outline">Lihat Semua Koleksi</Button>
              </Link>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}
