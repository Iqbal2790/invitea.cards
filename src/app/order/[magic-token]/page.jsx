"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  Copy, 
  ExternalLink, 
  MessageSquare, 
  Clock, 
  Users, 
  Check, 
  X, 
  CalendarDays,
  Edit,
  Save,
  Loader2
} from "lucide-react";

export default function OrderDashboardPage({ params }) {
  const resolvedParams = use(params);
  const { "magic-token": magicToken } = resolvedParams;

  const [copied, setCopied] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    nama_pria: "",
    nama_wanita: "",
    tanggal_acara: "",
    lokasi_acara: ""
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/invitations/${magicToken}`);
        const result = await res.json();
        
        if (!res.ok) throw new Error(result.error || "Gagal mengambil data");
        
        setData(result.data);
        
        // Initialize form with existing data
        const content = result.data.data_content || {};
        setEditForm({
          nama_pria: content.nama_pria || "",
          nama_wanita: content.nama_wanita || "",
          tanggal_acara: content.tanggal_acara || "",
          lokasi_acara: content.lokasi_acara || ""
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [magicToken]);

  const handleCopy = async () => {
    if (!data) return;
    try {
      await navigator.clipboard.writeText(`https://invitea.cards/u/${data.slug}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      const res = await fetch(`/api/invitations/${magicToken}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data_content: editForm })
      });
      
      const result = await res.json();
      
      if (!res.ok) throw new Error(result.error || "Gagal menyimpan data");
      
      setData({ ...data, data_content: result.data.data_content });
      setIsEditing(false);
      alert("Berhasil menyimpan data undangan!");
    } catch (err) {
      alert("Error: " + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-base">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-brand" />
          <p className="text-text-muted font-medium">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg-base p-4">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl max-w-md text-center shadow-sm">
          <h2 className="font-bold text-lg mb-2">Terjadi Kesalahan</h2>
          <p className="mb-4 text-sm">{error}</p>
          <Link href="/" className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-full font-medium inline-block transition-colors">
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    );
  }

  if (!data) return null;

  const orderData = data.orders || {};
  const rsvpData = data.rsvps || [];
  const templateName = orderData.templates?.nama || "Template Undangan";
  
  const totalHadir = rsvpData.filter(r => r.hadir).length;
  const totalTidakHadir = rsvpData.filter(r => !r.hadir).length;

  const liveLink = `https://invitea.cards/u/${data.slug}`;

  // Formatter for date
  const expiredDate = new Date(data.expired_at).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric'
  });

  return (
    <div className="min-h-screen bg-bg-base font-sans pb-20">
      
      {/* 1. HEADER */}
      <header className="bg-white border-b border-border-subtle sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl font-bold text-text-main">Manajemen Undangan</h1>
            <p className="text-xs text-text-muted mt-0.5 font-medium tracking-wide">
              TOKEN: <span className="text-text-main font-mono">{magicToken.substring(0, 8)}***</span>
            </p>
          </div>
          <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center border border-brand/20 shadow-sm">
            <span className="font-serif font-bold text-brand text-xs">IV</span>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8 space-y-8">
        
        {/* 2. STATUS & INFO KARTU */}
        <section className="bg-white rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-border-subtle flex flex-col md:flex-row justify-between gap-6 transition-all hover:shadow-md">
          <div className="space-y-1">
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Template Aktif</p>
            <h2 className="text-lg font-semibold text-text-main">{templateName}</h2>
            
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border-subtle/50">
              <CalendarDays className="w-4 h-4 text-text-muted" />
              <span className="text-sm text-text-muted">
                Berlaku s/d: <strong className="text-text-main font-medium">{expiredDate}</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col md:items-end justify-center gap-2">
            <p className="text-xs text-text-muted font-medium uppercase tracking-wider">Status Pembayaran</p>
            {orderData.status_payment === "paid" || orderData.status_payment === "settlement" ? (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 border border-green-200 text-green-700 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" /> Lunas
              </div>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm font-medium">
                <Clock className="w-4 h-4" /> {orderData.status_payment === "pending" ? "Menunggu Pembayaran" : "Dibatalkan / Gagal"}
              </div>
            )}
          </div>
        </section>

        {/* 3. TAUTAN UNDANGAN */}
        <section>
          <h3 className="font-serif text-lg font-semibold text-text-main mb-3">Sebar Undangan Anda</h3>
          <div className="bg-white rounded-3xl p-2 pl-4 md:pl-6 shadow-sm border border-border-subtle flex flex-col md:flex-row md:items-center gap-3 hover:shadow-md transition-all">
            <div className="flex-1 overflow-hidden">
              <p className="text-sm text-text-main font-medium truncate pt-2 md:pt-0 pb-1 md:pb-0">
                {liveLink}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1 md:mt-0">
              <button 
                onClick={handleCopy}
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-bg-base border border-border-subtle text-text-main text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Tersalin!" : "Salin"}
              </button>
              
              <Link
                href={`/u/${data.slug}`}
                target="_blank"
                className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-brand text-white text-sm font-medium hover:bg-brand/90 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <ExternalLink className="w-4 h-4" /> Buka
              </Link>
            </div>
          </div>
        </section>

        {/* NEW: 4. EDITOR UNDANGAN */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-semibold text-text-main">Konten Undangan</h3>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand text-sm font-medium hover:bg-brand/20 transition-colors"
              >
                <Edit className="w-4 h-4" /> Edit Data
              </button>
            )}
          </div>

          <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-border-subtle transition-all">
            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1.5">Nama Pria</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-border-subtle focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all bg-bg-base"
                      value={editForm.nama_pria}
                      onChange={e => setEditForm({...editForm, nama_pria: e.target.value})}
                      placeholder="Contoh: Romeo"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1.5">Nama Wanita</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-border-subtle focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all bg-bg-base"
                      value={editForm.nama_wanita}
                      onChange={e => setEditForm({...editForm, nama_wanita: e.target.value})}
                      placeholder="Contoh: Juliet"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1.5">Tanggal Acara</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-border-subtle focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all bg-bg-base"
                      value={editForm.tanggal_acara}
                      onChange={e => setEditForm({...editForm, tanggal_acara: e.target.value})}
                      placeholder="Contoh: 14 Februari 2027"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-main mb-1.5">Lokasi Acara</label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-border-subtle focus:border-brand focus:ring-1 focus:ring-brand outline-none transition-all bg-bg-base"
                      value={editForm.lokasi_acara}
                      onChange={e => setEditForm({...editForm, lokasi_acara: e.target.value})}
                      placeholder="Contoh: Gedung Pernikahan..."
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-5 border-t border-border-subtle mt-6 justify-end">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      const content = data.data_content || {};
                      setEditForm({
                        nama_pria: content.nama_pria || "",
                        nama_wanita: content.nama_wanita || "",
                        tanggal_acara: content.tanggal_acara || "",
                        lokasi_acara: content.lokasi_acara || ""
                      });
                    }}
                    className="px-6 py-2.5 rounded-full border border-border-subtle text-text-main text-sm font-medium hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-brand text-white text-sm font-medium hover:bg-brand/90 hover:shadow-md transition-all disabled:opacity-70 disabled:hover:shadow-none"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-6">
                <div>
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wide mb-1">Nama Pasangan</p>
                  <p className="text-text-main font-medium text-lg">
                    {data.data_content?.nama_pria || "-"} &amp; {data.data_content?.nama_wanita || "-"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wide mb-1">Tanggal Acara</p>
                  <p className="text-text-main font-medium text-lg">{data.data_content?.tanggal_acara || "-"}</p>
                </div>
                <div className="sm:col-span-2 pt-2 sm:pt-0">
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wide mb-1">Lokasi Acara</p>
                  <p className="text-text-main font-medium">{data.data_content?.lokasi_acara || "-"}</p>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 5. DAFTAR RSVP & BUKU TAMU */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg font-semibold text-text-main">Buku Tamu & RSVP</h3>
            <div className="flex items-center gap-1.5 text-sm text-text-muted bg-white px-4 py-1.5 rounded-full border border-border-subtle shadow-sm font-medium">
              <Users className="w-4 h-4" /> {rsvpData.length} Total
            </div>
          </div>

          {/* Statistik Mini */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50/50 border border-green-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
              <p className="text-4xl font-bold text-green-600 mb-1">{totalHadir}</p>
              <p className="text-xs font-semibold text-green-800 uppercase tracking-wider">Akan Hadir</p>
            </div>
            <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5 flex flex-col items-center justify-center text-center shadow-sm">
              <p className="text-4xl font-bold text-red-500 mb-1">{totalTidakHadir}</p>
              <p className="text-xs font-semibold text-red-800 uppercase tracking-wider">Tidak Hadir</p>
            </div>
          </div>

          {/* Grid Kartu Tamu */}
          {rsvpData.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {rsvpData.map((guest) => (
                <div key={guest.id} className="bg-white p-5 rounded-2xl border border-border-subtle shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-text-main">{guest.nama_tamu}</h4>
                      <p className="text-xs text-text-muted mt-0.5">
                        {new Date(guest.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                    {guest.hadir ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-100 text-green-700 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        <Check className="w-3 h-3" /> Hadir
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-100 text-red-600 rounded-md text-[10px] font-bold uppercase tracking-wider">
                        <X className="w-3 h-3" /> Tidak
                      </span>
                    )}
                  </div>
                  
                  {/* Pesan Tamu (if any) */}
                  <div className="flex-1 bg-bg-base/70 p-4 rounded-xl border border-border-subtle/50 relative mt-2">
                    <MessageSquare className="w-4 h-4 text-text-muted/30 absolute top-4 right-4" />
                    <p className="text-sm text-text-main italic pr-6 leading-relaxed">
                      "{guest.pesan || "Tidak meninggalkan pesan khusus."}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-border-subtle rounded-[2rem] p-12 text-center flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-text-muted" />
              </div>
              <p className="text-text-main font-semibold text-lg mb-1">Belum Ada Tamu</p>
              <p className="text-sm text-text-muted max-w-sm">Tamu yang mengisi form RSVP dari undangan digital Anda akan otomatis muncul di sini.</p>
            </div>
          )}

        </section>

      </main>
    </div>
  );
}
