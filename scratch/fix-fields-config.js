const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');
const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, val] = line.split('=');
  if (key && val) env[key.trim()] = val.trim();
});
const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);

async function fixKisahtanggalku() {
  const fieldsConfig = {
    subCategory: 'Ulang Tahun',
    nama_penerima: { name: 'nama_penerima', label: 'Nama Penerima', type: 'text', required: true },
    nama_pengirim: { name: 'nama_pengirim', label: 'Nama Pengirim', type: 'text', required: true },
    tanggal_lahir: { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true },
    zodiak_nama: { name: 'zodiak_nama', label: 'Zodiak & Sifat', type: 'text', required: false },
    shio_nama: { name: 'shio_nama', label: 'Shio & Elemen', type: 'text', required: false },
    sejarah_singkat: { name: 'sejarah_singkat', label: 'Peristiwa Sejarah', type: 'textarea', required: false },
    pesan_utama: { name: 'pesan_utama', label: 'Surat/Pesan Utama', type: 'textarea', required: true },
    catatan_rahasia: { name: 'catatan_rahasia', label: 'Catatan Rahasia', type: 'textarea', required: false },
    foto_urls: { name: 'foto_urls', label: 'Foto Polaroid', type: 'photo', required: false, multiple: true },
    musik_url: { name: 'musik_url', label: 'Musik Background URL', type: 'url', required: false }
  };

  const { data, error } = await supabase
    .from('templates')
    .update({ fields_config: fieldsConfig })
    .eq('id', '99999999-9999-9999-9999-999999999999');

  if (error) {
    console.error("Error:", error);
  } else {
    console.log("Successfully fixed fields_config for Vintage Chronicle!");
  }
}

fixKisahtanggalku();
