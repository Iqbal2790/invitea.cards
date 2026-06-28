const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const envConfig = fs.readFileSync('.env.local', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...value] = line.split('=');
  if (key && value) acc[key.trim()] = value.join('=').trim();
  return acc;
}, {});

Object.assign(process.env, envConfig);

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const DUMMY_TEMPLATES = [
  {
    id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
    nama: 'Elegance Rose',
    kategori: 'Undangan Pernikahan',
    harga: 29000,
    thumbnail_url: '/template-dummy.png',
    fitur_maps: true,
    fitur_countdown: true,
    fitur_rsvp: true,
    is_active: true,
    fields_config: [
      {"name": "nama_pria", "label": "Nama Mempelai Pria", "type": "text", "required": true},
      {"name": "nama_wanita", "label": "Nama Mempelai Wanita", "type": "text", "required": true},
      {"name": "foto_urls", "label": "Upload Foto", "type": "photo", "required": true, "multiple": true},
      {"name": "acara1_nama", "label": "Nama Acara Pertama", "type": "text", "required": true, "placeholder": "contoh: Akad Nikah"},
      {"name": "acara1_tanggal", "label": "Tanggal Acara Pertama", "type": "date", "required": true},
      {"name": "acara1_jam", "label": "Jam Acara Pertama", "type": "time", "required": true},
      {"name": "acara1_lokasi", "label": "Lokasi Acara Pertama", "type": "text", "required": true},
      {"name": "acara1_maps_url", "label": "Link Google Maps Acara Pertama", "type": "url", "required": true},
      {"name": "acara2_nama", "label": "Nama Acara Kedua (opsional)", "type": "text", "required": false, "placeholder": "contoh: Resepsi — kosongkan jika hanya 1 acara"},
      {"name": "acara2_tanggal", "label": "Tanggal Acara Kedua", "type": "date", "required": false},
      {"name": "acara2_jam", "label": "Jam Acara Kedua", "type": "time", "required": false},
      {"name": "acara2_lokasi", "label": "Lokasi Acara Kedua", "type": "text", "required": false},
      {"name": "acara2_maps_url", "label": "Link Google Maps Acara Kedua", "type": "url", "required": false},
      {"name": "youtube_url", "label": "Link YouTube untuk Musik (opsional)", "type": "url", "required": false}
    ]
  },
  {
    id: 'b0eebc99-9c0b-4ef8-bb6d-6bb9bd380a22',
    nama: 'Midnight Magic',
    kategori: 'Kartu Ucapan',
    harga: 29000,
    thumbnail_url: '/template-dummy.png',
    fitur_maps: false,
    fitur_countdown: false,
    fitur_rsvp: false,
    is_active: true,
    fields_config: [
      {"name": "nama_pengirim", "label": "Nama Pengirim", "type": "text", "required": true},
      {"name": "nama_penerima", "label": "Nama Penerima", "type": "text", "required": true},
      {"name": "momen", "label": "Momen", "type": "text", "required": true, "placeholder": "contoh: Ulang Tahun, Wisuda, Hari Raya"},
      {"name": "pesan_ucapan", "label": "Pesan Ucapan", "type": "textarea", "required": true},
      {"name": "foto_urls", "label": "Upload Foto", "type": "photo", "required": true, "multiple": true},
      {"name": "youtube_url", "label": "Link YouTube untuk Musik (opsional)", "type": "url", "required": false}
    ]
  }
];

async function seedTemplates() {
  console.log("Seeding templates table...");
  const { data, error } = await supabase
    .from('templates')
    .upsert(DUMMY_TEMPLATES, { onConflict: 'id' });

  if (error) {
    console.error("Error seeding templates:", error);
  } else {
    console.log("Templates seeded successfully!");
  }
}

seedTemplates();
