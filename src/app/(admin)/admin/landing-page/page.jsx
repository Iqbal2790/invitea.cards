"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Search, Eye, EyeOff, Trash2, Loader2, Edit } from "lucide-react";

export default function AdminLandingPage() {
  const [activeTab, setActiveTab] = useState("templates");

  // Templates State
  const [templates, setTemplates] = useState([]);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);
  const [searchTemplate, setSearchTemplate] = useState("");

  // Testimonials State
  const [testimonials, setTestimonials] = useState([]);
  const [isLoadingTestimonials, setIsLoadingTestimonials] = useState(true);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({ nama: "", pesan: "" });

  useEffect(() => {
    fetchTemplates();
    fetchTestimonials();
  }, []);

  const fetchTemplates = async () => {
    try {
      setIsLoadingTemplates(true);
      const res = await fetch("/api/admin/templates");
      const result = await res.json();
      if (res.ok && result.data) {
        setTemplates(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  const fetchTestimonials = async () => {
    try {
      setIsLoadingTestimonials(true);
      const res = await fetch("/api/admin/testimonials");
      const result = await res.json();
      if (res.ok && result.data) {
        setTestimonials(result.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingTestimonials(false);
    }
  };

  // --- Handlers for Templates ---
  const handleToggleFeature = async (id, currentFeatured) => {
    try {
      const template = templates.find((t) => t.id === id);
      const newConfig = { ...template.fields_config, isFeatured: !currentFeatured };
      
      const res = await fetch(`/api/admin/templates/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fields_config: newConfig }),
      });

      if (res.ok) {
        setTemplates(templates.map((t) => 
          t.id === id ? { ...t, fields_config: newConfig } : t
        ));
      } else {
        alert("Gagal merubah status tampil");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (!window.confirm("Yakin ingin menghapus template ini?")) return;
    try {
      const res = await fetch(`/api/admin/templates/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTemplates(templates.filter((t) => t.id !== id));
      } else {
        alert("Gagal menghapus template");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // --- Handlers for Testimonials ---
  const handleAddTestimonial = async (e) => {
    e.preventDefault();
    if (!newTestimonial.nama || !newTestimonial.pesan) return alert("Nama dan Pesan wajib diisi!");
    
    try {
      const res = await fetch("/api/admin/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTestimonial),
      });
      const result = await res.json();
      if (res.ok && result.data) {
        setTestimonials([result.data, ...testimonials]);
        setNewTestimonial({ nama: "", pesan: "" });
        setIsAddingTestimonial(false);
      } else {
        alert("Gagal menambahkan testimoni");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleTestimonial = async (id, currentState) => {
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !currentState }),
      });
      if (res.ok) {
        setTestimonials(testimonials.map(t => t.id === id ? { ...t, is_active: !currentState } : t));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Hapus testimoni ini?")) return;
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTestimonials(testimonials.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-[32px]">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-[16px]">
        <div>
          <h1 className="font-serif italic text-[32px] font-semibold text-ink leading-tight">Kelola Landing Page</h1>
          <p className="text-ink-soft mt-[4px] text-[14.5px]">Atur template desain dan testimoni yang tampil di halaman utama.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-[24px] border-b border-hairline">
        <button
          onClick={() => setActiveTab("templates")}
          className={`pb-[12px] font-semibold text-[14.5px] transition-colors border-b-[2.5px] ${
            activeTab === "templates" 
              ? "text-berry border-berry dark:text-pink dark:border-pink" 
              : "text-ink-soft border-transparent hover:text-ink"
          }`}
        >
          Daftar Template
        </button>
        <button
          onClick={() => setActiveTab("testimonials")}
          className={`pb-[12px] font-semibold text-[14.5px] transition-colors border-b-[2.5px] ${
            activeTab === "testimonials" 
              ? "text-berry border-berry dark:text-pink dark:border-pink" 
              : "text-ink-soft border-transparent hover:text-ink"
          }`}
        >
          Testimoni Pelanggan
        </button>
      </div>

      {/* Tab Content: Templates */}
      {activeTab === "templates" && (
        <div className="bg-bg-alt border border-hairline rounded-[6px] shadow-sm overflow-hidden flex flex-col">
          <div className="p-[20px] border-b border-hairline flex flex-col sm:flex-row gap-[16px] justify-between items-center bg-bg">
            <div className="relative w-full sm:w-[320px]">
              <Search className="absolute left-[16px] top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft" />
              <input
                type="text"
                placeholder="Cari template..."
                value={searchTemplate}
                onChange={(e) => setSearchTemplate(e.target.value)}
                className="w-full pl-[40px] pr-[16px] py-[10px] rounded-full border border-hairline focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry bg-bg-alt transition-all text-[13.5px] text-ink placeholder:text-ink-soft/60"
              />
            </div>
            <button
              onClick={() => alert("Fitur Tambah Template via Dasbor akan hadir pada fase selanjutnya.")}
              className="flex items-center justify-center gap-[8px] px-[20px] py-[10px] bg-pink-btn-bg text-cream-text rounded-full text-[13.5px] font-semibold hover:shadow-[0_8px_20px_-8px_var(--shadow-pink)] hover:-translate-y-[1px] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" /> Tambah Template
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] whitespace-nowrap">
              <thead className="bg-bg text-ink-soft font-semibold text-[12px] uppercase tracking-[0.05em] border-b border-hairline">
                <tr>
                  <th className="px-[24px] py-[16px]">Desain</th>
                  <th className="px-[24px] py-[16px]">Kategori</th>
                  <th className="px-[24px] py-[16px]">Harga</th>
                  <th className="px-[24px] py-[16px] text-center">Tampil di Beranda</th>
                  <th className="px-[24px] py-[16px] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {isLoadingTemplates ? (
                  <tr>
                    <td colSpan="5" className="px-[24px] py-[48px] text-center text-ink-soft">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-[8px] text-berry dark:text-pink" />
                      Memuat data...
                    </td>
                  </tr>
                ) : (
                  templates
                    .filter((t) => t.nama.toLowerCase().includes(searchTemplate.toLowerCase()))
                    .map((template) => (
                      <tr key={template.id} className="hover:bg-bg transition-colors">
                        <td className="px-[24px] py-[16px]">
                          <div className="flex items-center gap-[16px]">
                            <div className="relative w-[48px] h-[48px] rounded-[6px] overflow-hidden bg-bg border border-hairline shrink-0">
                              {template.thumbnail_url && (
                                <Image src={template.thumbnail_url} alt={template.nama} fill className="object-cover" />
                              )}
                            </div>
                            <span className="font-semibold text-ink">{template.nama}</span>
                          </div>
                        </td>
                        <td className="px-[24px] py-[16px] capitalize text-ink font-medium">{template.kategori}</td>
                        <td className="px-[24px] py-[16px] font-bold text-ink">
                          Rp {Number(template.harga).toLocaleString("id-ID")}
                        </td>
                        <td className="px-[24px] py-[16px]">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleToggleFeature(template.id, template.fields_config?.isFeatured)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                                template.fields_config?.isFeatured ? "bg-berry dark:bg-pink" : "bg-bg border border-hairline"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
                                  template.fields_config?.isFeatured ? "translate-x-6" : "translate-x-1 bg-ink-soft"
                                }`}
                              />
                            </button>
                          </div>
                        </td>
                        <td className="px-[24px] py-[16px] text-right space-x-2">
                          <button
                            onClick={() => handleDeleteTemplate(template.id)}
                            className="p-[8px] text-red-500 hover:bg-red-50/50 rounded-[6px] transition-colors inline-flex"
                            title="Hapus"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab Content: Testimonials */}
      {activeTab === "testimonials" && (
        <div className="bg-bg-alt border border-hairline rounded-[6px] shadow-sm overflow-hidden flex flex-col">
          <div className="p-[20px] border-b border-hairline bg-bg flex justify-end">
            <button
              onClick={() => setIsAddingTestimonial(!isAddingTestimonial)}
              className="flex items-center justify-center gap-[8px] px-[20px] py-[10px] bg-pink-btn-bg text-cream-text rounded-full text-[13.5px] font-semibold hover:shadow-[0_8px_20px_-8px_var(--shadow-pink)] hover:-translate-y-[1px] transition-all duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-sm"
            >
              <Plus className="w-4 h-4" /> Tambah Testimoni
            </button>
          </div>

          {isAddingTestimonial && (
            <div className="p-[24px] border-b border-hairline bg-pink-soft/30 dark:bg-berry/5">
              <form onSubmit={handleAddTestimonial} className="space-y-[16px] max-w-xl">
                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-[6px] ml-[2px]">Nama Pasangan / Kustomer</label>
                  <input
                    type="text"
                    required
                    value={newTestimonial.nama}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, nama: e.target.value })}
                    className="w-full px-[16px] py-[12px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[14px] text-ink"
                    placeholder="Cth: Amanda & Reza"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-semibold text-ink mb-[6px] ml-[2px]">Isi Testimoni</label>
                  <textarea
                    required
                    rows="3"
                    value={newTestimonial.pesan}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, pesan: e.target.value })}
                    className="w-full px-[16px] py-[12px] bg-bg border border-hairline rounded-[6px] focus:outline-none focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink transition-all text-[14px] text-ink"
                    placeholder="Tulis ulasan positif di sini..."
                  />
                </div>
                <div className="flex gap-[12px] pt-[8px]">
                  <button type="submit" className="px-[20px] py-[10px] bg-pink-btn-bg text-cream-text text-[13.5px] font-semibold rounded-full hover:shadow-md transition-all">Simpan Testimoni</button>
                  <button type="button" onClick={() => setIsAddingTestimonial(false)} className="px-[20px] py-[10px] border border-hairline bg-bg text-ink text-[13.5px] font-semibold rounded-full hover:bg-bg-alt transition-colors">Batal</button>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px] whitespace-nowrap">
              <thead className="bg-bg text-ink-soft font-semibold text-[12px] uppercase tracking-[0.05em] border-b border-hairline">
                <tr>
                  <th className="px-[24px] py-[16px]">Kustomer</th>
                  <th className="px-[24px] py-[16px] w-1/2">Pesan</th>
                  <th className="px-[24px] py-[16px] text-center">Status Tampil</th>
                  <th className="px-[24px] py-[16px] text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {isLoadingTestimonials ? (
                  <tr>
                    <td colSpan="4" className="px-[24px] py-[48px] text-center text-ink-soft">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-[8px] text-berry dark:text-pink" />
                      Memuat testimoni...
                    </td>
                  </tr>
                ) : testimonials.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-[24px] py-[48px] text-center text-ink-soft font-medium">
                      Belum ada testimoni.
                    </td>
                  </tr>
                ) : (
                  testimonials.map((testi) => (
                    <tr key={testi.id} className="hover:bg-bg transition-colors">
                      <td className="px-[24px] py-[16px] font-semibold text-ink">{testi.nama}</td>
                      <td className="px-[24px] py-[16px]">
                        <div className="truncate w-[250px] md:w-[400px] text-ink-soft font-medium" title={testi.pesan}>
                          &quot;{testi.pesan}&quot;
                        </div>
                      </td>
                      <td className="px-[24px] py-[16px]">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleToggleTestimonial(testi.id, testi.is_active)}
                            className={`flex items-center gap-[6px] px-[12px] py-[4px] rounded-[4px] text-[11px] font-bold uppercase tracking-wider border transition-colors ${
                              testi.is_active 
                                ? "bg-green-50/80 text-green-700 border-green-200/50" 
                                : "bg-bg text-ink-soft border-hairline"
                            }`}
                          >
                            {testi.is_active ? <><Eye className="w-3 h-3"/> Tampil</> : <><EyeOff className="w-3 h-3"/> Sembunyi</>}
                          </button>
                        </div>
                      </td>
                      <td className="px-[24px] py-[16px] text-right">
                        <button
                          onClick={() => handleDeleteTestimonial(testi.id)}
                          className="p-[8px] text-red-500 hover:bg-red-50/50 rounded-[6px] transition-colors inline-flex"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
