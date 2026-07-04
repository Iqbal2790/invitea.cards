"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Search, MoreVertical, Loader2, Trash2 } from "lucide-react";

export default function AdminTemplatesPage() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/templates");
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Gagal memuat template");
      setTemplates(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const toggleFeatured = async (id, currentConfig) => {
    // Optimistic UI update
    const isFeatured = currentConfig?.isFeatured || false;
    const newConfig = { ...currentConfig, isFeatured: !isFeatured };
    
    setTemplates(templates.map(t => 
      t.id === id ? { ...t, fields_config: newConfig } : t
    ));

    try {
      const res = await fetch(`/api/admin/templates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields_config: newConfig })
      });
      if (!res.ok) {
        // Revert on fail
        const result = await res.json();
        throw new Error(result.error || "Gagal update status");
      }
    } catch (err) {
      alert("Error: " + err.message);
      fetchTemplates(); // reload real data
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus template ini? Tindakan ini tidak dapat dibatalkan.")) {
      return;
    }
    
    try {
      const res = await fetch(`/api/admin/templates/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        const result = await res.json();
        throw new Error(result.error || "Gagal menghapus template");
      }
      // Remove from state
      setTemplates(templates.filter(t => t.id !== id));
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  const filteredTemplates = templates.filter(t => 
    t.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-text-main">Kelola Template</h1>
          <p className="text-text-muted mt-1">Atur daftar desain dan tentukan template mana yang tampil di Landing Page.</p>
        </div>
        <button 
          onClick={() => alert("Fitur tambah template belum diimplementasikan di fase ini.")}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl font-medium hover:bg-brand/90 transition-all shadow-sm"
        >
          <Plus className="w-5 h-5" />
          Tambah Baru
        </button>
      </div>

      <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-sm flex items-center">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Cari nama template..." 
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border-subtle focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand transition-all text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-text-muted">
          <Loader2 className="w-8 h-8 animate-spin text-brand mb-2" />
          <p>Memuat data template...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl border border-red-200">
          Error: {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => {
            const isFeatured = template.fields_config?.isFeatured || false;
            
            return (
              <div key={template.id} className="bg-white border border-border-subtle rounded-2xl overflow-hidden flex flex-col shadow-sm group">
                <div className="relative aspect-video w-full bg-brand-light/20 flex items-center justify-center">
                  {template.thumbnail_url ? (
                    <Image
                      src={template.thumbnail_url}
                      alt={template.nama}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-text-muted text-sm">No Thumbnail</span>
                  )}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold uppercase tracking-wider text-text-main shadow-sm">
                      {template.kategori === 'undangan' ? 'Undangan' : 'Ucapan'}
                    </span>
                    {template.fields_config?.subCategory && (
                      <span className="px-2.5 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-[10px] font-bold uppercase tracking-wider text-brand shadow-sm">
                        {template.fields_config.subCategory}
                      </span>
                    )}
                  </div>
                  <button 
                    onClick={() => handleDelete(template.id)}
                    className="absolute top-3 right-3 p-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-red-500 hover:bg-red-50 hover:text-red-600 shadow-sm transition-colors"
                    title="Hapus Template"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-serif font-medium text-lg text-text-main mb-1">{template.nama}</h3>
                      <p className="text-brand font-medium text-sm">Rp {Number(template.harga).toLocaleString("id-ID")}</p>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-border-subtle flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-text-main">Tampil di Beranda</span>
                      <span className="text-[10px] text-text-muted">Landing Page Preview</span>
                    </div>
                    
                    {/* Custom Toggle Switch */}
                    <button 
                      onClick={() => toggleFeatured(template.id, template.fields_config)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${isFeatured ? 'bg-brand' : 'bg-gray-200'}`}
                    >
                      <span 
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isFeatured ? 'translate-x-6' : 'translate-x-1'}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {!loading && !error && filteredTemplates.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-text-muted">Tidak ada template yang ditemukan.</p>
        </div>
      )}
    </div>
  );
}
