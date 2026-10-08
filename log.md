# Rebuild Execution Log — Invitea (invitea.cards)

> Dokumen log publik untuk memantau tahapan rebuild total Invitea.cards dari Next.js (Vercel) ke React Router v7 (Cloudflare Workers).
> Dokumentasi detail internal tersimpan di dalam Obsidian Vault (`./vault/`).

---

## 📌 Ringkasan Status Proyek

- **Status Saat Ini:** Fase 1 — Database Reset & Unified Schema (SELESAI) $\rightarrow$ Siap untuk Fase 2 (Scaffolding React Router v7)
- **Target Deployment:** Cloudflare Workers (Edge Runtime)
- **Framework Pilihan:** React Router v7 (Vite + Cloudflare Workers Adapter)
- **Database:** Supabase (Fresh Reset + Unified Schema — AKTIF)
- **Auth:** Google OAuth (Supabase Auth)
- **Subdomain Routing:**
  - `invitea.cards` $\rightarrow$ Landing Page, Showcase Bespoke/Custom Design, Katalog Template, Public Undangan (`/u/[slug]`)
  - `create.invitea.cards` $\rightarrow$ Instant Template Builder (Freemium & Paid)
  - `plan.invitea.cards` $\rightarrow$ Wedding Planner Hub (Guest List, Checklist, Budget)
  - `[custom-domain]` $\rightarrow$ Dedicated Custom Domain untuk Klien Custom Design via Cloudflare for SaaS

---

## 📅 Log Aktivitas & Keputusan

