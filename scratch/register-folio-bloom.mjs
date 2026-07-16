import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const TEMPLATE_ID = "50e18d6a-5c21-4f18-a6d1-123456789abc";

async function main() {
  console.log("Registering Folio Bloom template...");

  const { data, error } = await supabase
    .from("templates")
    .upsert({
      id: TEMPLATE_ID,
      nama: "Folio Bloom",
      kategori: "undangan",
      harga: 49000,
      thumbnail_url: '/thumbnails/folio-bloom.png',
      fields_config: {
        mempelai_pria_nama: { name: 'mempelai_pria_nama', label: 'Nama Mempelai Pria', type: 'text', required: true },
        mempelai_pria_ortu: { name: 'mempelai_pria_ortu', label: 'Nama Orang Tua Pria', type: 'text', required: true },
        mempelai_wanita_nama: { name: 'mempelai_wanita_nama', label: 'Nama Mempelai Wanita', type: 'text', required: true },
        mempelai_wanita_ortu: { name: 'mempelai_wanita_ortu', label: 'Nama Orang Tua Wanita', type: 'text', required: true },
        
        acara_akad_nama: { name: 'acara_akad_nama', label: 'Judul Acara Akad', type: 'text', required: true },
        acara_akad_tanggal: { name: 'acara_akad_tanggal', label: 'Tanggal Akad', type: 'date', required: true },
        acara_akad_jam: { name: 'acara_akad_jam', label: 'Waktu Akad', type: 'time', required: true },
        acara_akad_lokasi_nama: { name: 'acara_akad_lokasi_nama', label: 'Nama Lokasi Akad', type: 'text', required: true },
        acara_akad_lokasi_alamat: { name: 'acara_akad_lokasi_alamat', label: 'Alamat Akad', type: 'textarea', required: true },
        acara_akad_lokasi_url: { name: 'acara_akad_lokasi_url', label: 'Link Google Maps Akad', type: 'url', required: true },
        
        acara_resepsi_nama: { name: 'acara_resepsi_nama', label: 'Judul Acara Resepsi', type: 'text', required: true },
        acara_resepsi_tanggal: { name: 'acara_resepsi_tanggal', label: 'Tanggal Resepsi', type: 'date', required: true },
        acara_resepsi_jam: { name: 'acara_resepsi_jam', label: 'Waktu Resepsi', type: 'time', required: true },
        acara_resepsi_lokasi_nama: { name: 'acara_resepsi_lokasi_nama', label: 'Nama Lokasi Resepsi', type: 'text', required: true },
        acara_resepsi_lokasi_alamat: { name: 'acara_resepsi_lokasi_alamat', label: 'Alamat Resepsi', type: 'textarea', required: true },
        acara_resepsi_lokasi_url: { name: 'acara_resepsi_lokasi_url', label: 'Link Google Maps Resepsi', type: 'url', required: true },
        
        music_youtube_url: { name: 'music_youtube_url', label: 'Link YouTube Musik', type: 'url', required: true },
        
        subCategory: 'Interactive',
        isFeatured: false
      },
      fitur_maps: true,
      fitur_countdown: false,
      fitur_rsvp: true,
      is_active: true // active set to true so it appears in the gallery
    })
    .select();

  if (error) {
    console.error("Error inserting template:", error.message);
  } else {
    console.log("Successfully registered Folio Bloom:", data[0].nama);
  }
}

main();
