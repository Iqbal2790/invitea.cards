"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import PhotoUpload from "./PhotoUpload";

export default function WeddingClassicForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    nama_pria: "",
    nama_wanita: "",
    acara1_nama: "Akad Nikah",
    acara1_tanggal: "",
    acara1_jam: "",
    acara1_lokasi: "",
    acara1_maps_url: "",
    acara2_nama: "",
    acara2_tanggal: "",
    acara2_jam: "",
    acara2_lokasi: "",
    acara2_maps_url: "",
    youtube_url: "",
  });

  const [fotoPria, setFotoPria] = useState(null);
  const [fotoWanita, setFotoWanita] = useState(null);
  const [galeri, setGaleri] = useState([]); // Array of files

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const finalData = { ...formData };
    
    if (fotoPria) finalData.foto_pria = fotoPria;
    if (fotoWanita) finalData.foto_wanita = fotoWanita;
    if (galeri && galeri.length > 0) finalData.galeri = galeri;

    if (onSubmit) {
      onSubmit(finalData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      
      {/* Mempelai */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-brand border-b border-border-subtle pb-2">Data Mempelai</h3>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Pria */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
            <h4 className="font-medium text-gray-700">Mempelai Pria</h4>
            <div className="space-y-2">
              <Label>Nama Lengkap <span className="text-red-500">*</span></Label>
              <Input name="nama_pria" required value={formData.nama_pria} onChange={handleInputChange} placeholder="Contoh: Reza Pratama" />
            </div>
            <PhotoUpload multiple={false} label="Foto Mempelai Pria" onChange={(files) => setFotoPria(files[0] || null)} />
          </div>
          
          {/* Wanita */}
          <div className="p-6 bg-gray-50 border border-gray-200 rounded-xl space-y-4">
            <h4 className="font-medium text-gray-700">Mempelai Wanita</h4>
            <div className="space-y-2">
              <Label>Nama Lengkap <span className="text-red-500">*</span></Label>
              <Input name="nama_wanita" required value={formData.nama_wanita} onChange={handleInputChange} placeholder="Contoh: Amanda Wijaya" />
            </div>
            <PhotoUpload multiple={false} label="Foto Mempelai Wanita" onChange={(files) => setFotoWanita(files[0] || null)} />
          </div>
        </div>
      </div>

      {/* Acara Utama */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-brand border-b border-border-subtle pb-2">Acara Pertama (Akad/Pemberkatan)</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Nama Acara <span className="text-red-500">*</span></Label>
            <Input name="acara1_nama" required value={formData.acara1_nama} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label>Tanggal <span className="text-red-500">*</span></Label>
            <Input name="acara1_tanggal" type="date" required value={formData.acara1_tanggal} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label>Jam (WIB/WITA/WIT) <span className="text-red-500">*</span></Label>
            <Input name="acara1_jam" type="time" required value={formData.acara1_jam} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label>Lokasi / Gedung <span className="text-red-500">*</span></Label>
            <Input name="acara1_lokasi" required value={formData.acara1_lokasi} onChange={handleInputChange} placeholder="Contoh: Masjid Agung Al-Akbar" />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Link Google Maps <span className="text-red-500">*</span></Label>
            <Input name="acara1_maps_url" type="url" required value={formData.acara1_maps_url} onChange={handleInputChange} placeholder="Contoh: https://maps.app.goo.gl/..." />
          </div>
        </div>
      </div>

      {/* Acara Kedua */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-brand border-b border-border-subtle pb-2">Acara Kedua (Resepsi - Opsional)</h3>
        <p className="text-sm text-text-muted">Biarkan nama acara kosong jika tidak ada acara kedua.</p>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Nama Acara Kedua</Label>
            <Input name="acara2_nama" value={formData.acara2_nama} onChange={handleInputChange} placeholder="Contoh: Resepsi Pernikahan" />
          </div>
          <div className="space-y-2">
            <Label>Tanggal</Label>
            <Input name="acara2_tanggal" type="date" value={formData.acara2_tanggal} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label>Jam (WIB/WITA/WIT)</Label>
            <Input name="acara2_jam" type="time" value={formData.acara2_jam} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label>Lokasi / Gedung</Label>
            <Input name="acara2_lokasi" value={formData.acara2_lokasi} onChange={handleInputChange} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Link Google Maps</Label>
            <Input name="acara2_maps_url" type="url" value={formData.acara2_maps_url} onChange={handleInputChange} />
          </div>
        </div>
      </div>

      {/* Galeri & Musik */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif text-brand border-b border-border-subtle pb-2">Galeri & Musik</h3>
        
        <div className="space-y-4">
          <PhotoUpload multiple={true} label="Upload Galeri Foto (Bisa lebih dari 1)" onChange={setGaleri} />
        </div>

        <div className="space-y-2 pt-4">
          <Label>Link YouTube Musik (Opsional)</Label>
          <Input name="youtube_url" type="url" value={formData.youtube_url} onChange={handleInputChange} placeholder="Contoh: https://youtube.com/watch?v=..." />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-8 border-t border-border-subtle">
        <Button type="submit" disabled={isLoading} className="w-full md:w-auto md:px-12 py-6 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all">
          Buat Undangan Sekarang
        </Button>
      </div>

    </form>
  );
}
