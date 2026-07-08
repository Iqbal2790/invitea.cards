# form.md — Ivory Line

> Kontrak data antara renderer (`index.jsx`) dan form (`form.jsx`).
> AI WAJIB membaca file ini sebelum membuat `form.jsx`. Jangan mengarang key.

---

## Data yang Dibutuhkan Renderer

| Key | Tipe Data | Wajib | Dipakai di Screen/Section |
|---|---|---|---|
| `nama_panggilan_pria` | string | ya | Screen 1 (Cover) |
| `nama_panggilan_wanita` | string | ya | Screen 1 (Cover) |
| `nama_lengkap_pria` | string | ya | Screen 3 (Nama Lengkap) |
| `nama_lengkap_wanita` | string | ya | Screen 3 (Nama Lengkap) |
| `ayah_pria` | string | tidak | Screen 3 |
| `ibu_pria` | string | tidak | Screen 3 |
| `ayah_wanita` | string | tidak | Screen 3 |
| `ibu_wanita` | string | tidak | Screen 3 |
| `foto_urls` | array of string (URL) | ya | Screen 2 (Hero — pakai `foto_urls[0]`), Section 7 (Galeri) |
| `quote_text` | string | tidak | Section 4 (Quote/Sambutan) |
| `acara1_nama` | string | ya | Section 5, Countdown |
| `acara1_tanggal` | string (YYYY-MM-DD) | ya | Section 5, Countdown |
| `acara1_jam` | string (HH:MM) | ya | Section 5, Countdown |
| `acara1_lokasi` | string | ya | Section 5 |
| `acara1_maps_url` | string (URL) | ya | Section 8 (Maps) |
| `acara2_nama` | string | tidak | Section 5 (jika diisi) |
| `acara2_tanggal` | string (YYYY-MM-DD) | tidak | Section 5 (jika diisi) |
| `acara2_jam` | string (HH:MM) | tidak | Section 5 (jika diisi) |
| `acara2_lokasi` | string | tidak | Section 5 (jika diisi) |
| `acara2_maps_url` | string (URL) | tidak | Section 8 (jika diisi) |
| `youtube_url` | string (URL) | tidak | Floating music button |
| `ucapan_penutup` | string | tidak | Section 10 (Penutup) |

---

## Logika Conditional

- **Hero foto (Screen 2):** tidak ada field terpisah. Renderer otomatis pakai `foto_urls[0]` sebagai foto hero full-screen.
- **Acara kedua:** jika `acara2_nama` kosong → sembunyikan seluruh section acara kedua (baik di Section 5 maupun Section 8 Maps). Jika diisi → tampilkan `acara2_tanggal`, `acara2_jam`, `acara2_lokasi`, `acara2_maps_url`.
  Renderer mengecek: `if (data.acara2_nama) { /* render section acara 2 */ }`
- **Countdown Timer (Section 6):** selalu mengarah ke `acara1_tanggal` + `acara1_jam` (acara pertama), bukan acara kedua.
- **Quote (Section 4):** jika `quote_text` kosong → renderer pakai default quote yang didefinisikan di `index.jsx` (bukan di form). Form tidak perlu memvalidasi field ini sebagai wajib.
- **Ucapan Penutup (Section 10):** sama seperti quote — jika `ucapan_penutup` kosong, renderer pakai default text di `index.jsx`.
- **Orang tua (Screen 3):** jika salah satu atau semua field (`ayah_pria`, `ibu_pria`, `ayah_wanita`, `ibu_wanita`) kosong → baris nama orang tua yang kosong disembunyikan, bukan ditampilkan sebagai teks kosong.

---

## Instruksi Form

- Upload foto (`foto_urls`): multiple, minimal 1 foto, maksimal 10 foto
- Format tanggal yang dikirim ke database: `YYYY-MM-DD`
- Format jam yang dikirim ke database: `HH:MM`
- URL YouTube dan Maps: validasi format URL sebelum submit
- Field opsional (`ayah_pria`, `ibu_pria`, `ayah_wanita`, `ibu_wanita`, `quote_text`, `acara2_*`, `youtube_url`, `ucapan_penutup`): jangan wajibkan validasi, tapi tetap tampilkan di form
- Beri hint/placeholder di field opsional yang punya default (`quote_text`, `ucapan_penutup`) — contoh placeholder: "Kosongkan untuk pakai quote default"

