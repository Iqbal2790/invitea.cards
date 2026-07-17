# Log — Whispering Bloom (Template Kartu Ucapan)

## Session 1 — Brainstorming Flow (16 Juli 2026)

### Keputusan Dasar
- **Kategori:** Kartu Ucapan
- **Momen:** Umum/fleksibel (ulang tahun, wisuda, dll — tidak dikhususkan)
- **Interaksi:** Tap/swipe per layar (mengikuti pola Heritage Glow)
- **Jumlah screen:** 9
- **Fitur opsional dari PRD yang dipakai:** Musik YouTube saja
- **Fitur opsional yang TIDAK dipakai:** Countdown, Google Maps
- **Konsep utama:** Glowing flower animation (referensi: video "Glowing Flower Animation") jadi signature visual template, dipakai di 2 momen kunci — Opening (banyak bunga menyala random) dan Screen 8 (1 bunga mekar personal untuk penerima)

### Flow 9 Screen (Final)
1. **Opening** — Glowing Flower Reveal (auto-play, bunga menyala satu-satu secara random, replikasi dari video referensi) → tombol "Tap to Open" muncul setelah animasi selesai
2. **Cover** — Nama penerima + jenis momen
3. **Dari Siapa** — reveal nama pengirim
4. **Pesan Utama** — isi ucapan/doa lengkap dari pengirim
5. **Galeri Foto** — set foto pertama
6. **Galeri Foto lanjutan** — sisa foto
7. **Musik** — pemutar YouTube (kondisional, jika youtube_url diisi)
8. **Bunga Mekar Personal** — tamu tap 1 kuncup bunga → mekar perlahan (variasi animasi opening tapi single flower) → muncul 1 baris kalimat penutup/doa
9. **Closing** — penutup/signature akhir

### Data yang Dibutuhkan (jadi acuan form.md nanti)
- nama_penerima (wajib)
- nama_pengirim (wajib)
- momen (wajib)
- pesan (wajib)
- foto_urls — array, multiple (wajib)
- youtube_url (opsional)

Tidak ada field baru di luar field standar kartu ucapan pada PRD.md.

### Ide yang Ditolak/Disimpan untuk Nanti
- Galeri foto dengan bingkai bunga (foto muncul dari kelopak) — user belum approve, kemungkinan bisa dieksplorasi lagi saat design.md kalau mau
- Guestbook/ucapan balik dari tamu — tidak dipakai untuk versi ini

### Next Step (selesai di Session 2)
- ~~Tulis `design.md`~~ ✅ Selesai

---

## Session 2 — design.md & form.md (16 Juli 2026)

### design.md
- Palet warna: dark charcoal (`#0D0D14`) + warm glow oranye-emas (`#FFC069`/`#FF7A45`), diambil langsung dari referensi video, belum pakai warna brand Invitea (lavender/dusty rose) — user setuju
- Tipografi: Cormorant Garamond (headline) + Manrope (body), konsisten dengan brand
- Struktur visual 9 screen didetailkan sesuai flow Session 1
- Kode animasi dari screenshot user (video "Glowing Flower Animation") disempurnakan dan dimasukkan sebagai referensi teknis:
  - JS: logika urutan menyala (bunga tengah → 2 tetangga → sisanya random tiap 500ms) — sudah lengkap dari screenshot
  - CSS: bagian yang sengaja tidak dibagikan oleh pembuat konten (opacity/scale/filter transition + `@keyframes glow-pulse`) — dilengkapi oleh Claude
  - Catatan: ini referensi logika untuk fase `index.jsx`, akan diadaptasi ke React (bukan manipulasi DOM langsung)

### form.md — Keputusan Field Baru
Dua field baru ditambahkan (di luar field standar kartu ucapan):
- `kalimat_penutup` — opsional, dipakai di Screen 8. Default kalau kosong: **"Semoga kebahagiaan selalu menyertaimu."**
- `signature_penutup` — opsional, dipakai di Screen 9. Default kalau kosong: **"Dengan cinta,"**

Kedua default di-hardcode di `index.jsx` (bukan di database), mengikuti pola yang sama seperti fallback quote/closing di template Ivory Line.

### Total Data Contract (form.md final)
| Key | Wajib |
|---|---|
| nama_penerima | ya |
| momen | ya |
| nama_pengirim | ya |
| pesan | ya |
| foto_urls | ya |
| youtube_url | tidak |
| kalimat_penutup | tidak |
| signature_penutup | tidak |

### Next Step
- Bangun `index.jsx` (renderer) — mengikuti design.md + form.md yang sudah final
