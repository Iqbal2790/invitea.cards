"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Plus, Search, Eye, EyeOff, Trash2, Edit, Loader2 } from "lucide-react";

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
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-text-main">Kelola Landing Page</h1>
          <p className="text-text-muted mt-1">Atur template desain dan testimoni yang tampil di halaman utama.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-border-subtle">
        <button
          onClick={() => setActiveTab("templates")}
          className={`pb-3 font-medium transition-colors border-b-2 ${
            activeTab === "templates" ? "text-brand border-brand" : "text-text-muted border-transparent hover:text-text-main"
          }`}
        >
          Daftar Template
        </button>
        <button
          onClick={() => setActiveTab("testimonials")}
          className={`pb-3 font-medium transition-colors border-b-2 ${
            activeTab === "testimonials" ? "text-brand border-brand" : "text-text-muted border-transparent hover:text-text-main"
          }`}
        >
          Testimoni Pelanggan
        </button>
      </div>

      {/* Tab Content: Templates */}
      {activeTab === "templates" && (
        <div className="bg-white border border-border-subtle rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-border-subtle flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="text"
                placeholder="Cari template..."
                value={searchTemplate}
                onChange={(e) => setSearchTemplate(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-border-subtle focus:outline-none focus:border-brand focus:ring-1 focus:ring-brand text-sm"
              />
            </div>
            <button
              onClick={() => alert("Fitur Tambah Template via Dasbor akan hadir pada fase selanjutnya.")}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-all shadow-sm w-full sm:w-auto"
            >
              <Plus className="w-4 h-4" /> Tambah Template
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50/80 text-text-muted font-medium border-b border-border-subtle">
                <tr>
                  <th className="px-6 py-4">Desain</th>
                  <th className="px-6 py-4">Kategori</th>
                  <th className="px-6 py-4">Harga</th>
                  <th className="px-6 py-4 text-center">Tampil di Beranda</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {isLoadingTemplates ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-text-muted">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Memuat data...
                    </td>
                  </tr>
                ) : (
                  templates
                    .filter((t) => t.nama.toLowerCase().includes(searchTemplate.toLowerCase()))
                    .map((template) => (
                      <tr key={template.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 shrink-0 border border-border-subtle">
                              {template.thumbnail_url && (
                                <Image src={template.thumbnail_url} alt={template.nama} fill className="object-cover" />
                              )}
                            </div>
                            <span className="font-medium text-text-main">{template.nama}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 capitalize text-text-main">{template.kategori}</td>
                        <td className="px-6 py-4 font-medium text-text-main">
                          Rp {Number(template.harga).toLocaleString("id-ID")}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center">
                            <button
                              onClick={() => handleToggleFeature(template.id, template.fields_config?.isFeatured)}
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                template.fields_config?.isFeatured ? "bg-brand" : "bg-gray-200"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  template.fields_config?.isFeatured ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right space-x-2">
                          <button
                            onClick={() => handleDeleteTemplate(template.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex"
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
        <div className="bg-white border border-border-subtle rounded-2xl shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-border-subtle bg-gray-50/50 flex justify-end">
            <button
              onClick={() => setIsAddingTestimonial(!isAddingTestimonial)}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-brand text-white rounded-xl text-sm font-medium hover:bg-brand/90 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" /> Tambah Testimoni
            </button>
          </div>

          {isAddingTestimonial && (
            <div className="p-6 border-b border-border-subtle bg-blue-50/30">
              <form onSubmit={handleAddTestimonial} className="space-y-4 max-w-xl">
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">Nama Pasangan / Kustomer</label>
                  <input
                    type="text"
                    required
                    value={newTestimonial.nama}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, nama: e.target.value })}
                    className="w-full px-4 py-2 border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand"
                    placeholder="Cth: Amanda & Reza"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-main mb-1">Isi Testimoni</label>
                  <textarea
                    required
                    rows="3"
                    value={newTestimonial.pesan}
                    onChange={(e) => setNewTestimonial({ ...newTestimonial, pesan: e.target.value })}
                    className="w-full px-4 py-2 border border-border-subtle rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-brand"
                    placeholder="Tulis ulasan positif di sini..."
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="px-5 py-2 bg-brand text-white text-sm font-medium rounded-xl hover:bg-brand/90 transition-colors">Simpan</button>
                  <button type="button" onClick={() => setIsAddingTestimonial(false)} className="px-5 py-2 border border-border-subtle bg-white text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors">Batal</button>
                </div>
              </form>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-gray-50/80 text-text-muted font-medium border-b border-border-subtle">
                <tr>
                  <th className="px-6 py-4">Kustomer</th>
                  <th className="px-6 py-4 w-1/2">Pesan</th>
                  <th className="px-6 py-4 text-center">Status Tampil</th>
                  <th className="px-6 py-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {isLoadingTestimonials ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-text-muted">
                      <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                      Memuat testimoni...
                    </td>
                  </tr>
                ) : testimonials.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="px-6 py-12 text-center text-text-muted">
                      Belum ada testimoni.
                    </td>
                  </tr>
                ) : (
                  testimonials.map((testi) => (
                    <tr key={testi.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-text-main">{testi.nama}</td>
                      <td className="px-6 py-4">
                        <div className="truncate w-64 md:w-96 text-text-muted" title={testi.pesan}>
                          &quot;{testi.pesan}&quot;
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <button
                            onClick={() => handleToggleTestimonial(testi.id, testi.is_active)}
                            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                              testi.is_active ? "bg-green-50 text-green-700 border-green-200" : "bg-gray-100 text-gray-600 border-gray-200"
                            }`}
                          >
                            {testi.is_active ? <><Eye className="w-3.5 h-3.5"/> Tampil</> : <><EyeOff className="w-3.5 h-3.5"/> Sembunyi</>}
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteTestimonial(testi.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors inline-flex"
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
