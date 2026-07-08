# AGENTS.md — Invitea (invitea.cards)
## Konfigurasi Agen AI untuk Project Ini

> File ini dibaca otomatis oleh semua AI agent (Antigravity, Claude Code, Cursor).
> Berisi aturan, instincts, dan workflow khusus untuk project Invitea.
> Jangan ubah file ini kecuali ada perubahan arsitektur besar.

---

## Dokumen Wajib Dibaca

Sebelum mengerjakan apapun di project ini, baca file-file berikut secara berurutan:

```
1. PRD.md                    → arsitektur, database schema, alur API, sistem template
2. AGENTS.md                 → file ini — aturan kerja dan instincts
```

Jika ada konflik antara `PRD.md` dan `AGENTS.md`, ikuti `PRD.md`.

---

## 1. Alur Kerja Inti (Core Workflow)

### Riset Dulu, Kode Belakangan
Sebelum menambahkan fitur kompleks, library baru, atau pola arsitektur baru:
- Aktifkan skill `search-first` untuk melihat apakah ada pola yang sudah ada di project
- Cek `PRD.md` terlebih dahulu — kemungkinan besar sudah ada panduan di sana
- Jangan install library baru tanpa konfirmasi user

### Orkestrasi Bertahap
Jika diminta "buat fitur X" atau "perbaiki bug Y":
- **Jangan langsung tulis kode** — audit dulu kondisi yang ada
- Jelaskan ke user apa yang akan diubah sebelum mulai
- Tunggu konfirmasi user sebelum mulai menulis kode
- Gunakan pola `orch-add-feature` untuk fitur baru, `orch-fix-defect` untuk bug

### Satu Tugas per Sesi
- Kerjakan satu fase atau satu tugas sampai selesai dan diapprove
- Jangan lanjut ke tugas berikutnya sebelum konfirmasi user
- Jika tugas terlalu besar, pecah menjadi sub-tugas dan konfirmasi urutannya

### Verifikasi Sebelum Selesai
Agen tidak boleh menyatakan tugas "Selesai" sebelum:
- [ ] Tidak ada error sintaks atau import yang rusak
- [ ] `npm run dev` berjalan tanpa error
- [ ] File yang diubah tidak merusak file lain yang bergantung padanya

---

## 2. Aturan Khusus Invitea

### Sistem Template — KRITIS
Ini adalah aturan paling penting di project ini:

```
WAJIB baca form.md sebelum membuat form.jsx apapun.
DILARANG membuat form berdasarkan asumsi atau melihat renderer saja.
DILARANG menggunakan dynamic form — setiap template punya form.jsx sendiri.
```

Alur yang benar saat menambah template baru:
```
1. Baca PRD.md → Section "Menambah Template Baru"
2. Baca form.md template → identifikasi semua key yang dibutuhkan
3. Baca design.md template → ikuti style untuk form
4. Buat form.jsx berdasarkan form.md (bukan asumsi)
5. Tampilkan ke user untuk review sebelum disimpan
```

### Keamanan API
```
DILARANG menggunakan NEXT_PUBLIC_ prefix untuk SERVER_KEY Midtrans
DILARANG menggunakan NEXT_PUBLIC_ prefix untuk SERVICE_ROLE_KEY Supabase
DILARANG memproteksi /api/midtrans/webhook dengan auth apapun
WAJIB verifikasi signature Midtrans sebelum proses webhook
WAJIB gunakan supabaseAdmin (SERVICE_ROLE_KEY) untuk semua operasi sensitif
```

### Database
```
DILARANG mengubah struktur tabel tanpa konfirmasi user
DILARANG menghapus data apapun di production
WAJIB tampilkan SQL ke user sebelum menjalankan query destructive
WAJIB set is_active: false untuk template baru sampai test selesai
```

### Visual & UI
```
DILARANG mengubah styling, warna, atau font yang sudah ada
DILARANG mengganti className yang sudah ada kecuali diminta eksplisit
WAJIB pertahankan semua tampilan visual yang sudah berjalan
```

### File & Struktur
```
DILARANG menghapus file apapun sebelum ada penggantinya yang sudah ditest
DILARANG mengubah src/lib/supabase.js, resend.js, midtrans.js tanpa instruksi eksplisit
WAJIB update Registry Template di PRD.md setiap kali template baru selesai
```

---

## 3. Standar Frontend & UI (Next.js / React)

### Pola React & Next.js
- Selalu gunakan **App Router** — bukan Pages Router
- Server Components untuk fetch data, Client Components untuk interaktivitas
- Gunakan `'use client'` hanya jika diperlukan (state, event handler, browser API)
- Terapkan panduan `react-patterns` dan `nextjs-turbopack` dari ECC

