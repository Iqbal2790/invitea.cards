# Kontrak Data: Vintage Chronicle (Kisahtanggalku)

Template ini merupakan kartu ucapan ulang tahun dengan tema vintage polaroid, animasi 3D flipbook, dan interaksi rahasia.

## Fields Configuration (Supabase `fields_config`)

```json
{
  "subCategory": "Ulang Tahun",
  "nama_penerima": {
    "name": "nama_penerima",
    "label": "Nama Penerima",
    "type": "text",
    "required": true
  },
  "nama_pengirim": {
    "name": "nama_pengirim",
    "label": "Nama Pengirim",
    "type": "text",
    "required": true
  },
  "tanggal_lahir": {
    "name": "tanggal_lahir",
    "label": "Tanggal Lahir",
    "type": "date",
    "required": true
  },
  "zodiak_nama": {
    "name": "zodiak_nama",
    "label": "Zodiak & Sifat",
    "type": "text",
    "required": false
  },
  "shio_nama": {
    "name": "shio_nama",
    "label": "Shio & Elemen",
    "type": "text",
    "required": false
  },
  "sejarah_singkat": {
    "name": "sejarah_singkat",
    "label": "Peristiwa Sejarah",
    "type": "textarea",
    "required": false
  },
  "pesan_utama": {
    "name": "pesan_utama",
    "label": "Surat/Pesan Utama",
    "type": "textarea",
    "required": true
  },
  "catatan_rahasia": {
    "name": "catatan_rahasia",
    "label": "Catatan Rahasia",
    "type": "textarea",
    "required": false
  },
  "foto_urls": {
    "name": "foto_urls",
    "label": "Foto Polaroid",
    "type": "photo",
    "required": false,
    "multiple": true
  },
  "musik_url": {
    "name": "musik_url",
    "label": "Musik Background URL",
    "type": "url",
    "required": false
  }
}
```
