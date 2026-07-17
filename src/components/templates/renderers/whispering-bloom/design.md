# design.md — Whispering Bloom
## Kartu Ucapan Digital — Signature Visual: Glowing Flower

> Referensi utama: video "Glowing Flower Animation" — bunga-bunga menyala satu per satu secara random dengan efek glow hangat di atas background gelap.

---

## 1. Konsep Visual

Dark, intimate, warm-glow. Kesan seperti malam yang tenang dan hangat — cahaya bunga jadi satu-satunya "bintang" di layar gelap. Sebagian besar screen dibuat minim & tenang supaya momen glowing (Opening & Screen 8) terasa istimewa, bukan berulang.

---

## 2. Palet Warna

| Token | Hex | Fungsi |
|---|---|---|
| `bg-dark` | `#0D0D14` | Background utama, hampir hitam dengan sedikit undertone biru gelap |
| `glow-core` | `#FFC069` | Warna inti cahaya bunga (bagian paling terang) |
| `glow-edge` | `#FF7A45` | Warna tepi/gradasi glow (oranye lebih dalam) |
| `text-ivory` | `#F5F0E6` | Warna teks utama di atas background gelap |
| `text-muted` | `#B8B4AC` | Teks sekunder (label, caption) |
| `accent-gold` | `#E8C77E` | Aksen garis, border tipis, dekorasi kecil |
| `stem-brown` | `#3D2B1F` | Warna batang/daun bunga (gelap, tidak mencolok) |

**Catatan (asumsi yang aku buat, tolong dikoreksi kalau kurang pas):** Palet ini aku ambil langsung dari warna di video referensi kamu (gelap + oranye-emas). Belum pakai warna brand Invitea yang biasa (lavender/dusty rose di Folio Bloom) karena tema bunga menyala ini lebih cocok warm-tone. Kalau kamu mau tetap menyisipkan sentuhan warna brand, kasih tau ya.

---

## 3. Tipografi

- **Headline:** Cormorant Garamond (serif elegan) — nama penerima, nama pengirim, kalimat penutup
- **Body/UI:** Manrope — label momen, teks pesan panjang, tombol, caption galeri

*(Konsisten dengan font brand Invitea yang sudah dipakai di template lain.)*

---

## 4. Struktur 9 Screen

### Screen 1 — Opening: Glowing Flower Reveal
- Full-screen `bg-dark`, siluet 5 batang bunga tersusun di tengah-bawah layar
- Auto-play: bunga tengah menyala duluan (fade + scale in), lalu 2 bunga di sampingnya, lalu sisanya menyala random bertahap (~500ms per bunga) — persis pola dari kode di referensi kamu
- Setelah semua menyala (~3 detik), teks "Tap to Open" muncul pelan (Manrope, letter-spacing lebar, animasi pulsing opacity)
- Tap → transisi cross-fade ke Screen 2

### Screen 2 — Cover
- Nama penerima besar, Cormorant Garamond, di tengah
- Label momen (mis. "Selamat Ulang Tahun") — Manrope uppercase kecil, warna `accent-gold`, di atas nama
- Satu ikon bunga glow kecil sebagai aksen dekoratif
- Indikator swipe/tap untuk lanjut

### Screen 3 — Dari Siapa
- Teks kecil "Sebuah pesan hangat dari" lalu nama_pengirim besar (Cormorant Garamond italic)
- Satu glow bunga blur/bokeh lembut di background, opacity rendah — bukan animasi penuh, cuma ambient

### Screen 4 — Pesan Utama
- Isi pesan/ucapan lengkap, Cormorant Garamond regular, line-height nyaman untuk teks panjang
- Motif kecil (bunga/quote mark) di bagian atas sebagai dekorasi
- Kalau pesan panjang, area teks bisa discroll internal (screen-nya sendiri tetap tap-based)

### Screen 5 — Galeri Foto (set 1)
- Foto dalam frame rounded-corner warna ivory tipis, drop shadow supaya foto "terangkat" dari background gelap
- 1 foto besar per swipe, ada indikator titik (dot) posisi galeri

### Screen 6 — Galeri Foto (lanjutan)
- Sama seperti Screen 5, isi foto sisanya

### Screen 7 — Musik
- Layout tengah, player YouTube minimal (thumbnail + tombol play custom)
- Cincin glow hangat berdenyut halus di sekitar tombol play, senada tema utama

### Screen 8 — Bunga Mekar Personal ⭐ (momen kunci kedua)
- Satu kuncup bunga tertutup di tengah, ada animasi "napas" halus (idle glow) supaya tamu tergoda untuk tap
- Saat di-tap: kuncup mekar dengan glow (mirip Opening tapi 1 bunga, durasi lebih lambat ~2 detik biar terasa personal)
- Setelah mekar penuh, 1 kalimat penutup/doa muncul fade-in di bawah bunga, Cormorant Garamond italic

