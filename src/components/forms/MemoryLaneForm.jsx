"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Upload, Trash2, Loader2, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TOTAL_STEPS = 6;

export default function MemoryLaneForm({ template, formData, setFormData, handleChange, sessionId }) {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState({});

  const initialFilmSlotsCount = formData.filmPhoto5 ? 5 : (formData.filmPhoto4 ? 4 : 3);
  const [filmSlotsCount, setFilmSlotsCount] = useState(initialFilmSlotsCount);

  // ── Styles ──────────────────────────────────────────────────────────────────
  const headingClass = "font-serif italic text-[2.4rem] text-ink mb-[8px] leading-tight";
  const descClass = "text-ink-soft text-[15px] mb-[16px]";
  const labelClass = "text-[14px] font-semibold text-ink";
  const inputClass = "w-full px-[20px] py-[16px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[15px] text-ink placeholder:text-ink-soft/50";
  const textareaClass = `${inputClass} resize-none`;
  const btnNextClass = "group flex items-center justify-center gap-[10px] bg-pink-btn-bg text-cream-text py-[16px] rounded-full font-sans font-semibold text-[15px] tracking-[0.01em] shadow-[var(--shadow-pink)] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[2px] hover:shadow-[0_16px_34px_-12px_var(--shadow-pink)]";
  const btnPrevClass = "px-[24px] py-[16px] bg-transparent border-[1.5px] border-hairline text-ink rounded-full font-medium hover:border-berry dark:hover:border-pink transition-all duration-300 flex items-center justify-center";

  // ── Nav ──────────────────────────────────────────────────────────────────────
  const handleNext = (e) => { e?.preventDefault(); if (step < TOTAL_STEPS) setStep(step + 1); };
  const handlePrev = () => { if (step > 1) setStep(step - 1); };

  const handleSubmit = () => {
    sessionStorage.setItem("checkoutData", JSON.stringify({ template, formData }));
    router.push("/checkout/custom");
  };

  // ── Photo upload ─────────────────────────────────────────────────────────────
  const uploadPhoto = async (e, fieldName) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading((p) => ({ ...p, [fieldName]: true }));
      const fd = new FormData();
      fd.append("file", file);
      fd.append("sessionId", sessionId || "uploads");
      fd.append("slot", fieldName);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal upload");
      setFormData((prev) => ({ ...prev, [fieldName]: data.url }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading((p) => ({ ...p, [fieldName]: false }));
    }
  };

  const removePhoto = (fieldName) => {
    setFormData((prev) => ({ ...prev, [fieldName]: null }));
  };

  const PhotoUpload = ({ field, label }) => (
    <div className="space-y-2">
      <label className={labelClass}>{label}</label>
      {formData[field] ? (
        <div className="relative w-full h-[120px] rounded-[6px] overflow-hidden border border-hairline">
          <img src={formData[field]} alt={label} className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => removePhoto(field)}
            className="absolute top-2 right-2 bg-black/50 text-white p-2 rounded-full hover:bg-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <label className={`flex flex-col items-center justify-center w-full h-[120px] border-2 border-dashed border-hairline rounded-[6px] transition-colors bg-bg-alt ${uploading[field] ? "cursor-not-allowed opacity-70" : "cursor-pointer hover:border-berry dark:hover:border-pink"}`}>
          <div className="flex flex-col items-center justify-center">
            {uploading[field] ? (
              <><Loader2 className="w-6 h-6 text-berry dark:text-pink mb-2 animate-spin" /><p className="text-sm text-ink-soft">Mengunggah...</p></>
            ) : (
              <><Upload className="w-6 h-6 text-ink-soft mb-2" /><p className="text-sm text-ink-soft">Klik untuk upload foto</p></>
            )}
          </div>
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" disabled={uploading[field]} onChange={(e) => uploadPhoto(e, field)} />
        </label>
      )}
    </div>
  );

  // ── Reasons handler ───────────────────────────────────────────────────────────
  const reasons = Array.isArray(formData.reasons) ? formData.reasons : ["", "", "", "", "", "", ""];
  const updateReason = (i, val) => {
    const next = [...reasons];
    next[i] = val;
    setFormData((prev) => ({ ...prev, reasons: next }));
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
        {/* STEP 1 — Identitas */}
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
              <h2 className={headingClass}>Identitas Kartu</h2>
              <p className={descClass}>Siapa yang menerima, siapa yang mengirim, dan berapa umur yang dirayakan?</p>
            </div>

            <div className="space-y-[24px]">
              <div className="space-y-[8px]">
                <label className={labelClass}>Nama Penerima *</label>
                <input
                  type="text"
                  name="receiverName"
                  value={formData.receiverName || ""}
                  onChange={handleChange}
                  placeholder="Nama orang yang berulang tahun"
                  className={inputClass}
                  required
                />
              </div>
              <div className="space-y-[8px]">
                <label className={labelClass}>Nama Pengirim *</label>
                <input
                  type="text"
                  name="senderName"
                  value={formData.senderName || ""}
                  onChange={handleChange}
                  placeholder="Nama kamu (pengirim kartu)"
                  className={inputClass}
                  required
                />
              </div>
              <div className="space-y-[8px]">
                <label className={labelClass}>Usia yang Dirayakan</label>
                <input
                  type="number"
                  name="recipientAge"
                  value={formData.recipientAge || ""}
                  onChange={handleChange}
                  placeholder="Contoh: 25"
                  min="1"
                  max="120"
                  className={inputClass}
                />
                <p className="mt-1 text-[12px] text-ink-soft">Opsional — akan ditampilkan di kartu jika diisi</p>
              </div>
            </div>

            <div className="pt-[16px] flex gap-[16px]">
              <button type="submit" className={`w-full ${btnNextClass}`}>
                Selanjutnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.form>
        )}

        {/* STEP 2 — Foto Kenangan */}
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
              <h2 className={headingClass}>Foto Kenangan</h2>
              <p className={descClass}>Upload 3 foto kenangan bersama. Setiap foto akan tampil sebagai polaroid interaktif di kartu.</p>
            </div>

            <div className="space-y-[24px]">
              <PhotoUpload field="photo1" label="Foto Kenangan 1 *" />
              <div className="space-y-[8px]">
                <label className={labelClass}>Caption Foto 1</label>
                <textarea
                  name="caption1"
                  value={formData.caption1 || ""}
                  onChange={handleChange}
                  placeholder="Waktu itu kita nggak tahu ini akan jadi salah satu hari terbaik kita."
                  rows={2}
                  className={textareaClass}
                />
              </div>

              <PhotoUpload field="photo2" label="Foto Kenangan 2 *" />
              <div className="space-y-[8px]">
                <label className={labelClass}>Caption Foto 2</label>
                <textarea
                  name="caption2"
                  value={formData.caption2 || ""}
                  onChange={handleChange}
                  placeholder="Foto ini diambil tepat sebelum kita ketawa sampai nggak bisa napas."
                  rows={2}
                  className={textareaClass}
                />
              </div>

              <PhotoUpload field="photo3" label="Foto Kenangan 3 *" />
              <div className="space-y-[8px]">
                <label className={labelClass}>Caption Foto 3</label>
                <textarea
                  name="caption3"
                  value={formData.caption3 || ""}
                  onChange={handleChange}
                  placeholder="Masih inget bau kopi yang kita pesan sambil ngobrolin masa depan."
                  rows={2}
                  className={textareaClass}
                />
              </div>
            </div>

            <div className="pt-[16px] flex gap-[16px]">
              <button type="button" onClick={handlePrev} className={btnPrevClass}><ArrowLeft className="w-5 h-5" /></button>
              <button
                type="button"
                onClick={() => {
                  if (!formData.photo1 || !formData.photo2 || !formData.photo3) {
                    alert("Mohon upload ketiga foto kenangan terlebih dahulu.");
                    return;
                  }
                  handleNext();
                }}
                className={`flex-1 ${btnNextClass}`}
              >
                Selanjutnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.form>
        )}

        {/* STEP 3 — Pesan Utama */}
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
              <h2 className={headingClass}>Pesan dari Hati</h2>
              <p className={descClass}>Pesan ini akan muncul dengan efek ketik (typewriter) — kata demi kata. Tulis senatural mungkin.</p>
            </div>

            <div className="space-y-[8px]">
              <label className={labelClass}>Pesan Utama *</label>
              <textarea
                name="mainMessage"
                value={formData.mainMessage || ""}
                onChange={handleChange}
                placeholder={`Selamat ulang tahun, ${formData.receiverName || "kamu"}. Kamu nggak pernah sadar betapa banyak kebaikan yang kamu bawa ke hidup orang-orang di sekitarmu. Semoga ${formData.recipientAge || "tahun ini"} jadi tahun yang paling berani.`}
                rows={6}
                className={textareaClass}
                required
              />
              <p className="mt-1 text-[12px] text-ink-soft">Tulis dalam satu paragraf. Maksimal ~500 karakter agar mudah dibaca.</p>
            </div>

            <div className="pt-[16px] flex gap-[16px]">
              <button type="button" onClick={handlePrev} className={btnPrevClass}><ArrowLeft className="w-5 h-5" /></button>
              <button type="submit" className={`flex-1 ${btnNextClass}`}>
                Selanjutnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.form>
        )}

        {/* STEP 4 — Foto Film Strip */}
        {step === 4 && (
          <motion.form
            key="step4"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleNext}
            className="space-y-[32px]"
          >
            <div>
              <h2 className={headingClass}>Foto Film Strip</h2>
              <p className={descClass}>Upload foto untuk slide Film Strip (3 hingga 5 foto). Tambahkan foto jika kamu ingin menampilkan lebih banyak kenangan.</p>
            </div>

            <div className="space-y-[24px]">
              {Array.from({ length: filmSlotsCount }).map((_, idx) => {
                const i = idx + 1;
                return (
                  <div key={i} className="space-y-[24px]">
                    <PhotoUpload field={`filmPhoto${i}`} label={`Foto Film Strip ${i} ${i <= 3 ? '*' : ''}`} />
                    <div className="space-y-[8px]">
                      <label className={labelClass}>Caption Foto {i}</label>
                      <textarea
                        name={`filmCaption${i}`}
                        value={formData[`filmCaption${i}`] || ""}
                        onChange={handleChange}
                        placeholder={i === 1 ? "Awal cerita kita..." : `Caption foto ${i}`}
                        rows={2}
                        className={textareaClass}
                      />
                    </div>
                  </div>
                );
              })}

              {filmSlotsCount < 5 && (
                <button
                  type="button"
                  onClick={() => setFilmSlotsCount(prev => Math.min(5, prev + 1))}
                  className="w-full flex items-center justify-center gap-2 py-[16px] rounded-[6px] border-[1.5px] border-dashed border-hairline hover:border-berry dark:hover:border-pink text-ink-soft hover:text-ink transition-colors"
                >
                  <Plus className="w-5 h-5" />
                  <span className="text-[14px] font-semibold tracking-wide">Tambah Foto (Maksimal 5)</span>
                </button>
              )}
            </div>

            <div className="pt-[16px] flex gap-[16px]">
              <button type="button" onClick={handlePrev} className={btnPrevClass}><ArrowLeft className="w-5 h-5" /></button>
              <button
                type="button"
                onClick={() => {
                  if (!formData.filmPhoto1 || !formData.filmPhoto2 || !formData.filmPhoto3) {
                    alert("Mohon upload minimal 3 foto pertama.");
                    return;
                  }
                  handleNext();
                }}
                className={`flex-1 ${btnNextClass}`}
              >
                Selanjutnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.form>
        )}

        {/* STEP 5 — Alasan & Lagu */}
        {step === 5 && (
          <motion.form
            key="step4"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.4 }}
            onSubmit={handleNext}
            className="space-y-[32px]"
          >
            <div>
              <h2 className={headingClass}>7 Alasan & Lagu</h2>
              <p className={descClass}>7 hal yang kamu suka dari penerima (akan jadi bubble interaktif), dan lagu spesial untuk mereka.</p>
            </div>

            <div className="space-y-[8px]">
              <label className={labelClass}>7 Alasan Mengapa Kamu Sayang Mereka *</label>
              {Array.from({ length: 7 }).map((_, i) => (
                <input
                  key={i}
                  type="text"
                  value={reasons[i] || ""}
                  onChange={(e) => updateReason(i, e.target.value)}
                  placeholder={[
                    "Caramu ketawa",
                    "Keberanianmu",
                    "Kejujuranmu",
                    "Cara kamu dengerin",
                    "Energimu",
                    "Senyummu",
                    "Kamu, apa adanya",
                  ][i]}
                  className={inputClass}
                  required
                />
              ))}
            </div>

            <div className="space-y-[8px]">
              <label className={labelClass}>Link Lagu (Spotify / YouTube)</label>
              <input
                type="url"
                name="songUrl"
                value={formData.songUrl || ""}
                onChange={handleChange}
                placeholder="https://open.spotify.com/track/..."
                className={inputClass}
              />
              <label className={labelClass}>Quote Lagu</label>
              <input
                type="text"
                name="musicQuote"
                value={formData.musicQuote || ""}
                onChange={handleChange}
                placeholder="Lagu ini selalu mengingatkanku padamu."
                className={inputClass}
              />
            </div>

            <div className="pt-[16px] flex gap-[16px]">
              <button type="button" onClick={handlePrev} className={btnPrevClass}><ArrowLeft className="w-5 h-5" /></button>
              <button
                type="button"
                onClick={() => {
                  if (reasons.some((r) => !r || !r.trim())) {
                    alert("Mohon isi semua 7 alasan.");
                    return;
                  }
                  setFormData((prev) => ({ ...prev, reasons }));
                  handleNext();
                }}
                className={`flex-1 ${btnNextClass}`}
              >
                Selanjutnya <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.form>
        )}

        {/* STEP 6 — Review & Checkout */}
        {step === 6 && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.4 }}
            className="space-y-[32px]"
          >
            <div>
              <h2 className={headingClass}>Ringkasan Kartu</h2>
              <p className={descClass}>Periksa kembali sebelum melanjutkan ke pembayaran.</p>
            </div>

            <div className="space-y-[16px] rounded-[8px] border border-hairline bg-bg-alt p-[20px]">
              <div className="flex justify-between text-[14px]">
                <span className="text-ink-soft">Untuk</span>
                <span className="font-semibold text-ink">{formData.receiverName || "—"}</span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-ink-soft">Dari</span>
                <span className="font-semibold text-ink">{formData.senderName || "—"}</span>
              </div>
              {formData.recipientAge && (
                <div className="flex justify-between text-[14px]">
                  <span className="text-ink-soft">Usia</span>
                  <span className="font-semibold text-ink">{formData.recipientAge} tahun</span>
                </div>
              )}
              <div className="flex justify-between text-[14px]">
                <span className="text-ink-soft">Total Foto</span>
                <span className="font-semibold text-ink">
                  {[
                    formData.photo1, formData.photo2, formData.photo3, 
                    formData.filmPhoto1, formData.filmPhoto2, formData.filmPhoto3, formData.filmPhoto4, formData.filmPhoto5
                  ].filter(Boolean).length} foto diunggah
                </span>
              </div>
              <div className="flex justify-between text-[14px]">
                <span className="text-ink-soft">Lagu</span>
                <span className="font-semibold text-ink">{formData.songUrl ? "Ada" : "Tidak ada"}</span>
              </div>
            </div>

            <div className="pt-[16px] flex gap-[16px]">
              <button type="button" onClick={handlePrev} className={btnPrevClass}><ArrowLeft className="w-5 h-5" /></button>
              <button
                type="button"
                onClick={handleSubmit}
                className={`flex-1 ${btnNextClass}`}
              >
                Selesai & Lanjut <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
}
