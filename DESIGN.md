---
name: Invitea
description: Platform pembuat undangan digital kilat dan elegan.
colors:
  primary: "oklch(58% 0.13 15)"
  primary-text: "oklch(94% 0.02 70)"
  secondary: "oklch(38% 0.14 15)"
  secondary-deep: "oklch(28% 0.11 15)"
  accent: "oklch(72% 0.09 16)"
  neutral-bg: "oklch(96% 0.02 75)"
  neutral-bg-alt: "oklch(91% 0.035 25)"
  neutral-ink: "oklch(23% 0.03 40)"
  neutral-ink-soft: "oklch(40% 0.03 35)"
typography:
  display:
    fontFamily: "'Cormorant Garamond', serif"
  body:
    fontFamily: "'Manrope', sans-serif"
rounded:
  full: "999px"
  md: "14px"
  sm: "6px"
spacing:
  sm: "10px"
  md: "20px"
  lg: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-text}"
    rounded: "{rounded.full}"
    padding: "15px 30px"
---

# Design System: Invitea

## 1. Overview

**Creative North Star: "Elegan, Tenang, dan Feminin"**

Sistem desain ini difokuskan pada penyampaian kesan elegan yang instan dan menawan. Tampilan harus rapi, responsif di semua perangkat, dan memancarkan ketenangan. Estetika ini kini merangkul kelembutan melalui sudut-sudut membulat (kapsul) pada tombol interaktif, yang memberikan kesan *friendly* dan modern. 

**Key Characteristics:**
- Dukungan *light/dark mode* yang harmonis secara asli (*native*).
- Responsivitas mutlak di semua tingkat ukuran (layar ponsel hingga monitor besar).
- Teks terbaca jelas dengan kontras yang kuat.

## 2. Colors

Karakteristik warna menggunakan palet berry, pink, dan krem terang (oklch) yang bereaksi mulus terhadap pengaturan tema pengguna.

### Primary
- **Pink Button** (oklch(58% 0.13 15)): Warna latar belakang tombol aksi utama. Memberi *pop-out* di atas layar.
- **Cream Text** (oklch(94% 0.02 70)): Warna teks terang di atas latar belakang berry atau pink.

### Secondary
- **Berry** (oklch(38% 0.14 15)): Warna dalam dan kaya yang digunakan untuk tombol ghost dan CTA block.
- **Berry Deep** (oklch(28% 0.11 15)): Aksen gelap dari Berry, digunakan untuk Footer dan kartu-kartu tebal.

### Neutral
- **Background** (oklch(96% 0.02 75)): Warna permukaan utama pada tema terang.
- **Background Alt** (oklch(91% 0.035 25)): Latar alternatif untuk memisahkan bagian antar-seksi.
- **Ink** (oklch(23% 0.03 40)): Warna teks tebal untuk judul dan konten utama.
- **Ink Soft** (oklch(40% 0.03 35)): Teks pendukung untuk paragraf.

**The Contrast Rule.** Setiap paduan teks harus memiliki kontras tinggi untuk memastikan aksesibilitas tetap terjaga. 

## 3. Typography

**Display Font:** Cormorant Garamond
**Body Font:** Manrope

**Character:** Kombinasi klasik antara Serif elegan untuk judul yang memanjakan mata, dan Manrope (sans-serif) yang modern dan kokoh untuk kenyamanan membaca di level paragraf.

### Hierarchy
- **Display**: Digunakan secara eksklusif untuk judul besar (Hero section). Menggunakan `line-height: 1.08`.
- **Headline**: Digunakan untuk sub-judul seksi atau judul fitur.
- **Body** (Manrope, 17px, line-height 1.6): Teks paragraf utama. Dilarang menggunakan *all-caps* di level paragraf.
- **Label** (Manrope, 15px, semi-bold): Digunakan pada tombol, dengan `letter-spacing: 0.01em`.

**The No All-Caps Paragraph Rule.** Paragraf tubuh (body text) tidak boleh diketik menggunakan huruf kapital semua. 

## 4. Elevation

Sistem ini menganut gaya desain datar (*flat*) namun menggunakan elemen bayangan (*shadow*) lembut nan spesifik sebagai umpan balik interaksi dan pemisah visual.

### Shadow Vocabulary
- **Shadow Pink** (`0 10px 30px -12px var(--shadow-pink)`): Bayangan merona di bawah tombol utama. Akan menebal saat di-hover.
- **Shadow Photo** (`0 40px 70px -30px var(--shadow-photo)`): Bayangan sangat tebal untuk memberikan dimensi 3D pada foto estetis.

**The Responsive Elevation Rule.** Shadow tidak boleh terpotong (*clipped*) pada layar *mobile*, dan setiap penempatan lapisan/tumpukan (Z-Index) harus aman untuk responsivitas layar kecil.

## 5. Components

### Buttons
- **Shape:** Sudut membulat penuh atau bentuk kapsul (`999px`).
- **Primary:** Menggunakan `var(--pink-btn-bg)` dengan transisi `transform 0.35s, box-shadow 0.35s` dan bayangan lembut di bawahnya.
- **Ghost:** Border tipis warna berry, tanpa latar di saat statis, berubah penuh (fill) saat disentuh.
- **Light:** Tombol berwarna terang untuk digunakan di atas *background* super gelap seperti `Berry Deep`.

### Cards / Containers
- **Corner Style:** Umumnya menggunakan sudut sedikit tumpul (misalnya 4px hingga 14px), bukan pil/kapsul.
- **Background:** Bisa `Berry Deep` atau warna lembut.

### Navigation (Header)
- **Style:** Latar semi-transparan dengan `backdrop-filter: blur(10px)`.
- **Theme Toggle:** Menggunakan desain lingkaran kecil ber-border untuk menukar antara *light* dan *dark mode*.

## 6. Do's and Don'ts

### Do:
- **Do** gunakan sudut membulat/kapsul (*rounded-full*) secara konsisten pada setiap *button* atau pil penanda label.
- **Do** berikan bayangan lembut pada tombol utama (pink) dan foto-foto hero untuk memberi kesan elegan terangkat.
- **Do** selalu utamakan tampilan yang *responsive* di mode mobile (atur ulang grid-template-columns menjadi 1fr di bawah 880px atau 780px).
- **Do** terapkan dukungan adaptasi *Dark Mode* untuk semua token.

### Don't:
- **Don't** gunakan desain dengan sudut tajam kaku pada elemen interaktif seperti tombol. (Aturan ini menggantikan aturan lama).
- **Don't** atur gaya tipografi menjadi kapital semua (*all-caps*) pada teks konten/paragraf.
- **Don't** membuat elemen yang lebarnya konstan (*fixed-width*) sehingga merusak layout *mobile*. Gunakan `clamp()` atau unit relatif (`vw`, `%`).
