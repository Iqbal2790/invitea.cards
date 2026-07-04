"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, PenLine, CreditCard, Send, Quote, Star, LayoutTemplate, Loader2 } from "lucide-react";

export default function LandingPage() {
  const [featuredTemplates, setFeaturedTemplates] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch("/api/templates");
        const result = await res.json();
        if (res.ok && result.data) {
          // Filter templates that are marked as featured in fields_config
          const featured = result.data.filter(t => t.fields_config?.isFeatured === true);
          setFeaturedTemplates(featured);
        }
      } catch (err) {
        console.error("Failed to fetch templates:", err);
      } finally {
        setLoading(false);
      }
    }

    async function fetchTestimonials() {
      try {
        const res = await fetch("/api/testimonials");
        const result = await res.json();
        if (res.ok && result.data) {
          setTestimonials(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      }
    }
    
    fetchTemplates();
    fetchTestimonials();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-4 py-24 md:py-0 bg-[url('/hero-bg.png')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px] -z-10" />
        
        {/* Subtle decorative circles */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-light/40 rounded-full blur-3xl -z-10" />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto flex flex-col items-center z-10 mt-16 md:mt-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-light/50 border border-brand/20 text-brand text-xs font-semibold tracking-widest uppercase mb-6 shadow-sm">
            <Sparkles className="w-3 h-3" />
            <span>Kini Hadir untuk Momen Spesialmu</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl font-semibold text-text-main leading-tight mb-6">
            Sampaikan Kabar Bahagiamu dengan Sepenuh Hati.
          </h1>
          
          <p className="text-lg md:text-xl text-text-muted mb-10 max-w-2xl leading-relaxed">
            Rangkai undangan digital dan kartu ucapan yang menawan dalam hitungan menit. Didesain dengan cinta, mudah disesuaikan, dan praktis dibagikan ke semua kerabat tanpa repot.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link 
              href="/templates?kategori=undangan"
              className="group flex items-center justify-center gap-2 px-8 py-4 bg-brand text-white rounded-full hover:bg-brand/90 transition-all duration-300 shadow-md shadow-brand/20 text-base font-medium"
            >
              Buat Undangan
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/templates?kategori=ucapan"
              className="flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm border border-border-subtle text-brand rounded-full hover:bg-brand-light/50 transition-all duration-300 text-base font-medium shadow-sm"
            >
              Buat Kartu Ucapan
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Cara Kerja */}
      <section id="cara-kerja" className="w-full py-24 bg-bg-base border-t border-border-subtle">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <h2 className="font-serif text-3xl md:text-5xl font-semibold text-text-main">Sesederhana Itu</h2>
            <p className="text-text-muted text-lg max-w-xl mx-auto">Tidak perlu keahlian teknis. Hanya dengan 4 langkah mudah, undangan cantik Anda siap dibagikan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-subtle flex flex-col items-start">
              <div className="w-14 h-14 bg-brand-light/50 rounded-2xl flex items-center justify-center text-brand mb-6">
                <LayoutTemplate className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-text-main mb-3">1. Pilih Desain</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Temukan variasi desain menawan yang paling cocok dengan nuansa acaramu.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-subtle flex flex-col items-start">
              <div className="w-14 h-14 bg-brand-light/50 rounded-2xl flex items-center justify-center text-brand mb-6">
                <PenLine className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-text-main mb-3">2. Isi Detail Acara</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Masukkan informasi mempelai, waktu, lokasi peta, dan pesan singkat Anda.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-subtle flex flex-col items-start">
              <div className="w-14 h-14 bg-brand-light/50 rounded-2xl flex items-center justify-center text-brand mb-6">
                <CreditCard className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-text-main mb-3">3. Aktivasi</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Selesaikan pembayaran ringan dengan mudah untuk mengaktifkan tautan undanganmu.
              </p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-subtle flex flex-col items-start">
              <div className="w-14 h-14 bg-brand-light/50 rounded-2xl flex items-center justify-center text-brand mb-6">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium text-text-main mb-3">4. Bagikan</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Tautan eksklusif siap dibagikan ke seluruh orang terkasih melalui WhatsApp atau media sosial.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

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

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-brand" />
            </div>
          ) : (
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
                      <Link href={`/templates/${template.id}`}>
                        <button className="w-full inline-flex items-center justify-center rounded-xl text-sm font-medium transition-all border border-border-subtle bg-transparent text-text-main hover:bg-brand hover:text-white hover:border-brand h-11 px-6 py-2">
                          Lihat Detail
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
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

      {/* Testimonials */}
      <section className="w-full px-4 py-24 md:py-32 bg-white relative overflow-hidden border-t border-border-subtle">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-light/20 rounded-full blur-3xl -z-10" />
        <div className="container mx-auto max-w-6xl space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-serif text-text-main font-semibold">Cerita Bahagia Mereka</h2>
            <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto">
              Menjadi bagian dari ribuan momen berkesan adalah sebuah kehormatan bagi kami.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.length > 0 ? (
              testimonials.map((testi) => (
                <motion.div key={testi.id} whileHover={{ y: -5 }} className="rounded-3xl border border-border-subtle bg-bg-base/50 p-8 space-y-6 shadow-sm flex flex-col justify-between">
                  <div>
                    <Quote className="text-brand/20 w-12 h-12 mb-6" />
                    <p className="text-text-main leading-relaxed italic">
                      &quot;{testi.pesan}&quot;
                    </p>
                  </div>
                  <div className="pt-4 border-t border-border-subtle mt-6">
                    <p className="font-serif font-medium text-lg text-text-main">{testi.nama}</p>
                    <div className="flex text-yellow-400 mt-1">
                      {[...Array(testi.rating || 5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 text-text-muted">
                Belum ada testimoni.
              </div>
            )}
          </div>
        </div>
      </section>

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
            <Link href="/templates">
              <button className="inline-flex items-center justify-center font-medium tracking-wide shadow-xl shadow-black/10 transition-all h-14 rounded-full px-10 text-base bg-white text-brand hover:bg-brand-light hover:scale-105 duration-300">
                Mulai Buat Sekarang
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
