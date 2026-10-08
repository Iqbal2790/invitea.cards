"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Upload, Trash2, Loader2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SunnySlabForm({ template, formData, setFormData, handleChange, sessionId }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [uploadingIndices, setUploadingIndices] = useState({});
  const totalSteps = 5;

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && (!formData.foto_cover || !formData.foto_pria || !formData.foto_wanita)) {
      alert("Foto Cover, Mempelai Pria, dan Wanita wajib diunggah.");
      return;
    }
    if (step === 3) {
      const fotoCount = Array.isArray(formData.foto_urls) ? formData.foto_urls.length : 0;
      if (fotoCount > 16) {
        alert("Galeri maksimal 16 foto.");
        return;
      }
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    sessionStorage.setItem("checkoutData", JSON.stringify({
      template: template,
      formData: formData
    }));
    router.push("/checkout/custom");
  };

  const fotoUrls = Array.isArray(formData.foto_urls) ? formData.foto_urls : [];
  const loveStory = Array.isArray(formData.love_story) ? formData.love_story : [];
  const rekWanita = Array.isArray(formData.rekening_wanita) ? formData.rekening_wanita : [];
  const rekPria = Array.isArray(formData.rekening_pria) ? formData.rekening_pria : [];
  const dressWarna = Array.isArray(formData.dresscode_warna) ? formData.dresscode_warna : ["#F7F2E9", "#C9D9E8", "#111111"];

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
      setFormData(prev => ({ ...prev, [fieldName]: data.url }));
    } catch (error) {
      alert(error.message);
    } finally {
      setUploadingIndices(prev => ({ ...prev, [fieldName]: false }));
      if (e.target) e.target.value = '';
    }
  };

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    if (fotoUrls.length + files.length > 16) { alert("Maksimal 16 foto diperbolehkan."); return; }

    try {
      setUploadingIndices(prev => ({ ...prev, uploadingGallery: true }));
      const uploadedUrls = [];
      for (let i = 0; i < files.length; i++) {
        const uploadData = new FormData();
        uploadData.append("file", files[i]);
        uploadData.append("sessionId", sessionId || "uploads");
        uploadData.append("slot", `gallery_${fotoUrls.length + i}`); 
        const response = await fetch("/api/upload", { method: "POST", body: uploadData });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Gagal upload");
        uploadedUrls.push(data.url);
      }
      setFormData(prev => ({ ...prev, foto_urls: [...(prev.foto_urls || []), ...uploadedUrls] }));
    } catch (error) {
      alert(error.message);
    } finally {
      setUploadingIndices(prev => ({ ...prev, uploadingGallery: false }));
      if (e.target) e.target.value = '';
    }
  };

  const addLoveStory = () => setFormData(prev => ({...prev, love_story: [...loveStory, {tanggal:"", judul:"", deskripsi:""}]}));
  const updateLoveStory = (i, field, val) => {
    const arr = [...loveStory]; arr[i][field] = val;
    setFormData(prev => ({...prev, love_story: arr}));
  };
  const removeLoveStory = (i) => setFormData(prev => ({...prev, love_story: loveStory.filter((_, idx) => idx !== i)}));

  const addRekening = (type) => {
    const target = type === 'wanita' ? rekWanita : rekPria;
    setFormData(prev => ({...prev, [type === 'wanita' ? 'rekening_wanita' : 'rekening_pria']: [...target, {bank:"", nomor:"", atas_nama:""}]}));
  };
  const updateRekening = (type, i, field, val) => {
    const target = type === 'wanita' ? [...rekWanita] : [...rekPria];
    target[i][field] = val;
    setFormData(prev => ({...prev, [type === 'wanita' ? 'rekening_wanita' : 'rekening_pria']: target}));
  };
  const removeRekening = (type, i) => {
    const target = type === 'wanita' ? rekWanita : rekPria;
    setFormData(prev => ({...prev, [type === 'wanita' ? 'rekening_wanita' : 'rekening_pria']: target.filter((_, idx) => idx !== i)}));
  };

  const inputClass = "w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50";
  const labelClass = "text-[14px] font-semibold text-ink block mb-[4px]";
  const headingClass = "font-serif italic text-[2.4rem] text-ink mb-[8px] leading-tight";
  const descClass = "text-ink-soft text-[15px] mb-[16px]";
  const sectionTitleClass = "text-[16px] font-semibold text-ink pt-2 pb-1 border-b border-hairline mb-4";
  const btnNextClass = "group flex items-center justify-center gap-[10px] bg-pink-btn-bg text-cream-text py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)]";
  const btnPrevClass = "px-[24px] py-[16px] bg-transparent border-[1.5px] border-hairline text-ink rounded-full font-medium hover:border-berry dark:hover:border-pink transition-all duration-300 flex items-center justify-center";

  return (
    <>
      {/* Header Form Navigation */}
      <div className="absolute top-0 left-0 w-full bg-header-bg backdrop-blur-[10px] border-b border-header-border p-[24px] z-20 flex items-center justify-between transition-colors duration-400">
        <div className="flex gap-[8px] mx-auto overflow-x-auto px-4 max-w-full">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div 
              key={i}
              className={`h-[6px] w-[20px] md:w-[32px] rounded-full flex-shrink-0 ${step >= i + 1 ? 'bg-berry dark:bg-pink shadow-[0_2px_8px_-2px_var(--shadow-pink)]' : 'bg-hairline'} transition-colors duration-500`} 
            />
          ))}
        </div>
      </div>

      <div className="max-w-[440px] w-full mx-auto mt-24 mb-12 font-sans px-4 md:px-0">
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
                <h2 className={headingClass}>Data Mempelai</h2>
                <p className={descClass}>Masukkan informasi lengkap mempelai pria & wanita beserta fotonya.</p>
              </div>

              <div className="space-y-[24px]">
                {/* Foto Cover */}
                <div className="space-y-[16px]">
                  <h3 className={sectionTitleClass}>Foto Sampul (Cover)</h3>
                  <div className="space-y-[8px]">
                    <label className={labelClass}>
                      Foto Pre-Wedding Utama
                      <span className="text-[12px] text-ink-soft block mt-1 font-normal">(Direkomendasikan rasio potret/vertikal)</span>
                    </label>
                    {formData.foto_cover ? (
                      <div className="relative w-full h-[160px] rounded-[6px] overflow-hidden border border-hairline">
                        <img src={formData.foto_cover} alt="Cover" className="w-full h-full object-cover object-top" />
                        <button type="button" onClick={() => setFormData(p => ({...p, foto_cover: ''}))} className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    ) : (
                      <label className={`flex flex-col items-center justify-center w-full h-[160px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploadingIndices.foto_cover ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-berry dark:hover:border-pink'}`}>
                        <input type="file" accept="image/*" onChange={(e) => handleSinglePhotoUpload(e, 'foto_cover')} className="hidden" disabled={uploadingIndices.foto_cover} />
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {uploadingIndices.foto_cover ? (
                            <>
                              <Loader2 className="w-6 h-6 text-berry dark:text-pink mb-2 animate-spin" />
                              <p className="text-sm text-ink-soft">Mengunggah...</p>
                            </>
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-ink-soft mb-2" />
                              <p className="text-sm text-ink-soft">Klik untuk upload foto cover</p>
                            </>
                          )}
                        </div>
                      </label>
                    )}
                  </div>
                </div>

                {/* Mempelai Pria */}
                <div className="space-y-[16px]">
                  <h3 className={sectionTitleClass}>Mempelai Pria</h3>
                  <div><label className={labelClass}>Nama Panggilan Pria</label><input type="text" name="nama_panggilan_pria" value={formData.nama_panggilan_pria || ''} onChange={handleChange} className={inputClass} placeholder="Bagas" required /></div>
                  <div><label className={labelClass}>Nama Lengkap Pria</label><input type="text" name="nama_lengkap_pria" value={formData.nama_lengkap_pria || ''} onChange={handleChange} className={inputClass} placeholder="Bagas Wirawan" required /></div>
                  <div><label className={labelClass}>Nama Ayah</label><input type="text" name="nama_ayah_pria" value={formData.nama_ayah_pria || ''} onChange={handleChange} className={inputClass} placeholder="Bapak Hendra" required /></div>
                  <div><label className={labelClass}>Nama Ibu</label><input type="text" name="nama_ibu_pria" value={formData.nama_ibu_pria || ''} onChange={handleChange} className={inputClass} placeholder="Ibu Sari" required /></div>
                  <div className="space-y-[8px]">
                    <label className={labelClass}>
                      Foto Mempelai Pria
                      <span className="text-[12px] text-ink-soft block mt-1 font-normal">(Direkomendasikan ukuran foto 1:1)</span>
                    </label>
                    {formData.foto_pria ? (
                      <div className="relative w-full h-[120px] rounded-[6px] overflow-hidden border border-hairline">
                        <img src={formData.foto_pria} alt="Groom" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setFormData(p => ({...p, foto_pria: ''}))} className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    ) : (
                      <label className={`flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploadingIndices.foto_pria ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-berry dark:hover:border-pink'}`}>
                        <input type="file" accept="image/*" onChange={(e) => handleSinglePhotoUpload(e, 'foto_pria')} className="hidden" disabled={uploadingIndices.foto_pria} />
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {uploadingIndices.foto_pria ? (
                            <>
                              <Loader2 className="w-6 h-6 text-berry dark:text-pink mb-2 animate-spin" />
                              <p className="text-sm text-ink-soft">Mengunggah...</p>
                            </>
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-ink-soft mb-2" />
                              <p className="text-sm text-ink-soft">Klik untuk upload foto pria</p>
                            </>
                          )}
                        </div>
                      </label>
                    )}
                  </div>
                </div>

                {/* Mempelai Wanita */}
                <div className="space-y-[16px]">
                  <h3 className={sectionTitleClass}>Mempelai Wanita</h3>
                  <div><label className={labelClass}>Nama Panggilan Wanita</label><input type="text" name="nama_panggilan_wanita" value={formData.nama_panggilan_wanita || ''} onChange={handleChange} className={inputClass} placeholder="Dinda" required /></div>
                  <div><label className={labelClass}>Nama Lengkap Wanita</label><input type="text" name="nama_lengkap_wanita" value={formData.nama_lengkap_wanita || ''} onChange={handleChange} className={inputClass} placeholder="Dinda Ayu Lestari" required /></div>
                  <div><label className={labelClass}>Nama Ayah</label><input type="text" name="nama_ayah_wanita" value={formData.nama_ayah_wanita || ''} onChange={handleChange} className={inputClass} placeholder="Bapak Somad" required /></div>
                  <div><label className={labelClass}>Nama Ibu</label><input type="text" name="nama_ibu_wanita" value={formData.nama_ibu_wanita || ''} onChange={handleChange} className={inputClass} placeholder="Ibu Ratna" required /></div>
                  <div className="space-y-[8px]">
                    <label className={labelClass}>
                      Foto Mempelai Wanita
                      <span className="text-[12px] text-ink-soft block mt-1 font-normal">(Direkomendasikan ukuran foto 1:1)</span>
                    </label>
                    {formData.foto_wanita ? (
                      <div className="relative w-full h-[120px] rounded-[6px] overflow-hidden border border-hairline">
                        <img src={formData.foto_wanita} alt="Bride" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => setFormData(p => ({...p, foto_wanita: ''}))} className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    ) : (
                      <label className={`flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploadingIndices.foto_wanita ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-berry dark:hover:border-pink'}`}>
                        <input type="file" accept="image/*" onChange={(e) => handleSinglePhotoUpload(e, 'foto_wanita')} className="hidden" disabled={uploadingIndices.foto_wanita} />
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {uploadingIndices.foto_wanita ? (
                            <>
                              <Loader2 className="w-6 h-6 text-berry dark:text-pink mb-2 animate-spin" />
                              <p className="text-sm text-ink-soft">Mengunggah...</p>
                            </>
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-ink-soft mb-2" />
                              <p className="text-sm text-ink-soft">Klik untuk upload foto wanita</p>
                            </>
                          )}
                        </div>
                      </label>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="submit" className={`w-full ${btnNextClass}`}>
                  Selanjutnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
                <h2 className={headingClass}>Detail Acara</h2>
                <p className={descClass}>Kapan dan dimana acara bahagia ini akan berlangsung?</p>
              </div>

              <div className="space-y-[24px]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                  <div><label className={labelClass}>Tgl Acara Utama (Countdown)</label><input type="date" name="tanggal_acara" value={formData.tanggal_acara || ''} onChange={handleChange} className={inputClass} required /></div>
                  <div><label className={labelClass}>Waktu Acara Utama</label><input type="time" name="waktu_acara" value={formData.waktu_acara || ''} onChange={handleChange} className={inputClass} required /></div>
                </div>

                <div className="space-y-[16px]">
                  <h3 className={sectionTitleClass}>Akad Nikah</h3>
                  <div><label className={labelClass}>Tanggal (Teks)</label><input type="text" name="acara_akad_tanggal" value={formData.acara_akad_tanggal || ''} onChange={handleChange} className={inputClass} placeholder="Sabtu, 14 Februari 2027" /></div>
                  <div><label className={labelClass}>Waktu (Teks)</label><input type="text" name="acara_akad_jam" value={formData.acara_akad_jam || ''} onChange={handleChange} className={inputClass} placeholder="08:00 - 10:00 WIB" /></div>
                  <div><label className={labelClass}>Lokasi Acara</label><textarea name="acara_akad_lokasi" value={formData.acara_akad_lokasi || ''} onChange={handleChange} className={inputClass} rows={2} placeholder="Kediaman Mempelai Wanita..."></textarea></div>
                  <div><label className={labelClass}>Link Google Maps</label><input type="url" name="acara_akad_maps_url" value={formData.acara_akad_maps_url || ''} onChange={handleChange} className={inputClass} placeholder="https://maps.app.goo.gl/..." /></div>
                </div>

                <div className="space-y-[16px]">
                  <h3 className={sectionTitleClass}>Resepsi</h3>
                  <div><label className={labelClass}>Tanggal (Teks)</label><input type="text" name="acara_resepsi_tanggal" value={formData.acara_resepsi_tanggal || ''} onChange={handleChange} className={inputClass} placeholder="Sabtu, 14 Februari 2027" /></div>
                  <div><label className={labelClass}>Waktu (Teks)</label><input type="text" name="acara_resepsi_jam" value={formData.acara_resepsi_jam || ''} onChange={handleChange} className={inputClass} placeholder="11:00 - 14:00 WIB" /></div>
                  <div><label className={labelClass}>Lokasi Acara</label><textarea name="acara_resepsi_lokasi" value={formData.acara_resepsi_lokasi || ''} onChange={handleChange} className={inputClass} rows={2} placeholder="Gedung Serbaguna..."></textarea></div>
                  <div><label className={labelClass}>Link Google Maps</label><input type="url" name="acara_resepsi_maps_url" value={formData.acara_resepsi_maps_url || ''} onChange={handleChange} className={inputClass} placeholder="https://maps.app.goo.gl/..." /></div>
                </div>

                <div>
                  <label className={labelClass}>Quote Pembuka</label>
                  <textarea name="quote_text" value={formData.quote_text || ''} onChange={handleChange} className={inputClass} rows={3}></textarea>
                </div>
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="button" onClick={handlePrev} className={btnPrevClass}>
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button type="submit" className={`flex-1 ${btnNextClass}`}>
                  Selanjutnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 3: Galeri & Live Stream */}
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
                <h2 className={headingClass}>Galeri & Live Stream</h2>
                <p className={descClass}>Tambahkan foto kenangan & tautan siaran langsung.</p>
              </div>

              <div className="space-y-[24px]">
                <div>
                  <label className={labelClass}>Galeri Foto (Max 16)</label>
                  <div className="grid grid-cols-3 gap-[10px] mb-[12px]">
                    {fotoUrls.map((url, i) => (
                      <div key={i} className="relative aspect-square border border-hairline rounded-[6px] overflow-hidden">
                        <img src={url} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => { const f = [...fotoUrls]; f.splice(i,1); setFormData(p=>({...p, foto_urls: f})) }} className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    ))}
                  </div>
                  {fotoUrls.length < 16 && (
                    <label className={`relative flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploadingIndices.uploadingGallery ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-berry dark:hover:border-pink'}`}>
                      <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" disabled={uploadingIndices.uploadingGallery} />
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploadingIndices.uploadingGallery ? (
                          <>
                            <Loader2 className="w-6 h-6 text-berry dark:text-pink mb-2 animate-spin" />
                            <p className="text-sm text-ink-soft">Mengunggah...</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-ink-soft mb-2" />
                            <p className="text-sm text-ink-soft">Tambah Foto Galeri</p>
                          </>
                        )}
                      </div>
                    </label>
                  )}
                </div>

                <div>
                  <h3 className={sectionTitleClass}>Background Music</h3>
                  <label className={labelClass}>Link Youtube (Opsional)</label>
                  <input type="url" name="youtube_url" value={formData.youtube_url || ''} onChange={handleChange} className={inputClass} placeholder="https://youtube.com/watch?v=..." />
                </div>

                <div className="space-y-[12px]">
                  <h3 className={sectionTitleClass}>Live Streaming (Opsional)</h3>
                  <div><label className={labelClass}>Google Meet URL</label><input type="url" name="live_meet_url" value={formData.live_meet_url || ''} onChange={handleChange} className={inputClass} /></div>
                  <div><label className={labelClass}>Youtube Live URL</label><input type="url" name="live_youtube_url" value={formData.live_youtube_url || ''} onChange={handleChange} className={inputClass} /></div>
                  <div><label className={labelClass}>Zoom URL</label><input type="url" name="live_zoom_url" value={formData.live_zoom_url || ''} onChange={handleChange} className={inputClass} /></div>
                  <div><label className={labelClass}>TikTok Live URL</label><input type="url" name="live_tiktok_url" value={formData.live_tiktok_url || ''} onChange={handleChange} className={inputClass} /></div>
                </div>
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="button" onClick={handlePrev} className={btnPrevClass}>
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button type="submit" className={`flex-1 ${btnNextClass}`}>
                  Selanjutnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 4: Cerita & Hadiah */}
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
                <h2 className={headingClass}>Cerita & Hadiah</h2>
                <p className={descClass}>Cerita perjalanan cinta dan nomor rekening hadiah digital.</p>
              </div>

              <div className="space-y-[24px]">
                <div>
                  <div className="flex justify-between items-center mb-[16px]">
                    <h3 className="text-[18px] font-semibold text-ink">Love Story</h3>
                    <button type="button" onClick={addLoveStory} className="text-berry dark:text-pink text-[13px] font-semibold hover:underline flex items-center gap-[4px]"><Plus className="w-4 h-4"/> Tambah</button>
                  </div>
                  {loveStory.map((item, i) => (
                    <div key={i} className="p-[16px] border border-hairline rounded-[6px] mb-[12px] bg-bg relative">
                      <button type="button" onClick={() => removeLoveStory(i)} className="absolute top-3 right-3 text-red-500 hover:bg-red-50 p-1 rounded-full transition-colors"><Trash2 className="w-4 h-4"/></button>
                      <div className="space-y-[12px] pr-[28px]">
                        <input type="text" placeholder="Tanggal (cth: Jan 2023)" value={item.tanggal} onChange={e => updateLoveStory(i, 'tanggal', e.target.value)} className={inputClass} />
                        <input type="text" placeholder="Judul Cerita" value={item.judul} onChange={e => updateLoveStory(i, 'judul', e.target.value)} className={inputClass} />
                        <textarea placeholder="Deskripsi cerita..." value={item.deskripsi} onChange={e => updateLoveStory(i, 'deskripsi', e.target.value)} className={inputClass} rows={2}></textarea>
                      </div>
                    </div>
                  ))}
                </div>

                <div>
                  <h3 className={sectionTitleClass}>Wedding Gift (Rekening)</h3>
                  
                  <div className="mb-[24px]">
                    <div className="flex justify-between items-center mb-[12px]">
                      <label className={labelClass}>Rekening {formData.nama_panggilan_wanita || "Mempelai Wanita"}</label>
                      <button type="button" onClick={() => addRekening('wanita')} className="text-berry dark:text-pink text-[13px] font-semibold hover:underline">+ Tambah Rekening</button>
                    </div>
                    {rekWanita.map((rek, i) => (
                      <div key={i} className="flex gap-[8px] mb-[12px]">
                        <input type="text" placeholder="Bank" value={rek.bank} onChange={e => updateRekening('wanita', i, 'bank', e.target.value)} className={`${inputClass} flex-1`} />
                        <input type="text" placeholder="Nomor" value={rek.nomor} onChange={e => updateRekening('wanita', i, 'nomor', e.target.value)} className={`${inputClass} flex-[2]`} />
                        <input type="text" placeholder="A.n" value={rek.atas_nama} onChange={e => updateRekening('wanita', i, 'atas_nama', e.target.value)} className={`${inputClass} flex-[2]`} />
                        <button type="button" onClick={() => removeRekening('wanita', i)} className="px-[12px] text-red-500 border border-hairline rounded-[6px] hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    ))}
                  </div>

                  <div className="mb-[24px]">
                    <div className="flex justify-between items-center mb-[12px]">
                      <label className={labelClass}>Rekening {formData.nama_panggilan_pria || "Mempelai Pria"}</label>
                      <button type="button" onClick={() => addRekening('pria')} className="text-berry dark:text-pink text-[13px] font-semibold hover:underline">+ Tambah Rekening</button>
                    </div>
                    {rekPria.map((rek, i) => (
                      <div key={i} className="flex gap-[8px] mb-[12px]">
                        <input type="text" placeholder="Bank" value={rek.bank} onChange={e => updateRekening('pria', i, 'bank', e.target.value)} className={`${inputClass} flex-1`} />
                        <input type="text" placeholder="Nomor" value={rek.nomor} onChange={e => updateRekening('pria', i, 'nomor', e.target.value)} className={`${inputClass} flex-[2]`} />
                        <input type="text" placeholder="A.n" value={rek.atas_nama} onChange={e => updateRekening('pria', i, 'atas_nama', e.target.value)} className={`${inputClass} flex-[2]`} />
                        <button type="button" onClick={() => removeRekening('pria', i)} className="px-[12px] text-red-500 border border-hairline rounded-[6px] hover:bg-red-50 transition-colors"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="button" onClick={handlePrev} className={btnPrevClass}>
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button type="submit" className={`flex-1 ${btnNextClass}`}>
                  Selanjutnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 5: Penyelesaian (Dress Code & Ucapan Penutup) */}
          {step === 5 && (
            <motion.form 
              key="step5"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onSubmit={handleSubmit}
              className="space-y-[32px]"
            >
              <div>
                <h2 className={headingClass}>Penyelesaian</h2>
                <p className={descClass}>Atur dresscode dan ucapan penutup undangan.</p>
              </div>

              <div className="space-y-[24px]">
                {/* Dress Code Section */}
                <div className="space-y-[16px]">
                  <h3 className={sectionTitleClass}>Dress Code / Busana Acara</h3>
                  
                  <div>
                    <label className={labelClass}>Warna Tema Dresscode (Maksimal 3 Warna)</label>
                    <p className="text-[13px] text-ink-soft mb-3">Pilih atau ketik kode warna (hex) yang ingin ditampilkan di undangan:</p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                      {[0, 1, 2].map((i) => (
                        <div key={i} className="flex items-center gap-2 p-2 border border-hairline rounded-[6px] bg-bg">
                          <div className="relative w-9 h-9 rounded-full overflow-hidden border border-hairline flex-shrink-0 cursor-pointer">
                            <input 
                              type="color" 
                              value={dressWarna[i] || "#ffffff"} 
                              onChange={(e) => {
                                const newWarna = [...dressWarna]; 
                                newWarna[i] = e.target.value;
                                setFormData(prev => ({...prev, dresscode_warna: newWarna}));
                              }} 
                              className="absolute -top-3 -left-3 w-16 h-16 p-0 border-0 cursor-pointer" 
                            />
                          </div>
                          <input 
                            type="text" 
                            value={dressWarna[i] || ""} 
                            onChange={(e) => {
                              const newWarna = [...dressWarna]; 
                              newWarna[i] = e.target.value;
                              setFormData(prev => ({...prev, dresscode_warna: newWarna}));
                            }} 
                            placeholder="#FFFFFF" 
                            className="w-full text-[13px] font-mono uppercase bg-transparent outline-none text-ink" 
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className={labelClass}>Catatan / Instruksi Dresscode</label>
                    <textarea 
                      name="dresscode_desc" 
                      value={formData.dresscode_desc || ''} 
                      onChange={handleChange} 
                      className={inputClass} 
                      rows={3} 
                      placeholder="Contoh: Mohon mengenakan pakaian dengan warna senada (Smart Casual / Formal)." 
                    />
                  </div>
                </div>

                {/* Ucapan Terima Kasih Section */}
                <div className="space-y-[16px]">
                  <h3 className={sectionTitleClass}>Ucapan Terima Kasih</h3>
                  <div>
                    <label className={labelClass}>Pesan Penutup Undangan</label>
                    <textarea name="ucapan_terima_kasih" value={formData.ucapan_terima_kasih || ''} onChange={handleChange} className={inputClass} rows={4} placeholder="Pesan ucapan terima kasih kepada para tamu..." />
                  </div>
                </div>
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="button" onClick={handlePrev} className={btnPrevClass}>
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button type="submit" className={`flex-1 ${btnNextClass}`}>
                  Selesai & Lanjut <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

        </AnimatePresence>
      </div>
    </>
  );
}
