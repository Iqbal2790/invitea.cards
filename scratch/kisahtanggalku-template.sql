-- SQL Script untuk Menambahkan Template Vintage Chronicle ke Database Supabase Invitea
INSERT INTO public.templates (
  id, nama, slug, kategori, harga, thumbnail_url, fields_config,
  fitur_maps, fitur_countdown, fitur_rsvp, is_active
) VALUES (
  '99999999-9999-9999-9999-999999999999',
  'Vintage Chronicle', 'kisahtanggalku', 'ucapan', 50000,
  '/foto-dummy-ucapan/Anh%20(1).jpg',
  '[
    {"name":"nama_penerima","label":"Nama Penerima","type":"text","required":true},
    {"name":"nama_pengirim","label":"Nama Pengirim","type":"text","required":true},
    {"name":"tanggal_lahir","label":"Tanggal Lahir","type":"date","required":true},
    {"name":"zodiak_nama","label":"Zodiak & Sifat","type":"text","required":false},
    {"name":"shio_nama","label":"Shio & Elemen","type":"text","required":false},
    {"name":"sejarah_singkat","label":"Peristiwa Sejarah","type":"textarea","required":false},
    {"name":"pesan_utama","label":"Surat/Pesan Utama","type":"textarea","required":true},
    {"name":"catatan_rahasia","label":"Catatan Rahasia","type":"textarea","required":false},
    {"name":"foto_urls","label":"Foto Polaroid","type":"photo","required":false,"multiple":true},
    {"name":"musik_url","label":"Musik Background URL","type":"url","required":false},
    {"subCategory":"Ulang Tahun"}
  ]'::jsonb,
  false, false, false, true
);
