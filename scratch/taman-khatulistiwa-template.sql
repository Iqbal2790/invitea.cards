-- Jalankan setelah review visual. Template sengaja nonaktif hingga uji end-to-end selesai.
INSERT INTO public.templates (
  id, nama, slug, kategori, harga, thumbnail_url, fields_config,
  fitur_maps, fitur_countdown, fitur_rsvp, is_active
) VALUES (
  '31f3bd3f-6437-47d8-9054-41b6f6f8bb6e',
  'Taman Khatulistiwa', 'taman-khatulistiwa', 'undangan', 150000,
  '/foto-dummy-undangan/cover.jpg',
  '[
    {"name":"nama_panggilan_pria","label":"Nama Panggilan Mempelai Pria","type":"text","required":true},
    {"name":"nama_panggilan_wanita","label":"Nama Panggilan Mempelai Wanita","type":"text","required":true},
    {"name":"nama_lengkap_pria","label":"Nama Lengkap Mempelai Pria","type":"text","required":true},
    {"name":"nama_lengkap_wanita","label":"Nama Lengkap Mempelai Wanita","type":"text","required":true},
    {"name":"ayah_pria","label":"Nama Ayah Mempelai Pria","type":"text","required":false},
    {"name":"ibu_pria","label":"Nama Ibu Mempelai Pria","type":"text","required":false},
    {"name":"ayah_wanita","label":"Nama Ayah Mempelai Wanita","type":"text","required":false},
    {"name":"ibu_wanita","label":"Nama Ibu Mempelai Wanita","type":"text","required":false},
    {"name":"foto_cover","label":"Foto Cover","type":"photo","required":true},
    {"name":"foto_pria","label":"Foto Mempelai Pria","type":"photo","required":true},
    {"name":"foto_wanita","label":"Foto Mempelai Wanita","type":"photo","required":true},
    {"name":"foto_urls","label":"Galeri Foto","type":"photo","required":true,"multiple":true},
    {"name":"quote_text","label":"Quote atau Sambutan","type":"textarea","required":false},
    {"name":"acara1_nama","label":"Nama Acara Pertama","type":"text","required":true},
    {"name":"acara1_tanggal","label":"Tanggal Acara Pertama","type":"date","required":true},
    {"name":"acara1_jam","label":"Jam Acara Pertama","type":"time","required":true},
    {"name":"acara1_lokasi","label":"Lokasi Acara Pertama","type":"text","required":true},
    {"name":"acara1_maps_url","label":"Google Maps Acara Pertama","type":"url","required":true},
    {"name":"acara2_nama","label":"Nama Acara Kedua","type":"text","required":false},
    {"name":"acara2_tanggal","label":"Tanggal Acara Kedua","type":"date","required":false},
    {"name":"acara2_jam","label":"Jam Acara Kedua","type":"time","required":false},
    {"name":"acara2_lokasi","label":"Lokasi Acara Kedua","type":"text","required":false},
    {"name":"acara2_maps_url","label":"Google Maps Acara Kedua","type":"url","required":false},
    {"name":"youtube_url","label":"YouTube Music URL","type":"url","required":false},
    {"name":"ucapan_penutup","label":"Ucapan Penutup","type":"textarea","required":false},
    {"name":"bank_accounts","label":"Wedding Gift","type":"bank","required":false,"multiple":true},
    {"subCategory":"Interactive"}
  ]'::jsonb,
  true, true, true, false
);
