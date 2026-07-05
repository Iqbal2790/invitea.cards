"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Loader2 } from "lucide-react";

const subCategoriesMap = {
  undangan: ["Semua"],
  ucapan: ["Semua"]
};

function GalleryContent() {
  const searchParams = useSearchParams();
  const queryKategori = searchParams.get("kategori");

  const [mainCategory, setMainCategory] = useState("undangan");
  const [subCategory, setSubCategory] = useState("Semua");
  
  const [allTemplates, setAllTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sync URL param on mount
  useEffect(() => {
    if (queryKategori === "undangan" || queryKategori === "ucapan") {
      setMainCategory(queryKategori);
      setSubCategory("Semua");
    }
  }, [queryKategori]);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setLoading(true);
        const res = await fetch(`/api/templates?category=${mainCategory}`);
        const result = await res.json();
        if (res.ok && result.data) {
          setAllTemplates(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch templates:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, [mainCategory]);

  const handleMainCategoryChange = (cat) => {
    setMainCategory(cat);
    setSubCategory("Semua"); // reset sub category when main changes
  };

  const filteredTemplates = allTemplates.filter((t) => {
    if (subCategory !== "Semua" && t.fields_config?.subCategory !== subCategory) return false;
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-bg transition-colors duration-400">
      {/* Header */}
      <section className="relative px-[clamp(20px,5vw,64px)] py-[clamp(56px,8vw,108px)] overflow-hidden border-b border-hairline bg-bg-alt">
        <div className="max-w-[800px] mx-auto text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-[clamp(2.6rem,5vw,4rem)] font-medium leading-[1.08] text-ink"
          >
            Eksplorasi <em className="italic text-pink-btn-text dark:text-pink">Desain</em>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[18px] text-ink-soft leading-[1.6] max-w-[50ch] mx-auto"
          >
            Pilih karya terbaik yang dirancang khusus untuk mewakili manisnya momen bahagia Anda.
          </motion.p>
        </div>
      </section>

      {/* Filter & Grid Section */}
      <section className="flex-1 px-[clamp(20px,5vw,64px)] py-[clamp(40px,6vw,80px)]">
        <div className="max-w-[1180px] mx-auto space-y-[clamp(32px,5vw,48px)]">
          
          {/* Main Category Toggle */}
          <div className="flex justify-center">
            <div className="inline-flex bg-bg-alt p-1.5 rounded-full border border-hairline">
              <button
                onClick={() => handleMainCategoryChange("undangan")}
                className={`px-6 md:px-10 py-[12px] rounded-full text-[14.5px] font-semibold tracking-[0.02em] transition-all duration-300 ${
                  mainCategory === "undangan" 
                    ? "bg-berry text-cream-text shadow-sm dark:bg-pink dark:text-pink-btn-text" 
                    : "text-ink-soft hover:text-ink hover:bg-bg/50"
                }`}
              >
                Undangan Pernikahan
              </button>
              <button
                onClick={() => handleMainCategoryChange("ucapan")}
                className={`px-6 md:px-10 py-[12px] rounded-full text-[14.5px] font-semibold tracking-[0.02em] transition-all duration-300 ${
                  mainCategory === "ucapan" 
                    ? "bg-berry text-cream-text shadow-sm dark:bg-pink dark:text-pink-btn-text" 
                    : "text-ink-soft hover:text-ink hover:bg-bg/50"
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
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2 md:gap-3 min-w-max"
              >
                {subCategoriesMap[mainCategory].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setSubCategory(sub)}
                    className={`whitespace-nowrap px-5 py-2 rounded-full text-[13.5px] font-medium transition-all duration-300 border-[1.5px] ${
                      subCategory === sub
                        ? "bg-transparent text-berry dark:text-pink border-berry dark:border-pink shadow-[0_4px_14px_-6px_var(--shadow-pink)]"
                        : "bg-transparent text-ink-soft border-hairline hover:border-berry/50 dark:hover:border-pink/50 hover:text-berry dark:hover:text-pink"
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Grid Layout */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-berry dark:text-pink" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div 
                key={`${mainCategory}-${subCategory}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -18 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[clamp(20px,3vw,32px)]"
              >
                {filteredTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="relative flex flex-col bg-bg-alt rounded-[6px] overflow-hidden group border border-hairline shadow-sm hover:shadow-md transition-shadow duration-300"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-bg">
                      {template.thumbnail_url ? (
                        <Image
                          src={template.thumbnail_url}
                          alt={template.nama}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          className="object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-ink-soft/50 font-sans text-sm">
                          No Thumbnail
                        </div>
                      )}
                      
                      <div className="absolute top-4 left-4 z-10">
                        <div className="inline-flex items-center px-[10px] py-[6px] bg-bg/90 backdrop-blur-sm text-[10px] font-bold tracking-[0.06em] text-berry uppercase shadow-sm dark:bg-bg/80 dark:text-pink border border-hairline/50 rounded-[4px]">
                          {template.fields_config?.subCategory || template.kategori}
                        </div>
                      </div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col justify-between z-10 relative">
                      <div>
                        <h3 className="font-serif italic text-[1.6rem] text-ink mb-[2px] leading-tight truncate">
                          {template.nama}
                        </h3>
                        <p className="text-[14.5px] text-berry dark:text-pink font-semibold">
                          Rp {Number(template.harga).toLocaleString("id-ID")}
                        </p>
                      </div>
                      <div className="mt-[20px]">
                        <Link href={`/templates/${template.id}`}>
                          <button className="w-full inline-flex items-center justify-center rounded-full text-[13.5px] font-semibold tracking-[0.02em] transition-all bg-transparent text-berry dark:text-ink border-[1.5px] border-berry dark:border-ink-soft hover:bg-berry hover:text-cream-text dark:hover:bg-pink dark:hover:text-pink-btn-text dark:hover:border-pink h-11 px-6">
                            Lihat Detail
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Empty State Fallback */}
          {!loading && filteredTemplates.length === 0 && (
            <div className="py-[120px] text-center flex flex-col items-center">
              <Filter className="w-12 h-12 text-hairline mb-[16px]" />
              <p className="font-serif italic text-[1.6rem] text-ink-soft">
                Belum ada desain untuk kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-berry dark:text-pink font-serif italic text-2xl">Memuat Galeri...</div>}>
      <GalleryContent />
    </Suspense>
  );
}
