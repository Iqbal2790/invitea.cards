# form.md — Folio Bloom

Spesifikasi form data untuk template Folio Bloom. Key di form (`FolioBloomForm.jsx`) dan data mapping di `buat/[id]/page.jsx` harus mengikuti struktur ini.

## Struktur `fields_config` (Default)

```json
{
  "isFeatured": false
}
```

## Struktur Data Input User (`data_content` / `formData`)

```json
{
  // --- Step 1: Mempelai ---
  "mempelai_pria_nama": "Romeo",
  "mempelai_pria_ortu": "Putra dari Bapak Montague & Ibu Montague",
  "mempelai_wanita_nama": "Juliet",
  "mempelai_wanita_ortu": "Putri dari Bapak Capulet & Ibu Capulet",
  
  // --- Step 2: Acara Akad ---
  "acara_akad_nama": "Akad Nikah",
  "acara_akad_tanggal": "Sabtu, 12 Desember 2026",
  "acara_akad_jam": "08:00 - 10:00 WIB",
  "acara_akad_lokasi_nama": "Masjid Raya",
  "acara_akad_lokasi_alamat": "Jl. Kemerdekaan No. 1, Jakarta",
  "acara_akad_lokasi_url": "https://maps.app.goo.gl/...",
  
  // --- Step 3: Acara Resepsi (Opsional) ---
  "acara_resepsi_nama": "Resepsi Pernikahan",
  "acara_resepsi_tanggal": "Sabtu, 12 Desember 2026",
  "acara_resepsi_jam": "11:00 - 14:00 WIB",
  "acara_resepsi_lokasi_nama": "Gedung Serbaguna",
  "acara_resepsi_lokasi_alamat": "Jl. Kemerdekaan No. 2, Jakarta",
  "acara_resepsi_lokasi_url": "https://maps.app.goo.gl/...",
  
  // --- Step 4: Musik ---
  "music_youtube_url": "https://youtu.be/P3wSn5K9quo?si=Z5S7zzSCeletoPhI",
  "music_quote": "A thousand years"
}
```

## Foto URLs (`foto_urls` array)
Template ini mendukung upload foto di galeri.
- Index `0`: Foto Utama (Cover Galeri)
- Index `1`, `2`, `...`: Foto-foto tambahan untuk grid galeri.

*(Catatan: Tombol submit harus merangkum seluruh form data + foto ke dalam 1 request)*
