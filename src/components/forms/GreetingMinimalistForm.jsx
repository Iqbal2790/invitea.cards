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

  const [memories, setMemories] = useState([]); // Array of { id, caption, file }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addMemory = () => {
    if (memories.length >= 3) {
      alert("Maksimal 3 memori foto diperbolehkan.");
      return;
    }
    setMemories([...memories, { id: Date.now(), caption: "", file: null }]);
  };

  const removeMemory = (idToRemove) => {
    setMemories(memories.filter(m => m.id !== idToRemove));
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
          <Label htmlFor="pesan_pembuka">Teks Pembuka (Slide 1)</Label>
          <Input id="pesan_pembuka" name="pesan_pembuka" value={formData.pesan_pembuka} onChange={handleInputChange} />
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
        <div className="flex items-center justify-between border-b border-border-subtle pb-2">
          <h3 className="text-xl font-serif text-brand">Memori Spesial (Opsional)</h3>
          <Button type="button" variant="outline" size="sm" onClick={addMemory} disabled={memories.length >= 3} className="gap-2">
            <Plus className="w-4 h-4" /> Tambah Foto
          </Button>
        </div>
        
        <p className="text-sm text-text-muted">Tambahkan hingga 3 foto beserta pesan singkat untuk setiap fotonya.</p>

        {memories.map((mem, index) => (
          <div key={mem.id} className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-4 relative">
            <button type="button" onClick={() => removeMemory(mem.id)} className="absolute top-4 right-4 text-red-500 hover:text-red-700">
              <Trash2 className="w-5 h-5" />
            </button>
            <h4 className="font-medium text-sm text-gray-700">Memori ke-{index + 1}</h4>
            
            <PhotoUpload 
              multiple={false} 
              label="Upload Foto" 
              onChange={(files) => handleMemoryChange(mem.id, "file", files[0] || null)} 
            />
            
            <div className="space-y-2 mt-4">
              <Label>Pesan Singkat / Caption</Label>
              <Input 
                value={mem.caption} 
                onChange={(e) => handleMemoryChange(mem.id, "caption", e.target.value)} 
                placeholder="Tulis momen indah di balik foto ini..." 
              />
            </div>
          </div>
        ))}
        {memories.length === 0 && (
          <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-xl text-text-muted">
            Belum ada memori yang ditambahkan.
          </div>
        )}
      </div>

      {/* Seksi 4: Harapan & Penutup */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-brand border-b border-border-subtle pb-2">Harapan & Penutup</h3>
        
        <div className="space-y-2">
          <Label htmlFor="harapan">Harapan (Slide Wishes)</Label>
          <Textarea 
            id="harapan" 
            name="harapan" 
            rows={2} 
            value={formData.harapan} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="umur">Angka Spesial (Misal: Umur 25)</Label>
            <Input id="umur" name="umur" type="number" value={formData.umur} onChange={handleInputChange} placeholder="Biarkan kosong jika tidak perlu" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pesan_penutup">Kalimat Penutup</Label>
            <Input id="pesan_penutup" name="pesan_penutup" value={formData.pesan_penutup} onChange={handleInputChange} />
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
