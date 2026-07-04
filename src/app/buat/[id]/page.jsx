"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { dummyTemplates } from "@/lib/dummy-data";
import { ArrowLeft, ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function BuilderPage({ params }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  
  const template = dummyTemplates.find((t) => t.id === id);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    groomName: "",
    brideName: "",
    date: "",
    time: "",
    location: "",
    message: ""
  });

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-base">
        <div className="text-center">
          <h2 className="text-2xl font-serif text-brand mb-4">Template tidak ditemukan</h2>
          <Link href="/templates" className="text-brand hover:underline">Kembali ke Galeri</Link>
        </div>
      </div>
    );
  }

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Navigate to checkout
    router.push("/checkout/dummy-order-123");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex min-h-screen bg-bg-base font-sans overflow-hidden">
      
      {/* Left Column - Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col h-screen overflow-y-auto relative bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] z-10">
        
        {/* Header */}
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-border-subtle p-6 z-20 flex items-center justify-between">
          <Link href={`/templates/${id}`} className="inline-flex items-center text-sm font-medium text-text-muted hover:text-brand transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" /> Kembali
          </Link>
          <div className="flex gap-2">
            <div className={`h-2 w-8 rounded-full ${step >= 1 ? 'bg-brand' : 'bg-gray-200'} transition-colors duration-500`} />
            <div className={`h-2 w-8 rounded-full ${step >= 2 ? 'bg-brand' : 'bg-gray-200'} transition-colors duration-500`} />
            <div className={`h-2 w-8 rounded-full ${step >= 3 ? 'bg-brand' : 'bg-gray-200'} transition-colors duration-500`} />
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-6 md:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: Data Mempelai */}
              {step === 1 && (
                <motion.form 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleNext}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="font-serif text-3xl font-semibold text-text-main mb-2">Data Mempelai</h2>
                    <p className="text-text-muted text-sm mb-8">Silakan masukkan nama calon pengantin untuk undangan Anda.</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-main">Nama Mempelai Pria</label>
                      <input 
                        type="text" 
                        name="groomName"
                        required
                        placeholder="Contoh: Romeo"
                        value={formData.groomName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-bg-base border border-border-subtle rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-main">Nama Mempelai Wanita</label>
                      <input 
                        type="text" 
                        name="brideName"
                        required
                        placeholder="Contoh: Juliet"
                        value={formData.brideName}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-bg-base border border-border-subtle rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <button type="submit" className="w-full group flex items-center justify-center gap-2 bg-brand text-white py-3.5 rounded-full font-medium hover:bg-brand/90 transition-all duration-300 shadow-md shadow-brand/20 hover:shadow-lg hover:-translate-y-0.5">
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleNext}
                  className="space-y-6"
                >
                  <div>
                    <h2 className="font-serif text-3xl font-semibold text-text-main mb-2">Detail Acara</h2>
                    <p className="text-text-muted text-sm mb-8">Kapan dan di mana acara bahagia ini akan diselenggarakan?</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-main">Tanggal</label>
                        <input 
                          type="date" 
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-bg-base border border-border-subtle rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-main">Waktu</label>
                        <input 
                          type="time" 
                          name="time"
                          required
                          value={formData.time}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-bg-base border border-border-subtle rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-main">Nama Tempat / Gedung</label>
                      <input 
                        type="text" 
                        name="location"
                        required
                        placeholder="Contoh: Gedung Serbaguna Senayan"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-bg-base border border-border-subtle rounded-xl focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button type="button" onClick={handlePrev} className="px-6 py-3.5 border border-border-subtle text-text-main rounded-full font-medium hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button type="submit" className="flex-1 group flex items-center justify-center gap-2 bg-brand text-white py-3.5 rounded-full font-medium hover:bg-brand/90 transition-all duration-300 shadow-md shadow-brand/20 hover:shadow-lg hover:-translate-y-0.5">
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h2 className="font-serif text-3xl font-semibold text-text-main mb-2">Semua Siap!</h2>
                    <p className="text-text-muted text-sm">Pastikan ringkasan pesanan Anda sudah benar.</p>
                  </div>
                  
                  <div className="bg-bg-base rounded-2xl p-6 border border-border-subtle space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-border-subtle/50">
                      <span className="text-sm text-text-muted">Template</span>
                      <span className="text-sm font-semibold text-text-main">{template.title}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-border-subtle/50">
                      <span className="text-sm text-text-muted">Nama</span>
                      <span className="text-sm font-semibold text-text-main">{formData.groomName || '-'} & {formData.brideName || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-border-subtle/50">
                      <span className="text-sm text-text-muted">Waktu</span>
                      <span className="text-sm font-semibold text-text-main">{formData.date || '-'} | {formData.time || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-border-subtle/50">
                      <span className="text-sm text-text-muted">Tempat</span>
                      <span className="text-sm font-semibold text-text-main text-right max-w-[200px] truncate">{formData.location || '-'}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-base font-medium text-text-main">Total Harga</span>
                      <span className="text-xl font-bold text-brand">Rp {template.price.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  <div className="pt-6 flex gap-4">
                    <button type="button" onClick={handlePrev} className="px-6 py-3.5 border border-border-subtle text-text-main rounded-full font-medium hover:bg-gray-50 transition-all duration-300 flex items-center gap-2">
                      <ArrowLeft className="w-4 h-4" />
                    </button>
                    <button onClick={handleSubmit} className="flex-1 group flex items-center justify-center gap-2 bg-brand text-white py-3.5 rounded-full font-medium hover:bg-brand/90 transition-all duration-300 shadow-md shadow-brand/20 hover:shadow-lg hover:-translate-y-0.5">
                      Lanjut ke Pembayaran
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right Column - Preview Area (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-accent-sand relative flex-col items-center justify-center p-12">
        {/* Subtle decorative background */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-light/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 w-full max-w-[320px] aspect-[9/16] rounded-[2.5rem] bg-white shadow-2xl overflow-hidden border-8 border-white">
          <Image 
            src={template.image} 
            alt="Preview Template" 
            fill 
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-20">
            <h3 className="font-serif text-white text-2xl font-medium mb-1">{template.title}</h3>
            <p className="text-white/80 text-sm">Preview Statis</p>
          </div>
        </div>
      </div>
      
    </div>
  );
}