### Screen 9 — Closing
- Kalimat penutup/signature + nama_pengirim sekali lagi
- Semua bunga dari Opening muncul kembali di background dengan glow redup (afterglow), sebagai penutup yang senada dengan pembuka

---

## 5. Prinsip Animasi

- Glow penuh (semua bunga menyala bertahap) **hanya** di Screen 1 dan versi redup di Screen 9
- Glow personal (1 bunga mekar interaktif) **hanya** di Screen 8
- Screen lain: ambient glow blur rendah saja atau tanpa animasi glow sama sekali — supaya 2 momen kunci itu tetap terasa spesial, tidak generik

---

## 6. Referensi Teknis: Kode Animasi Glow

Kode ini adalah dokumentasi **logika & timing** animasi bunga menyala (dipakai di Screen 1 & versi personal di Screen 8). Ini referensi untuk fase `index.jsx` nanti, bukan kode final — nanti diadaptasi ke React (`useEffect`/`useState`), bukan manipulasi DOM langsung seperti di bawah ini.

### Logika Urutan Menyala (JavaScript)

```js
const flowers = Array.from(document.querySelectorAll('.flower-container'));
const animatedClass = 'animate';

// Bunga tengah (pertama) menyala duluan, begitu screen tampil
flowers[0].classList.add(animatedClass);

// Setelah jeda 3 detik, lanjut nyalakan bunga lainnya
setTimeout(() => {
  // 2 bunga di sebelah bunga tengah menyala hampir bersamaan
  for (let i = 1; i <= 2 && i < flowers.length; i++) {
    flowers[i].classList.add(animatedClass);
  }

  // Sisa bunga menyala SATU-SATU secara random, jeda 500ms tiap bunga
  let remaining = flowers.slice(3);
  const interval = setInterval(() => {
    if (remaining.length === 0) {
      clearInterval(interval);
      return;
    }
    const randomIndex = Math.floor(Math.random() * remaining.length);
    const el = remaining.splice(randomIndex, 1)[0];
    el.classList.add(animatedClass);
  }, 500);
}, 3000);
```

**Penjelasan awam:** Kode ini nentuin *kapan* dan *urutan* bunga menyala — bunga tengah dulu, lalu 2 tetangganya, lalu sisanya diacak satu-satu tiap setengah detik. Tapi kode ini sendiri **tidak** menentukan bagaimana tampilan "menyala" itu — itu tugas CSS di bawah, yang hilang dari postingan aslinya.

### CSS yang Melengkapi (bagian yang sengaja tidak dibagikan)

```css
.flower-container {
  opacity: 0;
  transform: scale(0.85);
  filter: drop-shadow(0 0 0px transparent);
  transition: opacity 1.2s ease-out, transform 1.2s ease-out, filter 1.2s ease-out;
}

.flower-container.animate {
  opacity: 1;
  transform: scale(1);
  filter: drop-shadow(0 0 18px #FFC069) drop-shadow(0 0 36px #FF7A45);
  animation: glow-pulse 3s ease-in-out infinite alternate;
}

/* Setelah menyala, bunga "bernapas" pelan — biar tidak terasa statis */
@keyframes glow-pulse {
  from {
    filter: drop-shadow(0 0 14px #FFC069) drop-shadow(0 0 28px #FF7A45);
  }
  to {
    filter: drop-shadow(0 0 22px #FFC069) drop-shadow(0 0 44px #FF7A45);
  }
}
```

**Penjelasan awam:**
- `opacity` + `transform: scale` + `transition` = efek bunga muncul perlahan & sedikit membesar saat menyala (bukan tiba-tiba muncul)
- `filter: drop-shadow` (dobel, warna inti + warna tepi) = efek cahaya/glow di sekitar bunga — inilah yang bikin keliatan "menyala", bukan cuma "muncul"
- `@keyframes glow-pulse` = animasi berdenyut halus terus-menerus setelah bunga menyala, biar terasa hidup, bukan nyala lalu diam

### Untuk Screen 8 (Bunga Mekar Personal)
Logika sama, tapi disederhanakan: cuma 1 bunga, dipicu oleh `onClick`/`onTap` (bukan otomatis), dan durasi transition diperlambat (~2 detik) supaya terasa lebih personal/khidmat dibanding versi Opening yang cepat & ramai.

---

## 7. Do's & Don'ts

- ✅ Jaga mayoritas screen tetap tenang/minim animasi
- ✅ Warna glow konsisten di semua momen (jangan ganti-ganti hue)
- ❌ Jangan taruh animasi glow penuh di banyak screen — akan menghilangkan efek "spesial"-nya
- ❌ Jangan ubah palet warna jadi terlalu terang/pastel — akan menghilangkan mood "malam hangat" dari referensi
