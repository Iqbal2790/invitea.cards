"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Upload, Trash2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_STEPS = 2;

export default function KisahtanggalkuForm({ template, formData, setFormData, handleChange, sessionId }) {
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

  // ── Navigation ─────────────────────────────────────────────────────────────
  const handleNext = (e) => { 
    e?.preventDefault(); 
    if (step === 1) {
      if (!formData.nama_penerima || !formData.nama_pengirim || !formData.tanggal_lahir) {
        alert("Harap lengkapi nama penerima, nama pengirim, dan tanggal lahir.");
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
    
    if (fotoUrls.length + files.length > 3) {
      setUploadError("Maksimal 3 foto diperbolehkan.");
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
        
        let photoUrl = "";
        try {
          const response = await fetch("/api/upload", { method: "POST", body: uploadData });
          const data = await response.json();
          if (!response.ok) throw new Error(data.error || "Gagal upload foto");
          photoUrl = `${data.url}?v=${Date.now()}`;
        } catch (uploadErr) {
          console.warn("Server upload fallback activated:", uploadErr);
          photoUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (ev) => resolve(ev.target.result);
            reader.readAsDataURL(file);
          });
        }
        
        if (photoUrl) {
          uploadedUrls.push(photoUrl);
        }
      }
      setFormData(prev => ({ ...prev, foto_urls: [...(prev.foto_urls || []), ...uploadedUrls].slice(0, 3) }));
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

      <div className="mt-[60px] pb-[40px]">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div 
              key="step1" 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-[24px]"
            >
              <div>
                <h2 className={headingClass}>Data Lahir & Identitas</h2>
                <p className={descClass}>Masukkan nama penerima, pengirim, serta detail lahir untuk diabadikan dalam jurnal arsip.</p>
              </div>

              <div>
                <label className={labelClass}>Nama Penerima (Yang Berulang Tahun) *</label>
                <input 
                  type="text"
                  name="nama_penerima"
                  value={formData.nama_penerima || ""}
                  onChange={handleChange}
                  placeholder="Contoh: Nisa Maharani"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Nama Pengirim (Dari Orang Spesial) *</label>
                <input 
                  type="text"
                  name="nama_pengirim"
                  value={formData.nama_pengirim || ""}
                  onChange={handleChange}
                  placeholder="Contoh: Kevin Pratama"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Tanggal Lahir *</label>
                <input 
                  type="date"
                  name="tanggal_lahir"
                  value={formData.tanggal_lahir || ""}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Zodiak & Sifat Utama (Opsional)</label>
                  <input 
                    type="text"
                    name="zodiak_nama"
                    value={formData.zodiak_nama || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Libra - Karismatik & Penuh Kasih"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Shio & Elemen (Opsional)</label>
                  <input 
                    type="text"
                    name="shio_nama"
                    value={formData.shio_nama || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Naga (Elemen Logam)"
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label className={labelClass}>Peristiwa Sejarah / Fun Fact (Opsional)</label>
                <textarea 
                  name="sejarah_singkat"
                  value={formData.sejarah_singkat || ""}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Contoh: Di tanggal ini pada tahun 2000, dunia mencatat sejarah baru dan bintang paling bersinar hadir di bumi."
                  className={inputClass}
                />
              </div>

              <div className="pt-[16px]">
                <button type="button" onClick={handleNext} className={`w-full ${btnNextClass}`}>
                  Lanjut ke Pesan & Foto <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div 
              key="step2" 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-[24px]"
            >
              <div>
                <h2 className={headingClass}>Surat Spesial & Foto Kenangan</h2>
                <p className={descClass}>Tuliskan ungkapan perasaan mendalam dan sisipkan foto polaroid manis bersama.</p>
              </div>

              <div>
                <label className={labelClass}>Surat / Ucapan Utama *</label>
                <textarea 
                  name="pesan_utama"
                  value={formData.pesan_utama || ""}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Tuliskan ucapan dari hati yang paling dalam..."
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Catatan Rahasia / Secret Note (Terkunci Dibalik Stempel)</label>
                <textarea 
                  name="catatan_rahasia"
                  value={formData.catatan_rahasia || ""}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Pesan kejutan rahasia yang hanya bisa dibuka jika penerima menekan stempel..."
                  className={inputClass}
                />
              </div>

              {/* Upload Foto */}
              <div>
                <label className={labelClass}>Foto Kenangan Polaroid (Maksimal 3 Foto)</label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {fotoUrls.map((url, idx) => (
                    <div key={idx} className="relative aspect-square rounded-[8px] overflow-hidden border border-hairline group">
                      <img src={url} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-1 right-1 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  {fotoUrls.length < 3 && (
                    <label className="aspect-square rounded-[8px] border-2 border-dashed border-hairline flex flex-col items-center justify-center cursor-pointer hover:border-berry dark:hover:border-pink transition-colors">
                      {isUploading ? (
                        <Loader2 className="w-6 h-6 animate-spin text-berry dark:text-pink" />
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-ink-soft mb-1" />
                          <span className="text-[12px] font-medium text-ink-soft">Tambah</span>
                        </>
                      )}
                      <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" disabled={isUploading} />
                    </label>
                  )}
                </div>
                {uploadError && <p className="text-red-500 text-[13px]">{uploadError}</p>}
              </div>

              <div>
                <label className={labelClass}>URL Musik Background (YouTube / Audio Link)</label>
                <input 
                  type="text"
                  name="musik_url"
                  value={formData.musik_url || ""}
                  onChange={handleChange}
                  placeholder="Contoh: https://www.youtube.com/watch?v=rtOvBOTyX00"
                  className={inputClass}
                />
              </div>

              <div className="flex items-center gap-[12px] pt-[16px]">
                <button type="button" onClick={handlePrev} className={btnPrevClass}>
                  <ArrowLeft className="w-5 h-5 mr-1" /> Kembali
                </button>
                <button type="button" onClick={handleSubmit} className={`flex-1 ${btnNextClass}`}>
                  Lanjut ke Pemesanan
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