### Desain & Animasi
- Project ini mengutamakan estetika emosional dan cinematic
- Setiap modifikasi UI merujuk pada `make-interfaces-feel-better` dan `motion-ui`
- Animasi: selalu gunakan `transform` dan `opacity` — jangan animate layout properties
- Ease curve: `cubic-bezier(0.16, 1, 0.3, 1)` untuk semua transisi utama
- Selalu wrap animasi dalam `@media (prefers-reduced-motion: no-preference)`
- **Gaya Tombol (Pill-shaped / Kapsul)**: Tombol menggunakan `rounded-full` (kapsul) dan dilarang menggunakan sudut tajam kaku. Tombol memiliki efek hover transform/shadow yang halus.
- **Strictly Responsive (Mobile-First)**: Semua komponen UI harus responsif secara mutlak. Tidak boleh ada lebar elemen statis (fixed-width) yang merusak layout pada layar kecil/mobile.
### Aksesibilitas
- Semua komponen interaktif memenuhi standar `frontend-a11y`
- Tombol harus punya label yang jelas
- Kontras warna minimal 4.5:1 untuk teks body

---

## 4. Keamanan & Kualitas Kode

### Code Quality
- Format kode rapi, tidak ada variabel yang tidak terpakai
- Terapkan `plankton-code-quality` pada setiap file yang diubah
- Tidak ada `console.log` yang tertinggal di production code
- Import diurutkan: built-in → third-party → internal

### Security Check
Wajib dijalankan jika kode menyentuh:
- Autentikasi admin
- API eksternal (Midtrans, Supabase, Resend)
- Input dari user (form, URL params)
- Upload file

Gunakan `security-review` dari ECC untuk mengecek kerentanan.

### Environment Variables
```
NEXT_PUBLIC_*              → boleh di browser
tanpa NEXT_PUBLIC_         → server only, tidak boleh di client code
```

---

## 5. Agen yang Tersedia (ECC)

Gunakan agen ini untuk mendelegasikan tugas:

| Situasi | Agen yang dipakai |
|---|---|
| Merencanakan fitur baru | `planner` |
| Review kode yang baru ditulis | `code-reviewer` |
| Ada error build yang tidak bisa dipecahkan | `build-error-resolver` |
| Review keamanan API/auth | `security-reviewer` |
| Review perubahan database | `database-reviewer` |
| Membersihkan kode mati | `refactor-cleaner` |

---

## 6. Pembelajaran Berkelanjutan (Continuous Learning)

Terapkan pola `continuous-learning-v2`:

- Jika user bilang "ingat", "ingat ini", "tolong ingat ini", terapkan skill `continuous-learning-v2` untuk menyimpannya sebagai instinct.
- Jika user melakukan koreksi terhadap gaya kode → catat sebagai standar untuk komponen berikutnya
- Jika user menolak pendekatan tertentu → jangan ulangi pendekatan itu di sesi berikutnya
- Jika ada pola baru yang disetujui user → simpan sebagai instinct dengan `/instinct-import`

**Contoh koreksi yang harus dicatat:**
- "Jangan pakai dynamic form" → instinct: selalu buat form.jsx per template
- "Pertahankan visual yang ada" → instinct: jangan ubah className tanpa instruksi
- "Konfirmasi dulu sebelum coding" → instinct: selalu audit dan jelaskan sebelum mulai

---

## 7. Prompt yang Benar untuk Memulai Sesi

### Sesi Restrukturisasi / Build

```
Baca PRD.md dan AGENTS.md dulu.

Kita sedang restrukturisasi project Invitea.
Yang sudah selesai: [list fase yang done]
Hari ini: [nama fase/tugas]

Mulai dengan audit kondisi kode yang ada,
jelaskan apa yang perlu diubah,
tunggu konfirmasiku sebelum mulai coding.
```

### Sesi Tambah Template Baru

```
Baca PRD.md (Section 7 dan 10) dan AGENTS.md dulu.

Kita akan tambah template baru:
- Nama: [nama template]
- Slug: [slug]
- Kategori: [undangan/ucapan]

File sudah ada di:
src/components/templates/renderers/[slug]/
  - index.jsx
  - design.md
  - form.md

Mulai dari Langkah 6: buat form.jsx berdasarkan form.md.
Tampilkan kodenya dulu sebelum disimpan.
```

### Sesi Perbaikan Bug

