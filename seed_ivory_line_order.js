const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://uldbknkgnpisayqweklt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZGJrbmtnbnBpc2F5cXdla2x0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjQ2NDkzNiwiZXhwIjoyMDk4MDQwOTM2fQ.3E_-ag3Zar0AsK0CFpR9gbhoUCMQgEIoCblg3ZpZaeY';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const dummyDataContent = {
  nama_panggilan_pria: "Bima",
  nama_panggilan_wanita: "Ayu",
  nama_lengkap_pria: "Bima Aryasetya, S.T.",
  nama_lengkap_wanita: "Ayu Lestari, S.E.",
  acara1_nama: "Akad Nikah",
  acara1_tanggal: "2026-12-12",
  acara1_jam: "08:00",
  acara1_lokasi: "Masjid Agung At-Tin, Jakarta Timur",
  foto_urls: [
    "https://images.unsplash.com/photo-1519741497674-611481863552",
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc",
    "https://images.unsplash.com/photo-1520854221256-17451cc331bf"
  ],
  foto_cover: "https://images.unsplash.com/photo-1519741497674-611481863552",
  foto_pria: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
  foto_wanita: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
  bank_accounts: [{ bank: "BCA", nomor: "5432112345", nama: "Bima Aryasetya" }],
  youtube_url: "",
  cerita_cinta: "Pertemuan kami berawal dari sebuah kebetulan sederhana di sebuah kedai kopi di selatan Jakarta lima tahun yang lalu.",
  acara1_maps_url: "https://maps.google.com/?q=Masjid+Agung+At-Tin",
  acara2_nama: "Resepsi",
  acara2_tanggal: "2026-12-12",
  acara2_jam: "11:00",
  acara2_lokasi: "Gedung Pewayangan Kautaman, TMII",
  acara2_maps_url: "https://maps.google.com/?q=Gedung+Pewayangan",
};

async function createDemoOrder() {
  const payload = {
    slug: 'bima-ayu',
    template_id: '8fd87cbb-3273-442b-b9cd-de875f3415ad', // Ivory Line
    data_content: dummyDataContent,
    email: 'demo@invitea.cards'
  };

  const { data, error } = await supabase
    .from('orders')
    .upsert(payload, { onConflict: 'slug' })
    .select();

  if (error) {
    console.error('Error creating order:', error);
  } else {
    console.log('✅ Berhasil membuat demo order Ivory Line!');
    console.log(`URL Demo: http://localhost:3000/u/${data[0].slug}`);
  }
}

createDemoOrder();
