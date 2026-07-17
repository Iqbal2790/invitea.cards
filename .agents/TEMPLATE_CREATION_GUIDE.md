# Panduan Lengkap Pembuatan Template (End-to-End)

Dokumen ini adalah Standard Operating Procedure (SOP) mutlak bagi AI Agent yang bertugas merancang, memprogram, dan mendeploy template baru di platform Invitea. Semua agen yang bekerja di environment ini **WAJIB** mengikuti alur kerja berikut tanpa jalan pintas.

---

## FASE 1: Ideation & Persiapan Kontrak (Membantu User)

Sebelum menulis kode apa pun, agen harus memastikan user telah menyepakati konsep desain dan struktur data.

1. **Analisis Konsep (Jika diminta)**
   - Pahami kategori template (Undangan / Ucapan / Lainnya).
   - Buat sketsa fungsional atau rekomendasikan skema warna dan animasi yang sesuai dengan framework yang ada (Tailwind + Framer Motion).

2. **Buat `design.md`**
   - Lokasi: `src/components/templates/renderers/[nama-template]/design.md`
   - Berisi palet warna (hex), referensi font, dan daftar efek animasi yang akan diimplementasikan.
   - *Penting*: Semua custom colors yang didefinisikan di sini akan digunakan di form builder juga.

3. **Buat `form.md` (Kontrak Data)**
   - Lokasi: `src/components/templates/renderers/[nama-template]/form.md`
   - Definisikan tabel data yang dibutuhkan renderer.
   - Sediakan JSON `fields_config` yang akan dimasukkan ke database Supabase oleh tim admin nantinya. JSON ini sangat krusial agar Dynamic Editor di Dashboard Customer bekerja otomatis.

---

## FASE 2: Frontend Form Component (Builder)

Setelah `form.md` disetujui, agen baru boleh membuat komponen form.

1. **Lokasi File**: `src/components/forms/[NamaTemplate]Form.jsx`
2. **Struktur Multi-Step**: 
   - Wajib menggunakan struktur navigasi yang sama dengan `FolioBloomForm` atau `IvoryLineForm` (progress bar di atas, kontainer di tengah).
3. **Data Mapping**:
   - Field data (variabel) harus persis 100% dengan `form.md`. Jangan mengarang nama key (`senderName` vs `nama_pengirim`).
4. **Session Persistence**:
   - Form wajib melakukan `sessionStorage.setItem("checkoutData", JSON.stringify({ template, formData }))` sebelum memanggil `router.push('/checkout/custom')`.

---

## FASE 3: Template Renderer (Live Preview)

Ini adalah wujud asli template yang akan dilihat oleh tamu.

1. **Lokasi File**: `src/components/templates/renderers/[nama-template]/index.jsx`
2. **Aturan Animasi**: Gunakan `framer-motion` untuk *scroll animations*. Jangan gunakan library jQuery atau CSS eksternal tanpa izin.
3. **Sinkronisasi Props**:
   - Saat dirender di mode Preview (di `buat/[id]/page.jsx`), template akan menerima data *real-time* dari form (yang sudah di-*map* via `onPreviewUpdate`).
   - Jangan pernah filter nilai `null` di dalam array (misal foto) jika urutan slot node sangat berpengaruh pada UI.

---

## FASE 4: Integrasi Hulu ke Hilir (Checklist Wajib Cegah Regresi)

Ini adalah langkah paling krusial yang sering terlupa. Agen WAJIB memverifikasi 4 endpoint/halaman berikut:

1. **Checkout Page (`src/app/checkout/[order-id]/page.jsx`)**
   - Pastikan bagian "Ringkasan Pesanan" (preview variables) bisa membaca field template tersebut.
   - Contoh: Jika ini Ucapan, pastikan UI mengambil `formData.nama_pengirim` & `formData.nama_penerima`. Jika ini Undangan, ambil `formData.nama_pria` & `formData.nama_wanita`. Jangan sampai ucapan memunculkan pria & wanita!

2. **URL Custom Slug (`src/app/api/orders/route.js`)**
   - API Order bertugas membuat slug unik.
   - Pastikan logika `slugBase` di endpoint ini mencakup variabel untuk template yang baru saja dibuat. (Contoh: `untuk-${nama_penerima}`).

3. **Dashboard Customer Editor (`src/app/order/[magic-token]/page.jsx`)**
   - **Kategori Template**: Pastikan template ucapan tidak dideteksi sebagai undangan. Variabel `isUcapan` mendeteksi dari `orderData.templates?.kategori === "ucapan"`.
   - **Dynamic Fields**: Editor di Dashboard Customer otomatis me-render input berdasarkan `fields_config` dari database. **Jangan hardcode template-specific fields** (seperti membuat `isIvoryLine ? <input /> : ...`) di dalam `page.jsx`. Biarkan fungsi `.map(dynamicFields)` yang bekerja!

4. **Dashboard Admin (`src/app/api/admin/orders/route.js`)**
   - Data `Kustomer` di tabel admin **SELALU 100% menggunakan Email User (`o.email`)**. Jangan pernah menimpanya dengan nama dari isi form.

---

## FASE 5: Serah Terima & Deployment

1. Ingatkan user untuk memasukkan template baru ke database Supabase (tabel `templates`) beserta `fields_config` JSON yang ada di `form.md`.
2. Lakukan simulasi end-to-end: Buka form builder -> Isi data -> Checkout -> Cek Dashboard Customer -> Cek Live Link -> Selesai!
