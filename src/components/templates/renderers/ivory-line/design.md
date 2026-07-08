# design.md — Ivory Line

> Template undangan pernikahan — minimalis, premium, editorial.
> Dokumen ini adalah spec visual. Dibaca oleh AI sebelum membuat `index.jsx`.

---

## 1. Identitas Template

```
Nama: Ivory Line
Slug: ivory-line
Kategori: undangan (pernikahan)
Vibe: Minimalis, premium, editorial
```

---

## 2. Palet Warna

| Token (nama variabel) | Hex | Fungsi |
|---|---|---|
| `--ivory-bg` | `#FAF6EF` | Warna dasar/background utama |
| `--ivory-bg-soft` | `#F3EDE1` | Background alternatif untuk section selang-seling |
| `--ink-black` | `#161512` | Warna teks utama, tombol, elemen kontras |
| `--navy-deep` | `#10192B` | Aksen sekunder — dipakai di footer/section penutup |
| `--line-hairline` | `#D8D0C0` | Garis tipis pembatas antar-section (1px, bukan garis tebal) |
| `--text-muted` | `#6B6558` | Teks sekunder (caption, label kecil) |

**Catatan:** Tidak ada warna gold/emas. Kesan premium datang dari kontras tegas ivory-hitam + banyak whitespace, bukan dari warna "mewah" konvensional. Ini penting agar hasil tidak jatuh ke kesan "template kondangan biasa".

---

## 3. Tipografi

```
Headline (nama mempelai, judul section): Fraunces
  - Import: Google Fonts "Fraunces" weight 300 (light) & 500 (medium)
  - Ukuran: 48-64px di screen cover, 32-40px di judul section
  - Letter-spacing: -0.01em (sedikit rapat, kesan editorial solid)

Body (paragraf, label, tombol): Jost
  - Import: Google Fonts "Jost" weight 400 & 500
  - Ukuran: 14-16px body text, 12px untuk caption/label
  - Letter-spacing: 0.03em khusus label huruf kapital kecil (contoh: "SAVE THE DATE")
```

---

## 4. Prinsip Layout & Spacing

- Whitespace besar — jarak antar-elemen minimal 2x lebih longgar dibanding template ramai biasa
- Tidak ada border tebal atau shadow berat — pembatas antar-elemen pakai `--line-hairline` (1px) saja
- Sudut elemen (foto, kartu info) tegas/kotak, bukan rounded
- Alignment: center-align untuk screen pembuka, left-align untuk section detail (kesan membaca undangan cetak)

---

## 5. Transisi & Animasi

```
Screen ke Screen (cover → hero → nama): fade + slight scale-up, durasi 600-800ms
  (bukan slide horizontal — untuk kesan tenang, bukan "app slideshow")

Scroll reveal (tiap section muncul saat di-scroll): fade + translateY 20px, durasi 500ms

Countdown angka: tanpa animasi bouncy, cukup fade saat angka berubah
```

---

## 6. Struktur Konten

**Bagian Screen** (transisi antar-screen seperti slide, sebelum discroll):
1. Cover
2. Hero
3. Nama Lengkap Mempelai

**Bagian Scroll** (setelah masuk, lanjut ke bawah):
4. Quote/Sambutan
5. Detail Acara (Akad Nikah, dan Resepsi jika diisi)
6. Countdown Timer
7. Galeri Foto
8. Google Maps (per acara)
9. RSVP Form
10. Ucapan Penutup

Musik (YouTube) bukan section tersendiri — floating button kecil di pojok.

---

## 7. Detail per Section

| Section | Layout |
|---|---|
| 1. Cover | Full-screen, background `--ivory-bg`, nama panggilan mempelai center, tombol "Buka Undangan" outline tipis (bukan solid) |
| 2. Hero | Foto full-bleed (memenuhi layar), overlay gradient tipis di bawah untuk keterbacaan teks nama |
| 3. Nama Lengkap | Background `--ivory-bg-soft`, dua kolom (mempelai pria/wanita) dengan garis hairline vertikal di tengah sebagai pembatas |
| 4. Quote | Center-align, italic Fraunces, ukuran besar, padding atas-bawah besar |
| 5. Detail Acara | Card dengan border hairline (bukan shadow), ikon garis tipis (bukan ikon solid berwarna) |
| 6. Countdown | 4 angka besar (hari/jam/menit/detik) dipisah garis hairline vertikal, bukan kotak berwarna |
| 7. Galeri Foto | Grid asimetris (bukan grid kotak rata), foto besar-kecil bergantian untuk kesan editorial |
| 8. Google Maps | Peta ditampilkan monokrom/grayscale (custom map style) agar konsisten dengan tone ivory-hitam |
| 9. RSVP Form | Input underline-only (garis bawah saja, bukan kotak border), label kecil di atas input |
| 10. Penutup | Background `--navy-deep`, teks `--ivory-bg`, kesan "menutup" yang kontras dari section sebelumnya |

**Catatan teknis:** Peta grayscale di section 8 memerlukan setting khusus di Google Maps Embed ("map styling") — bukan default. Tandai ini agar tidak terlewat saat membuat `form.md` / `index.jsx`.

---

## 8. Musik

Floating button kecil pojok kanan bawah, ikon garis tipis (bukan ikon solid), warna `--ink-black`. Tidak jadi section tersendiri.

---

## 9. Fotografi

Foto sebaiknya natural light, bukan foto studio dengan background ramai. Rekomendasikan ke user (di halaman order) foto dengan tone warna netral/soft supaya menyatu dengan palet ivory-hitam.

---

## 10. Status

```
Dibuat: 07 Juli 2026
Status: Draft disetujui — siap lanjut ke tahap berikutnya (index.jsx renderer)
Belum dibuat: form.md, form.jsx, index.jsx
```
