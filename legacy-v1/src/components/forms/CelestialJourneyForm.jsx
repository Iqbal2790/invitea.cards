"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Upload, Trash2, Loader2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_STEPS = 2;

export default function CelestialJourneyForm({ template, formData, setFormData, handleChange, sessionId }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  // ── Styles ──────────────────────────────────────────────────────────────────
  const headingClass = "font-serif italic text-[2.4rem] text-ink mb-[8px] leading-tight";
  const descClass = "text-ink-soft text-[15px] mb-[16px]";
  const labelClass = "text-[14px] font-semibold text-ink block mb-[4px]";
  const inputClass = "w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50";
  const btnNextClass = "group flex items-center justify-center gap-[10px] bg-pink-btn-bg text-cream-text py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)]";
  const btnPrevClass = "px-[24px] py-[16px] bg-transparent border-[1.5px] border-hairline text-ink rounded-full font-medium hover:border-berry dark:hover:border-pink transition-all duration-300 flex items-center justify-center";

  // ── Nav ──────────────────────────────────────────────────────────────────────
  const handleNext = (e) => { 
    e?.preventDefault(); 
    if (step === 1) {
      if (!formData.nama_penerima || !formData.nama_pengirim || !formData.pesan) {
        alert("Harap lengkapi semua data teks.");
        return;
      }
    }
    if (step < TOTAL_STEPS) setStep(step + 1); 
  };
  const handlePrev = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = () => {
    sessionStorage.setItem("checkoutData", JSON.stringify({ template, formData }));
    router.push("/checkout/custom");
  };

  // ── Photo upload ─────────────────────────────────────────────────────────────
  const fotoUrls = Array.isArray(formData.foto_urls) ? formData.foto_urls : [];

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    if (fotoUrls.length + files.length > 5) {
      setUploadError("Maksimal 5 foto diperbolehkan.");
      return;
    }
    
    setIsUploading(true);
    setUploadError("");
    
    try {
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("Ukuran file maksimal 5MB.");
        }
        
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("sessionId", sessionId || "uploads");
        uploadData.append("slot", String(fotoUrls.length + i)); 
        
        const response = await fetch("/api/upload", { method: "POST", body: uploadData });
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || "Gagal upload foto");
        
        uploadedUrls.push(`${data.url}?v=${Date.now()}`);
      }
      setFormData(prev => ({ ...prev, foto_urls: [...(prev.foto_urls || []), ...uploadedUrls].slice(0, 5) }));
    } catch (error) {
      console.error(error);
      setUploadError(error.message || "Gagal mengupload foto. Silakan coba lagi.");
    } finally {
      setIsUploading(false);
    }
  };

  const removePhoto = (index) => {
    const newPhotos = [...fotoUrls];
    newPhotos.splice(index, 1);
    setFormData(prev => ({ ...prev, foto_urls: newPhotos }));
  };

  return (
    <>
      {/* Header Form Navigation */}
      <div className="absolute top-0 left-0 w-full bg-header-bg backdrop-blur-[10px] border-b border-header-border p-[24px] z-20 flex items-center justify-between transition-colors duration-400">
        <div className="flex gap-[8px] mx-auto overflow-x-auto px-4 max-w-full">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div 
              key={i}
              className={`h-[6px] w-[20px] md:w-[32px] rounded-full flex-shrink-0 ${step >= i + 1 ? 'bg-berry dark:bg-pink shadow-[0_2px_8px_-2px_var(--shadow-pink)]' : 'bg-hairline'} transition-colors duration-500`} 
            />
          ))}
        </div>
      </div>

      <div className="max-w-[440px] w-full mx-auto mt-24 mb-12 font-sans px-4 md:px-0">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: Informasi Penerima */}
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
                <h2 className={headingClass}>Data Utama</h2>
                <p className={descClass}>Masukkan pesan hangat dan nama.</p>
              </div>
              
              <div className="space-y-[24px]">
                <div>
                  <label className={labelClass}>Nama Penerima</label>
                  <input
                    type="text"
                    name="nama_penerima"
                    required
                    value={formData.nama_penerima || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Anya Geraldine"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Nama Pengirim</label>
                  <input
                    type="text"
                    name="nama_pengirim"
                    required
                    value={formData.nama_pengirim || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Budi Santoso"
                    className={inputClass}
                  />
                </div>
                
                <div>
                  <label className={labelClass}>Pesan Utama</label>
                  <textarea
                    name="pesan"
                    required
                    value={formData.pesan || ""}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Tuliskan pesan berkesanmu di sini..."
                    className={`${inputClass} resize-none min-h-[120px]`}
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button type="submit" className={`${btnNextClass} w-full`}>
                  Selanjutnya <ArrowRight size={18} />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 2: Galeri Foto */}
          {step === 2 && (
            <motion.div 
              key="step2"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-[32px]"
            >
              <div>
                <h2 className={headingClass}>Kenangan Indah</h2>
                <p className={descClass}>Tambahkan maksimal 5 foto terbaik (ukuran direkomendasikan portrait/vertikal).</p>
              </div>
              
              <div className="space-y-[24px]">
                <div className="grid grid-cols-3 gap-3">
                  {fotoUrls.map((url, i) => (
                    <div key={i} className="relative aspect-[3/4] rounded-[6px] overflow-hidden border border-hairline group">
                      <img src={url} alt={`Foto ${i+1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(i)}
                        className="absolute top-2 right-2 p-1.5 bg-black/40 backdrop-blur-md text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  
                  {fotoUrls.length < 5 && (
                    <label className="relative aspect-[3/4] rounded-[6px] border-2 border-dashed border-hairline flex flex-col items-center justify-center cursor-pointer hover:border-berry dark:hover:border-pink transition-colors bg-bg-alt">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        disabled={isUploading}
                        className="hidden"
                      />
                      {isUploading ? (
                        <Loader2 className="w-5 h-5 text-ink-soft animate-spin" />
                      ) : (
                        <>
                          <Plus className="w-5 h-5 text-ink-soft mb-1" />
                          <span className="text-[12px] font-medium text-ink-soft text-center px-2">Tambah</span>
                        </>
                      )}
                    </label>
                  )}
                </div>
                {uploadError && <p className="text-sm text-red-500 mt-2">{uploadError}</p>}
                <p className="text-[13px] text-ink-soft">Format: JPG, PNG, max 5MB/file.</p>
              </div>

              <div className="pt-4 flex gap-[12px]">
                <button type="button" onClick={handlePrev} className={btnPrevClass}>
                  <ArrowLeft size={18} />
                </button>
                <button type="button" onClick={handleSubmit} className={`${btnNextClass} flex-1`}>
                  Lanjut ke Checkout <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </>
  );
}
