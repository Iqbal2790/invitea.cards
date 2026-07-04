"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";

import { dummyTemplates } from "@/lib/dummy-data";

const subCategoriesMap = {
  undangan: ["Semua", "Modern", "Tradisional", "Minimalis", "Elegan"],
  ucapan: ["Semua", "General", "Pasangan", "Teman", "Keluarga"]
};

function GalleryContent() {
  const searchParams = useSearchParams();
  const queryKategori = searchParams.get("kategori");

  const [mainCategory, setMainCategory] = useState("undangan");
  const [subCategory, setSubCategory] = useState("Semua");
  
  // Sync URL param on mount
  useEffect(() => {
    if (queryKategori === "undangan" || queryKategori === "ucapan") {
      setMainCategory(queryKategori);
      setSubCategory("Semua");
    }
  }, [queryKategori]);

  const handleMainCategoryChange = (cat) => {
    setMainCategory(cat);
    setSubCategory("Semua"); // reset sub category when main changes
  };

  const filteredTemplates = dummyTemplates.filter((t) => {
    if (t.category !== mainCategory) return false;
    if (subCategory !== "Semua" && t.subCategory !== subCategory) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-bg-base">
      {/* Header */}
      <section className="relative px-4 py-16 md:py-24 overflow-hidden border-b border-border-subtle bg-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-light/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto max-w-4xl text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl text-text-main font-semibold"
          >
            Eksplorasi Desain
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto"
          >
            Pilih karya terbaik yang dirancang khusus untuk mewakili manisnya momen bahagia Anda.
          </motion.p>
        </div>
      </section>

      {/* Filter & Grid Section */}
      <section className="flex-1 px-4 py-12 md:py-16">
        <div className="container mx-auto max-w-6xl space-y-8">
          
          {/* Main Category Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex bg-brand-light/30 p-1.5 rounded-full border border-brand/20 backdrop-blur-sm">
              <button
                onClick={() => handleMainCategoryChange("undangan")}
                className={`px-6 md:px-10 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  mainCategory === "undangan" 
                    ? "bg-white text-brand shadow-sm" 
                    : "text-text-muted hover:text-text-main hover:bg-white/50"
                }`}
              >
                Undangan Pernikahan
              </button>
              <button
                onClick={() => handleMainCategoryChange("ucapan")}
                className={`px-6 md:px-10 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  mainCategory === "ucapan" 
                    ? "bg-white text-brand shadow-sm" 
                    : "text-text-muted hover:text-text-main hover:bg-white/50"
                }`}
              >
                Kartu Ucapan
              </button>
            </div>
          </div>

          {/* Sub Category Pills */}
          <div className="flex items-center justify-center gap-2 md:gap-3 overflow-x-auto pb-4 scrollbar-hide px-2">
            <AnimatePresence mode="wait">
              <motion.div 
                key={mainCategory}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 md:gap-3 min-w-max"
              >
                {subCategoriesMap[mainCategory].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubCategory(sub)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                      subCategory === sub
                        ? "bg-brand text-white border-brand shadow-md shadow-brand/20"
                        : "bg-white text-text-muted border-border-subtle hover:border-brand/30 hover:text-brand"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Grid Layout */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={`${mainCategory}-${subCategory}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 pt-4"
            >
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className="rounded-3xl border border-border-subtle bg-white text-text-main shadow-[0_8px_30px_rgb(0,0,0,0.04)] group overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-brand-light/20 flex items-center justify-center">
                    <Image
                      src={template.image}
                      alt={template.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-4 left-4 z-10">
                      <div className="inline-flex items-center rounded-xl border border-transparent bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[10px] uppercase tracking-wider font-semibold text-brand shadow-sm">
                        {template.subCategory}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between bg-white z-10 relative">
                    <div>
                      <h3 className="font-serif text-xl font-medium text-text-main mb-1 truncate">{template.title}</h3>
                      <p className="text-brand font-medium">Rp {template.price.toLocaleString("id-ID")}</p>
                    </div>
                    <div className="mt-6">
                      <Link href={`/templates/${template.id}`}>
                        <button className="w-full inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all border border-border-subtle bg-transparent text-text-main hover:bg-brand hover:text-white hover:border-brand h-11 px-6 py-2">
                          Lihat Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Empty State Fallback */}
          {filteredTemplates.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center">
              <Filter className="w-12 h-12 text-border-subtle mb-4" />
              <p className="text-text-muted text-lg">Belum ada desain untuk kategori ini.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-brand font-medium">Memuat Galeri...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
