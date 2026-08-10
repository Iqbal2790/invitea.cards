# Form Schema: Retro Vintage Romance

## Field Contracts (snake_case)
| Field Name | Type | Required | Description |
|---|---|---|---|
| `nama_panggilan_pria` | text | Yes | Nama panggilan pria |
| `nama_panggilan_wanita` | text | Yes | Nama panggilan wanita |
| `nama_lengkap_pria` | text | Yes | Nama lengkap pria |
| `nama_ayah_pria` | text | No | Nama ayah pria |
| `nama_ibu_pria` | text | No | Nama ibu pria |
| `nama_lengkap_wanita` | text | Yes | Nama lengkap wanita |
| `nama_ayah_wanita` | text | No | Nama ayah wanita |
| `nama_ibu_wanita` | text | No | Nama ibu wanita |
| `foto_cover` | photo | Yes | Foto utama cover |
| `foto_pria` | photo | Yes | Foto profil pria |
| `foto_wanita` | photo | Yes | Foto profil wanita |
| `foto_urls` | photo[] | No | Galeri foto (max 16) |
| `tanggal_acara` | date | Yes | Tanggal utama YYYY-MM-DD |
| `waktu_acara` | time | Yes | Waktu utama HH:mm |
| `quote_text` | textarea | No | Kutipan sambutan |
| `quote_author` | text | No | Penulis kutipan |
| `acara_akad_nama` | text | Yes | Judul sesi 1 |
| `acara_akad_tanggal` | text | Yes | Tanggal akad |
| `acara_akad_jam` | text | Yes | Waktu akad |
| `acara_akad_lokasi` | textarea | Yes | Alamat lokasi akad |
| `acara_akad_maps_url` | text | No | Link Google Maps akad |
| `acara_resepsi_nama` | text | Yes | Judul sesi 2 |
| `acara_resepsi_tanggal` | text | Yes | Tanggal resepsi |
| `acara_resepsi_jam` | text | Yes | Waktu resepsi |
| `acara_resepsi_lokasi` | textarea | Yes | Alamat lokasi resepsi |
| `acara_resepsi_maps_url` | text | No | Link Google Maps resepsi |
| `dresscode_desc` | textarea | No | Deskripsi busana tamu |
| `ucapan_terima_kasih` | textarea | No | Teks penutup |
