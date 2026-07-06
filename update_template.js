// Script untuk upload thumbnail dan update nama template di Supabase
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://uldbknkgnpisayqweklt.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsZGJrbmtnbnBpc2F5cXdla2x0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MjQ2NDkzNiwiZXhwIjoyMDk4MDQwOTM2fQ.3E_-ag3Zar0AsK0CFpR9gbhoUCMQgEIoCblg3ZpZaeY';
const TEMPLATE_ID = 'b61395f5-c1ad-486f-add9-cac4bb13d314';
const NEW_NAME = 'Cosmic Hearts';
const THUMBNAIL_PATH = path.join(__dirname, 'public', 'thumbnails', 'cosmic-hearts.png');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log('1. Membaca file thumbnail...');
  const fileBuffer = fs.readFileSync(THUMBNAIL_PATH);
  
  console.log('2. Upload thumbnail ke Supabase Storage (bucket: thumbnails)...');
  const { error: uploadError } = await supabase.storage
    .from('thumbnails')
    .upload('cosmic-hearts.png', fileBuffer, {
      contentType: 'image/png',
      upsert: true
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    process.exit(1);
  }

  const { data: urlData } = supabase.storage
    .from('thumbnails')
    .getPublicUrl('cosmic-hearts.png');
  
  const thumbnailUrl = urlData.publicUrl;
  console.log('3. Thumbnail URL:', thumbnailUrl);

  console.log('4. Update nama dan thumbnail template di database...');
  const { data, error: updateError } = await supabase
    .from('templates')
    .update({ nama: NEW_NAME, thumbnail_url: thumbnailUrl })
    .eq('id', TEMPLATE_ID)
    .select()
    .single();

  if (updateError) {
    console.error('Update error:', updateError);
    process.exit(1);
  }

  console.log('✅ Berhasil! Template diupdate:');
  console.log('   Nama:', data.nama);
  console.log('   Thumbnail:', data.thumbnail_url);
}

run();
