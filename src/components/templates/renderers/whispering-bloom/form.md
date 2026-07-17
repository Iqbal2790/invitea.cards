# form.md — Whispering Bloom

## Data yang Dibutuhkan Renderer

Daftar semua key yang dipakai di `index.jsx` beserta tipe datanya.
AI WAJIB membaca bagian ini sebelum membuat `form.jsx`.

| Key | Tipe Data | Wajib | Dipakai di Screen |
|---|---|---|---|
| nama_penerima | string | ya | Screen 2 (Cover) |
| momen | string | ya | Screen 2 (Cover) |
| nama_pengirim | string | ya | Screen 3 (Dari Siapa), Screen 9 (Closing) |
| pesan | string (long text) | ya | Screen 4 (Pesan Utama) |
| foto_urls | array of string (URL) | ya | Screen 5, Screen 6 (Galeri Foto) |
| youtube_url | string (URL) | tidak | Screen 7 (Musik) |
| kalimat_penutup | string | tidak | Screen 8 (Bunga Mekar Personal) |
| signature_penutup | string | tidak | Screen 9 (Closing) |

## Logika Conditional

- Jika `youtube_url` kosong → Screen 7 (Musik) dilewati/disembunyikan dari alur tap/swipe
- Jika `kalimat_penutup` kosong → tampilkan teks default hardcode di `index.jsx`: **"Semoga kebahagiaan selalu menyertaimu."**
- Jika `signature_penutup` kosong → tampilkan teks default hardcode di `index.jsx`: **"Dengan cinta,"**
- Renderer mengecek: `if (data.youtube_url) { /* render Screen Musik */ }`
- Renderer mengecek: `const kalimatPenutup = data.kalimat_penutup || "Semoga kebahagiaan selalu menyertaimu."`
- Renderer mengecek: `const signature = data.signature_penutup || "Dengan cinta,"`

## Instruksi Form

- Upload foto: multiple, minimal 1 foto, maksimal 10 foto
- `pesan`: textarea (bukan input satu baris), tidak ada batas karakter maksimal yang keras, tapi beri saran panjang wajar di placeholder
- `kalimat_penutup` dan `signature_penutup`: input satu baris, placeholder menunjukkan contoh teks default supaya user tahu apa yang muncul kalau dikosongkan
- URL YouTube: validasi format URL sebelum submit
- Field opsional (`youtube_url`, `kalimat_penutup`, `signature_penutup`): jangan wajibkan validasi, tapi tetap tampilkan di form

## Style Form

Ikuti `design.md` template ini untuk:
- Background gelap (`bg-dark` `#0D0D14`) dengan teks ivory (`text-ivory` `#F5F0E6`)
- Label pakai Manrope, font input pakai Cormorant Garamond untuk field teks panjang (pesan, kalimat_penutup, signature_penutup)
- Aksen warna emas (`accent-gold` `#E8C77E`) untuk border/focus state input
- Tombol submit dengan efek glow tipis (`glow-core`/`glow-edge`) saat hover, senada tema bunga menyala

Form adalah bagian dari experience template — bukan halaman generik.
