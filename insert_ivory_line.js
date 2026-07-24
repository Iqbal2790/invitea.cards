const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://uldbknkgnpisayqweklt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZGJrbmtnbnBpc2F5cXdla2x0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjQ2NDkzNiwiZXhwIjoyMDk4MDQwOTM2fQ.3E_-ag3Zar0AsK0CFpR9gbhoUCMQgEIoCblg3ZpZaeY';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const fields_config = [
  {"name": "nama_panggilan_pria", "label": "Nama Panggilan Mempelai Pria", "type": "text", "required": true},
  {"name": "nama_panggilan_wanita", "label": "Nama Panggilan Mempelai Wanita", "type": "text", "required": true},
  {"name": "nama_lengkap_pria", "label": "Nama Lengkap Mempelai Pria", "type": "text", "required": true},
  {"name": "nama_lengkap_wanita", "label": "Nama Lengkap Mempelai Wanita", "type": "text", "required": true},
  {"name": "foto_cover", "label": "Foto Prewed (Background Cover & Hero)", "type": "photo", "required": true},
  {"name": "foto_pria", "label": "Foto Mempelai Pria", "type": "photo", "required": false},
  {"name": "foto_wanita", "label": "Foto Mempelai Wanita", "type": "photo", "required": false},
  {"name": "quote_text", "label": "Quote/Sambutan (opsional)", "type": "textarea", "required": false},
  {"name": "youtube_url", "label": "Link YouTube untuk Musik (opsional)", "type": "url", "required": false},
  {"name": "acara1_nama", "label": "Nama Acara Pertama (misal: Akad Nikah)", "type": "text", "required": true},
  {"name": "acara1_tanggal", "label": "Tanggal Acara Pertama", "type": "date", "required": true},
  {"name": "acara1_jam", "label": "Jam Acara Pertama", "type": "time", "required": true},
  {"name": "acara1_lokasi", "label": "Lokasi Acara Pertama", "type": "text", "required": true},
  {"name": "acara1_maps_url", "label": "Link Google Maps Acara Pertama", "type": "url", "required": true},
  {"name": "acara2_nama", "label": "Nama Acara Kedua (opsional)", "type": "text", "required": false},
  {"name": "acara2_tanggal", "label": "Tanggal Acara Kedua", "type": "date", "required": false},
  {"name": "acara2_jam", "label": "Jam Acara Kedua", "type": "time", "required": false},
  {"name": "acara2_lokasi", "label": "Lokasi Acara Kedua", "type": "text", "required": false},
  {"name": "acara2_maps_url", "label": "Link Google Maps Acara Kedua", "type": "url", "required": false},
  {"name": "foto_urls", "label": "Galeri Foto", "type": "photo", "required": false, "multiple": true},
  {"name": "bank_accounts", "label": "Nomor Rekening", "type": "bank", "required": false, "multiple": true}
];

async function run() {
  console.log('Inserting Ivory Line template into Supabase...');
  
  const { data, error } = await supabase
    .from('templates')
    .update({
      fields_config: fields_config,
      harga: 39000
    })
    .eq('nama', 'Ivory Line')
    .select();

  if (error) {
    console.error('Insert error:', error);
    process.exit(1);
  }

  console.log('✅ Berhasil! Template diupdate:');
  data.forEach(d => {
    console.log('   ID:', d.id);
    console.log('   Nama:', d.nama);
  });
}

run();
