"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WeddingForm({ template, formData, setFormData, handleChange }) {
  const router = useRouter();
  const [step, setStep] = useState(1);

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    sessionStorage.setItem("checkoutData", JSON.stringify({
      template: template,
      formData: formData
    }));
    router.push("/checkout/custom");
  };

  return (
    <>
      {/* Header Form Navigation */}
      <div className="absolute top-0 left-0 w-full bg-header-bg backdrop-blur-[10px] border-b border-header-border p-[24px] z-20 flex items-center justify-between transition-colors duration-400">
        <div className="flex gap-[8px] mx-auto">
          <div className={`h-[6px] w-[32px] rounded-full ${step >= 1 ? 'bg-berry dark:bg-pink shadow-[0_2px_8px_-2px_var(--shadow-pink)]' : 'bg-hairline'} transition-colors duration-500`} />
          <div className={`h-[6px] w-[32px] rounded-full ${step >= 2 ? 'bg-berry dark:bg-pink shadow-[0_2px_8px_-2px_var(--shadow-pink)]' : 'bg-hairline'} transition-colors duration-500`} />
          <div className={`h-[6px] w-[32px] rounded-full ${step >= 3 ? 'bg-berry dark:bg-pink shadow-[0_2px_8px_-2px_var(--shadow-pink)]' : 'bg-hairline'} transition-colors duration-500`} />
        </div>
      </div>

      <div className="max-w-[440px] w-full mx-auto mt-24">
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
    </>
  );
}
