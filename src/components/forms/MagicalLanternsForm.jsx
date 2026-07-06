"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Plus, Trash2, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function MagicalLanternsForm({ template, formData, setFormData, handleChange }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const handleNext = (e) => {
    e.preventDefault();
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Navigate to checkout
    router.push("/checkout/dummy-order-123");
  };

  // Wishes handlers
  const handleWishChange = (index, value) => {
    const newWishes = [...formData.wishes];
    newWishes[index].message = value;
    setFormData(prev => ({ ...prev, wishes: newWishes }));
  };

  const addWish = () => {
    if (formData.wishes.length < 15) {
      setFormData(prev => ({
        ...prev,
        wishes: [...prev.wishes, { message: "" }]
      }));
    }
  };

  const removeWish = (index) => {
    if (formData.wishes.length > 1) {
      const newWishes = [...formData.wishes];
      newWishes.splice(index, 1);
      setFormData(prev => ({ ...prev, wishes: newWishes }));
    }
  };

  // Photo handlers (simulation only for now)
  const handlePhotoUpload = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newPhotos = [...formData.photos];
      newPhotos[index] = { file, previewUrl: url };
      setFormData(prev => ({ ...prev, photos: newPhotos }));
    }
  };

  const removePhoto = (index) => {
    const newPhotos = [...formData.photos];
    newPhotos[index] = null;
    setFormData(prev => ({ ...prev, photos: newPhotos }));
  };

  return (
    <>
      {/* Header Form Navigation */}
      <div className="absolute top-0 left-0 w-full bg-header-bg backdrop-blur-[10px] border-b border-header-border p-[24px] z-20 flex items-center justify-between transition-colors duration-400">
        <div className="flex gap-[4px] md:gap-[8px] mx-auto overflow-x-auto px-4 max-w-full">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i}
              className={`h-[6px] w-[20px] md:w-[32px] rounded-full flex-shrink-0 ${step >= i + 1 ? 'bg-berry dark:bg-pink shadow-[0_2px_8px_-2px_var(--shadow-pink)]' : 'bg-hairline'} transition-colors duration-500`} 
            />
          ))}
        </div>
      </div>

      <div className="max-w-[440px] w-full mx-auto mt-24 mb-12">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Data Pengirim & Penerima */}
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
                <h2 className="font-serif italic text-[2.4rem] text-ink mb-[8px] leading-tight">Data Utama</h2>
                <p className="text-ink-soft text-[15px] mb-[16px]">Siapa pengirim dan penerima ucapan spesial ini?</p>
              </div>
              
              <div className="space-y-[24px]">
                <div className="space-y-[8px]">
                  <label className="text-[14px] font-semibold text-ink">Nama Penerima</label>
                  <input 
                    type="text" 
                    name="receiverName"
                    required
                    placeholder="Contoh: Juliet"
                    value={formData.receiverName}
                    onChange={handleChange}
                    className="w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50"
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className="text-[14px] font-semibold text-ink">Nama Pengirim</label>
                  <input 
                    type="text" 
                    name="senderName"
                    required
                    placeholder="Contoh: Romeo"
                    value={formData.senderName}
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

          {/* STEP 2: Ucapan Pembuka */}
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
                <h2 className="font-serif italic text-[2.4rem] text-ink mb-[8px] leading-tight">Ucapan Pembuka</h2>
                <p className="text-ink-soft text-[15px] mb-[16px]">Tuliskan pesan pembuka yang akan tampil seperti ketikan mesin tik.</p>
              </div>
              
              <div className="space-y-[24px]">
                <div className="space-y-[8px]">
                  <label className="text-[14px] font-semibold text-ink">Pesan Pembuka</label>
                  <textarea 
                    name="greetingText"
                    required
                    rows={4}
                    placeholder="Contoh: Happy Birthday! Wishing you all the love and happiness in the world."
                    value={formData.greetingText}
                    onChange={handleChange}
                    className="w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50 resize-none"
                  />
                </div>
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="button" onClick={handlePrev} className="px-[24px] py-[16px] bg-transparent border-[1.5px] border-hairline text-ink rounded-full font-medium hover:border-berry dark:hover:border-pink transition-all duration-300 flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button type="submit" className="flex-1 group flex items-center justify-center gap-[10px] bg-pink-btn-bg text-cream-text py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)]">
                  Selanjutnya
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 3: Upload Foto */}
          {step === 3 && (
            <motion.form 
              key="step3"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleNext}
              className="space-y-[32px]"
            >
              <div>
                <h2 className="font-serif italic text-[2.4rem] text-ink mb-[8px] leading-tight">Galeri Foto</h2>
                <p className="text-ink-soft text-[15px] mb-[16px]">Upload 3 foto terbaik Anda yang akan ditampilkan sebagai rasi bintang.</p>
              </div>
              
              <div className="space-y-[16px]">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="space-y-[8px]">
                    <label className="text-[14px] font-semibold text-ink">Foto {index + 1}</label>
                    
                    {formData.photos[index] ? (
                      <div className="relative w-full h-[120px] rounded-[6px] overflow-hidden border border-hairline">
                        <img src={formData.photos[index].previewUrl} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                        <button 
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed border-hairline rounded-[6px] cursor-pointer hover:border-berry dark:hover:border-pink transition-colors bg-bg-alt">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-6 h-6 text-ink-soft mb-2" />
                          <p className="text-sm text-ink-soft">Klik untuk upload foto</p>
                        </div>
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handlePhotoUpload(index, e)} />
                      </label>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="button" onClick={handlePrev} className="px-[24px] py-[16px] bg-transparent border-[1.5px] border-hairline text-ink rounded-full font-medium hover:border-berry dark:hover:border-pink transition-all duration-300 flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button type="submit" className="flex-1 group flex items-center justify-center gap-[10px] bg-pink-btn-bg text-cream-text py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)]">
                  Selanjutnya
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 4: Lampion Harapan */}
          {step === 4 && (
            <motion.form 
              key="step4"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleNext}
              className="space-y-[32px]"
            >
              <div>
                <h2 className="font-serif italic text-[2.4rem] text-ink mb-[8px] leading-tight">Lampion Harapan</h2>
                <p className="text-ink-soft text-[15px] mb-[16px]">Tuliskan pesan dan harapan pada lampion yang berterbangan. (Maksimal 15)</p>
              </div>
              
              <div className="space-y-[16px] max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                {formData.wishes.map((wish, index) => (
                  <div key={index} className="relative group">
                    <textarea 
                      required
                      rows={2}
                      placeholder={`Pesan harapan ke-${index + 1}...`}
                      value={wish.message}
                      onChange={(e) => handleWishChange(index, e.target.value)}
                      className="w-full px-[20px] py-[16px] pr-[40px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50 resize-none"
                    />
                    {formData.wishes.length > 1 && (
                      <button 
                        type="button"
                        onClick={() => removeWish(index)}
                        className="absolute right-3 top-3 p-2 text-ink-soft hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Hapus"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {formData.wishes.length < 15 && (
                <button 
                  type="button" 
                  onClick={addWish}
                  className="w-full flex items-center justify-center gap-[8px] py-[12px] border border-dashed border-berry/50 dark:border-pink/50 text-berry dark:text-pink rounded-[6px] hover:bg-berry/5 dark:hover:bg-pink/5 transition-colors font-medium text-[14px]"
                >
                  <Plus className="w-4 h-4" /> Tambah Harapan
                </button>
              )}

              <div className="pt-[16px] flex gap-[16px]">
                <button type="button" onClick={handlePrev} className="px-[24px] py-[16px] bg-transparent border-[1.5px] border-hairline text-ink rounded-full font-medium hover:border-berry dark:hover:border-pink transition-all duration-300 flex items-center justify-center">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button type="submit" className="flex-1 group flex items-center justify-center gap-[10px] bg-pink-btn-bg text-cream-text py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)]">
                  Selanjutnya
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 5: Ucapan Penutup */}
          {step === 5 && (
            <motion.form 
              key="step5"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleNext}
              className="space-y-[32px]"
            >
              <div>
                <h2 className="font-serif italic text-[2.4rem] text-ink mb-[8px] leading-tight">Ucapan Penutup</h2>
                <p className="text-ink-soft text-[15px] mb-[16px]">Tuliskan pesan terakhir yang akan muncul di akhir perjalanan animasi.</p>
              </div>
              
              <div className="space-y-[24px]">
                <div className="space-y-[8px]">
                  <label className="text-[14px] font-semibold text-ink">Kutipan Utama</label>
                  <textarea 
                    name="finalQuote"
                    required
                    rows={3}
                    placeholder="Contoh: To the world you may be one person, but to one person you are the world."
                    value={formData.finalQuote}
                    onChange={handleChange}
                    className="w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50 resize-none"
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className="text-[14px] font-semibold text-ink">Pesan Penutup</label>
                  <textarea 
                    name="finalGreeting"
                    required
                    rows={4}
                    placeholder="Contoh: Sekali lagi, Selamat Ulang Tahun! Nikmati hari spesialmu."
                    value={formData.finalGreeting}
                    onChange={handleChange}
                    className="w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50 resize-none"
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

          {/* STEP 6: Tinjauan */}
          {step === 6 && (
            <motion.div 
              key="step6"
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
                  <span className="text-[14px] text-ink-soft">Pengirim</span>
                  <span className="text-[14.5px] font-semibold text-ink">{formData.senderName || '-'}</span>
                </div>
                <div className="flex justify-between items-center pb-[16px] border-b border-hairline/50">
                  <span className="text-[14px] text-ink-soft">Penerima</span>
                  <span className="text-[14.5px] font-semibold text-ink">{formData.receiverName || '-'}</span>
                </div>
                <div className="flex justify-between items-center pb-[16px] border-b border-hairline/50">
                  <span className="text-[14px] text-ink-soft">Jumlah Harapan</span>
                  <span className="text-[14.5px] font-semibold text-ink text-right max-w-[200px] truncate">{formData.wishes.filter(w => w.message).length} Pesan</span>
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
      
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--color-hairline, #e2e8f0);
          border-radius: 20px;
        }
      `}</style>
    </>
  );
}
