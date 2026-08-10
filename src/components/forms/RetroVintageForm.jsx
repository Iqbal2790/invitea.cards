"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Upload, Trash2, Loader2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function RetroVintageForm({ template, formData = {}, setFormData, handleChange, sessionId, initialData = {}, onPreviewUpdate }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [uploadingIndices, setUploadingIndices] = useState({});
  const totalSteps = 5;

  const data = formData && Object.keys(formData).length > 0 ? formData : initialData;

  const handleNext = (e) => {
    if (e) e.preventDefault();
    if (step === 1 && (!data.foto_cover || !data.foto_pria || !data.foto_wanita)) {
      alert("Foto Cover, Mempelai Pria, dan Wanita wajib diunggah.");
      return;
    }
    if (step === 4) {
      const fotoCount = Array.isArray(data.foto_urls) ? data.foto_urls.length : 0;
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
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("checkoutData", JSON.stringify({
        template: template || 'retro-vintage',
        formData: data
      }));
    }
    router.push("/checkout/custom");
  };

  const updateFormData = (updater) => {
    if (typeof updater === 'function') {
      const updated = updater(data);
      if (setFormData) setFormData(updated);
      if (onPreviewUpdate) onPreviewUpdate(updated);
    } else {
      const updated = { ...data, ...updater };
      if (setFormData) setFormData(updated);
      if (onPreviewUpdate) onPreviewUpdate(updated);
    }
  };

  const handleFieldChange = (e) => {
    if (handleChange) {
      handleChange(e);
    } else {
      const { name, value } = e.target;
      updateFormData({ [name]: value });
    }
  };

  const fotoUrls = Array.isArray(data.foto_urls) ? data.foto_urls : [];
  const loveStory = Array.isArray(data.love_story) ? data.love_story : [];
  const rekWanita = Array.isArray(data.rekening_wanita) ? data.rekening_wanita : [];
  const rekPria = Array.isArray(data.rekening_pria) ? data.rekening_pria : [];
  const dressWarna = Array.isArray(data.dresscode_warna) ? data.dresscode_warna : ["#F4EAD4", "#EADCB9", "#8B263E", "#2C1E16"];

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
      const resData = await response.json();
      if (!response.ok) throw new Error(resData.error || "Gagal upload foto");
      updateFormData({ [fieldName]: resData.url });
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
        const resData = await response.json();
        if (!response.ok) throw new Error(resData.error || "Gagal upload");
        uploadedUrls.push(resData.url);
      }
      updateFormData(prev => ({ ...prev, foto_urls: [...(prev.foto_urls || []), ...uploadedUrls] }));
    } catch (error) {
      alert(error.message);
    } finally {
      setUploadingIndices(prev => ({ ...prev, uploadingGallery: false }));
      if (e.target) e.target.value = '';
    }
  };

  const removeGalleryPhoto = (index) => {
    const newPhotos = [...fotoUrls];
    newPhotos.splice(index, 1);
    updateFormData({ foto_urls: newPhotos });
  };

  const addLoveStory = () => updateFormData(prev => ({...prev, love_story: [...loveStory, {tanggal:"", judul:"", deskripsi:""}]}));
  const updateLoveStoryItem = (i, field, val) => {
    const arr = loveStory.length > 0 ? [...loveStory] : [{tanggal:"", judul:"", deskripsi:""}];
    if (!arr[i]) arr[i] = {tanggal:"", judul:"", deskripsi:""};
    arr[i][field] = val;
    updateFormData({ love_story: arr });
  };
  const removeLoveStory = (i) => updateFormData({ love_story: loveStory.filter((_, idx) => idx !== i) });

  const addRekening = (type) => {
    const target = type === 'wanita' ? rekWanita : rekPria;
    const fieldName = type === 'wanita' ? 'rekening_wanita' : 'rekening_pria';
    updateFormData({ [fieldName]: [...target, {bank:"", nomor:"", atas_nama:""}] });
  };
  const updateRekeningItem = (type, i, field, val) => {
    const target = type === 'wanita' ? [...rekWanita] : [...rekPria];
    if (!target[i]) target[i] = {bank:"", nomor:"", atas_nama:""};
    target[i][field] = val;
    const fieldName = type === 'wanita' ? 'rekening_wanita' : 'rekening_pria';
    updateFormData({ [fieldName]: target });
  };
  const removeRekening = (type, i) => {
    const target = type === 'wanita' ? rekWanita : rekPria;
    const fieldName = type === 'wanita' ? 'rekening_wanita' : 'rekening_pria';
    updateFormData({ [fieldName]: target.filter((_, idx) => idx !== i) });
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
      {/* Header Form Navigation (Step Progress Bar) */}
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
          
          {/* STEP 1: Data Mempelai & Foto Cover */}
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
                  <h3 className={sectionTitleClass}>Foto Sampul & Utama</h3>
                  
                  {/* Foto Cover */}
                  <div className="space-y-[8px]">
                    <label className={labelClass}>
                      Foto Pre-Wedding Sampul Depan (Cover)
                      <span className="text-[12px] text-ink-soft block mt-1 font-normal">(Foto yang muncul pertama kali saat undangan belum dibuka)</span>
                    </label>
                    {data.foto_cover ? (
                      <div className="relative w-full h-[140px] rounded-[6px] overflow-hidden border border-hairline">
                        <img src={data.foto_cover} alt="Cover" className="w-full h-full object-cover object-top" />
                        <button type="button" onClick={() => updateFormData({ foto_cover: '' })} className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    ) : (
                      <label className={`flex flex-col items-center justify-center w-full h-[140px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploadingIndices.foto_cover ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-berry dark:hover:border-pink'}`}>
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

                  {/* Foto Hero Section 1 */}
                  <div className="space-y-[8px]">
                    <label className={labelClass}>
                      Foto Pre-Wedding Section 1 (Hero)
                      <span className="text-[12px] text-ink-soft block mt-1 font-normal">(Foto yang muncul setelah tombol "Buka Undangan" diklik)</span>
                    </label>
                    {data.foto_hero ? (
                      <div className="relative w-full h-[140px] rounded-[6px] overflow-hidden border border-hairline">
                        <img src={data.foto_hero} alt="Section 1 Hero" className="w-full h-full object-cover object-top" />
                        <button type="button" onClick={() => updateFormData({ foto_hero: '' })} className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
                      </div>
                    ) : (
                      <label className={`flex flex-col items-center justify-center w-full h-[140px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploadingIndices.foto_hero ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-berry dark:hover:border-pink'}`}>
                        <input type="file" accept="image/*" onChange={(e) => handleSinglePhotoUpload(e, 'foto_hero')} className="hidden" disabled={uploadingIndices.foto_hero} />
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          {uploadingIndices.foto_hero ? (
                            <>
                              <Loader2 className="w-6 h-6 text-berry dark:text-pink mb-2 animate-spin" />
                              <p className="text-sm text-ink-soft">Mengunggah...</p>
                            </>
                          ) : (
                            <>
                              <Upload className="w-6 h-6 text-ink-soft mb-2" />
                              <p className="text-sm text-ink-soft">Klik untuk upload foto section 1</p>
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
                  <div><label className={labelClass}>Nama Panggilan Pria</label><input type="text" name="nama_panggilan_pria" value={data.nama_panggilan_pria || ''} onChange={handleFieldChange} className={inputClass} placeholder="Bagus" required /></div>
                  <div><label className={labelClass}>Nama Lengkap Pria</label><input type="text" name="nama_lengkap_pria" value={data.nama_lengkap_pria || ''} onChange={handleFieldChange} className={inputClass} placeholder="Bagus Setyawan, S.T." required /></div>
                  <div><label className={labelClass}>Nama Ayah Pria</label><input type="text" name="nama_ayah_pria" value={data.nama_ayah_pria || ''} onChange={handleFieldChange} className={inputClass} placeholder="Bapak Hendra Setyawan" required /></div>
                  <div><label className={labelClass}>Nama Ibu Pria</label><input type="text" name="nama_ibu_pria" value={data.nama_ibu_pria || ''} onChange={handleFieldChange} className={inputClass} placeholder="Ibu Sari Wulandari" required /></div>
                  <div className="space-y-[8px]">
                    <label className={labelClass}>
                      Foto Mempelai Pria
                      <span className="text-[12px] text-ink-soft block mt-1 font-normal">(Direkomendasikan ukuran foto 1:1)</span>
                    </label>
                    {data.foto_pria ? (
                      <div className="relative w-full h-[120px] rounded-[6px] overflow-hidden border border-hairline">
                        <img src={data.foto_pria} alt="Groom" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => updateFormData({ foto_pria: '' })} className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
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
                  <div><label className={labelClass}>Nama Panggilan Wanita</label><input type="text" name="nama_panggilan_wanita" value={data.nama_panggilan_wanita || ''} onChange={handleFieldChange} className={inputClass} placeholder="Kartika" required /></div>
                  <div><label className={labelClass}>Nama Lengkap Wanita</label><input type="text" name="nama_lengkap_wanita" value={data.nama_lengkap_wanita || ''} onChange={handleFieldChange} className={inputClass} placeholder="Kartika Ayu, S.E." required /></div>
                  <div><label className={labelClass}>Nama Ayah Wanita</label><input type="text" name="nama_ayah_wanita" value={data.nama_ayah_wanita || ''} onChange={handleFieldChange} className={inputClass} placeholder="Bapak Bambang Prasetyo" required /></div>
                  <div><label className={labelClass}>Nama Ibu Wanita</label><input type="text" name="nama_ibu_wanita" value={data.nama_ibu_wanita || ''} onChange={handleFieldChange} className={inputClass} placeholder="Ibu Ratna Kusuma" required /></div>
                  <div className="space-y-[8px]">
                    <label className={labelClass}>
                      Foto Mempelai Wanita
                      <span className="text-[12px] text-ink-soft block mt-1 font-normal">(Direkomendasikan ukuran foto 1:1)</span>
                    </label>
                    {data.foto_wanita ? (
                      <div className="relative w-full h-[120px] rounded-[6px] overflow-hidden border border-hairline">
                        <img src={data.foto_wanita} alt="Bride" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => updateFormData({ foto_wanita: '' })} className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"><Trash2 className="w-4 h-4"/></button>
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

              <div className="pt-4">
                <button type="submit" className={`w-full ${btnNextClass}`}>
                  <span>Lanjut: Detail Acara</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 2: Detail Acara & Lokasi */}
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
                <p className={descClass}>Atur waktu countdown serta tanggal & lokasi Akad dan Resepsi.</p>
              </div>

              <div className="space-y-[24px]">
                {/* Hitung Mundur */}
                <div className="space-y-[16px]">
                  <h3 className={sectionTitleClass}>Target Hitung Mundur</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className={labelClass}>Tanggal Acara</label>
                      <input type="date" name="tanggal_acara" value={data.tanggal_acara || ''} onChange={handleFieldChange} className={inputClass} required />
                    </div>
                    <div>
                      <label className={labelClass}>Waktu Mulai</label>
                      <input type="time" name="waktu_acara" value={data.waktu_acara || ''} onChange={handleFieldChange} className={inputClass} required />
                    </div>
                  </div>
                </div>

                {/* Akad Nikah */}
                <div className="space-y-[16px]">
                  <h3 className={sectionTitleClass}>Acara Akad Nikah</h3>
                  <div><label className={labelClass}>Nama Acara</label><input type="text" name="acara_akad_nama" value={data.acara_akad_nama || 'Akad Nikah'} onChange={handleFieldChange} className={inputClass} required /></div>
                  <div><label className={labelClass}>Tanggal Teks</label><input type="text" name="acara_akad_tanggal" value={data.acara_akad_tanggal || ''} onChange={handleFieldChange} className={inputClass} placeholder="Sabtu, 12 Desember 2026" required /></div>
                  <div><label className={labelClass}>Waktu / Jam</label><input type="text" name="acara_akad_jam" value={data.acara_akad_jam || ''} onChange={handleFieldChange} className={inputClass} placeholder="08:00 - 10:00 WIB" required /></div>
                  <div><label className={labelClass}>Alamat / Lokasi</label><textarea rows={2} name="acara_akad_lokasi" value={data.acara_akad_lokasi || ''} onChange={handleFieldChange} className={inputClass} placeholder="Masjid Agung Kota, Jl. Merdeka No. 45" required /></div>
                  <div><label className={labelClass}>Google Maps URL / Embed</label><input type="text" name="acara_akad_maps_url" value={data.acara_akad_maps_url || ''} onChange={handleFieldChange} className={inputClass} placeholder="https://maps.google.com/..." /></div>
                </div>

                {/* Resepsi Nikah */}
                <div className="space-y-[16px]">
                  <h3 className={sectionTitleClass}>Acara Resepsi Nikah</h3>
                  <div><label className={labelClass}>Nama Acara</label><input type="text" name="acara_resepsi_nama" value={data.acara_resepsi_nama || 'Resepsi Nikah'} onChange={handleFieldChange} className={inputClass} /></div>
                  <div><label className={labelClass}>Tanggal Teks</label><input type="text" name="acara_resepsi_tanggal" value={data.acara_resepsi_tanggal || ''} onChange={handleFieldChange} className={inputClass} placeholder="Sabtu, 12 Desember 2026" /></div>
                  <div><label className={labelClass}>Waktu / Jam</label><input type="text" name="acara_resepsi_jam" value={data.acara_resepsi_jam || ''} onChange={handleFieldChange} className={inputClass} placeholder="11:00 - 14:00 WIB" /></div>
                  <div><label className={labelClass}>Alamat / Lokasi</label><textarea rows={2} name="acara_resepsi_lokasi" value={data.acara_resepsi_lokasi || ''} onChange={handleFieldChange} className={inputClass} placeholder="Gedung Serbaguna Utama, Jl. Ahmad Yani No. 100" /></div>
                  <div><label className={labelClass}>Google Maps URL / Embed</label><input type="text" name="acara_resepsi_maps_url" value={data.acara_resepsi_maps_url || ''} onChange={handleFieldChange} className={inputClass} placeholder="https://maps.google.com/..." /></div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button type="button" onClick={handlePrev} className={btnPrevClass}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> <span>Kembali</span>
                </button>
                <button type="submit" className={`flex-1 ${btnNextClass}`}>
                  <span>Lanjut: Kisah Cinta</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 3: Quote & Kisah Cinta */}
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
                <h2 className={headingClass}>Cerita & Quote</h2>
                <p className={descClass}>Tuliskan kutipan/doa favorit dan garis waktu perjalanan cinta Anda.</p>
              </div>

              <div className="space-y-[24px]">
                {/* Quote */}
                <div className="space-y-[16px]">
                  <h3 className={sectionTitleClass}>Kutipan / Quote</h3>
                  <div>
                    <label className={labelClass}>Teks Kutipan</label>
                    <textarea rows={3} name="quote_text" value={data.quote_text || ''} onChange={handleFieldChange} className={inputClass} placeholder="Cinta bukan tentang mencari seseorang yang sempurna..." />
                  </div>
                  <div>
                    <label className={labelClass}>Penulis / Sumber Quote</label>
                    <input type="text" name="quote_author" value={data.quote_author || ''} onChange={handleFieldChange} className={inputClass} placeholder="Doa & Harapan Kami" />
                  </div>
                </div>

                {/* Love Story Timeline */}
                <div className="space-y-[16px]">
                  <div className="flex items-center justify-between border-b border-hairline pb-2">
                    <h3 className="text-[16px] font-semibold text-ink">Garis Waktu Kisah Cinta</h3>
                    <button type="button" onClick={addLoveStory} className="inline-flex items-center text-xs font-bold text-berry dark:text-pink hover:underline gap-1">
                      <Plus className="w-3.5 h-3.5" /> Tambah Momen
                    </button>
                  </div>

                  {loveStory.length === 0 ? (
                    <p className="text-xs text-ink-soft italic">Belum ada cerita cinta. Klik "Tambah Momen" untuk menambahkan.</p>
                  ) : (
                    loveStory.map((item, idx) => (
                      <div key={idx} className="p-4 bg-bg-alt rounded-[8px] border border-hairline space-y-3 relative">
                        <button type="button" onClick={() => removeLoveStory(idx)} className="absolute top-3 right-3 text-red-500 hover:text-red-700"><Trash2 className="w-4 h-4"/></button>
                        <span className="text-xs font-bold text-berry uppercase tracking-wider block">Momen #{idx + 1}</span>
                        <div><label className={labelClass}>Tahun / Tanggal</label><input type="text" value={item.tanggal || ''} onChange={(e) => updateLoveStoryItem(idx, 'tanggal', e.target.value)} className={inputClass} placeholder="2021" /></div>
                        <div><label className={labelClass}>Judul Momen</label><input type="text" value={item.judul || ''} onChange={(e) => updateLoveStoryItem(idx, 'judul', e.target.value)} className={inputClass} placeholder="Awal Pertemuan" /></div>
                        <div><label className={labelClass}>Deskripsi Singkat</label><textarea rows={2} value={item.deskripsi || ''} onChange={(e) => updateLoveStoryItem(idx, 'deskripsi', e.target.value)} className={inputClass} placeholder="Pertama kali bertemu saat..." /></div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button type="button" onClick={handlePrev} className={btnPrevClass}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> <span>Kembali</span>
                </button>
                <button type="submit" className={`flex-1 ${btnNextClass}`}>
                  <span>Lanjut: Galeri Foto</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 4: Galeri Foto */}
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
                <h2 className={headingClass}>Galeri Kenangan</h2>
                <p className={descClass}>Unggah momen pre-wedding terbaik Anda (Maksimal 16 foto).</p>
              </div>

              <div className="space-y-[16px]">
                <label className={`flex flex-col items-center justify-center w-full h-[140px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploadingIndices.uploadingGallery ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-berry dark:hover:border-pink'}`}>
                  <input type="file" accept="image/*" multiple onChange={handlePhotoUpload} className="hidden" disabled={uploadingIndices.uploadingGallery} />
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploadingIndices.uploadingGallery ? (
                      <>
                        <Loader2 className="w-6 h-6 text-berry dark:text-pink mb-2 animate-spin" />
                        <p className="text-sm text-ink-soft">Mengunggah foto-foto...</p>
                      </>
                    ) : (
                      <>
                        <Upload className="w-6 h-6 text-ink-soft mb-2" />
                        <p className="text-sm font-semibold text-ink">Klik untuk upload foto galeri</p>
                        <p className="text-xs text-ink-soft mt-1">Bisa pilih beberapa foto sekaligus</p>
                      </>
                    )}
                  </div>
                </label>

                {fotoUrls.length > 0 && (
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    {fotoUrls.map((url, idx) => (
                      <div key={idx} className="relative aspect-square rounded-[6px] overflow-hidden border border-hairline group">
                        <img src={url} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                        <button type="button" onClick={() => removeGalleryPhoto(idx)} className="absolute top-1 right-1 bg-black/60 text-white p-1.5 rounded-full hover:bg-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5"/></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button type="button" onClick={handlePrev} className={btnPrevClass}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> <span>Kembali</span>
                </button>
                <button type="submit" className={`flex-1 ${btnNextClass}`}>
                  <span>Lanjut: Rekening & Fitur</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 5: Rekening Bank, Live Stream, Dress Code & Penutup */}
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
                <h2 className={headingClass}>Amplop & Fitur Tambahan</h2>
                <p className={descClass}>Lengkapi rekening amplop digital, link siaran virtual, dan panduan busana.</p>
              </div>

              <div className="space-y-[24px]">
                {/* Rekening Mempelai Pria */}
                <div className="space-y-[16px]">
                  <div className="flex items-center justify-between border-b border-hairline pb-2">
                    <h3 className="text-[16px] font-semibold text-ink">Rekening Mempelai Pria</h3>
                    <button type="button" onClick={() => addRekening('pria')} className="inline-flex items-center text-xs font-bold text-berry dark:text-pink hover:underline gap-1">
                      <Plus className="w-3.5 h-3.5" /> Tambah Rekening
                    </button>
                  </div>
                  {rekPria.map((item, idx) => (
                    <div key={idx} className="p-3 bg-bg-alt rounded-[8px] border border-hairline space-y-2 relative">
                      <button type="button" onClick={() => removeRekening('pria', idx)} className="absolute top-2 right-2 text-red-500"><Trash2 className="w-3.5 h-3.5"/></button>
                      <div><label className={labelClass}>Nama Bank / e-Wallet</label><input type="text" value={item.bank || ''} onChange={(e) => updateRekeningItem('pria', idx, 'bank', e.target.value)} className={inputClass} placeholder="BCA" /></div>
                      <div><label className={labelClass}>Nomor Rekening</label><input type="text" value={item.nomor || ''} onChange={(e) => updateRekeningItem('pria', idx, 'nomor', e.target.value)} className={inputClass} placeholder="1234567890" /></div>
                      <div><label className={labelClass}>Atas Nama</label><input type="text" value={item.atas_nama || ''} onChange={(e) => updateRekeningItem('pria', idx, 'atas_nama', e.target.value)} className={inputClass} placeholder="Bagus Setyawan" /></div>
                    </div>
                  ))}
                </div>

                {/* Rekening Mempelai Wanita */}
                <div className="space-y-[16px]">
                  <div className="flex items-center justify-between border-b border-hairline pb-2">
                    <h3 className="text-[16px] font-semibold text-ink">Rekening Mempelai Wanita</h3>
                    <button type="button" onClick={() => addRekening('wanita')} className="inline-flex items-center text-xs font-bold text-berry dark:text-pink hover:underline gap-1">
                      <Plus className="w-3.5 h-3.5" /> Tambah Rekening
                    </button>
                  </div>
                  {rekWanita.map((item, idx) => (
                    <div key={idx} className="p-3 bg-bg-alt rounded-[8px] border border-hairline space-y-2 relative">
                      <button type="button" onClick={() => removeRekening('wanita', idx)} className="absolute top-2 right-2 text-red-500"><Trash2 className="w-3.5 h-3.5"/></button>
                      <div><label className={labelClass}>Nama Bank / e-Wallet</label><input type="text" value={item.bank || ''} onChange={(e) => updateRekeningItem('wanita', idx, 'bank', e.target.value)} className={inputClass} placeholder="Mandiri" /></div>
                      <div><label className={labelClass}>Nomor Rekening</label><input type="text" value={item.nomor || ''} onChange={(e) => updateRekeningItem('wanita', idx, 'nomor', e.target.value)} className={inputClass} placeholder="0987654321" /></div>
                      <div><label className={labelClass}>Atas Nama</label><input type="text" value={item.atas_nama || ''} onChange={(e) => updateRekeningItem('wanita', idx, 'atas_nama', e.target.value)} className={inputClass} placeholder="Kartika Ayu" /></div>
                    </div>
                  ))}
                </div>

                {/* Live Stream URLs */}
                <div className="space-y-[16px]">
                  <h3 className={sectionTitleClass}>Siaran Virtual / Live Stream (Opsional)</h3>
                  <div><label className={labelClass}>YouTube Live URL</label><input type="text" name="live_youtube_url" value={data.live_youtube_url || ''} onChange={handleFieldChange} className={inputClass} placeholder="https://youtube.com/live/..." /></div>
                  <div><label className={labelClass}>Zoom Meeting URL</label><input type="text" name="live_zoom_url" value={data.live_zoom_url || ''} onChange={handleFieldChange} className={inputClass} placeholder="https://zoom.us/j/..." /></div>
                  <div><label className={labelClass}>Google Meet URL</label><input type="text" name="live_meet_url" value={data.live_meet_url || ''} onChange={handleFieldChange} className={inputClass} placeholder="https://meet.google.com/..." /></div>
                </div>

                {/* Dress Code & Ucapan Terima Kasih */}
                <div className="space-y-[16px]">
                  <h3 className={sectionTitleClass}>Dress Code & Penutup</h3>
                  <div><label className={labelClass}>Panduan Dress Code</label><textarea rows={2} name="dresscode_desc" value={data.dresscode_desc || ''} onChange={handleFieldChange} className={inputClass} placeholder="Disarankan mengenakan pakaian bernuansa Retro / Earthy Tone." /></div>
                  <div><label className={labelClass}>Pesan Ucapan Terima Kasih</label><textarea rows={3} name="ucapan_terima_kasih" value={data.ucapan_terima_kasih || ''} onChange={handleFieldChange} className={inputClass} placeholder="Merupakan suatu kehormatan dan kebahagiaan bagi kami..." /></div>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button type="button" onClick={handlePrev} className={btnPrevClass}>
                  <ArrowLeft className="w-4 h-4 mr-2" /> <span>Kembali</span>
                </button>
                <button type="submit" className={`flex-1 ${btnNextClass}`}>
                  <span>Simpan & Lanjut Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.form>
          )}

        </AnimatePresence>
      </div>
    </>
  );
}