### [2026-10-08] — Fase 1 Selesai & Pengarsipan Kode Legacy ke `legacy-v1/`
- **Arsip Kode Lama:** Seluruh kode lama Next.js (`src/`, `public/`, `package.json`, scripts) berhasil dipindahkan ke folder `legacy-v1/` sebagai cadangan referensi tanpa merusak riwayat git.
- **Root Workspace Bersih:** Root directory kini siap dan bersih untuk inisialisasi fresh React Router v7 + Cloudflare Workers.
- **Database Migrations Tertata Rapi:** File SQL dipindahkan ke struktur standar Supabase di [`supabase/migrations/`](file:///home/iqbal/Documents/invitea.cards/supabase/migrations):
  - `supabase/migrations/01_unified_schema.sql` (Skema master 11 tabel)
  - `supabase/migrations/02_migration_v2.sql` (Penyempurnaan Gatekeeper, Canvas flag, & Payout proof)
- **Skema Database Baru Aktif:** Skema berhasil dijalankan di Supabase SQL Editor.
  - `profiles` + trigger auth Google
  - `wedding_projects`, `templates` (fresh kosong), `invitations`, `custom_domains`
  - `guests` (sinkronisasi RSVP live), `checklist_items`, `budget_items`
  - `affiliates`, `referral_codes`, `referral_commissions`
- **Pembersihan Storage Selesai:** Seluruh bucket lama dihapus, bucket baru `invitation-assets` dan `thumbnails` telah diinisialisasi dengan kebijakan Public Read.
- **Checkpoint:** Fase 1 resmi selesai.

### [2026-10-07] — Kickoff Rebuild Total & Finalisasi Blueprint
- **Keputusan Framework:** Memilih React Router v7 dengan Cloudflare Workers adapter untuk performa edge tanpa batas cold-start dan kompatibilitas penuh dengan ekosistem React 19 / Tailwind / Framer Motion.
- **Pivot Produk Utama:**
  - Menempatkan **Custom Design (Bespoke Studio)** sebagai layanan unggulan utama dengan dedicated custom domain (`.my.id`, `.web.id`, `.biz.id`, `.com`) masa aktif 1 tahun.
  - Memperkenalkan produk baru **Wedding Planner** (`plan.invitea.cards`) yang berfungsi sebagai *retention hub* dan dashboard satu pintu untuk klien.
  - Pembeli Template Berbayar dan Klien Custom Design otomatis mendapatkan akses **Free Wedding Planner** terintegrasi 1 database (RSVP undangan langsung terhubung ke Guest List).
  - Menyediakan **Free Template Tier** (tanpa login, tanpa RSVP, tanpa custom nama tamu, watermark Invitea Free, masa aktif 1 minggu).
- **Sistem Afiliasi & Bundling Domain Bespoke:**
  - Evaluasi & perbaikan sistem afiliasi: Menghindari distorsi margin akibat harga domain dinamis.
  - Kalibrasi harga ramah pasar Indonesia (*friendly pricing* berbasis modal domain riil):
    - **Paket 1:** Domain `.web.id`, `.my.id`, `.biz.id` (Modal Rp 3rb $\rightarrow$ Jual Rp 150.000 — Entry/Lead Magnet Utama)
    - **Paket 2:** Domain `.com` (Modal Rp 149.900 $\rightarrow$ Jual Rp 349.000 — Standar Global)
    - **Paket 3:** Domain `.id` (Modal Rp 210.000 $\rightarrow$ Jual Rp 449.000 — Prestisius Nasional)
    - **Paket 4:** Domain `.net` (Modal Rp 249.900 $\rightarrow$ Jual Rp 499.000 — Alternatif Global)
    - **Template Berbayar:** Mulai Rp 69.000
  - Biaya domain sudah ter-bundle di dalam harga paket tetap, sehingga formula diskon 20% bagi pembeli dan komisi 20% bagi affiliator berjalan aman, transparan, dan margin Invitea tetap terjaga sehat.
  - **Mekanisme Payout & Notifikasi Discord:**
    - Pencatatan komisi otomatis ke database `referral_commissions` (`payout_status = 'pending'`).
    - Integrasi **Discord Webhook** untuk alert otomatis: channel `#notifikasi-order` dan `#komisi-affiliate`.
    - Payout manual oleh Admin via transfer bank/e-wallet lalu update status jadi `'paid'`.
    - Discord juga difungsikan sebagai community hub bagi para affiliator untuk info promo dan *social proof* bukti transfer pembayaran komisi.
- **Fitur Exclusive Gatekeeper (Proteksi Undangan Privat):**
  - Khusus untuk Paket Bespoke (.com, .id, .net): melindungi undangan agar tidak bisa dibuka oleh orang luar.
  - Verifikasi menggunakan **konfirmasi 4-digit terakhir nomor WhatsApp tamu** (kebal forward link & kebal crawler bot WhatsApp, zero-cost).
  - Dilengkapi **saklar toggle ON/OFF** di Wedding Planner (`plan.invitea.cards`) sehingga pengantin bebas mengaktifkan atau menonaktifkan fitur ini kapan saja.
- **Fitur Eksperimental Visual Canvas Editor (Canva-Like):**
  - Direncanakan untuk `create.invitea.cards`: memungkinkan pengantin membuat undangan bebas dengan drag-and-drop teks, ornamen floral, font wedding, dan stiker.
  - Diposisikan dengan tier harga lebih premium.
  - Sesuai arahan: Dikunci sebagai **Fase 9 (Eksperimental/Fase Terakhir)** setelah seluruh platform utama rilis dan stabil.
- **Perombakan Total UI/UX Design System:**
  - Menanggalkan identitas visual lama (tema berry-pink instan).
  - Merancang sistem desain baru dari awal yang memadukan estetika *Bespoke Luxury Wedding Studio* (editorial, sinematik, prestisius) dan *Modern SaaS Wedding Planner* (bersih, intuitif, menenangkan).
- **Setup Dokumentasi:**
  - Ditambahkan pengecualian `vault/` dan `.obsidian/` pada `.gitignore`.
  - Inisialisasi Obsidian Vault di `./vault/` lengkap dengan dokumen terhubung lintas kategori: `00-Meta`, `01-Product`, `02-Architecture`, `03-Features`, dan `04-ADR`.
  - Penambahan master roadmap checklist interaktif di `vault/00-Roadmap.md`.
  - Inisialisasi file tracking `log.md`.
  - **Fase 0 Selesai.**

---

## 🗺️ Roadmap Tahapan Rebuild

| Fase | Nama Fase | Status | Keterangan |
| :---: | :--- | :---: | :--- |
| **0** | **Blueprint & Setup Vault** | 🟢 *Done* | Penyusunan 14 dokumen Obsidian Vault & inisialisasi log |
| **1** | **Database Reset & Unified Schema** | 🟢 *Done* | Database & Storage Supabase bersih, 11 tabel baru aktif |
| **2** | **Scaffolding React Router v7** | 🟡 *Next* | Inisialisasi base RRv7 + Tailwind v4 + Cloudflare Workers adapter |
| **3** | **Auth Google & Subdomain Dispatcher** | ⚪ *Pending* | Setup Supabase Auth Google & routing `plan.*`, `create.*`, root |
| **4** | **Bespoke Showcase & Landing Page** | ⚪ *Pending* | Redesain hero section & portfolio flow custom design |
| **5** | **Template Builder (Free & Paid)** | ⚪ *Pending* | Porting template renderers & pemisahan logic freemium |
| **6** | **Wedding Planner Engine** | ⚪ *Pending* | Modul Guest List (sync RSVP), Checklist, & Budget Tracker |
| **7** | **Custom Domain & Deploy Cloudflare** | ⚪ *Pending* | Konfigurasi Cloudflare for SaaS, testing e2e, & launch |
