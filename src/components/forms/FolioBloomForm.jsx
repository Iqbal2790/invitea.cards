"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Upload, Trash2, Loader2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_STEPS = 4;

export default function FolioBloomForm({ template, formData, setFormData, handleChange, sessionId }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [uploadingIndices, setUploadingIndices] = useState({});

  // ── Styles ──────────────────────────────────────────────────────────────────
  const headingClass = "font-serif italic text-[2.4rem] text-ink mb-[8px] leading-tight";
  const descClass = "text-ink-soft text-[15px] mb-[16px]";
  const labelClass = "text-[14px] font-semibold text-ink";
  const inputClass = "w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50";
  const btnNextClass = "group flex items-center justify-center gap-[10px] bg-pink-btn-bg text-cream-text py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)]";
  const btnPrevClass = "px-[24px] py-[16px] bg-transparent border-[1.5px] border-hairline text-ink rounded-full font-medium hover:border-berry dark:hover:border-pink transition-all duration-300 flex items-center justify-center";

  // ── Nav ──────────────────────────────────────────────────────────────────────
  const handleNext = (e) => { 
    e?.preventDefault(); 
    if (step === 1 && !formData.foto_cover) {
      alert("Foto Cover / Background Mempelai wajib diunggah.");
      return;
    }
    if (step === 4) {
      const fotoCount = Array.isArray(formData.foto_urls) ? formData.foto_urls.length : 0;
      if (fotoCount < 6 || fotoCount > 16) {
        alert("Galeri harus memiliki minimal 6 dan maksimal 16 foto.");
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
    
    if (fotoUrls.length + files.length > 16) {
      alert("Maksimal 16 foto diperbolehkan.");
      return;
    }

    try {
      setUploadingIndices(prev => ({ ...prev, uploading: true }));
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const uploadData = new FormData();
        uploadData.append("file", file);
        uploadData.append("sessionId", sessionId || "uploads");
        uploadData.append("slot", String(fotoUrls.length + i)); 
        const response = await fetch("/api/upload", { method: "POST", body: uploadData });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Gagal upload foto");
        uploadedUrls.push(`${data.url}?v=${Date.now()}`);
      }
      setFormData(prev => ({ ...prev, foto_urls: [...(prev.foto_urls || []), ...uploadedUrls] }));
    } catch (error) {
      alert(error.message);
    } finally {
      setUploadingIndices(prev => ({ ...prev, uploading: false }));
    }
  };

  const handleSinglePhotoUpload = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploadingIndices(prev => ({ ...prev, [fieldName]: true }));
      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("sessionId", sessionId || "uploads");
      uploadData.append("slot", fieldName); 
      const response = await fetch("/api/upload", { method: "POST", body: uploadData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gagal upload foto");
      setFormData(prev => ({ ...prev, [fieldName]: `${data.url}?v=${Date.now()}` }));
    } catch (error) {
      alert(error.message);
    } finally {
      setUploadingIndices(prev => ({ ...prev, [fieldName]: false }));
    }
  };

  const removePhoto = (index) => {
    const newPhotos = [...fotoUrls];
    newPhotos.splice(index, 1);
    setFormData(prev => ({ ...prev, foto_urls: newPhotos }));
  };

  const removeSinglePhoto = (fieldName) => {
    setFormData(prev => ({ ...prev, [fieldName]: '' }));
  };

  return (
    <>
      {/* Header Form Navigation */}
      <div className="absolute top-0 left-0 w-full bg-header-bg backdrop-blur-[10px] border-b border-header-border p-[24px] z-20 flex items-center justify-between transition-colors duration-400">
        <div className="flex gap-[4px] md:gap-[8px] mx-auto overflow-x-auto px-4 max-w-full">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div 
              key={i}
              className={`h-[6px] w-[20px] md:w-[32px] rounded-full flex-shrink-0 ${step >= i + 1 ? 'bg-berry dark:bg-pink shadow-[0_2px_8px_-2px_var(--shadow-pink)]' : 'bg-hairline'} transition-colors duration-500`} 
            />
          ))}
        </div>
      </div>

      <div className="max-w-[440px] w-full mx-auto mt-24 mb-12">
        <AnimatePresence mode="wait">
          {/* STEP 1 — Mempelai */}
          {step === 1 && (
            <motion.form
              key="step1"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleNext}
              className="space-y-[32px]"
            >
              <div>
                <h2 className={headingClass}>Data Mempelai</h2>
                <p className={descClass}>Masukkan nama kedua mempelai dan nama orang tua masing-masing.</p>
              </div>

              <div className="space-y-[24px]">
                <div className="space-y-[8px]">
                  <label className={labelClass}>Background Card Mempelai *</label>
                  {formData.foto_cover ? (
                    <div className="relative w-full h-[120px] rounded-[6px] overflow-hidden border border-hairline">
                      <img src={formData.foto_cover} alt="Cover" className="w-full h-full object-cover" />
                      <button type="button" onClick={() => removeSinglePhoto("foto_cover")} className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className={`flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploadingIndices.foto_cover ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-berry dark:hover:border-pink'}`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploadingIndices.foto_cover ? (
                          <><Loader2 className="w-6 h-6 text-berry dark:text-pink mb-2 animate-spin" /><p className="text-sm text-ink-soft">Mengunggah...</p></>
                        ) : (
                          <><Upload className="w-6 h-6 text-ink-soft mb-2" /><p className="text-sm text-ink-soft">Klik untuk upload foto</p></>
                        )}
                      </div>
                      <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" disabled={uploadingIndices.foto_cover} onChange={(e) => handleSinglePhotoUpload(e, "foto_cover")} />
                    </label>
                  )}
                </div>

                <hr className="border-hairline my-6" />

                <div className="space-y-[8px]">
                  <label className={labelClass}>Nama Panggilan Pria *</label>
                  <input
                    type="text"
                    name="mempelai_pria_nama"
                    value={formData.mempelai_pria_nama || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Romeo"
                    className={inputClass}
                    required
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>Nama Orang Tua Pria *</label>
                  <input
                    type="text"
                    name="mempelai_pria_ortu"
                    value={formData.mempelai_pria_ortu || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Putra dari Bpk. Montague & Ibu Montague"
                    className={inputClass}
                    required
                  />
                </div>
                
                <hr className="border-hairline my-6" />

                <div className="space-y-[8px]">
                  <label className={labelClass}>Nama Panggilan Wanita *</label>
                  <input
                    type="text"
                    name="mempelai_wanita_nama"
                    value={formData.mempelai_wanita_nama || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Juliet"
                    className={inputClass}
                    required
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>Nama Orang Tua Wanita *</label>
                  <input
                    type="text"
                    name="mempelai_wanita_ortu"
                    value={formData.mempelai_wanita_ortu || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Putri dari Bpk. Capulet & Ibu Capulet"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="submit" className={`w-full ${btnNextClass}`}>
                  Selanjutnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 2 — Acara Akad */}
          {step === 2 && (
            <motion.form
              key="step2"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleNext}
              className="space-y-[32px]"
            >
              <div>
                <h2 className={headingClass}>Acara Akad / Pemberkatan</h2>
                <p className={descClass}>Kapan dan di mana acara utama ini diselenggarakan?</p>
              </div>

              <div className="space-y-[24px]">
                <div className="space-y-[8px]">
                  <label className={labelClass}>Nama Acara *</label>
                  <input
                    type="text"
                    name="acara_akad_nama"
                    value={formData.acara_akad_nama || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Akad Nikah"
                    className={inputClass}
                    required
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>Tanggal *</label>
                  <input
                    type="date"
                    name="acara_akad_tanggal"
                    value={formData.acara_akad_tanggal || ""}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>Waktu (Jam) *</label>
                  <input
                    type="time"
                    name="acara_akad_jam"
                    value={formData.acara_akad_jam || ""}
                    onChange={handleChange}
                    className={inputClass}
                    required
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>Nama Tempat *</label>
                  <input
                    type="text"
                    name="acara_akad_lokasi_nama"
                    value={formData.acara_akad_lokasi_nama || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Masjid Raya"
                    className={inputClass}
                    required
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>Alamat Lengkap *</label>
                  <textarea
                    name="acara_akad_lokasi_alamat"
                    value={formData.acara_akad_lokasi_alamat || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Jl. Kemerdekaan No. 1, Jakarta"
                    className={`${inputClass} resize-none h-[100px]`}
                    required
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>Link Google Maps *</label>
                  <input
                    type="url"
                    name="acara_akad_lokasi_url"
                    value={formData.acara_akad_lokasi_url || ""}
                    onChange={handleChange}
                    placeholder="https://maps.app.goo.gl/..."
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="button" onClick={handlePrev} className={btnPrevClass} aria-label="Kembali">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button type="submit" className={`flex-1 ${btnNextClass}`}>
                  Selanjutnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 3 — Acara Resepsi */}
          {step === 3 && (
            <motion.form
              key="step3"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleNext}
              className="space-y-[32px]"
            >
              <div>
                <h2 className={headingClass}>Acara Resepsi (Opsional)</h2>
                <p className={descClass}>Kosongkan jika tidak ada acara resepsi terpisah.</p>
              </div>

              <div className="space-y-[24px]">
                <div className="space-y-[8px]">
                  <label className={labelClass}>Nama Acara</label>
                  <input
                    type="text"
                    name="acara_resepsi_nama"
                    value={formData.acara_resepsi_nama || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Resepsi Pernikahan"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>Tanggal</label>
                  <input
                    type="date"
                    name="acara_resepsi_tanggal"
                    value={formData.acara_resepsi_tanggal || ""}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>Waktu (Jam)</label>
                  <input
                    type="time"
                    name="acara_resepsi_jam"
                    value={formData.acara_resepsi_jam || ""}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>Nama Tempat</label>
                  <input
                    type="text"
                    name="acara_resepsi_lokasi_nama"
                    value={formData.acara_resepsi_lokasi_nama || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Gedung Serbaguna"
                    className={inputClass}
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>Alamat Lengkap</label>
                  <textarea
                    name="acara_resepsi_lokasi_alamat"
                    value={formData.acara_resepsi_lokasi_alamat || ""}
                    onChange={handleChange}
                    placeholder="Contoh: Jl. Kemerdekaan No. 2, Jakarta"
                    className={`${inputClass} resize-none h-[100px]`}
                  />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>Link Google Maps</label>
                  <input
                    type="url"
                    name="acara_resepsi_lokasi_url"
                    value={formData.acara_resepsi_lokasi_url || ""}
                    onChange={handleChange}
                    placeholder="https://maps.app.goo.gl/..."
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="button" onClick={handlePrev} className={btnPrevClass} aria-label="Kembali">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button type="submit" className={`flex-1 ${btnNextClass}`}>
                  Selanjutnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 4 — Galeri & Musik */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.4 }}
              className="space-y-[32px]"
            >
              <div>
                <h2 className={headingClass}>Galeri & Musik</h2>
                <p className={descClass}>Upload foto untuk galeri dan tentukan lagu yang akan diputar.</p>
              </div>

              <div className="space-y-[24px]">
                <div className="space-y-[16px]">
                  {fotoUrls.map((url, idx) => (
                    <div key={idx} className="space-y-[8px]">
                      <label className={labelClass}>Foto Galeri {idx + 1}</label>
                      <div className="relative w-full h-[120px] rounded-[6px] overflow-hidden border border-hairline">
                        <img src={url} alt={`Foto ${idx+1}`} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removePhoto(idx)} className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {fotoUrls.length < 16 && (
                    <div className="space-y-[8px]">
                      <label className={labelClass}>Foto Galeri {fotoUrls.length + 1}</label>
                      <label className={`flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploadingIndices.uploading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-berry dark:hover:border-pink'}`}>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {uploadingIndices.uploading ? (
                            <><Loader2 className="w-6 h-6 text-berry dark:text-pink mb-2 animate-spin" /><p className="text-sm text-ink-soft">Mengunggah...</p></>
                          ) : (
                            <><Upload className="w-6 h-6 text-ink-soft mb-2" /><p className="text-sm text-ink-soft">Klik untuk upload foto</p></>
                          )}
                        </div>
                        <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" disabled={uploadingIndices.uploading} onChange={handlePhotoUpload} />
                      </label>
                    </div>
                  )}
                </div>

                <hr className="border-hairline my-6" />

                <div className="space-y-[8px]">
                  <label className={labelClass}>Link Youtube Lagu *</label>
                  <input
                    type="url"
                    name="music_youtube_url"
                    value={formData.music_youtube_url || ""}
                    onChange={handleChange}
                    placeholder="Contoh: https://youtu.be/..."
                    className={inputClass}
                  />
                </div>
                
                <div className="space-y-[8px]">
                  <label className={labelClass}>Quote Musik</label>
                  <input
                    type="text"
                    name="music_quote"
                    value={formData.music_quote || ""}
                    onChange={handleChange}
                    placeholder="Contoh: A thousand years"
                    className={inputClass}
                  />
                  <p className="mt-1 text-[12px] text-ink-soft">Opsional — judul lagu/kutipan pendek yang tampil di pemutar musik.</p>
                </div>
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="button" onClick={handlePrev} className={btnPrevClass} aria-label="Kembali">
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button type="button" onClick={handleSubmit} className={`flex-1 ${btnNextClass}`}>
                  Simpan & Lanjut <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
