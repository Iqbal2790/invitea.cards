"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Upload, Trash2, Loader2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_STEPS = 3;

export default function WhisperingBloomForm({ template, formData, setFormData, handleChange, sessionId }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [uploadingIndices, setUploadingIndices] = useState({});

  // ── Theme Config (Whispering Bloom specific) ───────────────────────────────
  const colors = {
    bgDark: "#0D0D14",
    glowCore: "#FFC069",
    glowEdge: "#FF7A45",
    textIvory: "#F5F0E6",
    textMuted: "#B8B4AC",
    accentGold: "#E8C77E",
    stemBrown: "#3D2B1F"
  };

  const headingClass = "font-serif italic text-[2.4rem] text-[#F5F0E6] mb-[8px] leading-tight";
  const descClass = "font-sans text-[#B8B4AC] text-[15px] mb-[24px]";
  const labelClass = "text-[14px] font-sans font-semibold text-[#F5F0E6] block mb-2";
  const inputClass = "w-full px-[20px] py-[16px] bg-[#0D0D14] border border-[#3D2B1F] rounded-[6px] focus:outline-none focus:border-[#E8C77E] focus:ring-1 focus:ring-[#E8C77E] transition-all text-[15px] text-[#F5F0E6] placeholder:text-[#B8B4AC]/50";
  const inputSerifClass = "w-full px-[20px] py-[16px] bg-[#0D0D14] border border-[#3D2B1F] rounded-[6px] focus:outline-none focus:border-[#E8C77E] focus:ring-1 focus:ring-[#E8C77E] transition-all text-[16px] font-serif italic text-[#F5F0E6] placeholder:text-[#B8B4AC]/50";
  
  const btnNextClass = "group flex items-center justify-center gap-[10px] bg-transparent border border-[#FFC069] text-[#FFC069] py-[16px] px-[32px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-[#FFC069] hover:text-[#0D0D14] hover:shadow-[0_0_15px_#FFC069]";
  const btnPrevClass = "px-[24px] py-[16px] bg-transparent border-[1.5px] border-[#3D2B1F] text-[#B8B4AC] rounded-full font-medium hover:border-[#FFC069] hover:text-[#FFC069] transition-all duration-300 flex items-center justify-center";

  // ── Nav ──────────────────────────────────────────────────────────────────────
  const handleNext = (e) => { 
    e?.preventDefault(); 
    if (step === 1) {
      if (!formData.nama_penerima || !formData.momen || !formData.nama_pengirim) {
        alert("Semua data pada layar ini wajib diisi.");
        return;
      }
    }
    if (step === 2) {
      if (!formData.pesan) {
        alert("Pesan utama wajib diisi.");
        return;
      }
    }
    if (step === 3) {
      const fotoCount = Array.isArray(formData.foto_urls) ? formData.foto_urls.length : 0;
      if (fotoCount < 1 || fotoCount > 10) {
        alert("Galeri harus memiliki minimal 1 dan maksimal 10 foto.");
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
    
    if (fotoUrls.length + files.length > 10) {
      alert("Maksimal 10 foto diperbolehkan.");
      return;
    }

    try {
      setUploadingIndices(prev => ({ ...prev, uploading: true }));
      const uploadedUrls = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fd = new FormData();
        fd.append("file", file);
        fd.append("path", `user-uploads/${sessionId}`);

        const res = await fetch("/api/upload", { method: "POST", body: fd });
        if (!res.ok) throw new Error("Upload gagal");
        
        const resData = await res.json();
        uploadedUrls.push(resData.url);
      }

      setFormData(prev => ({
        ...prev,
        foto_urls: [...(prev.foto_urls || []), ...uploadedUrls]
      }));
    } catch (err) {
      console.error(err);
      alert("Gagal mengupload foto. Silakan coba lagi.");
    } finally {
      setUploadingIndices(prev => ({ ...prev, uploading: false }));
    }
  };

  const handleDeletePhoto = (index) => {
    const newPhotos = [...fotoUrls];
    newPhotos.splice(index, 1);
    setFormData(prev => ({ ...prev, foto_urls: newPhotos }));
  };

  // ── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col h-full bg-[#0D0D14] text-[#F5F0E6] overflow-hidden">
      {/* HEADER PROGRESS */}
      <div className="flex-none pt-[32px] pb-[16px] px-[24px]">
        <div className="flex gap-[6px] mb-[24px]">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div 
              key={i} 
              className={`h-[3px] rounded-full flex-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                i + 1 <= step ? "bg-[#FFC069] shadow-[0_0_8px_#FFC069]" : "bg-[#3D2B1F]"
              }`} 
            />
          ))}
        </div>
      </div>

      {/* BODY / SCROLLABLE */}
      <div className="flex-1 overflow-y-auto px-[24px] pb-[120px] custom-scrollbar">
        <AnimatePresence mode="wait">
          {/* STEP 1: INFORMASI UTAMA */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
            >
              <h1 className={headingClass}>Halo, siapa ini?</h1>
              <p className={descClass}>Mari mulai merangkai kenangan hangat di hari spesial ini.</p>

              <div className="space-y-[24px] mt-[32px]">
                <div>
                  <label className={labelClass}>Nama Penerima (Wajib)</label>
                  <input
                    type="text"
                    name="nama_penerima"
                    placeholder="Contoh: Anya Geraldine"
                    value={formData.nama_penerima || ""}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Momen Spesial (Wajib)</label>
                  <input
                    type="text"
                    name="momen"
                    placeholder="Contoh: Selamat Ulang Tahun"
                    value={formData.momen || ""}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Nama Pengirim (Wajib)</label>
                  <input
                    type="text"
                    name="nama_pengirim"
                    placeholder="Contoh: Budi"
                    value={formData.nama_pengirim || ""}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 2: PESAN & PENUTUP */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
            >
              <h1 className={headingClass}>Bisikan Cinta</h1>
              <p className={descClass}>Tulis pesan utama dan harapan spesial untuknya.</p>

              <div className="space-y-[24px] mt-[32px]">
                <div>
                  <label className={labelClass}>Pesan Utama (Wajib)</label>
                  <textarea
                    name="pesan"
                    placeholder="Tuliskan ucapan dan doamu di sini. Bisa sepanjang yang kamu inginkan..."
                    value={formData.pesan || ""}
                    onChange={handleChange}
                    rows={6}
                    className={`${inputSerifClass} resize-none`}
                  />
                </div>

                <div>
                  <label className={labelClass}>Kalimat Saat Bunga Mekar (Opsional)</label>
                  <input
                    type="text"
                    name="kalimat_penutup"
                    placeholder="Default: Semoga kebahagiaan selalu menyertaimu."
                    value={formData.kalimat_penutup || ""}
                    onChange={handleChange}
                    className={inputSerifClass}
                  />
                  <p className="text-[12px] text-[#B8B4AC] mt-1">Muncul saat bunga diklik (Screen 8).</p>
                </div>

                <div>
                  <label className={labelClass}>Signature Penutup (Opsional)</label>
                  <input
                    type="text"
                    name="signature_penutup"
                    placeholder="Default: Dengan cinta,"
                    value={formData.signature_penutup || ""}
                    onChange={handleChange}
                    className={inputSerifClass}
                  />
                  <p className="text-[12px] text-[#B8B4AC] mt-1">Kata pengantar sebelum namamu (Screen 9).</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: GALERI & MUSIK */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: [0.16,1,0.3,1] }}
            >
              <h1 className={headingClass}>Galeri & Melodi</h1>
              <p className={descClass}>Tambahkan foto kenangan (1 - 10 foto) dan lagu favorit (opsional).</p>

              <div className="space-y-[32px] mt-[32px]">
                
                {/* GALLERY UPLOAD */}
                <div>
                  <div className="flex items-center justify-between mb-[12px]">
                    <label className={`${labelClass} mb-0`}>Galeri Foto</label>
                    <span className="text-[12px] text-[#B8B4AC]">{fotoUrls.length} / 10</span>
                  </div>
                  
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-[12px]">
                    {fotoUrls.map((url, i) => (
                      <div key={i} className="relative aspect-[3/4] rounded-[6px] overflow-hidden border border-[#3D2B1F] group">
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-[#0D0D14]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleDeletePhoto(i)}
                            className="p-[10px] bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {fotoUrls.length < 10 && (
                      <label className="relative aspect-[3/4] rounded-[6px] border border-dashed border-[#3D2B1F] hover:border-[#FFC069] hover:bg-[#3D2B1F]/30 transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          className="hidden"
                          onChange={handlePhotoUpload}
                          disabled={uploadingIndices.uploading}
                        />
                        {uploadingIndices.uploading ? (
                          <Loader2 className="animate-spin text-[#FFC069]" size={24} />
                        ) : (
                          <>
                            <div className="w-[40px] h-[40px] rounded-full bg-[#3D2B1F] group-hover:bg-[#FFC069]/20 flex items-center justify-center text-[#B8B4AC] group-hover:text-[#FFC069] transition-colors">
                              <Plus size={20} />
                            </div>
                            <span className="text-[13px] font-medium text-[#B8B4AC] group-hover:text-[#FFC069]">Tambah Foto</span>
                          </>
                        )}
                      </label>
                    )}
                  </div>
                </div>

                {/* YOUTUBE */}
                <div>
                  <label className={labelClass}>Link Musik YouTube (Opsional)</label>
                  <input
                    type="url"
                    name="youtube_url"
                    placeholder="Contoh: https://youtube.com/watch?v=..."
                    value={formData.youtube_url || ""}
                    onChange={handleChange}
                    className={inputClass}
                  />
                  <p className="text-[12px] text-[#B8B4AC] mt-1">Jika dikosongkan, halaman pemutar musik tidak akan muncul.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex-none p-[24px] bg-[#0D0D14] border-t border-[#3D2B1F]">
        <div className="flex items-center gap-[12px]">
          {step > 1 && (
            <button type="button" onClick={handlePrev} className={btnPrevClass}>
              <ArrowLeft size={20} />
            </button>
          )}

          {step < TOTAL_STEPS ? (
            <button type="button" onClick={handleNext} className={`flex-1 ${btnNextClass}`}>
              <span>Lanjut</span>
              <ArrowRight size={18} className="group-hover:translate-x-[4px] transition-transform" />
            </button>
          ) : (
            <button type="button" onClick={handleSubmit} className={`flex-1 ${btnNextClass}`}>
              <span>Selesai & Simpan</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
