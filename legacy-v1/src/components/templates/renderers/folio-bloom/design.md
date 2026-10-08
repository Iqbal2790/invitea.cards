# design.md — Folio Bloom

> Template undangan pernikahan. Mekanisme utama: amplop tertutup → tap → 6 kartu fan-out 3D yang bisa dibuka satu-satu jadi section penuh.

---

## 1. Konsep & Mood

Romantis-lembut, tapi tampil di atas **dark mode**. Kesannya seperti membuka kotak kenangan di malam hari — kartu-kartu kertas krem yang lembut menyala kontras di atas latar gelap kebiruan, dengan aksen lavender dan dusty rose sebagai sentuhan warna.

Berbeda dari:
- **Heritage Glow** — swipe/tap linear, birthday
- **Blooming Letter** — scroll linear, wedding
- **Ivory Line** — minimalis, light mode
- **Folio Bloom** — navigasi non-linear via kartu, dark mode, sentuhan playful-elegan

---

## 2. Palet Warna

| Token | Hex | Fungsi |
|---|---|---|
| `--bg-base` | `#14151F` | Background utama (charcoal kebiruan) |
| `--bg-elevated` | `#1B1D2A` | Background sedikit lebih terang (mis. area cover) |
| `--card-surface` | `#FBF7EE` | Warna dasar kartu (cream/ivory paper) |
| `--card-surface-shadow` | `rgba(0,0,0,0.45)` | Shadow di bawah kartu supaya "mengambang" |
| `--text-on-dark` | `#F2EEE5` | Teks utama di atas background gelap |
| `--text-on-dark-muted` | `#A9A6B8` | Teks sekunder di atas background gelap |
| `--text-on-card` | `#2B2632` | Teks utama di atas kartu cream |
| `--text-on-card-muted` | `#6B6577` | Teks sekunder di atas kartu cream |
| `--accent-lavender` | `#B9A9D9` | Aksen dekoratif, ornamen, divider |
| `--accent-dusty-rose` | `#CC9C95` | Aksen dekoratif kedua, highlight kecil |
| `--btn-bg` | `#B9A9D9` | Background tombol interaktif (beda dari accent dekoratif biar konsisten) |
| `--btn-bg-hover` | `#A691C9` | Hover/tap state tombol |
| `--btn-text` | `#14151F` | Teks di atas tombol |

**Catatan:** `--accent-lavender` dan `--btn-bg` sengaja dipisah tokennya walau warnanya sama sekarang — supaya kalau nanti tombol butuh warna beda dari ornamen, tinggal ubah satu token tanpa ganggu yang lain (prinsip color token discipline).

---

## 3. Tipografi

| Elemen | Font | Contoh Pemakaian |
|---|---|---|
| Judul/Nama pasangan | Cormorant Garamond | Nama di cover, judul tiap kartu penuh |
| Body/label/form | Manrope | Isi teks acara, label form, guestbook |

- Ukuran judul cover: besar (kesan hero), letter-spacing agak lebar
- Ukuran judul kartu (fan-out, ukuran kecil): Cormorant Garamond tetap dipakai tapi ukuran compact
- Body text selalu Manrope, weight 400 untuk isi, 600 untuk label

---

## 4. Ornamen

Garis floral tipis (line art bunga/daun), dipakai sebagai:
- Elemen dekoratif di pojok cover (bukan bingkai penuh, cukup aksen di 1-2 sudut)
- Divider halus antara judul dan isi di dalam kartu yang di-expand
- Warna ornamen: `--accent-lavender` atau `--accent-dusty-rose`, opacity ~60-70% supaya tetap halus, tidak mendominasi

**Jangan** dipakai berlebihan — ornamen adalah aksen, bukan pattern background penuh.

---

## 5. Struktur Screen

### 5.1 Cover (State Tertutup)
- Background: `--bg-base`
- Di tengah: ilustrasi "amplop"/stack kartu tertutup (representasi visual dari 6 kartu yang menumpuk rapi)
- Nama pasangan singkat (Cormorant Garamond, besar) di atas stack
- Teks kecil di bawah: "Tap untuk membuka" (Manrope, `--text-on-dark-muted`)
- Ornamen floral tipis di 1 sudut layar

### 5.2 Fan-Out View (State Terbuka)
- Trigger: tap di area cover
- Animasi: kartu-kartu menyebar dari titik tumpuk ke posisi masing-masing (rotate + translate, mirip referensi video — `cubic-bezier(0.23, 1, 0.32, 1)`, durasi ~0.6s)
- **Semua 6 kartu muncul sekaligus**, ukuran masing-masing dikecilkan (mini-card) supaya muat di layar HP tanpa scroll
- Tiap mini-card berisi: ikon/label singkat (nama section) + 1 visual kecil yang relevan (mis. mini-card Galeri nampilin thumbnail foto cover)
- Tap salah satu mini-card → transisi ke Section Penuh (lihat 5.3)
- Tombol kembali ke Cover (opsional, kecil, pojok atas)

### 5.3 Section Penuh (per Kartu)
Saat mini-card di-tap, kartu itu membesar mengisi layar penuh dengan background `--card-surface` (kartu cream), sementara background dark tetap di baliknya (efek seperti kartu "diangkat" ke depan).

Ada tombol "← Kembali" di pojok atas tiap section penuh, untuk balik ke Fan-Out View.

**Detail tiap section:**

**a. Mempelai**
- Nama pria & wanita (besar, Cormorant Garamond)
- Nama orang tua kedua mempelai (kecil, di bawah masing-masing nama, Manrope)

**b. Acara**
- Mendukung 2 acara (Akad + Resepsi), sama seperti Blooming Letter
- Tiap acara: nama acara, tanggal, jam, lokasi, tombol buka Google Maps
- Acara kedua hanya tampil jika data-nya diisi (conditional rendering)

**c. Galeri**
- Cover: 1 foto utama (dari `foto_urls[0]`)
- Tap foto cover → buka galeri penuh (grid atau swipe foto lainnya)

**d. Musik**
- Tombol play/pause
- Judul lagu ditampilkan di bawah/samping tombol

**e. Ucapan (Guestbook)**
- Area scrollable menampilkan pesan-pesan tamu yang sudah masuk (nama + pesan)
- Form kecil di bawah/atas: input nama + pesan, tombol kirim

**f. RSVP**
- Form compact: nama tamu, pilihan Hadir/Tidak Hadir, jumlah tamu yang dibawa
- Tombol submit dengan `--btn-bg`

---

## 6. Interaksi & Animasi

- Transisi Cover → Fan-Out: 0.6s, `cubic-bezier(0.23, 1, 0.32, 1)`, kartu rotate + scale dari titik pusat
- Transisi Fan-Out → Section Penuh: kartu yang di-tap membesar (scale + posisi ke tengah), kartu lain fade out sementara
- Transisi kembali: kebalikan dari di atas
- Semua transisi berbasis **state React** (`useState` untuk kartu aktif), bukan CSS checkbox hack — supaya bisa handle 6 pilihan sekaligus, bukan cuma on/off

---

## 7. Catatan Teknis Tertunda

- Tabel `rsvp_responses` di database saat ini belum punya kolom `jumlah_tamu` dan `pesan` (guestbook). Perlu migrasi sebelum `index.jsx` dan API terkait dibuat.
- Google Maps embed untuk section Acara mengikuti aturan grayscale styling seperti template lain (custom map config).
