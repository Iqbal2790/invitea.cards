# Sunny Slab Form Data Schema

Data structure for the Sunny Slab template.

```json
{
  "nama_panggilan_pria": "Bagas",
  "nama_panggilan_wanita": "Dinda",
  "nama_lengkap_pria": "Bagas Wirawan",
  "nama_ayah_pria": "Bapak Hendra Wirawan",
  "nama_ibu_pria": "Ibu Sari Wulandari",
  "nama_lengkap_wanita": "Dinda Ayu Lestari",
  "nama_ayah_wanita": "Bapak Somad Prasetyo",
  "nama_ibu_wanita": "Ibu Ratna Kusuma",
  "foto_pria": "url_to_photo",
  "foto_wanita": "url_to_photo",
  "foto_cover": "url_to_photo",
  "foto_urls": ["url1", "url2", "url3", "url4", "url5", "url6"], // 6-16 photos
  "tanggal_acara": "2027-02-14", // For countdown
  "waktu_acara": "08:00", // For countdown
  "quote_text": "Cinta yang tumbuh dari niat baik akan selalu menemukan jalan...",
  "quote_author": "Doa & Harapan Kami",
  "acara_akad_nama": "Akad Nikah",
  "acara_akad_tanggal": "Sabtu, 14 Februari 2027",
  "acara_akad_jam": "08:00 - 10:00 WIB",
  "acara_akad_lokasi": "Kediaman Mempelai Wanita, Jl. Melati No. 12, Banjarmasin",
  "acara_akad_maps_url": "https://maps.google.com/...",
  "acara_resepsi_nama": "Resepsi",
  "acara_resepsi_tanggal": "Sabtu, 14 Februari 2027",
  "acara_resepsi_jam": "11:00 - 14:00 WIB",
  "acara_resepsi_lokasi": "Gedung Serbaguna Mahakam, Banjarmasin",
  "acara_resepsi_maps_url": "https://maps.google.com/...",
  "love_story": [
    {
      "tanggal": "Januari 2023",
      "judul": "Awal Perkenalan",
      "deskripsi": "Bertemu di acara kampus..."
    },
    {
      "tanggal": "Agustus 2023",
      "judul": "Semakin Dekat",
      "deskripsi": "Komunikasi yang tadinya sesekali..."
    }
  ],
  "youtube_url": "https://youtube.com/watch?v=...", // Background music
  "live_meet_url": "https://meet.google.com/...", // Google Meet
  "live_youtube_url": "https://youtube.com/live/...", // YT Live
  "live_zoom_url": "https://zoom.us/...", // Zoom
  "live_tiktok_url": "https://tiktok.com/...", // TikTok Live
  "rekening_wanita": [
    {
      "bank": "BCA",
      "nomor": "1234567890",
      "atas_nama": "Dinda Ayu Lestari"
    }
  ],
  "rekening_pria": [
    {
      "bank": "Mandiri",
      "nomor": "0987654321",
      "atas_nama": "Bagas Wirawan"
    }
  ],
  "dresscode_warna": [
    "#F7F2E9",
    "#C9D9E8",
    "#111111"
  ],
  "dresscode_desc": "Mohon kenakan pakaian dengan warna yang senada dengan tema kami.",
  "ucapan_terima_kasih": "Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu untuk kami.",
  "wishes": [ // For RSVP / Marquee
    { "nama_tamu": "Rani", "pesan": "Selamat menempuh hidup baru!" }
  ]
}
```
