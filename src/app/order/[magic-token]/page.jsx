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
  Loader2,
  Mail,
  Upload,
  Trash2
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
    lokasi_acara: "",
    senderName: "",
    receiverName: "",
    greetingText: "",
    wishes: [],
    finalQuote: "",
    finalGreeting: "",
    closingRemark: ""
  });
  const [isSaving, setIsSaving] = useState(false);



  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/invitations/${magicToken}`);
        const result = await res.json();
        
        if (!res.ok) throw new Error(result.error || "Gagal mengambil data");
        
        setData(result.data);
        
        // Initialize form with all existing data
        const content = result.data.data_content || {};
        
        // Deep copy the content to avoid reference issues
        setEditForm(JSON.parse(JSON.stringify(content)));
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
      <div className="min-h-screen flex items-center justify-center bg-bg transition-colors duration-400">
        <div className="flex flex-col items-center gap-[12px]">
          <Loader2 className="w-[32px] h-[32px] animate-spin text-berry dark:text-pink" />
          <p className="text-ink-soft font-medium text-[15px]">Memuat dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg p-[24px]">
        <div className="bg-red-50/50 border border-red-200 text-red-700 p-[32px] rounded-[6px] max-w-[480px] text-center shadow-sm">
          <h2 className="font-serif italic text-[24px] font-semibold mb-[8px]">Terjadi Kesalahan</h2>
          <p className="mb-[24px] text-[15px]">{error}</p>
          <Link href="/" className="px-[24px] py-[12px] bg-red-600 hover:bg-red-700 text-white rounded-full font-medium inline-block transition-colors shadow-sm">
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
  const isUcapan = orderData.templates?.kategori === "ucapan" || orderData.templates?.category === "ucapan" || orderData.templates?.fields_config?.subCategory === "Romantis";
  const dashboardTitle = isUcapan ? "Manajemen Kartu Ucapan" : "Manajemen Undangan";
  const contentTitle = isUcapan ? "Konten Kartu Ucapan" : "Konten Undangan";
  
  const dynamicFields = Object.values(orderData.templates?.fields_config || {})
    .filter(f => f && typeof f === 'object' && f.name && f.type !== 'bank' && f.type !== 'photo');
  const totalHadir = rsvpData.filter(r => r.status_kehadiran === 'hadir').length;
  const totalTidakHadir = rsvpData.filter(r => r.status_kehadiran === 'tidak_hadir' || r.status_kehadiran === 'tidak').length;

  const liveLink = `https://invitea.cards/u/${data.slug}`;

  // Formatter for date
  const expiredDate = new Date(data.expired_at).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric'
  });


  return (
    <div className="min-h-screen bg-bg transition-colors duration-400 font-sans pb-[80px]">
      
      {/* 1. HEADER */}
      <header className="bg-header-bg backdrop-blur-[10px] border-b border-header-border sticky top-0 z-40 transition-colors duration-400">
        <div className="max-w-[800px] mx-auto px-[clamp(20px,5vw,32px)] py-[16px] flex items-center justify-between">
          <div>
            <h1 className="font-serif italic text-[24px] font-semibold text-ink leading-tight">{dashboardTitle}</h1>
            <p className="text-[12px] text-ink-soft mt-[2px] font-medium tracking-wide uppercase">
              TOKEN: <span className="text-ink font-mono font-semibold">{magicToken.substring(0, 8)}***</span>
            </p>
          </div>
          <div className="w-[36px] h-[36px] rounded-full bg-bg-alt flex items-center justify-center border border-hairline shadow-sm">
            <span className="font-serif italic font-bold text-berry dark:text-pink text-[14px]">IV</span>
          </div>
        </div>
      </header>

      <main className="max-w-[800px] mx-auto px-[clamp(20px,5vw,32px)] py-[clamp(32px,5vw,64px)] space-y-[40px]">
        
        {/* 2. STATUS & INFO KARTU */}
        <section className="bg-bg-alt rounded-[6px] p-[clamp(24px,4vw,32px)] shadow-sm border border-hairline flex flex-col md:flex-row justify-between gap-[24px] transition-all">
          <div className="space-y-[4px]">
            <p className="text-[11.5px] text-ink-soft font-bold uppercase tracking-[0.06em]">Template Aktif</p>
            <h2 className="text-[20px] font-serif italic text-ink font-medium">{templateName}</h2>
            
            <div className="flex items-center gap-[8px] mt-[16px] pt-[16px] border-t border-hairline/50">
              <CalendarDays className="w-4 h-4 text-ink-soft" />
              <span className="text-[13.5px] text-ink-soft">
                Berlaku s/d: <strong className="text-ink font-medium">{expiredDate}</strong>
              </span>
            </div>
          </div>

          <div className="flex flex-col md:items-end justify-center gap-[8px]">
            <p className="text-[11.5px] text-ink-soft font-bold uppercase tracking-[0.06em]">Status Pembayaran</p>
            {orderData.status_payment === "paid" || orderData.status_payment === "settlement" ? (
              <div className="inline-flex items-center gap-[6px] px-[14px] py-[6px] rounded-full bg-green-50/80 border border-green-200/50 text-green-700 text-[13px] font-semibold">
                <CheckCircle2 className="w-4 h-4" /> Lunas
              </div>
            ) : (
              <div className="inline-flex items-center gap-[6px] px-[14px] py-[6px] rounded-full bg-orange-50/80 border border-orange-200/50 text-orange-700 text-[13px] font-semibold">
                <Clock className="w-4 h-4" /> {orderData.status_payment === "pending" ? "Menunggu Pembayaran" : "Dibatalkan / Gagal"}
              </div>
            )}
          </div>
        </section>

        {/* 3. TAUTAN UNDANGAN */}
        <section>
          <h3 className="font-serif italic text-[24px] font-semibold text-ink mb-[16px]">{isUcapan ? "Sebar Kartu Ucapan Anda" : "Sebar Undangan Anda"}</h3>
          <div className="bg-bg-alt rounded-[6px] p-[8px] pl-[16px] md:pl-[24px] shadow-sm border border-hairline flex flex-col md:flex-row md:items-center gap-[12px] transition-all">
            <div className="flex-1 overflow-hidden">
              <p className="text-[15px] text-ink font-medium truncate pt-[8px] md:pt-0 pb-[4px] md:pb-0">
                {liveLink}
              </p>
            </div>
            <div className="flex items-center gap-[8px] mt-[4px] md:mt-0">
              <button 
                onClick={handleCopy}
                className="flex-1 md:flex-none flex items-center justify-center gap-[8px] px-[20px] py-[10px] rounded-full bg-transparent border-[1.5px] border-hairline text-ink text-[14px] font-medium hover:border-berry dark:hover:border-pink hover:text-berry dark:hover:text-pink transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
                {copied ? "Tersalin!" : "Salin"}
              </button>
              
              <Link
                href={`/u/${data.slug}`}
                target="_blank"
                className="flex-1 md:flex-none flex items-center justify-center gap-[8px] px-[24px] py-[10px] rounded-full bg-pink-btn-bg text-cream-text text-[14px] font-semibold shadow-[var(--shadow-pink)] hover:-translate-y-[2px] transition-all"
              >
                <ExternalLink className="w-4 h-4" /> Buka
              </Link>
            </div>
          </div>
        </section>

        {/* NEW: 4. EDITOR UNDANGAN */}
        <section>
          <div className="flex items-center justify-between mb-[16px]">
            <h3 className="font-serif italic text-[24px] font-semibold text-ink">{contentTitle}</h3>
            {!isEditing && (
              <button 
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-[8px] px-[16px] py-[8px] rounded-full bg-bg-alt border border-hairline text-ink text-[13px] font-semibold hover:border-berry hover:text-berry dark:hover:border-pink dark:hover:text-pink transition-colors"
              >
                <Edit className="w-[14px] h-[14px]" /> Edit Data
              </button>
            )}
          </div>

          <div className="bg-bg-alt rounded-[6px] p-[clamp(24px,4vw,40px)] shadow-sm border border-hairline transition-all">
            {isEditing ? (
              <form onSubmit={handleSave} className="space-y-[24px] animate-in fade-in zoom-in-95 duration-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
                  <>
                    {dynamicFields.map(field => (
                      <div key={field.name} className={field.type === 'textarea' || field.type === 'url' ? 'md:col-span-2' : ''}>
                        <label className="block text-[13.5px] font-semibold text-ink mb-[8px]">{field.label}</label>
                        {field.type === 'textarea' ? (
                          <textarea
                            rows={3}
                            className="w-full px-[16px] py-[14px] rounded-[6px] border border-hairline focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink outline-none transition-all bg-bg text-[14.5px] text-ink placeholder:text-ink-soft resize-none"
                            value={editForm[field.name] || ''}
                            onChange={e => setEditForm({...editForm, [field.name]: e.target.value})}
                            required={field.required}
                          />
                        ) : (
                          <input
                            type={field.type === 'date' ? 'date' : field.type === 'time' ? 'time' : field.type === 'url' ? 'url' : 'text'}
                            className="w-full px-[16px] py-[14px] rounded-[6px] border border-hairline focus:border-berry focus:ring-1 focus:ring-berry dark:focus:border-pink dark:focus:ring-pink outline-none transition-all bg-bg text-[14.5px] text-ink placeholder:text-ink-soft"
                            value={editForm[field.name] || ''}
                            onChange={e => setEditForm({...editForm, [field.name]: e.target.value})}
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}
                  </>
                </div>

                <div className="flex items-center gap-[12px] pt-[24px] border-t border-hairline mt-[32px] justify-end">
                  <button 
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      const content = data.data_content || {};
                      setEditForm(JSON.parse(JSON.stringify(content)));
                    }}
                    className="px-[24px] py-[12px] rounded-full border-[1.5px] border-hairline text-ink text-[14px] font-medium hover:border-berry dark:hover:border-pink hover:text-berry dark:hover:text-pink transition-colors"
                  >
                    Batal
                  </button>
                  <button 
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-[8px] px-[24px] py-[12px] rounded-full bg-pink-btn-bg text-cream-text text-[14px] font-semibold shadow-[var(--shadow-pink)] hover:-translate-y-[2px] transition-all disabled:opacity-70 disabled:hover:shadow-none disabled:hover:translate-y-0"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    Simpan Perubahan
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-[24px] gap-x-[24px]">
                  <>
                    {dynamicFields.map(field => (
                      <div key={field.name} className={field.type === 'textarea' || field.type === 'url' ? 'sm:col-span-2' : ''}>
                        <p className="text-[11.5px] text-ink-soft font-bold uppercase tracking-[0.06em] mb-[4px]">{field.label}</p>
                        <p className="text-ink font-medium text-[16.5px] whitespace-pre-wrap break-words">
                          {data.data_content?.[field.name] || "-"}
                        </p>
                      </div>
                    ))}
                  </>
              </div>
            )}
          </div>
        </section>

        {/* 5. DAFTAR RSVP & BUKU TAMU */}
        {!isUcapan && (
          <section>
            <div className="flex items-center justify-between mb-[16px]">
              <h3 className="font-serif italic text-[24px] font-semibold text-ink">Buku Tamu & RSVP</h3>
              <div className="flex items-center gap-[6px] text-[13px] text-ink-soft bg-bg-alt px-[14px] py-[6px] rounded-full border border-hairline shadow-sm font-semibold">
                <Users className="w-4 h-4" /> {rsvpData.length} Total
              </div>
            </div>

            {/* Statistik Mini */}
            <div className="grid grid-cols-2 gap-[16px] mb-[24px]">
              <div className="bg-bg-alt border border-hairline rounded-[6px] p-[20px] flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-[32px] font-sans font-bold text-green-600 dark:text-green-500 mb-[4px] leading-none">{totalHadir}</p>
                <p className="text-[11.5px] font-bold text-ink-soft uppercase tracking-[0.06em]">Akan Hadir</p>
              </div>
              <div className="bg-bg-alt border border-hairline rounded-[6px] p-[20px] flex flex-col items-center justify-center text-center shadow-sm">
                <p className="text-[32px] font-sans font-bold text-red-500/80 mb-[4px] leading-none">{totalTidakHadir}</p>
                <p className="text-[11.5px] font-bold text-ink-soft uppercase tracking-[0.06em]">Tidak Hadir</p>
              </div>
            </div>

            {/* Grid Kartu Tamu */}
            {rsvpData.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
                {rsvpData.map((guest) => (
                  <div key={guest.id} className="bg-bg-alt p-[20px] rounded-[6px] border border-hairline shadow-sm hover:border-hairline/80 transition-colors flex flex-col h-full">
                    <div className="flex items-start justify-between mb-[16px]">
                      <div>
                        <h4 className="font-semibold text-ink text-[15px]">{guest.nama_tamu}</h4>
                        <p className="text-[12px] text-ink-soft mt-[2px]">
                          {new Date(guest.created_at).toLocaleDateString('id-ID', {
                            day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                          })}
                        </p>
                      </div>
                      {guest.status_kehadiran === 'hadir' ? (
                        <span className="inline-flex items-center gap-[4px] px-[8px] py-[4px] bg-green-50/80 text-green-700 border border-green-200/50 rounded-[4px] text-[10px] font-bold uppercase tracking-wider">
                          <Check className="w-3 h-3" /> Hadir
                        </span>
                      ) : (guest.status_kehadiran === 'tidak_hadir' || guest.status_kehadiran === 'tidak') ? (
                        <span className="inline-flex items-center gap-[4px] px-[8px] py-[4px] bg-red-50/80 text-red-600 border border-red-200/50 rounded-[4px] text-[10px] font-bold uppercase tracking-wider">
                          <X className="w-3 h-3" /> Tidak
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-[4px] px-[8px] py-[4px] bg-gray-50/80 text-gray-600 border border-gray-200/50 rounded-[4px] text-[10px] font-bold uppercase tracking-wider">
                          <Mail className="w-3 h-3" /> {guest.status_kehadiran}
                        </span>
                      )}
                    </div>
                    
                    {/* Pesan Tamu (if any) */}
                    <div className="flex-1 bg-bg p-[16px] rounded-[4px] border border-hairline/50 relative mt-[8px]">
                      <MessageSquare className="w-4 h-4 text-ink-soft/40 absolute top-4 right-4" />
                      <p className="text-[14px] text-ink italic pr-[24px] leading-relaxed">
                        "{guest.pesan || "Tidak meninggalkan pesan khusus."}"
                      </p>
                    </div>
                    {guest.jumlah_tamu > 0 && guest.status_kehadiran === 'hadir' && (
                      <div className="mt-[16px] text-[12.5px] text-ink-soft font-medium flex items-center gap-[6px]">
                        <Users className="w-3.5 h-3.5" /> Membawa {guest.jumlah_tamu} orang
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-bg-alt border-2 border-dashed border-hairline rounded-[6px] p-[clamp(32px,5vw,48px)] text-center flex flex-col items-center justify-center">
                <div className="w-[64px] h-[64px] bg-bg rounded-full flex items-center justify-center mb-[16px] shadow-sm">
                  <Users className="w-[28px] h-[28px] text-ink-soft" />
                </div>
                <p className="text-ink font-serif italic text-[24px] font-semibold mb-[4px]">Belum Ada Tamu</p>
                <p className="text-[14.5px] text-ink-soft max-w-[300px]">Tamu yang mengisi form RSVP dari undangan digital Anda akan otomatis muncul di sini.</p>
              </div>
            )}

          </section>
        )}

      </main>
    </div>
  );
}
