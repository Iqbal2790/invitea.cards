"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { supabaseClient } from "@/lib/supabase";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BuilderPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    groomName: "",
    brideName: "",
    date: "",
    time: "",
    location: "",
    message: ""
  });

  useEffect(() => {
    async function fetchTemplate() {
      try {
        const { data, error } = await supabaseClient
          .from("templates")
          .select("*")
          .eq("id", id)
          .single();
        
        if (data) setTemplate(data);
      } catch (err) {
        console.error("Error fetching template:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTemplate();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg transition-colors duration-400">
        <Loader2 className="w-8 h-8 animate-spin text-berry dark:text-pink" />
      </div>
    );
  }

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg transition-colors duration-400">
        <div className="text-center">
          <h2 className="text-[2rem] font-serif italic text-ink mb-4">Template tidak ditemukan</h2>
          <Link href="/templates" className="text-berry dark:text-pink font-semibold hover:underline">Kembali ke Galeri</Link>
        </div>
      </div>
    );
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Navigate to checkout
    router.push("/checkout/dummy-order-123");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen bg-bg transition-colors duration-400 font-sans overflow-hidden">
      
      {/* Left Column - Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col h-screen overflow-y-auto relative bg-bg-alt shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-10 border-r border-hairline">
        
        {/* Header */}
        <div className="sticky top-0 bg-header-bg backdrop-blur-[10px] border-b border-header-border p-[24px] z-20 flex items-center justify-between transition-colors duration-400">
          <Link href={`/templates/${id}`} className="inline-flex items-center text-[14.5px] font-medium text-ink-soft hover:text-ink transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Kembali
          </Link>
          <div className="flex gap-[8px]">
            <div className={`h-[6px] w-[32px] rounded-full ${step >= 1 ? 'bg-berry dark:bg-pink shadow-[0_2px_8px_-2px_var(--shadow-pink)]' : 'bg-hairline'} transition-colors duration-500`} />
            <div className={`h-[6px] w-[32px] rounded-full ${step >= 2 ? 'bg-berry dark:bg-pink shadow-[0_2px_8px_-2px_var(--shadow-pink)]' : 'bg-hairline'} transition-colors duration-500`} />
            <div className={`h-[6px] w-[32px] rounded-full ${step >= 3 ? 'bg-berry dark:bg-pink shadow-[0_2px_8px_-2px_var(--shadow-pink)]' : 'bg-hairline'} transition-colors duration-500`} />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-[clamp(24px,5vw,48px)] flex flex-col justify-center">
          <div className="max-w-[440px] w-full mx-auto">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Data Mempelai */}
              {step === 1 && (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleNext}
                  className="space-y-[32px]"
                >
                  <div>
                    <h2 className="font-serif italic text-[2.4rem] text-ink mb-[8px] leading-tight">Data Mempelai</h2>
                    <p className="text-ink-soft text-[15px] mb-[16px]">Silakan masukkan nama calon pengantin untuk undangan Anda.</p>
                  </div>
                  
                  <div className="space-y-[24px]">
                    <div className="space-y-[8px]">
                      <label className="text-[14px] font-semibold text-ink">Nama Mempelai Pria</label>
                      <input 
                        type="text" 
                        name="groomName"
                        required
                        placeholder="Contoh: Romeo"
                        value={formData.groomName}
                        onChange={handleChange}
                        className="w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50"
                      />
                    </div>
                    <div className="space-y-[8px]">
                      <label className="text-[14px] font-semibold text-ink">Nama Mempelai Wanita</label>
                      <input 
                        type="text" 
                        name="brideName"
                        required
                        placeholder="Contoh: Juliet"
                        value={formData.brideName}
                        onChange={handleChange}
                        className="w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50"
                      />
                    </div>
                  </div>

                  <div className="pt-[16px]">
                    <button type="submit" className="w-full group flex items-center justify-center gap-[10px] bg-pink-btn-bg text-cream-text py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)]">
                      Selanjutnya
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.form>
              )}

              {/* STEP 2: Detail Acara */}
              {step === 2 && (
                <motion.form 
                  key="step2"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onSubmit={handleNext}
                  className="space-y-[32px]"
                >
                  <div>
                    <h2 className="font-serif italic text-[2.4rem] text-ink mb-[8px] leading-tight">Detail Acara</h2>
                    <p className="text-ink-soft text-[15px] mb-[16px]">Kapan dan di mana acara bahagia ini akan diselenggarakan?</p>
                  </div>
                  
                  <div className="space-y-[24px]">
                    <div className="grid grid-cols-2 gap-[16px]">
                      <div className="space-y-[8px]">
                        <label className="text-[14px] font-semibold text-ink">Tanggal</label>
                        <input 
                          type="date" 
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50"
                        />
                      </div>
                      <div className="space-y-[8px]">
                        <label className="text-[14px] font-semibold text-ink">Waktu</label>
                        <input 
                          type="time" 
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50"
                        />
                      </div>
                    </div>
                    <div className="space-y-[8px]">
                      <label className="text-[14px] font-semibold text-ink">Nama Tempat / Gedung</label>
                      <input 
                        type="text" 
                        name="location"
                        required
                        placeholder="Contoh: Gedung Serbaguna Senayan"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50"
                      />
                    </div>
                  </div>

                  <div className="pt-[16px] flex gap-[16px]">
                    <button type="button" onClick={handlePrev} className="px-[24px] py-[16px] bg-transparent border-[1.5px] border-hairline text-ink rounded-full font-medium hover:border-berry dark:hover:border-pink transition-all duration-300 flex items-center justify-center">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button type="submit" className="flex-1 group flex items-center justify-center gap-[10px] bg-pink-btn-bg text-cream-text py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)]">
                      Tinjau Pesanan
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.form>
              )}

              {/* STEP 3: Tinjauan */}
              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -18 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-[32px]"
                >
                  <div className="text-center mb-[16px]">
                    <div className="w-[80px] h-[80px] bg-pink-btn-bg text-cream-text rounded-full flex items-center justify-center mx-auto mb-[24px] shadow-[var(--shadow-pink)]">
                      <CheckCircle2 className="w-[40px] h-[40px]" />
                    </div>
                    <h2 className="font-serif italic text-[2.4rem] text-ink mb-[8px] leading-tight">Semua Siap!</h2>
                    <p className="text-ink-soft text-[15px]">Pastikan ringkasan pesanan Anda sudah benar.</p>
                  </div>
                  
                  <div className="bg-bg rounded-[6px] p-[24px] border border-hairline space-y-[16px]">
                    <div className="flex justify-between items-center pb-[16px] border-b border-hairline/50">
                      <span className="text-[14px] text-ink-soft">Template</span>
                      <span className="text-[14.5px] font-semibold text-ink">{template.nama}</span>
                    </div>
                    <div className="flex justify-between items-center pb-[16px] border-b border-hairline/50">
                      <span className="text-[14px] text-ink-soft">Nama</span>
                      <span className="text-[14.5px] font-semibold text-ink">{formData.groomName || '-'} & {formData.brideName || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center pb-[16px] border-b border-hairline/50">
                      <span className="text-[14px] text-ink-soft">Waktu</span>
                      <span className="text-[14.5px] font-semibold text-ink">{formData.date || '-'} | {formData.time || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center pb-[16px] border-b border-hairline/50">
                      <span className="text-[14px] text-ink-soft">Tempat</span>
                      <span className="text-[14.5px] font-semibold text-ink text-right max-w-[200px] truncate">{formData.location || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center pt-[8px]">
                      <span className="text-[16px] font-medium text-ink">Total Harga</span>
                      <span className="text-[24px] font-bold text-berry dark:text-pink">Rp {Number(template.harga).toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  <div className="pt-[16px] flex gap-[16px]">
                    <button type="button" onClick={handlePrev} className="px-[24px] py-[16px] bg-transparent border-[1.5px] border-hairline text-ink rounded-full font-medium hover:border-berry dark:hover:border-pink transition-all duration-300 flex items-center justify-center">
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button onClick={handleSubmit} className="flex-1 group flex items-center justify-center gap-[10px] bg-pink-btn-bg text-cream-text py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)]">
                      Lanjut ke Pembayaran
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Column - Preview Area (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-bg relative flex-col items-center justify-center p-[48px]">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-pink-soft/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-berry/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-[340px] aspect-[3/4] rounded-[4px_60px_4px_4px] shadow-[var(--shadow-photo)] border-[6px] border-photo-frame bg-photo-frame overflow-hidden">
          {template.thumbnail_url ? (
            <Image 
              src={template.thumbnail_url} 
              alt="Preview Template" 
              fill 
              className="object-cover opacity-90"
            />
          ) : (
            <div className="w-full h-full bg-bg-alt flex items-center justify-center text-ink-soft">No Image</div>
          )}
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-[24px] pt-[80px]">
            <h3 className="font-serif italic text-cream-text text-[2rem] font-medium mb-[4px] leading-none">{template.nama}</h3>
            <p className="text-cream-text/70 text-[13px] uppercase tracking-wider font-semibold">Preview Statis</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
