import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function registerTemplate() {
  console.log("Registering Whispering Bloom template...");

  const templateData = {
    id: '70a29b3c-6d32-5e29-b7e2-234567890def',
    nama: 'Whispering Bloom',
    kategori: 'ucapan',
    harga: 49000,
    is_active: true, // We'll activate it immediately for local testing, then set to false if needed later
    thumbnail_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop', // Temporary thumbnail
    fitur_maps: false,
    fitur_countdown: false,
    fitur_rsvp: false,
    fields_config: {
      nama_penerima: { name: 'nama_penerima', label: 'Nama Penerima', type: 'text', required: true },
      momen: { name: 'momen', label: 'Momen Spesial', type: 'text', required: true },
      nama_pengirim: { name: 'nama_pengirim', label: 'Nama Pengirim', type: 'text', required: true },
      pesan: { name: 'pesan', label: 'Pesan Utama', type: 'textarea', required: true },
      kalimat_penutup: { name: 'kalimat_penutup', label: 'Kalimat Saat Bunga Mekar', type: 'text', required: false },
      signature_penutup: { name: 'signature_penutup', label: 'Signature Penutup', type: 'text', required: false },
      foto_urls: { name: 'foto_urls', label: 'Galeri Foto', type: 'photo', multiple: true, required: true },
      youtube_url: { name: 'youtube_url', label: 'Link Musik YouTube', type: 'url', required: false },
      subCategory: 'Interactive',
      isFeatured: false
    }
  };

  const { data, error } = await supabase
    .from('templates')
    .upsert(templateData, { onConflict: 'id' });

  if (error) {
    console.error("Error registering template:", error.message);
    process.exit(1);
  }

  console.log("Successfully registered Whispering Bloom:", templateData.nama);
}

registerTemplate();
