"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Upload, Trash2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function IvoryLineForm({ template, formData, setFormData, handleChange, sessionId }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [uploadingIndices, setUploadingIndices] = useState({});
  const totalSteps = 5;

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1 && (!formData.foto_pria || !formData.foto_wanita)) {
      alert("Foto Mempelai Pria dan Wanita wajib diunggah.");
      return;
    }
    if (step === 2 && !formData.foto_cover) {
      alert("Foto Cover wajib diunggah.");
      return;
    }
    if (step === 4) {
      const fotoCount = Array.isArray(formData.foto_urls) ? formData.foto_urls.length : 0;
      if (fotoCount < 6 || fotoCount > 16) {
        alert("Galeri harus memiliki minimal 6 dan maksimal 16 foto.");
        return;
      }
    }
    if (step < totalSteps) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const bankAccounts = Array.isArray(formData.bank_accounts) ? formData.bank_accounts : [];
    if (bankAccounts.length === 0) {
      alert("Mohon tambahkan minimal 1 rekening bank.");
      return;
    }
    sessionStorage.setItem("checkoutData", JSON.stringify({
      template: template,
      formData: formData
    }));
    router.push("/checkout/custom");
  };

  // Pastikan formData.foto_urls selalu berbentuk array minimal kosong
  const fotoUrls = Array.isArray(formData.foto_urls) ? formData.foto_urls : [];

  const handlePhotoUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    // Batasi maksimum 16 foto
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

        const response = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Gagal upload foto");
        
        uploadedUrls.push(data.url);
      }

      setFormData(prev => ({ 
        ...prev, 
        foto_urls: [...(prev.foto_urls || []), ...uploadedUrls] 
      }));

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

      const response = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Gagal upload foto");
      
      setFormData(prev => ({ ...prev, [fieldName]: data.url }));

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

  const inputClass = "w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50";
  const labelClass = "text-[14px] font-semibold text-ink block mb-[4px]";
  const headingClass = "font-serif italic text-[2.4rem] text-ink mb-[8px] leading-tight";
  const descClass = "text-ink-soft text-[15px] mb-[16px]";
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
                <p className={descClass}>Silakan masukkan nama calon pengantin.</p>
              </div>
              
              <div className="space-y-[24px]">
                <div>
                  <label className={labelClass}>Nama Panggilan Pria</label>
                  <input type="text" name="nama_panggilan_pria" required value={formData.nama_panggilan_pria || ''} onChange={handleChange} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Nama Panggilan Wanita</label>
                  <input type="text" name="nama_panggilan_wanita" required value={formData.nama_panggilan_wanita || ''} onChange={handleChange} className={inputClass} />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>
                    Foto Mempelai Pria
                    <span className="text-[12px] text-ink-soft block mt-1 font-normal">(Direkomendasikan ukuran foto 1:1)</span>
                  </label>
                  {formData.foto_pria ? (
                    <div className="relative w-full h-[120px] rounded-[6px] overflow-hidden border border-hairline">
                      <img src={formData.foto_pria} alt="Pria" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeSinglePhoto('foto_pria')}
                        className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className={`flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploadingIndices['foto_pria'] ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-berry dark:hover:border-pink'}`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploadingIndices['foto_pria'] ? (
                          <>
                            <Loader2 className="w-6 h-6 text-berry dark:text-pink mb-2 animate-spin" />
                            <p className="text-sm text-ink-soft">Mengunggah...</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-ink-soft mb-2" />
                            <p className="text-sm text-ink-soft">Klik untuk upload foto</p>
                          </>
                        )}
                      </div>
                      <input type="file" accept="image/*" className="hidden" disabled={uploadingIndices['foto_pria']} onChange={(e) => handleSinglePhotoUpload(e, 'foto_pria')} />
                    </label>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Nama Lengkap Pria</label>
                  <input type="text" name="nama_lengkap_pria" required value={formData.nama_lengkap_pria || ''} onChange={handleChange} className={inputClass} />
                </div>
                <div className="space-y-[8px]">
                  <label className={labelClass}>
                    Foto Mempelai Wanita
                    <span className="text-[12px] text-ink-soft block mt-1 font-normal">(Direkomendasikan ukuran foto 1:1)</span>
                  </label>
                  {formData.foto_wanita ? (
                    <div className="relative w-full h-[120px] rounded-[6px] overflow-hidden border border-hairline">
                      <img src={formData.foto_wanita} alt="Wanita" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeSinglePhoto('foto_wanita')}
                        className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className={`flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploadingIndices['foto_wanita'] ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-berry dark:hover:border-pink'}`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploadingIndices['foto_wanita'] ? (
                          <>
                            <Loader2 className="w-6 h-6 text-berry dark:text-pink mb-2 animate-spin" />
                            <p className="text-sm text-ink-soft">Mengunggah...</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-ink-soft mb-2" />
                            <p className="text-sm text-ink-soft">Klik untuk upload foto</p>
                          </>
                        )}
                      </div>
                      <input type="file" accept="image/*" className="hidden" disabled={uploadingIndices['foto_wanita']} onChange={(e) => handleSinglePhotoUpload(e, 'foto_wanita')} />
                    </label>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Nama Lengkap Wanita</label>
                  <input type="text" name="nama_lengkap_wanita" required value={formData.nama_lengkap_wanita || ''} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div className="pt-[16px]">
                <button type="submit" className={`w-full ${btnNextClass}`}>
                  Selanjutnya <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 2: Cover, Quotes & Musik */}
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
                <h2 className={headingClass}>Cover & Detail</h2>
                <p className={descClass}>Pilih foto utama dan kata sambutan Anda.</p>
              </div>
              
              <div className="space-y-[24px]">
                <div className="space-y-[8px]">
                  <label className={labelClass}>Foto Prewed (Background Cover & Hero)</label>
                  {formData.foto_cover ? (
                    <div className="relative w-full h-[120px] rounded-[6px] overflow-hidden border border-hairline">
                      <img src={formData.foto_cover} alt="Cover" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removeSinglePhoto('foto_cover')}
                        className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <label className={`flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploadingIndices['foto_cover'] ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-berry dark:hover:border-pink'}`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploadingIndices['foto_cover'] ? (
                          <>
                            <Loader2 className="w-6 h-6 text-berry dark:text-pink mb-2 animate-spin" />
                            <p className="text-sm text-ink-soft">Mengunggah...</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-ink-soft mb-2" />
                            <p className="text-sm text-ink-soft">Klik untuk upload foto</p>
                          </>
                        )}
                      </div>
                      <input type="file" required accept="image/*" className="hidden" disabled={uploadingIndices['foto_cover']} onChange={(e) => handleSinglePhotoUpload(e, 'foto_cover')} />
                    </label>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Quote/Sambutan</label>
                  <textarea name="quote_text" required placeholder="Tulis quote atau sambutan Anda" value={formData.quote_text || ''} onChange={handleChange} rows={3} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>YouTube Music URL</label>
                  <input type="url" name="youtube_url" required placeholder="https://youtube.com/watch?v=..." value={formData.youtube_url || ''} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="button" onClick={handlePrev} className={btnPrevClass}>
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button type="submit" className={`flex-1 ${btnNextClass}`}>
                  Selanjutnya <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 3: Acara */}
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
                <h2 className={headingClass}>Waktu & Lokasi Acara</h2>
                <p className={descClass}>Detail akad nikah dan resepsi pernikahan.</p>
              </div>
              
              <div className="space-y-[24px]">
                {/* Acara 1 */}
                <div className="p-4 border border-hairline rounded-[8px] bg-bg-alt space-y-4">
                  <h3 className="font-semibold text-[16px] text-ink border-b border-hairline pb-2">Acara Pertama (Akad/Pemberkatan)</h3>
                  <div>
                    <label className={labelClass}>Nama Acara</label>
                    <input type="text" name="acara1_nama" required placeholder="Akad Nikah" value={formData.acara1_nama || ''} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-[16px]">
                    <div>
                      <label className={labelClass}>Tanggal</label>
                      <input type="date" name="acara1_tanggal" required value={formData.acara1_tanggal || ''} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Jam</label>
                      <input type="time" name="acara1_jam" required value={formData.acara1_jam || ''} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Lokasi</label>
                    <input type="text" name="acara1_lokasi" required placeholder="Gedung Pernikahan..." value={formData.acara1_lokasi || ''} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Google Maps URL</label>
                    <input type="url" name="acara1_maps_url" required placeholder="https://maps.google.com/..." value={formData.acara1_maps_url || ''} onChange={handleChange} className={inputClass} />
                  </div>
                </div>

                {/* Acara 2 */}
                <div className="p-4 border border-hairline rounded-[8px] bg-bg-alt space-y-4">
                  <h3 className="font-semibold text-[16px] text-ink border-b border-hairline pb-2">Acara Kedua (Resepsi)</h3>
                  <div>
                    <label className={labelClass}>Nama Acara 2</label>
                    <input type="text" name="acara2_nama" required placeholder="Resepsi" value={formData.acara2_nama || ''} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="grid grid-cols-2 gap-[16px]">
                    <div>
                      <label className={labelClass}>Tanggal</label>
                      <input type="date" name="acara2_tanggal" required value={formData.acara2_tanggal || ''} onChange={handleChange} className={inputClass} />
                    </div>
                    <div>
                      <label className={labelClass}>Jam</label>
                      <input type="time" name="acara2_jam" required value={formData.acara2_jam || ''} onChange={handleChange} className={inputClass} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Lokasi</label>
                    <input type="text" name="acara2_lokasi" required value={formData.acara2_lokasi || ''} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Google Maps URL</label>
                    <input type="url" name="acara2_maps_url" required value={formData.acara2_maps_url || ''} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="button" onClick={handlePrev} className={btnPrevClass}>
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button type="submit" className={`flex-1 ${btnNextClass}`}>
                  Selanjutnya <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.form>
          )}

          {/* STEP 4: Galeri Foto */}
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
                <h2 className={headingClass}>Galeri Foto</h2>
                <p className={descClass}>Tambahkan foto-foto momen kebersamaan Anda (min. 6, maks. 16 foto).</p>
              </div>

              <div className="space-y-[16px]">
                {fotoUrls.map((url, idx) => (
                  <div key={idx} className="space-y-[8px]">
                    <label className={labelClass}>Foto {idx + 1}</label>
                    <div className="relative w-full h-[120px] rounded-[6px] overflow-hidden border border-hairline">
                      <img src={url} alt={`Foto ${idx+1}`} className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {fotoUrls.length < 16 && (
                  <div className="space-y-[8px]">
                    <label className={labelClass}>Foto {fotoUrls.length + 1}</label>
                    <label className={`flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploadingIndices.uploading ? 'cursor-not-allowed opacity-70' : 'cursor-pointer hover:border-berry dark:hover:border-pink'}`}>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {uploadingIndices.uploading ? (
                          <>
                            <Loader2 className="w-6 h-6 text-berry dark:text-pink mb-2 animate-spin" />
                            <p className="text-sm text-ink-soft">Mengunggah...</p>
                          </>
                        ) : (
                          <>
                            <Upload className="w-6 h-6 text-ink-soft mb-2" />
                            <p className="text-sm text-ink-soft">Klik untuk upload foto</p>
                          </>
                        )}
                      </div>
                      <input 
                        type="file" 
                        accept="image/jpeg,image/png,image/webp" 
                        multiple
                        className="hidden" 
                        disabled={uploadingIndices.uploading} 
                        onChange={handlePhotoUpload} 
                      />
                    </label>
                  </div>
                )}
              </div>

              <div className="pt-[16px] flex gap-[16px]">
                <button type="button" onClick={handlePrev} className={btnPrevClass}>
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <button type="button" onClick={(e) => {
                  const fotoCount = Array.isArray(formData.foto_urls) ? formData.foto_urls.length : 0;
                  if (fotoCount < 6 || fotoCount > 16) {
                    alert("Galeri harus memiliki minimal 6 dan maksimal 16 foto.");
                    return;
                  }
                  handleNext(e);
                }} className={`flex-1 ${btnNextClass}`}>
                  Selanjutnya <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 5: Rekening Bank */}
          {step === 5 && (() => {
            const bankAccounts = Array.isArray(formData.bank_accounts) ? formData.bank_accounts : [];
            const addBankAccount = () => setFormData(prev => ({ ...prev, bank_accounts: [...bankAccounts, { bank: '', nomor: '', nama: '' }] }));
            const removeBankAccount = (idx) => setFormData(prev => ({ ...prev, bank_accounts: bankAccounts.filter((_, i) => i !== idx) }));
            const handleBankAccountChange = (idx, field, value) => {
              const newAccounts = [...bankAccounts];
              newAccounts[idx][field] = value;
              setFormData(prev => ({ ...prev, bank_accounts: newAccounts }));
            };

            return (
              <motion.form 
                key="step5"
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -18 }}
                transition={{ duration: 0.4 }}
                onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}
                className="space-y-[32px]"
              >
                <div>
                  <h2 className={headingClass}>Wedding Gift</h2>
                  <p className={descClass}>Tambahkan minimal 1 nomor rekening atau E-Wallet untuk menerima tanda kasih.</p>
                </div>

                <div className="space-y-[24px]">
                  {bankAccounts.map((account, idx) => (
                    <div key={idx} className="p-4 border border-hairline rounded-[8px] bg-bg-alt space-y-4 relative">
                      <button 
                        type="button" 
                        onClick={() => removeBankAccount(idx)}
                        className="absolute top-2 right-2 text-ink-soft hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <h3 className="font-semibold text-[16px] text-ink pb-2">Rekening {idx + 1}</h3>
                      <div className="grid grid-cols-2 gap-[16px]">
                        <div>
                          <label className={labelClass}>Bank / E-Wallet</label>
                          <input type="text" placeholder="BCA / GoPay" value={account.bank || ''} onChange={(e) => handleBankAccountChange(idx, 'bank', e.target.value)} className={inputClass} required />
                        </div>
                        <div>
                          <label className={labelClass}>Nomor Rekening</label>
                          <input type="text" placeholder="1234567890" value={account.nomor || ''} onChange={(e) => handleBankAccountChange(idx, 'nomor', e.target.value)} className={inputClass} required />
                        </div>
                      </div>
                      <div>
                        <label className={labelClass}>Atas Nama</label>
                        <input type="text" placeholder="Nama Pemilik Rekening" value={account.nama || ''} onChange={(e) => handleBankAccountChange(idx, 'nama', e.target.value)} className={inputClass} required />
                      </div>
                    </div>
                  ))}

                  <button 
                    type="button"
                    onClick={addBankAccount}
                    className="w-full py-4 border-2 border-dashed border-hairline text-ink font-medium rounded-[8px] hover:border-berry dark:hover:border-pink transition-colors bg-bg flex items-center justify-center gap-2"
                  >
                    + Tambah Rekening
                  </button>
                </div>

                <div className="pt-[16px] flex gap-[16px]">
                  <button type="button" onClick={handlePrev} className={btnPrevClass}>
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <button 
                    type="submit"
                    className={`flex-1 ${btnNextClass}`}
                  >
                    Selesai & Lanjut <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.form>
            );
          })()}
        </AnimatePresence>
      </div>
    </>
  );
}
