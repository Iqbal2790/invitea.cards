const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const [key, val] = line.split('=');
  if (key && val) {
    env[key.trim()] = val.trim();
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function inspectAndSeed() {
  const { data: existing, error: fetchErr } = await supabase
    .from('templates')
    .select('*')
    .limit(1);

  if (fetchErr) {
    console.error("Fetch error:", fetchErr);
    return;
  }

  console.log("Existing template structure:", existing);

  // Exclude 'slug' if it's not a column in Supabase table
  const templateData = {
    id: '99999999-9999-9999-9999-999999999999',
    nama: 'Vintage Chronicle',
    kategori: 'ucapan',
    harga: 50000,
    thumbnail_url: '/foto-dummy-ucapan/Anh%20(1).jpg',
    fields_config: {
      subCategory: 'Ulang Tahun',
      fields: [
        { name: 'nama_penerima', label: 'Nama Penerima', type: 'text', required: true },
        { name: 'nama_pengirim', label: 'Nama Pengirim', type: 'text', required: true },
        { name: 'tanggal_lahir', label: 'Tanggal Lahir', type: 'date', required: true },
        { name: 'zodiak_nama', label: 'Zodiak & Sifat', type: 'text', required: false },
        { name: 'shio_nama', label: 'Shio & Elemen', type: 'text', required: false },
        { name: 'sejarah_singkat', label: 'Peristiwa Sejarah', type: 'textarea', required: false },
        { name: 'pesan_utama', label: 'Surat/Pesan Utama', type: 'textarea', required: true },
        { name: 'catatan_rahasia', label: 'Catatan Rahasia', type: 'textarea', required: false },
        { name: 'foto_urls', label: 'Foto Polaroid', type: 'photo', required: false, multiple: true },
        { name: 'musik_url', label: 'Musik Background URL', type: 'url', required: false }
      ]
    },
    fitur_maps: false,
    fitur_countdown: false,
    fitur_rsvp: false,
    is_active: true
  };

  const { data, error } = await supabase
    .from('templates')
    .upsert(templateData, { onConflict: 'id' });

  if (error) {
    console.error("Error upserting template:", error);
  } else {
    console.log("Successfully inserted/updated Vintage Chronicle in Supabase live database!");
  }
}

inspectAndSeed();