---

## Style Form

Ikuti `design.md` template ini:
- Background form: `--ivory-bg`
- Label: font Jost, huruf kapital kecil, letter-spacing 0.03em, warna `--text-muted`
- Input: underline-only (garis bawah `--line-hairline`, bukan kotak border)
- Tombol submit: solid `--ink-black`, teks `--ivory-bg`, sudut kotak (bukan rounded)
- Spacing antar field: longgar, konsisten dengan prinsip whitespace besar di design.md

Form adalah bagian dari experience template — bukan halaman generik.

---

## fields_config (untuk Supabase)

```json
[
  {"name": "nama_panggilan_pria", "label": "Nama Panggilan Mempelai Pria", "type": "text", "required": true},
  {"name": "nama_panggilan_wanita", "label": "Nama Panggilan Mempelai Wanita", "type": "text", "required": true},
  {"name": "nama_lengkap_pria", "label": "Nama Lengkap Mempelai Pria", "type": "text", "required": true},
  {"name": "nama_lengkap_wanita", "label": "Nama Lengkap Mempelai Wanita", "type": "text", "required": true},
  {"name": "ayah_pria", "label": "Nama Ayah Mempelai Pria (opsional)", "type": "text", "required": false},
  {"name": "ibu_pria", "label": "Nama Ibu Mempelai Pria (opsional)", "type": "text", "required": false},
  {"name": "ayah_wanita", "label": "Nama Ayah Mempelai Wanita (opsional)", "type": "text", "required": false},
  {"name": "ibu_wanita", "label": "Nama Ibu Mempelai Wanita (opsional)", "type": "text", "required": false},
  {"name": "foto_urls", "label": "Upload Foto", "type": "photo", "required": true, "multiple": true},
  {"name": "quote_text", "label": "Quote/Sambutan (opsional)", "type": "textarea", "required": false},
  {"name": "acara1_nama", "label": "Nama Acara Pertama (misal: Akad Nikah)", "type": "text", "required": true},
  {"name": "acara1_tanggal", "label": "Tanggal Acara Pertama", "type": "date", "required": true},
  {"name": "acara1_jam", "label": "Jam Acara Pertama", "type": "time", "required": true},
  {"name": "acara1_lokasi", "label": "Lokasi Acara Pertama", "type": "text", "required": true},
  {"name": "acara1_maps_url", "label": "Link Google Maps Acara Pertama", "type": "url", "required": true},
  {"name": "acara2_nama", "label": "Nama Acara Kedua (opsional)", "type": "text", "required": false},
  {"name": "acara2_tanggal", "label": "Tanggal Acara Kedua", "type": "date", "required": false},
  {"name": "acara2_jam", "label": "Jam Acara Kedua", "type": "time", "required": false},
  {"name": "acara2_lokasi", "label": "Lokasi Acara Kedua", "type": "text", "required": false},
  {"name": "acara2_maps_url", "label": "Link Google Maps Acara Kedua", "type": "url", "required": false},
  {"name": "youtube_url", "label": "Link YouTube untuk Musik (opsional)", "type": "url", "required": false},
  {"name": "ucapan_penutup", "label": "Ucapan Penutup (opsional)", "type": "textarea", "required": false}
]
```

---

## Status

```
Dibuat: 07 Juli 2026
Status: Draft — menunggu review user
Asumsi yang diambil (perlu dikonfirmasi user):
  - Hero foto otomatis pakai foto_urls[0], tidak ada field terpisah
  - Nama orang tua opsional
  - Quote_text opsional dengan default quote fallback di index.jsx
  - Ucapan_penutup opsional dengan default text fallback di index.jsx
Belum dibuat: form.jsx, index.jsx
```
