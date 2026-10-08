import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function registerTemplate() {
  const templateId = '12345678-abcd-ef00-1234-567890abcdef'; 
  
  const templateData = {
    id: templateId,
    kategori: 'ucapan', 
    nama: 'Celestial Journey',
    harga: 39000,
    fields_config: {
      subCategory: 'Romantis',
      0: { name: 'nama_penerima', label: 'Nama Penerima', type: 'text', required: true },
      1: { name: 'nama_pengirim', label: 'Nama Pengirim', type: 'text', required: true },
      2: { name: 'pesan', label: 'Pesan Utama', type: 'textarea', required: true },
      3: { name: 'foto_urls', label: 'Upload Foto', type: 'photo', required: false, multiple: true }
    },
    is_active: true
  };

  const { data, error } = await supabase
    .from('templates')
    .upsert(templateData, { onConflict: 'id' })
    .select();

  if (error) {
    console.error('Error inserting template:', error);
  } else {
    console.log('Successfully registered Celestial Journey template:', data);
  }
}

registerTemplate();
