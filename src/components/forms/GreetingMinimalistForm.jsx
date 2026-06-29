"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import PhotoUpload from "./PhotoUpload";
import { Plus, Trash2 } from "lucide-react";

export default function GreetingMinimalistForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    email: "",
    nama_pengirim: "",
    nama_penerima: "",
    momen: "",
    pesan_pembuka: "Ada hadiah kecil buat kamu...",
    pesan_ucapan: "",
    harapan: "Semoga tahun ini kamu lebih bahagia, sehat, dan sukses selalu.",
    umur: "",
    pesan_penutup: "Dari hati yang paling dalam, selamat merayakan hari spesialmu.",
    youtube_url: "",
  });

  const [memories, setMemories] = useState([
    { id: 1, caption: "", file: null },
    { id: 2, caption: "", file: null },
    { id: 3, caption: "", file: null },
    { id: 4, caption: "", file: null },
    { id: 5, caption: "", file: null },
  ]); // Wajib 5 memori

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const handleMemoryChange = (id, field, value) => {
    setMemories(memories.map(m => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi Memori (kelima foto wajib diunggah)
    if (!memories.every(m => m.file)) {
      alert("Kamu wajib melengkapi kelima foto memori.");
      return;
    }

    // Gabungkan formData dengan memori
    const finalData = { ...formData };
    
    memories.forEach((mem, index) => {
      if (mem.file) {
        finalData[`foto_${index + 1}`] = mem.file;
        finalData[`caption_${index + 1}`] = mem.caption;
      }
    });

    if (onSubmit) {
      onSubmit(finalData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Seksi 1: Informasi Dasar */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-brand border-b border-border-subtle pb-2">Informasi Dasar</h3>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email Pemesan <span className="text-red-500">*</span></Label>
          <Input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} placeholder="Contoh: nama@gmail.com" />
          <p className="text-xs text-text-muted">Penting: Link pesanan akan dikirimkan ke email ini.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="nama_pengirim">Nama Pengirim <span className="text-red-500">*</span></Label>
            <Input id="nama_pengirim" name="nama_pengirim" required value={formData.nama_pengirim} onChange={handleInputChange} placeholder="Contoh: Keluarga Besar Bpk. Ahmad" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nama_penerima">Nama Penerima <span className="text-red-500">*</span></Label>
            <Input id="nama_penerima" name="nama_penerima" required value={formData.nama_penerima} onChange={handleInputChange} placeholder="Contoh: Sarah" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="momen">Momen Spesial <span className="text-red-500">*</span></Label>
          <Input id="momen" name="momen" required value={formData.momen} onChange={handleInputChange} placeholder="Contoh: Ulang Tahun, Wisuda, Hari Raya" />
        </div>
      </div>

      {/* Seksi 2: Pesan & Surat */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-brand border-b border-border-subtle pb-2">Pesan Utama</h3>
        
        <div className="space-y-2">
          <Label htmlFor="pesan_pembuka">Teks Pembuka (Slide 1) <span className="text-red-500">*</span></Label>
          <Input id="pesan_pembuka" name="pesan_pembuka" required value={formData.pesan_pembuka} onChange={handleInputChange} />
          <p className="text-xs text-text-muted">Teks yang muncul sebelum lilin ditiup.</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="pesan_ucapan">Isi Surat / Pesan Ucapan <span className="text-red-500">*</span></Label>
          <Textarea 
            id="pesan_ucapan" 
            name="pesan_ucapan" 
            required 
            rows={5} 
            value={formData.pesan_ucapan} 
            onChange={handleInputChange} 
            placeholder="Tuliskan pesan menyentuhmu di sini. Gunakan enter untuk memisahkan paragraf." 
          />
        </div>
      </div>

      {/* Seksi 3: Memori Foto */}
      <div className="space-y-6">
        <div className="border-b border-border-subtle pb-2">
          <h3 className="text-xl font-serif text-brand">Memori Spesial <span className="text-red-500">*</span></h3>
        </div>
        
        <p className="text-sm text-text-muted">Masukkan 5 foto spesial beserta pesan singkat untuk setiap fotonya. Semua kolom wajib diisi.</p>

        {memories.map((mem, index) => (
          <div key={mem.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-4 relative">
            <h4 className="font-medium text-sm text-gray-700">Memori ke-{index + 1}</h4>
            
            <PhotoUpload 
              multiple={false} 
              label="Upload Foto" 
              onChange={(files) => handleMemoryChange(mem.id, "file", files[0] || null)} 
            />
            
            <div className="space-y-2 mt-4">
              <Label>Pesan Singkat / Caption <span className="text-red-500">*</span></Label>
              <Input 
                required
                value={mem.caption} 
                onChange={(e) => handleMemoryChange(mem.id, "caption", e.target.value)} 
                placeholder="Tulis momen indah di balik foto ini..." 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Seksi 4: Harapan & Penutup */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-brand border-b border-border-subtle pb-2">Harapan & Penutup</h3>
        
        <div className="space-y-2">
          <Label htmlFor="harapan">Harapan (Slide Wishes) <span className="text-red-500">*</span></Label>
          <Textarea 
            id="harapan" 
            name="harapan" 
            required
            rows={2} 
            value={formData.harapan} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="umur">Angka Spesial (Misal: Umur 25) <span className="text-red-500">*</span></Label>
            <Input id="umur" name="umur" type="number" required value={formData.umur} onChange={handleInputChange} placeholder="Contoh: 25" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pesan_penutup">Kalimat Penutup <span className="text-red-500">*</span></Label>
            <Input id="pesan_penutup" name="pesan_penutup" required value={formData.pesan_penutup} onChange={handleInputChange} />
          </div>
        </div>
      </div>

      {/* Seksi 5: Musik */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-brand border-b border-border-subtle pb-2">Musik Latar (Opsional)</h3>
        
        <div className="space-y-2">
          <Label htmlFor="youtube_url">Link YouTube Musik</Label>
          <Input id="youtube_url" name="youtube_url" type="url" value={formData.youtube_url} onChange={handleInputChange} placeholder="Contoh: https://youtube.com/watch?v=..." />
          <p className="text-xs text-text-muted">Biarkan kosong jika tidak ingin menggunakan musik.</p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-8 border-t border-border-subtle">
        <Button type="submit" disabled={isLoading} className="w-full md:w-auto md:px-12 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
          Buat Ucapan Sekarang
        </Button>
      </div>

    </form>
  );
}