```
Baca PRD.md dan AGENTS.md dulu.

Ada bug di: [nama file / halaman / fitur]
Gejalanya: [deskripsi bug]

Audit dulu penyebabnya, jelaskan ke aku,
baru mulai perbaiki setelah aku konfirmasi.
```

### Sesi Lanjutan

```
Baca PRD.md dan AGENTS.md dulu.

Kita lanjut dari sesi sebelumnya.
Terakhir selesai: [apa yang sudah selesai]
Sekarang lanjut ke: [tugas berikutnya]
```

---

## 8. Yang Tidak Boleh Dilakukan (Larangan Keras)

Ini berlaku di semua sesi tanpa pengecualian:

- ❌ Mulai coding sebelum membaca PRD.md
- ❌ Membuat form.jsx tanpa membaca form.md
- ❌ Mengubah visual/UI tanpa instruksi eksplisit dari user
- ❌ Mengerjakan lebih dari satu tugas tanpa konfirmasi
- ❌ Menyatakan "Selesai" sebelum verifikasi tidak ada error
- ❌ Menggunakan server key di client-side code
- ❌ Menghapus file tanpa penggantinya yang sudah ditest
- ❌ Mengubah file di `src/lib/` tanpa instruksi eksplisit
- ❌ Install library baru tanpa konfirmasi user
- ❌ Set `is_active: true` sebelum template selesai ditest
- ❌ Memproteksi `/api/midtrans/webhook` dengan auth

---

## 9. Referensi Cepat

| Perlu tahu tentang | Baca di |
|---|---|
| Arsitektur sistem secara keseluruhan | `PRD.md` — Section 1-6 |
| Cara tambah template baru | `PRD.md` — Section 10 |
| Format form.md | `PRD.md` — Section 7 |
| Alur API lengkap | `PRD.md` — Section 8 |
| Database schema | `PRD.md` — Section 5 |
| Visual/style template tertentu | `src/components/templates/renderers/[slug]/design.md` |
| Field yang dibutuhkan template tertentu | `src/components/templates/renderers/[slug]/form.md` |

---

## 9. Aturan Eksekusi Khusus
- **SEBELUM PUSH KE GITHUB**: Selalu audit dan update `.gitignore` untuk mengecualikan hal-hal yang tidak perlu (kecualikan semua file sampah sistem, log, atau environment, jangan hanya yang bersifat private seperti `.env`).

## 10. Instincts / Pembelajaran Terakhir
- **Data Mapping Live Preview**: Saat menghubungkan form data (misal `lanternsFormData`) dengan *Template Renderer* di `buat/[id]/page.jsx`, pastikan *key* di dalam objek mapped data (misal `mappedLanternsData`) SAMA PERSIS dengan *key* yang dipanggil/dibutuhkan oleh template (misal `receiverName`, `greetingText`). Jangan meniru *key* dari template sebelumnya jika *schema* yang diminta berbeda, agar *Live Preview* bereaksi (berubah) sesuai dengan teks yang diketik.
- **Fetching Template (RLS Bypassing)**: Jangan mengambil data template tunggal dengan `supabaseClient` langsung dari *Client Component* (`/buat/[id]/page.jsx` atau `/templates/[id]/page.jsx`) karena RLS (Row Level Security) akan memblokir *anonymous read*. Selalu gunakan/buat API Route khusus di sisi Server (misal `/api/templates?id=...`) yang menggunakan `supabaseAdmin` (Service Role Key) untuk melewati limitasi RLS tersebut.
- **Placeholder vs Upload Logic**: Jangan menghapus komponen upload file asli dari form form.jsx hanya untuk menambah placeholder statis di preview. Placeholder hanya boleh dirender secara kondisional di komponen preview jika user belum mengunggah gambar.
- **Mapping Array Data di Live Preview**: Saat mengirim data array (seperti foto) dari form ke komponen preview, JANGAN menggunakan `.filter()` untuk membuang elemen `null` jika template renderer bergantung pada slot spesifik (indeks). Kirim array secara utuh agar slot foto (misalnya Node 1, Node 2, Node 3) tidak bergeser urutannya jika user hanya mengisi foto di tengah.
- **Standar UI Upload Foto**: Semua form upload foto (termasuk foto profil/mempelai maupun galeri) HARUS menggunakan komponen kotak yang sama: `w-full h-[120px] rounded-[6px] border-2 border-dashed bg-bg-alt` tanpa membedakan bentuk menjadi lingkaran. Tombol hapus (*trash*) harus ditempatkan statis di pojok kanan atas (`absolute top-2 right-2`), bukan menggunakan efek transparan di tengah saat di-hover.
